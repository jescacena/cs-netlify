---
layout: main-content-post
title:  What is functional programming?
date:   2020-01-09T11:30:27.794Z
permalink: /functional-programming.what-is/main-content/
icon: https://codersnack.com/assets/images/fp_lisp.png
categories: [snack-main-content-post]
---

Functional programming is a *programming paradigm* that expresses a computation directly as pure functional transformation of data.

 A functional program can be viewed as a declarative program where computations are specified as *pure functions*.

> Pure functions is a function that returns always the same value for the same input and has no side effects.

In constrast to imperative programming (which describe how to does something) , functional programming **describe what to to instead of how to do it**.

Javascript example using Imperative approach

```
function getFileMapById(files) {
  const fileMap = {};
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    fileMap[file.id] = file;
  }
  return fileMap
}
```

Same example using Declarative/Functional approach

```
function getFileMapById(files) {
  return lodash.keyBy(files, "id")
}
```
