---
layout: post
title:  NextJs - Navigating between pages
date:   2021-03-22T21:52:11.631Z
permalink: /nextjs-navigating-between-pages/
icon: https://codersnack.com/assets/images/nextjs-logo.png
categories: [snackpost]
---

> Information drawn from 
[NextJs - Navigating between pages - Client side](https://nextjs.org/learn/basics/navigate-between-pages/client-side)

In this lesson, you will:

- Create a new page using the integrated **file system routing**.
- Learn how to use the **Link** component to enable client-side navigation between pages.
- Learn about built-in support for code splitting and prefetching.

If you’re looking for detailed documentation on Next.js routing, take a look at the routing documentation.

## Pages in Next.js
In Next.js, **a page is a React Component exported from a file in the pages directory**.

**Pages are associated with a route based on their file name**. For example, in development:

- ```pages/index.js``` is associated with the ```/``` route.
- ```pages/posts/first-post.js``` is associated with the ```/posts/first-post``` route.

We already have the ```pages/index.js``` file, so let’s create ```pages/posts/first-post.js``` to see how it works.

## Create a New Page
Create the posts directory under pages.

Create a file called first-post.js inside the posts directory with the following content:

```
export default function FirstPost() {
  return <h1>First Post</h1>
}
```
The component can have any name, but you must export it as a default export.

Now, make sure that the development server is running and visit ```http://localhost:3000/posts/first-post```. You should see the page:

First Post

This is how you can create different pages in Next.js.

Simply create a JS file under the pages directory, and the path to the file becomes the URL path.

In a way, this is similar to building websites using HTML or PHP files. Instead of writing HTML you write JSX and use React Components.

Let's add a link to the newly added page so that we can navigate to it from the homepage.

## Link Component
When linking between pages on websites, you use the ```<a>``` HTML tag.

In Next.js, you use the **Link** Component from ```next/link``` to wrap the ```<a>``` tag. ```<Link>``` allows you to do client-side navigation to a different page in the application.

### Using Link
First, open ```pages/index.js```, and import the Link component from next/link by adding this line at the top:

```
import Link from 'next/link'
```
Then find the h1 tag that looks like this:

```
<h1 className="title">
  Learn <a href="https://nextjs.org">Next.js!</a>
</h1>
```

And change it to:

```
<h1 className="title">
  Read{' '}
  <Link href="/posts/first-post">
    <a>this page!</a>
  </Link>
</h1>
```
{' '} adds an empty space, which is used to divide text over multiple lines.

Next, open **pages/posts/first-post.js** and replace its content with the following:

```
import Link from 'next/link'

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}
```

As you can see, the Link component is similar to using ```<a>``` tags, but instead of ```<a href="…">```, you use ```<Link href="…">``` and put an ```<a>``` tag inside.

Let’s check to see if it works. You should now have a link on each page, allowing you to go back and forth.

## Client-Side Navigation
The **Link component enables client-side navigation between two pages** in the same Next.js app.

Client-side navigation means that the page transition **happens using JavaScript**, which is faster than the default navigation done by the browser.

Here’s a simple way you can verify it:

Use the browser’s developer tools to change the background CSS property of ```<html>``` to yellow.
Click on the links to go back and forth between the two pages.
You’ll see that the yellow background persists between page transitions.
This shows that the browser does not load the full page and client-side navigation is working.

## Links
If you’ve used ```<a href="…">``` instead of ```<Link href="…">``` and did this, the background color will be cleared on link clicks because the browser does a full refresh.

## Code splitting and prefetching
Next.js does code splitting **automatically**, so **each page only loads what’s necessary for that page**. That means when the homepage is rendered, the code for other pages is not served initially.

This ensures that the **homepage loads quickly even if you have hundreds of pages**.

Only loading the code for the page you request also means that pages become isolated. If a certain page throws an error, the rest of the application would still work.

Furthermore, in a production build of Next.js, whenever Link components appear in the browser’s viewport, **Next.js automatically prefetches the code for the linked page in the background**. By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant!

## Summary
Next.js automatically optimizes your application for the best performance by code splitting, client-side navigation, and prefetching (in production).

You create routes as files under pages and use the built-in Link component. No routing libraries are required.

You can learn more about the Link component in the API reference for ```next/link``` and routing in general in the routing documentation.

Note: If you need to link to an external page outside the Next.js app, just use an ```<a>``` tag without Link.

If you need to add attributes like, for example, **className**, **add it to the a tag, not to the Link tag.** Here’s an example.



