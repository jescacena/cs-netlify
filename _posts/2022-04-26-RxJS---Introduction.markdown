---
layout: post
title:  RxJS - Introduction
date:   2022-03-23T15:50:28.587Z
permalink: /rxjs-introduction/
icon: https://codersnack.com/assets/images/rxjs-logo.png
categories: [snackpost]
---

> Information drawn from 
- [LearnRXJS - RxJS Primer](https://www.learnrxjs.io/learn-rxjs/concepts/rxjs-primer)

Brand new to RxJS? In this article we will take a crash course through all the major concepts you will need to begin getting a grasp on, and start being productive with RxJS. Hold on tight and let's get started!

## What is an Observable?

**An observable represents a stream, or source of data that can arrive over time**. You can create an observable from nearly anything, but the most common use case in RxJS is from events. This can be anything from mouse moves, button clicks, input into a text field, or even route changes. The easiest way to create an observable is through the built in creation functions. For example, we can use the fromEvent helper function to create an observable of mouse click events:
```
// import the fromEvent operator
import { fromEvent } from 'rxjs';

// grab button reference
const button = document.getElementById('myButton');

// create an observable of button clicks
const myObservable = fromEvent(button, 'click');
```

At this point we have an observable but it's not doing anything. This is because observables are cold, or do not activate a producer (like wiring up an event listener), until there is a...


##  Subscription

**Subscriptions are what set everything in motion**. You can think of this like a faucet, you have a stream of water ready to be tapped (observable), someone just needs to turn the handle. In the case of observables, that role belongs to the subscriber.

**To create a *subscription*, you call the subscribe method, supplying a function (or object) - also known as an *observer***. This is where you can decide how to react(-ive programming) to each event. Let's walk through what happens in the previous scenario when a subscription is created:

```
// import the fromEvent operator
import { fromEvent } from 'rxjs';

// grab button reference
const button = document.getElementById('myButton');

// create an observable of button clicks
const myObservable = fromEvent(button, 'click');

// for now, let's just log the event on each click
const subscription = myObservable.subscribe(event => console.log(event));
```

In the example above, calling **myObservable.subscribe() **will:
- Set up an event listener on our button for click events.
- Call the function we passed to the subscribe method (observer) on each click
event.
- Return a subscription object with an unsubscribe which contains clean up
logic, like removing appropriate event listeners.

**The subscribe method also accepts an object map to handle the case of error or completion**. You probably won't use this as much as simply supplying a function, but it's good to be aware of should the need arise:

```
// instead of a function, we will pass an object with next, error, and complete methods
const subscription = myObservable.subscribe({
  // on successful emissions
  next: event => console.log(event),
  // on errors
  error: error => console.log(error),
  // called once on completion
  complete: () => console.log('complete!')
});
```

**It's important to note that each subscription will create a new execution context.** This means calling subscribe a second time will create a new event listener:

```
// addEventListener called
const subscription = myObservable.subscribe(event => console.log(event));

// addEventListener called again!
const secondSubscription = myObservable.subscribe(event => console.log(event));

// clean up with unsubscribe
subscription.unsubscribe();
secondSubscription.unsubscribe();
```

**By default, a subscription creates a one on one, one-sided conversation between the observable and observer**. This is like your boss (the observable) yelling (emitting) at you (the observer) for merging a bad PR. This is also known as **unicasting**. If you prefer a conference talk scenario - one observable, many observers - you will take a different approach which includes **multicasting** with **Subjects** (either explicitly or behind the scenes). More on that in a future article!

It's worth noting that when we discuss an Observable source emitting data to observers, this is a **push based model**. The source doesn't know or care what subscribers do with the data, it simply pushes it down the line.

While working on a stream of events is nice, it's only so useful on its own. What makes RxJS the "lodash for events" are its...


##  Operators

**Operators offer a way to manipulate values from a source, returning an observable of the transformed values**. Many of the RxJS operators will look familiar if you are used to JavaScripts Array methods. For instance, if you want to **transform emitted values from an observable source, you can use *map***:

```
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
/*
 *  'of' allows you to deliver values in a sequence
 *  In this case, it will emit 1,2,3,4,5 in order.
 */
const dataSource = of(1, 2, 3, 4, 5);

// subscribe to our source observable
const subscription = dataSource
  .pipe(
    // add 1 to each emitted value
    map(value => value + 1)
  )
  // log: 2, 3, 4, 5, 6
  .subscribe(value => console.log(value));
```

Or if you want to **filter for specific values, you can use *filter***:

```
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

const dataSource = of(1, 2, 3, 4, 5);

// subscribe to our source observable
const subscription = dataSource
  .pipe(
    // only accept values 2 or greater
    filter(value => value >= 2)
  )
  // log: 2, 3, 4, 5
  .subscribe(value => console.log(value));
```

In practice, **if there is a problem you need to solve, it's more than likely there is an operator for that**. And while the sheer number of operators can be overwhelming as you begin your RxJS journey, **you can narrow it down to a small handful (and we will) to start being effective**. Over time, you will come to appreciate the flexibility of the operator library when obscure scenarios inevitably arrive.

One thing you may have noticed in the example above, is operators exist within a...


### Pipe

**The pipe function is the assembly line from your observable data source through your operators**. Just like raw material in a factory goes through a series of stops before it becomes a finished product, **source data can pass through a pipe-line of operators where you can manipulate, filter, and transform the data to fit your use case**. It's not uncommon to use 5 (or more) operators within an observable chain, contained within the pipe function.

For instance, a typeahead solution built with observables may use a group of operators to optimize both the request and display process:

```
// observable of values from a text box, pipe chains operators together
inputValue
  .pipe(
    // wait for a 200ms pause
    debounceTime(200),
    // if the value is the same, ignore
    distinctUntilChanged(),
    // if an updated value comes through while request is still active cancel previous request and 'switch' to new observable
    switchMap(searchTerm => typeaheadApi.search(searchTerm))
  )
  // create a subscription
  .subscribe(results => {
    // update the dom
  });
```

But how do you know which operator fits your use-case? The good news is...
**Operators can be grouped into common categories**

> **The first stop when looking for the correct operator is finding a related category**. Need to filter data from a source? Check out the filtering operators. Trying to track down a bug, or debug the flow of data through your observable stream? There are utility operators that will do the trick. The operator categories include...


### Creation operators

These operators allow the **creation of an observable from nearly anything**. From generic to specific use-cases you are free to turn everything into a stream.

For example, suppose we are creating a progress bar as a user scrolls through an article. We could turn the scroll event into a stream by utilizing the fromEvent operator:

```
fromEvent(scrollContainerElement, 'scroll')
  .pipe(
    // we will discuss cleanup strategies like this in future article
    takeUntil(userLeavesArticle)
  )
  .subscribe(event => {
    // calculate and update DOM
  });
```

> The most commonly used creation operators are **of, from, and fromEvent**.


###  Combination operators

The combination operators allow the **joining of information from multiple observables**. Order, time, and structure of emitted values is the primary variation among these operators.

For example, we can combine updates from multiple data sources to perform a calculation:

```
// give me the last emitted value from each source, whenever either source emits
combineLatest(sourceOne, sourceTwo).subscribe(
  ([latestValueFromSourceOne, latestValueFromSourceTwo]) => {
    // perform calculation
  }
);
```

> The most commonly used combination operators are **combineLatest, concat, merge, startWith, and withLatestFrom**.


###  Error handling operators

The error handling operators **provide effective ways to gracefully handle errors and perform retries, should they occur**.

For example, we can use catchError to safeguard against failed network requests:

```
source
  .pipe(
    mergeMap(value => {
      return makeRequest(value).pipe(
        catchError(handleErrorByReturningObservable)
      );
    })
  )
  .subscribe(value => {
    // take action
  });
```

> The most commonly used error handling operators is **catchError**.

###   Filtering operators

The filtering operators **provide techniques for accepting - or declining - values from an observable source and dealing with backpressure, or the build up of values within a stream**.

For example, we can use the take operator to capture only the first 5 emitted values from a source:

```
source.pipe(take(5)).subscribe(value => {
  // take action
});
```

> The most commonly used filtering operators are **debounceTime, distinctUntilChanged, filter, take, and takeUntil**.


###   Multicasting operators

In RxJS observables are cold, or unicast (one source per subscriber) by default. These operators **can make an observable hot, or multicast, allowing side-effects to be shared among multiple subscribers**.

For example, we may want late subscribers to share, and receive the last emitted value from an active source:

```
const source = data.pipe(shareReplay());

const firstSubscriber = source.subscribe(value => {
  // perform some action
});

// sometime later...

// second subscriber gets last emitted value on subscription, shares execution context with 'firstSubscriber'
const secondSubscriber = source.subscribe(value => {
  // perform some action
});
```

The most commonly used multicasting operator is **shareReplay**.


###  Transformation operators

Transforming values as they pass through an operator chain is a common task. These operators **provide transformation techniques for nearly any use-case you will encounter**.

For example, we may want to accumulate a state object from a source over time, similar to Redux:

```
source
  .pipe(
    scan((accumulatedState, currentState) => {
      return { ...accumulatedState, ...currentState };
    })
  )
  .subscribe();
```

> The most commonly used transformation operators are **concatMap, map, mergeMap, scan, and switchMap**.


###  Operators have common behaviors

**While operators can be grouped into common categories, operators within a category often share common behavior**. By recognizing this common behavior you can start creating a 'choose your own operator' tree in your mind.

For instance, a large amount of operators can be grouped into...


####  Operators that flatten

Or, in other words, operators that **manage the subscription of an inner observable, emitting those values into a single observable source**. One common use case for flattening operators is handling HTTP requests in a observable or promise based API, but that is really just scratching the surface:

```
fromEvent(button, 'click')
  .pipe(
    mergeMap(value => {
      // this 'inner' subscription is managed by mergeMap, with response value emitted to observer
      return makeHttpRequest(value);
    })
  )
  .subscribe(response => {
    // do something
  });
```
We can then divide the flattening operators into common behaviors like...

####  Operators that switch

Like a light switch, **switch based operators will turn off (unsubscribe) the current observable and turn on a new observable on emissions from the source**. Switch operators are useful in situations **you don't want (or need) more than one active observable at a time**:
```
inputValueChanges
  // only the last value is important, if new value comes through cancel previous request / observable
  .pipe(
    // make GET request for data
    switchMap(requestObservable)
  )
  .subscribe();
```
> Switch based operators include **switchAll, switchMap, and switchMapTo**.


####  Operators that concat

Comparable to a line at the ATM machine, **the next transaction can't begin until the previous completes**. In observable terms, only one subscription will occur at a time, in order, triggered by the completion of the previous. These are **useful in situations where order of execution is important**:

```
concat(
  firstObservable,
  // will begin when 'firstObservable` completes
  secondObservable,
  // will begin when 'secondObservable` completes
  thirdObservable
).subscribe(values => {
  // take action
});
```
> Concat based operators include **concat, concatAll, concatMap, and concatMapTo**.


####  Operators that merge

Like your merging lane on the interstate, **merge based operators support multiple active observables flowing into one lane in a *first come first serve basis*.** Merge operators are useful in situations where **you want to trigger an action when an event from one of many sources occurs**:

```
merge(firstObservable, secondObservable)
  // any emissions from first or second observable as they occur
  .pipe(mergeMap(saveActivity))
  .subscribe();
