---
layout: post
title:  LitElement Templates 2
date:   2020-04-14T15:08:01.179Z
permalink: /webcomponents-litelement-templates-2/
icon: https://codersnack.com/assets/images/litelement-icon.png
categories: [snackpost]
---

> *Information drawn from* - [LitElement Templates](https://lit-element.polymer-project.org/guide/templates)

### Bind properties to templated elements
You can insert JavaScript expressions as placeholders for HTML text content, attributes, Boolean attributes, properties, and event handlers.

- Text content: ```<p>${...}</p>```
- Attribute: ```<p id="${...}"></p>```
- Boolean attribute: ```?disabled="${...}"```
- Property: ```.value="${...}"```
- Event handler: ```@event="${...}"```

JavaScript expressions can include your element's properties. **LitElement observes and reacts to property changes, so your templates update automatically**.

**Data bindings are always one-way (parent to child)**. 
> To share data from a child element to its parent, fire an event and capture the relevant data in the detail property**.

#### Bind to text content
Bind prop1 to text content:

```
html`<div>${this.prop1}</div>`
```
#### Bind to an attribute
Bind prop2 to an attribute:

```
html`<div id="${this.prop2}"></div>`
```
Attribute values are always strings, so an **attribute binding should return a value that can be converted into a string**.

#### Bind to a boolean attribute
Bind prop3 to a boolean attribute:

```
html`<input type="text" ?disabled="${this.prop3}">`
```
Boolean attributes are added if the expression evaluates to a truthy value, and removed if it evaluates to a falsy value.

#### Bind to a property
Bind prop4 to a property:

```
html`<input type="checkbox" .value="${this.prop4}"/>`
```

#### Bind to an event handler
Bind clickHandler to a click event:

```
html`<button @click="${this.clickHandler}">pie?</button>`
```
The default event context for ```@event``` expressions is this, so **there is no need to bind the handler function**.

**Examples**
*my-element.js*

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() {
    return {
      prop1: String,
      prop2: String,
      prop3: Boolean,
      prop4: String
    };
  }
  constructor() {
    super();
    this.prop1 = 'text binding';
    this.prop2 = 'mydiv';
    this.prop3 = true;
    this.prop4 = 'pie';
  }
  render() {
    return html`
      <!-- text binding -->
      <div>${this.prop1}</div>

      <!-- attribute binding -->
      <div id="${this.prop2}">attribute binding</div>

      <!-- boolean attribute binding -->
      <div>
        boolean attribute binding
        <input type="text" ?disabled="${this.prop3}"/>
      </div>

      <!-- property binding -->
      <div>
        property binding
        <input type="text" .value="${this.prop4}"/>
      </div>

      <!-- event handler binding -->
      <div>event handler binding
        <button @click="${this.clickHandler}">click</button>
      </div>
    `;
  }
  clickHandler(e) {
    console.log(e.target);
  }
}

customElements.define('my-element', MyElement);
```


### Render children with the slot element
Your component may accept children (like a ```<ul>``` element can have ```<li>``` children).

```
<my-element>
  <p>A child</p>
</my-element>
```

**By default, if an element has a shadow tree, its children don't render at all. To render children, your template needs to include one or more ```<slot>``` elements, which act as placeholders for child nodes.**

### Use the slot element
To render an element's children, create a ```<slot>``` for them in the element's template. For example:

```
render(){
  return html`
    <div>
      <slot></slot>
    </div>
  `;
}
```
Children will now render in the ```<slot>```:

```
<my-element>
  <p>Render me</p>
</my-element>
```
The children aren't moved in the DOM tree, but they’re rendered as if they were children of the ```<slot>```.

Arbitrarily many children can populate a single slot:

```
<my-element>
  <p>Render me</p>
  <p>Me too</p>
  <p>Me three</p>
</my-element>
```

### Use named slots
To assign a child to a specific slot, ensure that the child's slot attribute matches the slot's name attribute:

```
render(){
  return html`
    <div>
      <slot name="one"></slot>
    </div>
  `;
}
```
**index.html**

```
<my-element>
  <p slot="one">Include me in slot "one".</p>
</my-element>
```
Named slots only accept children with a matching slot attribute.

For example, ```<slot name="one"></slot>``` only accepts children with the attribute ```slot="one"```.

Children with a slot attribute will only be rendered in a slot with a matching name attribute.

For example, ```<p slot="one">...</p>``` will only be placed in ```<slot name="one"></slot>```.

**Examples**

*my-element.js*

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  render(){
    return html`
      <div>
        <slot name="one"></slot>
        <slot name="two"></slot>
      </div>
    `;
  }
}
customElements.define('my-element', MyElement);
```

*index.html*

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
  <script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
  
  <script type="module" src="./my-element.js"></script>
  <title>lit-element code sample</title>
</head>
<body>
    <!-- Assign child to a specific slot -->

    <my-element>
      <p slot="two">Include me in slot "two".</p>
    </my-element>

    <!-- 
      Named slots only accept children with a matching `slot` attribute. 
      
      Children with a `slot` attribute can only go into a slot with a matching name. 
    -->

    <my-element>
      <p slot="one">Include me in slot "one".</p>
      <p slot="nope">This one will not render at all.</p>
      <p>No default slot, so this one won't render either.</p>
    </my-element>
</body>
</html>
```

### Use name, not id, to select slots.

Note that a slot’s id attribute has no effect!

*my-element.js*

```
render(){
  return html`
    <div>
      <slot id="one"></slot>
    </div>
  `;
}
```

*index.html*

```
<my-element>
  <p slot="one">nope.</p>
  <p>ohai..</p>
</my-element>
```