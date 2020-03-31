---
layout: post
title:  LitElement Templates 3
date:   2020-03-31T18:18:52.056Z
permalink: /webcomponents-litelement-templates-3/
categories: [snackpost]
---
### Compose a template from other templates
You can compose LitElement templates from other LitElement templates. In the following example, we compose a template for an element called ```<my-page>``` from smaller templates for the standard HTML elements ```<header>```, ```<article>```, and ```<footer>```:

```
class MyPage extends LitElement {
  render() {
    return html`
      ${this.headerTemplate}
      ${this.articleTemplate}
      ${this.footerTemplate}
    `;
  }
  get headerTemplate() {
    return html`<header>header</header>`;
  }
  get articleTemplate() {
    return html`<article>article</article>`;
  }
  get footerTemplate() {
    return html`<footer>footer</footer>`;
  }
}
```
You can also compose templates by importing other elements and using them in your template:

```
import './my-header.js';
import './my-article.js';
import './my-footer.js';

class MyPage extends LitElement {
  render() {
    return html`
      <my-header></my-header>
      <my-article></my-article>
      <my-footer></my-footer>
    `;
  }
}
```

### Specify the render root
**The node into which your component's template will render is called its render root**.

**By default, LitElement creates an open shadowRoot and renders inside it,** producing the following DOM structure:

```
<my-element>
  #shadow-root
    <p>child 1</p>
    <p>child 2</p>
```

To customize a component's render root, implement **createRenderRoot** and return the node you want the template to render into.

For example, to render the template into the main DOM tree as your element's children:

```
<my-element>
  <p>child 1</p>
  <p>child 2</p>
```
Implement createRenderRoot and return this:

```
class LightDom extends LitElement {
  render() {
    return html`
      <p>This template renders without shadow DOM.</p>
    `;
  }
  createRenderRoot() {
  /**
   * Render template without shadow DOM. Note that shadow DOM features like 
   * encapsulated CSS and slots are unavailable.
   */
    return this;
  }
}
```

### Using other lit-html features
Since **LitElement uses the lit-html html tag function to define templates** you can take advantage of the entire lit-html feature set for writing your templates. This includes lit-html directives, special functions that customize the way lit-html renders a binding.

**To import features directly from lit-html, your project should add lit-html as a direct dependency**. We recommend using the widest practical version range for lit-html, to minimize the chance of npm installing two different versions of lit-html:

```
npm i lit-element@^2.0.0
npm i lit-html@^1.0.0
```
#### Import and use a lit-html directive
You can import and use a lit-html directive and use it as shown in the lit-html documentation.

```
import { LitElement, html } from 'lit-element';
import { until } from 'lit-html/directives/until.js';

const content = fetch('./content.txt').then(r => r.text());

html`${until(content, html`<span>Loading...</span>`)}`
```
For a list of directives supplied with lit-html, see Built-in directives in the Template syntax reference.


### - References -

- [LitElement Templates](https://lit-element.polymer-project.org/guide/templates)
