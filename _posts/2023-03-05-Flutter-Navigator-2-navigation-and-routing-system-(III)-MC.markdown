---
layout: main-content-post
title:  Flutter Navigator 2 navigation and routing system (III)
date:   2022-08-19T22:10:51.052Z
permalink: /flutter-navigator-2-III/main-content/
icon: https://codersnack.com/assets/images/flutter-icon.png
categories: [snack-main-content-post]
---


##  Router
So far, the app can show different pages, but **it can’t handle routes from the underlying platform, for example if the user updates the URL in the browser.**

This section shows how to implement the **RouteInformationParser**, **RouterDelegate**, and **update the app state**. Once set up, the app stays in sync with the browser’s URL.

##  Data types

The ***RouteInformationParser*** **parses the route information into a user-defined data type**, so we’ll define that first:

```
class BookRoutePath {
  final int id;
  final bool isUnknown;

  BookRoutePath.home()
      : id = null,
        isUnknown = false;

  BookRoutePath.details(this.id) : isUnknown = false;

  BookRoutePath.unknown()
      : id = null,
        isUnknown = true;

  bool get isHomePage => id == null;

  bool get isDetailsPage => id != null;
}
``` 

In this app, all of the routes in the app can be represented using a single class. Instead, you might choose to use different classes that implement a superclass, or manage the route information in another way.

## RouterDelegate

Next, add a class that extends *RouterDelegate*:

```
class BookRouterDelegate extends RouterDelegate<BookRoutePath>
    with ChangeNotifier, PopNavigatorRouterDelegateMixin<BookRoutePath> {
  @override
  Widget build(BuildContext context) {
    // TODO
    throw UnimplementedError();
  }

  @override
  // TODO
  GlobalKey<NavigatorState> get navigatorKey => throw UnimplementedError();

  @override
  Future<void> setNewRoutePath(BookRoutePath configuration) {
    // TODO
    throw UnimplementedError();
  }
}
```

The generic type defined on *RouterDelegate* is *BookRoutePath*, which contains all the state needed to decide which pages to show.

We’ll need to move some logic from *_BooksAppState* to *BookRouterDelegate*, and create a *GlobalKey*. In this example, the app state is stored directly on the *RouterDelegate*, but could also be separated into another class.

```

class BookRouterDelegate extends RouterDelegate<BookRoutePath>
    with ChangeNotifier, PopNavigatorRouterDelegateMixin<BookRoutePath> {
  final GlobalKey<NavigatorState> navigatorKey;

  Book _selectedBook;
  bool show404 = false;

  List<Book> books = [
    Book('Left Hand of Darkness', 'Ursula K. Le Guin'),
    Book('Too Like the Lightning', 'Ada Palmer'),
    Book('Kindred', 'Octavia E. Butler'),
  ];

  BookRouterDelegate() : navigatorKey = GlobalKey<NavigatorState>();
  // ...
```

In order to **show the correct path in the URL**, we need to return a *BookRoutePath* based on the current state of the app:

```
  BookRoutePath get currentConfiguration {
    if (show404) {
      return BookRoutePath.unknown();
    }

    return _selectedBook == null
        ? BookRoutePath.home()
        : BookRoutePath.details(books.indexOf(_selectedBook));
  }
```

Next, the *build* method in a *RouterDelegate* needs to return a *Navigator*:

```
@override
Widget build(BuildContext context) {
  return Navigator(
    key: navigatorKey,
    pages: [
      MaterialPage(
        key: ValueKey('BooksListPage'),
        child: BooksListScreen(
          books: books,
          onTapped: _handleBookTapped,
        ),
      ),
      if (show404)
        MaterialPage(key: ValueKey('UnknownPage'), child: UnknownScreen())
      else if (_selectedBook != null)
        BookDetailsPage(book: _selectedBook)
    ],
    onPopPage: (route, result) {
      if (!route.didPop(result)) {
        return false;
      }

      // Update the list of pages by setting _selectedBook to null
      _selectedBook = null;
      show404 = false;
      notifyListeners();

      return true;
    },
  );
}
```

The *onPopPage* callback now uses *notifyListeners* instead of *setState*, since this class is now a *ChangeNotifier*, not a widget. When the *RouterDelegate* notifies its listeners, the *Router* widget is likewise notified that the *RouterDelegate's* currentConfiguration has changed and that its build method needs to be called again to build a new Navigator.

The *_handleBookTapped* method also needs to use *notifyListeners* instead of *setState*:

```
  void _handleBookTapped(Book book) {
    _selectedBook = book;
    notifyListeners();
  }
```
**When a new route has been pushed to the application**, *Router* calls *setNewRoutePath*, which gives our app the opportunity to update the app state based on the changes to the route:

