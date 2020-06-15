---
layout: post
title:  Chain of responsibility pattern
date:   2020-02-20T22:06:05.787Z
permalink: /js-design-patterns-chain-of-responsibility/
icon: https://codersnack.com/assets/images/design-patterns.jpg
categories: [snackpost]
---

### References ---

- [Medium - Javascript design patterns by Soumyajit Pathak](https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15)
---

This is a *behavioural design pattern* that **provides a chain of loosely coupled objects. Each of these objects can choose to act on or handle the request of the client.**

> A good example of the chain of responsibility pattern is the event bubbling in DOM in which an event propagates through a series of nested DOM elements, one of which may have an "event listener" attached to listen to and act on the event.

In this example, we create a class *CumulativeSum*, which can be instantiated with an optional *initialValue*. It has a method *add* that adds the passed value to the sum attribute of the object and returns the object itself to allow chaining of add method calls.

```
class CumulativeSum {
  constructor(intialValue = 0) {
    this.sum = intialValue;
  }

  add(value) {
    this.sum += value;
    return this;
  }
}

// usage
const sum1 = new CumulativeSum();
console.log(sum1.add(10).add(2).add(50).sum); // 62


const sum2 = new CumulativeSum(10);
console.log(sum2.add(10).add(20).add(5).sum); // 45
```

This is a common pattern that **can be seen in jQuery** as well, where almost any method call on a jQuery object returns a jQuery object so that method calls can be chained together.