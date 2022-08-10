---
layout: post
title:  Typescript - decorators introduction
date:   2022-04-25T11:18:56.762Z
permalink: /typescript-decorators-introduction/
icon: https://codersnack.com/assets/images/typescript-icon.png
categories: [snackpost]
---

> Information drawn from 
- [Typescript decorators - Official doc](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [A complete guide of typescript decorators](https://saul-mirone.github.io/a-complete-guide-to-typescript-decorator/)

With the introduction of Classes in TypeScript and ES6, there now exist certain scenarios that require additional features to support annotating or modifying classes and class members. **Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members**. Decorators are a stage 2 proposal for JavaScript and are available as an experimental feature of TypeScript.

> **NOTE**  Decorators are an experimental feature that may change in future releases.

**To enable experimental support for decorators, you must enable the *experimentalDecorators* compiler option** either on the command line or in your **tsconfig.json**:

*Command Line:*

```
tsc --target ES5 --experimentalDecorators
```

*tsconfig.json:*
```
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```


###   Decorators

**A Decorator is a special kind of declaration that can be attached to a *class* declaration, *method*, *accessor*, *property*, or *parameter***. Decorators use the form **@expression**, where expression **must evaluate to a function that will be called at runtime** with information about the decorated declaration.

For example, given the decorator **@sealed** we might write the sealed function as follows:

```
function sealed(target) {
  // do something with 'target' ...
}
```


###  Decorator Factories

If we want to **customize how a decorator is applied to a declaration, we can write a decorator factory**. A Decorator Factory is simply **a function that returns the expression that will be called by the decorator at runtime**.

We can write a decorator factory in the following fashion:
```
function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}
```


###  Decorator Composition

**Multiple decorators can be applied to a declaration**, for example on a single line:

```
@f @g x
```

On multiple lines:

```
@f
@g
x
```

**When multiple decorators apply to a single declaration, their evaluation is similar to function composition in mathematics**. In this model, when composing functions f and g, the resulting composite (f ∘ g)(x) is equivalent to f(g(x)).

As such, the **following steps are performed when evaluating multiple decorators** on a single declaration in TypeScript:

- The expressions for each decorator are evaluated top-to-bottom.
- The results are then called as functions from bottom-to-top.

**If we were to use decorator factories**, we can observe this evaluation order with the following example:

```
function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}
 
class ExampleClass {
  @first()
  @second()
  method() {}
}
``` 

Which would **print this output** to the console:

```
first(): factory evaluated
second(): factory evaluated
second(): called
first(): called
```


###  Decorator Evaluation

There is a well defined order to **how decorators applied to various declarations inside of a class are applied**:

- **Parameter Decorators**, followed by **Method, Accessor, or Property Decorators** are applied for **each instance member**.
- **Parameter Decorators**, followed by **Method, Accessor, or Property Decorators** are applied for each **static member**.
- **Parameter Decorators** are applied for the **constructor**.
- **Class Decorators** are applied for the class.