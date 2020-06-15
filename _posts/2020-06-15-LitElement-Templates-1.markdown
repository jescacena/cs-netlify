---
layout: post
title:  LitElement Templates 1
date:   2020-04-14T15:08:15.088Z
permalink: /webcomponents-litelement-templates/
icon: https://codersnack.com/assets/images/litelement-icon.png
categories: [snackpost]
---

> References

- [LitElement Templates](https://lit-element.polymer-project.org/guide/templates)


Add a template to your component to define internal DOM to implement your component.

To encapsulate the templated DOM LitElement uses **shadow DOM**. Shadow DOM provides three benefits:

- **DOM scoping**. DOM APIs like document.querySelector won’t find elements in the component’s shadow DOM, so it’s harder for global scripts to accidentally break your component.
- **Style scoping**. You can write encapsulated styles for your shadow DOM that don’t affect the rest of the DOM tree.
- **Composition**. The component’s shadow DOM (managed by the component) is separate from the component’s children. You can choose how children are rendered in your templated DOM. Component users can add and remove children using standard DOM APIs without accidentally breaking anything in your shadow DOM.

Where native shadow DOM isn’t available, LitElement uses the **Shady CSS polyfill**.

### Define and render a template
To define a template for a LitElement component, write a render function for your element class:

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  render() {
    return html`<p>template content</p>`;
  }
}
```

Write your template in HTML inside a JavaScript template literal by enclosing the raw HTML in back-ticks (``).

**Tag your template literal with the html tag function**.

The component’s render method can return anything that lit-html can render. Typically, **it returns a single TemplateResult object** (the same type returned by the html tag function).

**Example**

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {

  // Implement `render` to define a template for your element.
  render(){
    /**
     * Return a lit-html `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function.
     */
    return html`
      <div>
        <p>A paragraph</p>
      </div>
    `;
  }
}
customElements.define('my-element', MyElement);
```

**LitElement uses lit-html templates**; this page summarizes the features of lit-html templates, for more details, see Writing templates and the Template syntax reference in the lit-html documentation.

### Design a performant template
**LitElement renders and re-renders asynchronously, updating in response to batched property changes** (see Element update lifecycle for more information).

**During an update, only the parts of the DOM that change are re-rendered**. To get the performance benefits of this model, **you should design your element's template as a pure function of its properties**.

To do this, make sure the render function:

- Does not change the element’s state.
- Does not have any side effects.
- Only depends on the element’s properties.
- Returns the same result when given the same property values.
- Also, avoid making DOM updates outside of render. Instead, express the element’s template as a function of its state, and capture its state in properties.

The following code uses inefficient DOM manipulation:

**dom-manip.js**

```
// Anti-pattern. Avoid!

constructor() {
  super();
  this.addEventListener('stuff-loaded', (e) => {
    this.shadowRoot.getElementById('message').innerHTML=e.detail;
  });
  this.loadStuff();
}
render() {
  return html`
    <p id="message">Loading</p>
  `;
}
```

We can improve the template by capturing the load message as a property, and setting the property in response to the event:

**update-properties.js**

```
constructor() {
  super();
  this.message = 'Loading';
  this.addEventListener('stuff-loaded', (e) => { this.message = e.detail } );
  this.loadStuff();
}
render() {
  return html`
    <p>${this.message}</p>
  `;
}
```

### Use properties, loops, and conditionals in a template
When defining your element's template, you can **bind the element's properties to the template; the template is re-rendered whenever the properties change.**

##### Properties
To add a property value to a template, insert it with ```${this.propName}```:

```
static get properties() {
  return { myProp: String };
}
...
render() {
  return html`<p>${this.myProp}</p>`;
}
```

##### Loops
Iterate over an array:

```
html`<ul>
  ${this.myArray.map(i => html`<li>${i}</li>`)}
</ul>`;
```
##### Conditionals
Render based on a Boolean condition:

```
html`
  ${this.myBool?
    html`<p>Render some HTML if myBool is true</p>`:
    html`<p>Render some other HTML if myBool is false</p>`}
`;
```
**Examples**

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() {
    return {
      myString: { type: String },
      myArray: { type: Array },
      myBool: { type: Boolean }
    };
  }
  constructor() {
    super();
    this.myString = 'Hello World';
    this.myArray = ['an','array','of','test','data'];
    this.myBool = true;
  }
  render() {
    return html`
      <p>${this.myString}</p>
      <ul>
        ${this.myArray.map(i => html`<li>${i}</li>`)}
      </ul>
      ${this.myBool?
        html`<p>Render some HTML if myBool is true</p>`:
        html`<p>Render some other HTML if myBool is false</p>`}
    `;
  }
}

customElements.define('my-element', MyElement);
```

