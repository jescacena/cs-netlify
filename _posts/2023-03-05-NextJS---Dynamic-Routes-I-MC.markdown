---
layout: main-content-post
title:  NextJS - Dynamic Routes I
date:   2022-02-14T20:18:22.677Z
permalink: /nextjs-dynamic-routes-1/main-content/
icon: https://codersnack.com/assets/images/nextjs-logo.png
categories: [snack-main-content-post]
---

We’ve populated the index page with the blog data, but **we still haven’t created individual blog pages yet** (here’s the [desired result](https://next-learn-starter.vercel.app/)). We want the URL for these pages to depend on the blog data, which means we need to use dynamic routes.

In this lesson, you’ll learn:

- How to statically generate pages with dynamic routes using getStaticPaths.
- How to write getStaticProps to fetch the data for each blog post.
- How to render markdown using remark.
- How to pretty-print date strings.
- How to link to a page with dynamic routes.
- Some useful information on dynamic routes.

###  Page Path Depends on External Data

In the previous lesson, we covered the case where the page content depends on external data. We used getStaticProps to fetch required data to render the index page.

In this lesson, we’ll talk about the case where **each page path depends on external data**. Next.js allows you to statically generate pages with paths that depend on external data. **This enables dynamic URLs in Next.js**.

![nextjs-page-path-external-data.png](https://codersnack.com/assets/images/nextjs-page-path-external-data.png)
*Page Path Depends on External Data*


####  How to Statically Generate Pages with Dynamic Routes

In our case, we want to create dynamic routes for blog posts:

- We want each post to have the path ```/posts/<id>```, where ```<id>``` is the name of the markdown file under the top-level posts directory.
- Since we have ssg-ssr.md and pre-rendering.md, we’d like the paths to be **/posts/ssg-ssr** and **/posts/pre-rendering**.


####  Overview of the Steps

We can do this by taking the following steps. You don’t have to make these changes yet — we’ll do it all on the next page.

First, **we’ll create a page called *[id].js*** under **pages/posts**. **Pages that begin with [ and end with ] are dynamic routes in Next.js**.

In **pages/posts/[id].js**, we’ll write code that will render a post page — just like other pages we’ve created.

``` 
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}
```

Now, here’s what’s new: **We’ll export an async function called *getStaticPaths*** from this page. In this function, we need to return a list of possible values for id.

```
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}
```

Finally, **we need to implement *getStaticProps* again** - this time, **to fetch necessary data for the blog post with a given id. *getStaticProps* is given params, which contains id (because the file name is [id].js).**

```
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```


####  Implement getStaticPaths

First, let’s set up the files:

- **Create a file called *[id].js*** inside the **pages/posts** directory.
- Also, **remove first-post.js** inside the pages/posts directory — we’ll no longer use this.

Then, open **pages/posts/[id].js** in your editor and paste the following code. We’ll fill in ... later:

```
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}
```

Then, open **lib/posts.js** and add the following **getAllPostIds** function at the bottom. It will return the list of file names (excluding .md) in the posts directory:

```
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}
```

> **Important**: The returned list is not just an array of strings — it must be an array of objects that look like the comment above. **Each object must have the params key and contain an object with the id key** (because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.

Finally, **we'll import the *getAllPostIds*** function and **use it inside *getStaticPaths***. Open **pages/posts/[id].js** and copy the following code above the exported Post component:

```
import { getAllPostIds } from '../../lib/posts'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
```

- paths contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js. Learn more in the paths key documentation
- Ignore fallback: false for now — we’ll explain that later.

We’re almost done — but we still need to implement getStaticProps. 


###  Implement getStaticProps

We need to fetch necessary data to render the post with the given id.

To do so, open **lib/posts.js** again and add the following **getPostData** function at the bottom. It will return the post data based on id:

```
export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}
```

Then, open **pages/posts/[id].js** and replace this line:

```
import { getAllPostIds } from '../../lib/posts'
```

with the following code:

```
import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
```

The post page is now using the getPostData function in getStaticProps to get the post data and return it as props.

Now, **let's update the Post component to use postData**. In **pages/posts/[id].js** replace the exported **Post** component with the following code:

```
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  )
}
```

That’s it! Try visiting these pages:

- http://localhost:3000/posts/ssg-ssr
- http://localhost:3000/posts/pre-rendering
You should be able to see the blog data for each page:

Blog Data
Great! We’ve successfully generated dynamic routes.

**Something Wrong?**
If you come across an error, make sure your files have the correct code.
If you’re still stuck, feel free to ask the community on GitHub Discussions. It’d be helpful if you could push your code to GitHub and link to it so others can take a look.

We still haven’t displayed the blog markdown content. Let’s do this next.

