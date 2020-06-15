---
layout: post
title:  LitElement Lifecycle 2
date:   2020-04-14T15:06:42.160Z
permalink: /webcomponents-litelement-lifecycle-2/
icon: https://codersnack.com/assets/images/litelement-icon.png
categories: [snackpost]
---

> References

- [LitElement lifecycle](https://lit-element.polymer-project.org/guide/lifecycle)


#### firstUpdated
```
/**
 * Implement to override default behavior.
 */
firstUpdated(changedProperties) { ... }
```
Params: changedProperties: Map. Keys are the names of changed properties; Values are the corresponding previous values.
Updates?: Yes: Property changes inside this method will trigger an element update.

**Called after the element's DOM has been updated the first time, immediately before updated is called**.

> Implement firstUpdated to perform one-time work after the element's template has been created.

*Example*: Focus an input element on first update

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() {
    return {
      textAreaId: { type: String },
      startingText: { type: String }
    };
  }
  constructor() {
    super();
    this.textAreaId = 'myText';
    this.startingText = 'Focus me on first update';
  }
  render() {
    return html`
      <textarea id="${this.textAreaId}">${this.startingText}</textarea>
    `;
  }
  firstUpdated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
    const textArea = this.shadowRoot.getElementById(this.textAreaId);
    textArea.focus();
  }
}
customElements.define('my-element', MyElement);
```

#### updated
```
/**
 * Implement to override default behavior.
 */
updated(changedProperties) { ... }
```
Params: changedProperties:Map. Keys are the names of changed properties; Values are the corresponding previous values.
Updates?: Yes: Property changes inside this method will trigger an element update.

**Called when the element’s DOM has been updated and rendered**. Implement to perform some task after an update.

**Example**: Focus an element after update

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
      <style>button:focus { background-color: aliceblue; }</style>

      <p>prop1: ${this.prop1}</p>
      <p>prop2: ${this.prop2}</p>

      <button id="a" @click="${() => this.prop1=Math.random()}">prop1</button>
      <button id="b" @click="${() => this.prop2=Math.random()}">prop2</button>
    `;
  }
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
    let b = this.shadowRoot.getElementById('b');
    b.focus();
  }
}
customElements.define('my-element', MyElement);
```

#### updateComplete
```
// Await Promise property.
await this.updateComplete;
```
Type: Promise: Resolves with a Boolean when the element has finished updating.
Resolves: true if there are no more pending updates.false if this update cycle triggered another update.

The *updateComplete* Promise resolves when the element has finished updating. **Use updateComplete to wait for an update**:
```
  await this.updateComplete;
  // do stuff
  this.updateComplete.then(() => { /* do stuff */ });
```
**Example**

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() {
    return {
      prop1: { type: Number }
    };
  }

  constructor() {
    super();
    this.prop1 = 0;
  }

  render() {
    return html`
      <p>prop1: ${this.prop1}</p>
      <button @click="${this.changeProp}">prop1</button>
    `;
  }

  async getMoreState() {
    return;
  }

  async changeProp() {
    this.prop1 = Math.random();
    await Promise.all([this.updateComplete, this.getMoreState()]);
    console.log('Update complete. Other state completed.');
  }
}

customElements.define('my-element', MyElement);
```

#### Overriding updateComplete

To await additional state before fulfilling the *updateComplete* promise, override the *_getUpdateComplete* method. For example, it may be useful to await the update of a child element here. First await *super._getUpdateComplete()*, then any subsequent state.

> It’s recommended to override the *_getUpdateComplete* method instead of the *updateComplete* getter to ensure compatibility with users who are using TypeScript’s ES5 output (see TypeScript#338).

```
  class MyElement extends LitElement {
    async _getUpdateComplete() {
      await super._getUpdateComplete();
      await this._myChild.updateComplete;
    }
  }
```
### Examples
#### Control when updates are processed
Implement **performUpdate**:

```
async performUpdate() {
  await new Promise((resolve) => requestAnimationFrame(() => resolve());
  super.performUpdate();
}
```

#### Customize which property changes should cause an update
Implement **shouldUpdate**:

```
shouldUpdate(changedProps) {
  return changedProps.has('prop1');
}
```

#### Customize what constitutes a property change
Specify *hasChanged* for the property. See the Properties documentation.

Manage property changes and updates for object subproperties

> **Mutations** (changes to object subproperties and array items) **are not observable**. Instead, either rewrite the whole object, or call requestUpdate after a mutation.

```
// Option 1: Rewrite whole object, triggering an update
this.prop1 = Object.assign({}, this.prop1, { subProp: 'data' });

// Option 2: Mutate a subproperty, then call requestUpdate
this.prop1.subProp = 'data';
this.requestUpdate();
```
#### Update in response to something that isn’t a property change
Call **requestUpdate**:
```
// Request an update in response to an event
this.addEventListener('load-complete', async (e) => {
  console.log(e.detail.message);
  console.log(await this.requestUpdate());
});
```

#### Request an update regardless of property changes
Call **requestUpdate()**:

```
this.requestUpdate();
```
#### Request an update for a specific property
Call requestUpdate(propName, oldValue):

```
let oldValue = this.prop1;
this.prop1 = 'new value';
this.requestUpdate('prop1', oldValue);

```
#### Do something after the first update
Implement **firstUpdated**:

```
firstUpdated(changedProps) {
  console.log(changedProps.get('prop1'));
}
```

#### Do something after every update
Implement updated:

```
updated(changedProps) {
  console.log(changedProps.get('prop1'));
}
```

#### Do something when the element next updates
Await the updateComplete promise:

```
await this.updateComplete;
// do stuff
this.updateComplete.then(() => {
  // do stuff
});
```
#### Wait for an element to finish updating
Await the **updateComplete** promise:

```
let done = await updateComplete;
updateComplete.then(() => {
  // finished updating
});
```