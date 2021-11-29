---
layout: post
title:  GatsbyJS - Pagination
date:   2021-11-29T15:44:55.968Z
permalink: /gatsbyjs-pagination/
icon: https://codersnack.com/assets/images/gatsbyjs-logo.png
categories: [snackpost]
---

> Information drawn from 
- [GatsbyJS Pagination](https://www.gatsbyjs.com/docs/adding-pagination/)
- [Pagination in Gatsby](https://nickymeuleman.netlify.app/blog/gatsby-pagination)


### Adding Pagination

A page displaying a list of content gets longer as the amount of content grows. **Pagination is the technique of spreading that content across multiple pages**.

**The goal of pagination is to create multiple pages (from a single template) that show a limited number of items**.

**Each page will query GraphQL** for those specific items.

The **information needed** to query for those specific items (i.e. values for limit and skip) **will come from the context that is added when creating pages in *gatsby-node***.


*src/templates/blog-list-template.js*

```
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return <div key={node.fields.slug}>{title}</div>
        })}
      </Layout>
    )
  }
}
export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
```

*gatsby-node.js*
```
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // ...
  // Create blog-list pages
  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
```

The code above will create a number of pages based on the total number of posts. Each page will list postsPerPage(6) posts, until there are less than postsPerPage(6) posts left. The path for the first page is /blog, following pages will have a path of the form: /blog/2, /blog/3, etc.

### Navigate to previous/next page

You can use **currentPage** and **numPages** to determine the **routes to the previous/next page**. They also make it possible to **only show those links if they exist**.

*src/templates/blog-list.js*
```
import React from 'react'
import { Link } from 'gatsby'

class BlogList extends React.component {
  render() {
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
       /* your code to display a list of posts */
      {!isFirst && (
        <Link to={prevPage} rel="prev">
          ← Previous Page
        </Link>
      )}
      {!isLast && (
        <Link to={nextPage} rel="next">
          Next Page →
        </Link>
      )}
    )
  }
}
```

### Add numbering

Iterate over numPages and output a number with the relevant link.

*src/templates/blog-list.js*
```
class BlogList extends React.component {
  // ...
  render() {
    const { currentPage, numPages } = this.props.pageContext

    return (
      // ...
      {Array.from({ length: numPages }, (_, i) => (
        <Link key={`pagination-number${i + 1}`} to={`/${i === 0 ? "" : i + 1}`}>
          {i + 1}
        </Link>
      ))}
      // ...
    )
  }
}
```
