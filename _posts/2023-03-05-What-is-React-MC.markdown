---
layout: main-content-post
title:  What is React?
date:   2020-01-20T15:00:42.381Z
permalink: /react-what-is/main-content/
icon: https://codersnack.com/assets/images/logo-reactjs.png
categories: [snack-main-content-post]
---

React is a free, unlicensed JS library focused in **UI management**.

Created by **Facebook**,React was initially released in 2013.

React has some unique core concepts. It has a virtual DOM, JSX components, input properties, and props. Also, each React component has a state and a lifecycle.

#### Virtual DOM
Instead of constantly having to work with the real DOM, which is very expensive, everything is handled virtually until we absolutely need to update the DOM.

#### JSX 
It is officially an XML-like syntax that is close to HTML, but not quite HTML. It is actually JavaScript with HTML sprinkled in.

Example

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
