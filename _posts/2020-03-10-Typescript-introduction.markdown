---
layout: post
title:  Typescript introduction
date:   2020-02-11T21:55:42.521Z
permalink: /typescript-introduction/
categories: [snackpost]
---
TypeScript is an open-source programming language developed and maintained by **Microsoft**. It is **a strict syntactical superset of JavaScript, and adds optional static typing to the language**.

TypeScript is a strict superset of ECMAScript 2015, which is itself a superset of ECMAScript 5, commonly referred to as JavaScript. As such, **a JavaScript program is also a valid TypeScript program**, and a TypeScript program can seamlessly consume JavaScript. By default the compiler targets ECMAScript 5, the current prevailing standard, but is also able to generate constructs used in ECMAScript 3 or 2015.

With TypeScript, it is possible to use existing JavaScript code, incorporate popular JavaScript libraries, and call TypeScript-generated code from other JavaScript. Type declarations for these libraries are provided with the source code.

#### Type annotations
**TypeScript provides static typing through type annotations to enable type checking at compile time**. This is optional and **can be ignored** to use the regular dynamic typing of JavaScript.
```
function add(left: number, right: number): number {
	return left + right;
}
```
The annotations for the primitive types are *number*, *boolean* and *string*. Weakly or dynamically-typed structures are of type *any*.

**Type annotations can be exported to a separate declarations file** to make type information available for TypeScript scripts using types already compiled into JavaScript. Annotations can be declared for an existing JavaScript library, as has been done for Node.js and jQuery.

**The TypeScript compiler makes use of type inference** to infer types when types are not given. For example, the add method in the code above would be inferred as returning a number even if no return type annotation had been provided. This is based on the static types of left and right being numbers, and the compiler's knowledge that the result of adding two numbers is always a number. However, explicitly declaring the return type allows the compiler to verify correctness.

If no type can be inferred because of lack of declarations, then it defaults to the dynamic any type. **A value of the *any* type supports the same operations as a value in JavaScript** and minimal static type checking is performed for operations on any values.

#### Declaration files
When a TypeScript script gets compiled there is an option to generate a declaration file (with the **extension .d.ts**) that functions as **an interface to the components in the compiled JavaScrip**t. In the process the compiler strips away all function and method bodies and preserves only the signatures of the types that are exported. The resulting declaration file **can then be used to describe the exported virtual TypeScript types of a JavaScript library or module when a third-party developer consumes it from TypeScript.**

The concept of declaration files is analogous to the concept of header file found in C/C++.

```
declare namespace arithmetics {
    add(left: number, right: number): number;
    subtract(left: number, right: number): number;
    multiply(left: number, right: number): number;
    divide(left: number, right: number): number;
}
```
Type declaration files can be written by hand for existing JavaScript libraries, as has been done for jQuery and Node.js.

Large collections of declaration files for popular JavaScript libraries are hosted on GitHub in DefinitelyTyped

### - References -

- [Wikipedia -Typescript](https://en.wikipedia.org/wiki/TypeScript)
