---
layout: post
title:  ReactJS - Lifecycle methods
date:   2020-01-30T22:56:43.257Z
permalink: /reactjs-lifecycle-methods/
icon: https://codersnack.com/assets/images/logo-reactjs.png
categories: [snackpost]
---

> References

- [Reactjs.org - Adding lifecycle methods to a class](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class)


Lifecycle methods are **custom functionality that gets executed during the different phases of a component**. There are methods available when the component gets created and inserted into the DOM (mounting), when the component updates, and when the component gets unmounted or removed from the DOM.

#### Adding Lifecycle Methods to a Class
In applications with many components, **it's very important to free up resources taken by the components when they are destroyed**. We want to set up a timer whenever the Clock is rendered to the DOM for the first time. This is called "mounting" in React.We also want to clear that timer whenever the DOM produced by the Clock is removed. This is called "unmounting" in React.We can declare special methods on the component class to run some code when a component mounts and unmounts:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
These methods are called **"lifecycle methods"**.

The **componentDidMount()** method **runs after the component output has been rendered to the DOM**. This is a good place to set up a timer:
```
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```
>Note how we save the timer ID right on this (this.timerID).

>While *this.props* is set up by React itself and *this.state* has a special meaning, you are *free to add additional fields to the class* manually if you need to store something that doesn’t participate in the data flow (like a timer ID).

We will tear down the timer in the *componentWillUnmount()* lifecycle method:
```
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```
Finally, we will implement a method called *tick()* that the *Clock* component will run every second.

It will use *this.setState()* to schedule updates to the component local state:

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
Now the clock ticks every second.

Let’s quickly recap what’s going on and the order in which the methods are called:

- When `<Clock />` is passed to *ReactDOM.render()*, React calls the constructor of the *Clock* component. Since *Clock* needs to display the current time, it initializes *this.state* with an object including the current time. We will later update this state.

- React then **calls the *Clock* component's *render()* method**. This is how React learns what should be displayed on the screen. React then *updates the DOM* to match the Clock’s render output.

- When the *Clock* output is inserted in the DOM, React **calls the *componentDidMount()* lifecycle method**. Inside it, the *Clock* component asks the browser to set up a timer to call the component’s *tick()* method once a second.

- Every second the browser calls the *tick()* method. Inside it, the *Clock* component schedules a UI update by calling *setState()* with an object containing the current time. Thanks to the *setState()* call, React knows **the state has changed, and calls the *render()* method again to learn what should be on the screen**. This time, *this.state.date* in the *render()* method will be different, and so the render output will include the updated time. React updates the DOM accordingly.

- If the *Clock* component is ever removed from the DOM, React calls the *componentWillUnmount()*  lifecycle method so the timer is stopped.