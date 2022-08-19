---
layout: main-content-post
title:  A practical guide to TypeScript decorators
date:   2022-04-26T09:23:21.705Z
permalink: /typescript-decorators-a-practical-guide/main-content/
icon: https://codersnack.com/assets/images/typescript-icon.png
categories: [snack-main-content-post]
---

We can all agree that JavaScript is an amazing programming language that allows you to build apps on almost any platform. Although it comes with its own fair share of drawbacks, TypeScript has done a great job of covering up some gaps inherent in JavaScript. Not only does it add type safety to a dynamic language, but it also comes with **some cool features that don’t exist yet in JavaScript, such as decorators.**

###  What are decorators?

Although the definition might vary for different programming languages, the reason why decorators exist is pretty much the same across the board. In a nutshell, **a decorator is a pattern in programming in which you wrap something to change its behavior**.

**In JavaScript, this feature is currently at stage two. It’s not yet available in browsers or Node.js, but you can test it out by using compilers like Babel**. Having said that, it’s not exactly a brand new thing; several programming languages, such as Python, Java, and C#, adopted this pattern before JavaScript.

**Even though JavaScript already has this feature proposed, TypeScript’s decorator feature is different in a few significant ways**. Since TypeScript is a strongly typed language, you can access some additional information associated with your data types to do some cool stuff, such as runtime type-assertion and dependency injection.

###  Getting started
Start by **creating a blank Node.js project**.

```
$ mkdir typescript-decorators
$ cd typescript decorators
$ npm init -y
```
Next, **install TypeScript as a development dependency**.

```
$ npm install -D typescript @types/node
```
The @types/node package contains the Node.js type definitions for TypeScript. We need this package to access some Node.js standard libraries.

Add an npm script in the package.json file to compile your TypeScript code.
```
{
  // ...
  "scripts": {
    "build": "tsc"
  }
}
```

**TypeScript has labeled this feature as *experimental***. Nonetheless, it’s **stable enough to use in production**. In fact, the open source community has been using it for quite a while.

To activate the feature, you’ll need to make some adjustments to your **tsconfig.json file**.

```
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```
Create a simple TypeScript **index.ts** file to test it out.

```
console.log("Hello, world!");
```
```
$ npm run build
$ node index.js
Hello, world!
``` 
Instead of repeating this command over and over, **you can simplify the compilation and execution process by using a package called *ts-node***. It’s a community package that enables you to run TypeScript code directly without first compiling it.

Let’s install it as a development dependency.

```
$ npm install -D ts-node
```
Next, add a start script to the package.json file.

```
{
  "scripts": {
    "build": "tsc",
    "start": "ts-node index.ts"
  }
}
```
Simply run npm start to run your code.

```
$ npm start
Hello, world!
```
For reference, I have all the source code on this article published on my GitHub. You can clone it onto your computer using the command below.

```
$ git clone https://github.com/rahmanfadhil/typescript-decorators.git
```


###  Types of decorators

In TypeScript, **decorators are functions that can be attached to classes and their members, such as methods and properties**. Let’s look at some examples.


####  Class decorator

When you attach a function to a class as a decorator, you’ll receive the class constructor as the first parameter.

```
const classDecorator = (target: Function) => {
  // do something with your class
}

@classDecorator
class Rocket {}
```

If you want to override the properties within the class, you can return a new class that extends its constructor and set the properties.

```
const addFuelToRocket = (target: Function) => {
  return class extends target {
    fuel = 100
  }
}

@addFuelToRocket
class Rocket {}
```

Now your Rocket class will have a fuel property with a default value of 100.

```
const rocket = new Rocket()
console.log((rocket).fuel) // 100
```


####  Method decorator

Another good place to attach a decorator is the class method. Here, **you’re getting three parameters in your function: *target*, *propertyKey*, and *descriptor***.

```
const myDecorator = (target: Object, propertyKey: string, descriptor: PropertyDescriptor) =>  {
  // do something with your method
}

class Rocket {
  @myDecorator
  launch() {
    console.log("Launching rocket in 3... 2... 1... 🚀")
  }
}
```

**The first parameter contains the class where this method lives**, which, in this case, is the Rocket class. 
**The second parameter contains your method name** in string format, 
and the **last parameter is the property descriptor, a set of information that defines a property behavior**. This can be used to **observe, modify, or replace a method definition**.

The method decorator can be very useful if you want to extend the functionality of your method, which we’ll cover later.


####   Property decorator

Just like the method decorator, **you’ll get the *target* and *propertyKey* parameter.** The only difference is that **you don’t get the property descriptor.**

