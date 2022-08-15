---
layout: main-content-post
title:  NextJS - Pre-rendering and Data Fetching 2
date:   2022-02-14T18:18:47.303Z
permalink: /nextjs-prerrendering-data-fetching-2/main-content/
icon: https://codersnack.com/assets/images/nextjs-logo.png
categories: [snack-main-content-post]
---


###  Implement getStaticProps

First, **install gray-matter** which lets us parse the metadata in each markdown file.

```
npm install gray-matter
```
Next, we’ll create a simple library for fetching data from the file system.

- Create a **top-level directory called *lib***, and…
- Inside lib, create a file called **posts.js** with the following content:

```
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}
```

Now, **we need to add an import for *getSortedPostsData* and call it inside *getStaticProps* in *pages/index.js***.

Open **pages/index.js** in your editor and add the following code above the exported Home component:

```
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
```
**By returning *allPostsData* inside the props object in *getStaticProps*, the blog posts will be passed to the *Home* component as a prop**. Now you can access the blog posts like so:

```
export default function Home ({ allPostsData }) { ... }
```

To display the blog posts, let's update the Home component to add another ```<section>```  tag with the data below the section with your self introduction. Don't forget to also change the props from () to ({ allPostsData }):

```
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
```

You should now see the blog data if you access http://localhost:3000.
Congratulations! We’ve successfully fetched external data (from the file system) and pre-rendered the index page with this data.


###  getStaticProps Details

Here is some essential information you should know about **getStaticProps**.


####  Fetch External API or Query Database

In **lib/posts.js**, we’ve implemented **getSortedPostsData** which fetches data from the file system. But **you can fetch the data from other sources, like an external API endpoint,** and it’ll work just fine:

```
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  return res.json()
}
```
> **Note**: Next.js polyfills fetch() on both the client and server. You don't need to import it.

You can also query the database directly:

```
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```
This is possible because **getStaticProps only runs on the server-side**. It will never run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.


####  Development vs. Production

- In **development** (npm run dev or yarn dev), ***getStaticProps* runs on every request**.
- In **production**, **getStaticProps runs at build time**. However, **this behavior can be enhanced using the *fallback* key returned by *getStaticPaths***

Because it’s meant to be run at build time, **you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers**.


####  Only Allowed in a Page

**getStaticProps** can only be exported from a page. **You can’t export it from non-page files.**

One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

####  What If I Need to Fetch Data at Request Time?

Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

**In cases like this, you can try Server-side Rendering or skip pre-rendering**. Let’s talk about these strategies before we move on to the next lesson.


###   Fetching Data at Request Time

If you need to fetch data at request time instead of at build time, you can try Server-side Rendering

**To use Server-side Rendering, you need to export *getServerSideProps*** instead of getStaticProps **from your page**.

####  Using *getServerSideProps*

Here’s the starter code for **getServerSideProps**. It’s not necessary for our blog example, so we won’t be implementing it.

```
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

**Because *getServerSideProps* is called at request time, its parameter (context) contains request specific parameters**.

You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time. [Time to first byte (TTFB)](https://web.dev/time-to-first-byte/) **will be slower than getStaticProps because the server must compute the result on every request**, and the **result cannot be cached by a CDN** without extra configuration.


####  Client-side Rendering

If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):

- Statically generate (pre-render) **parts of the page that do not require external data**.
- When the page loads, **fetch external data from the client using JavaScript and populate the remaining parts**.

![nextjs-data-fetching-client-side-rendering.png](https://codersnack.com/assets/images/nextjs-data-fetching-client-side-rendering.png)

**This approach works well for user dashboard pages**, for example. Because a **dashboard is a private, user-specific page, SEO is not relevant**, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.


####  SWR

The team behind **Next.js has created a React hook for data fetching called *SWR***. We highly recommend it if you’re fetching data on the client side. It **handles caching, revalidation, focus tracking, refetching on interval, and more**. We won’t cover the details here, but here’s an example usage:

```
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

Check out the SWR documentation to learn more.

