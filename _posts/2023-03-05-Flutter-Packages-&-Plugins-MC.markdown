---
layout: main-content-post
title:  Flutter Packages & Plugins
date:   2022-08-15T21:44:22.950Z
permalink: /flutter-packages-plugins/main-content/
icon: https://codersnack.com/assets/images/flutter-icon.png
categories: [snack-main-content-post]
---

**The plugin API supports federated plugins that enable separation of different platform implementations**. You can also now indicate which platforms a plugin supports, for example web and macOS.

> Eventually, the old plugin APIs will be deprecated. In the short term, you will see a warning when the framework detects that you are using an old-style plugin. For information on how to upgrade your plugin, see Supporting the new Android plugins APIs.


##  Package introduction

**Packages enable the creation of *modular code* that can be *shared* easily**. A minimal package consists of the following:

**pubspec.yaml**
A metadata file that declares the package name, version, author, and so on.

**lib**
The lib directory contains the public code in the package, minimally a single **```<package-name>.dart```**  file.
 
>Note: For a list of dos and don’ts when writing an effective plugin, see the Medium article by Mehmet Fidanboylu, [Writing a good plugin](https://medium.com/flutter/writing-a-good-flutter-plugin-1a561b986c9c).


###  Package types

Packages can contain more than one kind of content:


####  Dart packages

**General packages written in Dart**, for example the *path* package. Some of these might contain Flutter specific functionality and thus have a dependency on the Flutter framework, restricting their use to Flutter only, for example the fluro package.


####  Plugin packages

**A specialized Dart package that *contains an API* written in Dart code combined with *one or more platform-specific implementations***.
Plugin packages can be written for Android (using Kotlin or Java), iOS (using Swift or Objective-C), web, macOS, Windows, or Linux, or any combination thereof.
A concrete example is the *url_launcher* plugin package. To see how to use the url_launcher package, and how it was extended to implement support for web, see the Medium article by Harry Terkelsen, [How to Write a Flutter Web Plugin, Part 1](https://medium.com/flutter/how-to-write-a-flutter-web-plugin-5e26c689ea1).


####  FFI Plugin packages

**A specialized Dart package that contains an API written in Dart code combined with one or more platform-specific implementations that use Dart [FFI](https://dart.dev/guides/libraries/c-interop) (Android, iOS, macOS)**.


###  Developing Dart packages

The following instructions explain how to write a Flutter package.


####  Step 1: Create the package

To create a starter Flutter package, use the *--template=package flag* with flutter create:

```
 flutter create --template=package hello
```

This *creates a package project in the hello folder* with the following content:

**LICENSE**
A (mostly) empty license text file.
**test/hello_test.dart**
The unit tests for the package.
**hello.iml**
A configuration file used by the IntelliJ IDEs.
**.gitignore**
A hidden file that tells Git which files or folders to ignore in a project.
**.metadata**
A hidden file used by IDEs to track the properties of the Flutter project.
**pubspec.yaml**
A yaml file containing metadata that specifies the package’s dependencies. Used by the pub tool.
**README.md**
A starter markdown file that briefly describes the package’s purpose.
**lib/hello.dart**
A starter app containing Dart code for the package.
**.idea/modules.xml, .idea/workspace.xml**
A hidden folder containing configuration files for the IntelliJ IDEs.
**CHANGELOG.md**
A (mostly) empty markdown file for tracking version changes to the package.


####  Step 2: Implement the package

For pure Dart packages, simply add the functionality inside the main lib/<package name>.dart file, or in several files in the lib directory.

To test the package, add unit tests in a test directory.

For additional details on how to organize the package contents, see the Dart library package documentation.

