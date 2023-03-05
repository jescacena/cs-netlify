---
layout: main-content-post
title:  Flutter - Animation Examples II
date:   2022-01-30T22:16:10.073Z
permalink: /flutter-animations-examples-2/main-content/
icon: https://codersnack.com/assets/images/flutter-icon.png
categories: [snack-main-content-post]
---


###  Simplifying with Animated­Widget

**Demo**
![flutter-poc-animate-2.gif](https://codersnack.com/assets/images/flutter-poc-animate-2.gif)

> **What's the point?**
- How to use the **AnimatedWidget** helper class (instead of addListener() and setState()) to **create a widget that animates**.
- Use **AnimatedWidget** to create a widget that performs a **reusable animation**. To separate the transition from the widget, use an **AnimatedBuilder**, as shown in the Refactoring with AnimatedBuilder section.
- Examples of **AnimatedWidgets** in the Flutter API: **AnimatedBuilder, AnimatedModalBarrier, DecoratedBoxTransition, FadeTransition, PositionedTransition, RelativePositionedTransition, RotationTransition, ScaleTransition, SizeTransition, SlideTransition.**

The **AnimatedWidget** base class **allows you to separate out the core widget code from the animation code**. AnimatedWidget **doesn’t need to maintain a State object to hold the animation**. Add the following AnimatedLogo class:

**lib/main.dart (AnimatedLogo)**
```
class AnimatedLogo extends AnimatedWidget {
  const AnimatedLogo({Key? key, required Animation<double> animation})
      : super(key: key, listenable: animation);

  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 10),
        height: animation.value,
        width: animation.value,
        child: const FlutterLogo(),
      ),
    );
  }
}
```

AnimatedLogo uses the current value of the animation when drawing itself.

**The LogoApp still manages the AnimationController and the Tween**, and it passes the Animation object to AnimatedLogo:

**{animate1 → animate2}/lib/main.dart**
```
 Viewed
@@ -1,10 +1,28 @@
11	  import 'package:flutter/material.dart';
22	  void main() => runApp(const LogoApp());
3	+ class AnimatedLogo extends AnimatedWidget {
4	+   const AnimatedLogo({Key? key, required Animation<double> animation})
5	+       : super(key: key, listenable: animation);
6	+ 
7	+   @override
8	+   Widget build(BuildContext context) {
9	+     final animation = listenable as Animation<double>;
10	+     return Center(
11	+       child: Container(
12	+         margin: const EdgeInsets.symmetric(vertical: 10),
13	+         height: animation.value,
14	+         width: animation.value,
15	+         child: const FlutterLogo(),
16	+       ),
17	+     );
18	+   }
19	+ }
20	+ 
321	  class LogoApp extends StatefulWidget {
422	    const LogoApp({Key? key}) : super(key: key);
523	    @override
624	    _LogoAppState createState() => _LogoAppState();
725	  }
@@ -15,32 +33,18 @@
1533	    @override
1634	    void initState() {
1735	      super.initState();
1836	      controller =
1937	          AnimationController(duration: const Duration(seconds: 2), vsync: this);
20	-     animation = Tween<double>(begin: 0, end: 300).animate(controller)
21	-       ..addListener(() {
22	-         setState(() {
23	-           // The state that has changed here is the animation object’s value.
24	-         });
25	-       });
38	+     animation = Tween<double>(begin: 0, end: 300).animate(controller);
2639	      controller.forward();
2740	    }
2841	    @override
29	-   Widget build(BuildContext context) {
30	-     return Center(
31	-       child: Container(
32	-         margin: const EdgeInsets.symmetric(vertical: 10),
33	-         height: animation.value,
34	-         width: animation.value,
35	-         child: const FlutterLogo(),
36	-       ),
37	-     );
38	-   }
42	+   Widget build(BuildContext context) => AnimatedLogo(animation: animation);
3943	    @override
4044	    void dispose() {
4145	      controller.dispose();
4246	      super.dispose();
4347	    }
```

App source: [animate2](https://github.com/flutter/website/tree/main/examples/animation/animate2)


### Monitoring the progress of the animation

> **What's the point?**
- Use addStatusListener() for notifications of changes to the animation’s state, such as starting, stopping, or reversing direction.
- Run an animation in an infinite loop by reversing direction when the animation has either completed or returned to its starting state.

It’s often helpful to know when an animation changes state, such as finishing, moving forward, or reversing. You can get notifications for this with **addStatusListener()**. The following code modifies the previous example so that **it listens for a state change and prints an update**. The highlighted line shows the change:

```
class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller =
        AnimationController(duration: const Duration(seconds: 2), vsync: this);
    animation = Tween<double>(begin: 0, end: 300).animate(controller)
      ..addStatusListener((state) => print('$state'));
    controller.forward();
  }
  // ...
}
```

Running this code produces this output:

```
AnimationStatus.forward
AnimationStatus.completed
```

Next, **use *addStatusListener*() to reverse the animation at the beginning or the end**. This creates a “breathing” effect:

**{animate2 → animate3}/lib/main.dart**
```
 Viewed
@@ -35,7 +35,15 @@
3535	    void initState() {
3636	      super.initState();
3737	      controller =
3838	          AnimationController(duration: const Duration(seconds: 2), vsync: this);
39	-     animation = Tween<double>(begin: 0, end: 300).animate(controller);
39	+     animation = Tween<double>(begin: 0, end: 300).animate(controller)
40	+       ..addStatusListener((status) {
41	+         if (status == AnimationStatus.completed) {
42	+           controller.reverse();
43	+         } else if (status == AnimationStatus.dismissed) {
44	+           controller.forward();
45	+         }
46	+       })
47	+       ..addStatusListener((state) => print('$state'));
4048	      controller.forward();
4149	    }
```
App source: [animate3](https://github.com/flutter/website/tree/main/examples/animation/animate3)

