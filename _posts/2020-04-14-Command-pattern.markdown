---
layout: post
title:  Command pattern
date:   2020-02-20T22:06:14.852Z
permalink: /js-design-patterns-command/
icon: https://codersnack.com/assets/images/design-patterns.jpg
categories: [snackpost]
---
This is a *behavioural design pattern* that **aims to encapsulate actions or operations as objects**. This pattern allows *loose coupling of systems and classes* by separating the objects that request an operation or invoke a method from the ones that execute or process the actual implementation.

The clipboard interaction API somewhat resembles the command pattern. If you are a **Redux** user, you have already come across the command pattern. The actions that allow the awesome **time-travel debugging feature are nothing but encapsulated operations that can be tracked to redo or undo operations**. Hence, time-travelling made possible.

In this **example**, we have a class called *SpecialMath* that has multiple methods and a *Command* class that encapsulates commands that are to be executed on its subject, i.e. an object of the *SpecialMath* class. The *Command* class also keeps track of all the commands executed, which can be used to extend its functionality to include undo and redo type operations.

```
class SpecialMath {
  constructor(num) {
    this._num = num;
  }

  square() {
    return this._num ** 2;
  }

  cube() {
    return this._num ** 3;
  }

  squareRoot() {
    return Math.sqrt(this._num);
  }
}

class Command {
  constructor(subject) {
    this._subject = subject;
    this.commandsExecuted = [];
  }
  execute(command) {
    this.commandsExecuted.push(command);
    return this._subject[command]();
  }
}

// usage
const x = new Command(new SpecialMath(5));
x.execute('square');
x.execute('cube');

console.log(x.commandsExecuted); // ['square', 'cube']
```

### - References -

- [Medium - Javascript design patterns by Soumyajit Pathak](https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15)
