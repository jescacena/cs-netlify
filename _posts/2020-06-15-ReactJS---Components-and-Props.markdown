
### - References -

- [ReactJS - Components and props](https://reactjs.org/docs/components-and-props.html)

---
layout: post
title:  ReactJS - Components and Props
date:   2020-01-20T14:58:00.472Z
permalink: /reactjs-components-and-props/
icon: https://codersnack.com/assets/images/logo-reactjs.png
categories: [snackpost]
---
> Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. 

**Conceptually, components are like JavaScript functions**. They accept arbitrary inputs (called *props*) and return React elements describing what should appear on the screen.

### Function and Class Components
The simplest way to define a component is to write a JavaScript function:
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
This function is a valid React component because it accepts a single *props* (which stands for properties) object argument with data and *returns a React element*. We call such components *function components* because they are literally JavaScript functions.

You can also *use an ES6 class to define a component*:
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

The above two components are equivalent from Reacts point of view.

*Classes have some additional features* that we will discuss in the next sections. Until then, we will use function components for their conciseness.

### Props are Read-Only
Whether you declare a component as a function or a class, it must *never modify its own props*. Consider this sum function:
```
function sum(a, b) {
  return a + b;
}
```

Such functions are called *pure* because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, *this function is impure* because it changes its own input:
```
function withdraw(account, amount) {
  account.total -= amount;
}
```

React is pretty flexible but it has a single strict rule:

> All React components must act like pure functions with respect to their props.

Of course, *application UIs are dynamic and change over time*. In the next section,*we will introduce a new concept of state*. State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.