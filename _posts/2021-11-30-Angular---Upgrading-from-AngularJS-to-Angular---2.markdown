---
layout: post
title:  Angular - Upgrading from AngularJS to Angular - 2
date:   2021-11-10T11:41:58.626Z
permalink: /angular-upgrade-from-angularjs-2/
icon: https://codersnack.com/assets/images/angularjs-to-angular.png
categories: [snackpost]
---

> Information drawn from 
- [Angular.io - Upgrading from AngularJS to Angular](https://angular.io/guide/upgrade)


## Upgrading with *ngUpgrade*

**The ngUpgrade library in Angular is a very useful tool for upgrading** anything but the smallest of applications. With it **you can mix and match AngularJS and Angular components in the same application and have them interoperate seamlessly**. That means **you don't have to do the upgrade work all at once**, since there is a natural coexistence between the two frameworks during the transition period.

> The end of life of AngularJS is December 31st, 2021. With this event, ngUpgrade is now in a feature complete state. We will continue publishing security and bug fixes for ngUpgrade at least until December 31st, 2022.


### How ngUpgrade Works

**One of the primary tools provided by ngUpgrade is called the *UpgradeModule***. This is a module that contains utilities for **bootstrapping and managing hybrid applications** that support both Angular and AngularJS code.

When you use ngUpgrade, what you're really doing is **running both AngularJS and Angular at the same time**. All Angular code is running in the Angular framework, and AngularJS code in the AngularJS framework. Both of these are the actual, fully featured versions of the frameworks. **There is no emulation going on, so you can expect to have all the features and natural behavior of both frameworks**.

What happens **on top of this is that components and services managed by one framework can interoperate with those from the other framework**. This happens in *three main areas: Dependency injection, the DOM, and change detection*.


#### Dependency Injection

Dependency injection is front and center in both AngularJS and Angular, but there are some **key differences between the two frameworks** in how it actually works.

![angularjs-to-angular-di-compare](https://codersnack.com/assets/images/angularjs-to-angular-di-compare.png)

Even accounting for these differences you can still have dependency injection interoperability. ***upgrade/static* resolves the differences** and makes everything work seamlessly:

- **You can make AngularJS services available for injection to Angular code by upgrading them**. The same singleton instance of each service is shared between the frameworks. In Angular these services will always be in the root injector and available to all components.

- **You can also make Angular services available for injection to AngularJS code by downgrading them**. Only services from the Angular root injector can be downgraded. Again, the same singleton instances are shared between the frameworks. When you register a downgraded service, you must explicitly specify a string token that you want to use in AngularJS.

![The two injectors in a hybrid application](https://codersnack.com/assets/images/angularjs-to-angular-injectors.png)


### Components and the DOM

**In the DOM of a hybrid ngUpgrade application are components and directives from both AngularJS and Angular**. These components communicate with each other by using the input and output bindings of their respective frameworks, which *ngUpgrade bridges together*. They may also *communicate through shared injected dependencies*, as described above.

**The key thing to understand about a hybrid application is that every element in the DOM is owned by exactly one of the two frameworks**. The other framework ignores it. If an element is owned by AngularJS, Angular treats it as if it didn't exist, and vice versa.

**So normally a hybrid application begins life as an AngularJS application, and it is AngularJS that processes the root template, for example, the index.html. Angular then steps into the picture when an Angular component is used somewhere in an AngularJS template**. The template of that component will then be managed by Angular, and it may contain any number of Angular components and directives.

Beyond that, you may interleave the two frameworks. You always **cross the boundary between the two frameworks by one of two ways**:

- By **using a component from the other framework**: An AngularJS template using an Angular component, or an Angular template using an AngularJS component.

- By **transcluding or projecting content from the other framework**. ngUpgrade bridges the related concepts of AngularJS transclusion and Angular content projection together.


![DOM element ownership in a hybrid application](https://codersnack.com/assets/images/angularjs-to-angular-dom.png)

Whenever you use a component that belongs to the other framework, a switch between framework boundaries occurs. However, that **switch only happens to the elements in the template of that component**. 

Consider a situation where you use an Angular component from AngularJS like this:

```
<a-component></a-component>
```

The DOM element ```<a-component>```  will remain to be an **AngularJS managed element**, because it is defined in an AngularJS template. That also means you can apply additional AngularJS directives to it, but not Angular directives. It is only in the template of the ```<a-component>``` where Angular steps in. This same rule also applies when you use AngularJS component directives from Angular.

### Change Detection

The **scope.$apply()** is how **AngularJS detects changes and updates data bindings**. After every event that occurs, scope.$apply() gets called. This is done either **automatically** by the framework, or **manually by you**.

**In Angular things are different**. While change detection still occurs after every event, no one needs to call scope.$apply() for that to happen. This is because **all Angular code runs inside something called the Angular zone**. Angular always knows when the code finishes, so it also knows when it should kick off change detection. The code itself doesn't have to call scope.$apply() or anything like it.

In the case of hybrid applications, the ***UpgradeModule* bridges the AngularJS and Angular approaches**. Here is what happens:

- **Everything that happens in the application runs inside the Angular zone. This is true whether the event originated in AngularJS or Angular code**. The zone triggers Angular change detection after every event.

- The **UpgradeModule will invoke** the AngularJS **$rootScope.$apply()** after every turn of the Angular zone. This also triggers AngularJS change detection after every event.


![Change detection in a hybrid application](https://codersnack.com/assets/images/angularjs-to-angular-change_detection.png)


In practice, you do not need to call $apply(), regardless of whether it is in AngularJS or Angular. The UpgradeModule does it for us.**You can still call $apply() so there is no need to remove such calls from existing code**. Those calls just trigger additional AngularJS change detection checks in a hybrid application.

**When you downgrade an Angular component and then use it from AngularJS, the inputs of the component will be watched using AngularJS change detection**. When those inputs change, the corresponding properties in the component are set. You can also hook into the changes by implementing the OnChanges interface in the component, just like you could if it hadn't been downgraded.

Correspondingly, **when you upgrade an AngularJS component and use it from Angular, all the bindings defined for scope (or bindToController) of the component directive will be hooked into Angular change detection**. They will be treated as regular Angular inputs. Their values will be written to the scope (or controller) of the upgraded component when they change.

### Using UpgradeModule with Angular NgModules

Both AngularJS and Angular have their own concept of modules to help organize an application into cohesive blocks of functionality.

Their details are quite different in architecture and implementation. **In AngularJS, you add Angular assets to the angular.module property. In Angular, you create one or more classes adorned with an NgModule decorator that describes Angular assets in metadata**. The differences blossom from there.

In a hybrid application you run both versions of Angular at the same time. That means that you need at least one module each from both AngularJS and Angular. You will import UpgradeModule inside the NgModule, and then use it for bootstrapping the AngularJS module.

For more information, see NgModules.

### Bootstrapping hybrid applications

To bootstrap a hybrid application, you must bootstrap each of the Angular and AngularJS parts of the application. **You must bootstrap the Angular bits first and then ask the UpgradeModule to bootstrap the AngularJS bits next**.

In an AngularJS application you have a root AngularJS module, which will also be used to bootstrap the AngularJS application.

*app.module.ts*

```
angular.module('heroApp', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world';
  });
```

**Pure AngularJS applications can be automatically bootstrapped by using an *ng-app* directive somewhere on the HTML page. But for hybrid applications, you manually bootstrap using the *UpgradeModule***. Therefore, it is a **good preliminary step to switch AngularJS applications to use the manual JavaScript *angular.bootstrap* method even before switching them to hybrid mode.**

Say you have an ng-app driven bootstrap such as this one:

```html

<!DOCTYPE HTML>
<html lang="en">
  <head>
    <base href="/">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.js"></script>
    <script src="app/ajs-ng-app/app.module.js"></script>
  </head>

  <body ng-app="heroApp" ng-strict-di>
    <div id="message" ng-controller="MainCtrl as mainCtrl">
      {{ mainCtrl.message }}
    </div>
  </body>
</html>

```


**You can remove the ng-app and ng-strict-di directives from the HTML and instead switch to calling angular.bootstrap from JavaScript**, which will result in the same thing:

*app.module.ts*

```
angular.bootstrap(document.body, ['heroApp'], { strictDi: true });
```
**To begin converting your AngularJS application to a hybrid, you need to load the Angular framework**. You can see how this can be done with SystemJS by following the instructions in Setup for Upgrading to AngularJS for selectively copying code from the QuickStart github repository.

You also need to **install the @angular/upgrade package** using

```
npm install @angular/upgrade --save
```

 and **add a mapping for the @angular/upgrade/static package**:

*systemjs.config.js (map)*

```
'@angular/upgrade/static': 'npm:@angular/upgrade/fesm2015/static.mjs',
```

Next, **create an app.module.ts** file and add the following NgModule class:

*app.module.ts*

```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['heroApp'], { strictDi: true });
  }
}
```

This bare minimum NgModule imports BrowserModule, the module every Angular browser-based application must have. It also imports UpgradeModule from @angular/upgrade/static, which exports providers that will be used for upgrading and downgrading services and components.

In the constructor of the AppModule, use dependency injection to **get a hold of the UpgradeModule instance, and use it to bootstrap the AngularJS application in the AppModule.ngDoBootstrap method**. The upgrade.bootstrap method takes the exact same arguments as angular.bootstrap:

> NOTE: You do not add a bootstrap declaration to the @NgModule decorator, since **AngularJS will own the root template of the application**.

Now you can **bootstrap AppModule using the *platformBrowserDynamic.bootstrapModule* method.**

*app.module.ts*

```
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule);
```


Congratulations! You're running a hybrid application! The existing AngularJS code works as before and you're ready to start adding Angular code.


