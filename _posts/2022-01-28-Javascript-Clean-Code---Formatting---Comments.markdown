---
layout: post
title:  Javascript Clean Code - Formatting - Comments
date:   2021-11-29T09:42:12.887Z
permalink: /js-clean-code-formatting-comment/
icon: https://codersnack.com/assets/images/js-clean-code.png
categories: [snackpost]
---

> Information drawn from 
- [Clean Code Javascript - Ryan McDermott](https://github.com/ryanmcdermott/clean-code-javascript)

### Formatting

**Formatting is subjective**. Like many rules herein, there is no hard and fast rule that you must follow. **The main point is DO NOT ARGUE over formatting**. **There are tons of tools to automate this**. Use one! It's a waste of time and money for engineers to argue over formatting.

For things that don't fall under the purview of automatic formatting (indentation, tabs vs. spaces, double vs. single quotes, etc.) look here for some guidance.

#### Use consistent capitalization

**JavaScript is untyped, so capitalization tells you a lot about your variables, functions, etc.** These rules are subjective, so your team can choose whatever they want. The point is, no matter what you all choose, **just be consistent**.

*Bad:*
```
const DAYS_IN_WEEK = 7;
const daysInMonth = 30;

const songs = ["Back In Black", "Stairway to Heaven", "Hey Jude"];
const Artists = ["ACDC", "Led Zeppelin", "The Beatles"];

function eraseDatabase() {}
function restore_database() {}

class animal {}
class Alpaca {}
```

*Good:*

```
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;

const SONGS = ["Back In Black", "Stairway to Heaven", "Hey Jude"];
const ARTISTS = ["ACDC", "Led Zeppelin", "The Beatles"];

function eraseDatabase() {}
function restoreDatabase() {}

class Animal {}
class Alpaca {}
```

#### Function callers and callees should be close

**If a function calls another, keep those functions vertically close in the source file**. Ideally, **keep the caller right above the callee**. We tend to read code from top-to-bottom, like a newspaper. Because of this, make your code read that way.

*Bad:*
```
class PerformanceReview {
  constructor(employee) {
    this.employee = employee;
  }

  lookupPeers() {
    return db.lookup(this.employee, "peers");
  }

  lookupManager() {
    return db.lookup(this.employee, "manager");
  }

  getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  perfReview() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();
  }

  getManagerReview() {
    const manager = this.lookupManager();
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.perfReview();

```
*Good:*
```
class PerformanceReview {
  constructor(employee) {
    this.employee = employee;
  }

  perfReview() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();
  }

  getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  lookupPeers() {
    return db.lookup(this.employee, "peers");
  }

  getManagerReview() {
    const manager = this.lookupManager();
  }

  lookupManager() {
    return db.lookup(this.employee, "manager");
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.perfReview();
```

### Comments

**-------**

#### Only comment things that have business logic complexity.
Comments are an apology, not a requirement. **Good code mostly documents itself**.

*Bad:*
```
function hashIt(data) {
  // The hash
  let hash = 0;

  // Length of string
  const length = data.length;

  // Loop through every character in data
  for (let i = 0; i < length; i++) {
    // Get character code.
    const char = data.charCodeAt(i);
    // Make the hash
    hash = (hash << 5) - hash + char;
    // Convert to 32-bit integer
    hash &= hash;
  }
}
```
*Good:*
```
function hashIt(data) {
  let hash = 0;
  const length = data.length;

  for (let i = 0; i < length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;

    // Convert to 32-bit integer
    hash &= hash;
  }
}
```


#### Don't leave commented out code in your codebase

Version control exists for a reason. Leave old code in your history.

*Bad:*
```
doStuff();
// doOtherStuff();
// doSomeMoreStuff();
// doSoMuchStuff();
```
Good:
```
doStuff();
```

#### Don't have journal comments

Remember, use version control! There's no need for dead code, commented code, and especially journal comments. **Use git log to get history!**

*Bad:*
```
/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Removed type-checking (LI)
 * 2015-03-14: Added combine with type-checking (JR)
 */
function combine(a, b) {
  return a + b;
}
```

*Good:*
```
function combine(a, b) {
  return a + b;
}
```

#### Avoid positional markers

They usually just add noise. Let the functions and variable names along with the proper indentation and formatting give the visual structure to your code.

*Bad:*
```
////////////////////////////////////////////////////////////////////////////////
// Scope Model Instantiation
////////////////////////////////////////////////////////////////////////////////
$scope.model = {
  menu: "foo",
  nav: "bar"
};

////////////////////////////////////////////////////////////////////////////////
// Action setup
////////////////////////////////////////////////////////////////////////////////
const actions = function() {
  // ...
};
```
*Good:*
```
$scope.model = {
  menu: "foo",
  nav: "bar"
};

const actions = function() {
  // ...
};
```