---
layout: post
title:  Angular Data Biding and Pipes and Directives
date:   2020-06-16T21:03:05.124Z
permalink: /angular-data-binding-pipes-directives/
icon: https://codersnack.com/assets/images/angular-icon.png
categories: [snackpost]
---

> Information drawn from 
- [Angular.io Architecture Components](https://angular.io/guide/architecture-components)

## Data binding

**Without a framework, you would be responsible for pushing data values into the HTML controls** and turning user responses into actions and value updates. Writing such push and pull logic by hand is tedious, error-prone, and a nightmare to read, as any experienced front-end JavaScript programmer can attest.

**Angular supports two-way data binding**, a mechanism for coordinating the parts of a template with the parts of a component. Add binding markup to the template HTML to tell Angular how to connect both sides.

The following diagram shows the four forms of data binding markup. Each form has a direction: to the DOM, from the DOM, or both.

![angular databinding](https://codersnack.com/assets/images/angular-databinding.png)

This example from the HeroListComponent template uses three of these forms.

*src/app/hero-list.component.html (binding)*
```
<li>{{hero.name}}</li>
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
<li (click)="selectHero(hero)"></li>
```

The ``` {{hero.name}} ``` interpolation displays the component's *hero.name* property value within the ``` <li> ``` element.

The ```[hero]``` property binding passes the value of *selectedHero* from the parent *HeroListComponent* to the *hero* property of the child *HeroDetailComponent*.

The ```(click)``` event binding calls the component's *selectHero* method when the user clicks a hero's name.

**Two-way data binding (used mainly in template-driven forms) combines property and event binding in a single notation**. Here's an example from the *HeroDetailComponent* template that uses two-way data binding with the *ngModel directive*.

*src/app/hero-detail.component.html (ngModel)*
```
<input [(ngModel)]="hero.name">
```
In two-way binding, a data property value flows to the input box from the component as with property binding. The user's changes also flow back to the component, resetting the property to the latest value, as with event binding.

> Angular processes all data bindings once for each JavaScript event cycle, from the root of the application component tree through all child components.


Data binding plays an important role in communication between a template and its component, and is also important for communication between parent and child components.

## Pipes

**Angular pipes let you declare display-value transformations in your template HTML**. A class with the **@Pipe decorator** defines a function that transforms input values to output values for display in a view.

**Angular defines various pipes**, such as the date pipe and currency pipe; for a complete list, see the Pipes API list. You can also define new pipes.

To specify a value transformation in an HTML template, use the **pipe operator (|)**.
```
{{interpolated_value | pipe_name}}
```

**You can chain pipes**, sending the output of one pipe function to be transformed by another pipe function. **A pipe can also take arguments** that control how it performs its transformation. For example, you can pass the desired format to the date pipe.



## Directives

Angular templates are dynamic. **When Angular renders them, it transforms the DOM according to the instructions given by directives**. **A directive is a class with a @Directive() decorator**.

> A component is technically a directive. However, components are so distinctive and central to Angular applications that Angular defines the **@Component()** decorator, which extends the **@Directive()** decorator with template-oriented features.

**In addition to components, there are two other kinds of directives: structural and attribute**. Angular defines a number of directives of both kinds, and you can define your own using the **@Directive()** decorator.

Just as for components, the metadata for a directive associates the decorated class with a selector element that you use to insert it into HTML. In templates, directives typically appear within an element tag as attributes, either by name or as the target of an assignment or a binding.

### Structural directives

**Structural directives alter layout by adding, removing, and replacing elements in the DOM**. The example template uses two built-in structural directives to add application logic to how the view is rendered.

*src/app/hero-list.component.html (structural)*
```
<li *ngFor="let hero of heroes"></li>
<app-hero-detail *ngIf="selectedHero"></app-hero-detail>
```

``` *ngFor ``` is an **iterative**:  it tells Angular to stamp out one ``` <li> ``` per hero in the heroes list.
``` *ngIf ``` is a **conditional**: it includes the *HeroDetail* component only if a selected hero exists.

### Attribute directives

**Attribute directives alter the appearance or behavior of an existing element**. In templates they look like regular HTML attributes, hence the name.

The **ngModel** directive, which implements two-way data binding, is an example of an attribute directive. ngModel modifies the behavior of an existing element (typically ```<input>```) by setting its display value property and responding to change events.

*src/app/hero-detail.component.html (ngModel)*
```
<input [(ngModel)]="hero.name">
```
**Angular has more pre-defined directives** that either alter the layout structure (for example, ngSwitch) or modify aspects of DOM elements and components (for example, ngStyle and ngClass).

