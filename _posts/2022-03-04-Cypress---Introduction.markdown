---
layout: post
title:  Cypress - Introduction
date:   2022-03-04T11:27:34.033Z
permalink: /cypress-introduction/
icon: https://codersnack.com/assets/images/cypress-logo.png
categories: [snackpost]
---

> Information drawn from 
- [Cypress in a nutshell](https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell)


Cypress is a next generation **front end testing tool built for the modern web**. We address the key pain points developers and QA engineers face when testing modern applications.

We make it possible to:

- Set up tests
- Write tests
- Run tests
- Debug Tests

Cypress is most often compared to Selenium; however Cypress is both fundamentally and architecturally different. **Cypress is not constrained by the same restrictions as Selenium.**

This enables you to **write faster, easier and more reliable tests**.


###  Who uses Cypress?

**Our users are typically developers or QA engineers** building web applications using modern JavaScript frameworks.

Cypress enables you to write all types of tests:

- End-to-end tests
- Integration tests
- Unit tests

Cypress can test anything that runs in a browser.


###  Cypress ecosystem

Cypress consists of a free, open source, **locally installed Test Runner and a Dashboard Service for recording your tests**.

- **First**: Cypress helps you set up and start writing tests every day while you build your application locally. **TDD** at its best!
- **Later**: After building up a suite of tests and **integrating Cypress with your CI** Provider, our Dashboard Service can record your test runs. You'll never have to wonder: Why did this fail?


###  Our mission

Our mission is to build a thriving, open source ecosystem that enhances productivity, makes testing an enjoyable experience, and generates developer happiness. We hold ourselves accountable to champion a testing process that actually works.

We believe our documentation should be approachable. This means enabling our readers to understand fully not just the what but the why as well.

We want to help developers build a new generation of modern applications faster, better, and without the stress and anxiety associated with managing tests.

We know that in order for us to be successful we must enable, nurture, and foster an ecosystem that thrives on open source. Every line of test code is an investment in your codebase, it will never be coupled to us as a paid service or company. Tests will be able to run and work independently, always.

We believe testing needs a lot of  and we are here to build a tool, a service, and a community that everyone can learn and benefit from. We're solving the hardest pain points shared by every developer working on the web. We believe in this mission and hope that you will join us to make Cypress a lasting ecosystem that makes everyone happy.


###   Features

Cypress comes fully baked, batteries included. Here is a list of things it can do that no other testing framework can:

- **Time Travel:** Cypress takes snapshots as your tests run. Hover over commands in the Command Log to see exactly what happened at each step.

- **Debuggability**: Stop guessing why your tests are failing. Debug directly from familiar tools like Developer Tools. Our readable errors and stack traces make debugging lightning fast.

- **Automatic Waiting:** Never add waits or sleeps to your tests. Cypress automatically waits for commands and assertions before moving on. No more async hell.

- **Spies, Stubs, and Clocks**: Verify and control the behavior of functions, server responses, or timers. The same functionality you love from unit testing is right at your fingertips.

- **Network Traffic Control**: Easily control, stub, and test edge cases without involving your server. You can stub network traffic however you like.

- **Consistent Results**: Our architecture doesn’t use Selenium or WebDriver. Say hello to fast, consistent and reliable tests that are flake-free.

- **Screenshots and Videos**: View screenshots taken automatically on failure, or videos of your entire test suite when run from the CLI.

- **Cross browser Testing**: Run tests within Firefox and Chrome-family browsers (including Edge and Electron) locally and optimally in a Continuous Integration pipeline.



###  Architecture

Most testing tools (like Selenium) operate by running outside of the browser and executing remote commands across the network. Cypress is the exact opposite. **Cypress is executed in the same run loop as your application.**

**Behind Cypress is a Node server process**. Cypress and the Node process constantly communicate, synchronize, and perform tasks on behalf of each other. Having access to both parts (front and back) gives us the ability to respond to your application's events in real time, while at the same time work outside of the browser for tasks that require a higher privilege.

**Cypress also operates at the network layer by reading and altering web traffic on the fly.** This enables Cypress to not only modify everything coming in and out of the browser, but also to change code that may interfere with its ability to automate the browser.

Cypress ultimately controls the entire automation process from top to bottom, which puts it in the unique position of being able to understand everything happening in and outside of the browser. This means Cypress is capable of delivering more consistent results than any other testing tool.

