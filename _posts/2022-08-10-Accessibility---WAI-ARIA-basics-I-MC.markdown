---
layout: main-content-post
title:  Accessibility - WAI-ARIA basics I
date:   2022-02-09T11:03:24.916Z
permalink: /ux-accessibility-wai-aria/main-content/
icon: https://codersnack.com/assets/images/ux-logo.png
categories: [snack-main-content-post]
---

Following on from the previous article, **sometimes making complex UI controls that involve unsemantic HTML and dynamic JavaScript-updated content can be difficult**. **WAI-ARIA is a technology that can help with such problems by adding in further semantics that browsers and assistive technologies can recognize and use to let users know what is going on**. Here we'll show how to use it at a basic level to improve accessibility.

**Objective**:	To gain familiarity with WAI-ARIA, and how it can be used to provide useful additional semantics to enhance accessibility where required.


###   What is WAI-ARIA?

Let's start by looking at what WAI-ARIA is, and what it can do for us.


####  A whole new set of problems

As web apps started to get more complex and dynamic, a new set of accessibility features and problems started to appear.

For example, HTML5 introduced a number of semantic elements to define common page features (```<nav>```, ```<footer>```, etc.) Before these were available, developers would use ```<div>```s with IDs or classes, e.g. ```<div class="nav">```, but these were problematic, as **there was no easy way to easily find a specific page feature such as the main navigation programmatically.**

**The initial solution was to add one or more hidden links at the top of the page** to link to the navigation (or whatever else), for example:

```
<a href="#hidden" class="hidden">Skip to navigation</a>
```

But this is **still not very precise,** and can only be used when the screenreader is reading from the top of the page.

As another example, apps started to **feature complex controls like date pickers** for choosing dates, sliders for choosing values, etc. HTML5 provides special input types to render such controls:

```
<input type="date">
<input type="range">
```

These are not well-supported across browsers, and it is also difficult to style them, making them not very useful for integrating with website designs. As a result, **developers quite often rely on JavaScript libraries that generate such controls as a series of nested ```<div>```s or table elements with classnames, which are then styled using CSS and controlled using JavaScript**.

**The problem here is that visually they work, but screenreaders can't make any sense of what they are at all**, and their users just get told that they can see a jumble of elements with no semantics to describe what they mean.


###  Enter WAI-ARIA

***WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications)* is a specification written by the W3C, defining a set of additional HTML attributes that can be applied to elements to provide additional semantics and improve accessibility wherever it is lacking**. There are **three main features** defined in the spec:

- **Roles** — **These define what an element is or does**. Many of these are so-called **landmark roles**, which largely duplicate the semantic value of HTML5 structural elements e.g. *role="navigation"* (```<nav>```) or role="complementary" (```<aside>```), but there are also others that describe different pages structures, such as *role="banner",* role="search", role="tablist", role="tab", etc., which are commonly found in UIs.

- **Properties** — **These define properties of elements, which can be used to give them extra meaning or semantics**. As an example, *aria-required="true"* specifies that a form input needs to be filled in order to be valid, whereas *aria-labelledby="label"* allows you to put an ID on an element, then reference it as being the label for anything else on the page, including multiple elements, which is not possible using ```<label for="input">```. As an example, you could use aria-labelledby to specify that a key description contained in a ```<div>``` is the label for multiple table cells, or you could use it as an alternative to image alt text — specify existing information on the page as an image's alt text, rather than having to repeat it inside the alt attribute. You can see an example of this at Text alternatives.

- **States** — **Special properties that define the current conditions of elements**, such as *aria-disabled="true"*, which **specifies to a screenreader that a form input is currently disabled**. States differ from properties in that properties don't change throughout the lifecycle of an app, whereas states can change, generally programmatically via JavaScript.

**An important point about WAI-ARIA attributes is that they don't affect anything about the web page, except for the information exposed by the browser's accessibility APIs** (where screenreaders get their information from). WAI-ARIA doesn't affect webpage structure, the DOM, etc., **although the attributes can be useful for selecting elements by CSS.**

> **Note**: You can find a useful list of all the ARIA roles and their uses, with links to further information, in the WAI-ARIA spec — see Definition of Roles — on on this site — see ARIA roles.
The spec also contains a list of all the properties and states, with links to further information — see Definitions of States and Properties (all aria-* attributes).


####  Where is WAI-ARIA supported?

This is not an easy question to answer. It is **difficult to find a conclusive resource that states what features of WAI-ARIA are supported**, and where, because:

- There are a lot of features in the WAI-ARIA spec.
- There are many combinations of operating system, browser, and screenreader to consider.

