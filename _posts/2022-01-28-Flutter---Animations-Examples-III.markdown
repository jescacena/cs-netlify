---
layout: post
title:  Flutter - Animations Examples III
date:   2022-01-26T17:32:05.008Z
permalink: /flutter-animations-examples-3/
icon: https://codersnack.com/assets/images/flutter-icon.png
categories: [snackpost]
---

> Information drawn from 
- [Flutter.dev - Animations Tutorial](https://docs.flutter.dev/development/ui/animations/tutorial)

### Refactoring with AnimatedBuilder


> **What's the point?**
- An **AnimatedBuilder** understands **how to render the transition**.
- An **AnimatedBuilder** doesn’t know how to render the widget, nor does it manage the Animation object.
- Use **AnimatedBuilder** to describe an animation as part of a build method for another widget. If you simply want to define a widget with a reusable animation, use an AnimatedWidget, as shown in the Simplifying with AnimatedWidget section.
- Examples of AnimatedBuilders in the Flutter API: **BottomSheet, ExpansionTile, PopupMenu, ProgressIndicator, RefreshIndicator, Scaffold, SnackBar, TabBar, TextField**.

One problem with the code in the animate3 example, is that changing the animation required changing the widget that renders the logo. A better solution is to **separate responsibilities into different classes**:

- **Render the logo**
- **Define the Animation object**
- **Render the transition**

You can **accomplish this separation with the help of the *AnimatedBuilder* class**. An AnimatedBuilder is a separate class in the render tree. Like AnimatedWidget, **AnimatedBuilder automatically listens to notifications from the Animation object, and marks the widget tree dirty as necessary**, so you don’t need to call addListener().

The widget tree for the [animate4](https://github.com/flutter/website/tree/main/examples/animation/animate4) example looks like this:

![AnimatedBuilder-WidgetTree](https://codersnack.com/assets/images/AnimatedBuilder-WidgetTree.png)
*AnimatedBuilder widget tree*

Starting from the bottom of the widget tree, the code for rendering the logo is straightforward:

```
class LogoWidget extends StatelessWidget {
  const LogoWidget({Key? key}) : super(key: key);

  // Leave out the height and width so it fills the animating parent
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: const FlutterLogo(),
    );
  }
}
```

**The middle three blocks in the diagram are all created in the build() method in *GrowTransition***, shown below. The GrowTransition widget itself is stateless and holds the set of final variables necessary to define the transition animation. The build() function creates and returns the AnimatedBuilder, which takes the (Anonymous builder) method and the LogoWidget object as parameters. The work of rendering the transition actually happens in the (Anonymous builder) method, which creates a Container of the appropriate size to force the LogoWidget to shrink to fit.

One tricky point in the code below is that the child looks like it’s specified twice. What’s happening is that the outer reference of child is passed to AnimatedBuilder, which passes it to the anonymous closure, which then uses that object as its child. The net result is that the AnimatedBuilder is inserted in between the two widgets in the render tree.

```
class GrowTransition extends StatelessWidget {
  const GrowTransition({required this.child, required this.animation, Key? key})
      : super(key: key);

  final Widget child;
  final Animation<double> animation;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: AnimatedBuilder(
        animation: animation,
        builder: (context, child) {
          return SizedBox(
            height: animation.value,
            width: animation.value,
            child: child,
          );
        },
        child: child,
      ),
    );
  }
}
```
Finally, the code to initialize the animation looks very similar to the animate2 example. The initState() method creates an AnimationController and a Tween, then binds them with animate(). **The magic happens in the build() method, which returns a GrowTransition object with a LogoWidget as a child, and an animation object to drive the transition**. These are the three elements listed in the bullet points above.

***{animate2 → animate4}/lib/main.dart***
```
 Viewed
@@ -1,27 +1,47 @@
11	  import 'package:flutter/material.dart';
22	  void main() => runApp(const LogoApp());
3	- class AnimatedLogo extends AnimatedWidget {
4	-   const AnimatedLogo({Key? key, required Animation<double> animation})
5	-       : super(key: key, listenable: animation);
3	+ class LogoWidget extends StatelessWidget {
4	+   const LogoWidget({Key? key}) : super(key: key);
5	+ 
6	+   // Leave out the height and width so it fills the animating parent
7	+   @override
8	+   Widget build(BuildContext context) {
9	+     return Container(
10	+       margin: const EdgeInsets.symmetric(vertical: 10),
11	+       child: const FlutterLogo(),
12	+     );
13	+   }
14	+ }
15	+ 
16	+ class GrowTransition extends StatelessWidget {
17	+   const GrowTransition({required this.child, required this.animation, Key? key})
18	+       : super(key: key);
19	+ 
20	+   final Widget child;
21	+   final Animation<double> animation;
622	    @override
723	    Widget build(BuildContext context) {
8	-     final animation = listenable as Animation<double>;
924	      return Center(
10	-       child: Container(
11	-         margin: const EdgeInsets.symmetric(vertical: 10),
12	-         height: animation.value,
13	-         width: animation.value,
14	-         child: const FlutterLogo(),
25	+       child: AnimatedBuilder(
26	+         animation: animation,
27	+         builder: (context, child) {
28	+           return SizedBox(
29	+             height: animation.value,
30	+             width: animation.value,
31	+             child: child,
32	+           );
33	+         },
34	+         child: child,
1535	        ),
1636	      );
1737	    }
1838	  }
1939	  class LogoApp extends StatefulWidget {
2040	    const LogoApp({Key? key}) : super(key: key);
2141	    @override
2242	    _LogoAppState createState() => _LogoAppState();
@@ -34,18 +54,23 @@
3454	    @override
3555	    void initState() {
3656	      super.initState();
3757	      controller =
3858	          AnimationController(duration: const Duration(seconds: 2), vsync: this);
3959	      animation = Tween<double>(begin: 0, end: 300).animate(controller);
4060	      controller.forward();
4161	    }
4262	    @override
43	-   Widget build(BuildContext context) => AnimatedLogo(animation: animation);
63	+   Widget build(BuildContext context) {
64	+     return GrowTransition(
65	+       child: const LogoWidget(),
66	+       animation: animation,
67	+     );
68	+   }
4469	    @override
4570	    void dispose() {
4671	      controller.dispose();
4772	      super.dispose();
4873	    }
4974	  }
```

App source: [animate4](https://github.com/flutter/website/tree/main/examples/animation/animate4)

### Simultaneous animations

> **What's the point?**
- The **Curves** class defines an array of commonly used curves that you can use with a **CurvedAnimation**.

In this section, you’ll build on the example from monitoring the progress of the animation (animate3), which used AnimatedWidget to animate in and out continuously. **Consider the case where you want to animate in and out while the opacity animates from transparent to opaque.**

 > **Note**: This example shows how to use multiple tweens on the same animation controller, where each tween manages a different effect in the animation. It is for illustrative purposes only. If you were tweening opacity and size in production code, you’d probably use **FadeTransition** and **SizeTransition** instead.

Each **tween manages an aspect of the animation**. For example:

```
controller =
    AnimationController(duration: const Duration(seconds: 2), vsync: this);
sizeAnimation = Tween<double>(begin: 0, end: 300).animate(controller);
opacityAnimation = Tween<double>(begin: 0.1, end: 1).animate(controller);
```

You can get the size with sizeAnimation.value and the opacity with opacityAnimation.value, but **the constructor for AnimatedWidget only takes a single Animation object. To solve this problem, the example creates its own Tween objects and explicitly calculates the values.**

**Change AnimatedLogo to encapsulate its own Tween objects**, and its build() method calls Tween.evaluate() on the parent’s animation object to calculate the required size and opacity values. The following code shows the changes with highlights:

```
class AnimatedLogo extends AnimatedWidget {
  const AnimatedLogo({Key? key, required Animation<double> animation})
      : super(key: key, listenable: animation);

  // Make the Tweens static because they don't change.
  static final _opacityTween = Tween<double>(begin: 0.1, end: 1);
  static final _sizeTween = Tween<double>(begin: 0, end: 300);

  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      child: Opacity(
        opacity: _opacityTween.evaluate(animation),
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 10),
          height: _sizeTween.evaluate(animation),
          width: _sizeTween.evaluate(animation),
          child: const FlutterLogo(),
        ),
      ),
    );
  }
}

class LogoApp extends StatefulWidget {
  const LogoApp({Key? key}) : super(key: key);

  @override
  _LogoAppState createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller =
        AnimationController(duration: const Duration(seconds: 2), vsync: this);
    animation = CurvedAnimation(parent: controller, curve: Curves.easeIn)
      ..addStatusListener((status) {
        if (status == AnimationStatus.completed) {
          controller.reverse();
        } else if (status == AnimationStatus.dismissed) {
          controller.forward();
        }
      });
    controller.forward();
  }

  @override
  Widget build(BuildContext context) => AnimatedLogo(animation: animation);

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
```

App source: [animate5](https://github.com/flutter/website/tree/main/examples/animation/animate5)

