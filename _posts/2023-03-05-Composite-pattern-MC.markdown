---
layout: main-content-post
title:  Composite pattern
date:   2020-06-15T10:17:20.491Z
permalink: /js-design-patterns-composite/main-content/
icon: https://codersnack.com/assets/images/design-patterns.jpg
categories: [snack-main-content-post]
---

This is a *structural design pattern* that **composes objects into tree-like structures to represent whole-part hierarchies**. In this pattern, each node in the tree-like structure can be either an individual object or a composed collection of objects. Regardless, each node is treated uniformly.

It is a bit complex to visualize this pattern. **The easiest way to think about this is with the example of a multi-level menu**. Each node can be a distinct option, or it can be a menu itself, which has multiple options as its child. A node component with children is a composite component, while a node component without any child is a leaf component.

In this example, we create a base class of *Component* that implements the common functionalities needed and abstracts the other methods needed. The base class also has a static method that utilises *recursion to traverse a composite tree structure made with its subclasses*. Then we create two subclasses extending the base class , *Leaf* that does not have any children and *Composite* that can have children, and hence have methods handling adding, searching, and removing child functionalities. The two subclasses are used to create a composite structurem, a tree, in this case.

```
class Component {
  constructor(name) {
    this._name = name;
  }

  getNodeName() {
    return this._name;
  }

  // abstract methods that need to be overridden
  getType() {}

  addChild(component) {}

  removeChildByName(componentName) {}

  removeChildByIndex(index) {}

  getChildByName(componentName) {}

  getChildByIndex(index) {}

  noOfChildren() {}

  static logTreeStructure(root) {
    let treeStructure = '';
    function traverse(node, indent = 0) {
      treeStructure += `${'--'.repeat(indent)}${node.getNodeName()}\n`;
      indent++;
      for (let i = 0, length = node.noOfChildren(); i < length; i++) {
        traverse(node.getChildByIndex(i), indent);
      }
    }

    traverse(root);
    return treeStructure;
  }
}

class Leaf extends Component {
  constructor(name) {
    super(name);
    this._type = 'Leaf Node';
  }

  getType() {
    return this._type;
  }

  noOfChildren() {
    return 0;
  }
}

class Composite extends Component {
  constructor(name) {
    super(name);
    this._type = 'Composite Node';
    this._children = [];
  }

  getType() {
    return this._type;
  }

  addChild(component) {
    this._children = [...this._children, component];
  }

  removeChildByName(componentName) {
    this._children = [...this._children].filter(component => component.getNodeName() !== componentName);
  }

  removeChildByIndex(index) {
    this._children = [...this._children.slice(0, index), ...this._children.slice(index + 1)];
  }

  getChildByName(componentName) {
    return this._children.find(component => component.name === componentName);
  }

  getChildByIndex(index) {
    return this._children[index];
  }

  noOfChildren() {
    return this._children.length;
  }
}

// usage
const tree = new Composite('root');
tree.addChild(new Leaf('left'));
const right = new Composite('right');
tree.addChild(right);
right.addChild(new Leaf('right-left'));
const rightMid = new Composite('right-middle');
right.addChild(rightMid);
right.addChild(new Leaf('right-right'));
rightMid.addChild(new Leaf('left-end'));
rightMid.addChild(new Leaf('right-end'));

// log
console.log(Component.logTreeStructure(tree));
/*
root
--left
--right
----right-left
----right-middle
------left-end
------right-end
----right-right
*/
```