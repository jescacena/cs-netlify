---
layout: main-content-post
title:  Angular - Reactive Forms - Grouping Form Controls
date:   2021-04-11T21:55:02.908Z
permalink: /angular-reactive-forms-grouping-controls/main-content/
icon: https://codersnack.com/assets/images/angular-icon.png
categories: [snack-main-content-post]
---

Forms typically contain several related controls. **Reactive forms provide two ways of grouping multiple related controls into a single input form.**

**A form group defines a form with a fixed set of controls that you can manage together**. Form group basics are discussed in this section. You can also nest form groups to create more complex forms.

**A form array defines a dynamic form, where you can add and remove controls at run time**. You can also nest form arrays to create more complex forms. For more about this option, see Creating dynamic forms below.

Just as a form control instance gives you control over a single input field, a form group instance tracks the form state of a group of form control instances (for example, a form). Each control in a form group instance is tracked by name when creating the form group. The following example shows how to manage multiple form control instances in a single group.

Generate a ProfileEditor component and import the **FormGroup** and **FormControl** classes from the **@angular/forms package**.
```
ng generate component ProfileEditor
```
To add a form group to this component, take the following steps.

- Create a FormGroup instance.
- Associate the FormGroup model and view.
- Save the form data.
- Create a FormGroup instance

**Create a property in the component** class named *profileForm* and set the property to a new form group instance. To initialize the form group, provide the constructor with an object of named keys mapped to their control.

For the profile form, add two form control instances with the names *firstName* and *lastName*.

**src/app/profile-editor/profile-editor.component.ts (form group)**
```
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
}
```
The individual form controls are now collected within a group. A **FormGroup** instance provides its model value as an object reduced from the values of each control in the group. A form group instance has the same properties (such as value and untouched) and methods (such as setValue()) as a form control instance.

**Associate the FormGroup model and view**

A form group tracks the status and changes for each of its controls, so if one of the controls changes, the parent control also emits a new status or value change. The model for the group is maintained from its members. After you define the model, you must update the template to reflect the model in the view.

***src/app/profile-editor/profile-editor.component.html (template form group)***
```
<form [formGroup]="profileForm">
  
  <label>
    First Name:
    <input type="text" formControlName="firstName">
  </label>

  <label>
    Last Name:
    <input type="text" formControlName="lastName">
  </label>

</form>
```

Note that just as a form group contains a group of controls, the **profileForm FormGroup** is bound to the form element with the FormGroup directive, creating a communication layer between the model and the form containing the inputs. The **formControlName** input provided by the **FormControlName** directive binds each individual input to the form control defined in FormGroup. The form controls communicate with their respective elements. They also communicate changes to the form group instance, which provides the source of truth for the model value.

**Save form data**

The ProfileEditor component accepts input from the user, but in a real scenario you want to capture the form value and make available for further processing outside the component. The **FormGroup directive listens for the submit event emitted by the form element and emits an ngSubmit event** that you can bind to a callback function.

Add an **ngSubmit** event listener to the form tag with the ```onSubmit()``` callback method.

**src/app/profile-editor/profile-editor.component.html (submit event)**
```
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
```

The **onSubmit()** method in the ProfileEditor component captures the current value of profileForm. Use **EventEmitter** to keep the form encapsulated and to provide the form value outside the component. The following example uses console.warn to log a message to the browser console.

**src/app/profile-editor/profile-editor.component.ts (submit method)**
```
onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);
}
```

The submit event is emitted by the form tag using the native DOM event. You trigger the event by clicking a button with submit type. This allows the user to **press the Enter key to submit** the completed form.

Use a button element to add a button to the bottom of the form to trigger the form submission.

src/app/profile-editor/profile-editor.component.html (submit button)

```
<button type="submit" [disabled]="!profileForm.valid">Submit</button>
```
> Note: The button in the snippet above also has a disabled binding attached to it to disable the button when profileForm is invalid. You aren't performing any validation yet, so the button is always enabled. Basic form validation is covered in the Validating form input section.

**Display the component**

To display the ProfileEditor component that contains the form, add it to a component template.

**src/app/app.component.html (profile editor)**
```
<app-profile-editor></app-profile-editor>
```
ProfileEditor allows you to manage the form control instances for the firstName and lastName controls within the form group instance.

### Creating nested form groups
Form groups can accept both individual form control instances and other form group instances as children. This makes **composing complex form models easier to maintain and logically group together.**

When building complex forms, managing the different areas of information is easier in smaller sections. Using a nested form group instance allows you to break large forms groups into smaller, more manageable ones.

To make more complex forms, use the following steps.

- Create a nested group.
- Group the nested form in the template.

Some types of information naturally fall into the same group. A name and address are typical examples of such nested groups, and are used in the following examples.

**Create a nested group**

To create a nested group in profileForm, add a nested address element to the form group instance.

***src/app/profile-editor/profile-editor.component.ts (nested form group)***
```
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });
}
```

In this example, address group combines the current firstName and lastName controls with the new street, city, state, and zip controls. Even though the address element in the form group is a child of the overall profileForm element in the form group, the same rules apply with value and status changes. Changes in status and value from the nested form group propagate to the parent form group, maintaining consistency with the overall model.

**Group the nested form in the template**

After you update the model in the component class, update the template to connect the form group instance and its input elements.

Add the address form group containing the street, city, state, and zip fields to the ProfileEditor template.

***src/app/profile-editor/profile-editor.component.html (template nested form group)***
```
<div formGroupName="address">
  <h3>Address</h3>

  <label>
    Street:
    <input type="text" formControlName="street">
  </label>

  <label>
    City:
    <input type="text" formControlName="city">
  </label>
  
  <label>
    State:
    <input type="text" formControlName="state">
  </label>

  <label>
    Zip Code:
    <input type="text" formControlName="zip">
  </label>
</div>
```
> **Tip** Display the value for the form group instance in the component template using the value property and JsonPipe.

### Updating parts of the data model
When updating the value for a form group instance that contains multiple controls, you may only want to update parts of the model. This section covers how to update specific parts of a form control data model.

There are two ways to update the model value:

- **Use the setValue() method to set a new value for an individual control**. The setValue() method strictly adheres to the structure of the form group and replaces the entire value for the control.

- **Use the patchValue() method to replace any properties defined in the object that have changed in the form model**.

> The strict checks of the setValue() method help catch nesting errors in complex forms, while patchValue() fails silently on those errors.

In ProfileEditorComponent, use the updateProfile method with the example below to update the first name and street address for the user.
src/app/profile-editor/profile-editor.component.ts (patch value)
```
updateProfile() {
  this.profileForm.patchValue({
    firstName: 'Nancy',
    address: {
      street: '123 Drew Street'
    }
  });
}
```
Simulate an update by adding a button to the template to update the user profile on demand.
```
<p>
  <button (click)="updateProfile()">Update Profile</button>
</p>
```
When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided in an object inside the address property. This is necessary because the patchValue() method applies the update against the model structure. PatchValue() only updates properties that the form model defines.