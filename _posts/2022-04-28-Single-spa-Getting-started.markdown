---
layout: post
title:  Single-spa Getting started
date:   2022-04-28T19:22:55.682Z
permalink: /single-spa-logo-getting-started/
icon: https://codersnack.com/assets/images/single-spa-logo.png
categories: [snackpost]
---

> Information drawn from 
- [Single-spa: getting started](https://single-spa.js.org/docs/getting-started-overview/)

single-spa is **a framework for bringing together multiple JavaScript microfrontends in a frontend application**. Architecting your frontend using single-spa enables many **benefits**, such as:

- **Use multiple frameworks on the same page without page refreshing** (React, AngularJS, Angular, Ember, or whatever you're using)
- **Deploy** your microfrontends **independently**
- Write code using a new framework, **without rewriting your existing app**
- **Lazy load code** for improved initial load time

###  Demos and Examples

See our [examples page](https://single-spa.js.org/docs/examples/).


###  Architectural Overview

**single-spa takes inspiration from modern framework component lifecycles by abstracting lifecycles for entire applications**. 

Born out of Canopy's desire to use React + react-router instead of being forever stuck with our AngularJS + ui-router application, single-spa is now a mature library that enables frontend microservices architecture aka "microfrontends". 

Microfrontends enable many benefits such as independent deployments, migration and experimentation, and resilient applications.

single-spa apps consist of the following:

1. A **[single-spa root config](https://single-spa.js.org/docs/configuration/)**, which **renders the HTML page** and the JavaScript that **registers applications**. Each application is registered with three things:

- A ***name***
- A ***function* to load the application's code**
- A ***function* that determines when the application is active/inactive**

2. **[Applications](https://single-spa.js.org/docs/building-applications/)** which can be thought of as single-page applications packaged up into modules. **Each application must know how to bootstrap, mount, and unmount itself from the DOM**. 

**The main difference between a traditional SPA and single-spa applications is that they must be able to *coexist with other applications*** as **they do *not each have their own HTML page.***

For example, your React or Angular SPAs are applications. **When *active*, they can listen to url routing events and put content on the DOM**. When ***inactive*, they do not listen to url routing events and are totally removed from the DOM.**


###   The Recommended Setup

The single-spa core team has put together documentation, tools, and videos showing the currently encouraged best practices with single-spa. Check out [these docs](https://single-spa.js.org/docs/recommended-setup/) for more information.


###   How hard will it be to use single-spa?

single-spa works with ES5, ES6+, TypeScript, Webpack, SystemJS, Gulp, Grunt, Bower, ember-cli, or really any build system available. You can npm install it or even just use a ```<script>```  tag if you prefer.

While our objective is to make using single-spa as easy as possible, **we should also note that this is an advanced architecture that is different from how front-end applications are typically done**. This will require changes to existing paradigms as well as understanding of underlying tools.

If you're not starting your application from scratch, you'll have to [migrate your SPA](https://single-spa.js.org/docs/migrating-existing-spas/) to become a single-spa application.

single-spa works in Chrome, Firefox, Safari, Edge, and IE11 (with polyfills).

**Isn't single-spa sort of a redundant name?**

Yep.