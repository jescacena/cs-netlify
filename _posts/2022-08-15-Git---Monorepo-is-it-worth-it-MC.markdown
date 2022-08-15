---
layout: main-content-post
title:  Git - Monorepo is it worth it?
date:   2022-04-21T10:41:12.484Z
permalink: /git-monorepo-worth-it/main-content/
icon: https://codersnack.com/assets/images/git-icon.png
categories: [snack-main-content-post]
---

Monorepos are getting more and more popular, and some of us are wondering about joining the hype. But is it worth it? The answer is easy to predict:

**it all depends**

Seeing all those **big brands using monorepos to handle their codebase (Google, Twitter, Facebook, Digital Ocean, etc.)** may make us start using monorepos without giving them a **second thought.** But while taking a decision we should consider at least a few factors that may help us not to change our approach later on.


###  Dependencies management

The bigger the application is, the harder it gets for monorepo to handle dependency management. One of the **biggest advantages of using monorepo is to have all dependencies in one place**. Let’s hear what Google says about it:

> The monolithic model makes it easier to understand the structure of the codebase, as there is no crossing of repository boundaries between dependencies.
[https://research.google/pubs/pub45424/]

**On the other hand, with time, it’s becoming barely possible to run all the tests and to rebuild an entire codebase over and over again**. It requires a specific ‘intelligent’ mechanisms, detecting changes and selectively building parts of the codebase.


###  Cross-project changes

Its a no-brainer, but worth to mention that **it’s easier to do a cross-project changes in a monorepo approach**. According to Google publication:

> A developer can make a major change touching hundreds or thousands of files across the repository in a single consistent operation.
[https://research.google/pubs/pub45424/]


###  Code access management

Using a monorepo approach **allows all developers to see the whole repository codebase.** If you need a strict read/write access to every code module, monorepo is not the best approach for you.

###  Project size

**Very large projects often suffer from technical limitations of VCS systems**. Handling multiple terabytes of files is not what the standard VSC system is capable of.

When does the problem start? It starts when you have to deal with multi-gigabyte repositories. One of the best example is Twitter, where the large codebase is still handled by a standard VSC system. **The simple git commands like git log git blame git commit can take an unacceptable amount of time**.

That’s why Google has built its system named Piper to manage its gargantuan monorepo. According to the data they shared, they can manage a repository of one billion files, 35 million commits and tens of thousands of developers working on changes daily.

I’m not aware of any open-source equivalent of such a tool [Piper] available on the market now.

###  Onboarding effort

Using the monorepo approach we need to be aware of the fact, that **every new developer will have to be properly onboarded**. Seeing and understanding a huge codebase on the very first days of their work is not a piece of cake. Checking smaller repositories one by one may be more convenient at the very beginning.

###  Code reusability

It seems **easier to reuse and version the code while working with monorepo**. When writing some generic module that can be grouped into its package, it does not require a lot of steps to separate it. All we need to do is to just create a directory under packages and initialize it (eg. creating package.json there)

###  Yarn workspaces and Lerna

***Yarn and Lerna* can make our work much easier when dealing with monorepo. Yarn manages our dependencies, and Lerna handles versioning of our packages and execution of one command across multiple packages**. They work perfectly together and many developers decide to use them both. But do we need them both to work with monorepo? No.

**Not every monorepo requires publishing to the npm registry**. Sometimes we want to work with private packages, available only across one particular project. It gives us the benefits of monorepo, without the necessity of publishing all packages we use. Yarn workspaces are a perfect match for such cases.

You can ask — why do we have to use Yarn, when Lerna can manage dependencies as well? Doesn’t it have lerna bootstrap command?

Yes, it has. But it’s a way less efficient than yarn. When Lerna bootstraps, it simply runs yarn install command in every directory separately. Packages can’t share dependencies. It creates a massive amount of node_modules with a lot of duplicated dependencies inside.

Yarn elegantly solves the problem — it creates one node_modules in a project root directory and hoists all dependencies there. Only if there is a conflict in packages versions or between multiple dependencies, Yarn downloads the dependency directly to the package.

If you want to know how to set up such monorepo using Yarn workspaces — soon I’ll publish the article about it. Stay tuned.

###  Conclusion

Monorepo gives us a lot of flexibility in dependencies management and it may be a great choice for some companies to start using this approach. It works as a single source of the truth — we are sure that everybody is always on the same page with the codebase and all its packages. However we, as developers, tend to jump into all popular trends that ‘big brands’ are creating. And it happens that we end up forced to deal with an overhyped solution, that not necessarily was the best choice for us. Anyway — if you haven’t worked with monorepos before I would give it a shot. It’s always good to learn on our own experiences.