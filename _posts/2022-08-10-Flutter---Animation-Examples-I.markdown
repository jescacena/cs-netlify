---
layout: post
title:  Flutter - Animation Examples I
date:   2022-01-30T22:23:27.606Z
permalink: /flutter-animations-examples-1/
icon: https://codersnack.com/assets/images/flutter-icon.png
categories: [snackpost]
---

> Information drawn from 
- [Flutter.dev - Animations Tutorial](https://docs.flutter.dev/development/ui/animations/tutorial)

This section walks you through 5 animation examples. Each section provides a link to the source code for that example.

**Demo**

![flutter-poc-animate-1.gif](https://codersnack.com/assets/images/flutter-poc-animate-1.gif)

### Rendering animations

> **What's the point?**
- How to add basic animation to a widget using addListener() and setState().
- Every time the Animation generates a new number, the addListener() function calls setState().
- How to define an AnimationController with the required vsync parameter.
- Understanding the “..” syntax in “..addListener”, also known as Dart’s cascade notation.
- To make a class private, start its name with an underscore (_).

**So far you’ve learned how to generate a sequence of numbers over time**. Nothing has been rendered to the screen. **To render with an Animation object, store the Animation object as a member of your widget, then use its value to decide how to draw**.

Consider the following app that draws the Flutter logo without animation:

```
import 'package:flutter/material.dart';

void main() => runApp(const LogoApp());

class LogoApp extends StatefulWidget {
  const LogoApp({Key? key}) : super(key: key);

  @override
  _LogoAppState createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 10),
        height: 300,
        width: 300,
        child: const FlutterLogo(),
      ),
    );
  }
}
```

App source: [animate0](https://github.com/flutter/website/tree/main/examples/animation/animate0)

**The following shows the same code modified to animate the logo to grow from nothing to full size**. When defining an *AnimationController*, you must pass in a *vsync* object. The vsync parameter is described in the AnimationController section.

The changes from the non-animated example are highlighted:

**{animate0 → animate1}/lib/main.dart**
```
 Viewed
@@ -9,16 +9,39 @@
99	    _LogoAppState createState() => _LogoAppState();
1010	  }
11	- class _LogoAppState extends State<LogoApp> {
11	+ class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
12	+   late Animation<double> animation;
13	+   late AnimationController controller;
14	+ 
15	+   @override
16	+   void initState() {
17	+     super.initState();
18	+     controller =
19	+         AnimationController(duration: const Duration(seconds: 2), vsync: this);
20	+     animation = Tween<double>(begin: 0, end: 300).animate(controller)
21	+       ..addListener(() {
22	+         setState(() {
23	+           // The state that has changed here is the animation object’s value.
24	+         });
25	+       });
26	+     controller.forward();
27	+   }
28	+ 
1229	    @override
1330	    Widget build(BuildContext context) {
1431	      return Center(
1532	        child: Container(
1633	          margin: const EdgeInsets.symmetric(vertical: 10),
17	-         height: 300,
18	-         width: 300,
34	+         height: animation.value,
35	+         width: animation.value,
1936	          child: const FlutterLogo(),
2037	        ),
2138	      );
2239	    }
40	+ 
41	+   @override
42	+   void dispose() {
43	+     controller.dispose();
44	+     super.dispose();
45	+   }
2346	  }
```

App source: [animate1](https://github.com/flutter/website/tree/main/examples/animation/animate1)

The addListener() function calls setState(), **so every time the Animation generates a new number, the current frame is marked dirty, which forces build() to be called again**. **In build(), the container changes size because its height and width now use animation.value instead of a hardcoded value**. Dispose of the controller when the State object is discarded to prevent memory leaks.

With these few changes, you’ve created your first animation in Flutter!

> **Dart language tricks**: You might not be familiar with Dart’s cascade notation—the two dots in ..addListener(). This syntax means that the addListener() method is called with the return value from animate(). Consider the following example:

```
animation = Tween<double>(begin: 0, end: 300).animate(controller)
  ..addListener(() {
    // ···
  });
```

> This code is equivalent to:

```
animation = Tween<double>(begin: 0, end: 300).animate(controller);
animation.addListener(() {
    // ···
  });
```

> You can learn more about cascade notation in the Dart Language Tour.

