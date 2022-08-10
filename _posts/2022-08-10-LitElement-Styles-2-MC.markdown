---
layout: main-content-post
title:  LitElement Styles 2
date:   2020-08-21T14:02:13.403Z
permalink: /webcomponents-litelement-styles-ii/main-content/
icon: https://codersnack.com/assets/images/litelement-icon.png
categories: [snack-main-content-post]
---

### Define scoped styles in the template

> We recommend using static styles for optimal performance. However, sometimes you may want to define styles in the LitElement template. 

There are two ways to add scoped styles in the template:

- Add styles using a ```<style>``` element.
- Add styles using an **external style sheet**.

Each of these techniques has its own set of **advantages and drawbacks**.

#### In a style element

We recommend using static styles for optimal performance. However, **static styles are evaluated once per class. Sometimes, you might need to evaluate styles per instance.**

We recommend using CSS properties to create customizable styles. However, you can also include ```<style>``` elements in a LitElement template. These are **updated per instance**.

```
render() {
  return html`
    <style>
      /* updated per instance */
    </style>
    <div>template content</div>
  `;
}
```

### Expressions and style elements

The most intuitive way to evaluate per-instance styles has some important limitations and performance issues. We consider the example below to be an **anti-pattern**:

```
// Anti-pattern!
render() {
  return html`
    <style>
      :host {
        /* Warning: this approach has limitations & performance issues! */
        color: ${myColor}
      } 
    </style>
    <div>template content</div>
  `;
}
```
> Expressions inside a ```<style>``` element won’t update per instance in ShadyCSS, due to limitations of the ShadyCSS polyfill. See the ShadyCSS readme for more information.

Additionally, evaluating an expression inside a ```<style>``` element is inefficient. When any text inside a ```<style>``` element changes, the **browser must re-parse the whole** ```<style>``` element, resulting in unnecessary work.

If you need to evaluate expressions inside a ```<style>``` element, use the following strategy to avoid creating performance problems:

- **Separate styles that require per-instance evaluation from those that don’t**.

- Evaluate per-instance CSS properties by **creating an expression that captures that property inside a complete** ```<style>``` block. Include it in your template.

Example

```
import { LitElement, html } from 'lit-element';

const perClassStyle = html`
  <style>
    :host {
      display: block;
      font-family: Roboto;
      font-size: 14px; 
    }
  </style>
`;

const blueText = html`
  <style> :host { color: blue; } </style>
`;

const redText = html`
  <style> :host { color: red; } </style>
`;

class MyElement extends LitElement {
  constructor() {
    super();
    this.perInstanceStyle = redText;
  }
  render() {
    return html`
      ${perClassStyle}
      ${this.perInstanceStyle}
      <div>Hello World</div>
    `;
  }
}

customElements.define('my-element', MyElement);
```

#### Import an external stylesheet

We recommend placing your styles in a static styles property for optimal performance. However, **you can include an external style sheet in your template with a** ```<link>```:

```
import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  render() {
    return html`
      <link rel="stylesheet" href="./app-styles.css">
      <button>a button</button>
      <div>a div</div>
    `;
  }
}

customElements.define('my-element', MyElement);
```

There are some important caveats though:

- The ShadyCSS polyfill doesn’t support external style sheets.

- External styles can cause a **flash-of-unstyled-content (FOUC) ** while they load.

- The URL in the **href attribute is relative to the main document**. This is okay if you’re building an app and your asset URLs are well-known, but **avoid using external style sheets when building a reusable element**.

### Dynamic classes and styles

**One way to make styles dynamic is to add bindings to the class or style attributes in your template.**

The **lit-html** library offers two **directives**, **classMap** and **styleMap**, to conveniently **apply classes and styles in HTML templates**.

For more information on these and other lit-html directives, see the documentation on lit-html built-in directives.

To use styleMap and/or classMap:

- Import classMap and/or styleMap:

```
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
```

- Use **classMap** and/or **styleMap** in your element template:

```
constructor() {
  super();
  this.classes = { mydiv: true, someclass: true };
  this.styles = { color: 'green', fontFamily: 'Roboto' };
}
render() {
  return html`
    <div class=${classMap(this.classes)} style=${styleMap(this.styles)}>
      Some content
    </div>
  `;
}
```

#### classMap syntax

classMap applies a set of classes to an HTML element:

```
<div class=${classMap({alert:true,info:true})}>Content.</div>
<!-- Equivalent: <div class="alert info">Content.</div> -->
```

#### styleMap syntax

styleMap applies a set of CSS rules to an HTML element:

```
<button style=${styleMap({
  backgroundColor: 'blue',
  border: '1px solid black'
})}>A button</button>

<!-- Equivalent: 
  <button style="
    background-color:blue;
    border: 1px solid black;
  ">A button</button>
-->
```

To refer to hyphenated properties such as ```font-family```, use the camelCase equivalent (**fontFamily**) or place the hyphenated property name in quotes ('font-family').

To refer to custom CSS properties such as ```--custom-color```, place the whole property name in quotes ('--custom-color').

**Inline style or CSS	|     styleMap equivalent**

background-color: blue; | backgroundColor: 'blue' or 'background-color': 'blue'

font-family: Roboto, Arial, sans-serif;	|    fontFamily: 'Roboto, Arial, sans-serif' or 'font-family': 'Roboto, Arial, sans-serif'
```--custom-color: #FFFABC;```	|   	'--custom-color': '#FFFABC;'
```--otherCustomColor: #FFFABC;```	|   	'--otherCustomColor': '#FFFABC;'
```color: var(--customprop, blue);```	|   	color: 'var(--customprop, blue)'

Examples

