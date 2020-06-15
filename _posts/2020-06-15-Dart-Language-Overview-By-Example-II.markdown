---
layout: post
title:  Dart Language Overview By Example II
date:   2020-04-23T21:08:11.336Z
permalink: /dart-language-overview-2/
icon: https://codersnack.com/assets/images/dart-icon.png
categories: [snackpost]
---

> Information drawn from 
- [Dart.dev cheatsheet](https://dart.dev/codelabs/dart-cheatsheet)

### String interpolation
To put the value of an expression inside a string, use ```${expression}```. If the expression is an identifier, you can omit the {}.

Here are some examples of using string interpolation:

'${3 + 2}'	 	                -------->           '5'
'${"word".toUpperCase()}' -------->	       'WORD'
'$myObject'	 	            -------->            The value of myObject.toString()

### Conditional property access
To guard access to a property or method of an object that might be null, **put a question mark (?) before the dot** (.):

```
myObject?.someProperty
```
The preceding code is equivalent to the following:

```
(myObject != null) ? myObject.someProperty : null
```
You can chain multiple uses of ?. together in a single expression:

```
myObject?.someProperty?.someMethod()
```
The preceding code returns null (and never calls someMethod()) if either myObject or myObject.someProperty is null.

### Collection literals
Dart has built-in support for **lists**, **maps**, and **sets**. You can create them using literals:

```
final aListOfStrings = ['one', 'two', 'three'];
final aSetOfStrings = {'one', 'two', 'three'};
final aMapOfStringsToInts = {
  'one': 1,
  'two': 2,
  'three': 3,
};
```
**Dart’s type inference can assign types** to these variables for you. In this case, the inferred types are ```List<String>```, ```Set<String>```, and ```Map<String, int>```.

Or you can specify the type yourself:

```
final aListOfInts = <int>[];
final aSetOfInts = <int>{};
final aMapOfIntToDouble = <int, double>{};
```
Specifying types is handy when you initialize a list with contents of a subtype, but still want the list to be List<BaseType>:

```
final aListOfBaseType = <BaseType>[SubType(), SubType()];
```

### Getters and setters
You can define getters and setters whenever you need more control over a property than a simple field allows.

For example, you can make sure a property’s value is valid:

```
class MyClass {
  int _aProperty = 0;

  int get aProperty => _aProperty;

  set aProperty(int value) {
    if (value >= 0) {
      _aProperty = value;
    }
  }
}
```
You can also use a getter to define a **computed property**:

```
class MyClass {
  List<int> _values = [];

  void addValue(int value) {
    _values.add(value);
  }

  // A computed property.
  int get count {
    return _values.length;
  }
}
```

### Optional positional parameters
**Dart has two kinds of function parameters: positional and named**. 

**Positional parameters** are the kind you’re likely familiar with:

```
int sumUp(int a, int b, int c) {
  return a + b + c;
}
// ···
  int total = sumUp(1, 2, 3);
```

With Dart, **you can make these positional parameters optional by wrapping them in brackets**:

```
int sumUpToFive(int a, [int b, int c, int d, int e]) {
  int sum = a;
  if (b != null) sum += b;
  if (c != null) sum += c;
  if (d != null) sum += d;
  if (e != null) sum += e;
  return sum;
}
// ···
  int total = sumUpToFive(1, 2);
  int otherTotal = sumUpToFive(1, 2, 3, 4, 5);
```

**Optional positional parameters are always last in a function’s parameter list**. Their default value is null unless you provide another default value:

```
int sumUpToFive(int a, [int b = 2, int c = 3, int d = 4, int e = 5]) {
// ···
}
// ···
  int newTotal = sumUpToFive(1);
  print(newTotal); // <-- prints 15
```

### Optional named parameters
**Using a curly brace syntax**, you can define optional parameters that have names.

```
void printName(String firstName, String lastName, {String suffix}) {
  print('$firstName $lastName ${suffix ?? ''}');
}
// ···
  printName('Avinash', 'Gupta');
  printName('Poshmeister', 'Moneybuckets', suffix: 'IV');
```
As you might expect, the value of these parameters is null by default, but you can provide default values:

```
void printName(String firstName, String lastName, {String suffix = ''}) {
  print('$firstName $lastName $suffix');
}
```
> A function can’t have both optional positional and optional named parameters.