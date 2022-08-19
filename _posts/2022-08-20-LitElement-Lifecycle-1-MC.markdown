---
layout: main-content-post
title:  LitElement Lifecycle 1
date:   2020-04-14T15:07:00.130Z
permalink: /webcomponents-litelement-lifecycle/main-content/
icon: https://codersnack.com/assets/images/litelement-icon.png
categories: [snack-main-content-post]
---

### Overview
**LitElement-based components update asynchronously in response to observed property changes**. **Property changes are batched**—if more properties change after an update is requested, but before the update starts, all of the changes are captured in the same update.

At a high level, the update lifecycle is:

- A property is set.
- Check whether an update is needed. If an update is needed, request one.
- Perform the update:
    Process properties and attributes.
    Render the element.
- Resolve a Promise, indicating that the update is complete.

#### LitElement and the browser event loop
**The browser executes JavaScript code by processing a queue of tasks in the event loop**. In each iteration of the event loop, the browser takes a task from the queue and runs it to completion.

When the task completes, before taking the next task from the queue, the browser allocates time to perform work from other sources—including DOM updates, user interactions, and the microtask queue.

By default, **LitElement updates are requested asynchronously, and queued as microtasks**. This means that Step 3 above (Perform the update) is executed at the end of the next iteration of the event loop.

> You can change this behavior so that Step 3 awaits a Promise before performing the update. See performUpdate for more information.

#### Lifecycle callbacks
LitElement also inherits the default lifecycle callbacks from the Web Component standard:

- **connectedCallback**: Invoked when a component is added to the document’s DOM.
- **disconnectedCallback**: Invoked when a component is removed from the document’s DOM.
- **adoptedCallback**: Invoked when a component is moved to a new document.
- **attributeChangedCallback**: Invoked when component attribute changes.

> Be aware that adoptedCallback is not polyfilled.

**All lifecycle methods need to call the super method.**

*Example*:

```
connectedCallback() {
  super.connectedCallback()

  console.log('connected')
}
```

#### Promises and asynchronous functions
**LitElement uses *Promise* objects to schedule and respond to element updates**.

Using *async* and *await* makes it easy to work with *Promises*. For example, you can await the **updateComplete** Promise:

```
// `async` makes the function return a Promise & lets you use `await`
async myFunc(data) {
  // Set a property, triggering an update
  this.myProp = data;

  // Wait for the updateComplete promise to resolve
  await this.updateComplete;
  // ...do stuff...
  return 'done';
}
```

Because *async* functions return a *Promise*, you can await them, too:

```
let result = await myFunc('stuff');
// `result` is resolved! You can do something with it
```
See the Web Fundamentals primer on Promises for a more in-depth tutorial.

#### Methods and properties
**In call order, the methods and properties in the update lifecycle are:**

- **someProperty.hasChanged**
- **requestUpdate**
- **performUpdate**
- **shouldUpdate**
- **update**
- **render**
- **firstUpdated**
- **updated**
- **updateComplete**

#### someProperty.hasChanged

All declared properties have a function, *hasChanged*, which is called whenever the property is set; if *hasChanged* returns true, an update is scheduled.

See the Properties documentation for information on configuring hasChanged to customize what constitutes a property change.

#### requestUpdate

```
// Manually start an update
this.requestUpdate();

// Call from within a custom property setter
this.requestUpdate(propertyName, oldValue);
```
Params:
- propertyName: Name of property to be updated.
- oldValue: Previous property value.

Returns:
- Promise: Returns the updateComplete Promise, which resolves on completion of the update.

Updates?:
 - No: Property changes inside this method will not trigger an element update.

If *hasChanged* returned true, requestUpdate fires, and the update proceeds.

**To manually start an element update, call requestUpdate with no parameters**.

To implement a custom property setter that supports property options, pass the property name and its previous value as parameters.

*Example*: Manually start an element update

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  constructor() {
    super();

    // Request an update in response to an event
    this.addEventListener('load-complete', async (e) => {
      console.log(e.detail.message);
      console.log(await this.requestUpdate());
    });
  }
  render() {
    return html`
      <button @click="${this.fire}">Fire a "load-complete" event</button>
    `;
  }
  fire() {
    let newMessage = new CustomEvent('load-complete', {
      detail: { message: 'hello. a load-complete happened.' }
    });
    this.dispatchEvent(newMessage);
  }
}
customElements.define('my-element', MyElement);
```

*Example*: Call **requestUpdate from a custom property setter**

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() { 
    return { prop: { type: Number } };
  }

  set prop(val) {
    let oldVal = this._prop;
    this._prop = Math.floor(val);
    this.requestUpdate('prop', oldVal);
  }

  get prop() { return this._prop; }

  constructor() {
    super();
    this._prop = 0;
  }

  render() {
    return html`
      <p>prop: ${this.prop}</p>
      <button @click="${() =>  { this.prop = Math.random()*10; }}">
        change prop
      </button>
    `;
  }
}
customElements.define('my-element', MyElement);
```

#### performUpdate
```
/**
 * Implement to override default behavior.
 */
performUpdate() { ... }
```
Returns: void or Promise: Performs an update.
Updates?: No : Property changes inside this method will not trigger an element update.

**By default, performUpdate is scheduled as a *microtask* after the end of the next execution of the browser event loop**. To schedule *performUpdate*, implement it as an asynchronous method that awaits some state before calling *super.performUpdate()*. For example:

```
async performUpdate() {
  await new Promise((resolve) => requestAnimationFrame(() => resolve()));
  super.performUpdate();
}
```

#### shouldUpdate
```
/**
 * Implement to override default behavior.
 */
shouldUpdate(changedProperties) { ... }
```
Params:
- *changedProperties*: Map. Keys are the names of changed properties; Values are the corresponding previous values.

Returns: Boolean: If true, update proceeds. Default return value is true.
Updates?: Yes: Property changes inside this method will trigger an element update.

**Controls whether an update should proceed**. Implement shouldUpdate to specify which property changes should cause updates. By default, this method always returns true.

*Example*: Customize which property changes should cause updates

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() {
    return {
      prop1: { type: Number },
      prop2: { type: Number }
    };
  }
  constructor() {
    super();
    this.prop1 = 0;
    this.prop2 = 0;
  }

  render() {
    return html`
      <p>prop1: ${this.prop1}</p>
      <p>prop2: ${this.prop2}</p>
      <button @click="${() => this.prop1=this.change()}">Change prop1</button>
      <button @click="${() => this.prop2=this.change()}">Change prop2</button>
    `;
  }

  /**
   * Only update element if prop1 changed.
   */
  shouldUpdate(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
    return changedProperties.has('prop1');
  }

  change() {
    return Math.floor(Math.random()*10);
  }
}
customElements.define('my-element', MyElement);
```

#### update
Params:
- changedProperties:Map. Keys are the names of changed properties; Values are the corresponding previous values.

Updates? : No: Property changes inside this method do not trigger an element update.

**Reflects property values to attributes and calls render to render DOM via lit-html**. Provided here for reference. **You don’t need to override or call this method**.

##### render
```
/**
 * Implement to override default behavior.
 */
render() { ... }
```
Returns: TemplateResult: Must return a lit-html TemplateResult.
Updates?: No: Property changes inside this method will not trigger an element update.

**Uses *lit-html* to render the element template**. You must implement render for any component that extends the LitElement base class.

