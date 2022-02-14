---
layout: post
title:  NextJS - Dynamic Routes II
date:   2022-02-14T21:19:04.187Z
permalink: /nextjs-dynamic-routes-2/
icon: https://codersnack.com/assets/images/nextjs-logo.png
categories: [snackpost]
---

> Information drawn from 
- [nextjs.org - Dynamic Routes](https://nextjs.org/learn/basics/dynamic-routes)


###  Render Markdown

To render markdown content, **we’ll use the [remark](https://github.com/remarkjs/remark) library**. First, let’s install it:

```
npm install remark remark-html
```

Then, open **lib/posts.js** and add the following imports to the top of the file:

```
import { remark } from 'remark'
import html from 'remark-html'
```

And update the getPostData() function in the same file as follows to use remark:

```
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
```

> **Important**: We added the async keyword to getPostData because we need to use await for remark. async/await allow you to fetch data asynchronously.

That means **we need to update *getStaticProps* in *pages/posts/[id].js*** to use await when calling getPostData:

```
export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id)
  // ...
}
```

Finally, **update the *Post* component in *pages/posts/[id].js* to render *contentHtml* using *dangerouslySetInnerHTML***:

```
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}
```

Try visiting these pages again:

- http://localhost:3000/posts/ssg-ssr
- http://localhost:3000/posts/pre-rendering

We’re almost done! Let’s polish each page next.


###  Polishing the Post Page


####  Adding title to the Post Page

In **pages/posts/[id].js**, let’s **add the title tag using the post data**. You'll need to add an **import for *next/head*** at the top of the file and **add the title tag** by updating the **Post** component:

```
// Add this import
import Head from 'next/head'

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Add this <Head> tag */}
      <Head>
        <title>{postData.title}</title>
      </Head>

      {/* Keep the existing code here */}
    </Layout>
  )
}
```

###  Formatting the Date

To format the date, we’ll use the [date-fns](https://date-fns.org/) library. First, install it:

```
npm install date-fns
```

Next, create a file called **components/date.js** and add the following **Date** component:

```
import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
```

> **Note**: You can view the different format() string options on the date-fns website.

Now, open **pages/posts/[id].js**, add an import for the **Date** component at the top of the file, and **use it over {postData.date}**:

```
// Add this import
import Date from '../../components/date'

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Keep the existing code here */}

      {/* Replace {postData.date} with this */}
      <Date dateString={postData.date} />

      {/* Keep the existing code here */}
    </Layout>
  )
}
```

If you access **http://localhost:3000/posts/pre-rendering**, you should now see the date written as **“January 1, 2020”.**


####  Adding CSS

Finally, let’s add some CSS using the file **styles/utils.module.css** we added before. Open **pages/posts/[id].js**, then add an import for the CSS file, and replace the Post component with the following code:

```
// Add this import at the top of the file
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
```

###  Polishing the Index Page
Next, let’s update our index page (**pages/index.js**). **We need to add links to each post page using the *Link* component**.

Open pages/index.js and add the following imports at the top of the file for Link and Date:

```
import Link from 'next/link'
import Date from '../components/date'
```

Then, near the bottom of the **Home** component in the same file, **replace the li tag** with the following:

```
<li className={utilStyles.listItem} key={id}>
  <Link href={`/posts/${id}`}>
    <a>{title}</a>
  </Link>
  <br />
  <small className={utilStyles.lightText}>
    <Date dateString={date} />
  </small>
</li>
```

That’s it! Before we wrap up this lesson, let’s talk about some tips for dynamic routes on the next page.


###  Dynamic Routes Details

Here is some essential information you should know about dynamic routes.


####  Fetch External API or Query Database

Like **getStaticProps**, **getStaticPaths** can fetch data from any data source. In our example, **getAllPostIds** (which is used by **getStaticPaths**) may fetch from an external API endpoint:

```
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  const posts = await res.json()
  return posts.map(post => {
    return {
      params: {
        id: post.id
      }
    }
  })
}
```

**Development v.s. Production**
- In development (npm run dev or yarn dev), getStaticPaths runs on every request.
- In production, getStaticPaths runs at build time.


####  Fallback

**Recall that we returned fallback: false from getStaticPaths**. What does this mean?

- If **fallback is false**, then **any paths not returned by getStaticPaths will result in a 404 page**.

- If **fallback is true**, then the behavior of getStaticProps changes:
The paths returned from getStaticPaths will be rendered to HTML at build time.
The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

- If **fallback is blocking**, then **new paths will be server-side rendered with getStaticProps**, and cached for future requests so it only happens once per path.

This is beyond the scope of our lessons, but you can learn more about fallback: true and fallback: 'blocking' in the fallback documentation.


####  Catch-all Routes

**Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets**. For example:

- pages/posts/**[...id].js** **matches */posts/a*, but also */posts/a/b*, */posts/a/b/c* and so on**.

If you do this,**in getStaticPaths, you must return an array as the value of the id key like so:**

``` 
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c']
    }
  }
  //...
]
``` 

And **params.id will be an array** in getStaticProps:

``` 
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
``` 

Take a look at the catch all routes documentation to learn more.


####  Router

If you want to **access the Next.js router, you can do so by importing the *useRouter* hook from *next/router***.


####  404 Pages

To create a custom 404 page, **create *pages/404.js***. This file is statically generated at build time.

```
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

Take a look at our Error Pages documentation to learn more.


####  More Examples

We have created several examples to illustrate getStaticProps and getStaticPaths — take a look at their source code to learn more:

- [Blog Starter using markdown files (Demo)](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)
- [WordPress Example (Demo)](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress)
- [DatoCMS Example (Demo)](https://github.com/vercel/next.js/tree/canary/examples/cms-datocms)
- [TakeShape Example (Demo)](https://github.com/vercel/next.js/tree/canary/examples/cms-takeshape)
- [Sanity Example (Demo)](https://github.com/vercel/next.js/tree/canary/examples/cms-sanity)
