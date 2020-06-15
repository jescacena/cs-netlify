---
layout: post
title:  Mediator pattern
date:   2020-02-03T16:42:11.460Z
permalink: /js-design-patterns-mediator/
icon: https://codersnack.com/assets/images/design-patterns.jpg
categories: [snackpost]
---

> #### Information drawn from

- [Medium - Javascript design patterns](https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15)

-------------

It is a *behavioural design pattern* that encapsulates how a set of objects interact with each other. It **provides the central authority over a group of objects by promoting loose coupling, keeping objects from referring to each other explicitly**.

In this **example**, we have *TrafficTower* as *Mediator* that controls the way *Airplane* objects interact with each other. All the *Airplane* objects register themselves with a *TrafficTower* object, and it is the mediator class object that handles how an *Airplane* object receives coordinates data of all the other *Airplane* objects.

```
class TrafficTower {
  constructor() {
    this._airplanes = [];
  }

  register(airplane) {
    this._airplanes.push(airplane);
    airplane.register(this);
  }

  requestCoordinates(airplane) {
    return this._airplanes.filter(plane => airplane !== plane).map(plane => plane.coordinates);
  }
}

class Airplane {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.trafficTower = null;
  }

  register(trafficTower) {
    this.trafficTower = trafficTower;
  }

  requestCoordinates() {
    if (this.trafficTower) return this.trafficTower.requestCoordinates(this);
    return null;
  }
}

// usage
const tower = new TrafficTower();

const airplanes = [new Airplane(10), new Airplane(20), new Airplane(30)];
airplanes.forEach(airplane => {
  tower.register(airplane);
});

console.log(airplanes.map(airplane => airplane.requestCoordinates())) 
// [[20, 30], [10, 30], [10, 20]]

```