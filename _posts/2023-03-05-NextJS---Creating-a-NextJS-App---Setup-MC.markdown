---
layout: main-content-post
title:  NextJS - Creating a NextJS App - Setup
date:   2021-03-21T22:25:27.933Z
permalink: /nextjs-creating-an-app-setup/main-content/
icon: https://codersnack.com/assets/images/nextjs-logo.png
categories: [snack-main-content-post]
---

## Create a Next.js App - Setup

First, let’s make sure that your development environment is ready.

If you don’t have Node.js installed, install it from here. You’ll need **Node.js version 10.13 or later**.

You’ll be using your own text editor and terminal app for this tutorial.

If you are on Windows, we recommend downloading Git for Windows and use Git Bash that comes with it, which supports the UNIX-specific commands in this tutorial. Windows Subsystem for Linux (WSL) is another option.

To create a Next.js app, open your terminal, cd into the directory you’d like to create the app in, and run the following command:
```
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"
``` 
Under the hood, this uses the tool called create-next-app, which bootstraps a Next.js app for you. It uses this template through the ```--example```  flag.


**Run the development server**
You now have a new directory called nextjs-blog. Let’s cd into it:
```
cd nextjs-blog
``` 
Then, run the following command:
``` 
npm run dev
``` 

This starts your Next.js app’s "development server" (more on this later) on port 3000.

Let’s check to see if it’s working. Open ```http://localhost:3000```  from your browser.

## Editing the Page
Let’s try editing the starter page.

Make sure the Next.js development server is still running.
Open ```pages/index.js```  with your text editor.
Find the text that says “Welcome to” under the ```<h1>```  tag and change it to "Learn".
Save the file.
As soon as you save the file, the browser automatically updates the page with the new text

The Next.js development server has **Fast Refresh** enabled. When you make changes to files, Next.js automatically applies the changes in the browser almost instantly. No refresh needed! This will help you iterate on your app quickly.