```
const propertyDecorator = (target: Object, propertyKey: string) => {
  // do something with your property
}
```
There are several other places to attach your decorators in TypeScript, but that’s beyond the scope of this article. If you’re curious, you can read more about it in the TypeScript docs.


###  Use cases for TypeScript decorators

Now that we’ve covered what decorators are and how to use them properly, let’s take a look at **some specific problems decorators can help us solve**.


####  Calculate execution time

Let’s say **you want to estimate how long it takes to run a function as a way to gauge your application performance**. You can create a decorator to calculate the execution time of a method and print it on the console.

```
class Rocket {
  @measure
  launch() {
    console.log("Launching in 3... 2... 1... 🚀");
  }
}
```

The Rocket class has a launch method inside of it. **To measure the execution time of the launch method,** you can attach the measure decorator.

```
import { performance } from "perf_hooks";

const measure = (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const finish = performance.now();
    console.log(`Execution time: ${finish - start} milliseconds`);
    return result;
  };

  return descriptor;
};
```

As you can see, **the measure decorator replaces the original method with a new one that enables it to calculate the execution time of the original method and log it to the console**.

To calculate the execution time, we’ll use the [Performance Hooks API](https://nodejs.org/api/perf_hooks.html) from the Node.js standard library.

Instantiate a new Rocket instance and call the launch method.

```
const rocket = new Rocket();
rocket.launch();
```

You’ll get the following result.

```
Launching in 3... 2... 1... 🚀
Execution time: 1.0407989993691444 milliseconds
```

####   Decorator factory

**To configure your decorators to act differently in a certain scenario, you can use a concept called decorator *factory*.**

**Decorator factory is a function that returns a decorator**. This enables you to customize the behavior of your decorators by **passing some parameters in the factory**.

Take a look at the example below.

```
const changeValue = (value) => (target: Object, propertyKey: string) => {
  Object.defineProperty(target, propertyKey, { value });
};
```

The changeValue function returns a decorator that change the value of the property based on the value passed from your factory.

```
class Rocket {
  @changeValue(100)
  fuel = 50
}


const rocket = new Rocket()
console.log(rocket.fuel) // 100
```

Now, if you bind your decorator factory to the fuel property, the value will be 100.


####   Automatic error guard

Let’s implement what we’ve learned to solve a real-world problem.

```
class Rocket {
  fuel = 50;

  launchToMars() {
    console.log("Launching to Mars in 3... 2... 1... 🚀");
  }
}
```

Let’s say you have a Rocket class that has a launchToMars method. **To launch a rocket to Mars, the fuel level must be above 100.**

Let’s create the decorator for it.

```
const minimumFuel = (fuel: number) => (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    if (this.fuel > fuel) {
      originalMethod.apply(this, args);
    } else {
      console.log("Not enough fuel!");
    }
  };

  return descriptor;
}; 
```
The minimumFuel is a factory decorator. It takes the fuel parameter, which indicates how much fuel is needed to launch a particular rocket.

To check the fuel condition, wrap the original method with a new method, just like in the previous use case.

Now you can plug your decorator to the launchToMars method and set the minimum fuel level.

```
class Rocket {
  fuel = 50;

  @minimumFuel(100)
  launchToMars() {
    console.log("Launching to Mars in 3... 2... 1... 🚀");
  }
}
```
Now if you invoke the launchToMars method, it won’t launch the rocket to Mars because the current fuel level is 50.

```
const rocket = new Rocket()
rocket.launchToMars()


Not enough fuel!
```
The cool thing about this decorator is that you can apply the same logic into a different method without rewriting the whole if-else statement.

Let’s say you want to make a new method to launch the rocket to the moon. To do that, the fuel level must be above 25.

Repeat the same code and change the parameter.

```
class Rocket {
  fuel = 50;

  @minimumFuel(100)
  launchToMars() {
    console.log("Launching to Mars in 3... 2... 1... 🚀");
  }

  @minimumFuel(25)
  launchToMoon() {
    console.log("Launching to Moon in 3... 2... 1... 🚀")
  }
}
```
Now, this rocket can be launched to the moon.

```
const rocket = new Rocket()
rocket.launchToMoon()


Launching to Moon in 3... 2... 1... 🚀
```

This type of decorator can be very useful for authentication and authorization purposes, such as checking whether a user is allowed to access some private data or not.


###  Conclusion

It’s true that, in some scenarios, it’s not necessary to make your own decorators. Many TypeScript libraries/frameworks out there, such as TypeORM and Angular, already provide all the decorators you need. But it’s always worth the extra effort to understand **what’s going on under the hood**, and it might even inspire you to build your own TypeScript framework.