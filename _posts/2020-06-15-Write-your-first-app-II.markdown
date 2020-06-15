---
layout: post
title:  Write your first app II
date:   2020-04-21T21:45:14.341Z
permalink: /flutter-write-your-first-app-2/
icon: https://codersnack.com/assets/images/flutter-icon.png
categories: [snackpost]
---

> *Information drawn from* - [Flutter.dev - Write your first flutter app](https://flutter.dev/docs/get-started/codelab)

### Step 3: Add a Stateful widget

**Stateless widgets are immutable**, meaning that their properties can’t change: all values are final.

**Stateful widgets maintain state** that might change during the lifetime of the widget. Implementing a stateful widget requires at least two classes:  a **StatefulWidget** class that creates an instance of a **State** class. The **StatefulWidget** class is, itself, immutable, but the **State class persists over the lifetime of the widget**.

In this step, you’ll add a stateful widget, **RandomWords**, which creates its **State** class, **RandomWordsState**. You’ll then use **RandomWords** as a child inside the existing **MyApp** stateless widget.

Create a minimal state class. Add the following to the bottom of main.dart:

**lib/main.dart (RandomWordsState)**

```
class RandomWordsState extends State<RandomWords> {
  // TODO Add build() method
}
```
Notice the declaration ```State<RandomWords>```. This indicates that we’re using the generic **State** class specialized for use with **RandomWords**. Most of the app’s logic and state resides here: it maintains the state for the **RandomWords** widget. This class saves the generated word pairs, which grows infinitely as the user scrolls, and favorite word pairs (in part 2), as the user adds or removes them from the list by toggling the heart icon.

**RandomWordsState** depends on the **RandomWords** class. You’ll add that next.

Add the stateful **RandomWords** widget to **main.dart.** The **RandomWords** widget does little else beside creating its **State** class:

**lib/main.dart (RandomWords)**

```
class RandomWords extends StatefulWidget {
  @override
  RandomWordsState createState() => RandomWordsState();
}
```
After adding the state class, the IDE complains that the class is missing a build method. Next, you’ll add a basic **build method** that generates the word pairs by moving the word generation code from MyApp to **RandomWordsState**.

Add the **build()** method to **RandomWordsState**:

**lib/main.dart (RandomWordsState)**

```
class RandomWordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random();
    return Text(wordPair.asPascalCase);
  }
}
```
Remove the word generation code from MyApp by making the changes shown in the following diff:

**{step2_use_package → step3_stateful_widget}/lib/main.dart**
```
	  class MyApp extends StatelessWidget {
	    @override
	    Widget build(BuildContext context) {
	-     final wordPair = WordPair.random();
	      return MaterialApp(
	        title: 'Welcome to Flutter',
	        home: Scaffold(
	            title: Text('Welcome to Flutter'),
	          ),
	          body: Center(
	-           child: Text(wordPair.asPascalCase),
	+           child: RandomWords(),
	          ),
	        ),
	      );
	    }
```
Restart the app. The app should behave as before, displaying a word pairing each time you hot reload or save the app.

### Problems?
If your app is not running correctly, look for typos. If you want to try some of Flutter’s debugging tools, check out the DevTools suite of debugging and profiling tools. If needed, use the code at the following link to get back on track.

- [lib/main.dart](https://raw.githubusercontent.com/flutter/codelabs/master/startup_namer/step3_stateful_widget/lib/main.dart)

### Step 4: Create an infinite scrolling ListView
In this step, you’ll expand **RandomWordsState** to generate and **display a list of word pairings.** As the user scrolls, the list displayed in a **ListView** widget, grows infinitely. **ListView’s builder factory constructor allows you to build a list view lazily, on demand**.

Add a **_suggestions** list to the **RandomWordsState** class for saving suggested word pairings. Also, add a **_biggerFont** variable for making the font size larger.

**lib/main.dart**
```
class RandomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[];
  final _biggerFont = const TextStyle(fontSize: 18.0);
  // ···
}
```
> Note: Prefixing an identifier with an underscore enforces privacy in the Dart language.

Next, you’ll add a **_buildSuggestions()** function to the **RandomWordsState** class. This method builds the **ListView** that displays the suggested word pairing.

The **ListView** class provides a **builder** property, **itemBuilder**, that’s a factory builder and callback function specified as an anonymous function. Two parameters are passed to the function: the **BuildContext**, and the **row iterator**, i. The iterator begins at 0 and increments each time the function is called. It increments twice for every suggested word pairing: once for the **ListTile**, and once for the **Divider**. This model allows the **suggested list to grow infinitely as the user scrolls**.

Add a **_buildSuggestions()** function to the **RandomWordsState** class:

**lib/main.dart (_buildSuggestions)**
```
Widget _buildSuggestions() {
  return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemBuilder: /*1*/ (context, i) {
        if (i.isOdd) return Divider(); /*2*/

        final index = i ~/ 2; /*3*/
        if (index >= _suggestions.length) {
          _suggestions.addAll(generateWordPairs().take(10)); /*4*/
        }
        return _buildRow(_suggestions[index]);
      });
}
```
1.The **itemBuilder** callback is called once per suggested word pairing, and places each suggestion into a **ListTile** row. For even rows, the function adds a **ListTile** row for the word pairing. For odd rows, the function adds a **Divider** widget to visually separate the entries. Note that the divider might be difficult to see on smaller devices.

2.Add a one-pixel-high divider widget before each row in the **ListView**.

3.The expression ```i ~/ 2``` divides i by 2 and returns an integer result. For example: 1, 2, 3, 4, 5 becomes 0, 1, 1, 2, 2. This calculates the actual number of word pairings in the **ListView**, minus the divider widgets.
If you’ve reached the end of the available word pairings, then generate 10 more and add them to the suggestions list.
The **_buildSuggestions()** function calls **_buildRow()** once per word pair. This function displays each new pair in a **ListTile**, which allows you to make the rows more attractive in the next step.

4.Add a **_buildRow()** function to **RandomWordsState**:

**lib/main.dart (_buildRow)**
```
Widget _buildRow(WordPair pair) {
  return ListTile(
    title: Text(
      pair.asPascalCase,
      style: _biggerFont,
    ),
  );
}
```

5.In the **RandomWordsState** class, update the **build()** method to use **_buildSuggestions()**, rather than directly calling the word generation library. (Scaffold implements the basic Material Design visual layout.) Replace the method body with the highlighted code:

**lib/main.dart (build)**
```
@override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text('Startup Name Generator'),
    ),
    body: _buildSuggestions(),
  );
}
```
7.In the **MyApp** class, update the **build()** method by changing the title, and changing the home to be a **RandomWords** widget:

**{step3_stateful_widget → step4_infinite_list}/lib/main.dart**

```
	  class MyApp extends StatelessWidget {
	    @override
	    Widget build(BuildContext context) {
	      return MaterialApp(
	-       title: 'Welcome to Flutter',
	-       home: Scaffold(
	+       title: 'Startup Name Generator',
	+       home: RandomWords(),
	-         appBar: AppBar(
	-           title: Text('Welcome to Flutter'),
	-         ),
	-         body: Center(
	-           child: RandomWords(),
	-         ),
	-       ),
	      );
	    }
```
Restart the app. You should see a list of word pairings no matter how far you scroll.


### Problems?
If your app is not running correctly, look for typos. If you want to try some of Flutter’s debugging tools, check out the DevTools suite of debugging and profiling tools. If needed, use the code at the following link to get back on track.

[lib/main.dart](https://raw.githubusercontent.com/flutter/codelabs/master/startup_namer/step4_infinite_list/lib/main.dart)

> Important: Do not test the performance of your app with debug and hot reload enabled.
> So far you’ve been running your app in debug mode. Debug mode trades performance for useful developer  features such as hot reload and step debugging. It’s not unexpected to see slow performance and janky  animations in debug mode. Once you are ready to analyze performance or release your app, you’ll want to use Flutter’s “profile” or “release” build modes. For more details, see Flutter’s build modes.

 > Important: If you’re concerned about the package size of your app, see Measuring your app’s size.

![startup namer part 2](https://codersnack.com/assets/images/flutter-first-app-list-android.png)
