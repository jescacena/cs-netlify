---
layout: main-content-post
title:  Typescript Declaration Modules Library Structure
date:   2020-05-21T16:41:56.394Z
permalink: /typescript-declaration-files-library-structure/main-content/
icon: https://codersnack.com/assets/images/typescript-icon.png
categories: [snack-main-content-post]
---

### Library Structures

Broadly speaking, **the way you structure your declaration file depends on how the library is consumed**. There are many ways of offering a library for consumption in JavaScript, and you’ll need to write your declaration file to match it. This guide covers how to identify common library patterns, and how to write declaration files which correspond to that pattern.

Each type of major library structuring pattern has a corresponding file in the [Templates](https://www.typescriptlang.org/docs/handbook/declaration-files/templates.html) section. You can start with these templates to help you get going faster.

#### Identifying Kinds of Libraries
First, we’ll review the **kinds of libraries TypeScript declaration files can represent**. We’ll briefly show how each kind of library is used, how it is written, and list some example libraries from the real world.

**Identifying the structure of a library is the first step in writing its declaration file**. We’ll give hints on how to identify structure both based on its usage and its code. Depending on the library’s documentation and organization, one might be easier than the other. We recommend using whichever is more comfortable to you.

#### Global Libraries
A global library is **one that can be accessed from the global scope** (i.e. without using any form of import). Many libraries simply expose one or more global variables for use. For example, if you were **using jQuery, the $ variable can be used by simply referring to it:**

``` 
$(() => { console.log('hello!'); } );
``` 

You’ll usually see guidance in the **documentation of a global library of how to use the library in an HTML script tag:**

``` 
<script src="http://a.great.cdn.for/someLib.js"></script>
``` 

Today, most popular globally-accessible libraries are actually written as UMD libraries (see below). **UMD library documentation is hard to distinguish from global library documentation**. Before writing a global declaration file, make sure the library isn’t actually UMD.

**Identifying a Global Library from Code**
Global library code is usually extremely simple. A global “Hello, world” library might look like this:

``` 
function createGreeting(s) {
    return "Hello, " + s;
}
``` 
or like this:

``` 
window.createGreeting = function(s) {
    return "Hello, " + s;
}
``` 
When looking at the code of a global library, you’ll usually see:

- Top-level var statements or function declarations
- One or more assignments to window.someName
- Assumptions that DOM primitives like document or window exist

You won’t see:

- Checks for, or usage of, module loaders like require or define
- CommonJS/Node.js-style imports of the form var fs = require("fs");
- Calls to define(...)
- Documentation describing how to require or import the library

**Examples of Global Libraries**
Because it’s usually easy to turn a global library into a UMD library, very few popular libraries are still written in the global style. However, libraries that are small and require the DOM (or have no dependencies) may still be global.

**Global Library Template**
The template file **global.d.ts** defines an example library *myLib*. Be sure to read the “Preventing Name Conflicts” footnote.

#### Modular Libraries
**Some libraries only work in a module loader environment**. For example, express only works in Node.js and must be loaded using the CommonJS require function.

ECMAScript 2015 (also known as ES2015, ECMAScript 6, and ES6), CommonJS, and RequireJS have similar notions of importing a module. In JavaScript CommonJS (Node.js), for example, you would write

``` 
var fs = require("fs");
``` 
In TypeScript or ES6, the *import* keyword serves the same purpose:

``` 
import fs = require("fs");
``` 
You’ll typically see **modular libraries include one of these lines in their documentation**:

``` 
var someLib = require('someLib');
``` 
or

``` 
define(..., ['someLib'], function(someLib) {

});
``` 
As with global modules, you might see these examples in the documentation of a UMD module, so be sure to check the code or documentation.

**Identifying a Module Library from Code**
Modular libraries will typically have at least some of the following:

- Unconditional calls to require or define
- Declarations like import * as a from 'b'; or export c;
- Assignments to exports or module.exports

They will rarely have:

- Assignments to properties of window or global

**Examples of Modular Libraries**
Many popular Node.js libraries are in the module family, such as express, gulp, and request.

#### UMD
**A UMD module is one that can either be used as module (through an import), or as a global (when run in an environment without a module loader)**. Many popular libraries, such as Moment.js, are written this way. For example, in Node.js or using RequireJS, you would write:

``` 
import moment = require("moment");
console.log(moment.format());
``` 
whereas in a vanilla browser environment you would write:

``` 
console.log(moment.format());
``` 

**Identifying a UMD library**
UMD modules check for the existence of a module loader environment. This is an easy-to-spot pattern that looks something like this:

``` 
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["libName"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("libName"));
    } else {
        root.returnExports = factory(root.libName);
    }
}(this, function (b) {
``` 

If you see tests for typeof define, typeof window, or typeof module in the code of a library, especially at the top of the file, it’s almost always a UMD library.

Documentation for UMD libraries will also often demonstrate a “Using in Node.js” example showing require, and a “Using in the browser” example showing using a ```<script>``` tag to load the script.

**Examples of UMD libraries**
Most popular libraries are now available as UMD packages. Examples include jQuery, Moment.js, lodash, and many more.

**Template**
There are three templates available for modules, module.d.ts, module-class.d.ts and module-function.d.ts.

Use **module-function.d.ts** if your module **can be called like a function**:

``` 
var x = require("foo");
// Note: calling 'x' as a function
var y = x(42);
``` 
Be sure to read the footnote “The Impact of ES6 on Module Call Signatures”

Use **module-class.d.ts** if your module **can be constructed using new**:

``` 
var x = require("bar");
// Note: using 'new' operator on the imported variable
var y = new x("hello");
``` 
The same footnote applies to these modules.

If your module is **not callable or constructable**, use the **module.d.ts** file.

#### Module Plugin or UMD Plugin
A module plugin changes the shape of another module (either UMD or module). For example, in Moment.js, moment-range adds a new range method to the moment object.

For the purposes of writing a declaration file, you’ll write the same code whether the module being changed is a plain module or UMD module.

**Template**
Use the module-plugin.d.ts template.

**Global Plugin**
A global plugin is global code that changes the shape of some global. As with global-modifying modules, these raise the possibility of runtime conflict.

For example, some libraries add new functions to Array.prototype or String.prototype.

**Identifying global plugins**
Global plugins are generally easy to identify from their documentation.

You’ll see examples that look like this:

``` 
var x = "hello, world";
// Creates new methods on built-in types
console.log(x.startsWithHello());

var y = [1, 2, 3];
// Creates new methods on built-in types
console.log(y.reverseAndSort());
``` 

**Template**
Use the **global-plugin.d.ts** template.

#### Consuming Dependencies
There are several kinds of dependencies your library might have. This section shows **how to import them into the declaration file.**

**Dependencies on Global Libraries**
If your library depends on a global library, use a ```/// <reference types="..." />``` directive:

```
/// <reference types="someLib" />

function getThing(): someLib.thing;
```
**Dependencies on Modules**
If your library depends on a module, use an import statement:
```
import * as moment from "moment";

function getThing(): moment;
```
**Dependencies on UMD libraries**
From a Global Library
If your global library depends on a UMD module, use a ```/// <reference types``` directive:

```
/// <reference types="moment" />

function getThing(): moment;
```
**From a Module or UMD Library**
If your module or UMD library depends on a UMD library, use an import statement:

```
import * as someLib from 'someLib';
```
Do not use a ```/// <reference directive``` to declare a dependency to a UMD library!

#### Footnotes
**Preventing Name Conflicts**
Note that it’s possible to define **many types in the global scope when writing a global declaration file**. We strongly discourage this as it leads to possible unresolvable name conflicts when many declaration files are in a project.

A simple rule to follow is to **only declare types namespaced by whatever global variable the library defines**. For example, if the library defines the global value ‘cats’, you should write

```
declare namespace cats {
    interface KittySettings { }
}
```
But not

```
// at top-level
interface CatsKittySettings { }
```
This guidance also ensures that the library can be transitioned to UMD without breaking declaration file users.

**The Impact of ES6 on Module Plugins**
Some plugins add or modify top-level exports on existing modules. While this is legal in CommonJS and other loaders, ES6 modules are considered immutable and this pattern will not be possible. Because TypeScript is loader-agnostic, there is no compile-time enforcement of this policy, but developers intending to transition to an ES6 module loader should be aware of this.

**The Impact of ES6 on Module Call Signatures**
Many popular libraries, such as Express, expose themselves as a callable function when imported. For example, the typical Express usage looks like this:

```
import exp = require("express");
var app = exp();
```
In ES6 module loaders, the top-level object (here imported as exp) can only have properties; the top-level module object is never callable. The most common solution here is to define a default export for a callable/constructable object; some module loader shims will automatically detect this situation and replace the top-level object with the default export.

**Library file layout**
**The layout of your declaration files should mirror the layout of the library**.

A library can consist of multiple modules, such as

```
myLib
  +---- index.js
  +---- foo.js
  +---- bar
         +---- index.js
         +---- baz.js
```
These could be imported as

```
var a = require("myLib");
var b = require("myLib/foo");
var c = require("myLib/bar");
var d = require("myLib/bar/baz");
```
Your declaration files should thus be

```
@types/myLib
  +---- index.d.ts
  +---- foo.d.ts
  +---- bar
         +---- index.d.ts
         +---- baz.d.ts
```