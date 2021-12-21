---
layout: post
title:  JS Clean Code - DRY-KISS-YAGNI Principles
date:   2021-12-21T17:55:06.366Z
permalink: /js-clean-code-dry-kiss-yagni/
icon: https://codersnack.com/assets/images/js-clean-code.png
categories: [snackpost]
---

> Information drawn from 
- [DRY, KISS & YAGNI Principles - Henrique Siebert Domareski](https://henriquesd.medium.com/dry-kiss-yagni-principles-1ce09d9c601f)

Those are three principles that every developer should care, because they are about clean code. In this article we are going to understand what each one of them means.

##  DRY Principle

DRY stands for **Don’t Repeat Yourself.** In the book ‘The Pragmatic Programmer’, we can see this definition for DRY:

> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

This means that you should not have duplicated code. It’s easier to maintain a code that is only in one place, because if you need to change something in the code, you just need to change in one place. Besides that, **if you have the same code in two or more places, the chance of this code become different during the time is high, and when this happens it will become an easy way to introduce bugs in your system**. Duplicated code also makes the code **more complex and unnecessarily larger**.

**You also should not write ambiguous code. Your classes, your variables, your functions, they should have a specific name, and their name must match their responsibility**. If you have a function, you should know what the function does by just reading its name, **without being needed to read the code inside of it**.

In the book ‘The Pragmatic Programmer’ we also can see that:
DRY is about the duplication of knowledge, of intent. It’s about expressing
the same thing in two different places, possibly in two totally different ways
It means that it’s not only about copy and past code — yes, this is also included - but goes beyond that. It‘s also about having different code that does the same thing. **Maybe you can have different code in two or more places, but they do the same thing in different ways, this also should be avoided.**

**Bad**
``` 
function orderInfo(order){
     
    // Comprobar estado del pedido
    if(order.status=="sent"){
        console.log("your order was already sent");
         
    }else{
        console.log("your order isn't send yet, is in the process" + order.status);
    }
 
    // ....
 
}
 
function editOrder(order){
     
    // Comprobar estado del pedido
    if(order.status=="sent"){
        console.log("your order was already sent");
         
    }else{
        console.log("your order isn't send yet, is in the process" + order.status);
    }
 
    // Edit order
    // ....
 
}
``` 
**Good**
Encapsular en una función y llamarla desde distintos sitios:
``` 
function orderInfo(order){
     
    getOrderStatusInfo(order);
 
    // ....
 
}
 
function editOrder(order){
     
    getOrderStatusInfo(order);
 
    // Edit order
    // ....
 
}
 
function getOrderStatusInfo(order){
     
    // Comprobar estado del pedido
    if(order.status=="sent"){
        console.log("your order was already sent");
    }else{
        console.log("your order isn't send yet, is in the process"+order.status);
    }
}
``` 



##  KISS Principle


KISS is an acronym for **Keep It Simple, Stupid**. This principle says about to make your code simple. You should avoid **unnecessary complexity**. A simple code it’s **easier to maintain and easier to understand.**

You can apply this principle in the design and in the implementation of the code. You should eliminate duplicated code, should remove unnecessary features, don’t use unnecessary variables and methods, **use names for variables and methods that makes sense and matches their responsibilities**, and always when it’s possible, follow know standards of code development. You also should separate the responsibilities of your classes and the responsibilities from the layers of the project.

Sometimes you don’t need to implement something new to attend your needs, **you can simply make use of the features of the programming language that you are using**. For that, it’s good that you know the features of the programming language that you are working with.

If you are working in a code that it’s already implemented, **and you see something that it’s not necessary or could be simpler, you should consider refactoring it**.

**Bad**
```
getBooleanValue() {
    x = true;
    if ( x == true) {
        return true;
    } else {
        return false;
    }
}
```

**Good**
```
getBooleanValue() {
    x = true;
    return x || false;
}
```




## YAGNI Principle

YAGNI stands for **You Ain’t Gonna Need It**. It’s a principle from software development methodology of Extreme Programming (XP). This principle says that **you should not create features that it’s not really necessary.**

This principle it’s similar to the KISS principle, once that both of them aim for a simpler solution. The difference between them it’s that **YAGNI focus on removing unnecessary functionality and logic, and KISS focus on the complexity.**

> Ron Jeffries, one of the co-founders of the XP, once said:
Always implement things when you actually need them, never when you just foresee that you need them.

It means that you should not implement functionality just because you think that you may need it someday, but implement it just when you really need it. Doing that you will avoid spending time with implementations that were not even necessary, and maybe will never be used.

##  Conclusion

Follow these principles, will allow you to write better code. Remember that **a clean code it’s easier to main, easier to understand and for sure it will save your time** when you need to change or implement something. Avoid use duplicated code, try to keep your code as simple as possible, and just implement features when it’s really necessary.