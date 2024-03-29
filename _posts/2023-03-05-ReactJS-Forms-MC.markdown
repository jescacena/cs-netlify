---
layout: main-content-post
title:  ReactJS Forms
date:   2020-01-28T17:06:57.842Z
permalink: /reactjs-forms/main-content/
icon: https://codersnack.com/assets/images/logo-reactjs.png
categories: [snack-main-content-post]
---

*HTML form elements work a little bit differently from other DOM elements in React,* because **form elements naturally keep some internal state**. For example, this form in plain HTML accepts a single name:
```
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```
This form has the default HTML form behavior of browsing to a new page when the user submits the form. If you want this behavior in React, it just works. But in most cases,*it’s convenient to have a JavaScript function that handles the submission of the form and has access to the data that the user entered into the form*. The standard way to achieve this is with a technique called **"controlled components"**.

#### Controlled Components
In HTML, form elements such as `<input>` , `<textarea>` , and `<select>`  typically maintain their own state and update it based on user input. *In React, mutable state is typically kept in the state property of components, and only updated with setState()*.

We can combine the two by making the React state be the "single source of truth". Then the **React component that renders a form also controls what happens in that form on subsequent user input.An input form element whose value is controlled by React in this way is called a "controlled component"**.

For example, if we want to make the previous example log the name when it is submitted, we can write the form as a controlled component:

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Since the *value* attribute is set on our form element, the displayed value will always be *this.state.value*, making the **React state the source of truth**. Since *handleChange* runs on every keystroke to update the React state, the displayed *value* will update as the user types.

With a controlled component, every state mutation will have an associated handler function. This makes it straightforward to modify or validate user input. For example, if we wanted to enforce that names are written with all uppercase letters, we could write handleChange as:
```
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

#### Uncontrolled Components
In most cases, we recommend using controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is **uncontrolled components, where form data is handled by the DOM itself**.

To write an uncontrolled component, **instead of writing an event handler for every state update, you can use a *ref* to get form values from the DOM**.

For example, this code accepts a single name in an uncontrolled component:

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
Since an **uncontrolled component keeps the source of truth in the DOM**, it is sometimes easier to integrate React and non-React code when using uncontrolled components. It can also be slightly less code if you want to be quick and dirty. Otherwise, you should usually use controlled components.