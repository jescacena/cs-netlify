
### - References -

- [Medium - Javascript design patterns by Soumyajit Pathak](https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15)

---
layout: post
title:  Decorator pattern
date:   2020-02-20T22:06:43.486Z
permalink: /js-design-patterns-decorator/
icon: https://codersnack.com/assets/images/design-patterns.jpg
categories: [snackpost]
---
This is also a *structural design pattern* that **focuses on the ability to add behaviour or functionalities to existing classes dynamically**. It is another viable alternative to sub-classing.

The decorator type behaviour is very easy to implement in JavaScript because **JavaScript allows us to add methods and properties to object dynamically**. The simplest approach would be to just add a property to an object, but it will not be efficiently reusable.

In this **example**, we create a *Book* class. We further create two decorator functions that accept a book object and return a "decorated" book object, *giftWrap* that adds one new attribute and one new function and *hardbindBook* that adds one new attribute and edits the value of one existing attribute.

```
class Book {
  constructor(title, author, price) {
    this._title = title;
    this._author = author;
    this.price = price;
  }

  getDetails() {
    return `${this._title} by ${this._author}`;
  }
}

// decorator 1
function giftWrap(book) {
  book.isGiftWrapped = true;
  book.unwrap = function() {
    return `Unwrapped ${book.getDetails()}`;
  };

  return book;
}

// decorator 2
function hardbindBook(book) {
  book.isHardbound = true;
  book.price += 5;
  return book;
}

// usage
const alchemist = giftWrap(new Book('The Alchemist', 'Paulo Coelho', 10));

console.log(alchemist.isGiftWrapped); // true
console.log(alchemist.unwrap()); // 'Unwrapped The Alchemist by Paulo Coelho'

const inferno = hardbindBook(new Book('Inferno', 'Dan Brown', 15));

console.log(inferno.isHardbound); // true
console.log(inferno.price); // 20
```
