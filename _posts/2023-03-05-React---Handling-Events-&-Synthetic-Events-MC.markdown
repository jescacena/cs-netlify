---
layout: main-content-post
title:  React - Handling Events & Synthetic Events
date:   2020-05-28T12:52:02.448Z
permalink: /reactjs-handling-events/main-content/
icon: https://codersnack.com/assets/images/logo-reactjs.png
categories: [snack-main-content-post]
---

Handling events with React elements is **very similar to handling events on DOM elements**. There are some syntax **differences**:

- React events are **named using camelCase**, rather than lowercase.
- **With JSX you pass a function as the event handler**, rather than a string.

For example, the HTML:
```
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
is slightly different in React:
```
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
Another difference is that you cannot return false to prevent default behavior in React. **You must call preventDefault explicitly**. For example, with plain HTML, to prevent the default link behavior of opening a new page, you can write:
```
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```
In React, this could instead be:
```
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
Here, e is a **synthetic event**. React defines these synthetic events according to the W3C spec, so you **don’t need to worry about cross-browser compatibility**. See the SyntheticEvent reference guide to learn more.

When using React, you generally don’t need to call *addEventListener* to add listeners to a DOM element after it is created. Instead, just provide a listener when the element is initially rendered.

When you define a component using an ES6 class, a common pattern is for an **event handler to be a method on the class**. For example, this Toggle component renders a button that lets the user toggle between “ON” and “OFF” states:
```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

> You have to be careful about the meaning of this in JSX callbacks. In JavaScript, class methods are not bound by default. If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called.This is not React-specific behavior; it is a part of how functions work in JavaScript. Generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method.

**If calling bind annoys you, there are two ways you can get around this**. If you are using the **experimental public class fields syntax**, you can use class fields to correctly bind callbacks:
```
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

This syntax is enabled by default in Create React App.
If you aren’t using class fields syntax, you can use an **arrow function in the callback**:
```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```
The problem with this syntax is that *a different callback is created each time the LoggingButton renders*. In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally **recommend binding in the constructor or using the class fields syntax**, to avoid this sort of performance problem.

#### Passing Arguments to Event Handlers
Inside a loop, it is common to want to pass an extra parameter to an event handler. For example, if id is the row ID, either of the following would work:
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
The above two lines are equivalent, and use arrow functions and Function.prototype.bind respectively. In both cases, the e argument representing the React event will be passed as a second argument after the ID. With an arrow function, we have to pass it explicitly, but with bind any further arguments are automatically forwarded.

### SyntheticEvent
This reference guide documents the **SyntheticEvent** wrapper that forms part of *React’s Event System*. 

#### Overview
**Your event handlers will be passed instances of SyntheticEvent, a cross-browser wrapper around the browser’s native event.** It has the **same interface** as the browser’s native event, including stopPropagation() and preventDefault(), except the events **work identically across all browsers**.

If you find that you need the underlying browser event for some reason, simply use the nativeEvent attribute to get it. Every *SyntheticEvent* object has the following attributes:

- boolean bubbles
- boolean cancelable
- DOMEventTarget currentTarget
- boolean defaultPrevented
- number eventPhase
- boolean isTrusted
- DOMEvent nativeEvent
- void preventDefault()
- boolean isDefaultPrevented()
- void stopPropagation()
- boolean isPropagationStopped()
- void persist()
- DOMEventTarget target
- number timeStamp
- string type
Note:

> As of v0.14, returning false from an event handler will no longer stop event propagation. Instead, e.stopPropagation() or e.preventDefault() should be triggered manually, as appropriate.


#### Event Pooling
The **SyntheticEvent is pooled**. This means that the **SyntheticEvent object will be reused and all properties will be nullified after the event callback has been invoked**. This is for *performance* reasons. As such, *you cannot access the event in an asynchronous way.*

```
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```

> Note: If you want to *access the event properties in an asynchronous way*, you should call *event.persist()* on the event, which will remove the synthetic event from the pool and allow references to the event to be retained by user code.

#### Supported Events
**React normalizes events so that they have consistent properties across different browsers.**

The event handlers below are triggered by an event in the bubbling phase. To **register an event handler for the capture phase**, append **Capture** to the event name; for example, instead of using *onClick*, you would use *onClickCapture* to handle the click event in the capture phase.

- Clipboard Events
- Composition Events
- Keyboard Events
- Focus Events
- Form Events
- Generic Events
- Mouse Events
- Pointer Events
- Selection Events
- Touch Events
- UI Events
- Wheel Events
- Media Events
- Image Events
- Animation Events
- Transition Events
- Other Events


### Event bubbling

Event bubbling is a **type of event propagation** where the event **first triggers on the innermost target element**, and then **successively triggers on the ancestors (parents)** of the target element in the same nesting hierarchy till it reaches the outermost DOM element or document object (Provided the handler is initialized). 

![Event bubling](https://codersnack.com/assets/images/event_bubbling.jpg)

It is one **way that events are handled in the browser**.


