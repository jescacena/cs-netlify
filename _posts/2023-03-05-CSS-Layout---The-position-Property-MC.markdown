---
layout: main-content-post
title:  CSS Layout - The position Property
date:   2020-01-24T11:15:34.201Z
permalink: /css-layout-the-position-property/main-content/
icon: https://codersnack.com/assets/images/logo-css.jpg
categories: [snack-main-content-post]
---

The position property specifies the type of positioning method used for an element (static, relative, fixed, absolute or sticky).

There are five different position values:

- static
- relative
- fixed
- absolute
- sticky

**Elements are then positioned using the top, bottom, left, and right properties**. However, these properties will not work unless the position property is set first. They also work differently depending on the position value.

#### position static
> HTML elements are positioned static by default.

**Static positioned elements are not affected by the top, bottom, left, and right properties**.

An element with *position static* is not positioned in any special way, it is always **positioned according to the normal flow of the page**. This `<div>` element has position: static:

Example
``` 
div.static {
  position: static;
  border: 3px solid #73AD21;
}
``` 
![text](https://codersnack.com/assets/images/css-position-static.png)

#### position relative
An element with position: relative; is positioned **relative to its normal position**.

Setting the top, right, bottom, and left properties of a relatively-positioned element will cause it to be adjusted away from its normal position. *Other content will not be adjusted to fit into any gap left by the element*.

This `<div>`   element has **position relative**:

``` 
div.relative {
  position: relative;
  left: 30px;
  border: 3px solid #73AD21;
}
```
![text](https://codersnack.com/assets/images/css-position-relative.png)

#### position fixed
An element with *position fixed* is **positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled**. The top, right, bottom, and left properties are used to position the element.

> A fixed element does not leave a gap in the page where it would normally have been located.

Notice the fixed element in the lower-right corner of the page:

```  
div.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  border: 3px solid #73AD21;
}
```       

#### position absolute

An element with position: absolute  is **positioned relative to the nearest positioned ancestor** (instead of positioned relative to the viewport, like fixed).

However , **if an absolute positioned element has no positioned ancestors, it uses the document body**, and moves along with page scrolling.

Note: A "positioned" element is one whose position is anything except static.

Here is a simple example:

``` 
div.relative {
  position: relative;
  width: 400px;
  height: 200px;
  border: 3px solid #73AD21;
}

div.absolute {
  position: absolute;
  top: 80px;
  right: 0;
  width: 200px;
  height: 100px;
  border: 3px solid #73AD21;
}
```
![text](https://codersnack.com/assets/images/css-position-absolute.png)

#### position sticky
An element with position: sticky  is **positioned based on the user's scroll position**.

A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed).


> Note: Internet Explorer, Edge 15 and earlier versions do not support sticky positioning. Safari requires a -webkit- prefix (see example below). You must also specify at least one of top, right, bottom or left for sticky positioning to work.

In this example, the sticky element sticks to the top of the page (top: 0), when you reach its scroll position.

**Example**
``` 
div.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: green;
  border: 2px solid #4CAF50;
}
```
![text](https://codersnack.com/assets/images/css-position-sticky.png)

#### Overlapping Elements
When elements are positioned, they can overlap other elements.

The **z-index** property **specifies the stack order of an element** (which element should be placed in front of, or behind, the others).

An element can have a *positive or negative stack order*:

Im this example because the image has a z-index of -1, it will be placed behind the text.
**Example**
``` 
img {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: -1;
}
```
![text](https://codersnack.com/assets/images/css-zindex.png)

**An element with greater stack order is always in front of an element with a lower stack order**.

> Note: If two positioned elements overlap without a z-index specified, the element positioned last in the HTML code will be shown on top.

