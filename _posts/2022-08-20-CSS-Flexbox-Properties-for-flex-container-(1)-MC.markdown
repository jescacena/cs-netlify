---
layout: main-content-post
title:  CSS Flexbox Properties for flex container (1)
date:   2020-01-26T11:40:27.822Z
permalink: /css-flexbox-properties-parent-1/main-content/
icon: https://codersnack.com/assets/images/css-flex-direction.png
categories: [snack-main-content-post]
---

In this snack we will introduce display, flex-direction and flex-wrap.
 
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

### flex-wrap
![css flex wrap](https://codersnack.com/assets/images/css-flex-wrap.png)

By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property.

```
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

