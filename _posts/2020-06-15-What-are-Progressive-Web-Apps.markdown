---
layout: post
title:  What are Progressive Web Apps?
date:   2020-06-05T08:56:44.082Z
permalink: /pwa-what-are/
icon: https://codersnack.com/assets/images/pwa-icon.png
categories: [snackpost]
---

> #### Information drawn from

- [Web.dev - What are PWAs? (Sam Richard & Pete LePage)](https://web.dev/what-are-pwas/)
- [Web.dev - How Progressive Web Apps can drive your business success? (Sébastien Fourault)](https://web.dev/drive-business-success/)

-------------

**The web is an incredible platform**. Its mix of ubiquity across devices and operating systems, its user-centered security model, and the fact that **neither its specification nor its implementation is controlled by a single company** makes the web a unique platform to develop software on. Combined with its inherent **linkability**, it's possible to search it and share what you've found with anyone, anywhere. **Whenever you go to a website, it's up-to-date**, and your experience with that site can be as ephemeral or as permanent as you'd like. Web applications can reach anyone, anywhere, on any device with a **single codebase**.

**Native applications**, are known for being incredibly **rich and reliable**. They're ever-present, on home screens, docks, and taskbars. They work regardless of network connection. They launch in their **own standalone experience**. They can read and **write files from the local file system, access hardware** connected via USB, serial or bluetooth, and even interact with data stored on your device, like contacts and calendar events. In native applications, you can do things like take pictures, see playing songs listed on the home screen, or control song playback while in another app. Native applications **feel like part of the device they run on**.

Capabilities vs. reach of native apps, web app, and progressive web apps.
![Native apps & Web apps & PWA apps](https://codersnack.com/assets/images/capabilities-reach.png)

If you think about native apps and web apps in terms of capabilities and reach, native apps represent the best of capabilities whereas web apps represent the best of reach. So where do Progressive Web Apps fit in?

**Progressive Web Apps (PWA) are built and enhanced with modern APIs to deliver native-like capabilities**, reliability, and installability while reaching anyone, anywhere, on any device with a single codebase.

### The three app pillars

Progressive Web Apps are web applications that have been **designed so they are capable, reliable, and installable**. These three pillars transform them into an experience that **feels like a native application**
.
#### Capable

**The web is quite capable in its own right today**. For example, you can build a hyper-local video chat app using **WebRTC**, geolocation, and push notifications. You can make that app installable and take those conversations virtual with **WebGL** and b. With the introduction of **Web Assembly**, developers can tap into other ecosystems, like C, C++, and Rust, and bring decades of work and capabilities to the web too. Squoosh.app, for instance, leverages this for its advanced image compression.

Until recently, only native apps could really lay claim to these capabilities. While some capabilities are still out of the web's reach, new and upcoming APIs are looking to change that, expanding what the web can do with features like file system access, media controls, app badging, and full clipboard support. **All of these capabilities are built with the web's secure, user-centric permission model, ensuring that going to a website is never a scary proposition for users**.

Between modern APIs, Web Assembly, and new and upcoming APIs, web applications are more capable than ever, and those **capabilities are only growing**.

#### Reliable

**A reliable Progressive Web App feels fast and dependable regardless of the network**.

**Speed is critical** for getting users to use your experience. In fact, as page load times go from 1 second to ten seconds, the probability of a user bouncing increases by 123%. **Performance doesn't stop after the onload event**. Users should never wonder whether their interaction—for example, clicking a button—was registered or not. Scrolling and animation should feel smooth. Performance affects your entire experience, from how users perceive your application to how it actually performs.

Finally, reliable applications need to be **usable regardless of network connection**. Users expect apps to start up on slow or flaky network connections or even when offline. They expect the most recent content they've interacted with, like media tracks or tickets and itineraries, to be available and usable even if getting a request to your server is hard. When a request isn't possible, they expect to be told there's trouble instead of silently failing or crashing.

Users love apps that respond to interaction in the blink of an eye, and an experience they can depend on.

#### Installable

**Installed Progressive Web Apps run in a standalone window instead of a browser tab**. They're launchable from on the user's home screen, dock, taskbar, or shelf. It's possible to search for them on a device and jump between them with the app switcher, making them feel like part of the device they're installed on.

**New capabilities open up after a web app is installed**. Keyboard shortcuts usually reserved when running in the browser, become available. Progressive Web Apps can register to accept content from other applications, or to be the default application to handle different types of files. When a Progressive Web App moves out of a tab and into a standalone app window, it transforms how users think about it and interact with it.

#### The best of both worlds

At their heart, Progressive Web Apps are just web applications. Using **progressive enhancement**, new capabilities are enabled in modern browsers. **Using service workers and a web app manifest, your web application becomes reliable and installable**. **If the new capabilities aren't available, users still get the core experience**.

The numbers don't lie! **Companies that have launched Progressive Web Apps have seen impressive results**. For example, Twitter saw a 65% increase in pages per session, 75% more Tweets, and a 20% decrease in bounce rate, all while reducing the size of their app by over 97%. After switching to a PWA, Nikkei saw 2.3 times more organic traffic, 58% more subscriptions, and 49% more daily active users. Hulu replaced their native desktop experience with a Progressive Web App and saw a 27% increase in return visits.

Progressive Web Apps provide you with a unique opportunity to deliver a web experience your users will love. Using the latest web features to bring native-like capabilities and reliability, Progressive Web Apps allow what you build to be installed by anyone, anywhere, on any device with a single codebase.

### How Progressive Web Apps can drive business success

Progressive Web Apps are on a lot of companies' roadmap to modernize their website and adapt to users' new expectations. Like all new concepts and technical capabilities, they raise questions: is it what my customers want, how much will it grow my business, what is technically feasible?

To shape your digital strategy, several stakeholders are often involved: the Product Manager and CMO are co-owners of the business impact of each feature, the CTO assesses the feasibility and reliability of a technology, the UX Researchers validate that a feature answers a real customer issue.

This article aims to help you answer those **three questions and shape your PWA project**. You will start from your customer needs, translate this into PWA features, and focus on measuring the business impact that each feature brings to the table.

#### PWAs solve customer needs
One rule we love to follow at Google when making products is **"focus on the user and all else will follow"**. Think user-first: what are my customers' needs, and how does a PWA provide them?

When doing user research, we find some interesting patterns:

- **Users hate delays** and unreliability on mobile: the level of stress caused by mobile delays is comparable to watching a horror movie.
- **Fifty percent of smartphone users** are more likely to use a company's mobile site when browsing or shopping because they **don't want to download an app**.
- One of the **top reasons for uninstalling an app is the limited storage** (whereas an installed PWA usually takes less than 1MB).
- **Smartphone users are more likely to purchase from mobile sites** that offer relevant recommendations on products, and 85% of smartphone users say mobile notifications are useful.

According to those observations, we found out that **customers prefer experiences that are fast, installable, reliable, and engaging (F.I.R.E.)!**

#### PWAs leverage modern web capabilities

PWAs provide a set of best practices and modern web APIs that are aimed at meeting your customers' needs by making your site fast, installable, reliable, and engaging.

For example, using a service worker to cache your resources and doing predictive prefetching makes your site faster, and more reliable. Making your site Installable provides an easy way for your customers to access it directly from their home screen or app launcher. And new APIs like Web Push Notifications make it easier to re-engage your users with personalized content to generate loyalty.

![PWA leverages modern web capabilities](https://codersnack.com/assets/images/pwa-modern-web-capabilities.jpg)


### Understand the business impact
The business success definition can be a lot of things depending on your activity:

- Users spending more time on your service
- Reduced bounce rates for your leads
- Improved conversion rates
- More returning visitors

Most PWA projects result in a higher mobile conversion rate, and you can learn more from the numerous PWA case studies. Depending on your objectives, you may want to prioritize some aspects of PWA that make more sense for your business, and it's completely OK. PWA features can be cherry-picked and launched separately.

Let's measure the business impact of each of these great F.I.R.E features.

#### The business impact of a fast website

A recent study from Deloitte Digital shows that page speed has a significant impact on business metrics.

There's a lot you can do to optimize the speed of your site to optimize the critical user journeys for all of your users. If you don't know where to start, take a look at our Fast section, and use *Lighthouse* to prioritize the most important things to fix.

When working on your speed optimizations, start measuring your site speed frequently with appropriate tools and metrics to monitor your progress. For example, measure your metrics with *Lighthouse*, fix clear targets like having "Good" Core Web Vitals scores, and incorporate a performance budget into your build process. Thanks to your daily measurements and the "value of speed" methodology, you can isolate the impact of your incremental speed changes and calculate how much extra revenue your work has generated.

Ebay made speed a company objective for 2019. They used techniques like performance budget, critical path optimization, and predictive prefetching. They concluded that for every 100 milliseconds improvement in search page loading time, add-to-card count increased by 0.5%.

A 100ms improvement in load time resulted in a 0.5% increase in add to cart count for eBay

#### The business impact of an installable website

Why would you want a user to install your PWA? To make it easier to come back to your site. Where a native app install would add at least three steps (redirection to Play Store, downloading, relaunching the native app at the top of the funnel), PWA installation is done seamlessly in one click, and it doesn't take the user away from the current conversion funnel.

Once installed, users are able to launch it in one click from the icon on their home screen, see it in their app tray when they are switching between apps, or find it via an app search result. We call this app dynamic Discover-Launch-Switch, and making your PWA installable is the key to unlocking access.

In addition to being accessible from familiar discovery and launch surfaces on their device, a PWA launches exactly like a native app: in a standalone experience, separate from the browser. Additionally, **it benefits from native device services such as the app switcher and settings**.

Users who install your PWA are likely your most engaged users, with better engagement metrics than casual visitors, including more repeat visits, longer time on site and higher conversion rates, often at parity with native app users on mobile devices.

To make your PWA installable, it needs to meet the base criteria. Once it meets those criteria, you can promote the installation within your user experience on desktop and mobile, including iOS.

#### The business impact of a reliable website

**The Chrome Dino game, offered when a user is offline, is played more than 270 million times a month**. This impressive number shows that network reliability is a considerable opportunity, especially in markets with unreliable or expensive mobile data like India, Brazil, Mexico, or Indonesia.

> When a native app, installed from an app store, is launched, users expect it to open, regardless of whether they're connected to the internet. Progressive Web Apps should be no different.

**At a minimum, a simple offline page that tells the user the app isn't available without a network connection should be served**. Then, consider taking the experience a step further by providing some functionality that makes sense while offline. For example, you could provide access to tickets or boarding passes, offline wish lists, call center contact information, articles or recipes that the user has recently viewed, etc.

#### The business impact of an engaging website

**Web push notifications allow users to opt-in to timely updates** from sites they love and allow you to effectively re-engage them with customized, relevant content.

> Be careful, though. Asking users to sign up for web notifications when they first arrive and without exposing the benefits can be perceived as spammy and negatively affect your experience. Make sure to follow best practices when prompting for notifications and inspire acceptance through relevant usages like train delays, price tracking, out of stock products, etc.

**Technically, push notifications on the web run in the background thanks to a service worker and are often sent by a system built for managing campaigns** (e.g. Firebase). This feature brings great business value for mobile (Android) and desktop users: it increases repeated visits and consequently sales and conversions.

#### The P in PWA: a progressive launch, feature by feature

PWAs are modern websites that benefit from the massive reach of the web, combined with all the user-friendly features that users love in native apps. They leverage a set of best practices and modern web APIs, that can be implemented independently depending on your business specificities and priorities.

To accelerate the modernization of your website and make it a real PWA, we encourage you to be agile: **launch feature by feature**. First, research with your users what features would bring them the most value, then deliver them with your designers and developers, and finally do not forget to measure precisely how much extra money your PWA generated.


