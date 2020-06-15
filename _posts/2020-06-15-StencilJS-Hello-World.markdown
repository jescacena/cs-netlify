
### - References -

- [stenciljs.com Getting started](https://stenciljs.com/docs/getting-started)
- [stenciljs.com My first component](https://stenciljs.com/docs/my-first-component)

---
layout: post
title:  StencilJS Hello World
date:   2020-04-14T15:04:41.891Z
permalink: /stenciljs-hello-world/
icon: https://codersnack.com/assets/images/stenciljs-icon.png
categories: [snackpost]
---
## Getting Started

#### Starting a new project
Stencil requires a **recent LTS version of NodeJS and npm**. Make sure you've installed and/or updated Node before continuing.

> Note that you will need to use npm 6 or higher.

```
npm init stencil
``` 

**Stencil can be used to create standalone components, or entire apps**. After running init you will be provided with a prompt so that you can choose the type of project to start.

```
? Pick a starter › - Use arrow-keys. Return to submit.

❯  ionic-pwa     Everything you need to build fast, production ready PWAs
   app           Minimal starter for building a Stencil app or website
   component     Collection of web components that can be used anywhere
```
#### Updating Stencil
To get the latest version of @stencil/core you can run:

```
npm install @stencil/core@latest --save-exact
```

## My First Component
**Stencil components are created by adding a new file with a .tsx extension**, such as my-first-component.tsx, and placing them in the src/components directory. The .tsx extension is required since **Stencil components are built using JSX and TypeScript**.

Here is an example of what a Stencil component looks like:

```
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-first-component',
})
export class MyComponent {

  // Indicate that name should be a public property on the component
  @Prop() name: string;

  render() {
    return (
      <p>
        My name is {this.name}
      </p>
    );
  }
}
```
Don't fully understand what's going on? Don't worry, we'll explain each piece in detail later on.

Once compiled, this component can be used in HTML just like any other tag.

```
<my-first-component name="Max"></my-first-component>
```
**Web Components must have a - in the tag**. firstComponent would not be a valid tag name.

When rendered, the browser will display ```My name is Max```.

## So what is really going on here?
Let's dive in.

The first piece we see is the ```@Component``` decorator. This decorator provides **metadata about our component** to the Stencil compiler. Information, such as the **tag** to use, and **external styles**, can be set here and picked up by the compiler.

Below the @Component() decorator, we have a **standard JavaScript class**. This is where you'll write the bulk of your code to bring your Stencil component to life. **Here is where you'd write functions or provide business logic**.

In order for the component to render something to the screen, we must declare a ```render``` function that returns JSX.The quick idea is that our render function needs to return a **representation of the HTML we want to push to the DOM.**

The **name property** on the class also has a decorator applied to it, ```@Prop()```. This decorator tells the compiler that the property is public to the component, and the user should be setting it. We set this property like so:

```
<my-first-component name="Max"></my-first-component>
```
Any property decorated with ```@Prop()``` is also **automatically watched for changes**. If a user of our component were to change the element's name property, our component would fire its render function again, updating the displayed content.

#### Component Generator
**The Stencil CLI can generate new components** for you. If you used one of the starters, you can simply run the generate npm script in your project, which will start the **interactive generator**.

```
npm run generate
```
Or you can invoke the **Stencil CLI directly with the generate command** (g for short). If you don't have stencil installed globally, prefix the command with npx.

```
stencil generate
```
You can optionally pass the component tag name directly to the command. **Remember that the component tag name needs to be lowercase and contain at least one hyphen**. In the second step, the generator will ask you which files to generate. This allows you to bootstrap a stylesheet as well as spec and e2e tests along with the component file.

**All components will be generated within the *src/components* folder**. Within that, a folder will be created with the same name as the component tag name you provided, and within that folder the files will be generated. It is also possible to specify one or multiple sub-folders to generate the component in.

For example, if you specify ```pages/page-home``` as the component tag name, the files will be generated in ```src/components/pages/page-home```.

```
stencil generate pages/page-home
```
```
src
 |- components
     |- pages
         |- page-home
             |- page-home.css
             |- page-home.e2e.ts
             |- page-home.spec.ts
             |- page-home.tsx
```
