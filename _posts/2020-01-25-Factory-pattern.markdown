---
layout: post
title:  Factory pattern
date:   2020-01-09T11:22:59.461Z
permalink: /js-design-patterns-factory/
categories: jekyll update
---
Factory pattern is a *class-based creational pattern*. It provides a generic interface that delegates the responsibility of object instantiation to its subclasses.

This pattern is frequently used when we need to manage or **manipulate collections of objects that are different yet have many similar characteristics**.

Javascript Example
```
class BallFactory {
  constructor() {
    this.createBall = type => {
      let ball;

      if (type === "soccer" || type === "football") {
        ball = new Football();
      } else if (type === "basketball") {
        ball = new Basketball();
      }
      ball.roll = () => {
        console.log(`The ${type} is rolling`);
      };

      return ball;
    };
  }
}

class Football {
  constructor() {
    this._type = "football";
    this.kick = () => {
      console.log("You kicked the football");
    };
  }
}

class Basketball {
  constructor() {
    this._type = "basketball";
    this.bounce = () => {
      console.log("You bounced the basketball");
    };
  }
}

// creating objects
const factory = new BallFactory();
const myFootball = factory.createBall("football");
const myBasketball = factory.createBall("basketball");

myFootball.roll();
myBasketball.roll();

myFootball.kick();

myBasketball.bounce();
```

### - References -

- [Medium - Javascript design psatterns](https://medium.com/beginners-guide-to-mobile-web-development/javascript-design-patterns-25f0faaaa15)
- [Codepen example](https://codepen.io/jescacena/project/editor/ZyVyGn)
- [Essential JS design patterns book](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
