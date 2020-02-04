---
layout: post
title:  Template pattern
date:   2020-02-04T11:17:13.865Z
permalink: /js-design-patterns-template/
categories: jekyll update
---
This is a *behavioural design pattern* based on **defining the skeleton of the algorithm or implementation of an operation, but deferring some steps to subclasses**. It lets subclasses redefine certain steps of an algorithm without changing the algorithm’s outward structure.

In this **example**, we have a *Template* class *Employee* that implements *work* method partially. It is for the subclasses to implement responsibilities method to make it work as a whole. We then create two subclasses *Developer* and *Tester* that extend the template class and implement the required method to fill the implementation gap.

```
class Employee {
  constructor(name, salary) {
    this._name = name;
    this._salary = salary;
  }

  work() {
    return `${this._name} handles ${this.responsibilities() /* gap to be filled by subclass */}`;
  }

  getPaid() {
    return `${this._name} got paid ${this._salary}`;
  }
}

class Developer extends Employee {
  constructor(name, salary) {
    super(name, salary);
  }

  // details handled by subclass
  responsibilities() {
    return 'application development';
  }
}

class Tester extends Employee {
  constructor(name, salary) {
    super(name, salary);
  }

  // details handled by subclass
  responsibilities() {
    return 'testing';
  }
}

// usage
const dev = new Developer('Nathan', 100000);
console.log(dev.getPaid()); // 'Nathan got paid 100000'
console.log(dev.work()); // 'Nathan handles application development'

const tester = new Tester('Brian', 90000);
console.log(tester.getPaid()); // 'Brian got paid 90000'
console.log(tester.work()); 
```


### - References -

- [Medium - Javascript design patterns](https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15)
