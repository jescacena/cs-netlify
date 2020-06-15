---
layout: post
title:  Write your first flutter app I
date:   2020-04-20T20:16:58.264Z
permalink: /flutter-write-first-app-1/
icon: https://codersnack.com/assets/images/flutter-icon.png
categories: [snackpost]
---

> #### Information drawn from

- [Flutter.dev - Write your first flutter app](https://flutter.dev/docs/get-started/codelab)

-------------

## What you’ll build
> **Tip**: This codelab walks you through writing your first Flutter app on mobile. You might prefer to try writing your first Flutter app on the web. Note that if you have enabled web, the completed app just works on all of these devices!

This is a guide to creating your first Flutter app. If you are familiar with object-oriented code and basic programming concepts such as variables, loops, and conditionals, you can complete this tutorial. **You don’t need previous experience with Dart, mobile, or web programming**.

You’ll implement **a simple mobile app that generates proposed names for a startup company**. The user can select and unselect names, saving the best ones. The code lazily generates names. As the user scrolls, more names are generated. There is no limit to how far a user can scroll.

The animated GIF shows how the app works at the completion.

![startup namer part 1](https://codersnack.com/assets/images/startup-namer-part-1-flutter.gif)


## What you’ll learn
- How to write a Flutter app that looks natural on iOS, Android, and the web.
- **Basic structure** of a Flutter app.
- Finding and using packages to extend functionality.
- Using **hot reload** for a quicker development cycle.
- How to implement a **stateful widget**.
- How to create an **infinite, lazily loaded list**.

## What you'll use
You need two pieces of software to complete this lab: the **Flutter SDK** and an **editor**.

You can run this codelab using any of the following devices:

- A physical device (Android or iOS) connected to your computer and set to developer mode
- The iOS simulator
- The Android emulator
- A browser (Chrome is required for debugging)

## Step 1: Create the starter Flutter app
Create a simple, templated Flutter app, using the instructions in [Flutter.dev -> Getting Started with your first Flutter app](https://flutter.dev/docs/get-started/test-drive?tab=terminal#create-app). Name the project **startup_namer** (instead of myapp).

 > **Tip**: If you don’t see “New Flutter Project” as an option in your IDE, make sure you have the plugins installed for Flutter and Dart.

In this codelab, you’ll mostly be editing **lib/main.dart**, where the Dart code lives.

Replace the contents of lib/main.dart. Delete all of the code from lib/main.dart. Replace with the following code, which displays "Hello World" in the center of the screen.

*lib/main.dart*

```
// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```
> **Tip**: When pasting code into your app, indentation can become skewed. You can fix this automatically with the Flutter tools:
> Android Studio and IntelliJ IDEA: Right-click the code and select Reformat Code with dartfmt.
> VS Code: Right-click and select Format Document.
> Terminal: Run flutter format <filename>.

**Run the app in the way your IDE describes**. You should see either Android, iOS, or web output, depending on your device.

![Android](https://codersnack.com/assets/images/flutter-first-app-android.png)
Android
![Android](https://codersnack.com/assets/images/flutter-first-app-ios.png)
iOS

> Tip: The first time you run on a physical device, **it can take a while to load**. After this, you can use hot reload for quick updates. Save also performs a hot reload if the app is running.

### Observations
- This example creates a **Material** app. Material is a **visual design language that is standard on mobile and the web**. Flutter offers a rich set of Material widgets.
- The ```main()``` method uses arrow (=>) notation. **Use arrow notation for one-line functions or methods**.
- The app extends ```StatelessWidget``` which makes the **app itself a widget**. In Flutter, almost everything is a widget, including alignment, padding, and layout.
- The ```Scaffold``` widget, from the Material library, provides a **default app bar, title, and a body property that holds the widget tree for the home screen**. The widget subtree can be quite complex.
- A widget's main job is to provide a ```build()``` method that describes how to display the widget in terms of other, lower level widgets.
- The body for this example consists of a ```Center``` widget containing a ```Text``` child widget. The ```Center``` widget aligns its widget subtree to the center of the screen.

## Step 2: Use an external package
In this step, you’ll start using an open-source package named **english_words**, which *contains a few thousand of the most used English words plus some utility functions*. You can find the english_words package, as well as many other open source packages, on pub.dev.

The **pubspec.yaml** file manages the *assets* and *dependencies* for a Flutter app. In pubspec.yaml, add english_words (3.1.5 or higher) to the dependencies list:

**{step1_base → step2_use_package}/pubspec.yaml**
```
	  dependencies:
	    flutter:
	      sdk: flutter
	    cupertino_icons: ^0.1.2
	+   english_words: ^3.1.0
```
While viewing the pubspec.yaml file in Android Studio’s editor view, click Packages get. This pulls the package into your project. You should see the following in the console:

```
flutter pub get
Running "flutter pub get" in startup_namer...
Process finished with exit code 0
```
> Performing Packages get also auto-generates the **pubspec.lock** file with a list of all packages pulled into the project and their version numbers.

In lib/main.dart, import the new package:

**lib/main.dart**

```
import 'package:flutter/material.dart';
+ import 'package:english_words/english_words.dart';
```
As you type, Android Studio gives you suggestions for libraries to import. It then renders the import string in gray, letting you know that the imported library is unused (so far).

Use the English words package to generate the text instead of using the string “Hello World”:

**{step1_base → step2_use_package}/lib/main.dart**
```
// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random();
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text(wordPair.asPascalCase),
        ),
      ),
    );
  }
}
```
 Note: "Pascal case" (also known as "upper camel case"), means that each word in the string, including the first one, begins with an uppercase letter. So, "uppercamelcase" becomes "UpperCamelCase".

If the app is running, hot reload to update the running app. Each time you click hot reload, or save the project, you should see a different word pair, chosen at random, in the running app. This is because the word pairing is generated inside the build method, which is run each time the MaterialApp requires rendering, or when toggling the Platform in Flutter Inspector.

## Problems?
If your app is not running correctly, look for typos. If you want to try some of Flutter's debugging tools, check out the **DevTools** suite of debugging and profiling tools. If needed, use the code at the following links to get back on track.

[pubspec.yaml](https://raw.githubusercontent.com/flutter/codelabs/master/startup_namer/step2_use_package/pubspec.yaml)
[lib/main.dart](https://raw.githubusercontent.com/flutter/codelabs/master/startup_namer/step2_use_package/lib/main.dart)