```

  @override
  Future<void> setNewRoutePath(BookRoutePath path) async {
    if (path.isUnknown) {
      _selectedBook = null;
      show404 = true;
      return;
    }

    if (path.isDetailsPage) {
      if (path.id < 0 || path.id > books.length - 1) {
        show404 = true;
        return;
      }

      _selectedBook = books[path.id];
    } else {
      _selectedBook = null;
    }

    show404 = false;
  }
```

##  RouteInformationParser

The ***RouteInformationParser*** provides a hook to **parse incoming routes (*RouteInformation*) and convert it into a user defined type (*BookRoutePath*)**. Use the Uri class to take care of the parsing:

```
class BookRouteInformationParser extends RouteInformationParser<BookRoutePath> {
  @override
  Future<BookRoutePath> parseRouteInformation(
      RouteInformation routeInformation) async {
    final uri = Uri.parse(routeInformation.location);
    // Handle '/'
    if (uri.pathSegments.length == 0) {
      return BookRoutePath.home();
    }

    // Handle '/book/:id'
    if (uri.pathSegments.length == 2) {
      if (uri.pathSegments[0] != 'book') return BookRoutePath.unknown();
      var remaining = uri.pathSegments[1];
      var id = int.tryParse(remaining);
      if (id == null) return BookRoutePath.unknown();
      return BookRoutePath.details(id);
    }

    // Handle unknown routes
    return BookRoutePath.unknown();
  }

  @override
  RouteInformation restoreRouteInformation(BookRoutePath path) {
    if (path.isUnknown) {
      return RouteInformation(location: '/404');
    }
    if (path.isHomePage) {
      return RouteInformation(location: '/');
    }
    if (path.isDetailsPage) {
      return RouteInformation(location: '/book/${path.id}');
    }
    return null;
  }
}
```
This implementation is specific to this app, not a general route parsing solution. More on that later.

To use these new classes, we use the new MaterialApp.router constructor and pass in our custom implementations:

```
return MaterialApp.router(
      title: 'Books App',
      routerDelegate: _routerDelegate,
      routeInformationParser: _routeInformationParser,
    );
```

Here’s the complete example:

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
  BookRouterDelegate _routerDelegate = BookRouterDelegate();
  BookRouteInformationParser _routeInformationParser =
      BookRouteInformationParser();

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Books App',
      routerDelegate: _routerDelegate,
      routeInformationParser: _routeInformationParser,
    );
  }
}

class BookRouteInformationParser extends RouteInformationParser<BookRoutePath> {
  @override
  Future<BookRoutePath> parseRouteInformation(
      RouteInformation routeInformation) async {
    final uri = Uri.parse(routeInformation.location);
    // Handle '/'
    if (uri.pathSegments.length == 0) {
      return BookRoutePath.home();
    }

    // Handle '/book/:id'
    if (uri.pathSegments.length == 2) {
      if (uri.pathSegments[0] != 'book') return BookRoutePath.unknown();
      var remaining = uri.pathSegments[1];
      var id = int.tryParse(remaining);
      if (id == null) return BookRoutePath.unknown();
      return BookRoutePath.details(id);
    }

    // Handle unknown routes
    return BookRoutePath.unknown();
  }

  @override
  RouteInformation restoreRouteInformation(BookRoutePath path) {
    if (path.isUnknown) {
      return RouteInformation(location: '/404');
    }
    if (path.isHomePage) {
      return RouteInformation(location: '/');
    }
    if (path.isDetailsPage) {
      return RouteInformation(location: '/book/${path.id}');
    }
    return null;
  }
}

