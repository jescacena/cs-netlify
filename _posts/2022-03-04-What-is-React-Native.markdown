---
layout: post
title:  What is React Native?
date:   2020-06-23T12:44:31.271Z
permalink: /react-native-what-is/
icon: https://codersnack.com/assets/images/react-native-icon.png
categories: [snackpost]
---

> Information drawn from 
- [reactnative.dev](https://reactnative.dev/)

## Create native apps for Android and iOS using React
React Native **combines the best parts of native development with React**, a best-in-class JavaScript library for building user interfaces.

**Use a little or a lot**. You can use React Native today in your existing Android and iOS projects or you can create a whole new app from scratch.

## Written in JavaScript; rendered with native code
React primitives render to native platform UI, meaning **your app uses the same native platform APIs other apps do**.

**Many platforms, one React**. Create platform-specific versions of components so a single codebase can share code across platforms. With React Native, **one team can maintain two platforms and share a common technology: React.**

## Native Development For Everyone
React Native lets you create truly native apps and doesn't compromise on your users' experience. It **provides a core set of platform agnostic native components** like View, Text, and Image that map directly to the platform’s native UI building blocks.

## Seamless Cross-Platform
**React components wrap existing native code and interact with native APIs via React’s declarative UI paradigm and JavaScript**. This enables native app development for whole new teams of developers, and can let existing native teams work much faster.

## Prerequisites
To work with React Native, you will need to have an **understanding of JavaScript fundamentals**. If you’re new to JavaScript or need a refresher, you can dive in or brush up at Mozilla Developer Network.

> While we do our best to assume no prior knowledge of React, Android, or iOS development, these are valuable topics of study for the aspiring React Native developer. Where sensible, we have linked to resources and articles that go more in depth.

## Core Components and Native Components
**React Native is an open source framework for building Android and iOS applications using React** and the app platform’s native capabilities. With React Native, you use JavaScript to access your platform’s APIs as well as to describe the appearance and behavior of your UI using React components: bundles of reusable, nestable code. You can learn more about React in the next section. But first, let’s cover how components work in React Native.

### Views and mobile development
In Android and iOS development, a **view is the basic building block of UI**: a small rectangular element on the screen which can be used to display text, images, or respond to user input. Even the smallest visual elements of an app, like a line of text or a button, are kinds of views. Some kinds of views can contain other views. It’s views all the way down!

### Native Components
**In Android development, you write views in Kotlin or Java; in iOS development, you use Swift or Objective-C. With React Native, you can invoke these views with JavaScript using React components**. At runtime, React Native creates the corresponding Android and iOS views for those components. Because React Native components are backed by the same views as Android and iOS, React Native apps look, feel, and perform like any other apps. We call these platform-backed components Native Components.

React Native lets you to build your own Native Components for Android and iOS to suit your app’s unique needs. We also have a thriving **ecosystem of these community-contributed components**. Check out Native Directory to find what the community has been creating.

**React Native also includes a set of essential, ready-to-use Native Components you can use to start building your app today**. These are React Native's Core Components.

### Core Components
React Native has many Core Components for everything from form controls to activity indicators. You can find them all documented in the API section. You will mostly work with the following Core Components:

```
REACT NATIVE / UI COMPONENT / ANDROID VIEW / IOS VIEW /	WEB ANALOG / DESCRIPTION

<View> / <ViewGroup> / <UIView> / A non-scrollling <div> / A container that supports layout with flexbox, style, some touch handling, and accessibility controls

<Text> / <TextView> / <UITextView> / <p> / Displays, styles, and nests strings of text and even handles touch events

<Image> / <ImageView> / <UIImageView> / <img> / Displays different types of images

<ScrollView> / <ScrollView> / <UIScrollView> / <div> / A generic scrolling container that can contain multiple components and views

<TextInput> / <EditText> / <UITextField> / <input type="text"> / Allows the user to enter text
```

Because React Native uses the same API structure as React components, you’ll need to understand React component APIs to get started. 


## JavaScript Environment


### JavaScript Runtime

When using React Native, you're going to be running your JavaScript code in two environments:

- In most cases, React Native will use **JavaScriptCore**, the *JavaScript engine* that powers Safari. 
> Note that on iOS, JavaScriptCore does not use JIT due to the absence of writable executable memory in iOS apps.

- **When using Chrome debugging, all JavaScript code runs within Chrome itself**, communicating with native code via *WebSockets*. Chrome uses V8 as its JavaScript engine.

While both environments are very similar, you may end up hitting some inconsistencies. We're likely going to experiment with other JavaScript engines in the future, so it's best to avoid relying on specifics of any runtime.

### JavaScript Syntax Transformers
Syntax transformers make **writing code more enjoyable** by allowing you to use new JavaScript syntax without having to wait for support on all interpreters.

**React Native ships with the Babel JavaScript compiler**. Check Babel documentation on its supported transformations for more details.

A full list of React Native's enabled transformations can be found in *metro-react-native-babel-preset.*

**ES5**

- Reserved Words: ```promise.catch(function() { });```

**ES6**

- Arrow functions: ```<C onPress={() => this.setState({pressed: true})} />```
- Block scoping: ```let greeting = 'hi';```
- Call spread: ```Math.max(...array);```
- Classes: ```class C extends React.Component { render() { return <View />; } }```
- Constants: ```const answer = 42;```
- Destructuring: ```var {isActive, style} = this.props;```
- for...of: ```for (var num of [1, 2, 3]) {};```
- Modules: ```import React, { Component } from 'react';```
- Computed Properties: ```var key = 'abc'; var obj = {[key]: 10};```
- Object Concise Method: ```var obj = { method() { return 10; } };```
- Object Short Notation: ```var name = 'vjeux'; var obj = { name };```
- Rest Params: ```function(type, ...args) {};```
- Template Literals: ```var who = 'world'; var str = `Hello ${who}`;```

**ES8**

- Function Trailing Comma: ```function f(a, b, c,) {};```
- Async Functions: ```async function doStuffAsync() { const foo = await doOtherStuffAsync(); };```

**Stage 3**

- Object Spread: ```var extended = { ...obj, a: 10 };```
- Static class fields: ```class CustomDate { static epoch = new CustomDate(0); }```
- Optional Chaining: ```var name = obj.user?.name;```

**Specific**

- JSX: ``` <View style = \{\{ color: "red" \}\}  /> ``` 
- Flow: ``` function foo(x: ?number): string {}; ```
- TypeScript: ```function foo(x: number | undefined): string {};```
- Babel Template: allows AST templating

### Polyfills

Many standards functions are also available on all the supported JavaScript runtimes.

**Browser**

- console.{log, warn, error, info, trace, table, group, groupEnd}
- CommonJS require
- XMLHttpRequest, fetch
- {set, clear}{Timeout, Interval, Immediate}, {request, cancel}AnimationFrame

**ES6**

- Object.assign
- String.prototype.{startsWith, endsWith, repeat, includes}
- Array.from
- Array.prototype.{find, findIndex}

**ES7**

- Array.prototype.{includes}

**ES8**

- Object.{entries, values}

**Specific**

- __DEV__
