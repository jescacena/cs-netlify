---
layout: post
title:  Angular - Upgrading from AngularJS to Angular - 3
date:   2021-12-16T14:00:57.525Z
permalink: /angular-upgrade-from-angularjs-3/
icon: https://codersnack.com/assets/images/angularjs-to-angular.png
categories: [snackpost]
---

> Information drawn from 
- [Angular.io - Upgrading from AngularJS to Angular](https://angular.io/guide/upgrade)

##  Using Angular Components from AngularJS Code

![angularjs-to-angular-ajs-to-a](https://codersnack.com/assets/images/angularjs-to-angular-ajs-to-a.png)

Once you're running a hybrid app, you can start the gradual process of upgrading code. One of the more common patterns for doing that is to **use an Angular component in an AngularJS context.** This could be a completely new component or one that was previously AngularJS but has been rewritten for Angular.

Say you have an Angular component that shows information about a hero:

*hero-detail.component.ts*
```
import { Component } from '@angular/core';

@Component({
  selector: 'hero-detail',
  template: `
    <h2>Windstorm details!</h2>
    <div><label>id: </label>1</div>
  `
})
export class HeroDetailComponent { }
```
**If you want to use this component from AngularJS, you need to downgrade it using the *downgradeComponent()* method**. The **result is an AngularJS directive**, which you can then register in the AngularJS module:

*app.module.ts*
```
import { HeroDetailComponent } from './hero-detail.component';

/* . . . */

import { downgradeComponent } from '@angular/upgrade/static';

angular.module('heroApp', [])
  .directive(
    'heroDetail',
    downgradeComponent({ component: HeroDetailComponent }) as angular.IDirectiveFactory
  );
```

By default, **Angular change detection** will **also run on the component for every *AngularJS $digest cycle***. **If you want to only have change detection run whenthe inputs change, you can set *propagateDigest to false* when calling downgradeComponent().**

Because **HeroDetailComponent** is an Angular component, you **must also add it to the declarations in the AppModule**.

And because **this component is being used from the AngularJS module, and is an entry point into the Angular application, you must add it to the entryComponents for the NgModule.**

*app.module.ts*
```
import { HeroDetailComponent } from './hero-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  declarations: [
    HeroDetailComponent
  ],
  entryComponents: [
    HeroDetailComponent
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['heroApp'], { strictDi: true });
  }
}
```
All Angular components, directives and pipes must be declared in an NgModule.

The net result is an **AngularJS directive called heroDetail**, that you can use like any other directive in AngularJS templates.

```
<hero-detail></hero-detail>
```
> NOTE: This AngularJS is an element directive (restrict: 'E') called heroDetail. An AngularJS element directive is matched based on its name. The selector metadata of the downgraded Angular component is ignored.

Most components are not quite this simple, of course. **Many of them have inputs and outputs that connect them to the outside world.** An Angular hero detail component with inputs and outputs might look like this:

*hero-detail.component.ts*
```
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'hero-detail',
  template: `
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <button (click)="onDelete()">Delete</button>
  `
})
export class HeroDetailComponent {
  @Input() hero!: Hero;
  @Output() deleted = new EventEmitter<Hero>();
  onDelete() {
    this.deleted.emit(this.hero);
  }
}
```

**These inputs and outputs can be supplied from the AngularJS template, and the downgradeComponent() method takes care of wiring them up**:

```
<div ng-controller="MainController as mainCtrl">
  <hero-detail [hero]="mainCtrl.hero"
               (deleted)="mainCtrl.onDelete($event)">
  </hero-detail>
</div>
```

**Even though you are in an AngularJS template, you are using Angular attribute syntax to bind the inputs and outputs**. This is a requirement for downgraded components. The expressions themselves are still regular AngularJS expressions.

**- USE KEBAB-CASE FOR DOWNGRADED COMPONENT ATTRIBUTES -**
There is one notable exception to the rule of using Angular attribute syntax for downgraded components. It has to do with input or output names that consist of multiple words. In Angular, you would bind these attributes using camelCase:
```
[myHero]="hero"
(heroDeleted)="handleHeroDeleted($event)"
```

But when using them from AngularJS templates, you must use kebab-case:
```
[my-hero]="hero"
(hero-deleted)="handleHeroDeleted($event)"

```
**-- --**

**The *$event* variable can be used in outputs to gain access to the object that was emitted**. In this case it will be the Hero object, because that is what was passed to this.deleted.emit().

Since this is an AngularJS template, **you can still use other AngularJS directives on the element, even though it has Angular binding attributes on it**. For example, you can easily make multiple copies of the component using ng-repeat:

```
<div ng-controller="MainController as mainCtrl">
  <hero-detail [hero]="hero"
               (deleted)="mainCtrl.onDelete($event)"
               ng-repeat="hero in mainCtrl.heroes">
  </hero-detail>
</div>
```


##    Using AngularJS Component Directives from Angular Code

![angularjs-to-angular-a-to-ajs](https://codersnack.com/assets/images/angularjs-to-angular-a-to-ajs.png)

So, **you can write an Angular component and then use it from AngularJS code**. This is **useful when you start to migrate from lower-level components and work your way up**. 

But **in some cases it is more convenient to do things in the opposite order: To start with higher-level components and work your way down**. This too can be done **using the *upgrade/static***. **You can upgrade AngularJS component directives and then use them from Angular.**

**Not all kinds of AngularJS directives can be upgraded**. The directive really has to be a component directive, with the characteristics described in the preparation guide above. **The safest bet for ensuring compatibility is using the component API introduced in AngularJS 1.5**.

An example of an upgradeable component is one that just has a template and a controller:

*hero-detail.component.ts*
```
export const heroDetail = {
  template: `
    <h2>Windstorm details!</h2>
    <div><label>id: </label>1</div>
  `,
  controller: function HeroDetailController() {
  }
};
```

You can upgrade this component to Angular using the UpgradeComponent class. By creating a new Angular directive that extends UpgradeComponent and doing a super call inside its constructor, you have a fully upgraded AngularJS component to be used inside Angular. All that is left is to add it to the declarations array of AppModule.

*hero-detail.component.ts*
```
import { Directive, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'hero-detail'
})
export class HeroDetailDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('heroDetail', elementRef, injector);
  }
}
```
*app.module.ts*
```
@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  declarations: [
    HeroDetailDirective,
  /* . . . */
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['heroApp'], { strictDi: true });
  }
}
```

**Upgraded components are Angular directives, instead of components**, because Angular is unaware that AngularJS will create elements under it. As far as Angular knows, the upgraded component is just a directive, a tag; and Angular doesn't have to concern itself with its children.

**An upgraded component may also have inputs and outputs, as defined by the *scope/controller bindings* of the original AngularJS component directive**. When you use the component from an Angular template, provide the inputs and outputs using Angular template syntax, observing the following rules:

![angularjs-to-angular-bindingss](https://codersnack.com/assets/images/angularjs-to-angular-bindings)

For example, imagine a hero detail AngularJS component directive with one input and one output:

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

**You can upgrade this component to Angular, annotate inputs and outputs in the upgrade directive**, and then provide the input and output using Angular template syntax:

*hero-detail.component.ts*
```
import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import { Hero } from '../hero';

@Directive({
  selector: 'hero-detail'
})
export class HeroDetailDirective extends UpgradeComponent {
  @Input() hero: Hero;
  @Output() deleted: EventEmitter<Hero>;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('heroDetail', elementRef, injector);
  }
}
```
*container.component.ts*
```
import { Component } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'my-container',
  template: `
    <h1>Tour of Heroes</h1>
    <hero-detail [hero]="hero"
                 (deleted)="heroDeleted($event)">
    </hero-detail>
  `
})
export class ContainerComponent {
  hero = new Hero(1, 'Windstorm');
  heroDeleted(hero: Hero) {
    hero.name = 'Ex-' + hero.name;
  }
}
```

##    Projecting AngularJS Content into Angular Components

![Projecting AngularJS content into Angular](https://codersnack.com/assets/images/angularjs-to-angular-ajs-to-a-with-projection.png)

**When you are using a downgraded Angular component from an AngularJS template, the need may arise to transclude some content into it**. This is also possible. While there is **no such thing as transclusion in Angular, there is a very similar concept called content projection**. *upgrade/static is able to make these* two features interoperate.

Angular components that support content projection make use of an **```<ng-content>```** tag within them. Here is an example of such a component:

*hero-detail.component.ts*
```
import { Component, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'hero-detail',
  template: `
    <h2>{{hero.name}}</h2>
    <div>
      <ng-content></ng-content>
    </div>
  `
})
export class HeroDetailComponent {
  @Input() hero!: Hero;
}
```
When using the component from AngularJS, you can supply contents for it. Just like they would be transcluded in AngularJS, they get projected to the location of the <ng-content> tag in Angular:

```
<div ng-controller="MainController as mainCtrl">
  <hero-detail [hero]="mainCtrl.hero">
    <!-- Everything here will get projected -->
    <p>{{mainCtrl.hero.description}}</p>
  </hero-detail>
</div>
```
> When AngularJS content gets projected inside an Angular component, it still remains in "AngularJS land" and is managed by the AngularJS framework.


###    Transcluding Angular Content into AngularJS Component Directives


![angularjs-to-angular-a-to-ajs-with-transclusion](https://codersnack.com/assets/images/angularjs-to-angular-a-to-ajs-with-transclusion.png)

Just as you can project AngularJS content into Angular components, you can transclude Angular content into AngularJS components, whenever you are using upgraded versions from them.

**When an AngularJS component directive supports transclusion, it may use the *ng-transclude directive* in its template to mark the transclusion point:**

*hero-detail.component.ts*
```
export const heroDetail = {
  bindings: {
    hero: '='
  },
  template: `
    <h2>{{$ctrl.hero.name}}</h2>
    <div>
      <ng-transclude></ng-transclude>
    </div>
  `,
  transclude: true
};
```

If you upgrade this component and use it from Angular, you can populate the component tag with contents that will then get transcluded:

*container.component.ts*
```
import { Component } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'my-container',
  template: `
    <hero-detail [hero]="hero">
      <!-- Everything here will get transcluded -->
      <p>{{hero.description}}</p>
    </hero-detail>
  `
})
export class ContainerComponent {
  hero = new Hero(1, 'Windstorm', 'Specific powers of controlling winds');
}
```


###   Making AngularJS Dependencies Injectable to Angular

When running a hybrid app, you may encounter **situations where you need to inject some AngularJS dependencies into your Angular code**. Maybe you have some business logic still in AngularJS services. **Maybe you want access to built-in services of AngularJS like *$location* or *$timeout*.**

In these situations, **it is possible to upgrade an AngularJS provider to Angular**. This makes it possible to then inject it somewhere in Angular code. For example, you might have a service called HeroesService in AngularJS:

*heroes.service.ts*
```
import { Hero } from '../hero';

export class HeroesService {
  get() {
    return [
      new Hero(1, 'Windstorm'),
      new Hero(2, 'Spiderman')
    ];
  }
}
```
**You can upgrade the service using a *Angular factory provider* that requests the service from the *AngularJS $injector***.

Many developers prefer to **declare the factory provider in a separate *ajs-upgraded-providers.ts* file** so that they are all together, making it easier to reference them, create new ones and delete them once the upgrade is over.

It is also **recommended to export the heroesServiceFactory function so that Ahead-of-Time compilation can pick it up**.


> NOTE: The 'heroes' string inside the factory refers to the AngularJS HeroesService. It is common in AngularJS applications to choose a service name for the token, for example "heroes", and append the "Service" suffix to create the class name.

*ajs-upgraded-providers.ts*
```
import { HeroesService } from './heroes.service';

export function heroesServiceFactory(i: any) {
  return i.get('heroes');
}

export const heroesServiceProvider = {
  provide: HeroesService,
  useFactory: heroesServiceFactory,
  deps: ['$injector']
};
```
You can then provide the service to Angular by adding it to the @NgModule:

*app.module.ts*
```
import { heroesServiceProvider } from './ajs-upgraded-providers';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [
    heroesServiceProvider
  ],
/* . . . */
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['heroApp'], { strictDi: true });
  }
}
```

Then use the service inside your component by injecting it in the component constructor using its class as a type annotation:

*hero-detail.component.ts*
```
import { Component } from '@angular/core';
import { HeroesService } from './heroes.service';
import { Hero } from '../hero';

@Component({
  selector: 'hero-detail',
  template: `
    <h2>{{hero.id}}: {{hero.name}}</h2>
  `
})
export class HeroDetailComponent {
  hero: Hero;
  constructor(heroes: HeroesService) {
    this.hero = heroes.get()[0];
  }
}
```
In this example **you upgraded a service class**. **You can use a TypeScript type annotation when you inject it**. While it doesn't affect how the dependency is handled, it enables the **benefits of static type checking**. This is not required though, and any AngularJS service, factory, or provider can be upgraded.


###    Making Angular Dependencies Injectable to AngularJS

In addition to upgrading AngularJS dependencies, you can also **downgrade Angular dependencies, so that you can use them from AngularJS**. This can be useful when you start migrating services to Angular or creating new services in Angular while retaining components written in AngularJS.

For example, you might have an **Angular service called Heroes**:

*heroes.ts*
```
import { Injectable } from '@angular/core';
import { Hero } from '../hero';

@Injectable()
export class Heroes {
  get() {
    return [
      new Hero(1, 'Windstorm'),
      new Hero(2, 'Spiderman')
    ];
  }
}
```
Again, as with Angular components, **register the provider with the NgModule by adding it to the providers list of the module**.

*app.module.ts*
```
import { Heroes } from './heroes';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [ Heroes ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['heroApp'], { strictDi: true });
  }
}
```

Now **wrap the Angular Heroes in an AngularJS factory function using *downgradeInjectable()* and plug the factory into an AngularJS module**. The name of the AngularJS dependency is up to you:

*app.module.ts*
```
import { Heroes } from './heroes';
/* . . . */
import { downgradeInjectable } from '@angular/upgrade/static';

angular.module('heroApp', [])
  .factory('heroes', downgradeInjectable(Heroes))
  .component('heroDetail', heroDetailComponent);
```

After this, the service is injectable anywhere in AngularJS code:

*hero-detail.component.ts*
```
export const heroDetailComponent = {
  template: `
    <h2>{{$ctrl.hero.id}}: {{$ctrl.hero.name}}</h2>
  `,
  controller: ['heroes', function(heroes: Heroes) {
    this.hero = heroes.get()[0];
  }]
};
```

