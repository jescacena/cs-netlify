---
layout: post
title:  Flutter - Essential animation concepts and classes
date:   2022-01-24T20:27:28.025Z
permalink: /flutter-animations-essencials/
icon: https://codersnack.com/assets/images/flutter-icon.png
categories: [snackpost]
---

> Information drawn from 
- [Flutter - Animations Tutorial](https://docs.flutter.dev/development/ui/animations/tutorial)

### What's the point?
- ***Animation***, a core class in Flutter’s animation library, **interpolates the values used to guide an animation**.
- An *Animation* object **knows the current state of an animation** (for example, whether it’s started, stopped, or moving forward or in reverse), but doesn’t know anything about what appears onscreen.
- An ***AnimationController* manages the Animation**.
- A ***CurvedAnimation*** defines **progression as a non-linear curve**.
- A ***Tween*** **interpolates between the range of data as used by the object being animated**. For example, a Tween might define an interpolation from red to blue, or from 0 to 255.
- Use ***Listeners*** and ***StatusListeners*** to **monitor animation state changes**.

**The animation system in Flutter is based on typed *Animation* objects**. Widgets can either incorporate these animations in their build functions directly by reading their current value and listening to their state changes or they can use the animations as the basis of more elaborate animations that they pass along to other widgets.


### Animation ```<double>```

In Flutter, **an *Animation* object knows nothing about what is onscreen**. An Animation is an abstract class that **understands its current value and its state** (completed or dismissed). One of the more commonly used animation types is **```Animation<double>```** .

**An Animation object sequentially generates interpolated numbers between two values over a certain duration**. The output of an Animation object might be linear, a curve, a step function, or any other mapping you can devise. **Depending on how the Animation object is controlled, it could run in reverse**, or even switch directions in the middle.

Animations can also interpolate types other than double, such as **```Animation<Color>```** or **```Animation<Size>```**.

An Animation object **has state**. Its current value is always available in the .value member.

> An Animation object knows nothing about rendering or build() functions.

### Curved­Animation

A CurvedAnimation **defines the animation’s progress as a non-linear curve**.

```
animation = CurvedAnimation(parent: controller, curve: Curves.easeIn);
```

 > Note: The Curves class defines many commonly used curves, or you can create your own. For example:

```
import 'dart:math';

class ShakeCurve extends Curve {
  @override
  double transform(double t) => sin(t * pi * 2);
}
```
> Browse the Curves documentation for a complete listing (with visual previews) of the Curves constants that ship with Flutter.

**CurvedAnimation** and AnimationController (described in the next section) are both of type ```Animation<double>```, so you can pass them interchangeably. The **CurvedAnimation wraps the object it’s modifying**—you don’t subclass AnimationController to implement a curve.

### Animation­Controller

**AnimationController is a special Animation object that generates a new value whenever the hardware is ready for a new frame**. By default, an AnimationController linearly produces the numbers from 0.0 to 1.0 during a given duration. For example, this code creates an Animation object, but does not start it running:

```
controller =
    AnimationController(duration: const Duration(seconds: 2), vsync: this);
```

***AnimationController* derives from ```Animation<double>```** , so it can be used wherever an Animation object is needed. However, the AnimationController has **additional methods to control the animation**. For example, **you start an animation with the *.forward()* method**. The generation of numbers is tied to the screen refresh, so typically 60 numbers are generated per second. **After each number is generated, each *Animation* object calls the attached *Listener* objects**. To create a custom display list for each child, see *RepaintBoundary*.

**When creating an *AnimationController*, you pass it a *vsync* argument**. The presence of vsync **prevents offscreen animations from consuming unnecessary resources**. You **can use your stateful object as the vsync by adding *SingleTickerProviderStateMixin* to the class definition**. You can see an example of this in animate1 on GitHub.

>**Note**: In some cases, a position might exceed the AnimationController’s 0.0-1.0 range. For example, the fling() function allows you to provide velocity, force, and position (via the Force object). The position can be anything and so can be outside of the 0.0 to 1.0 range.
A CurvedAnimation can also exceed the 0.0 to 1.0 range, even if the AnimationController doesn’t. Depending on the curve selected, the output of the CurvedAnimation can have a wider range than the input. For example, elastic curves such as Curves.elasticIn significantly overshoots or undershoots the default range.

### Tween

By default, the AnimationController object ranges from 0.0 to 1.0. If you need a different range or a different data type, **you can use a *Tween* to configure an animation to interpolate to a different range or data type**. For example, the following Tween goes from -200.0 to 0.0:

```
tween = Tween<double>(begin: -200, end: 0);
```

**A *Tween* is a *stateless* object that takes only begin and end**. The sole job of a Tween is to **define a mapping from an input range to an output range**. The input range is commonly 0.0 to 1.0, but that’s not a requirement.

**A Tween inherits from ```Animatable<T>```**, not from ```Animation<T>```. An Animatable, like Animation, **doesn’t have to output double**. For example, ColorTween specifies a progression between two colors.

```
colorTween = ColorTween(begin: Colors.transparent, end: Colors.black54);
```

**A Tween object does not store any state**. Instead, it provides the **evaluate(```Animation<double>``` animation) method** that applies the mapping function to the current value of the animation. The current value of the Animation object can be found in the .value method. The evaluate function also performs some housekeeping, such as ensuring that begin and end are returned when the animation values are 0.0 and 1.0, respectively.

#### Tween.animate

**To use a Tween object, call animate() on the Tween, passing in the controller object**. For example, the following code generates the integer values from 0 to 255 over the course of 500 ms.

```
AnimationController controller = AnimationController(
    duration: const Duration(milliseconds: 500), vsync: this);
Animation<int> alpha = IntTween(begin: 0, end: 255).animate(controller);
```
>  **Note**: The animate() method returns an Animation, not an Animatable.

The following example shows a controller, a curve, and a Tween:

```
AnimationController controller = AnimationController(
    duration: const Duration(milliseconds: 500), vsync: this);
final Animation<double> curve =
    CurvedAnimation(parent: controller, curve: Curves.easeOut);
Animation<int> alpha = IntTween(begin: 0, end: 255).animate(curve);
```

### Animation notifications

**An *Animation* object can have *Listeners* and *StatusListeners*, defined with *addListener*() and *addStatusListener*()**. 

A *Listener* is **called whenever the value of the animation changes**. The most common behavior of a Listener is to **call setState() to cause a rebuild**. 

A *StatusListener* is **called when an animation begins, ends, moves forward, or moves reverse**, as defined by *AnimationStatus*. The next section has an example of the addListener() method, and Monitoring the progress of the animation shows an example of addStatusListener().

