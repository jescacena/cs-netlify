---
layout: post
title:  ReactJS - Introducing JSX
date:   2020-01-20T15:04:09.637Z
permalink: /reactjs-introducing-jsx/
categories: [snackpost]
---
Consider this variable declaration:

```
const element = <h1>Hello, world!</h1>;
```

This funny tag syntax is neither a string nor HTML.

It is called JSX, and it is a **syntax extension to JavaScript**. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.

**JSX produces React "elements"**.


### Why JSX?

**React embraces the fact that rendering logic is inherently coupled** with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.

Instead of artificially separating technologies by putting markup and logic in separate files, **React separates concerns with loosely coupled units called "components" that contain both**. We will come back to components in a further section, but if you’re not yet comfortable putting markup in JS, this talk - https://www.youtube.com/watch?v=x7cQ3mrcKaY -  might convince you otherwise.

React doesn't require using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages.

### JSX Represents Objects
Babel compiles JSX down to React.createElement() calls.

These two examples are identical:
```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

```
**React.createElement()** *performs a few checks to help you write bug-free code* but essentially it creates an object like this:

```
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

**These objects are called React elements.**. You can think of them as *descriptions of what you want to see on the screen*. React reads these objects and uses them to construct the DOM and keep it up to date.


### - References -

- [Reactjs.org - Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [Why Jsx talk](https://www.youtube.com/watch?v=x7cQ3mrcKaY)
