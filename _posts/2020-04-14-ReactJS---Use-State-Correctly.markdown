---
layout: post
title:  ReactJS - Use State Correctly
date:   2020-03-16T15:36:26.199Z
permalink: /reactjs-use-state-correctly/
categories: [snackpost]
---
There are three things you should know about setState().

### Do Not Modify State Directly
For example, this will not re-render a component:
```
// Wrong
this.state.comment = 'Hello';
```
Instead, use setState():
```
// Correct
this.setState({comment: 'Hello'});
```

**The only place where you can assign this.state is the constructor**.

### State Updates May Be Asynchronous
**React may batch multiple ```setState()``` calls into a single update for performance**.
Because ```this.props``` and ```this.state``` may be updated asynchronously, you should not rely on their values for calculating the next state.

For example, this code may fail to update the counter:
```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
To fix it, use a second form of ```setState()``` that accepts a function rather than an object. **That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument**:
```
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
We used an arrow function above, but it also works with regular functions:
```
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```
### State Updates are Merged
When you call ```setState()```, React merges the object you provide into the current state.
For example, your state may contain several independent variables:
```
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```
Then you can update them independently with separate ```setState()``` calls:
```
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
The merging is shallow, so this.setState({comments}) leaves this.state.posts intact, but completely replaces this.state.comments.



### - References -

- [ReactJS - Adding lifecycle methods to a class](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class)
