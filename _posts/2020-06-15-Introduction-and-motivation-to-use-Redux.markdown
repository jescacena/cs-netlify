---
layout: post
title:  Introduction and motivation to use Redux
date:   2020-02-02T19:57:54.704Z
permalink: /redux-introduction/
icon: https://codersnack.com/assets/images/redux-icon.png
categories: [snackpost]
---

> #### Information drawn from

- [Reduxjs.org - getting started](https://redux.js.org/introduction/getting-started)

-------------

Redux is a **predictable state container for JavaScript apps**.

It helps you write applications that behave consistently, **run in different environments (client, server, and native)**, and are easy to test. 

You **can use Redux together with React, or with any other view library**. It is *tiny* (2kB, including dependencies), but has a large ecosystem of addons available.

#### Basic Example
**The whole state of your app is stored in an object tree inside a single store**. **The only way to change the state tree is to emit an action,** an object describing what happened. To specify how the **actions** transform the state tree, you write **pure reducers**.

That's it!

```
import { createStore } from 'redux'
/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)
// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.
store.subscribe(() => console.log(store.getState()))
// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

>The only important part is that you should not mutate the state object, but return a new object if the state changes.

#### Motivation
As the requirements for JavaScript single-page applications have become increasingly complicated, **our code must manage more state than ever before.** This state can include server responses and cached data, as well as locally created data that has not yet been persisted to the server. **UI state is also increasing in complexity**, as we need to manage active routes, selected tabs, spinners, pagination controls, and so on.

**Managing this ever-changing state is hard**. If a model can update another model, then a view can update a model, which updates another model, and this, in turn, might cause another view to update. At some point, you no longer understand what happens in your app as you have lost control over the when, why, and how of its state. **When a system is opaque and non-deterministic, it's hard to reproduce bugs or add new features**.

As if this weren't bad enough, consider the new requirements becoming common in front-end product development. As developers, we are expected to handle optimistic updates, server-side rendering, fetching data before performing route transitions, and so on. We find ourselves trying to manage a complexity that we have never had to deal with before, and we inevitably ask the question: is it time to give up? The answer is no.

**This complexity is difficult to handle as we're mixing two concepts** that are very hard for the human mind to reason about: **mutation** and **asynchronicity**. I call them Mentos and Coke. Both can be great in separation, but together they create a mess. Libraries like React attempt to solve this problem in the view layer by removing both asynchrony and direct DOM manipulation. However, managing the state of your data is left up to you. This is where Redux enters.

Following in the steps of Flux, CQRS, and Event Sourcing, **Redux attempts to make state mutations predictable by imposing certain restrictions on how and when updates can happen**. These restrictions are reflected in the three principles of Redux.
