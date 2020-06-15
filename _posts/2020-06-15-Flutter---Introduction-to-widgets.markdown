---
layout: post
title:  Flutter - Introduction to widgets
date:   2020-05-05T21:21:19.453Z
permalink: /flutter-widget-introduction/
icon: https://codersnack.com/assets/images/flutter-icon.png
categories: [snackpost]
---

> *Information drawn from* - [Flutter.dev - Intro to widgets](https://flutter.dev/docs/development/ui/widgets-intro)

### Introduction to widgets

Flutter widgets are built using a modern framework that takes **inspiration from React**. The central idea is that you build your UI out of widgets. **Widgets describe what their view should look like given their current configuration and state**. When a widget's state changes, the widget rebuilds its description, which the **framework diffs against the previous description in order to determine the minimal changes needed** in the underlying render tree to transition from one state to the next.

> Note: If you would like to become better acquainted with Flutter by diving into some code, check out the basic layout codelab, building layouts, and adding interactivity to your Flutter app.

#### Hello world
The **minimal Flutter** app simply calls the ```runApp()``` function with a widget:

```
import 'package:flutter/material.dart';

void main() {
  runApp(
    Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
      ),
    ),
  );
}
```

The ```runApp()``` function takes the given ```Widget``` and makes it the **root of the widget tree**. In this example, the widget tree consists of two widgets, the ```Center``` widget and its child, the ```Text``` widget. The framework **forces the root widget to cover the screen**, which means the text “Hello, world” ends up centered on screen. The text direction needs to be specified in this instance; when the MaterialApp widget is used, this is taken care of for you, as demonstrated later.

When writing an app, **you’ll commonly author new widgets that are subclasses of either StatelessWidget or StatefulWidget**, depending on whether your widget manages any state. A widget’s main job is to implement a ```build()``` function, which describes the widget in terms of other, lower-level widgets. The framework builds those widgets in turn until the process bottoms out in widgets that represent the underlying ```RenderObject```, which computes and describes the geometry of the widget.

#### Basic widgets
Flutter comes with a **suite of powerful basic widgets**, of which the following are commonly used:

**Text**
The Text widget lets you create a run of **styled text** within your application.

**Row, Column**
These flex widgets let you create **flexible layouts** in both the horizontal (Row) and vertical (Column) directions. The design of these objects is based on the web’s **flexbox layout model.**

**Stack**
Instead of being linearly oriented (either horizontally or vertically), a **Stack** widget lets you place widgets on top of each other in paint order. You can then use the **Positioned** widget on children of a Stack to position them relative to the top, right, bottom, or left edge of the stack. Stacks are based on the web’s **absolute positioning layout model**.

**Container**
The **Container** widget lets you create a **rectangular visual element**. A container can be decorated with a **BoxDecoration**, such as a background, a border, or a shadow. A **Container** can also have margins, padding, and constraints applied to its size. In addition, a **Container** can be transformed in three dimensional space using a matrix.
Below are some simple widgets that combine these and other widgets:

```
import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget {
  MyAppBar({this.title});

  // Fields in a Widget subclass are always marked "final".

  final Widget title;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56.0, // in logical pixels
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      decoration: BoxDecoration(color: Colors.blue[500]),
      // Row is a horizontal, linear layout.
      child: Row(
        // <Widget> is the type of items in the list.
        children: <Widget>[
          IconButton(
            icon: Icon(Icons.menu),
            tooltip: 'Navigation menu',
            onPressed: null, // null disables the button
          ),
          // Expanded expands its child to fill the available space.
          Expanded(
            child: title,
          ),
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
    );
  }
}

class MyScaffold extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Material is a conceptual piece of paper on which the UI appears.
    return Material(
      // Column is a vertical, linear layout.
      child: Column(
        children: <Widget>[
          MyAppBar(
            title: Text(
              'Example title',
              style: Theme.of(context).primaryTextTheme.title,
            ),
          ),
          Expanded(
            child: Center(
              child: Text('Hello, world!'),
            ),
          ),
        ],
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title: 'My app', // used by the OS task switcher
    home: MyScaffold(),
  ));
}
```
Be sure to have a **uses-material-design**: true entry in the flutter section of your **pubspec.yaml** file. It allows you to use the predefined set of Material icons.

```
name: my_app
flutter:
  uses-material-design: true
```
Many Material Design widgets need to be inside of a MaterialApp to display properly, in order to inherit theme data. Therefore, run the application with a MaterialApp.

The **MyAppBar** widget creates a **Container** with a height of 56 device-independent pixels with an internal padding of 8 pixels, both on the left and the right. Inside the container, MyAppBar uses a Row layout to organize its children. The middle child, the title widget, is marked as Expanded, which means it expands to fill any remaining available space that hasn’t been consumed by the other children. You can have multiple Expanded children and determine the ratio in which they consume the available space using the flex argument to Expanded.

The **MyScaffold** widget organizes its children in a vertical column. At the top of the column it places an instance of MyAppBar, passing the app bar a Text widget to use as its title. Passing widgets as arguments to other widgets is a powerful technique that lets you create generic widgets that can be reused in a wide variety of ways. Finally, MyScaffold uses an Expanded to fill the remaining space with its body, which consists of a centered message.

### Using Material Components
**Flutter provides a number of widgets that help you build apps that follow Material Design**. A Material app starts with the **MaterialApp** widget, which builds a number of useful widgets at the root of your app, including a **Navigator**, which manages a stack of widgets identified by strings, also known as "routes". The **Navigator** lets you transition smoothly between screens of your application. **Using the MaterialApp widget is entirely optional but a good practice**.

```
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Flutter Tutorial',
    home: TutorialHome(),
  ));
}

class TutorialHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Scaffold is a layout for the major Material Components.
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.menu),
          tooltip: 'Navigation menu',
          onPressed: null,
        ),
        title: Text('Example title'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
      // body is the majority of the screen.
      body: Center(
        child: Text('Hello, world!'),
      ),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Add', // used by assistive technologies
        child: Icon(Icons.add),
        onPressed: null,
      ),
    );
  }
}
```

Now that the code has switched from MyAppBar and MyScaffold to the **AppBar** and **Scaffold** widgets, and from material.dart, the app is starting to look at bit more Material. For example, the app bar has a shadow and the title text inherits the correct styling automatically. A floating action button is also added.

Notice that widgets are passed as arguments to other widgets. The Scaffold widget takes a number of different widgets as named arguments, each of which are placed in the Scaffold layout in the appropriate place. Similarly, the AppBar widget lets you pass in widgets for the leading widget, and the actions of the title widget. This pattern recurs throughout the framework and is something you might consider when designing your own widgets.

For more information, see Material Components widgets.

>Note: Material is one of the 2 bundled designs included with Flutter. To create an iOS-centric design, see the **Cupertino components** package, which has its own versions of CupertinoApp, and CupertinoNavigationBar.


