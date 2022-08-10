---
layout: main-content-post
title:  ES6 modules
date:   2020-02-23T00:27:01.866Z
permalink: /es6-modules/main-content/
icon: https://codersnack.com/assets/images/es6.png
categories: [snack-main-content-post]
---

Before modules, a variable declared outside any function was a global variable.

**With modules, a variable declared outside any function is hidden and not available to other modules unless it is explicitly exported**.

*Exporting makes a function or object available to other modules*. In the next example, I export functions from different modules:

```
//module "./TodoStore.js"
export default function TodoStore(){}

//module "./UserStore.js"
export default function UserStore(){}
```

*Importing makes a function or object, from other modules, available to the current module*.

```
import TodoStore from "./TodoStore";
import UserStore from "./UserStore";

const todoStore = TodoStore();
const userStore = UserStore();
```