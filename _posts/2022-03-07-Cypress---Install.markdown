---
layout: post
title:  Cypress - Install
date:   2022-03-07T19:33:25.896Z
permalink: /cypress-install-write-first-test/
icon: https://codersnack.com/assets/images/cypress-logo.png
categories: [snackpost]
---

> Information drawn from 
- [Install Cypressl](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)


###  System requirements


####   Operating System
**Cypress is a desktop application that is installed on your computer.** The desktop application supports these operating systems:

- macOS 10.9 and above (64-bit only)
- Linux Ubuntu 12.04 and above, Fedora 21 and Debian 8 (64-bit only)
- Windows 7 and above (64-bit only)

####  Node.js
If you're using npm to install Cypress, we support:

- Node.js 12 or 14 and above

####   Docker

Docker images with all of the required dependencies installed are available under **cypress/base**

If you're running your projects in containers, then you'll want Cypress in the container with the Node.js process.
``` 
  ui:
    image: cypress/base:latest
    # if targeting a specific node version, use e.g.
    # image: cypress/base:14
```
**cypress/base** is a drop-in replacement for base docker node images.


###   Installing

Install Cypress via npm:

``` 
cd /your/project/path
npm install cypress --save-dev
``` 
**This will install Cypress locally as a dev dependency for your project**.

> Make sure that you have already run npm init or have a node_modules folder or package.json file in the root of your project to ensure cypress is installed in the correct directory.

------------------------------------------------------------------------

> Notice that the **Cypress npm package is a wrapper around the Cypress binary.** The version of the npm package determines the version of the binary downloaded. As of version 3.0, the **binary is downloaded to a global cache directory to be used across projects.**

------------------------------------------------------------------------

> System proxy properties http_proxy, https_proxy and no_proxy are respected for the download of the Cypress binary. You can also use the npm properties npm_config_proxy and npm_config_https_proxy. Those have lower priority, so they will only be used if the system properties are being resolved to not use a proxy.

------------------------------------------------------------------------


> Best Practice:
The recommended approach is to install Cypress with npm because :
Cypress is versioned like any other dependency.
It simplifies running Cypress in Continuous Integration.

###  Continuous integration
Please read our [Continuous Integration](https://docs.cypress.io/guides/continuous-integration/introduction) docs for help installing Cypress in CI. When running in linux you'll need to install some [system dependencies](https://docs.cypress.io/guides/continuous-integration/introduction#Dependencies) or you can use our Docker images which have everything you need prebuilt.


###  Opening Cypress

If you used npm to install, Cypress has now been installed to your ./node_modules directory, with its **binary executable accessible from *./node_modules/.bin***.

Now you can open Cypress from your project root one of the following ways:

The long way with the full path

```
./node_modules/.bin/cypress open
```
Or with the shortcut using npm bin

```
$(npm bin)/cypress open
```
Or by using npx

note: npx is included with npm > v5.2 or can be installed separately.

```
npx cypress open
```
Or by using yarn

```
yarn run cypress open
```
After a moment, the Cypress Test Runner will launch.


###  Switching browsers
**The Cypress Test Runner attempts to find all compatible browsers on the user's machine**. The drop down to select a different browser is in the top right corner of the Test Runner.

Read Launching Browsers for more information on how Cypress controls a real browser during end-to-end tests.

####  Cross Browser Support

**Cypress currently supports Firefox and Chrome-family browsers (including Edge and Electron)**. To run tests optimally across these browsers in CI, check out the strategies demonstrated in the cross browser Testing guide.


###  Adding npm scripts

While there's nothing wrong with writing out the full path to the Cypress executable each time, **it's much easier and clearer to add Cypress commands to the scripts field in your package.json file**.

```
{
  "scripts": {
    "cypress:open": "cypress open"
  }
}
```
Now you can invoke the command from your project root like so:

```
npm run cypress:open
```
...and Cypress will open right up for you.