---
layout: main-content-post
title:  Singleton pattern
date:   2020-02-02T07:13:04.247Z
permalink: /js-design-patterns-singleton/main-content/
icon: https://codersnack.com/assets/images/design-patterns.jpg
categories: [snack-main-content-post]
---

Singleton is a special *creational design pattern* in which **only one instance of a class can exist**. It works like this: **if no instance of the singleton class exists then a new instance is created and returned, but if an instance already exists, then the reference to the existing instance is returned.**

**A perfect real-life example would be that of mongoose** (the famous Node.js ODM library for MongoDB). It utilizes the singleton pattern.

In this **example**, we have a *Database* class that is a singleton. First, we create an object mongo by using the *new* operator to invoke the *Database* class constructor. This time an object is instantiated because none already exists. The second time, when we create the *mysql* object, no new object is instantiated but instead, the reference to the object that was instantiated earlier, i.e. the *mongo* object, is returned.

```
class Database {
  constructor(data) {
    if (Database.exists) {
      return Database.instance;
    }
    this._data = data;
    Database.instance = this;
    Database.exists = true;
    return this;
  }

  getData() {
    return this._data;
  }

  setData(data) {
    this._data = data;
  }
}

// usage
const mongo = new Database('mongo');
console.log(mongo.getData()); // mongo

const mysql = new Database('mysql');
console.log(mysql.getData()); // mongo

```