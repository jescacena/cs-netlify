---
layout: main-content-post
title:  NextJS - Assets, Metadata, and CSS - II
date:   2022-02-14T18:40:18.423Z
permalink: /nextjs-assets-metadata-css-2/main-content/
icon: https://codersnack.com/assets/images/nextjs-logo.png
categories: [snack-main-content-post]
---


###  CSS Styling

Let’s now talk about CSS styling.

As you can see, our index page (http://localhost:3000) already has some styles. If you take a look at **pages/index.js**, you should see code like this:

```
<style jsx>{`
  …
`}</style>
```

This page is using a **library called *styled-jsx***. **It’s a “CSS-in-JS” library — it lets you write CSS within a React component, and the CSS styles will be scoped (other components won’t be affected)**.

**Next.js has built-in support for styled-jsx**, but you **can also use other popular CSS-in-JS libraries** such as styled-components or emotion.


####  Writing and Importing CSS

**Next.js has built-in support for CSS and Sass** which allows you to import .css and .scss files.

**Using popular CSS libraries like Tailwind CSS** is also supported.


###  Layout Component

First,**Let’s create a Layout component** which will be shared across all pages.

- Create a top-level directory called components.
- Inside components, create a file called **layout.js** with the following content:
```
export default function Layout({ children }) {
  return <div>{children}</div>
}
```
Then, open **pages/posts/first-post.js**, add an import for the Layout component, and make it the outermost component:

```
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}
```


####   Adding CSS

Now, let’s add some styles to the Layout component. To do so, **we’ll use CSS Modules**, which lets you import CSS files in a React component.

Create a file called components/layout.module.css with the following content:

```
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```
> **Important**: To use CSS Modules, the CSS file name must end with .module.css.

To use this container class inside components/layout.js, you need to:

- Import the CSS file and assign a name to it, like styles
- Use styles.container as the className

Open **components/layout.js** and replace its content with the following:

```
import styles from './layout.module.css'

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>
}
```
If you go to http://localhost:3000/posts/first-post now, you should see that the text is now inside a centered container:



####  Automatically Generates Unique Class Names

Now, if you take a look at the HTML in your browser’s devtools, **you’ll notice that the div rendered by the Layout component has a class name that looks like *layout_container__*...:**


**This is what CSS Modules does: It automatically generates unique class names**. As long as you use CSS Modules, you don’t have to worry about class name collisions.

Furthermore, **Next.js’s code splitting feature works on CSS Modules as well**. It ensures the minimal amount of CSS is loaded for each page. This results in smaller bundle sizes.

CSS Modules are extracted from the JavaScript bundles at build time and generate .css files that are loaded automatically by Next.js.


###  Global Styles

CSS Modules are useful for component-level styles. But **if you want some CSS to be loaded by every page**, Next.js has support for that as well.

**To load global CSS files, create a file called *pages/_app.js*** with the following content:

```
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

**This App component is the top-level component which will be common across all the different pages**. You can use this App component to **keep state when navigating between pages**, for example.

> **Important**: You need to restart the development server when you add pages/_app.js. 


####   Adding Global CSS

**In Next.js, you can add global CSS files by importing them from pages/_app.js**. You cannot import global CSS anywhere else.

The reason that global CSS can't be imported outside of pages/_app.js is that global CSS affects all elements on the page.

If you were to navigate from the homepage to the /posts/first-post page, global styles from the homepage would affect /posts/first-post unintentionally.

**You can place the global CSS file anywhere and use any name**. So let’s do the following:

- Create a **top-level styles directory** and create **global.css** inside.
- Add the following content to **styles/global.css**. It resets some styles and changes the color of the a tag:

``` 
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
}

