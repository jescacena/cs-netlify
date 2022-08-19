---
layout: main-content-post
title:  Angular - Reactive Forms
date:   2021-04-11T21:25:32.590Z
permalink: /angular-reactive-forms/main-content/
icon: https://codersnack.com/assets/images/angular-icon.png
categories: [snack-main-content-post]
---

Reactive forms provide a model-driven approach to handling form inputs whose values change over time. This guide shows you how to create and update a basic form control, progress to using multiple controls in a group, validate form values, and create dynamic forms where you can add or remove controls at run time.

### Overview of reactive forms

**Reactive forms use an explicit and immutable approach to managing the state of a form** at a given point in time. Each change to the form state returns a new state, which maintains the integrity of the model between changes. **Reactive forms are built around observable streams**, where form inputs and values are provided as streams of input values, which can be accessed synchronously.

**Reactive forms also provide a straightforward path to testing** because you are assured that your data is consistent and predictable when requested. Any consumers of the streams have access to manipulate that data safely.

Reactive forms differ from template-driven forms in distinct ways. Reactive forms provide more predictability with synchronous access to the data model, immutability with observable operators, and change tracking through observable streams.

Template-driven forms allow direct access to modify data in your template, but are less explicit than reactive forms because they rely on directives embedded in the template, along with mutable data to track changes asynchronously.

### Adding a basic form control

There are three steps to using form controls.

- **Register the reactive forms module** in your app. This module declares the reactive-form directives that you need to use reactive forms.
- **Generate** a new **FormControl** instance and save it in the component.
- **Register** the **FormControl** in the template.

You can then display the form by adding the component to the template.

The following examples show how to add a single form control. In the example, the user enters their name into an input field, captures that input value, and displays the current value of the form control element.

**Register the reactive forms module**

To use reactive form controls, **import ReactiveFormsModul**e from the **@angular/forms** package and add it to your **NgModule's** imports array.

**app.module.ts**
```
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    ReactiveFormsModule
  ],
})
export class AppModule { }
```

**Generate a new FormControl**

Use the CLI command ng generate to generate a component in your project to host the control.

```
ng generate component NameEditor
```
To register a single form control, **import** the **FormControl** class and **create a new instance of FormControl** to save as a class property.

**src/app/name-editor/name-editor.component.ts**

```
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  name = new FormControl('');
}
```

**Use the constructor of FormControl to set its initial value**, which in this case is an empty string. By creating these controls in your component class, you get immediate access to listen for, update, and validate the state of the form input.

**Register the control in the template**

After you create the control in the component class, **you must associate it with a form control element in the template**. Update the template with the form control using the **formControl binding** provided by **FormControlDirective**, which is also included in the **ReactiveFormsModule**.

**src/app/name-editor/name-editor.component.html**

```
<label>
  Name:
  <input type="text" [formControl]="name">
</label>
```

Using the template binding syntax, **the form control is now registered** to the name input element in the template. **The form control and DOM element communicate with each other**: the view reflects changes in the model, and the model reflects changes in the view.

**Display the component**

The form control assigned to name is displayed when the component is added to a template.

**src/app/app.component.html (name editor)**

```
<app-name-editor></app-name-editor>
```

### Displaying a form control value

You can display the value in the following ways.

Through the **valueChanges observable** where you can listen for changes in the form's value in the template using **AsyncPipe** or in the component class using the **subscribe() method**.

With the value property, which gives you a snapshot of the current value.

The following example shows you how to display the current value using interpolation in the template.

src/app/name-editor/name-editor.component.html (control value)

```
<p>
  Value: {{ name.value }}
</p>
```
The displayed value changes as you update the form control element.

Reactive forms provide access to information about a given control through properties and methods provided with each instance. These properties and methods of the underlying **AbstractControl** class are used to control form state and determine when to display messages when handling input validation.

Read about other FormControl properties and methods in the API Reference.

### Replacing a form control value

Reactive forms have methods to change a control's value programmatically, which gives you the flexibility to update the value without user interaction. A form control instance provides a ```setValue()```  method that updates the value of the form control and validates the structure of the value provided against the control's structure. For example, when retrieving form data from a backend API or service, use the **setValue()** method to update the control to its new value, replacing the old value entirely.

The following example adds a method to the component class to update the value of the control to Nancy using the setValue() method.

**src/app/name-editor/name-editor.component.ts (update value)**
```
updateName() {
  this.name.setValue('Nancy');
}
```
Update the template with a button to simulate a name update. When you click the Update Name button, the value entered in the form control element is reflected as its current value.
src/app/name-editor/name-editor.component.html (update value)

```
<p>
  <button (click)="updateName()">Update Name</button>
</p>
```
**The form model is the source of truth for the control**, so when you click the button, the value of the input is changed within the component class, overriding its current value.

>Note: In this example, you're using a single control. When using the setValue() method with a form group or form array instance, the value needs to match the structure of the group or array.