This last point is key — **To use a screenreader in the first place, your operating system needs to run browsers that have the necessary accessibility APIs in place to expose the information screenreaders need to do their job**. Most popular OSes have one or two browsers in place that screenreaders can work with. The Paciello Group has a fairly up-to-date post that provides data for this — see [Rough Guide: browsers, operating systems and screen reader support updated](https://www.paciellogroup.com/blog/2014/10/rough-guide-browsers-operating-systems-and-screen-reader-support-updated/).

Next, **you need to worry about whether the browsers in question support ARIA features** and expose them via their APIs, but also whether screenreaders recognize that information and present it to their users in a useful way.

- Browser support is generally quite good — at the time of writing, caniuse.com stated that **global browser support for WAI-ARIA was around 88%**.

- **Screenreader support for ARIA features isn't quite at this level, but the most popular screenreaders are getting there**. You can get an idea of support levels by looking at Powermapper's [WAI-ARIA Screen reader compatibility](https://www.powermapper.com/tests/screen-readers/aria/) article.

In this article, we won't attempt to cover every WAI-ARIA feature, and its exact support details. Instead, **we will cover the most critical WAI-ARIA features for you to know about**; if we don't mention any support details, you can assume that the feature is well-supported. We will clearly mention any exceptions to this.

> **Note**: Some JavaScript libraries support WAI-ARIA, meaning that when they generate UI features like complex form controls, they add ARIA attributes to improve the accessibility of those features. If you are looking for a 3rd party JavaScript solution for rapid UI development, you should definitely consider the accessibility of its UI widgets as an important factor when making your choice. Good examples are **jQuery UI** (see About jQuery UI: Deep accessibility support), ExtJS, and Dojo/Dijit.


####  When should you use WAI-ARIA?

We talked about some of the problems that prompted WAI-ARIA to be created earlier on, but essentially, there are four main areas that WAI-ARIA is useful in:

- **Signposts/Landmarks**: ARIA's role attribute values can act as landmarks that either **replicate the semantics of HTML5 elements** (e.g. ```<nav>```), or go beyond HTML5 semantics to provide signposts to different functional areas, e.g search, tablist, tab, listbox, etc.

- **Dynamic content updates**: **Screenreaders tend to have difficulty with reporting constantly changing content; with ARIA we can use aria-live to inform screenreader users when an area of content is updated**, e.g. via XMLHttpRequest, or DOM APIs.

- **Enhancing keyboard accessibility**: **There are built-in HTML elements that have native keyboard accessibility**; when other elements are used along with JavaScript to simulate similar interactions, keyboard accessibility and screenreader reporting suffers as a result. Where this is unavoidable, **WAI-ARIA provides a means to allow other elements to receive focus (using *tabindex*)**.

- **Accessibility of non-semantic controls**: **When a series of nested ```<div>```s along with CSS/JavaScript is used to create a complex UI-feature, or a native control is greatly enhanced/changed via JavaScript, accessibility can suffer** — screenreader users will find it difficult to work out what the feature does if there are no semantics or other clues. In these situations,** ARIA can help to provide what's missing with a combination of roles like button, listbox, or tablist, and properties like *aria-required *or *aria-posinset* to provide further clues as to functionality.**

One thing to remember though — **you should only use WAI-ARIA when you need to! Ideally, you should always use native HTML features** to provide the semantics required by screenreaders to tell their users what is going on. Sometimes this isn't possible, either because you have limited control over the code, or **because you are creating something complex that doesn't have an easy HTML element to implement it. In such cases, WAI-ARIA can be a valuable accessibility enhancing tool.**

But again, only use it when necessary!

**Note**: Also, try to make sure you **test your site with a variety of real users — non-disabled people, people using screenreaders, people using keyboard navigation, etc**. They will have better insights than you about how well it works.


###  Practical WAI-ARIA implementations

**In the next section we'll look at the four areas in more detail, along with practical examples**. Before you continue, you should get a screenreader testing setup put in place, so you can test some of the examples as you go through.

See our section on [testing screenreaders](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Accessibility#screenreaders) for more information.


####  Signposts/Landmarks

**WAI-ARIA adds the role attribute to browsers, which allows you to add extra semantic value to elements on your site wherever they are needed**. The first major area in which this is useful is providing information for screenreaders so that their users can find common page elements. Let's look at an example — our **website-no-roles example** (see it live) has the following structure:

```
<header>
  <h1>...</h1>
  <nav>
    <ul>...</ul>
    <form>
      <!-- search form  -->
    </form>
  </nav>
</header>

<main>
  <article>...</article>
  <aside>...</aside>
</main>

<footer>...</footer>
```

If you try testing the example with a screenreader in a modern browser, you'll already get some useful information. For example, **VoiceOver gives you the following**:

On the ```<header>``` element — "banner, 2 items" (it contains a heading and the ```<nav>```).
On the ```<nav>``` element — "navigation 2 items" (it contains a list and a form).
On the ```<main>``` element — "main 2 items" (it contains an article and an aside).
On the ```<aside>``` element — "complementary 2 items" (it contains a heading and a list).
On the search form input — "Search query, insertion at beginning of text".
On the ```<footer>``` element — "footer 1 item".

If you go to VoiceOver's landmarks menu (accessed using VoiceOver key + U and then using the cursor keys to cycle through the menu choices), you'll see that most of the elements are nicely listed so they can be accessed quickly.

However, we could do better here. **The search form is a really important landmark that people will want to find,** but it is not listed in the landmarks menu or treated like a notable landmark, beyond the actual input being called out as a search input (```<input type="search">```). In addition, some older browsers (most notably IE8) don't recognize the semantics of the HTML5 elements.

**Let's improve it by the use of some ARIA features. First, we'll add some role attributes to our HTML structure**. You can try taking a copy of our original files (see index.html and style.css), or navigating to our **website-aria-roles example** (see it live), which has a structure like this:

```
<header>
  <h1>...</h1>
  <nav role="navigation">
    <ul>...</ul>
    <form role="search">
      <!-- search form  -->
    </form>
  </nav>
</header>

<main>
  <article role="article">...</article>
  <aside role="complementary">...</aside>
</main>

<footer>...</footer>
```

We've also given you a **bonus feature** in this example — the ```<input>``` element has been given the **attribute aria-label, which gives it a descriptive label to be read out by a screenreader**, even though we haven't included a ```<label>``` element. In cases like these, this is very useful — a search form like this one is a very common, easily recognized feature, and adding a visual label would spoil the page design.

```
<input type="search" name="q" placeholder="Search query" aria-label="Search through site content">
```

Now if we use VoiceOver to look at this example, we get some improvements:

- The search form is called out as a separate item, both when browsing through the page, and in the Landmarks menu.
- The label text contained in the aria-label attribute is read out when the form input is highlighted.

**Beyond this, the site is more likely to be accessible to users of older browsers such as IE8**; it is worth including ARIA roles for that purpose. And if for some reason your site is built using just ```<div>```s, you should definitely include the ARIA roles to provide these much needed semantics!

The improved semantics of the search form have shown what is made possible when ARIA goes beyond the semantics available in HTML5. You'll see a lot more about these semantics and the power of ARIA properties/attributes below, especially in the Accessibility of non-semantic controls section. For now though, let's look at how ARIA can help with dynamic content updates.


####  Dynamic content updates

Content loaded into the DOM can be easily accessed using a screenreader, from textual content to alternative text attached to images. Traditional static websites with largely text content are therefore easy to make accessible for people with visual impairments.

The problem is that modern web apps are often not just static text — they tend to have a lot of dynamically updating content, i.e. content that updates without the entire page reloading via a mechanism like XMLHttpRequest, Fetch, or DOM APIs. These are sometimes referred to as live regions.

Let's look at a quick example — see **aria-no-live.html** (also see it running live). In this example we have a simple random quote box:
```
<section>
  <h1>Random quote</h1>
  <blockquote>
    <p></p>
  </blockquote>
</section>
```

Our JavaScript loads a *JSON* file via *XMLHttpRequest* containing a series of random quotes and their authors. Once that is done, we start up a *setInterval()* loop that loads a new random quote into the quote box every 10 seconds:

```
let intervalID = window.setInterval(showQuote, 10000);
```

This works OK, but it is not good for accessibility — **the content update is not detected by screenreaders, so their users would not know what is going on**. This is a fairly trivial example, but just imagine if you were creating a complex UI with lots of constantly updating content, like a chat room, or a strategy game UI, or a live updating shopping cart display — it would be impossible to use the app in any effective way without some kind of way of alerting the user to the updates.

**WAI-ARIA fortunately provides a useful mechanism to provide these alerts — the *aria-live* property**. Applying this to an element causes screenreaders to read out the content that is updated. How urgently the content is read out depends on the attribute value:

- off: The default. Updates should not be announced.
- polite: Updates should be announced only if the user is idle.
- assertive: Updates should be announced to the user as soon as possible.

We'd like you to take a copy of aria-no-live.html and quotes.json, and update your ```<section>``` tag as follows:

```
<section aria-live="assertive">
```

**This will cause a screenreader to read out the content as it is updated**.

> **Note**: Most browsers will throw a security exception if you try to do an XMLHttpRequest call from a file:// URL, e.g. if you just load the file by loading it directly into the browser (via double clicking, etc.). To get it to run, you will need to upload it to a web server, for example using GitHub, or a local web server like Python's SimpleHTTPServer.

There is an additional consideration here — only the bit of text that updates is read out. It might be nice if we always read out the heading too, so the user can remember what is being read out. To do this, we can add the ***aria-atomic* property** to the section. Update your ```<section>``` tag again, like so:

```
<section aria-live="assertive" aria-atomic="true">
```

The *aria-atomic="true"* attribute **tells screenreaders to read out the entire element contents as one atomic unit, not just the bits that were updated**.

> **Note**: You can see the finished example at aria-live.html (see it running live).

------

> **Note**: The **aria-relevant** property is also quite useful for controlling what gets read out when a live region is updated. You can for example only get content additions or removals read out