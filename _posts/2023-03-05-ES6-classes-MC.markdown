---
layout: main-content-post
title:  ES6 classes
date:   2020-04-22T19:15:11.222Z
permalink: /es6-classes/main-content/
icon: https://codersnack.com/assets/images/es6.png
categories: [snack-main-content-post]
---

JavaScript classes, introduced in ECMAScript 2015, are primarily **syntactical sugar over JavaScript's existing prototype-based inheritance**. The class syntax *does not introduce a new object-oriented inheritance model* to JavaScript.

### Defining classes
**Classes are in fact "special functions",** and just as you can define function expressions and function declarations, the class syntax has two components: class expressions and class declarations.

#### Class declarations
One way to define a class is using a class declaration. To declare a class, you use the ```class``` keyword with the name of the class ("Rectangle" here).

```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```
#### Hoisting
An important difference between function declarations and class declarations is that function declarations are hoisted and class declarations are not. **You first need to declare your class and then access it**, otherwise code like the following will throw a **ReferenceError**:

```
const p = new Rectangle(); // ReferenceError

class Rectangle {}
```

#### Class expressions
**A class expression is another way to define a class**. Class expressions can be **named** or **unnamed**. The name given to a named class expression is local to the class's body. (it can be retrieved through the class's (not an instance's) name property, though).

```
// unnamed
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"

// named
let Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle2"
```

> Note: Class expressions are subject to the same hoisting restrictions as described in the Class declarations section.

### Class body and method definitions
**The body of a class is the part that is in curly brackets {}**. This is where you define **class members,** such as methods or **constructor**.

#### Strict mode
**The body of a class is executed in strict mode**, i.e., **code written here is subject to stricter syntax for increased performance**, some otherwise silent errors will be thrown, and certain keywords are reserved for future versions of ECMAScript.

#### Constructor
**The constructor method is a special method for creating and initializing an object created with a class**. There can only be one special method with the name "constructor" in a class. A SyntaxError will be thrown if the class contains more than one occurrence of a constructor method.

A constructor can use the ```super``` keyword **to call the constructor of the super class**.

#### Prototype methods
See also method definitions.

```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```

#### Static methods
The ```static``` keyword **defines a static method for a class.** Static methods **are called without instantiating their class and cannot be called through a class instance**. Static methods are often used to create utility functions for an application.

```
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.distance; //undefined
p2.distance; //undefined

console.log(Point.distance(p1, p2)); // 7.0710678118654755
```
#### Boxing with prototype and static methods
**When a static or prototype method is called without a value for this, the this value will be undefined inside the method**. This behavior will be the same even if the "use strict" directive isn't present, because code within the class body's syntactic boundary is always executed in strict mode.

```
class Animal { 
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

let obj = new Animal();
obj.speak(); // the Animal object
let speak = obj.speak;
speak(); // undefined

Animal.eat() // class Animal
let eat = Animal.eat;
eat(); // undefined
```

**If the above is written using traditional function-based syntax, then autoboxing in method calls will happen in non–strict mode based on the initial this value**. If the initial value is undefined, this will be set to the global object.

Autoboxing will not happen in strict mode, the this value remains as passed.

```
function Animal() { }

Animal.prototype.speak = function() {
  return this;
}

Animal.eat = function() {
  return this;
}

let obj = new Animal();
let speak = obj.speak;
speak(); // global object

let eat = Animal.eat;
eat(); // global object
```

#### Instance properties
Instance properties must be defined inside of class methods:

```
class Rectangle {
  constructor(height, width) {    
    this.height = height;
    this.width = width;
  }
}
```

Static (class-side) data properties and prototype data properties must be defined outside of the ClassBody declaration:

```
Rectangle.staticWidth = 20;
Rectangle.prototype.prototypeWidth = 25;
```
#### Field declarations
> **Public and private field declarations are an experimental feature (stage 3) proposed at TC39**, the JavaScript standards committee. Support in browsers is limited, but the feature can be used through a build step with systems like Babel.

#### Public field declarations
With the JavaScript field declaration syntax, the above example can be written as:

```
class Rectangle {
  height = 0;
  width;
  constructor(height, width) {    
    this.height = height;
    this.width = width;
  }
}
```
By declaring fields up-front, **class definitions become more self-documenting**, and the fields are always present.

As seen above, the fields can be declared with or without a default value.

#### Private field declarations
Using private fields, the definition can be refined as below.

```
class Rectangle {
  #height = 0;
  #width;
  constructor(height, width) {    
    this.#height = height;
    this.#width = width;
  }
}
```
It's an error to reference private fields from outside of the class; they can only be read or written within the class body. By defining things which are not visible outside of the class, you ensure that your classes' users can't depend on internals, which may change version to version.

Private fields can only be declared up-front in a field declaration.

Private fields cannot be created later through assigning to them, the way that normal properties can.


### Sub classing with extends
The ```extends``` keyword is used in class declarations or class expressions to create a class as a child of another class.

```
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```
If there is a constructor present in the subclass, it needs to first call super() before using "this".

One may also extend traditional function-based "classes":

```
function Animal (name) {
  this.name = name;  
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a noise.`);
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.

//NB: For similar methods, the child's method takes precedence over parent's method
```

**Note that classes cannot extend regular (non-constructible) objects**. If you want to inherit from a regular object, you can instead use **Object.setPrototypeOf()**:

```
const Animal = {
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

// If you do not do this you will get a TypeError when you invoke speak
Object.setPrototypeOf(Dog.prototype, Animal);

let d = new Dog('Mitzie');
d.speak(); // Mitzie makes a noise.
```
