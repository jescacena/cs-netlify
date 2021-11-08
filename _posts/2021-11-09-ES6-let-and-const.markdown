---
layout: post
title:  ES6 let and const
date:   2020-04-20T19:03:20.605Z
permalink: /es6-let-const/
icon: https://codersnack.com/assets/images/es6-let-const.png
categories: [snackpost]
---

> Information drawn from 
- [Medium - These are the features in es6 that you should know](https://medium.freecodecamp.org/these-are-the-features-in-es6-that-you-should-know-1411194c71cb)
- [Medium - Discover the power of closures in javascript](https://medium.freecodecamp.org/discover-the-power-of-closures-in-javascript-5c472a7765d7)

There are two ways for declaring a variable (let and const) plus one that has become obsolete (var).

## let

**let declares and optionally initializes a variable in the current scope**. The current scope can be either a module, a function or a block. The value of a variable that is not initialized is undefined.
Scope defines the lifetime and visibility of a variable. Variables are not visible outside the scope in which they are declared.
Consider the next code that emphasizes let block scope:
```
let x = 1;
{ 
  let x = 2;
}
console.log(x); //1
```
In contrast, the var declaration had no block scope:
```
var x = 1;
{ 
  var x = 2;
}
console.log(x); //2
```

## const

**const declares a variable that cannot be reassigned**. It becomes a constant only when the assigned value is immutable.
An immutable value is a value that, once created, cannot be changed. 

> Primitive values are immutable, objects are mutable.

**```const``` freezes the variable, ```Object.freeze()```  freezes the object.**

**The initialization of the ```const``` variable is mandatory.**
