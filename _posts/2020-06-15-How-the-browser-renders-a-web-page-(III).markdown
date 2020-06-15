---
layout: post
title:  How the browser renders a web page? (III)
date:   2020-02-24T22:10:39.462Z
permalink: /web-performance-how-browser-renders-3/
icon: https://codersnack.com/assets/images/web-performance.png
categories: [snackpost]
---

### - References -

- [Uday Hiwarale - How the Browser renders a web page?](https://itnext.io/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969)

### Render blocking CSS & DOMContentLoaded

Now that we understood how the browser renders a web page from some HTML Text to individual pixels on the screen, **we need to understand how we can make this process efficient for better user experience**.

A typical web page contains HTML, JavaScript and CSS. **The browser constructs the DOM by parsing HTML from top to bottom. If there is an embedded JavaScript and CSS, it will be parsed synchronously**.

But if the browser encounters ``` <link rel="stylesheet">```  element which is used to load external CSS, it will send a request to fetch .css file asynchronously and again move on to parse other HTML elements below it.

However, that’s not the case with ``` <script src=""> ```  elements which load external JavaScript files. Whenever the browser encounters external JavaScript, DOM construction is stopped until the JavaScript file is downloaded and parsed.

The DOMContentLoaded is fired by the browser on document object when DOM is fully constructed. But that’s not a whole picture. Since you can modify the CSS styles of a DOM element, your CSSOM also needs to be ready. Hence, ***DOMContentLoaded* can be safely fired when both DOM and CSSOM is constructed and Render-Tree is about to be constructed**.
DOMContentLoaded event **differs from *window.onload*** event in one aspect. As we know JavaScript can block DOM creation, that’s not the case with external stylesheets and files (like images, videos, etc.). ***DOMContentLoaded* event marks a point where all external JavaScript is parsed and DOM is fully ready, *window.onload* events marks a point where external stylesheets and files are downloaded and our webpage is completely ready.**

**But there is a caveat**. CSS is a render-blocking resource which means until external CSS is downloaded and parsed, the browser will not render anything on the screen. Technically, that means it will block CSSOM from being fully constructed, so critical rendering path is stuck. This also means as CSSOM construction blocked, our DOMContentLoaded event won’t be fired by the browser. So **we can say that external stylesheets might load asynchronously, but they will be parsed synchronously**.

We can **visualize this in *Chrome DevTools console***. Going forward, let’s take the below example to test the critical rendering path. Inside the project repository, I have set up an express server to provide custom delays in external files, like for example, request for style.css will be resolved after 5000ms.
```
<html lang='en'>
    <head>
        <title>Rendering Test</title>
        <link rel='stylesheet' href='/5000/css/style.css'>
    </head>
    <body>
        <img src="/10000/res/nature.jpg" />
        
        <h1>I am first!</h1>
        
        <script src="/1000/js/main.js"></script>
        
        <h2>I am second!</h2>
        
        <script src="/2000/js/common.js"></script>
        
        <h3>I am third!</h3>
        <script src="/3000/js/vendor.js"></script>
    </body>
</html>
```
![text](https://codersnack.com/assets/images/web-performance-browser-renders-domcontentloaded-0.png)

From the above screenshot, we can tell that *DOMContentLoaded* the event was fired after 6.5s which is labelled with DCL while *window.onload* event was fired after 10s which is labelled with L.

Let’s see the network panel and see how the browser is treating each resource individually. We are also logging DCL and L events.

![text](https://codersnack.com/assets/images/web-performance-browser-renders-domcontentloaded.gif)

As you can see from the above screen recording, since the first external resource encountered while parsing DOM is an external CSS, hence request to fetch it was sent browser started loading it asynchronously. As CSS was loading in the background, normal DOM parsing continued and another external resource encountered which was a JavaScript file.

DOM parsing stopped until JavaScript was loaded and parsed. This happened three times for three external JavaScript files. Once all JavaScript is loaded and DOM is constructed, browser waited for the stylesheet to load and parsed, after which it fired *DOMContentLoaded* after 5.3s.

We also had another external resource which is an image file and it keeps loading in the background. After it was loaded, window.onload event was fired after 10.2s.

**But beware!** Even though from the above simulation is looked like CSS was loading in the background while DOM and JavaScript parsing were continued. **What if your JavaScript code was accessing DOM element’s style property which was supposed to be provided by CSSOM and it wasn’t ready yet because external stylesheet was still loading**.

To prevent such scenarios, the browser might load external JavaScript in a synchronous manner, but it won't parse the JavaScript and halt building DOM until CSSOM is ready.

Since now we understood that both JavaScript and CSS can block critical rendering path, **what we can do about it?** Well for the starters, you can **optimize your CSS and make sure that it loads faster**. You can **load your JavaScript asynchronously using *async* or *defer* attributes.**

**You can add *media* attributes to your external stylesheet** elements which will be loaded and parsed asynchronously based on environmental conditions.

### Browser engine
**The job of creating DOM Tree, CSSOM Tree and handle rendering logic is done using a piece of software called as Browser Engine** also called as Rendering Engine or Layout Engine. These Browser engines contain all the necessary elements and logic to render a web page from HTML file to actual pixels on the screen.

If you have ever heard of **WebKit**, all the time, you were talking about a browser engine. WebKit is used by Apples **Safari** browser and was default rendering engine for Google Chrome browser. As of now, the **Chromium** project uses **Blink** as the default rendering engine. Here is a list of different browser engine used by some of the top web browsers.

