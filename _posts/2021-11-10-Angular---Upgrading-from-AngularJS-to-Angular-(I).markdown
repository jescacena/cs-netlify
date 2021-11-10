---
layout: post
title:  Angular - Upgrading from AngularJS to Angular (I)
date:   2021-11-08T21:46:15.611Z
permalink: /angular-upgrade-from-angularjs/
icon: https://codersnack.com/assets/images/angularjs-to-angular.png
categories: [snackpost]
---

> Information drawn from 
- [Angular.io - Upgrading from AngularJS to Angular](https://angular.io/guide/upgrade)

**Angular** is the name for the Angular of today and tomorrow.

**AngularJS** is the name for **all 1.x versions of Angular**.

AngularJS applications are great. Always consider the business case before moving to Angular. An important part of that case is the time and effort to get there. This guide describes the **built-in tools for efficiently migrating AngularJS projects over to the Angular platform**, a piece at a time.

Some applications will be easier to upgrade than others, and there are many ways to make it easier for yourself. **It is possible to prepare and align AngularJS applications with Angular even before beginning the upgrade process**. **These preparation steps are all about making the code more decoupled, more maintainable, and better aligned with modern development tools**. That means in addition to making the upgrade easier, **you will also improve the existing AngularJS applications**.

**One of the keys to a successful upgrade is to do it incrementally, by running the two frameworks side by side in the same application, and porting AngularJS components to Angular one by one**. This makes it possible to upgrade even large and complex applications without disrupting other business, because the work can be done collaboratively and spread over a period of time. **The upgrade module in Angular has been designed to make incremental upgrading seamless**.

## Preparation

There are many ways to structure AngularJS applications. When you begin to upgrade these applications to Angular, some will turn out to be much more easy to work with than others. **There are a few key techniques and patterns that you can apply to future proof applications even before you begin the migration**.


### Follow the AngularJS Style Guide

**The [*AngularJS* Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) collects patterns and practices that have been proven to result in cleaner and more maintainable AngularJS applications**. It contains a wealth of information about how to write and organize AngularJS code —and equally importantly— how not to write and organize AngularJS code.

Angular is a reimagined version of the best parts of AngularJS. In that sense, its goals are the same as the Style Guide for AngularJS: To preserve the good parts of AngularJS, and to avoid the bad parts. There is a lot more to Angular than that of course, but this does mean that following **the style guide helps make your AngularJS application more closely aligned with Angular.**

There are a few **rules in particular that will make it much easier to do an incremental upgrade** using the Angular **upgrade/static module**:

- **The Rule of 1 states that there should be [one component per file](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#single-responsibility)**. This not only makes components easy to navigate and find, but will also allow us to migrate them between languages and frameworks one at a time. In this example application, each controller, component, service, and filter is in its own source file.

- The [**Folders-by-Feature Structure**](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#folders-by-feature-structure) and [**Modularity**](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#modularity) rules define similar principles on a higher level of abstraction: Different parts of the application should reside in different directories and NgModules.

**When an application is laid out feature per feature in this way, it can also be migrated one feature at a time**. For applications that don't already look like this, applying the rules in the AngularJS style guide is a **highly recommended preparation step**. And this is not just for the sake of the upgrade - it is just solid advice in general!


### Using a Module Loader

When you break application code down into one component per file, you often end up with **a project structure with a large number of relatively small files**. This is a much neater way to organize things than a small number of large files, but it doesn't work that well **if you have to load all those files to the HTML page with `<script>`  tags. Especially when you also have to maintain those tags in the correct order**. That is why it is a good idea to start **using a module loader**.

**Using a module loader such as SystemJS, Webpack, or Browserify allows us to use the built-in module systems of TypeScript or ES2015.**  You can use the import and export features that explicitly specify what code can and will be shared between different parts of the application. For **ES5 applications you can use CommonJS style require and module.exports features**. In both cases, the module loader will then take care of loading all the code the application needs in the correct order.

**When moving applications into production, module loaders also make it easier to package them all up into production** bundles with batteries included.


### Migrating to TypeScript

If part of the Angular upgrade plan is to also take TypeScript into use, it makes sense to bring in the TypeScript compiler even before the upgrade itself begins. This means there is one less thing to learn and think about during the actual upgrade. It also means you can start using TypeScript features in your AngularJS code.

Since TypeScript is a superset of ECMAScript 2015, which in turn is a superset of ECMAScript 5, **"switching" to TypeScript doesn't necessarily require anything more than installing the TypeScript compiler and renaming files from *.js to *.ts.** But just doing that is not hugely useful or exciting, of course. Additional steps like the following can give us much more bang for the buck:

- **For applications that use a module loader**, TypeScript imports and exports (which are really ECMAScript 2015 imports and exports) can be used to **organize code into modules**.
- **Type annotations can be gradually added to existing functions and variables** to pin down their types and get benefits like build-time error checking, great autocompletion support and inline documentation.
- **JavaScript features new to ES2015**, like arrow functions, lets and consts, default function parameters, and destructuring assignments can also be gradually added to make the **code more expressive**.
- **Services and controllers can be turned into classes**. That way they'll be a step closer to becoming Angular service and component classes, which will make life easier after the upgrade.

### Using Component Directives

In Angular, components are the main primitive from which user interfaces are built. You define the different portions of the UI as components and compose them into a full user experience.

You can also do this in AngularJS, using component directives. These are directives that define their own templates, controllers, and input/output bindings - the same things that Angular components define. **Applications built with component directives are much easier to migrate to Angular than applications built with lower-level features like ng-controller, ng-include, and scope inheritance**.

**To be Angular compatible, an AngularJS component directive should configure these attributes:**

- **restrict**: 'E' Components are usually used as elements.

- **scope**: {} - an isolate scope. In Angular, components are always isolated from their surroundings, and you should do this in AngularJS too.

- **bindToController**: {}. Component inputs and outputs should be bound to the controller instead of using the $scope.

- controller and **controllerAs**. Components have their own controllers.

- **template** or templateUrl. Components have their own templates.

**Component directives** may also use the following attributes:

- **transclude: true/{}**, if the component needs to transclude content from elsewhere.
- **require**, if the component needs to communicate with the controller of some parent component.

Component directives should **not use the following attributes**:

- **compile**. This will not be supported in Angular.

- **replace**: true. Angular never replaces a component element with the component template. This attribute is also **deprecated** in AngularJS.

- **priority and terminal**. While AngularJS components may use these, they are not used in Angular and it is better not to write code that relies on them.

An AngularJS component directive that is fully aligned with the Angular architecture may look something like this:

*hero-detail.directive.ts*
```
export function heroDetailDirective() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      hero: '=',
      deleted: '&'
    },
    template: `
      <h2>{{$ctrl.hero.name}} details!</h2>
      <div><label>id: </label>{{$ctrl.hero.id}}</div>
      <button ng-click="$ctrl.onDelete()">Delete</button>
    `,
    controller: function HeroDetailController() {
      this.onDelete = () => {
        this.deleted({hero: this.hero});
      };
    },
    controllerAs: '$ctrl'
  };
}
```

**AngularJS 1.5 introduces the component API that makes it easier to define component directives like these**. It is a good idea to use this API for component directives for several reasons:

- It requires less boilerplate code.
- It enforces the use of component best practices like controllerAs.
- It has good default values for directive attributes like scope and restrict.


The component directive example from above looks like this when expressed **using the component API**:

*hero-detail.component.ts*
```
export const heroDetail = {
  bindings: {
    hero: '<',
    deleted: '&'
  },
  template: `
    <h2>{{$ctrl.hero.name}} details!</h2>
    <div><label>id: </label>{{$ctrl.hero.id}}</div>
    <button ng-click="$ctrl.onDelete()">Delete</button>
  `,
  controller: function HeroDetailController() {
    this.onDelete = () => {
      this.deleted(this.hero);
    };
  }
};
```

**Controller lifecycle hook methods *$onInit(), $onDestroy()*, and *$onChanges()* are another convenient feature that AngularJS 1.5 introduces**. They all have nearly exact **equivalents in Angular**, so organizing component lifecycle logic around them will ease the eventual Angular upgrade proces
