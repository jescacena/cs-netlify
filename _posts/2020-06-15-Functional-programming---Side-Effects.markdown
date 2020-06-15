
### - References -

- [Functional programming fundamentals](https://www.matthewgerstman.com/tech/functional-programming-fundamentals/?utm_campaign=React%2BNewsletter&utm_medium=email&utm_source=React_Newsletter_147)

---
layout: post
title:  Functional programming - Side Effects
date:   2020-01-09T11:23:09.392Z
permalink: /functional-programming-side-effects/
icon: https://codersnack.com/assets/images/functional-programming.png
categories: [snackpost]
---
### Side Effects

**The no side-effects bit is particularly important, because this is what allows us to trust that a function will always behave the same in any environment**. 

Now side-effects aren't inherently bad, but you should isolate them to parts of your codebase where you can easily identify them.

Let's take a look a some examples of side effects.


#### Mutation
Modifying the argument that’s passed in.
```
// Mutates the given array
function pop(arr) {
  return arr.splice(0, 1);
}

const arr = [1,2,3,4];
pop(arr);
console.log(arr); // [2, 3, 4]; 
```

In this example above, we're changing the value of *arr* at the reference it lives at. As a result, we can't predict what this function will return at any point. What happens when *arr* runs out of values?


#### Shared State
Using some form of global state.
```

// These have different values every time you call them.
let i = 0;
function increment() {
 return i++;
}

function decrement() {
  return i--;
}
```
In this example, we can't predict what these functions will return because they depend on some external value. The order of the function calls will matter.

Furthermore what happens if someone else changes the value of *i*? Do you feel like googling what *string++* is?


#### Asynchronous Code
Code that doesn't execute immediately.
```
let i = 0;
function incrementAsync(obj) {
  setTimeout(() => {
    i++;
  }, 0)
}
incrementAsync();
console.log(i); // 0
// later
console.log(i); // 1
```
This one deserves an extra mention because its a necessity. We have to do some things asynchronously. We have to hit APIs; we have to fetch data.

This brings me back to my earlier point. Side effects aren't inherently bad, but they should be properly isolated to make your code more predictable.


#### Example Time
```
// This is a pure function
function clone(obj) {
  return {...obj};
}

// This mutates the given object
function killParents(wizard) {
  wizard.parents = "Dead";
  return wizard;
}

// This mutates the given object
function addScar(wizard) {
  wizard.scar = true;
}

const a = {name: "Harry Potter"};
const b = clone(a);
const c = killParents(b);
const d = addScar(c);
```
Looking at the code above, we would expect it to produce the following:
```

// In a pure function world.

console.log(a) // {Name: "Harry Potter"};
console.log(b) // {Name: "Harry Potter"};
console.log(c) // {Name: "Harry Potter", parents: "Dead"};
console.log(d) // {Name: "Harry Potter", scar: true, parents: "Dead"};
```

Unfortunately, this isn't what we get. This is:
```
// Actual results
console.log(a) // {Name: "Harry Potter"};
console.log(b) // {Name: "Harry Potter", scar: true, parents: "Dead"};
console.log(c) // {Name: "Harry Potter", scar: true, parents: "Dead"};
console.log(d) // undefined
```

What happened?

Well the first function, *clone* is a pure function and works as expected. It produced a new object at a new reference.

*killParents* is not a pure function. It mutates the given argument and marks the parent as dead. It does however return the object so it appears we're getting a new copy.

*addScar* really doesn't care. It mutates the original object, and then returns nothing, so *addScar(c)* returns undefined even though it also modifies *c*.

As a result *a* is pointing to the original reference, *b* and *c* are pointing to the cloned copy (with dead parents and a scar), and *d* is pointing to nothing.

