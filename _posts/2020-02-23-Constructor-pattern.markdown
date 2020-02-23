---
layout: post
title:  Constructor pattern
date:   2020-02-20T22:06:32.746Z
permalink: /js-design-patterns-constructor/
categories: [snackpost]
---
This is a *class-based creational design pattern*. **Constructors are special functions that can be used to instantiate new objects** with methods and properties defined by that function.

It is not one of the classic design patterns. In fact, **it is more of a basic language construct than a pattern** in most object-oriented languages. But in JavaScript, objects can be created on the fly without any constructor functions or "class" definition. Therefore, I think it is important to lay down the foundation for other patterns to come with this simple one.

In this example, we define a *Hero* class with attributes like *name* and *specialAbility* and methods like *getDetails*. Then, we instantiate an object *IronMan* by **invoking the constructor method with the new keyword** passing in the values for the respective attributes as arguments.

```
// traditional Function-based syntax
function Hero(name, specialAbility) {
  // setting property values
  this.name = name;
  this.specialAbility = specialAbility;

  // declaring a method on the object
  this.getDetails = function() {
    return this.name + ' can ' + this.specialAbility;
  };
}

// ES6 Class syntax
class Hero {
  constructor(name, specialAbility) {
    // setting property values
    this._name = name;
    this._specialAbility = specialAbility;

    // declaring a method on the object
    this.getDetails = function() {
      return `${this._name} can ${this._specialAbility}`;
    };
  }
}

// creating new instances of Hero
const IronMan = new Hero('Iron Man', 'fly');

console.log(IronMan.getDetails()); // Iron Man can fly
```

### - References -

- [Medium - Javascript design patterns by Soumyajit Pathak](https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15)
