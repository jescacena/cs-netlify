---
layout: post
title:  ES6 let and closures
date:   2020-01-20T15:09:38.771Z
permalink: /es6-let-closures/
icon: http://codersnack.com/assets/images/es6-let-closure.png
categories: [snackpost]
---
Functions can be nested inside other functions. 
Consider the next code:

```
(function autorun(){
    let x = 1;
    function log(){ 
       console.log(x); 
    }
    log();
})();
```
log() is a nested function inside the autorun() function.log() accesses the variable x from its outer function. The log() function is a closure.

> **Closures** are inner functions. Closures can be created by defining a function inside another function or inside a block.
> **Lexical scope** is the ability of the inner function to access the outer scope in which it is defined.
Consider the next code:

```
(function autorun(){
    let x = 1;
    function log(){
      console.log(x);
    };
    
    function run(fn){
      let x = 100;
      fn();
    }
    
    run(log);//1
})();
```

The log function is a closure. It refers the x variable from its parent function autorun() , not the one from the run() function.
> The closure function has access to the scope in which it was created, not the scope in which it is executed.

The local function scope of autorun() is the lexical scope of the log() function.

> Closures store references of outer variables, they do not copy the actual values.

The for loop statement, with the let declaration, creates a new variable local to the block scope, for each iteration. The next loop creates five closures over five different i variables.

```
(function run(){
  for(let i=0; i<5; i++){
    setTimeout(function log(){
      console.log(i); //0 1 2 3 4
    }, 100);
  }
})();
```
Writing the same code with var will create five closures, over the same variable, so all closures will display the last value of i . The log() function is a closure



### - References -

- [[Medium] Discover the power of closures in javascript](https://medium.freecodecamp.org/discover-the-power-of-closures-in-javascript-5c472a7765d7)
- [[Medium] These are the features in es6 that you should know](https://medium.freecodecamp.org/these-are-the-features-in-es6-that-you-should-know-1411194c71cb)