* {
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}
```


Finally, open **pages/_app.js** add import the CSS file like so:

```
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```
Now, if you access http://localhost:3000/posts/first-post, you’ll see that the styles are applied:

> If it didn’t work: Make sure you restart the development server when you add pages/_app.js.


###  Polishing Layout

So far, we’ve only added minimal React and CSS code just to illustrate concepts such as CSS Modules. Before we move on to our next lesson about data fetching, **let’s polish our page styling and code.**

####  Update components/layout.module.css

First, open **components/layout.module.css **and replace its content with the following more polished styles for the layout and profile picture:

```
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.backToHome {
  margin: 3rem 0 0;
}
```

####   Create styles/utils.module.css

Second, **let’s create a set of utility CSS classes for typography and others** that will be useful across multiple components.

Let’s add **a new CSS file called *styles/utils.module.css*** with the following content:

```
.heading2Xl {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.headingXl {
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
}

.headingLg {
  font-size: 1.5rem;
  line-height: 1.4;
  margin: 1rem 0;
}

.headingMd {
  font-size: 1.2rem;
  line-height: 1.5;
}

.borderCircle {
  border-radius: 9999px;
}

.colorInherit {
  color: inherit;
}

.padding1px {
  padding-top: 1px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.listItem {
  margin: 0 0 1.25rem;
}

.lightText {
  color: #666;
}
```


####  Update components/layout.js

Third, **open components/layout.js and replace its content **with the following code, changing Your Name to an actual name:

```
import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
```
Here’s what’s new:

- **meta tags (like og:image)**, which are used to describe a page's content
- **Boolean home *prop* which will adjust the size** of the title and the image
- **“Back to home” link** at the bottom if home is false
- **Added images with next/image**, which are preloaded with the priority attribute

####  Update pages/index.js

Finally, let's update the homepage.

Open **pages/index.js** and replace its content with:

```
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}
```

Then replace [Your Self Introduction] with your self introduction. Here’s an example with the author’s profile:

That’s it! We now have the polished layout code in place to move onto our data fetching lessons.


###  Styling Tips

Here are some styling tips that might be helpful.
>You can just read through the following sections. No need to make changes to our app!


####  Using classnames library to toggle classes

**classnames** is a simple **library that lets you toggle class names easily**. You can install it using ```npm install classnames```  or ```yarn add classnames```.

Please take a look at its [documentation](https://github.com/JedWatson/classnames) for more details, but here’s the basic usage:

- Suppose that you want to create an **Alert component which accepts type, which can be 'success' or 'error'.**
- **If it’s 'success', you want the text color to be green. If it’s 'error', you want the text color to be red**.

You can first write a CSS module (e.g. alert.module.css) like this:
```
.success {
  color: green;
}
.error {
  color: red;
}
```

And use **classnames** like this:

```
import styles from './alert.module.css'
import cn from 'classnames'

export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
      })}
    >
      {children}
    </div>
  )
}
```


####  Customizing PostCSS Config

Out of the box, with no configuration, **Next.js compiles CSS using *PostCSS***.

**To customize PostCSS config, you can create a top-level file called postcss.config.js**. This is useful if you’re using libraries like Tailwind CSS.

Here are the **steps to add Tailwind CSS**. We recommend using **postcss-preset-env** and **postcss-flexbugs-fixes** to match Next.js’s default behavior. First, install the packages:

```
npm install tailwindcss postcss-preset-env postcss-flexbugs-fixes
```
Then write the following for postcss.config.js:

```
module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3,
        features: {
          'custom-properties': false
        }
      }
    ]
  ]
}
```
We also **recommend removing unused CSS** by specifying the purge option on **tailwind.config.js**:
```
// tailwind.config.js
module.exports = {
  purge: [
    // Use *.tsx if using TypeScript
    './pages/**/*.js',
    './components/**/*.js'
  ]
  // ...
}
```

To learn more about custom PostCSS configuration, check out the documentation for PostCSS.


####  Using Sass

Out of the box, **Next.js allows you to import Sass using both the .scss and .sass extensions**. You can use component-level Sass **via CSS Modules and the .module.scss or .module.sass extension**.

Before you can use Next.js' built-in Sass support, **be sure to install sass**: ```npm install sass```


