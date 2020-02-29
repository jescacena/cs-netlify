---
layout: post
title:  Introduction to Web Components
date:   2020-02-29T11:06:51.993Z
permalink: /web-components-introduction/
categories: [snackpost]
---
### What are Web Components, anyway?

Web Components consist of **three separate technologies that are used together:**

- **Custom Elements**. Quite simply, these are fully-valid HTML elements with custom templates, behaviors and tag names (e.g. ```<one-dialog>```) made with a set of JavaScript APIs. Custom Elements are defined in the *HTML Living Standard specification*.
- **Shadow DOM**. Capable of isolating CSS and JavaScript, almost like an ```<iframe>```. This is defined in the *Living Standard DOM specification*.
- **HTML templates**. User-defined templates in HTML that aren't rendered until called upon. The ```<template>``` tag is defined in the *HTML Living Standard specification*.

These are what make up the *Web Components specification*.

> **HTML Modules** is likely to be the fourth technology in the stack, but it has yet to be implemented in any of the big four browsers. The Chrome team has announced it an intent to implement them in a future release.

**Web Components are generally available in all of the major browsers** with the exception of Microsoft Edge and Internet Explorer 11, but polyfills exist to fill in those gaps.

Referring to any of these as Web Components is technically accurate because the term itself is a bit overloaded. As a result, each of the technologies can be used independently or combined with any of the others. In other words, they are not mutually exclusive.



### - References -

- [CSS trick - Calleb Williams - Introduction to web components](https://css-tricks.com/an-introduction-to-web-components/)
- [HTML Living Standard specification](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements)
- [Living Standard DOM specification](https://dom.spec.whatwg.org/#shadow-trees)
