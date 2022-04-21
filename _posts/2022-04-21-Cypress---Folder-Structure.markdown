---
layout: post
title:  Cypress - Folder Structure
date:   2022-03-07T21:19:59.903Z
permalink: /cypress-folder-structure/
icon: https://codersnack.com/assets/images/cypress-logo.png
categories: [snackpost]
---

> Information drawn from 
- [Cypress - Folder Structure](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Folder-structure)


###  Folder structure
After adding a new project, Cypress will automatically scaffold out a suggested folder structure. By default it will create:

```
/cypress
  /fixtures
    - example.json

  /integration
    /examples
      /1-getting-started
        - todo.spec.js
      /2-advanced-examples
        - actions.spec.js
        - aliasing.spec.js
        - assertions.spec.js
        - connectors.spec.js
        - cookies.spec.js
        - cypress_api.spec.js
        - files.spec.js
        - local_storage.spec.js
        - location.spec.js
        - misc.spec.js
        - navigation.spec.js
        - network_requests.spec.js
        - querying.spec.js
        - spies_stubs_clocks.spec.js
        - traversal.spec.js
        - utilities.spec.js
        - viewport.spec.js
        - waiting.spec.js
        - window.spec.js

  /plugins
    - index.js

  /support
    - commands.js
    - index.js
```


####   Configuring Folder Structure

**While Cypress allows you to configure where your tests, fixtures, and support files are located, if you're starting your first project, we recommend you use the above structure**.

You can modify the folder configuration in your configuration file. See configuration for more detail.

>**What files should I add to my '.gitignore file' ?**
Cypress will create a screenshotsFolder and a videosFolder to store the screenshots and videos taken during the testing of your application. Many users will opt to add these folders to their .gitignore file. Additionally, if you are storing sensitive environment variables in your configuration file (cypress.json by default) or cypress.env.json, these should also be ignored when you check into source control.


#### Test files

**Test files are located in *cypress/integration* by default**, but can be configured to another directory. Test files may be written as:
```
.js
.jsx
.coffee
.cjsx
```
Cypress also supports ES2015 out of the box. **You can use either ES2015 modules or CommonJS modules. This means you can import or require both npm packages and local relative modules.**

> To see an **example of every command used in Cypress**, open the **2-advanced-examples folder** within your cypress/integration folder.

**To start writing tests for your app, create a new file like *app_spec.js* within your *cypress/integration* folder**. Refresh your tests list in the Cypress Test Runner and your new file should have appeared in the list.


####  Fixture Files

**Fixtures are used as external pieces of static data that can be used by your tests**. Fixture files are located in **cypress/fixtures** by default, but can be configured to another directory.

You would typically **use them with the *cy.fixture()* command and most often when you're stubbing Network Requests**.


####  Asset Files

**There are some folders that may be generated after a test run, containing assets that were generated during the test run.**

You may consider adding these folders to your **.gitignore** file to ignore checking these files into source control.

####  Download Files
**Any files downloaded while testing an application's file download feature will be stored in the *downloadsFolder*** which is set to **cypress/downloads** by default.
```
/cypress
  /downloads
    - records.csv
```

####   Screenshot Files

If screenshots were taken via the **cy.screenshot()** command or automatically when a test fails, the screenshots are stored in the screenshotsFolder which is set to **cypress/screenshots** by default.

```
/cypress
  /screenshots
    /app_spec.js
      - Navigates to main menu (failures).png
```
To learn more about screenshots and settings available, see Screenshots and Videos

####  Video Files
Any videos recorded of the run are stored in the **videosFolder** which is set to cypress/videos by default.

```
/cypress
  /videos
    - app_spec.js.mp4
```
To learn more about videos and settings available, see Screenshots and Videos


####  Plugins file

**The plugins file is a special file that executes in Node before the project is loaded, before the browser launches, and during your test execution**. While the Cypress tests execute in the browser, the plugins file runs in the background Node process, giving your tests the ability to access the file system and the rest of the operating system by calling the **cy.task()** command.

The plugins file is a **good place to define how you want to bundle the spec files via the preprocessors, how to find and launch the browsers via the browser launch API, and other cool things**. Read our plugins guide for more details and examples.

The initial imported plugins file can be configured to another file.

####  Support file

**By default Cypress will automatically include the support file *cypress/support/index.js*.** This file **runs before every single spec file**. We do this purely as a convenience mechanism so you don't have to import this file in every single one of your spec files.

> Keep in mind, **when clicking "Run all specs" after cypress open , the code in the support file is executed once before all spec files, instead of once before each spec file**. See Execution for more details.

The initial imported support file can be configured to another file or turned off completely using the supportFile configuration.

The support file is a great place to put reusable behavior such as custom commands or global overrides that you want applied and available to all of your spec files.

From your support file you can import or require other files to keep things organized.

We automatically seed an example support file, which has several commented out examples.

You can **define behaviors in a before or beforeEach within any of the cypress/support files**:

```
beforeEach(() => {
  cy.log('I run before every test in every spec file!!!!!!')
})
```


**Execution**
Cypress executes the support file before the spec file. For example when you click on a test file named spec-a.js via cypress open, then the Test Runner executes the files in the following order:

```
<!-- bundled support file -->
<script src="support/index.js"></script>
<!-- bundled spec file -->
<script src="integration/spec-a.js"></script>
```

The same happens when using the cypress run command: a new browser window is opened for each support and spec file pair.

**But when you click on "Run all specs" button after cypress open, the Test Runner bundles and concatenates all specs together**, in essence running scripts like shown below. This means the code in the support file is executed once before all spec files, instead of once before each spec file.

```
<!-- bundled support file -->
<script src="support/index.js"></script>
<!-- bundled first spec file, second spec file, etc -->
<script src="integration/spec-a.js"></script>
<script src="integration/spec-b.js"></script>
...
<script src="integration/spec-n.js"></script>
```

Having a single support file when running all specs together might execute before and beforeEach hooks in ways you may not anticipate. Read Be careful when running all specs together for examples.

####  Troubleshooting
If Cypress does not find the spec files for some reason, you can troubleshoot its logic by opening or running Cypress with debug logs enabled:
```
DEBUG=cypress:server:specs npx cypress open
## or
DEBUG=cypress:server:specs npx cypress run
```