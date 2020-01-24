---
layout: post
title:  CSS Flexbox Properties for flex container (2)
date:   2020-01-24T12:47:20.146Z
permalink: /css-flexbox-properties-parent-2/
categories: jekyll update
---
These snacks will core these flex properties: flex-flow, justify-content and align-items

#### flex-flow
Applies to: parent flex container element
This is a **shorthand for the flex-direction and flex-wrap properties**, which together define the flex container's main and cross axes. The default value is row nowrap.

``` 
 flex-flow: <‘flex-direction’> || <‘flex-wrap’>
``` 
 

#### justify-content
![flex items within a flex container demonstrating the different spacing options
](https://codersnack.com/assets/images/css-justify-content.png)

This **defines the alignment along the main axis**. It helps distribute extra free space leftover when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.

``` 
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
}
``` 

- flex-start (default): items are packed toward the start of the flex-direction.
- flex-end: items are packed toward the end of the flex-direction.
- start: items are packed toward the start of the writing-mode direction.
- end: items are packed toward the end of the writing-mode direction.
- left: items are packed toward left edge of the container, unless that doesn't make sense with the flex-direction, then it behaves like start.
- right: items are packed toward right edge of the container, unless that doesn't make sense with the flex-direction, then it behaves like start.
- center: items are centered along the line
- space-between: items are evenly distributed in the line; first item is on the start line, last item on the end line
- space-around: items are evenly distributed in the line with equal space around them. Note that visually the spaces aren't equal, since all the items have equal space on both sides. The first item will have one unit of space against the container edge, but two units of space between the next item because that next item has its own spacing that applies.
- space-evenly: items are distributed so that the spacing between any two items (and the space to the edges) is equal.

> Note that that browser support for these values is nuanced. For example, space-between never got support from some versions of Edge, and start/end/left/right aren't in Chrome yet. MDN has detailed charts. The safest values are flex-start, flex-end, and center.

There are also two additional keywords you can pair with these values: **safe and unsafe**. Using safe ensures that however you do this type of positioning, you can't push an element such that it renders off-screen (e.g. off the top) in such a way the content can't be scrolled too (called "data loss").

#### align-items
![demonstration of differnet alignment options, like all boxes stuck to the top of a flex parent, the bottom, stretched out, or along a baseline
](https://codersnack.com/assets/images/css-flex-align-items.png)

This **defines the default behavior for how flex items are laid out along the cross axis** on the current line. Think of it as the justify-content version for the cross axis (perpendicular to the main-axis).

``` 
.container {
  align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
}
```  
- stretch (default): stretch to fill the container (still respect min-width/max-width)
- flex-start / start / self-start: items are placed at the start of the cross axis. The difference between these is subtle, and is about respecting the flex-direction rules or the writing-mode rules.
- flex-end / end / self-end: items are placed at the end of the cross axis. The difference again is subtle and is about respecting flex-direction rules vs. writing-mode rules.
- center: items are centered in the cross-axis
- baseline: items are aligned such as their baselines align

The safe and unsafe modifier keywords can be used in conjunction with all the rest of these keywords (although note browser support), and deal with helping you prevent aligning elements such that the content becomes inaccessible.

### - References -

null
