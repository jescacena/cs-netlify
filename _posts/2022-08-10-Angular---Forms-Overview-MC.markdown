---
layout: main-content-post
title:  Angular - Forms Overview
date:   2021-04-11T17:03:51.107Z
permalink: /angular-forms-overview/main-content/
icon: https://codersnack.com/assets/images/angular-icon.png
categories: [snack-main-content-post]
---

Angular provides **two different approaches** to handling user input through forms: **reactive and template-driven**. Both capture user input events from the view, validate the user input, create a form model and data model to update, and provide a way to track changes.

This guide provides information to help you decide which type of form works best for your situation. It introduces the common building blocks used by both approaches. It also summarizes the key differences between the two approaches, and demonstrates those differences in the context of setup, data flow, and testing.


### Choosing an approach

Reactive forms and template-driven forms **process and manage form data differently**. Each approach offers different advantages.

**Reactive forms provide direct, explicit access to the underlying forms object model**. Compared to template-driven forms, they are more robust: they're more scalable, reusable, and testable. If forms are a key part of your application, or you're already using reactive patterns for building your application, use reactive forms.

**Template-driven forms rely on directives in the template to create and manipulate the underlying object model**. They are useful for adding a simple form to an app, such as an email list signup form. They're easy to add to an app, but they don't scale as well as reactive forms. If you have very basic form requirements and logic that can be managed solely in the template, template-driven forms could be a good fit.

### Key differences
The table below summarizes the key differences between reactive and template-driven forms.

- Setup of form model: REACTIVE: Explicit, created in component class	TEMPLATE-DRIVEN: Implicit, created by directives
- Data model:	 REACTIVE: Structured and immutable	TEMPLATE-DRIVEN: Unstructured and mutable
- Predictability: REACTIVE: 	Synchronous	TEMPLATE-DRIVEN:  Asynchronous
- Form validations: REACTIVE:  Functions	TEMPLATE-DRIVEN:  Directives

### Scalability
If forms are a central part of your application, scalability is very important. Being able to reuse form models across components is critical.

Reactive forms are more scalable than template-driven forms. They provide direct access to the underlying form API, and synchronous access to the form data model, making creating large-scale forms easier. Reactive forms require less setup for testing, and testing does not require deep understanding of change detection to properly test form updates and validation.

Template-driven forms focus on simple scenarios and are not as reusable. They abstract away the underlying form API, and provide only asynchronous access to the form data model. The abstraction of template-driven forms also affects testing. Tests are deeply reliant on manual change detection execution to run properly, and require more setup.

### Setting up the form model
Both reactive and template-driven forms track value changes between the form input elements that users interact with and the form data in your component model. The two approaches share underlying building blocks, but differ in how you create and manage the common form-control instances.

#### Common form foundation classes
Both reactive and template-driven forms are built on the following base classes.

- **FormControl** tracks the value and validation status of an individual form control.

- **FormGroup** tracks the same values and status for a collection of form controls.

- **FormArray** tracks the same values and status for an array of form controls.

- **ControlValueAccessor** creates a **bridge between Angular FormControl instances and native DOM elements**.

#### Setup in reactive forms
With reactive forms, you define the form model directly in the component class. The ```[formControl]``` directive links the explicitly created **FormControl** instance to a specific form element in the view, using an internal value accessor.

The following component implements an input field for a single control, using reactive forms. In this example, the form model is the FormControl instance.

```
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-favorite-color',
  template: `
    Favorite Color: <input type="text" [formControl]="favoriteColorControl">
  `
})
export class FavoriteColorComponent {
  favoriteColorControl = new FormControl('');
}
```

Figure 1 shows how, in reactive forms, the form model is the source of truth; it provides the value and status of the form element at any given point in time, through the ```[formControl]``` directive on the input element.

Figure 1. Direct access to forms model in a reactive form.
![angular reative forms form model](https://codersnack.com/assets/images/angular-reactive-forms-form-model.png)

#### Setup in template-driven forms
In template-driven forms, the form model is implicit, rather than explicit. The directive **NgModel** creates and manages a **FormControl** instance for a given form element.

The following component implements the same input field for a single control, using template-driven forms.

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-template-favorite-color',
  template: `
    Favorite Color: <input type="text" [(ngModel)]="favoriteColor">
  `
})
export class FavoriteColorComponent {
  favoriteColor = '';
}
```
![angular template driven forms form model](https://codersnack.com/assets/images/angular-template-driven-forms-form-model.png)


