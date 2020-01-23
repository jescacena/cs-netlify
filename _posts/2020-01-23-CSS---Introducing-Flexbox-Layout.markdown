---
layout: post
title:  CSS - Introducing Flexbox Layout
date:   2020-01-23T20:25:20.853Z
permalink: /css-introducing-flex-box/
categories: jekyll update
---
``` ``` 
### The Flexbox Layout (Flexible Box) module

A W3C Candidate Recommendation as of October 2017, it aims at providing **a more efficient way to lay out**, align and distribute space among items in a container, even when their size is unknown and/or dynamic (thus the word "flex").

The main idea behind the flex layout is to **give the container the ability to alter its items width/height** (and order) to best fill the available space (mostly to accommodate to all kind of display devices and screen sizes). A flex container expands items to fill available free space or shrinks them to prevent overflow.

Most importantly, the **flexbox layout is direction-agnostic as opposed to the regular layouts** (block which is vertically-based and inline which is horizontally-based). While those work well for pages, they lack flexibility (no pun intended) to support large or complex applications (especially when it comes to orientation changing, resizing, stretching, shrinking, etc.).

> Note: Flexbox layout is most appropriate to the components of an application, and small-scale layouts, while the Grid layout is intended for larger scale layouts.

``` ``` 
### Basics

Since flexbox is a whole module and not a single property, **it involves a lot of things including its whole set of properties**. Some of them are meant to be set on the **container** (parent element, known as "flex container") whereas the others are meant to be set on the **children** (said "flex items").

If "regular" layout is based on both block and inline flow directions, the flex layout is based on "flex-flow directions". Please have a look at this figure from the specification, explaining the main idea behind the flex layout.

![Css flex box - basic terminology](https://css-tricks.com/wp-content/uploads/2018/11/00-basic-terminology.svg)



### - References -

- [[CSS trick] A guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
