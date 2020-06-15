---
layout: post
title:  Strategy Pattern
date:   2020-02-04T11:10:29.214Z
permalink: /js-design-patterns-strategy/
icon: https://codersnack.com/assets/images/design-patterns.jpg
categories: [snackpost]
---

> References

- [Medium - Javascript design patterns](https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15)


It is a *behavioural design pattern* that **allows encapsulation of alternative algorithms for a particular task**. It **defines a family of algorithms and encapsulates them in such a way that they are interchangeable at runtime without client interference or knowledge**.

In the **example** below, we create a class *Commute* for encapsulating all the possible strategies for commuting to work. Then, we define three strategies namely *Bus*, *PersonalCar*, and *Taxi*. Using this pattern we can swap the implementation to use for the travel method of the *Commute* object at runtime.

```
// encapsulation
class Commute {
  travel(transport) {
    return transport.travelTime();
  }
}

class Vehicle {
  travelTime() {
    return this._timeTaken;
  }
}

// strategy 1
class Bus extends Vehicle {
  constructor() {
    super();
    this._timeTaken = 10;
  }
}

// strategy 2
class Taxi extends Vehicle {
  constructor() {
    super();
    this._timeTaken = 5;
  }
}

// strategy 3
class PersonalCar extends Vehicle {
  constructor() {
    super();
    this._timeTaken = 3;
  }
}

// usage
const commute = new Commute();

console.log(commute.travel(new Taxi())); // 5
console.log(commute.travel(new Bus())); // 10
```