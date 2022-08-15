---
layout: post
title:  Angular - Forms Overview II
date:   2021-04-11T17:42:45.795Z
permalink: /angular-forms-overview-2/
icon: https://codersnack.com/assets/images/angular-icon.png
categories: [snackpost]
---

> Information drawn from 
- [Angular.io Forms Overview](https://angular.io/guide/forms-overview)

### Data flow in reactive forms
In reactive forms each form element in the view is directly linked to the form model (a FormControl instance). **Updates from the view to the model and from the model to the view are synchronous** and do not depend on how the UI is rendered.

The **view-to-model diagram** shows **how data flows when an input field's value is changed** from the view through the following steps.

- The **user types a value** into the input element, in this case the favorite color Blue.
- The **form input element emits an "input" event** with the latest value.
- The **control value accessor listening for events** on the form input element immediately relays the new value to the **FormControl** instance.
- The **FormControl instance emits the new value through the valueChanges observable**.
- Any **subscribers to the valueChanges observable receive the new value**.

![angular dataflow reactive forms view to model](https://codersnack.com/assets/images/angular-dataflow-reactive-forms-vtm.png)

The **model-to-view diagram** shows how a programmatic change to the model is propagated to the view through the following steps.

- The user calls the ```favoriteColorControl.setValue()``` method, which updates the **FormControl** value.
- The **FormControl** instance **emits the new value through the valueChanges observable**.
- Any **subscribers** to the **valueChanges** observable receive the new value.
- The **control value accessor on the form input element updates the element with the new value**.

![angular dataflow reactive forms model to view](https://codersnack.com/assets/images/angular-dataflow-reactive-forms-mtv.png)

### Data flow in template-driven forms
In template-driven forms, **each form element is linked to a directive that manages the form model internally**.

The **view-to-model** diagram shows how data flows when an input field's value is changed from the view through the following steps.

- The **user types** Blue into the input element.
- The **input element emits an "input" event** with the value Blue.
- The **control value accessor** attached to the input triggers the ```setValue()``` method on the **FormControl** instance.
- The **FormControl** instance **emits** the new value through the **valueChanges** observable.
- Any **subscribers** to the **valueChanges** observable receive the new value.
- The **control value accessor** also calls the ```NgModel.viewToModelUpdate()``` method which emits an **ngModelChange event**.
- Because the **component template uses two-way data binding** for the favoriteColor property, the favoriteColor property in the component is updated to the value emitted by the **ngModelChange** event (Blue).

![angular dataflow template driven forms - view to model](https://codersnack.com/assets/images/angular-dataflow-td-forms-vtm.png)

The **model-to-view diagram** shows how data flows from model to view when the favoriteColor changes from Blue to Red, through the following steps

- The favoriteColor **value is updated in the component**.
- Change detection begins.
- During change detection, the **ngOnChanges** lifecycle hook is called on the **NgModel** directive instance because the value of one of its inputs has changed.
- The **ngOnChanges()** method queues an **async task** to set the value for the internal **FormControl** instance.
- Change detection completes.
- On the **next tick**, the task to set the **FormControl instance value is executed**.
- The **FormControl** instance **emits the latest value through the valueChanges observable**.
- Any **subscribers** to the **valueChanges** observable receive the new value.
- The **control value accessor updates the form input element in the view** with the latest favoriteColor value.

![angular dataflow template driven forms - model to view](https://codersnack.com/assets/images/angular-dataflow-td-forms-mtv.png)

### Mutability of the data model

The change-tracking method plays a role in the **efficiency of your application**.

**Reactive forms keep the data model pure by providing it as an immutable data structure**. Each time a change is triggered on the data model, the **FormControl** instance **returns a new data model** rather than updating the existing data model. This gives you the **ability to track unique changes** to the data model through the control's observable. Change detection is more efficient because it only needs to update on unique changes. Because data updates follow reactive patterns, you can integrate with observable operators to transform data.

**Template-driven forms rely on mutability with two-way data binding** to update the data model in the component as changes are made in the template. Because there are no unique changes to track on the data model when using two-way data binding, **change detection is less efficient** at determining when updates are required.

The difference is demonstrated in the previous examples that use the favorite-color input element.

- With reactive forms, the FormControl instance always returns a new value when the control's value is updated.

- With template-driven forms, the favorite color property is always modified to its new value.

### Form validation

Validation is an integral part of managing any set of forms. Whether you're checking for required fields or querying an external API for an existing username, **Angular provides a set of built-in validators as well as the ability to create custom validators**.

- Reactive forms define custom validators as functions that receive a control to validate.
- Template-driven forms are tied to template directives, and must provide custom validator directives that wrap validation functions.
For more information, see Form Validation.

### Testing

Testing plays a large part in complex applications. A simpler testing strategy is useful when validating that your forms function correctly. Reactive forms and template-driven forms have different levels of reliance on rendering the UI to perform assertions based on form control and form field changes. The following examples demonstrate the process of testing forms with reactive and template-driven forms.

#### Testing reactive forms
**Reactive forms provide a relatively easy testing strategy because they provide synchronous access to the form and data models, and they can be tested without rendering the UI**. In these tests, status and data are queried and manipulated through the control without interacting with the change detection cycle.

The following tests use the favorite-color components from previous examples to verify the view-to-model and model-to-view data flows for a reactive form.

The first example performs the following steps to verify the **view-to-model data flow**.

Query the view for the form input element, and create a custom "input" event for the test.
Set the new value for the input to Red, and dispatch the "input" event on the form input element.
Assert that the component's favoriteColorControl value matches the value from the input.

```
it('should update the value of the input field', () => {
  const input = fixture.nativeElement.querySelector('input');
  const event = createNewEvent('input');

  input.value = 'Red';
  input.dispatchEvent(event);

  expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
});
```

The next example performs the following steps to verify the **model-to-view data flow.**

Use the favoriteColorControl, a FormControl instance, to set the new value.
Query the view for the form input element.
Assert that the new value set on the control matches the value in the input.

```
it('should update the value in the control', () => {
  component.favoriteColorControl.setValue('Blue');

  const input = fixture.nativeElement.querySelector('input');

  expect(input.value).toBe('Blue');
});
```
#### Testing template-driven forms

**Writing tests with template-driven forms requires a detailed knowledge of the change detection process** and an understanding of how directives run on each cycle to ensure that elements are queried, tested, or changed at the correct time.

The following tests use the favorite color components mentioned earlier to verify the data flows from view to model and model to view for a template-driven form.

The following test verifies the data flow from view to model.

```
it('should update the favorite color in the component', fakeAsync(() => {
     const input = fixture.nativeElement.querySelector('input');
     const event = createNewEvent('input');

     input.value = 'Red';
     input.dispatchEvent(event);

     fixture.detectChanges();

     expect(component.favoriteColor).toEqual('Red');
   }));
```
Here are the steps performed in the view to model test.

- Query the view for the form input element, and create a custom "input" event for the test.
- Set the new value for the input to Red, and dispatch the "input" event on the form input element.
- **Run change detection through the test fixture**.
- Assert that the component favoriteColor property value matches the value from the input.

The following test verifies the data flow from model to view.

```
it('should update the favorite color on the input field', fakeAsync(() => {
     component.favoriteColor = 'Blue';

     fixture.detectChanges();

     tick();

     const input = fixture.nativeElement.querySelector('input');

     expect(input.value).toBe('Blue');
   }));
```

Here are the steps performed in the model to view test.

- Use the component instance to set the value of the favoriteColor property.
- Run change detection through the test fixture.
- Use the **tick() method to simulate the passage of time within the fakeAsync() task.**
- Query the view for the form input element.
- Assert that the input value matches the value of the favoriteColor property in the component instance.
