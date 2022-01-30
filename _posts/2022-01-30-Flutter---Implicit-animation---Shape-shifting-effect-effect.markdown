---
layout: post
title:  Flutter - Implicit animation - Shape-shifting effect effect
date:   2022-01-30T21:59:26.585Z
permalink: /flutter-implicit-animations-shape-shifting-effect/
icon: https://codersnack.com/assets/images/flutter-icon.png
categories: [snackpost]
---

> Information drawn from 
- [Flutter.dev - Implicit animations](https://docs.flutter.dev/codelabs/implicit-animations)

The following example shows how to use the **AnimatedContainer** widget to **animate multiple properties (margin, borderRadius, and color) with different types (double and Color).** The example begins with no animation code—it starts with a Material App home screen that contains:

- A Container with borderRadius, margin, and color properties that are different each time you run the example.
- A Change button that does nothing when clicked.

Demo:
![shape-shifting-flutter-animation.gif](https://codersnack.com/assets/images/shape-shifting-flutter-animation.gif)

*Shape-shifting (starter code)*
*lib/main.dart*
```
import 'dart:math';

import 'package:flutter/material.dart';

double randomBorderRadius() {
  return Random().nextDouble() * 64;
}

double randomMargin() {
  return Random().nextDouble() * 64;
}

Color randomColor() {
  return Color(0xFFFFFFFF & Random().nextInt(0xFFFFFFFF));
}

class AnimatedContainerDemo extends StatefulWidget {
  _AnimatedContainerDemoState createState() => _AnimatedContainerDemoState();
}

class _AnimatedContainerDemoState extends State<AnimatedContainerDemo> {
  late Color color;
  late double borderRadius;
  late double margin;

  @override
  initState() {
    super.initState();
    color = randomColor();
    borderRadius = randomBorderRadius();
    margin = randomMargin();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: <Widget>[
            SizedBox(
              width: 128,
              height: 128,
              child: Container(
                margin: EdgeInsets.all(margin),
                decoration: BoxDecoration(
                  color: color,
                  borderRadius: BorderRadius.circular(borderRadius),
                ),
              ),
            ),
            ElevatedButton(
              child: Text('change'),
              onPressed: () => null,
            ),
          ],
        ),
      ),
    );
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: AnimatedContainerDemo(),
    );
  }
}

void main() {
  runApp(
    MyApp(),
  );
}

```


### Animate color, borderRadius, and margin with AnimatedContainer

This section contains a list of steps you can use to add an implicit animation to the shape-shifting starter code. After the steps, you can also run the shape-shifting complete example with the changes already made.

In the shape-shifting starter code, each property in the Container widget (color, borderRadius, and margin) is assigned a value by an associated function (randomColor(), randomBorderRadius(), and randomMargin() respectively). By using an AnimatedContainer widget, you can refactor this code to do the following:

- **Generate new values for color, borderRadius, and margin whenever the user clicks the Change button**.
- **Animate the transition to the new values for color, borderRadius, and margin whenever they are set.**


#### 1. Add an implicit animation

**Change the Container widget to an AnimatedContainer widget**:

*{container1 → container2}/lib/main.dart*
```
22	  // Use of this source code is governed by a BSD-style license
33	  // that can be found in the LICENSE file.
4	+ // ignore_for_file: missing_required_argument
5	+ 
46	  import 'dart:math';
57	  import 'package:flutter/material.dart';
@@ -47,7 +49,7 @@
4749	              SizedBox(
4850	                width: 128,
4951	                height: 128,
50	-               child: Container(
52	+               child: AnimatedContainer(
5153	                  margin: EdgeInsets.all(margin),
5254	                  decoration: BoxDecoration(
5355	                    color: color,
```
 > You can reference the line numbers in the example code to help track where to make these changes in shape-shifting starter code


#### 2. Set starting values for animated properties

**AnimatedContainer automatically animates between old and new values of its properties when they change**. Create a *change() method* that defines the behavior *triggered when the user clicks* the Change button. The change() method can use **setState() to set new values** for the color, borderRadius, and margin state variables:

*{container2 → container3}/lib/main.dart*
```
4040	      margin = randomMargin();
4141	    }
42	+   void change() {
43	+     setState(() {
44	+       color = randomColor();
45	+       borderRadius = randomBorderRadius();
46	+       margin = randomMargin();
47	+     });
48	+   }
49	+ 
4250	    @override
4351	    Widget build(BuildContext context) {
4452	      return Scaffold(
```

#### 1. 3. Set up a trigger for the animation

To set the animation to trigger whenever the user presses the Change button, **invoke the change() method in the onPressed() handler**:

*{container3 → container4}/lib/main.dart*
```
6767	              ),
6868	              ElevatedButton(
6969	                child: const Text('change'),
70	-               onPressed: () => {},
70	+               onPressed: () => change(),
7171	              ),
7272	            ],
7373	          ),
```


#### 4. Set duration

Finally, set the duration of the animation that powers the transition between the old and new values:

*{container4 → container5}/lib/main.dart*
```
22	  // Use of this source code is governed by a BSD-style license
33	  // that can be found in the LICENSE file.
4	- // ignore_for_file: missing_required_argument
5	- 
64	  import 'dart:math';
75	  import 'package:flutter/material.dart';
6	+ const _duration = Duration(milliseconds: 400);
7	+ 
88	  double randomBorderRadius() {
99	    return Random().nextDouble() * 64;
1010	  }
@@ -63,6 +63,7 @@
6363	                    color: color,
6464	                    borderRadius: BorderRadius.circular(borderRadius),
6565	                  ),
66	+                 duration: _duration,
6667	                ),
6768	              ),
6869	              ElevatedButton(
```

run the code and click the Change button to trigger the animation. Notice that each time you click the Change button, the shape animates to its new values for margin, borderRadius, and color.


### Using animation curves

The preceding examples show how implicit animations allow you to animate changes in values for specific widget properties, and how the duration parameter allows you to set the amount of time an animation takes to complete. **Implicit animations also allow you to control changes to the rate of an animation within the duration**. The parameter you **use to define this change in rate is *curve***.

The preceding examples **do not specify a curve, so the implicit animations apply a linear animation curve** by default. **Add a curve parameter to the shape-shifting complete** and watch how the animation changes when you pass the **easeInOutBack** constant for curve:

*{container5 → container6}/lib/main.dart*
```
6464	                    borderRadius: BorderRadius.circular(borderRadius),
6565	                  ),
6666	                  duration: _duration,
67	+                 curve: Curves.easeInOutBack,
6768	                ),
6869	              ),
6970	              ElevatedButton(
```
Now that you have passed easeInOutBack as the value for curve to AnimatedContainer, **notice that the rates of change for margin, borderRadius, and color follow the curve defined by the easeInOutBack curve**: [video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_back.mp4)

The easeInOutBack constant is only one of many that you can pass for the curve parameter. Explore the list of curve constants to discover more ways to use curve to modify the look and feel of your animations.


### Putting it all together

The shape-shifting complete example animates transitions between values for margin, borderRadius, and color properties. Note that AnimatedContainer animates changes to any of its properties, including those you didn’t use such as padding, transform, and even child and alignment! The shape-shifting complete example builds upon fade-in complete by showing additional capabilities of implicit animations:

- Some implicit animations (for example, AnimatedOpacity) only animate a single property, while others (like AnimatedContainer) can animate many properties.
- Implicit animations automatically animate between the old and new values of properties when they change using the provided curve and duration.
- If you do not specify a curve, implicit animations default to a linear curve.

