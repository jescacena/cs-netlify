---
layout: post
title:  LitElement Properties 1
date:   2020-04-14T15:07:45.096Z
permalink: /webcomponents-litelement-properties-1/
icon: https://codersnack.com/assets/images/litelement-icon.png
categories: [snackpost]
---

> Information drawn from 
- [LitElement properties](https://lit-element.polymer-project.org/guide/properties)

### Overview
**LitElement manages your declared properties and their corresponding attributes**. By default, LitElement will:

- Ensure that an **element update is scheduled when any declared property changes**.
- Capture instance values for declared properties. Apply any property values that are set before the browser registers a custom element definition.
- **Set up an observed (not reflected) attribute** with the lowercased name of each property.
- **Handle attribute conversion** for properties declared as type String, Number, Boolean, Array, and Object.
- Use **direct comparison (oldValue !== newValue) to test for property changes**.
- Apply any property options and accessors declared by a superclass.

> Remember to declare all of the properties that you want LitElement to manage. For the property features above to be applied, you must declare the property.

### Property options
A property declaration is an object in the following format:
```
{ optionName1: optionValue1, optionName2: optionValue2, ... }
```

The following options are available:

- **converter**: Convert between properties and attributes.
- **type**: Use LitElement’s default attribute converter.
- **attribute**: Configure **observed** attributes.
- **reflect**: Configure **reflected** attributes.
- **noAccessor**: Whether to set up a default property accessor.
- **hasChanged**: Specify what constitutes a property change.

> All property declaration options can be specified in a static properties getter, or with TypeScript decorators.

### Declare properties
Declare your element’s properties by implementing a static properties getter, or by using decorators:

```
// properties getter
static get properties() {
  return { 
    prop1: { type: String }
  };
}
// Decorators (requires TypeScript or Babel)
export class MyElement extends LitElement {
  @property( { type : String }  ) prop1 = '';
```

#### Declare properties in a static properties getter
To declare properties in a static properties getter:

```
static get properties() { 
  return { 
    prop1: { type: String },
    prop2: { type: Number },
    prop3: { type: Boolean }
  };
}
```

If you implement a static properties getter, initialize your property values in the element constructor.

```
constructor() {
  // Always call super() first
  super();
  this.prop1 = 'Hello World';
  ...
}
```
> Remember to call ```super()``` first in your constructor, or your element won’t render at all.

**Example**: Declare properties with a static properties getter

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() { return {
    prop1: { type: String },
    prop2: { type: Number },
    prop3: { type: Boolean },
    prop4: { type: Array },
    prop5: { type: Object }
  };}

  constructor() {
    super();
    this.prop1 = 'Hello World';
    this.prop2 = 5;
    this.prop3 = false;
    this.prop4 = [1,2,3];
    this.prop5 = { subprop1: 'prop 5 subprop1 value' }
  }

  render() {
    return html`
      <p>prop1: ${this.prop1}</p>
      <p>prop2: ${this.prop2}</p>
      <p>prop3: ${this.prop3}</p>
      <p>prop4[0]: ${this.prop4[0]}</p>
      <p>prop5.subprop1: ${this.prop5.subprop1}</p>
    `;
  }
}

customElements.define('my-element', MyElement);
```

#### Declare properties with decorators
You can also declare properties with **decorators**:

```
@property({type : String})  prop1 = 'Hello World';
```
> Decorators are a proposed JavaScript feature, so you’ll need to use a transpiler like Babel or the TypeScript compiler to use decorators.

If you’re using Babel, you’ll need to use the ```@babel/plugin-proposal-decorators```  plugin.

If you’re using TypeScript, you’ll need to **enable the experimentalDecorators compiler option** (for example, by setting "experimentalDecorators": true in *tsconfig.json*). Enabling emitDecoratorMetadata is not required and not recommended.

**Example**: Declare properties with decorators

```
import { LitElement, html, customElement, property } from 'lit-element';

@customElement('my-element')
export class MyElement extends LitElement {
  @property({type : String})  prop1 = 'Hello World';
  @property({type : Number})  prop2 = 5;
  @property({type : Boolean}) prop3 = true;
  @property({type : Array})   prop4 = [1,2,3];
  @property({type : Object})  prop5 = { subprop1: 'prop 5 subprop1 value' };

  render() {
    return html`
      <p>prop1: ${this.prop1}</p>
      <p>prop2: ${this.prop2}</p>
      <p>prop3: ${this.prop3}</p>
      <p>prop4[0]: ${this.prop4[0]}</p>
      <p>prop5.subprop1: ${this.prop5.subprop1}</p>
    `;
  }
}
```

#### Initialize property values
Initialize property values in the element constructor
If you implement a static properties getter, initialize your property values in the element constructor:

```
static get properties() { return { /* Property declarations */ }; } 

constructor() {
  // Always call super() first
  super();

  // Initialize properties 
  this.prop1 = 'Hello World';
}
```
> Remember to call super() first in your constructor, or your element won’t render at all.

**Example**: Initialize property values in the element constructor

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() { return {
    prop1: { type: String },
    prop2: { type: Number },
    prop3: { type: Boolean },
    prop4: { type: Array },
    prop5: { type: Object }
  };}

  constructor() {
    super();
    this.prop1 = 'Hello World';
    this.prop2 = 5;
    this.prop3 = true;
    this.prop4 = [1,2,3];
    this.prop5 = { stuff: 'hi', otherStuff: 'wow' };
  }

  render() {
    return html`
      <p>prop1: ${this.prop1}</p>
      <p>prop2: ${this.prop2}</p>
      <p>prop3: ${this.prop3}</p>

      <p>prop4: ${this.prop4.map((item, index) =>
        html`<span>[${index}]:${item}&nbsp;</span>`)}
      </p>

      <p>prop5:
        ${Object.keys(this.prop5).map(item =>
          html`<span>${item}: ${this.prop5[item]}&nbsp;</span>`)}
      </p>
    `;
  }
}
customElements.define('my-element', MyElement);
```

#### Initialize property values when using TypeScript decorators
TypeScript users can initialize property values when they are declared with the @property decorator:

```
@property({ type : String }) prop1 = 'Hello World';
```
**Example**: Initialize property values when using TypeScript decorators

```
import { LitElement, html, customElement, property } from 'lit-element';

@customElement('my-element')
export class MyElement extends LitElement {
  // Declare and initialize properties
  @property({type : String})  prop1 = 'Hello World';
  @property({type : Number})  prop2 = 5;
  @property({type : Boolean}) prop3 = true;
  @property({type : Array})   prop4 = [1,2,3];
  @property({type : Object})  prop5 = { subprop1: 'hi', thing: 'fasdfsf' };

  render() {
    return html`
      <p>prop1: ${this.prop1}</p>
      <p>prop2: ${this.prop2}</p>
      <p>prop3: ${this.prop3}</p>

      <p>prop4: ${this.prop4.map((item, index) =>
        html`<span>[${index}]:${item}&nbsp;</span>`)}
      </p>

      <p>prop5:
        ${Object.keys(this.prop5).map(item =>
          html`<span>${item}: ${this.prop5[item]}&nbsp;</span>`)}
      </p>
    `;
  }
}
```

#### Initialize property values from attributes in markup
You can also initialize property values from observed attributes in markup:

*index.html*

```
<my-element 
  mystring="hello world"
  mynumber="5"
  mybool
  myobj='{"stuff":"hi"}'
  myarray='[1,2,3,4]'></my-element>
```

See observed attributes and converting between properties and attributes for more information on setting up initialization from attributes.