class BookRouterDelegate extends RouterDelegate<BookRoutePath>
    with ChangeNotifier, PopNavigatorRouterDelegateMixin<BookRoutePath> {
  final GlobalKey<NavigatorState> navigatorKey;

  Book _selectedBook;
  bool show404 = false;

  List<Book> books = [
    Book('Left Hand of Darkness', 'Ursula K. Le Guin'),
    Book('Too Like the Lightning', 'Ada Palmer'),
    Book('Kindred', 'Octavia E. Butler'),
  ];

  BookRouterDelegate() : navigatorKey = GlobalKey<NavigatorState>();

  BookRoutePath get currentConfiguration {
    if (show404) {
      return BookRoutePath.unknown();
    }
    return _selectedBook == null
        ? BookRoutePath.home()
        : BookRoutePath.details(books.indexOf(_selectedBook));
  }

  @override
  Widget build(BuildContext context) {
    return Navigator(
      key: navigatorKey,
      pages: [
        MaterialPage(
          key: ValueKey('BooksListPage'),
          child: BooksListScreen(
            books: books,
            onTapped: _handleBookTapped,
          ),
        ),
        if (show404)
          MaterialPage(key: ValueKey('UnknownPage'), child: UnknownScreen())
        else if (_selectedBook != null)
          BookDetailsPage(book: _selectedBook)
      ],
      onPopPage: (route, result) {
        if (!route.didPop(result)) {
          return false;
        }

        // Update the list of pages by setting _selectedBook to null
        _selectedBook = null;
        show404 = false;
        notifyListeners();

        return true;
      },
    );
  }

  @override
  Future<void> setNewRoutePath(BookRoutePath path) async {
    if (path.isUnknown) {
      _selectedBook = null;
      show404 = true;
      return;
    }

    if (path.isDetailsPage) {
      if (path.id < 0 || path.id > books.length - 1) {
        show404 = true;
        return;
      }

      _selectedBook = books[path.id];
    } else {
      _selectedBook = null;
    }

    show404 = false;
  }

  void _handleBookTapped(Book book) {
    _selectedBook = book;
    notifyListeners();
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

class BookRoutePath {
  final int id;
  final bool isUnknown;

  BookRoutePath.home()
      : id = null,
        isUnknown = false;

  BookRoutePath.details(this.id) : isUnknown = false;

  BookRoutePath.unknown()
      : id = null,
        isUnknown = true;

  bool get isHomePage => id == null;

  bool get isDetailsPage => id != null;
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

class UnknownScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Text('404!'),
      ),
    );
  }
}
```

**Running this sample in Chrome now shows the routes as they are being navigated**, and navigates to the correct page when the URL is manually edited.

###  TransitionDelegate

You can provide a **custom implementation of TransitionDelegate that customizes how routes appear on (or are removed from) the screen when the list of pages changes.** If you need to customize this, read on, but if you are happy with the default behavior you can skip this section.

Provide a custom TransitionDelegate to a Navigator that defines the desired behavior:

```
// New:
TransitionDelegate transitionDelegate = NoAnimationTransitionDelegate();

      child: Navigator(
        key: navigatorKey,
        // New:
        transitionDelegate: transitionDelegate,
```

For example, the following implementation disables all transition animations:

```
class NoAnimationTransitionDelegate extends TransitionDelegate<void> {
  @override
  Iterable<RouteTransitionRecord> resolve({
    List<RouteTransitionRecord> newPageRouteHistory,
    Map<RouteTransitionRecord, RouteTransitionRecord>
        locationToExitingPageRoute,
    Map<RouteTransitionRecord, List<RouteTransitionRecord>>
        pageRouteToPagelessRoutes,
  }) {
    final results = <RouteTransitionRecord>[];

    for (final pageRoute in newPageRouteHistory) {
      if (pageRoute.isWaitingForEnteringDecision) {
        pageRoute.markForAdd();
      }
      results.add(pageRoute);
    }

    for (final exitingPageRoute in locationToExitingPageRoute.values) {
      if (exitingPageRoute.isWaitingForExitingDecision) {
        exitingPageRoute.markForRemove();
        final pagelessRoutes = pageRouteToPagelessRoutes[exitingPageRoute];
        if (pagelessRoutes != null) {
          for (final pagelessRoute in pagelessRoutes) {
            pagelessRoute.markForRemove();
          }
        }
      }

      results.add(exitingPageRoute);
    }
    return results;
  }
}
```

This custom implementation overrides *resolve*(), which **is in charge of marking the various routes as either pushed, popped, added, completed, or removed:**

- **markForPush** — displays the route with an animated transition
- **markForAdd** — displays the route without an animated transition
- **markForPop** — removes the route with an animated transition and completes it with a result. “Completing” in this context means that the result object is passed to the onPopPage callback on AppRouterDelegate.
- **markForComplete** — removes the route without a transition and completes it with a result
- **markForRemove** — removes the route with no animated transition and without completing.


**This class only affects the declarative API, which is why the back button still displays a transition animation.**

How this example works: This example looks at both the new routes and the routes that are exiting the screen. It goes through all of the objects in *newPageRouteHistory* and marks them to be added without a transition animation using *markForAdd*. Next, it loops through values of the *locationToExitingPageRoute* map. If it finds a route marked as *isWaitingForExitingDecision*, then it calls *markForRemove* to indicate that the route should be removed without a transition and without completing.

Here’s the [full sample(Gist)](http://gist.github.com/5ce79aee5b5f83cfababa97c9cf0a204).

###  Nested routers

This larger demo shows **how to add a Router within another Router**. Many apps require routes for the destinations in a *BottomAppBar*, and routes for a stack of views above it, which requires two *Navigators*. To do this, the app uses an application state object to store app-specific navigation state (the selected menu index and the selected Book object). This example also shows how to configure which Router handles the back button.

Nested [router sample(Gist)](http://gist.github.com/bbca91e23bbb4d39247fa922533be7c9)






