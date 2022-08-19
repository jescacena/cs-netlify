---
layout: main-content-post
title:  Cypress - Continuous integration
date:   2022-03-07T21:03:18.758Z
permalink: /cypress-continuous-integration/main-content/
icon: https://codersnack.com/assets/images/cypress-logo.png
categories: [snack-main-content-post]
---

Running Cypress in Continuous Integration **is almost the same as running it locally in your terminal**. You generally only need to do two things:

Install Cypress
```
npm install cypress --save-dev
```

Run Cypress
```
cypress run
```

Depending on which CI provider you use, you may need a config file. You'll want to refer to your CI provider's documentation to know where to add the commands to install and run Cypress. For more configuration examples check out our examples.

###  Boot your server
**Challenges**
**Typically you will need to boot a local server prior to running Cypress**. When you boot your web server, it runs as a long running process that will never exit. Because of this, **you'll need it to run in the background** - else your CI provider will never move onto the next command.

Backgrounding your server process means that your CI provider will continue to execute the next command after executing the signal to start your server.

Many people approach this situation by running a command like the following:
```
npm start & cypress run // Do not do this
```
The problem is - what happens if your server takes time to boot? **There is no guarantee that when the next command runs (cypress run) that your web server is up and available**. So your Cypress test may start and try to visit your local server before it is ready to be visited.

**Solutions**
Luckily, there are some solutions for this. Instead of introducing arbitrary waits (like sleep 20) you can use a better option.

**wait-on module**

Using the [wait-on](https://github.com/jeffbski/wait-on) module, **you can block the cypress run command from executing until your server has booted.**
```
npm start & wait-on http://localhost:8080
```
```
cypress run
```
> Most CI providers will automatically kill background processes so you don't have to worry about cleaning up your server process once Cypress finishes.
However, if you're running this script locally you'll have to do a bit more work to collect the backgrounded PID and then kill it after cypress run.

**start-server-and-test module**

If the server takes a very long time to start, we recommend trying the [start-server-and-test](https://github.com/bahmutov/start-server-and-test) module.
```
npm install --save-dev start-server-and-test
```
In your **package.json scripts**, pass the command to boot your server, the url your server is hosted on and your Cypress test command.

```
{
  ...
  "scripts": {
    "start": "my-server -p 3030",
    "cy:run": "cypress run",
    "test": "start-server-and-test start http://localhost:3030 cy:run"
  }
}
```
In the example above, **the cy:run command will only be executed when the URL http://localhost:3030 responds with an HTTP status code of 200**. The server will also shut down when the tests complete.

**Gotchas**

When working with webpack-dev-server that does not respond to HEAD requests, use an explicit GET method to ping the server like this:

```
{
  "scripts": {
    "test": "start-server-and-test start http-get://localhost:3030 cy:run"
  }
}
```
When working with local https in webpack, set an environment variable to allow local certificate:

```
{
  "scripts": {
    "start": "my-server -p 3030 --https",
    "cy:run": "cypress run",
    "cy:ci": "START_SERVER_AND_TEST_INSECURE=1 start-server-and-test start https-get://localhost:3030 cy:run"
  }
}
```