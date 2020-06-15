
### - References -

- [Typescriptlang interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

---
layout: post
title:  Typescript Interfaces
date:   2020-02-12T20:47:11.498Z
permalink: /typescript-interfaces/
icon: https://codersnack.com/assets/images/typescript-icon.png
categories: [snackpost]
---

One of TypeScript's core principles is that type checking focuses on the shape that values have. This is sometimes called "duck typing" or "structural subtyping". In TypeScript, *interfaces* fill the role of naming these types, and are **a powerful way of defining contracts within your code as well as contracts with code outside of your project**.

#### Our First Interface
The easiest way to see how interfaces work is to start with a simple example:

```
function printLabel(labeledObj: { label: string }) {
    console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

The type checker checks the call to *printLabel*. The *printLabel* function has a single parameter that requires that the object passed in has a property called label of type string. Notice that our object actually has more properties than this, but the compiler only checks that at least the ones required are present and match the types required. There are some cases where TypeScript isn't as lenient, which we'll cover in a bit.

We can write the same example again, this time **using an interface to describe the requirement** of having the label property that is a string:

```
interface LabeledValue {
    label: string;
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

The interface *LabeledValue* is a name we can now use to describe the requirement in the previous example. It still represents having a single property called label that is of type string. Notice we didn't have to explicitly say that the object we pass to printLabel implements this interface like we might have to in other languages. Here, it's only the shape that matters. If the object we pass to the function meets the requirements listed, then it's allowed.

> It’s worth pointing out that the type checker does not require that these properties come in any sort of order, only that the properties the interface requires are present and have the required type.

#### Optional Properties
**Not all properties of an interface may be required**. Some exist under certain conditions or may not be there at all. These optional properties are popular when creating patterns like "option bags" where you pass an object to a function that only has a couple of properties filled in.

Here’s an example of this pattern:

```
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
```

Interfaces with **optional properties** are written similar to other interfaces, with **each optional property denoted by a ? at the end** of the property name in the declaration.

The advantage of optional properties is that you can describe these possibly available properties while still also **preventing use of properties that are not part of the interface**. For example, had we mistyped the name of the color property in createSquare, we would get an error message letting us know:

```
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    if (config.clor) {
        // Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.clor;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
```

#### Readonly properties
Some properties should only be modifiable when an object is first created. You can specify this by **putting readonly before the name of the property:**

```
interface Point {
    readonly x: number;
    readonly y: number;
}
```
You can construct a *Point* by assigning an object literal. After the assignment, *x* and *y* can't be changed.

```
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

TypeScript comes with a *ReadonlyArray<T>* type that is the same as *Array<T>* with all mutating methods removed, so you can **make sure you don’t change your arrays after creation**:

```
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

On the last line of the snippet you can see that even assigning the entire *ReadonlyArray* back to a normal array is illegal. You can still override it with a type assertion, though:

```
a = ro as number[];
```

#### readonly vs const
The easiest way to remember whether to use *readonly* or *const* is to ask whether you're using it on a variable or a property. **Variables use *const* whereas properties use *readonly***.
