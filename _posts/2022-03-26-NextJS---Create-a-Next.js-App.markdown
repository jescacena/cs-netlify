---
layout: post
title:  NextJS - Create a Next.js App
date:   2021-03-21T21:54:40.755Z
permalink: /nextjs-creating-an-app/
icon: https://codersnack.com/assets/images/nextjs-logo.png
categories: [snackpost]
---

> Information drawn from 
[NextJS - Create NextJS App](https://nextjs.org/learn/basics/create-nextjs-app)

To build a complete web application with React from scratch, there are many important details you need to consider:
- **Code has to be bundled using a bundler like webpack** and transformed using a compiler like Babel.
- You need to do production optimizations such as **code splitting**
- You might want to **statically pre-render some pages for performance and SEO**. You might also want to use server-side rendering or client-side rendering
- You might have to write some **server-side code to connect your React app to your data store.**

A framework can solve these problems. But such a framework must have the right level of abstraction — otherwise it won’t be very useful. It also needs to have great "Developer Experience", ensuring you and your team have an amazing experience while writing code.

## Next.js: The React Framework
Enter Next.js, the React Framework. Next.js provides a solution to all of the above problems. But more importantly, it puts you and your team in the pit of success when building React applications.
Next.js has the best-in-class "Developer Experience" and many built-in features; a sample of them are:
- An intuitive **page-based routing system** (with support for dynamic routes)
- **Pre-rendering, both static generation (SSG)** and server-side rendering (SSR) are supported on a per-page basis
- **Automatic code splitting** for faster page loads
- **Client-side routing** with optimized prefetching
- **Built-in CSS and Sass support**, and support for any CSS-in-JS library
- Development environment with **Fast Refresh support**
- **API routes to build API endpoints with Serverless Functions**
- Fully extendable

Next.js is used in tens of thousands of production-facing websites and web applications, including many of the world's largest brands.

**Image Optimization**
```<Image>``` and Automatic Image Optimization with instant builds.

**Internationalization**
Built-in Domain and Subdomain Routing and Automatic Language detection.

**Next.js Analytics**
A true lighthouse score based on real visitor data & page-by-page insights

**Zero Config**
Automatic compilation and bundling. Optimized for production from the start.

**Hybrid: SSG and SSR**
Pre-render pages at build time (SSG) or request time (SSR) in a single project.

**Incremental Static Generation**
Add and update statically pre-rendered pages incrementally after build time.

**TypeScript Support**
Automatic TypeScript configuration and compilation.

**Fast Refresh**
Fast, reliable live-editing experience, as proven at Facebook scale.

**File-system Routing**
Every component in the pages directory becomes a route.

**API Routes**
Optionally create API endpoints to provide backend functionality.

**Built-in CSS Support**

**Code-splitting and Bundling**
Optimized bundle splitting algorithm created by the Google Chrome team.
