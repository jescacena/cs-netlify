---
layout: post
title:  GatsbyJS - Introduction
date:   2021-11-03T17:43:59.317Z
permalink: /gatsbyjs-introduction/
icon: https://codersnack.com/assets/images/gatsbyjs-logo.png
categories: [snackpost]
---

> Information drawn from 
- [Why you should use GatsbyJS to build static sites](https://www.freecodecamp.org/news/why-you-should-use-gatsbyjs-to-build-static-sites-4f90eb6d1a7b/)


##What is Gatsby?
It’s **another static site generator** like Hugo, Jekyll and so on. So what makes it special? Why are we talking specifically about it?

Gatsby can be used to build static sites that are **Progressive Web Apps**, follow the latest web standards, and are **optimized to be highly performant.** It makes use of the latest and popular technologies including **ReactJS**, Webpack, **GraphQL**, modern ES6+ JavaScript and CSS.

![ReactJS + GraphQL + Webpack = i'm loving it](https://codersnack.com/assets/images/gatsbyjs-reactjs-graphql-webpack.png)
*ReactJS + GraphQL + Webpack = i'm loving it*

This means **a lot of developers can jump in without much of a learning curve** as they already know or have at least used one piece of this tech stack Gatsby is built on.

##Approach to development
On one side, we have users expecting an app-like smooth experience on the web. The other side is **developers, used to sites having pages with each being HTML files** or maybe using some templating — at the very base — sites as pages with internal linking.

If you’re getting started with any of the latest frameworks, let’s take the case of React. You could have an app up and running with minimal configuration with *create-react-app*. But if you take a look at the project structure it may not make much sense to a newbie or even some developers coming in from other tech stacks. *The pattern is pretty different from what you’ve ever seen before.* It’s because without additional setup they aim at building Single-Page Applications, SPAs. To add routing, pages or optimizing for SEO, it will require more tools and configuration.

That doesn’t seem very convenient when you want static sites, does it? So here we have **Gatsby, optimized for this specific use case**. This could be **more intuitive for developers**, as there are pages created from components that follow the root idea that sites are pages with internal linking.

##Webpack bundling and latest tooling
Webpack creates optimized, minified bundles of HTML, JavaScript, and CSS. When it’s pre-configured with Babel and more plugins, it allows you to use the latest ES6+ JavaScript and GraphQL.

*Icing on the cake*: we’ve got hot reloading and code splitting built-in, giving a better development experience and better site performance. This is aimed at making the developer write minimal tooling configuration and focus more on the actual site development.

## Gatsby plugins, starters and React packages
You can use any of the packages you’ve already been using with NPM, particularly the React ones as it’s built on the same thing. But that’s not all: there’s a **large number of ever-growing plugins, starters, and transformers by the Gatsby community**. You almost never come to the point where you actually have to build on your own tool or module, the community already offers a huge number to suit every need.

Using these, Gatsby **can be extended with additional functionality**. For instance, a couple of examples include *responsive images*, *offline functionality*, *source data from CMS* and *data markup formats*, adding third-party services (Google analytics etc), and so on.

##Responsive Images
Resizing images for responsiveness on different devices, lazy-loading, using srcsets and picture…Already sounds tedious when it is to be done manually.

![Different versions of the same image for responsiveness](https://codersnack.com/assets/images/gatsbyjs-responsive-images.png)
*Different versions of the same image for responsiveness*

Although it is a requirement for performance and app-like optimized interfaces these days, we don’t see many tools that we can directly jump into and use.

Meanwhile, in Gatsby with just a plugin, particularly the **gatsby-plugin-sharp**, you can directly generate **fluid images, add filters, change formats**, blur up on load and a lot more. This saves a lot of work and time manually resizing images and writing explicit boilerplate code for responsive images. It also gives you way better performance along with a smoother user experience.

##App-like experience
With the performance boost and features to add to the **smoothness of the user experience**, Gatsby aims at a full app-like experience borrowing from full PWAs. There are **no reloads between pages** when using **gatsby-link** instead of hyperlinks, and the app still appears smooth and performant thanks to **lazy-loading images and code-splitting**.

For sites following standards that you also want to be performant, we’ve got tons of things to do and guides to follow: minification and bundling, browser caching and async loading scripts or files, and so on. When working with a framework like React, you have more things to worry about even though it solves a couple of problems: **code-splitting, SEO, routing if required, responsive images**, and the list goes on.

**Gatsby aims to solve all these problems**, with less time spent on tooling, configuration, and the environment and more time to actually design and develop the site.

##Plugins
Gatsby was **built to be extensible and flexible — using plugins is one way to make it so**. They can be directly installed and be used for a variety of functionality including making the site offline, adding Google analytics, adding support for inline SVGs, you name it — the list is almost endless.

Of the different types of Gatsby plugins, the **gatsby-source plugins in particular fetch data from a local or remote source and allow it to be usable via GraphQL**. These sources could be CMSs such as *Wordpress*, Drupal, Plone, *local markdown*, XML or such files, databases, APIs and *data formats as JSON*, CSV.

This implies that almost anything at all can be used as a source to work with Gatsby and generate static sites.

***Note***: GraphQL is a query language for APIs that works on the philosophy of just asking for exactly what you require. Unlike REST APIs, you don’t look for endpoints to provide your data and process them from the structure that’s given from it, but rather ask for what you want and directly use this data. Read more about how it works and how to use it in their docs.
After installation, some plugins can be used straight away by just listing them in *gatsby-config.js* and the others configured with an options object.

Go check out the Gatsby plugin library, it’s already got quite a large number of plugins and more are being added still by the active community.

##Starters
These are basically boilerplate Gatsby sites which help you kick-start development quickly depending on what kind of site it is. They help you directly get onto working on the development of a site, configuration and basic features you need already taken care of. Which means, less time on the tooling, more time for development.

Gatsby plugins often have their corresponding starters which show or serve a quick way to get started with using it. They also act as a reference covering all the features and showcase configurations of the plugin in use.

[https://www.gatsbyjs.com/starters/](https://www.gatsbyjs.com/starters/)

##Static Sites
Firstly, let’s take a look at **how Gatsby works internally**. Unlike the SPAs that make API requests as you run the app, **Gatsby does all the data fetching, including data sourcing from local files, during build time**. All this data is then used to generate static HTML, JavaScript, and CSS files. This static rendering is what makes things work faster.

![How GastbyJS works](https://codersnack.com/assets/images/gatsbyjs-how-it-works.png)
*How GastbyJS works*

That was a lot about Gatsby, its ecosystem and how it helps you create amazing static sites. **But why would we want static sites? Doesn’t it sound like a step back from dynamic ones?**

- They **do not require complex server setup with databases, maintenance, and don’t have any scaling issues**.
- Data is **fully secure**. CMSs and APIs have private features but the data is still present in the server which can be exploited. Gatsby only takes the required data to display from the source and the private or secured data is not even present in the final build. Which is the safest it can possibly get.
- Rather than relying on servers to generate pages dynamically, **pre-render all of them on build and use CDNs for a blazing fast** and smooth experience for users all around the globe.
- Gatsby does static rendering. Which makes content available as HTML, and **search engine optimized, no long initial load time**.
