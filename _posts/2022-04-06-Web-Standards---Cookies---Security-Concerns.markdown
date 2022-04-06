---
layout: post
title:  Web Standards - Cookies - Security Concerns
date:   2022-04-06T13:44:49.786Z
permalink: /web-standards-cookies-security-concerns/
icon: https://codersnack.com/assets/images/web-standards-logo.png
categories: [snackpost]
---

> Information drawn from 
- [Everything You Need to Know About Cookies for Web Development - Kris Koishigawa](https://www.freecodecamp.org/news/everything-you-need-to-know-about-cookies-for-web-development/)


##  Security concerns with cookies

In general, cookies are very secure when implemented correctly. Browsers have a lot of built-in limitations that we covered earlier, partly due to the age of the technology, but also to improve security.

Still, **there are a few ways that a bad actor can steal your cookie and use it to wreak havoc**.

We'll go over some common ways this can happen, and look at different ways to fix it.

Also, note that any code snippets will be in vanilla JavaScript. If you want to implement these fixes on the server, you'll need to look up the exact syntax for your language or framework.


###   Man-in-the-middle attacks

A man-in-the-middle (MitM) attack describes a broad category of attacks where an **attacker sits between a client and a server and intercepts the data going between the two**.

![man-in-the-middle-attack-how-avoid](https://codersnack.com/assets/images/man-in-the-middle-attack-how-avoid.png)

This can be done in a **lot of ways**: by gaining access to or listening in on an **insecure website**, **mimicking** a public WiFi **router**, DNS **spoofing**, or through **malware** / adware like SuperFish.

Here's a high-level overview of MitM attacks, and how websites can protect themselves and their users:  [Video](https://youtu.be/8OR2dDIaIDw?t=57)

As a developer, you can greatly reduce the chance of a MitM attack by ensuring that you **enable HTTPS on your server**, use an SSL certificate from a trusted certificate authority, and **ensure your code uses HTTPS instead of the insecure HTTP**.

In terms of **cookies**, you should add the ***Secure* attribute to your cookies so they can only be sent over a secure HTTPS connection**:
```
document.cookie = 'dark_mode=false; Secure';
```

Just remember that the Secure attribute **doesn't actually encrypt any data in your cookie** – it just ensures that the cookie can't be sent over an HTTP connection.

However,**a bad actor could still possibly intercept and manipulate the cookie**. To prevent this from happening, you can also **use the *HttpOnly* parameter**:

```
document.cookie = 'dark_mode=false; Secure; HttpOnly';
```

**Cookies with *HttpOnly* can only be accessed by the server, and not by the browser's Document.cookie API**. This is perfect for things like a login session, where only the server really needs to know if you're signed into a site, and you don't need that information client side.


###  XSS attacks

An **XSS (cross-site scripting) attack** describes a category of attacks **when a bad actor injects unintended, potentially dangerous code into a website**.

These attacks are very problematic because they could affect every person that visits the site.


![cross-site-scripting](https://codersnack.com/assets/images/cross-site-scripting.svg)

> For example, if a site has a comments section and someone is able to include malicious code as a comment, it's possible that every person who visits the site and reads that comment will be affected.

**In terms of *cookies*, if a bad actor pulls off a successful XSS attack on a site, they could gain access to session cookies and access the site as another signed in user**. From there, they may be able to access the other user's settings, buy things as that user and have it shipped to another address, and so on.

Here's a video that gives a high-level overview of the different types of XSS – Reflected, Stored, DOM-based, and Mutation:  [video](https://youtu.be/EoaDgUgS6QA)

As a developer, you'll want to **ensure that your server enforces the *Same Origin Policy***, and that **any input you receive from people is properly  sanitized**.

And like with preventing MitM attacks, **you should set the *Secure* and *HttpOnly*** parameters with any cookies you use:
```
document.cookie = 'dark_mode=false; Secure; HttpOnly';
```

###   CSRF attacks

A **CSRF (cross-site request forgery) attack** is **when a bad actor tricks a person into carrying out an unintended, potentially malicious action**.

> For example, if you're signed into a site and click on a link in a comment, if that link is part of a CSRF attack, it may lead to you unintentionally changing your sign in details, or even deleting your account.

![cross-site-request-forgery](https://codersnack.com/assets/images/cross-site-request-forgery.svg)

While CSRF attacks are somewhat related to XSS attacks, specifically reflected XSS attacks where someone inserts malicious code into a site, each preys on a different type of trust.

According to Wikipedia, while XSS "exploits the trust a user has for a particular site, CSRF exploits the trust that a site has in a user's browser."

Here's a video that explains the basics of CSRF, and gives some useful examples
[video](https://youtu.be/eWEgUcHPle0)

As for **cookies**, one way to **prevent possible CSRF attacks is with the *SameSite* flag**:

```
document.cookie = 'dark_mode=false; Secure; HttpOnly; SameSite=Strict';
```

There are a few values you can set for SameSite:

- **Lax**: **Cookies are not sent for embedded content (images, iframes, etc.) but are sent when you click on a link or send a request to the origin the cookie is set for**. For example, if you're on testing.com and you click on a link to go to test.com/about, your browser will send your cookie for test.com with that request

- **Strict**: **Cookies are only sent when you click on a link or send a request from the origin the cookie is set for**. For example, your test.com cookie will only be sent while you're in and around test.com, and not coming from other sites like testing.com

- **None**: **Cookies will be sent with every request, regardless of context.** If you set SameSite to None, you must also add the Secure attribute. It's better to avoid this value if possible

> Major browsers handle SameSite a bit differently. For example, if SameSite isn't set on a cookie, Google Chrome sets it to Lax by default.


##  Tracking and privacy

###  Third-party cookies

**A cookie is associated with a particular domain and scheme (such as http or https), and may also be associated with subdomains if the *Set-Cookie Domain* attribute is set.** If the cookie domain and scheme match the current page, the cookie is considered to be from the same site as the page, and is referred to as a ***first-party cookie***.

**If the domain and scheme are different, the cookie is not considered to be from the same site, and is referred to as a *third-party cookie***. While the server hosting a web page sets first-party cookies, the page may contain images or other components stored on servers in other domains (for example, ad banners) that may set third-party cookies. These are **mainly used for advertising and tracking across the web**. For example, the types of cookies used by Google.

**A third-party server can create a profile of a user's browsing history and habits based on cookies sent to it by the same browser when accessing multiple sites**. 

Firefox, by default, blocks third-party cookies that are known to contain trackers. Third-party cookies (or just tracking cookies) may also be blocked by other browser settings or extensions. Cookie blocking can cause some third-party components (such as social media widgets) not to function as intended.

> **Note**: Servers can (and should) set the cookie **SameSite** attribute to specify whether or not cookies may be sent to third party sites.


###  Cookie-related regulations

Legislation or regulations that cover the use of cookies include:

- The General Data Privacy Regulation (GDPR) in the European Union
- The ePrivacy Directive in the EU
- The California Consumer Privacy Act

**These regulations have global reach**. They apply to any site on the World Wide Web that users from these jurisdictions access (the EU and California, with the caveat that California's law applies only to entities with gross revenue over 25 million USD, among things).

These regulations include requirements such as:

- Notifying users that your site uses cookies.
- Allowing users to opt out of receiving some or all cookies.
- Allowing users to use the bulk of your service without receiving cookies.

There may be other regulations that govern the use of cookies in your locality. The burden is on you to know and comply with these regulations. There are companies that offer "**cookie banner**" code that helps you comply with these regulations.

