---
layout: post
title:  Iterator pattern
date:   2020-02-20T22:07:32.750Z
permalink: /js-design-patterns-iterator/
categories: [snackpost]
---
It is a *behavioural design pattern* that **provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.**

**Iterators have a special kind of behaviour where we step through an ordered set of values one at a time by calling *next()* until we reach the end.** The introduction of *Iterator and Generators in ES6 *made the implementation of the iterator pattern extremely straightforward.

We have **two examples** below. First, one *IteratorClass* uses iterator spec, while the other one *iteratorUsingGenerator* uses generator functions.

The **Symbol.iterator** ( Symbol: a new kind of primitive data type) is used to specify the default *iterator* for an object. It must be defined for a *collection* to be able to use the *for...of looping* construct. In the first example, we define the *constructor* to store some collection of data and then define *Symbol.iterator,* which returns an object with *next* method for iteration.

For the second case, we define a *generator function* passing it an array of data and returning its elements iteratively using *next* and *yield*. A *generator* function is a special type of function that works as a *factory* for *iterators* and can explicitly maintain its own internal state and yield values iteratively. It can pause and resume its own execution cycle.

```
// using Iterator
class IteratorClass {
  constructor(data) {
    this.index = 0;
    this.data = data;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.index < this.data.length) {
          return { value: this.data[this.index++], done: false };
        } else {
          this.index = 0; // to reset iteration status
          return { done: true };
        }
      },
    };
  }
}

// using Generator
function* iteratorUsingGenerator(collection) {
  var nextIndex = 0;

  while (nextIndex < collection.length) {
    yield collection[nextIndex++];
  }
}

// usage
const gen = iteratorUsingGenerator(['Hi', 'Hello', 'Bye']);

console.log(gen.next().value); // 'Hi'
console.log(gen.next().value); // 'Hello'
console.log(gen.next().value); // 'Bye'

```

### - References -

- [Medium - Javascript design patterns by Soumyajit Pathak](https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15)
