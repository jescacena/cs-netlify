---
layout: main-content-post
title:  NextJS - Pre-rendering and Data Fetching 1
date:   2022-02-14T17:45:29.740Z
permalink: /nextjs-prerrendering-data-fetching-1/main-content/
icon: https://codersnack.com/assets/images/nextjs-logo.png
categories: [snack-main-content-post]
---

We’d like to create a blog (here’s the desired result), but so far we’ve added no blog content. In this lesson, we’ll learn how to fetch external blog data into our app. We’ll store the blog content in the file system, but it’ll work if the content is stored elsewhere (e.g. database or Headless CMS).

What You’ll Learn in This Lesson
In this lesson, you’ll learn about:

- Next.js’ pre-rendering feature.
- The two forms of pre-rendering: Static Generation and Server-side Rendering.
- Static Generation with data, and without data.
- getStaticProps and how to use it to import external blog data into the index page.
- Some useful information on getStaticProps.



###  Pre-rendering

Before we talk about data fetching, let’s talk about one of the most important concepts in Next.js: Pre-rendering.

**By default, Next.js pre-renders every page**. This means that **Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript**. Pre-rendering can result in **better performance and SEO**.

Each generated HTML is associated with minimal JavaScript code necessary for that page. **When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called *hydration*.)**

####  Check That Pre-rendering Is Happening
You can check that pre-rendering is happening by taking the following steps:

- Disable JavaScript in your browser ([here’s how in Chrome](https://developer.chrome.com/docs/devtools/javascript/disable/)) and…
- Try accessing [this page](https://next-learn-starter.vercel.app/) (the final result of this tutorial).

**You should see that your app is rendered without JavaScript**. That’s because Next.js has pre-rendered the app into static HTML, allowing you to see the app UI without running JavaScript.

> **Note**: You can also try the above steps on localhost, but CSS won’t be loaded if you disable JavaScript.

**If your app is a plain React.js app (without Next.js), there’s no pre-rendering, so you won’t be able to see the app if you disable JavaScript**. For example:

- Enable JavaScript in your browser and check out [this page](https://create-react-app.examples.vercel.com/). This is a plain React.js app built with Create React App.
- Now, disable JavaScript and access the same page again.
- You won’t see the app anymore — instead, it’ll say “You need to enable JavaScript to run this app.” This is because the app is not pre-rendered into static HTML.


####  Summary: Pre-rendering vs No Pre-rendering

Here’s a quick graphical summary:

![pre-rendering](https://codersnack.com/assets/images/pre-rendering.png)
*Pre-rendering*

![pre-rendering](https://codersnack.com/assets/images/no-pre-rendering.png)
No pre-rendering

Next, let’s talk about two forms of pre-rendering in Next.js.


###  Two Forms of Pre-rendering

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when it generates the HTML for a page**.

- Static Generation is the pre-rendering method that **generates the HTML at *build* time**. The pre-rendered HTML is then **reused on each request**.
- **Server-side Rendering** is the pre-rendering method that **generates the HTML on each request**.


####  Static Generation

![static-generation](https://codersnack.com/assets/images/static-generation.png)

![server-side-rendering](https://codersnack.com/assets/images/server-side-rendering.png)

> In development mode (when you run npm run dev or yarn dev), every page is pre-rendered on each request — even for pages that use Static Generation.


####  Per-page Basis

Importantly, **Next.js lets you choose which pre-rendering form to use for each page**. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

![server-side-rendering](https://codersnack.com/assets/images/per-page-basis.png)

####  When to Use Static Generation v.s. Server-side Rendering

**We recommend using *Static Generation* (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request**.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

**You should ask yourself: *"Can I pre-render this page ahead of a user's request?"*** If the answer is yes, then you should choose Static Generation.

**On the other hand**, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. **Maybe your page shows frequently updated data, and the page content changes on every request**. In that case, you can use **Server-side Rendering.** It will be **slower**, but the pre-rendered **page will always be up-to-date**. **Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data**.

We’ll Focus on Static Generation. In this lesson, we’ll focus on Static Generation. On the next page, we’ll talk about Static Generation with and without data.


###  Static Generation with and without Data

Static Generation can be done with and without data.

So far, all the pages we’ve created do not require fetching external data. Those pages will automatically be statically generated when the app is built for production.

However, for some pages, you might not be able to render the HTML without first fetching some external data. Maybe you need to access the file system, fetch external API, or query your database at build time. Next.js supports this case — Static Generation with data — out of the box.



####  Static Generation with Data using *getStaticProps*

How does it work? Well, in **Next.js, when you export a page component, you can also export an async function called getStaticProps**. If you do this, then:

- getStaticProps runs at build time in production, and…
- Inside the function, you can fetch external data and send it as props to the page.

```
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”

> **Note**: In development mode, getStaticProps runs on each request instead.

Let’s Use getStaticProps. It’s easier to learn by doing, so starting from the next page, we’ll use getStaticProps to implement our blog.


###  Blog Data

**We’ll now add blog data to our app using the file system. Each blog post will be a markdown file.**

- Create a new **top-level directory called *posts*** (this is not the same as pages/posts).
- Inside posts, create two files: **pre-rendering.md** and **ssg-ssr.md**.

Now, copy the following code to **posts/pre-rendering.md**:

```
---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
```

Then, copy the following code to **posts/ssg-ssr.md**:

```
---
title: 'When to Use Static Generation v.s. Server-side Rendering'
date: '2020-01-02'
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.
```

You might have noticed that **each markdown file has a *metadata section* at the top containing title and date. This is called *YAML Front Matter*, which can be parsed using a library called *[gray-matter](https://github.com/jonschlinkert/gray-matter)***.


####  Parsing the Blog Data on getStaticProps

Now, **let’s update our index page (pages/index.js) using this data**. We’d like to:

- Parse each markdown file and get title, date, and file name (which will be used as id for the post URL).
- List the data on the index page, sorted by date.

To do this on pre-render, **we need to implement *getStaticProps***.

![nextjs-data-fetching-index-page.png](https://codersnack.com/assets/images/nextjs-data-fetching-index-page.png)


Let’s do it on the next page!