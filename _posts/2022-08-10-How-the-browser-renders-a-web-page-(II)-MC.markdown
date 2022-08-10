---
layout: main-content-post
title:  How the browser renders a web page? (II)
date:   2020-02-23T21:37:29.712Z
permalink: /web-performance-how-browser-renders-2/main-content/
icon: https://codersnack.com/assets/images/web-performance.png
categories: [snack-main-content-post]
---

### Render Tree

**Render-Tree is a tree-like structure constructed by combining DOM and CSSOM trees**. The browser has to calculate the layout of each visible element and paint them on the screen, for that browser uses Render-Tree. Hence, unless Render-Tree isn’t constructed, nothing will get printed on the screen.

As Render-Tree is a low-level representation of what will eventually get painted on the screen, **it won’t contain nodes that do not hold any area in the pixel matrix**. For example, display:none elements have dimensions of 0px X 0px hence they won't be present in Render-Tree.

![Web performance DOM + CSSOM tree](https://codersnack.com/assets/images/web-performance-dom-cssom.png)

As you can see from the above diagram, **Render-Tree combines DOM and CSSOM to generate a tree-like structure containing only the elements which will be printed on the screen**.

Since in CSSOM, p element inside div has *display:none* property set on it, it and its children won't be present in Render-Tree, since it occupies no space on the screen. However, if you have elements with *visibility:hidden* or opacity:0, they will occupy space on the screen hence they will be present in the Render-Tree.

Unlike DOM API which gives access to the DOM elements in the DOM tree constructed by the browser, **CSSOM is kept hidden from the user. But since browser combines DOM and CSSOM to form the Render Tree, browser exposes CSSOM node of a DOM element by providing high-level API on the DOM element itself**. This enables the developer to access or change the CSS properties of a CSSOM node.

### Rendering Sequence

When a web page is loaded, the browser first reads the TEXT HTML and constructs DOM Tree from it. Then it processes the CSS whether that is inline, embedded or external CSS and constructs the CSSOM Tree from it. After these trees are constructed, then it constructs the Render-Tree from it. Once the Render-Tree is constructed, then the browser starts the printing individual elements on the screen.

#### Layout operation

**The first browser creates the layout of each individual Render-Tree node**. The layout consists of the size of each node in pixels and where (position) it will be printed on the screen.

> This process is also called as **reflow** or **browser reflow** and it can also occur when you scroll, resize the window or manipulate DOM elements. Here is a list of events which can trigger reflow of the elements.

#### Paint operation

Until now we have a list of geometries that needs be printed on the screen. Since elements (or a sub-tree) in the Render-Tree can overlap each other and they can have properties that make them frequently change the look, position or geometry, the browser creates a layer for it.

**Creating layers helps browser efficiently perform painting operations** throughout the lifecycle of a web page for example while scrolling or resizing. Having layers also help browser correctly draw elements in the order (along the z-axis) they were intended by the developer.

Now that we have layers, we can combine them and draw it on the screen. But the browser does not draw all the layers in a single image. Each layer is drawn separately first.

Inside each layer, the browser fills the individual pixels with whatever visible property of the element is like border, background colour, shadow, text, etc. This process is also called as **rasterization**. To increase performance, the browser may use different threads to perform rasterization.

**The analogy of layers in Photoshop can be applied to how the browser renders a web page as well**. You can visualize different layers on a web page from Chrome DevTools. Open DevTools and from more tools options, select **Layers**. You can also visualize layer borders from **Rendering panel**.

**Rasterization is normally done in CPU which makes it slow and expensive but we now have new techniques to do it in GPU for performance enhancement**. 

#### Compositing operation

Until now, we haven’t drawn a single pixel on the screen. What we have are different layers (bitmap images) which should be drawn on the screen in a specific order. In compositing operations, these layers are sent to GPU to finally draw it on the screen.
Sending entire layers to draw is clearly inefficient because this has to happen every time there is a reflow or repaint. Hence, **a layer is broken down into different tiles which then will be drawn on the screen**. You can also visualize these tiles in **Chrome DevTool Rendering panel**.

From the above information, we can construct a sequence of events, the browser goes through when a web page is loaded for the first time.

![Web performance Critical Rendering path](https://codersnack.com/assets/images/critical-rendering-path.png)


These sequence of event is also called a **critical rendering path**.


