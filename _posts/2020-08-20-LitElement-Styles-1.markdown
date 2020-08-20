---
layout: post
title:  LitElement Styles 1
date:   2020-08-20T21:31:57.650Z
permalink: /webcomponents-litelement-styles/
icon: https://codersnack.com/assets/images/litelement-icon.png
categories: [snackpost]
---

> Information drawn from 
- [LitElement styles](https://lit-element.polymer-project.org/guide/styles)

This page describes how to add styles to your component.

Your component’s template is rendered to its shadow DOM tree. **The styles you add to your component are automatically scoped to the shadow tree, so they don’t leak out and affect other elements**.

### Add styles to your component

For optimal performance, define **scoped styles in a static ```styles``` property**.

Define styles in a tagged template literal, using the **css tag function**:

```
import { LitElement, css, html } from 'lit-element';

class MyElement extends LitElement {
  static get styles() {
    return css`
      div { color: red; }
    `;
  }
  render() { 
    return html`
      <div>I'm styled!</div> 
    `;
  }
}
```

The styles you add to your component are scoped using **shadow DOM**. For a quick overview of shadow DOM styling, see Shadow DOM styling overview.

The value of the static styles property can be:

A **single** tagged template literal.

```
static get styles() {
  return css`...`;
} 
```
An **array** of tagged template literals.

```
static get styles() {
  return [ css`...`, css`...`];
}
```
The static styles property is usually the best way to add styles to your component, but there are some use cases you can’t handle this way ; for example, linking to an external style sheet. For alternate ways to add styles, see Define scoped styles in the template.

#### Expressions in static styles

**Static styles apply to all instances of a component**. Any expressions in CSS are evaluated once, then reused for all instances.

> To allow for theming or per-instance style customization, use CSS variables and custom properties to create configurable styles.

To prevent LitElement-based components from evaluating potentially malicious code, **the css tag only allows nested expressions that are themselves css tagged strings or numbers.**

```
import { LitElement, html, css } from 'lit-element';

const mainColor = css`red`;

class MyElement extends LitElement {
  static get styles() {
    return css`
      div { color: ${mainColor} }
    `;
  }
  render() {
    return html`<div>Some content in a div</div>`;
  }
}

customElements.define('my-element', MyElement);
```

This restriction exists to protect applications from security vulnerabilities whereby malicious styles, or even malicious code, can be injected from untrusted sources such as URL parameters or database values.

If you must use an expression in a css literal that is not itself a css literal, and **you are confident that the expression is from a fully trusted source** such as a constant defined in your own code, then you can wrap the expression with the **unsafeCSS** function:

```
import { LitElement, html, css, unsafeCSS } from 'lit-element';

class MyElement extends LitElement {
  static get styles() {
    const mainColor = 'red';

    return css`
      div { color: ${unsafeCSS(mainColor)} }
    `;
  }
  render() {
    return html`<div>Some content in a div</div>`;
  }
}

customElements.define('my-element', MyElement);
```

**Only use the unsafeCSS tag with trusted input**. Injecting unsanitized CSS is a security risk. For example, malicious CSS can “phone home” by adding an image URL that points to a third-party server.

#### Inheriting styles

Using an array of tagged template literals, a component can **inherit the styles from a LitElement superclass,** and add its own styles:

```
class MyElement extends SuperElement {
  static get styles() {
    return [
      super.styles,
      css`...`
    ];
  }
}
```

#### Sharing styles

You can share styles between components by **creating a module that exports tagged styles**:

```
import { css } from 'lit-element';

export const buttonStyles = css`
  .blue-button {
    color: white;
    background-color: blue;
  }
  .blue-button:disabled {
    background-color: grey;
  }`;
```

Your element can then import the styles and add them to its static styles property:

```
import { buttonStyles } from './button-styles.js';

class MyElement extends LitElement {
  static get styles() {
    return [
      buttonStyles,
      css`
        :host { display: block;
          border: 1px solid black;
        }`
    ]
  }
  ...
}
```
You can also **import an external style sheet** by adding a ```<link>```  element to your template, but this has a number of limitations. For details, see Import an external stylesheet.

### Shadow DOM styling overview

This section gives a brief overview of shadow DOM styling.

Styles you add to a component can affect:

- The shadow tree (your component’s rendered template).
- The component itself.
- The component’s children.

#### Style the shadow tree

LitElement templates are rendered into a shadow tree by default. Styles scoped to an element’s shadow tree don’t affect the main document or other shadow trees. Similarly, with the exception of inherited CSS properties, **document-level styles don’t affect the contents of a shadow tree**.

**When you use standard CSS selectors, they only match elements in your component’s shadow tree.**

```
class MyElement extends LitElement {
  static get styles() {
    // Write styles in standard CSS
    return css`
      * { color: red; }
      p { font-family: sans-serif; }
      .myclass { margin: 100px; }
      #main { padding: 30px; }
      h1 { font-size: 4em; }
    `;
  }
  render() {
    return html`
      <p>Hello World</p>
      <p class="myclass">Hello World</p>
      <p id="main">Hello World</p>
      <h1>Hello World</h1>
    `;
  }
}
```

#### Style the component itself

You can style the component itself using special ```:host selectors```. (The element that owns, or “hosts” a shadow tree is called the host element.)

To create default styles for the host element, use the ```:host``` CSS **pseudo-class** and ```:host()``` CSS **pseudo-class function**.

```:host``` **selects the host element**.

```:host(selector)``` selects the host element, but **only if the host element matches selector**.

```
static get styles() {
  return css`
    /* Selects the host element */
    :host { 
      display: block; 
    }

    /* Selects the host element if it is hidden */
    :host([hidden]) { 
      display: none; 
    }
  `;
}
```
Note that the host element can be affected by styles from outside the shadow tree, as well, so you should consider the styles **you set in :host and :host() rules as default styles that can be overridden by the user**. For example:

```
my-element {
  display: inline-block;
}
```

#### Style the component’s children

Your component may accept children (like a ```<ul>``` element can have ```<li>``` children). To render children, **your template needs to include one or more ```<slot>``` elements**, as described in Render children with the slot element.

The ```<slot>``` element acts as a **placeholder in a shadow tree where the host element’s children are displayed**. For example:

```
class MyElement extends LitElement {
  render() {
    return html`<slot></slot>`;
  }
}
<my-element><p>Slotted content</p></my-element>
```

Use the ```::slotted()``` **CSS pseudo-element** to select children that are included in your template via ```<slot>```s.

```::slotted(*)``` matches all slotted elements.

```::slotted(p)``` matches slotted paragraphs.

```p ::slotted(*)``` matches slotted elements where the <slot> is a descendant of a paragraph element.

```
<p>
  <slot></slot>
</p>
```
```
import { LitElement, html, css } from 'lit-element';

class MyElement extends LitElement {
  static get styles() {
    return css`
      ::slotted(*) { font-family: Roboto; }
      ::slotted(p) { color: blue; }
      div ::slotted(*) { color: red; }
    `;
  }
  render() {
    return html`
      <slot></slot>
      <div><slot name="hi"></slot></div>
    `;
  }
}
customElements.define('my-element', MyElement);
```

Note that only direct slotted children can be styled with ```::slotted()```.

```
<my-element>
  <div>Stylable with ::slotted()</div>
</my-element>

<my-element>
  <div><p>Not stylable with ::slotted()</p></div>
</my-element>
```
Also, **children can be styled from outside the shadow tree**, so you should regard your ```::slotted()``` **styles as default styles that can be overridden**.

```
my-element div {
  // Outside style targetting a slotted child can override ::slotted() styles
}
```
Watch out for limitations in the Shady CSS polyfill around slotted content! See the Shady CSS limitations for details on how to use the ```::slotted()``` syntax in a polyfill-friendly way.

#### Configurable styles with custom properties

**Static styles are evaluated once per class. Use CSS variables and custom properties to make styles that can be configured at runtime**:

```
static get styles() {
  return css`
    :host { color: var(--themeColor); }
  `;
} 
<style>
  html { 
    --themeColor: #123456;
  }
</style>
<my-element></my-element>
```
See the section on CSS custom properties for more information.

