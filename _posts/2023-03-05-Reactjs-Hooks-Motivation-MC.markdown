---
layout: main-content-post
title:  Reactjs Hooks Motivation
date:   2020-03-10T21:09:33.161Z
permalink: /reactjs-hooks-overview/main-content/
icon: https://codersnack.com/assets/images/logo-reactjs.png
categories: [snack-main-content-post]
---

### Motivation

Hooks are a new addition in React 16.8. They **let you use state and other React features without writing a class**.


Hooks solve a wide variety of seemingly unconnected problems in React that we’ve encountered over five years of writing and maintaining tens of thousands of components. Whether you’re learning React, use it daily, or even prefer a different library with a similar component model, you might recognize some of these problems.

#### It's hard to reuse stateful logic between components
**React doesn't offer a way to "attach" reusable behavior to a component (for example, connecting it to a store)**. If you've worked with React for a while, you may be familiar with patterns like render props and higher-order components that try to solve this. But these patterns require you to restructure your components when you use them, which can be cumbersome and make code harder to follow. If you look at a typical React application in React DevTools, you will likely find a **"wrapper hell"** of components surrounded by layers of providers, consumers, higher-order components, render props, and other abstractions. While we could filter them out in DevTools, this points to a deeper underlying problem: React needs a better primitive for sharing stateful logic.

With Hooks, you can extract stateful logic from a component so it can be tested independently and reused. **Hooks allow you to reuse stateful logic without changing your component hierarchy**. This makes it easy to share Hooks among many components or with the community. More info google for "Custom hooks"

#### Complex components become hard to understand
**We’ve often had to maintain components that started out simple but grew into an unmanageable mess of stateful logic and side effects**. Each lifecycle method often contains a mix of unrelated logic. For example, components might perform some data fetching in componentDidMount and componentDidUpdate. However, the same componentDidMount method might also contain some unrelated logic that sets up event listeners, with cleanup performed in componentWillUnmount. Mutually related code that changes together gets split apart, but completely unrelated code ends up combined in a single method. This makes it too easy to introduce bugs and inconsistencies.

In many cases **it's not possible to break these components into smaller ones** because the stateful logic is all over the place. It’s also difficult to test them. This is one of the reasons many people prefer to combine React with a separate state management library. However, that often introduces too much abstraction, requires you to jump between different files, and makes reusing components more difficult.

To solve this, Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data), rather than forcing a split based on lifecycle methods. You may also opt into managing the component's local state with a reducer to make it more predictable.

More in Using the Effect Hook.

#### Classes confuse both people and machines
In addition to making code reuse and code organization more difficult, we’ve found that **classes can be a large barrier to learning React**. You have to understand how this works in JavaScript, which is very different from how it works in most languages. You have to remember to bind the event handlers. Without unstable syntax proposals, the code is very verbose. People can understand props, state, and top-down data flow perfectly well but still struggle with classes. The distinction between function and class components in React and when to use each one leads to disagreements even between experienced React developers.

Additionally, React has been out for about five years, and we want to make sure it stays relevant in the next five years. As Svelte, Angular, Glimmer, and others show, ahead-of-time compilation of components has a lot of future potential. Especially if it’s not limited to templates. Recently, we’ve been experimenting with component folding using Prepack, and we've seen promising early results. However, **we found that class components can encourage unintentional patterns that make these optimizations fall back to a slower path**. Classes present issues for today's tools, too. **For example, classes don’t minify very well, and they make hot reloading flaky and unreliable**. We want to present an API that makes it more likely for code to stay on the optimizable path.

To solve these problems, Hooks let you use more of React's features without classes. Conceptually, React components have always been closer to functions. Hooks embrace functions, but without sacrificing the practical spirit of React. Hooks provide access to imperative escape hatches and don’t require you to learn complex functional or reactive programming techniques.

#### Gradual Adoption Strategy
> TLDR: There are no plans to remove classes from React.

We know that React developers are focused on shipping products and don't have time to look into every new API that's being released. Hooks are very new, and it might be better to wait for more examples and tutorials before considering learning or adopting them.

Crucially, **Hooks work side-by-side with existing code** so you can adopt them gradually.








