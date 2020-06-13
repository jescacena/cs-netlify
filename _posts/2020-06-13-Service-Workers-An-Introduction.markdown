---
layout: post
title:  Service Workers An Introduction
date:   2020-06-08T19:32:56.585Z
permalink: /pwa-service-workers-introduction/
icon: https://codersnack.com/assets/images/pwa-icon.png
categories: [snackpost]
---
**Rich offline experiences, periodic background syncs, push notifications**—functionality that would normally require a native application—are coming to the web. **Service workers provide the technical foundation that all these features rely on**.

## What is a service worker
**A service worker is a script that your browser runs in the background, separate from a web page**, opening the door to **features that don't need a web page or user interaction**. Today, they already include features like **push notifications** and **background sync**. In the future, service workers might support other things like *periodic sync* or *geofencing*. The core feature discussed in this tutorial is the ability to **intercept and handle network requests, including programmatically managing a cache of responses**.

The reason this is such an exciting API is that it allows you to support offline experiences, giving developers complete control over the experience.

> **Before service worker**, there was one other API that gave users an offline experience on the web called **AppCache**. There are a number of issues with the AppCache API that service workers were designed to avoid.

Things to note about a service worker:

- It's a JavaScript Worker, so it **can't access the DOM directly**. Instead, a service worker can *communicate with the pages it controls by responding to messages sent via the postMessage* interface, and those pages can manipulate the DOM if needed.
- Service worker is a **programmable network proxy**, allowing you to control how network requests from your page are handled.
- It's terminated when not in use, and restarted when it's next needed, so **you cannot rely on global state within a service worker's onfetch and onmessage handlers**. If there is information that **you need to persist** and reuse across restarts, service workers do have access to the **IndexedDB API**.
- Service workers **make extensive use of promises**, so if you're new to promises, then you should stop reading this and check out *Promises*, an introduction.


## The service worker life cycle
A service worker has a **lifecycle that is completely separate from your web page**.

**To install a service worker for your site, you need to register it**, which *you do in your page's JavaScript*. Registering a service worker will cause the browser to start the service worker install step in the background.

**Typically during the install step, you'll want to cache some static assets**. If all the files are cached successfully, then the service worker becomes installed. If any of the files fail to download and cache, then the install step will fail and the service worker won't activate (i.e. won't be installed). If that happens, don't worry, it'll try again next time. But that means if it does install, you know you've got those static assets in the cache.

**When installed, the activation step will follow** and this is a great opportunity for *handling any management of old caches*, which we'll cover during the service worker update section.

**After the activation step, the service worker will control all pages that fall under its scope**, though the page that registered the service worker for the first time won't be controlled until it's loaded again. **Once a service worker is in control, it will be in one of two states**: 
- either the service worker *will be terminated to save memory,*
- or it will *handle fetch and message events* that occur when a network request or message is made from your page.


Below is an overly simplified version of the service worker lifecycle on its first installation.


![service worker lifecycle](https://codersnack.com/assets/images/sw-lifecycle.png)


## Prerequisites

### Browser support

Browser options are growing. Service workers are supported by Chrome, Firefox and Opera. Microsoft Edge is now showing public support. Even Safari has dropped hints of future development. You can follow the progress of all the browsers at Jake Archibald's is Serviceworker ready site.

### You need HTTPS
During development you'll be able to use service worker through localhost, but **to deploy it on a site you'll need to have HTTPS setup on your server**.

> Using service worker you **can hijack connections, fabricate, and filter responses**. Powerful stuff. While you would use these powers for good, a man-in-the-middle might not. To avoid this, you can only register service workers on pages served over HTTPS, so we know the service worker the browser receives hasn't been tampered with during its journey through the network.

GitHub Pages are served over HTTPS, so they're a great place to host demos.

> If you want to add HTTPS to your server then you'll need to get a TLS certificate and set it up for your server. This varies depending on your setup, so check your server's documentation and be sure to check out Mozilla's SSL config generator for best practices.

## Register a service worker
To install a service worker you need to kick start the process by registering it in your page. This **tells the browser where your service worker JavaScript file lives**.

```
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
```

This code checks to see if the service worker API is available, and if it is, the service worker at */sw.js* is registered once the page is loaded.

> You can call *register()* every time a page loads without concern; the browser will figure out if the service worker is already registered or not and handle it accordingly.

One subtlety with the *register()* method is the location of the service worker file. You'll notice in this case that the **service worker file is at the root of the domain**. This means that the service worker's scope will be the entire origin. In other words, **this service worker will receive fetch events for everything on this domain**. If we register the service worker file at /example/sw.js, then the service worker would only see fetch events for pages whose URL starts with /example/ (i.e. /example/page1/, /example/page2/).

Now you can check that a service worker is enabled by going to ```chrome://inspect/#service-workers``` and looking for your site.

## Inspect service workers

When service worker was first being implemented, you could also view your service worker details through ```chrome://serviceworker-internals```. This may still be useful, if for nothing more than learning about the life cycle of service workers, but don't be surprised if it gets replaced completely by ```chrome://inspect/#service-workers``` at a later date.

**You may find it useful to test your service worker in an *Incognito window* so that you can close and reopen knowing that the previous service worker won't affect the new window**. Any registrations and caches created from within an Incognito window will be cleared out once that window is closed.

## Install a service worker

After a controlled page kicks off the registration process, let's shift to the point of view of the service worker script, which handles the install event.

For the most basic example, you need **to define a callback for the install event** and decide which files you want to cache.

```
self.addEventListener('install', function(event) {
  // Perform install steps
});
```

Inside of our install callback, we need to take the following steps:

- Open a cache.
- Cache our files.
- Confirm whether all the required assets are cached or not.

```
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
```

Here you can see we call ```caches.open()``` with our desired cache name, after which we call ```cache.addAll()``` and pass in our array of files. This is a chain of promises (*caches.open()* and *cache.addAll()*). The ```event.waitUntil()``` method takes a promise and uses it *to know how long installation takes*, and whether it succeeded or not.

**If all the files are successfully cached, then the service worker will be installed. If any of the files fail to download, then the install step will fail**. This allows you to rely on having all the assets that you defined, but does mean you **need to be careful with the list of files you decide to cache** in the install step. Defining a long list of files will increase the chance that one file may fail to cache, leading to your service worker not getting installed.


### - References -

- [Google developers - Service Workers Introduction - Matt Gaunt](https://developers.google.com/web/fundamentals/primers/service-workers)
