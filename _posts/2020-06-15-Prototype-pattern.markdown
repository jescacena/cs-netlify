---
layout: post
title:  Prototype pattern
date:   2020-01-30T22:49:30.366Z
permalink: /js-design-patterns-prototype/
icon: https://codersnack.com/assets/images/design-patterns.jpg
categories: [snackpost]
---

> Information drawn from 
- [Medium - Javascript design patterns](https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15)

This pattern is an *object-based creational design pattern*. In this, **we use a sort of a "skeleton" of an existing object to create or instantiate new objects**.

This pattern is specifically important and beneficial to JavaScript because it **utilizes prototypal inheritance instead of a classic object-oriented inheritance**. Hence, it plays to JavaScript's strength and has native support.

In this **example**, we have a car object that we use as the prototype to create another object myCar with **JavaScript's Object.create** feature and define an extra property owner on the new object.

```
// using Object.create as was recommended by ES5 standard
const car = {
  noOfWheels: 4,
  start() {
    return 'started';
  },
  stop() {
    return 'stopped';
  },
};

// Object.create(proto[, propertiesObject])

const myCar = Object.create(car, { owner: { value: 'John' } });

console.log(myCar.__proto__ === car); // true
```