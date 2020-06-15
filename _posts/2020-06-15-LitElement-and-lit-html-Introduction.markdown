---
layout: post
title:  LitElement and lit-html Introduction
date:   2020-04-14T15:08:28.972Z
permalink: /lit-element-lit-html-introduction/
icon: https://codersnack.com/assets/images/litelement-icon.png
categories: [snackpost]
---

> *Information drawn from* - [lit-html project](https://lit-html.polymer-project.org/guide)
- [Example LitElement project](https://github.com/PolymerLabs/start-lit-element)
- [lit-element project](https://lit-element.polymer-project.org/)

### What is LitElement?

**LitElement** is a **simple base class for creating fast, lightweight web components** that work in any web page with any framework.

**LitElement uses lit-html to render into shadow DOM**, and **adds API to manage properties and attributes**. *Properties are observed by default, and elements update asynchronously when their properties change*.

### Setup
**You need npm and Node.js** to work with LitElement.

**LitElement uses JavaScript modules to import dependencies** by their npm package names. Since web browsers need to know a file's full URL to import it, your local development server needs to serve full, transformed URL paths to your web browser.

**To deploy an optimized build** that works on your target browsers, you’ll also **need a build toolset** that can handle this transform, along with any bundling.

**One option is Polymer CLI**, which includes a development server that converts module names to paths on the fly; and a configurable build tool that packages your code for deployment.

To install Polymer CLI with npm:
```
npm install -g polymer-cli
```
To serve a LitElement project locally:

```
polymer serve
```
See the Polymer CLI documentation for more information on configuring these tools.


### Create a LitElement component
To create a new class based on LitElement:

In your project folder, install the lit-element package from npm:

```
npm install lit-element
```

Write your new element:

- Import the LitElement base class and the html helper function.
- Create a new class that extends the LitElement base class.
- Implement render to define a template for your web component.
- Register your component’s HTML tag with the browser.

*Example*

**my-element.js**

```
// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';

// Extend the LitElement base class
class MyElement extends LitElement {

  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses LitElement as a base class.
   */
  render(){
    /**
     * `render` must return a lit-html `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function:
     */
    return html`
      <!-- template content -->
      <p>A paragraph</p>
    `;
  }
}
// Register the new element with the browser.
customElements.define('my-element', MyElement);
```

### Use LitElement TypeScript decorators
You can use the **@customElement TypeScript decorator** to define your class as a custom element:

```
/**
 * Import LitElement base class, html helper function,
 * and TypeScript decorators
 **/
import {
  LitElement, html, customElement, property
} from 'lit-element';

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
@customElement('my-element')
export class MyElement extends LitElement {

  /**
   * Create an observed property. Triggers update on change.
   */
  @property()
  foo = 'foo';

  /**
   * Implement `render` to define a template for your element.
   */
  render(){
    /**
     * Use JavaScript expressions to include property values in
     * the element template.
     */
    return html`<p>${this.foo}</p>`;
  }
}
```

### Import a component
Import your own LitElement component
In an HTML document:

```
<head>
  <script type="module" src="/path/to/my-element.js"></script>
</head>
<body>
  <my-element></my-element>
</body>
```

In another JavaScript module:

```
// Use relative paths for peer dependencies
import './my-element.js';

class MyOtherElement extends LitElement{
  render(){
    return html`
      <my-element></my-element>
    `;
  }
}
customElements.define('my-other-element', MyOtherElement);
```
### Import a third-party LitElement component
Refer to third-party component documentation first. To work with any existing component made by a third party, see its documentation. This guide should work for most LitElement-based components if they are published on npm.

Many components are published on npm and can be installed from the command line:

```
cd my-project-folder
npm install package-name
```
In an HTML document, a component published on npm can be imported from the node_modules folder:

```
<head>
  <script type="module" src="node_modules/package-name/existing-element.js"></script>
</head>
<body>
  <existing-element></existing-element>
</body>
```
To import into another JavaScript module, use the component’s package name:

```
import 'package-name/existing-element.js';

class MyElement extends LitElement{
  render(){
    return html`
      <existing-element></existing-element>
    `;
  }
}
customElements.define('my-element', MyElement);
```

### What is lit-html?
lit-html is a simple, modern, safe, small and fast **HTML templating library for JavaScript.**

lit-html lets you write HTML templates in JavaScript using **template literals with embedded JavaScript expressions**. lit-html identifies the static and dynamic parts of your templates so it can efficiently update just the changed portions.

Building components? **lit-html is not tied to any component model**, it focuses only on creating and updating DOM. If you want to build components, check out **LitElement**, a library for building web components using lit-html templates.

### lit-html Templates
lit-html templates are **tagged template literals** - they look like JavaScript strings but are enclosed in backticks (`) instead of quotes - and tagged with lit-html's html tag:

```
html`<h1>Hello ${name}</h1>`
```
Since lit-html templates almost always need to merge in data from JavaScript values, and be able to update DOM when that data changes, they'll most often be written within functions that take some data and return a lit-html template, so that the function can be called multiple times:

```
let myTemplate = (data) => html`
  <h1>${data.title}</h1>
  <p>${data.body}</p>`;
```
**lit-html is lazily rendered**. Calling this function will evaluate the template literal using lit-html html tag, and return a **TemplateResult** - a record of the template to render and data to render it with. TemplateResults are very cheap to produce and no real work actually happens until they are rendered to the DOM.

### Rendering
To render a TemplateResult, call the ```render()``` function with a result and DOM container to render to:

```
const result = myTemplate({title: 'Hello', body: 'lit-html is cool'});
render(result, document.body);
```