```

> Merge based operators include **merge, mergeMap, mergeMapTo and mergeAll**.


####   Other similarities between operators

There are also operators that share a similar goal but offer flexibility in their triggers. For instance, for unsubscribing from an observable after a specific condition is met, we could use:

- **take** when we know we only ever want n
values.
- **takeLast** when you just want the last
n values.
- **takeWhile** when we have a predicate
expression to supply.
- **takeUntil** when we only want the
source to remain active until another source emits.

While the number of RxJS operators can seem overhelming at first, these common behaviors and patterns can bridge the gap rather quickly while learning RxJS.


##  What does this get me?

As you become more familiar with push based programming through Observables, **you can begin to model all async behavior in your applications through observable streams**. This opens up simple solutions and flexibility for notably complex behavior.

For instance, suppose we wanted to make a request which saved user activity when they answered a quiz question. Our initial implementation may use the mergeMap operator, which fires off a save request on each event:

```
const formEvents = fromEvent(formField, 'click');
const subscription = formEvents
  .pipe(
    map(convertToAppropriateValue),
    mergeMap(saveRequest)
  )
  .subscribe();
```

**Later, it's determined that we need to ensure order of these saves**. Armed with the knowledge of operator behavior from above, instead of implementing a complex queueing system **we can instead replace the *mergeMap* operator with *concatMap* and push up our changes**:

```
const formEvents = fromEvent(formField, 'click');
const subscription = formEvents
  .pipe(
    map(convertToAppropriateValue),
    // now the next request won't begin until the previous completes
    concatMap(saveRequest)
  )
  .subscribe();
```

With the change of one word we are now queueing our event requests, and this is just scratching the surface of what is possible!


##  Keep Going!

Learning RxJS can be intimidating, but it's a path I promise is worth the investment. If some of these concepts are still fuzzy (or make no sense at all!), don't worry! It will all click soon.
