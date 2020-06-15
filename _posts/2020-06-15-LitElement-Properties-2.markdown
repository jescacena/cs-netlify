---
layout: post
title:  LitElement Properties 2
date:   2020-04-14T15:07:15.496Z
permalink: /webcomponents-litelement-properties-2/
icon: https://codersnack.com/assets/images/litelement-icon.png
categories: [snackpost]
---

> *Information drawn from* - [LitElement Properties](https://lit-element.polymer-project.org/guide/properties)
- [Alligator.io attributes-properties](https://alligator.io/web-components/attributes-properties/)

### Properties vs Attributes
The difference between properties and attributes can be confusing. **Properties are available on a DOM node** when being manipulated by JavaScript:

```
const myElem = document.querySelector('.my-elem');
myElem.className; // className is a property
```
And **attributes are provided in the HTML itself**. Here alt, width and height are all attributes:
```
<img src="/path/to/img.svg" alt="My Image" width="150" height="250">
```
**Attributes should only be used for scalar values like strings, numbers and boolean values**. **Properties, on the other hand, are perfectly suited to also hold values that are objects or arrays**.

### Reflecting Properties to Attributes
**Most properties reflect their values as attributes, meaning that if the property is changed using JavaScript, the corresponding attribute is also changed at the same time to reflect the new value**. This is useful for accessibility and to allow CSS selectors to work as intended.

You can try it out yourself for a concrete example. Just select, say, an image element in your browser’s developer tools, and then change one of its properties:

```
const fancyImage = document.querySelector('.fancy-image');

fancyImage.width = 777;
```
Notice how the with attribute in the DOM representation is automatically changed to the new value. The same is true if you change the value for the attribute manually in the DOM inspector, you’ll see that the property will now hold the new value.

![attributes-properties](https://codersnack.com/assets/images/attributes-properties.png)

### Reflecting properties to attributes in Custom Elements
Your own Custom Elements should also follow this practice of reflecting properties to attributes. Luckily, it's quite easy to do using getters and setters.

For example, if you have a custom element that has a value property that should be reflected as an attribute, here’s how you would use a getter and a setter to get the value of the attribute when doing property access and setting the new value for the attribute when the property is changed:

```
get value() {
  return this.getAttribute('value');
}

set value(newValue) {
  this.setAttribute('value', newValue);
}
```
Or, if you have a boolean property, like, say hidden:

```
get hidden() {
  return this.hasAttribute('hidden');
}

set hidden(isHidden) {
  if (isHidden) {
    this.setAttribute('hidden', '');
  } else {
    this.removeAttribute('hidden');
  }
}
```

### Configure attributes

#### Convert between properties and attributes

**While element properties can be of any type, attributes are always strings**. This impacts the observed attributes and reflected attributes of non-string properties:

To observe an attribute (set a property from an attribute), the attribute value must be converted from a string to match the property type.

To reflect an attribute (set an attribute from a property), the property value must be converted to a string.

#### Use the default converter
LitElement has a default converter which handles String, Number, Boolean, Array, and Object property types.

**To use the default converter, specify the type option in your property declaration**:
```
// Use LitElement's default converter 
prop1: { type: String },
prop2: { type: Number },
prop3: { type: Boolean },
prop4: { type: Array },
prop5: { type: Object }
```
The information below shows how the default converter handles conversion for each type.

#### Convert from attribute to property

- For Strings, when the attribute is defined, set the property to the attribute value.
- For Numbers, when the attribute is defined, set the property to Number(attributeValue).
- For Booleans, when the attribute is:
     non-null, set the property to true.
     null or undefined, set the property to false.
- For Objects and Arrays, when the attribute is:
     Defined, set the property value to JSON.parse(attributeValue).

#### Convert from property to attribute

- For Strings, when the property is:
    null, remove the attribute.
    undefined, don’t change the attribute.
    Defined and not null, set the attribute to the property value.
- For Numbers, when the property is:
    null, remove the attribute.
    undefined, don’t change the attribute.
    Defined and not null, set the attribute to the property value.
- For Booleans, when the property is:
    truthy, create the attribute.
    falsy, remove the attribute.
- For Objects and Arrays, when the property is:
    null or undefined, remove the attribute.
    Defined and not null, set the attribute value to JSON.stringify(propertyValue).

**Example**: Use the default converter

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() { return {
    prop1: { type: String, reflect: true },
    prop2: { type: Number, reflect: true },
    prop3: { type: Boolean, reflect: true },
    prop4: { type: Array, reflect: true },
    prop5: { type: Object, reflect: true }
  };}

  constructor() {
    super();
    this.prop1 = '';
    this.prop2 = 0;
    this.prop3 = false;
    this.prop4 = [];
    this.prop5 = { };
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log('attribute change: ', name, newVal);
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  render() {
    return html`
      <p>prop1 ${this.prop1}</p>
      <p>prop2 ${this.prop2}</p>
      <p>prop3 ${this.prop3}</p>

      <p>prop4: ${this.prop4.map((item, index) =>
        html`<span>[${index}]:${item}&nbsp;</span>`)}
      </p>

      <p>prop5:
        ${Object.keys(this.prop5).map(item =>
          html`<span>${item}: ${this.prop5[item]}&nbsp;</span>`)}
      </p>

      <button @click="${this.changeProperties}">change properties</button>
      <button @click="${this.changeAttributes}">change attributes</button>
    `;
  }

  changeAttributes() {
    let randy = Math.floor(Math.random()*10);
    let myBool = this.getAttribute('prop3');

    this.setAttribute('prop1', randy.toString());
    this.setAttribute('prop2', randy.toString());
    this.setAttribute('prop3', myBool? '' : null);
    this.setAttribute('prop4', JSON.stringify([...this.prop4, randy]));
    this.setAttribute('prop5',
      JSON.stringify(Object.assign({}, this.prop5, {[randy]: randy})));
    this.requestUpdate();
  }

  changeProperties() {
    let randy = Math.floor(Math.random()*10);
    let myBool = this.prop3;

    this.prop1 = randy.toString();
    this.prop2 = randy;
    this.prop3 = !myBool;
    this.prop4 = [...this.prop4, randy];
    this.prop5 = Object.assign({}, this.prop5, {[randy]: randy});
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
  }

}

customElements.define('my-element', MyElement);
```

#### Configure a custom converter
You can specify a custom property converter in your property declaration with the converter option:

```
myProp: { 
  converter: // Custom property converter
} 
```
converter can be an object or a function. If it is an object, it can have keys for fromAttribute and toAttribute:

```
prop1: { 
  converter: { 
    fromAttribute: (value, type) => { 
      // `value` is a string
      // Convert it to a value of type `type` and return it
    },
    toAttribute: (value, type) => { 
      // `value` is of type `type` 
      // Convert it to a string and return it
    }
  }
}
```
If converter is a function, it is used in place of fromAttribute:

```
myProp: { 
  converter: (value, type) => { 
    // `value` is a string
    // Convert it to a value of type `type` and return it
  }
} 
```
If no **toAttribute** function is supplied for a reflected attribute, the attribute is set to the property value without conversion.

During an update:

- If toAttribute returns null, the attribute is removed.

- If toAttribute returns undefined, the attribute is not changed.

**Example**: Configure a custom converter

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() { return {
    myProp: {
      reflect: true,
      converter: {
        toAttribute(value) {
          console.log('myProp\'s toAttribute.');
          console.log('Processing:', value, typeof(value));
          let retVal = String(value);
          console.log('Returning:', retVal, typeof(retVal));
          return retVal;
        },

        fromAttribute(value) {
          console.log('myProp\'s fromAttribute.');
          console.log('Processing:', value, typeof(value));
          let retVal = Number(value);
          console.log('Returning:', retVal, typeof(retVal));
          return retVal;
        }
      }
    },

    theProp: {
      reflect: true,
      converter(value) {
        console.log('theProp\'s converter.');
        console.log('Processing:', value, typeof(value));

        let retVal = Number(value);
        console.log('Returning:', retVal, typeof(retVal));
        return retVal;
      }},
  };}

  constructor() {
    super();
    this.myProp = 'myProp';
    this.theProp = 'theProp';
  }

  attributeChangedCallback(name, oldval, newval) {
    // console.log('attribute change: ', name, newval);
    super.attributeChangedCallback(name, oldval, newval);
  }

  render() {
    return html`
      <p>myProp ${this.myProp}</p>
      <p>theProp ${this.theProp}</p>

      <button @click="${this.changeProperties}">change properties</button>
      <button @click="${this.changeAttributes}">change attributes</button>
    `;
  }

  changeAttributes() {
    let randomString = Math.floor(Math.random()*100).toString();
    this.setAttribute('myprop', 'myprop ' + randomString);
    this.setAttribute('theprop', 'theprop ' + randomString);
    this.requestUpdate();
  }

  changeProperties() {
    let randomString = Math.floor(Math.random()*100).toString();
    this.myProp='myProp ' + randomString;
    this.theProp='theProp ' + randomString;
  }
}
customElements.define('my-element', MyElement);
```

### Configure observed attributes
An **observed attribute fires** the custom elements API callback **attributeChangedCallback** whenever it changes. By default, whenever an attribute fires this callback, LitElement sets the property value from the attribute using the property's fromAttribute function. See Convert between properties and attributes for more information.

**By default, LitElement creates a corresponding observed attribute for all declared properties**. The name of the observed attribute is the property name, lowercased:

```
// observed attribute name is "myprop"
myProp: { type: Number }
```
To create an observed attribute with a different name, set attribute to a string:

```
// Observed attribute will be called my-prop
myProp: { attribute: 'my-prop' }
```

**To prevent an observed attribute from being created for a property**, set attribute to false. The property will not be initialized from attributes in markup, and attribute changes won’t affect it.

```
// No observed attribute for this property
myProp: { attribute: false }
```

**An observed attribute can be used to provide an initial value for a property via markup**. See Initialize properties with attributes in markup.

**Example**: Configure observed attributes

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() { return {
    myProp: { attribute: true },
    theProp: { attribute: false },
    otherProp: { attribute: 'other-prop' },
  };}

  constructor() {
    super();
    this.myProp = 'myProp';
    this.theProp = 'theProp';
    this.otherProp = 'otherProp';
  }

  attributeChangedCallback(name, oldval, newval) {
    console.log('attribute change: ', name, newval);
    super.attributeChangedCallback(name, oldval, newval);
  }

  render() {
    return html`
      <p>myProp ${this.myProp}</p>
      <p>theProp ${this.theProp}</p>
      <p>otherProp ${this.otherProp}</p>

      <button @click="${this.changeAttributes}">change attributes</button>
    `;
  }

  changeAttributes() {
    let randomString = Math.floor(Math.random()*100).toString();
    this.setAttribute('myprop', 'myprop ' + randomString);
    this.setAttribute('theprop', 'theprop ' + randomString);
    this.setAttribute('other-prop', 'other-prop ' + randomString);
    this.requestUpdate();
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
  }
}
customElements.define('my-element', MyElement);
```

An observed attribute can be used to provide an initial value for a property via markup. See Initialize properties with attributes in markup.

### Configure reflected attributes
**You can configure a property so that whenever it changes, its value is reflected to its observed attribute**. For example:

```
// Value of property "myProp" will reflect to attribute "myprop"
myProp: { reflect: true }
```

When the property changes, LitElement uses the toAttribute function in the property's converter to set the attribute value from the new property value.

- If toAttribute returns null, the attribute is removed.

- If toAttribute returns undefined, the attribute is not changed.

- If toAttribute itself is undefined, the property value is set to the attribute value without conversion.

LitElement tracks reflection state during updates. LitElement keeps track of state information to avoid creating an infinite loop of changes between a property and an observed, reflected attribute.

**Example**: Configure reflected attributes

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties() { return {
    myProp: { reflect: true }
  };}

  constructor() {
    super();
    this.myProp='myProp';
  }

  attributeChangedCallback(name, oldval, newval) {
    console.log('attribute change: ', newval);
    super.attributeChangedCallback(name, oldval, newval);
  }

  render() {
    return html`
      <p>${this.myProp}</p>

      <button @click="${this.changeProperty}">change property</button>
    `;
  }

  changeProperty() {
    let randomString = Math.floor(Math.random()*100).toString();
    this.myProp='myProp ' + randomString;
  }

}
customElements.define('my-element', MyElement);
```

### Configure property changes
All declared properties have a function, **hasChanged**, which is **called whenever the property is set.**

hasChanged compares the property's old and new values, and evaluates whether or not the property has changed. If hasChanged returns true, **LitElement starts an element update if one is not already scheduled**. See the Element update lifecycle documentation for more information on how updates work.

By default:

- hasChanged returns true if newVal !== oldVal.
- hasChanged returns false if both the new and old values are NaN.

To customize **hasChanged** for a property, specify it as a property option:

```
myProp: { hasChanged(newVal, oldVal) {
  // compare newVal and oldVal
  // return `true` if an update should proceed
}}
```
**Example**: Configure property changes

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  static get properties(){ return {
    myProp: {
      type: Number,

      /**
       * Compare myProp's new value with its old value.
       *
       * Only consider myProp to have changed if newVal is larger than
       * oldVal.
       */
      hasChanged(newVal, oldVal) {
        if (newVal > oldVal) {
          console.log(`${newVal} > ${oldVal}. hasChanged: true.`);
          return true;
        }
        else {
          console.log(`${newVal} <= ${oldVal}. hasChanged: false.`);
          return false;
        }
      }
    }};
  }

  constructor(){
    super();
    this.myProp = 1;
  }

  render(){
    return html`
      <p>${this.myProp}</p>
      <button @click="${this.getNewVal}">get new value</button>
    `;
  }

  updated(){
    console.log('updated');
  }

  getNewVal(){
    let newVal = Math.floor(Math.random()*10);
    this.myProp = newVal;
  }

}
customElements.define('my-element', MyElement);
```

  