**Because Cypress is installed locally on your machine, it can additionally tap into the operating system for automation tasks**. This makes performing tasks such as **taking screenshots, recording videos,** general file system operations and network operations possible.


###  Native access

**Because Cypress operates within your application, that means it has native access to every single object**. Whether it is the window, the document, a DOM element, your application instance, a function, a timer, a service worker, or anything else - you have access to it in your Cypress tests. There is no object serialization, there is no over-the-wire protocol - you have access to everything. Your test code can access all the same objects that your application code can.


###  New kind of testing

Having ultimate control over your application, the network traffic, and native access to every host object unlocks a new way of testing that has never been possible before. Instead of being 'locked out' of your application and not being able to easily control it - Cypress instead lets you alter any aspect of how your application works. Instead of slow and expensive tests, such as creating the state required for a given situation, you can create these states artificially like you would in an unit test. For instance you can:

- **Stub the browser** or your application's functions and force them to behave as needed in your test case.
- **Expose data store**s (like in Redux) so you can programmatically alter the state of your application directly from your test code.
- **Test edge cases like 'empty views'** by forcing your server to send empty responses.
- **Test how your application responds to errors** on your server by modifying response status codes to be 500.
- **Modify DOM elements directly** - like forcing hidden elements to be shown.
- **Use 3rd party plugins programmatically**. Instead of fussing with complex UI widgets like multi selects, autocompletes, drop downs, tree views or calendars, you can call methods directly from your test code to control them.
- **Prevent Google Analytics from loading** before any of your application code executes when testing.
- **Get synchronous notification**s whenever your application transitions to a new page or when it begins to unload.
- **Control time by moving forward or backward** so that timers or polls automatically fire without having to wait for the required time in your tests.
- **Add your own event listeners to respond to your application**. You could update your application code to behave differently when under tests in Cypress. You can control WebSocket messages from within Cypress, conditionally load 3rd party scripts, or call functions directly on your application.


###   Shortcuts

Trying to test hard to reach areas of your application? Don't like the side effects an action creates? **Tired of repeating the same repetitive and slow actions** over and over again? **You can skip them for most test cases.**

**Cypress prevents you from being forced to always 'act like a user' to generate the state of a given situation**. With Cypress you can programmatically interact and control your application. You no longer have to use your UI to build up state.

**That means you do not have to visit a login page, type in a username and password and wait for the page to load and/or redirect for every test you run**. Cypress gives you the ability to take shortcuts and programmatically log in. With commands like **cy.request()**, you can send HTTP requests directly, yet have those requests synchronized with the browser. Cookies are automatically sent and applied back. **Worried about CORS? Don't be, it is completely bypassed**. The power to choose when to test like a user and when to skip slow and repetitive parts is yours.


### Flake resistant

**Cypress knows and understands everything that happens in your application synchronously. It is notified the moment the page loads and the moment the page unloads.** It is impossible for Cypress to miss elements when it fires events. Cypress even knows how fast an element is animating and will wait for it to stop animating. Additionally, it automatically waits for elements to become visible, to become enabled, and to stop being covered. When pages begin to transition, Cypress will pause command execution until the following page is fully loaded. You can even tell Cypress to wait on specific network requests to finish.

**Cypress executes the vast majority of its commands inside the browser, so there is no network lag**. Commands execute and drive your application as fast as it is capable of rendering. To deal with modern JavaScript frameworks with complex UIs, you use assertions to tell Cypress what the desired state of your application should be. Cypress will automatically wait for your application to reach this state before moving on. You are completely insulated from fussing with manual waits or retries. Cypress automatically waits for elements to exist and will never yield you stale elements that have been detached from the DOM.


###  Debuggability

Above all else Cypress has been built for usability.

There are hundreds of **custom error messages describing the exact reason Cypress failed **your test.

There is a **rich UI which visually shows you the command execution**, assertions, network requests, spies, stubs, page loads, or URL changes.

**Cypress takes snapshots of your application** and enables you to time travel back to the state it was in when commands ran.

**You can use the Developer Tools while your tests run, you can see every console message, every network request**. You can inspect elements, and you can even use debugger statements in your spec code or your application code. There is no fidelity loss - you can use all the tools you're already comfortable with. This enables you to test and develop all at the same time.
