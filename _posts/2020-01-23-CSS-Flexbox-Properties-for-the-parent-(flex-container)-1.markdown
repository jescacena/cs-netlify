---
layout: post
title:  CSS Flexbox Properties for the parent (flex container) 1
date:   2020-01-23T21:46:09.702Z
permalink: /css-flexbox-properties-parent-1/
categories: jekyll update
---
### display
This defines a flex container inline or block depending on the given value. It enables a **flex context for all its direct children**.

```
.container {
  display: flex; /* or inline-flex */
}
```

Note that CSS columns have no effect on a flex container.


### flex-direction
![css flex direction](https://codersnack.com/assets/images/css-flex-direction.png)

This **establishes the main-axis**, thus defining the direction flex items are placed in the flex container. Flexbox is (aside from optional wrapping) a single-direction layout concept. Think of flex items as primarily laying out either in horizontal rows or vertical columns.

```
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

- row (default): left to right in ltr; right to left in rtl
- row-reverse: right to left in ltr; left to right in rtl
- column: same as row but top to bottom
- column-reverse: same as row-reverse but bottom to top



### flex-wrap
![css flex wrap](https://codersnack.com/assets/images/css-flex-wrap.png)

By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property.

```
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```
- nowrap (default): all flex items will be on one line
- wrap: flex items will wrap onto multiple lines, from top to bottom.
- wrap-reverse: flex items will wrap onto multiple lines from bottom to top.


### - References -

- [[CSS trick] A guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
