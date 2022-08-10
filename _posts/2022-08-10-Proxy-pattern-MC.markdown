---
layout: main-content-post
title:  Proxy pattern
date:   2020-02-04T10:12:00.319Z
permalink: /js-design-patterns-proxy/main-content/
icon: https://codersnack.com/assets/images/design-patterns.jpg
categories: [snack-main-content-post]
---

This is a *structural design pattern* that behaves exactly as its name suggests. It **acts as a surrogate or placeholder for another object to control access to it**.

**It is usually used in situations in which a target object is under constraints and may not be able to handle all its responsibilities efficiently**. A proxy, in this case, usually provides the same interface to the client and adds a level of indirection to support controlled access to the target object to avoid undue pressure on it.

The proxy pattern can be **very useful when working with network request-heavy applications** to avoid unnecessary or redundant network requests.

In this **example**, *we will use two new **ES6 features, Proxy and Reflect**.*:
- **A Proxy object is used to define custom behaviour for fundamental operations of a JavaScript object** (remember, function and arrays are also object in JavaScript). It is a constructor method that can be used to create a Proxy object. It accepts a target object that is to be proxied and a handler object that will define the necessary customisation. The handler object allows for defining some trap functions like get, set, has, apply, etc. that are used to add custom behaviour attached to their usage. 
- **Reflect, on the other hand, is a built-in object that provides similar methods that are supported by the handler object of Proxy as static methods on itself**. It is not a constructor; its static methods are used for intercept-able JavaScript operations.

Now, we create a function that can be thought of as a network request. We named it as *networkFetch*. It accepts a URL and responds accordingly. We want to implement a proxy where *we only get the response from the network if it is not available in our cache. Otherwise, we just return a response from the cache*.

The *cache global variable will store our cached responses*. We create a proxy named *proxiedNetworkFetch* with our original *networkFetch* as the targetand use apply method in our handler object to proxy the function invocation. The *apply* method gets passed on the target object itself. This value as *thisArg* and the arguments are passed to it in an array-like structure args.

We check if the passed url argument is in the cache. If it exists in the cache, we return the response from there, never invoking the original target function. If it does not, then we use the *Reflect.apply* method to invoke the *targetfunction* with *thisArg* (although it’s not of any significance in our case here) and the arguments it passed.

```
// Target
function networkFetch(url) {
  return `${url} - Response from network`;
}

// Proxy
// ES6 Proxy API = new Proxy(target, handler);
const cache = [];
const proxiedNetworkFetch = new Proxy(networkFetch, {
  apply(target, thisArg, args) {
    const urlParam = args[0];
    if (cache.includes(urlParam)) {
      return `${urlParam} - Response from cache`;
    } else {
      cache.push(urlParam);
      return Reflect.apply(target, thisArg, args);
    }
  },
});

// usage
console.log(proxiedNetworkFetch('dogPic.jpg')); // 'dogPic.jpg - Response from network'
console.log(proxiedNetworkFetch('dogPic.jpg')); // 'dogPic.jpg - Response from cache'
```