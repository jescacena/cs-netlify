---
layout: post
title:  NextJS - Assets, Metadata, and CSS - I
date:   2022-02-14T12:28:40.151Z
permalink: /nextjs-assets-metadata-css-1/
icon: https://codersnack.com/assets/images/nextjs-logo.png
categories: [snackpost]
---

> Information drawn from 
[NextJS - Assets, Metadata, and CSS](https://nextjs.org/learn/basics/assets-metadata-css)

In this lesson, you’ll learn:

- How to add static files (images, etc) to Next.js.
- How to customize what goes inside the <head> for each page.
- How to create a reusable React component which is styled using CSS Modules.
- How to add global CSS in pages/_app.js.
- Some useful tips for styling in Next.js.



###   Assets

Next.js can **serve static assets, like images, under the top-level *public* directory**. Files inside public can be referenced from the root of the application similar to pages.

The public directory is also useful for robots.txt, Google Site Verification, and any other static assets. Check out the documentation for Static File Serving to learn more.


####  Download Your Profile Picture

First, let's retrieve your profile picture.

- Download your profile picture in .jpg format (or use this file).
- Create an images directory inside of the public directory.
- Save the picture as profile.jpg in the public/images directory.
- The image size can be around 400px by 400px.
- You may remove the unused SVG logo file directly under the public directory.


####  Unoptimized Image

With regular HTML, you would add your profile picture as follows:

```
<img src="/images/profile.jpg" alt="Your Name" />
```

However, this means you have to manually handle:

- Ensuring your image is responsive on different screen sizes
- Optimizing your images with a third-party tool or library
- Only loading images when they enter the viewport

And more. Instead, Next.js **provides an *Image* component out of the box to handle this for you.**

####  Image Component and Image Optimization

***next/image* is an extension of the HTML ```<img>```  element, evolved for the modern web.**

**Next.js also has support for Image Optimization by default. This allows for resizing, optimizing, and serving images in modern formats like *WebP* when the browser supports it.** This avoids shipping large images to devices with a smaller viewport. It also allows Next.js to automatically adopt future image formats and serve them to browsers that support those formats.

**Automatic Image Optimization works with any image source.** Even if the image is hosted by an external data source, like a CMS, it can still be optimized.

####  Using the Image Component

**Instead of optimizing images at build time, *Next.js optimizes images on-demand*, as users request them**. Unlike static site generators and static-only solutions, your build times aren't increased, whether shipping 10 images or 10 million images.

**Images are lazy loaded by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.**

Images are always rendered in such a way as to avoid [Cumulative Layout Shift](https://web.dev/cls/), a Core Web Vital that Google is going to use in search ranking.

**Here's an example using *next/image* to display our profile picture**. The height and width props should be the desired rendering size, with an aspect ratio identical to the source image.

> **Note**: We'll use this component later in "Polishing Layout", no need to copy it yet.

```
import Image from 'next/image'

const YourComponent = () => (
  <Image
    src="/images/profile.jpg" // Route of the image file
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
)
```

> To learn more about Automatic Image Optimization, check out the [documentation](https://nextjs.org/docs/basic-features/image-optimization).
To learn more about the Image component, check out the API reference for [next/image](https://nextjs.org/docs/api-reference/next/image).



###  Metadata

What if we wanted to modify the metadata of the page, such as the ```<title>``` HTML tag?

```<title>``` is part of the ```<head>``` HTML tag, so let's dive into **how we can modify the ```<head>``` tag in a Next.js page.**

Open pages/index.js in your editor and find the following lines:

```
<Head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</Head>
```
Notice that ```<Head>``` is used instead of the lowercase ```<head>```. ```<Head>``` is a React Component that is built into Next.js. It allows you to modify the ```<head>``` of a page.

You can import the Head component from the next/head module.


###  Adding Head to first-post.js

We haven't added a ```<title>``` to our **/posts/first-post** route. Let's add one.

Open the **pages/posts/first-post.js** file and add an import for *Head* from next/head at the beginning of the file:

```
import Head from 'next/head'
```
Then, update the exported FirstPost component to include the Head component. For now, we‘ll add just the title tag:

```
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
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
Try accessing *http://localhost:3000/posts/first-post*. The browser tab should now say “First Post”. By using your browser’s developer tools, you should see that the title tag is added to ```<head>```.

> To learn more about the Head component, check out the API reference for next/head.

If you want to **customize the ```<html>``` tag**, for example to add the lang attribute, you can do so by creating a **pages/_document.js** file. Learn more in the custom Document documentation.


###   Third-Party JavaScript

Third-party JavaScript refers to any scripts that are added from a third-party source. Usually, third-party scripts are included in order to introduce newer functionality into a site that does not need to be written from scratch, such as analytics, ads, and customer support widgets.

####  Adding Third-Party JavaScript

Let's dive into how we can add a third-party script to a Next.js page.

Open **pages/posts/first-post.js** in your editor and find the following lines:

```
<Head>
  <title>First Post</title>
</Head>
```
In addition to metadata, **scripts that need to load and execute as soon as possible are usually added within the ```<head>``` of a page**. Using a regular HTML ```<script>``` element, an external script would be added as follows:

```
<Head>
  <title>First Post</title>
  <script src="https://connect.facebook.net/en_US/sdk.js" />
</Head>
```

This script contains the Facebook SDK which is commonly used to introduce Facebook social plugins and other functionality. **Although this approach works, including scripts in this manner does not give a clear idea of when it would load with respect to the other JavaScript code fetched on the same page**. If a particular script is render-blocking and can delay page content from loading, this can signficiantly impact performance.


#### Using the Script Component

**next/script** is an extension of the HTML ```<script>``` element and **optimizes when additional scripts are fetched and executed.**

In the same file, add an import for Script from next/script at the beginning of the file:

```
import Script from 'next/script'
```
Now, update the FirstPost component to include the Script component:

```
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
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

Notice that a few additional properties have been defined in the Script component:

- **strategy** controls **when the third-party script should load**. A value of ***lazyOnload*** tells Next.js to load this particular script **lazily during browser idle time**

- **onLoad** is used to **run any JavaScript code immediately after the script has finished loading**. In this example, we log a message to the console that mentions that the script has loaded correctly

Try accessing http://localhost:3000/posts/first-post. By using your browser’s developer tools, you should see the message above logged in the Console panel. In addition, you can run window.FB to see that the script has populated this global variable.

> **Note**: The Facebook SDK was only used as a contrived example to show how to add third-party scripts to your application in a performant way. Now that you understand the basics of including third-party functionality in Next.js, you can remove the Script component from FirstPost before proceeding.

To learn more about the Script component, check out the documentation.