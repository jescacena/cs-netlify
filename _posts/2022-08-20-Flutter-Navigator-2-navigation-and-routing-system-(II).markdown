---
layout: post
title:  Flutter Navigator 2 navigation and routing system (II)
date:   2022-08-18T23:05:31.404Z
permalink: /flutter-navigator-2-II/
icon: https://codersnack.com/assets/images/flutter-icon.png
categories: [snackpost]
---

> Information drawn from 
- [Medium - Learning Flutter’s new navigation and routing system - John Ryan](https://medium.com/flutter/learning-flutters-new-navigation-and-routing-system-7c9068155ade)



##  Navigator 2.0 exercise

This section leads you through an exercise using the Navigator 2.0 API. We’ll end up with an app that can stay in sync with the URL bar, and handle back button presses from the app and the browser, as shown in the following GIF:

![navigator 2 example](https://miro.medium.com/max/1400/1*PYHrYurwAGyQC8vsnAaWiA.gif)

To follow along, switch to the master channel, **create a new Flutter project with web support,** and replace the contents of **lib/main.dart** with the following:

```
import 'package:flutter/material.dart';

void main() {
  runApp(BooksApp());
}

class Book {
  final String title;
  final String author;

  Book(this.title, this.author);
}

class BooksApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _BooksAppState();
}

class _BooksAppState extends State<BooksApp> {
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Books App',
      home: Navigator(
        pages: [
          MaterialPage(
            key: ValueKey('BooksListPage'),
            child: Scaffold(),
          )
        ],
        onPopPage: (route, result) => route.didPop(result),
      ),
    );
  }
}
```

## Pages

**The Navigator has a new pages argument in its constructor. If the list of Page objects changes, Navigator updates the stack of routes to match**. To see how this works, we’ll build an app that displays a list of books.

In *_BooksAppState*, keep two pieces of state: a list of books and the selected book:

```
class _BooksAppState extends State<BooksApp> {
  // New:
  Book _selectedBook;
  bool show404 = false;
  List<Book> books = [
    Book('Left Hand of Darkness', 'Ursula K. Le Guin'),
    Book('Too Like the Lightning', 'Ada Palmer'),
    Book('Kindred', 'Octavia E. Butler'),
  ];
  
  // ...
```

Then in *_BooksAppState*, return a *Navigator* with a list of *Page* objects:

```
@override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Books App',
      home: Navigator(
        pages: [
          MaterialPage(
            key: ValueKey('BooksListPage'),
            child: BooksListScreen(
              books: books,
              onTapped: _handleBookTapped,
            ),
          ),
        ],
      ),
    );
  }
void _handleBookTapped(Book book) {
    setState(() {
      _selectedBook = book;
    });
  }
// ...
class BooksListScreen extends StatelessWidget {
  final List<Book> books;
  final ValueChanged<Book> onTapped;
BooksListScreen({
    @required this.books,
    @required this.onTapped,
  });
@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: ListView(
        children: [
          for (var book in books)
            ListTile(
              title: Text(book.title),
              subtitle: Text(book.author),
              onTap: () => onTapped(book),
            )
        ],
      ),
    );
  }
}
```

Since this app has two screens, a list of books and a screen showing the details, add a second (detail) page if a book is selected (using collection if):

```

pages: [
  MaterialPage(
    key: ValueKey('BooksListPage'),
    child: BooksListScreen(
      books: books,
      onTapped: _handleBookTapped,
    ),
  ),
// New:
  if (show404)
    MaterialPage(key: ValueKey('UnknownPage'), child: UnknownScreen())
  else if (_selectedBook != null)
    MaterialPage(
        key: ValueKey(_selectedBook),
        child: BookDetailsScreen(book: _selectedBook))
],
```

**Note that the key for the page is defined by the value of the book object**. This tells the *Navigator* that this *MaterialPage* object is different from another when the *Book* object is different. **Without a unique key, the framework can’t determine when to show a transition animation between different *Pages***.

> **Note**: If you prefer, you can also extend *Page* to customize the behavior. For example, this page adds a custom transition animation:

```
class BookDetailsPage extends Page {
  final Book book;
  
  BookDetailsPage({
    this.book,
  }) : super(key: ValueKey(book));
  
  Route createRoute(BuildContext context) {
    return PageRouteBuilder(
      settings: this,
      pageBuilder: (context, animation, animation2) {
        final tween = Tween(begin: Offset(0.0, 1.0), end: Offset.zero);
        final curveTween = CurveTween(curve: Curves.easeInOut);
        return SlideTransition(
          position: animation.drive(curveTween).drive(tween),
          child: BookDetailsScreen(
            key: ValueKey(book),
            book: book,
          ),
        );
      },
    );
  }
}
```
Finally, it’s an error to provide a pages argument without also providing an *onPopPage* callback. This function is called whenever *Navigator.pop()* is called. It should be used to update the state (that determines the list of pages), and it must call *didPop* on the route to determine if the pop succeeded:

```
onPopPage: (route, result) {
  if (!route.didPop(result)) {
    return false;
  }

  // Update the list of pages by setting _selectedBook to null
  setState(() {
    _selectedBook = null;
  });

  return true;
},
```

It’s important to check whether *didPop* fails before updating the app state.

Using *setState* notifies the framework to call the *build()* method, which returns a list with a single page when *_selectedBook* is null.

Here’s the full example:

```
import 'package:flutter/material.dart';

void main() {
  runApp(BooksApp());
}

class Book {
  final String title;
  final String author;

  Book(this.title, this.author);
}

class BooksApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _BooksAppState();
}

class _BooksAppState extends State<BooksApp> {
  Book _selectedBook;

  List<Book> books = [
    Book('Left Hand of Darkness', 'Ursula K. Le Guin'),
    Book('Too Like the Lightning', 'Ada Palmer'),
    Book('Kindred', 'Octavia E. Butler'),
  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Books App',
      home: Navigator(
        pages: [
          MaterialPage(
            key: ValueKey('BooksListPage'),
            child: BooksListScreen(
              books: books,
              onTapped: _handleBookTapped,
            ),
          ),
          if (_selectedBook != null) BookDetailsPage(book: _selectedBook)
        ],
        onPopPage: (route, result) {
          if (!route.didPop(result)) {
            return false;
          }

          // Update the list of pages by setting _selectedBook to null
          setState(() {
            _selectedBook = null;
          });

          return true;
        },
      ),
    );
  }

  void _handleBookTapped(Book book) {
    setState(() {
      _selectedBook = book;
    });
  }
}

class BookDetailsPage extends Page {
  final Book book;

  BookDetailsPage({
    this.book,
  }) : super(key: ValueKey(book));

  Route createRoute(BuildContext context) {
    return MaterialPageRoute(
      settings: this,
      builder: (BuildContext context) {
        return BookDetailsScreen(book: book);
      },
    );
  }
}

class BooksListScreen extends StatelessWidget {
  final List<Book> books;
  final ValueChanged<Book> onTapped;

  BooksListScreen({
    @required this.books,
    @required this.onTapped,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: ListView(
        children: [
          for (var book in books)
            ListTile(
              title: Text(book.title),
              subtitle: Text(book.author),
              onTap: () => onTapped(book),
            )
        ],
      ),
    );
  }
}

class BookDetailsScreen extends StatelessWidget {
  final Book book;

  BookDetailsScreen({
    @required this.book,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (book != null) ...[
              Text(book.title, style: Theme.of(context).textTheme.headline6),
              Text(book.author, style: Theme.of(context).textTheme.subtitle1),
            ],
          ],
        ),
      ),
    );
  }
}
```

As it stands, this app only enables us to define the stack of pages in a declarative way. **We aren’t able to handle the platform’s back button, and the browser’s URL doesn’t change as we navigate**.








