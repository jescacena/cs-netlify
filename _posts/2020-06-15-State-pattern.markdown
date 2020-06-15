---
layout: post
title:  State pattern
date:   2020-02-04T11:03:08.671Z
permalink: /js-design-patterns-state/
icon: https://codersnack.com/assets/images/design-patterns.jpg
categories: [snackpost]
---

> References

null


It is a *behavioural design pattern* that **allows an object to alter its behaviour based on changes to its internal state**. The object returned by a state pattern class seems to change its class. It **provides state-specific logic to a limited set of objects in which each object type represents a particular state**.

We will take a simple **example** of a *traffic light* to understand this pattern. The *TrafficLight* class changes the object it returns based on its internal state, which is an object of *Red*, *Yellow*, or *Green* class.

```
class TrafficLight {
  constructor() {
    this.states = [new GreenLight(), new RedLight(), new YellowLight()];
    this.current = this.states[0];
  }

  change() {
    const totalStates = this.states.length;
    let currentIndex = this.states.findIndex(light => light === this.current);
    if (currentIndex + 1 < totalStates) this.current = this.states[currentIndex + 1];
    else this.current = this.states[0];
  }

  sign() {
    return this.current.sign();
  }
}

class Light {
  constructor(light) {
    this.light = light;
  }
}

class RedLight extends Light {
  constructor() {
    super('red');
  }

  sign() {
    return 'STOP';
  }
}

class YellowLight extends Light {
  constructor() {
    super('yellow');
  }

  sign() {
    return 'STEADY';
  }
}

class GreenLight extends Light {
	constructor() {
		super('green');
	}

	sign() {
		return 'GO';
	}
}

// usage
const trafficLight = new TrafficLight();

console.log(trafficLight.sign()); // 'GO'
trafficLight.change();

console.log(trafficLight.sign()); // 'STOP'
trafficLight.change();

console.log(trafficLight.sign()); // 'STEADY'
trafficLight.change();

console.log(trafficLight.sign()); // 'GO'
trafficLight.change();

console.log(trafficLight.sign()); // 'STOP'
```