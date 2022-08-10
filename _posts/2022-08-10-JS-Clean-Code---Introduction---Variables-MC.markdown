---
layout: main-content-post
title:  JS Clean Code - Introduction - Variables
date:   2021-11-28T11:25:30.251Z
permalink: /js-clean-code-variables/main-content/
icon: https://codersnack.com/assets/images/js-clean-code.png
categories: [snack-main-content-post]
---

![js-clean-code-wtfs](https://codersnack.com/assets/images/js-clean-code-wtfs.jpeg)

Software engineering principles, from Robert C. Martin's book [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), **adapted for JavaScript**. This **is not a style guide**. It's a **guide to producing readable, reusable, and refactorable software in JavaScript.**

**Not every principle herein has to be strictly followed**, and even fewer will be universally agreed upon. These are guidelines and nothing more, but they are ones codified **over many years of collective experience** by the authors of Clean Code.

Our craft of software engineering is just a bit over 50 years old, and we are still learning a lot. When software architecture is as old as architecture itself, maybe then we will have harder rules to follow. For now, let these guidelines serve as a touchstone by which to **assess the quality of the JavaScript code that you and your team produce**.

One more thing: knowing these won't immediately make you a better software developer, and working with them for many years doesn't mean you won't make mistakes. **Every piece of code starts as a first draft,** like wet clay getting shaped into its final form. Finally, we chisel away the imperfections when we review it with our peers. **Don't beat yourself up for first drafts that need improvement**. Beat up the code instead!


### Variables


#### Use meaningful and pronounceable variable names


*Bad:*

```
const yyyymmdstr = moment().format("YYYY/MM/DD");
```
*Good:*
```
const currentDate = moment().format("YYYY/MM/DD");
```


#### Use the same vocabulary for the same type of variable


*Bad:*
```
getUserInfo();
getClientData();
getCustomerRecord();
```
*Good:*
```
getUser();
```


#### Use searchable names


**We will read more code than we will ever write. It's important that the code we do write is readable and searchable.** By not naming variables that end up being meaningful for understanding our program, we hurt our readers. **Make your names searchable**. Tools like *[buddy.js](https://github.com/danielstjules/buddy.js/)* and *ESLint* can help identify unnamed constants.

*Bad:*
```
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000);
```

*Good:*

```
// Declare them as capitalized named constants.
const MILLISECONDS_PER_DAY = 60 * 60 * 24 * 1000; //86400000;
setTimeout(blastOff, MILLISECONDS_PER_DAY);
```


#### Use explanatory variables


*Bad:*
```
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
);
```
*Good:*
```
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [_, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);
```

#### Avoid Mental Mapping

Explicit is better than implicit.

*Bad:*
```
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach(l => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  // Wait, what is `l` for again?
  dispatch(l);
});
```

*Good:*
```
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach(location => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  dispatch(location);
});
```


#### Don't add unneeded context


If your class/object name tells you something, don't repeat that in your variable name.

*Bad:*
```
const Car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue"
};

function paintCar(car, color) {
  car.carColor = color;
}
```
*Good:*
```
const Car = {
  make: "Honda",
  model: "Accord",
  color: "Blue"
};

function paintCar(car, color) {
  car.color = color;
}
```


#### Use default arguments instead of short circuiting or conditionals


**Default arguments are often cleaner than short circuiting**. Be aware that if you use them, your function will only provide default values for undefined arguments. Other "falsy" values such as '', "", false, null, 0, and NaN, will not be replaced by a default value.

*Bad:*
```
function createMicrobrewery(name) {
  const breweryName = name || "Hipster Brew Co.";
  // ...
}
```
*Good:*
```
function createMicrobrewery(name = "Hipster Brew Co.") {
  // ...
}
```