*Inline style syntax:*

```
<div style="
  background-color:blue;
  font-family:Roboto;
  --custom-color:#e26dd2;
  --otherCustomColor:#77e26d;">
</div>
```
*Equivalent CSS syntax:*

```
div {
  background-color: blue;
  font-family: Roboto;
  --custom-color: #e26dd2;
  --otherCustomColor: #77e26d;
}
```

*Equivalent styleMap syntax:*

```
html`
  <div style=${styleMap({
    'background-color': 'blue',
    fontFamily: 'Roboto',
    '--custom-color': '#e26dd2',
    '--otherCustomColor': '#77e26d'
  })}></div>
`
```

### Theming

Use **CSS inheritance to propagate style information to LitElement** components and their rendered templates.

```
<style>
  html {
    --themeColor: #123456;
    font-family: Roboto;
  }
</style>

<!-- host inherits `--themeColor` and `font-family` and
     passes these properties to its rendered template -->
<my-element></my-element>
```

**Use CSS variables and custom properties to configure styles per-instance**.

```
<style>
  html {
    --my-element-background-color: /* some color */;
  }
  .stuff {
    --my-element-background-color: /* some other color */;
  }
</style>

<my-element></my-element>

<my-element class="stuff"></my-element>

// MyElement's static styles
static get styles() {
  return css`
    :host {
      background-color: var(--my-element-background-color);
    }
  `;
}
```

#### CSS inheritance

CSS inheritance lets parent and host elements propagate certain CSS properties to their descendents.

**Not all CSS properties inherit. Inherited CSS properties include**:

- color
- font-family and other font-* properties
- All CSS custom properties (--*)

See CSS Inheritance on MDN for more information.

You can use CSS inheritance to set styles on an ancestor element that are inherited by its descendents:

```
<style>
html { 
  font-family: Roboto;
}
</style>

<div>
  <p>Uses Roboto</p>
</div>
```
Similarly, **host elements pass down inheritable CSS properties to their shadow trees**.

You can use the **host element's type selector to style it**:

```
<style>
  my-element { font-family: Roboto; }
</style>

<my-element></my-element>

class MyElement extends LitElement {
  render() { 
    return html`<p>Uses Roboto</p>`; 
  }
}
```

You can also use the ```:host``` **CSS pseudo-class** to **style the host from inside** its own template:

```
static get styles() {
  return css`
    :host {
      font-family: Roboto;
    }
  `;
}
render() {
  return html`
    <p>Uses Roboto</p>
  `;
}
```

> Type selectors have higher specificity than ```:host```.

An element type selector has higher specificity than the ```:host``` pseudo-class selector. Styles set for a custom element tag will override styles set with :host and :host():

```
<style>
  my-element { font-family: Courier; }
</style>

<my-element></my-element>

class MyElement extends LitElement {
  static get styles() { 
    return css`:host { font-family: Roboto; }`
  }
  render() {
    return html`<p>Will use courier</p>`;
  }
}
```

#### CSS custom properties

**All CSS custom properties (--custom-property-name) inherit**. You can use this to make your component’s styles configurable from outside.

The following component sets its background color to a CSS variable. The CSS variable uses the value of --my-background if it’s available, and otherwise defaults to yellow:

```
class MyElement extends LitElement {
  static get styles() { 
    return css`
      :host { 
        background-color: var(--my-background, yellow); 
      }
    `;
  }
  render() {
    return html`<p>Hello world</p>`;
  }
}
```

Users of this component can set the value of --my-background, using the my-element tag as a CSS selector:

```
<style>
  my-element {
    --my-background: rgb(67, 156, 144);
  }
</style>

<my-element></my-element>
```
```--my-background``` is configurable per instance of my-element:

```
<style>
  my-element {
    --my-background: rgb(67, 156, 144);
  }
  my-element.stuff {
    --my-background: #111111;
  }
</style>
<my-element></my-element>
<my-element class="stuff"></my-element>
```

If a component user has an existing app theme, they can easily set the host’s configurable properties to use theme properties:

```
<html>
  <head>
    <title>lit-element code sample</title>
    <script type="module" src="./my-element.js"></script>
    <style>
      html { --themeColor1: rgb(67, 156, 144); }
      my-element {
        --myBackground: var(--themeColor1);
        --myColor: rgb(156, 67, 152);
      }
    </style>
  </head>
  <body>
    <my-element></my-element>
  </body>
</html>
```
See CSS Custom Properties on MDN for more information.

*A simple example theme*
**index.html**

```
<html>
  <head>
    <script type="module" src="./my-element.js"></script>
    <title>lit-element code sample</title>
    <style>
      html {
        --theme-primary: green;
        --theme-secondary: aliceblue;
        --theme-warning: red;
        --theme-font-family: Roboto;
      }
      my-element { 
        --my-element-text-color: var(--theme-primary); 
        --my-element-background-color: var(--theme-secondary); 
        --my-element-font-family: var(--theme-font-family);
      } 
      .warning {
        --my-element-text-color: var(--theme-warning); 
      }
    </style>
  </head>
  <body>
    <my-element></my-element>
    <my-element class="warning"></my-element>
  </body>
</html>
```

**my-element.js**

```
import { LitElement, html, css } from 'lit-element';

class MyElement extends LitElement {
  static get styles() { 
    return css`
      :host { 
        display: block;
        color: var(--my-element-text-color, black); 
        background: var(--my-element-background-color, white);  
        font-family: var(--my-element-font-family, Roboto);
      }
      :host([hidden]) {
        display: none;
      }
    `;
  }
  render() {
    return html`<div>Hello World</div>`;
  }
}
customElements.define('my-element', MyElement);
```