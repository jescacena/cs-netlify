---
layout: main-content-post
title:  ES modules A cartoon deep-dive I
date:   2021-12-09T14:49:14.021Z
permalink: /es6-modules-deep-dive/main-content/
icon: https://codersnack.com/assets/images/es6.png
categories: [snack-main-content-post]
---

**ES modules bring an official, standardized module system to JavaScript**. It took a while to get here, though — **nearly 10 years of standardization work**.

But **the wait is almost over**. With the release of Firefox 60 in May (currently in beta), all major browsers will support ES modules, and the Node modules working group is currently working on adding ES module support to Node.js. And ES module integration for WebAssembly is underway as well.

Many JavaScript developers know that ES modules have been controversial. But few actually understand how ES modules work.

Let’s take a look at what problem ES modules solve and how they are different from modules in other module systems.


## What problem do modules solve?

When you think about it, **coding in JavaScript is all about managing variables**. It’s all about assigning values to variables, or adding numbers to variables, or combining two variables together and putting them into another variable.

![Code showing variables being manipulated](https://codersnack.com/assets/images/es-modules-deep-1.png)

Because so much of your code is just about changing variables, **how you organize these variables is going to have a big impact on how well you can code… and how well you can maintain that code.**

**Having just a few variables to think about at one time makes things easier. JavaScript has a way of helping you do this, called *scope***. Because of how scopes work in JavaScript, **functions can’t access variables that are defined in other functions**.

![Two function scopes with one trying to reach into another but failing](https://codersnack.com/assets/images/es-modules-deep-functions.png)

This is good. It means that when you’re working on one function, you can just think about that one function. You don’t have to worry about what other functions might be doing to your variables.

It also has a downside, though. **It does make it hard to share variables between different functions.**

What if you do want to share your variable outside of a scope? **A common way to handle this is to put it on a scope above you… for example, on the *global scope***.

> You probably remember this from the **jQuery days**. Before you could load any jQuery plug-ins, you had to make sure that jQuery was in the global scope.

![Two function scopes in a global, with one putting jQuery into the global](https://codersnack.com/assets/images/es-modules-deep-jquery.png)

This works, but **they are some annoying problems that result**.

First, all of **your script tags need to be in the right order**. Then you have to be careful to make sure that no one messes up that order.

If you do mess up that order, then in the middle of running, your app will throw an error. When the function goes looking for jQuery where it expects it — on the global — and doesn’t find it, it will throw an error and stop executing.

![The top function scope has been removed and now the second function scope can’t find jQuery on the global](https://codersnack.com/assets/images/es-modules-deep-jquery-2.png)

**This makes maintaining code tricky**. It makes removing old code or script tags a game of roulette. **You don’t know what might break**. The dependencies between these different parts of your code are implicit. Any function can grab anything on the global, so you don’t know which functions depend on which scripts.

**A second problem is that because these variables are on the global scope**, every part of the code that’s inside of that global scope can change the variable. **Malicious code can change that variable on purpose to make your code do something you didn’t mean for it to, or non-malicious code could just accidentally clobber your variable.**


## How do modules help?

**Modules give you a better way to organize these variables and functions. With modules, you group the variables and functions that make sense to go together.**

This puts these functions and variables into a **module scope**. The module scope can be used to share variables between the functions in the module.

But unlike function scopes, module scopes have a way of making their variables available to other modules as well. **They can say explicitly which of the variables, classes, or functions in the module should be available**.

**When something is made available to other modules, it’s called an *export***. Once you have an export, other modules can explicitly say that they depend on that variable, class or function.

![Two module scopes, with one reaching into the other to grab an export](https://codersnack.com/assets/images/es-modules-deep-export.png)

**Because this is an explicit relationship, you can tell which modules will break if you remove another one.**

**Once you have the ability to export and import variables between modules, it makes it a lot easier to break up your code into small chunks that can work independently of each other**. Then you can combine and recombine these chunks, kind of like **Lego blocks**, to create all different kinds of applications from the same set of modules.

Since modules are so useful, **there have been multiple attempts to add module functionality to JavaScript**. Today there are two module systems that are actively being used:
- **CommonJS (CJS)** is what **Node.js** has used historically.
- **ESM (EcmaScript modules)** is a newer system which has been added to the JavaScript specification. Browsers already support ES modules, and Node is adding support.


Let’s take an in-depth look at how this new module system works. (in part II)


