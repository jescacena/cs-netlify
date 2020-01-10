---
layout: post
title:  ES6 let and closures
date:   2020-01-10T12:18:44.283Z
permalink: /es6-let-closures/
categories: jekyll update
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
log() is a nested function inside the autorun() function. log() accesses the variable x from its outer function. The log() function is a closure.


### - References -

- [[Medium] Discover the power of closures in javascript](https://medium.freecodecamp.org/discover-the-power-of-closures-in-javascript-5c472a7765d7)
- [[Medium] These are the features in es6 that you should know](https://medium.freecodecamp.org/these-are-the-features-in-es6-that-you-should-know-1411194c71cb)
