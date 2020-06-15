---
layout: post
title:  Flyweight Pattern
date:   2020-02-20T22:07:23.310Z
permalink: /js-design-patterns-flyweight/
icon: https://codersnack.com/assets/images/design-patterns.jpg
categories: [snackpost]
---

### References ---

- [Medium - Javascript design patterns by Soumyajit Pathak](https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15)
---

This is a *structural design pattern* focused on **efficient data sharing through fine-grained objects**. It is used for efficiency and **memory conservation purposes**.

This pattern can be used for any kind of **caching purposes**. In fact, modern browsers use a variant of a flyweight pattern to prevent loading the same images twice.

In this **example**, we create a fine-grained flyweight class *Icecream* for sharing data regarding ice-cream flavours and a factory class *IcecreamFactory* to create those flyweight objects. For memory conservation, the **objects are recycled if the same object is instantiated twice**. This is a simple example of flyweight implementation.

```
// flyweight class
class Icecream {
  constructor(flavour, price) {
    this.flavour = flavour;
    this.price = price;
  }
}

// factory for flyweight objects
class IcecreamFactory {
  constructor() {
    this._icecreams = [];
  }

  createIcecream(flavour, price) {
    let icecream = this.getIcecream(flavour);
    if (icecream) {
      return icecream;
    } else {
      const newIcecream = new Icecream(flavour, price);
      this._icecreams.push(newIcecream);
      return newIcecream;
    }
  }

  getIcecream(flavour) {
    return this._icecreams.find(icecream => icecream.flavour === flavour);
  }
}

// usage
const factory = new IcecreamFactory();

const chocoVanilla = factory.createIcecream('chocolate and vanilla', 15);
const vanillaChoco = factory.createIcecream('chocolate and vanilla', 15);

// reference to the same object
console.log(chocoVanilla === vanillaChoco); // true
```