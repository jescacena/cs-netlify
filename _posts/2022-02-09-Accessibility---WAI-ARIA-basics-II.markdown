---
layout: post
title:  Accessibility - WAI-ARIA basics II
date:   2022-02-09T16:32:30.513Z
permalink: /ux-accessibility-wai-aria-2/
icon: https://codersnack.com/assets/images/ux-logo.png
categories: [snackpost]
---

> Information drawn from 
- [MDN - WAI-ARIA basics](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics)
- [dequeuniversity.com - library](https://dequeuniversity.com/library/)

###  Enhancing keyboard accessibility

As discussed in a few other places in the module, o**ne of the key strengths of HTML with respect to accessibility is the built-in keyboard accessibility of features such as buttons, form controls, and links**. Generally, **you are able to use the tab key to move between controls, the Enter/Return key to select or activate controls, and occasionally other controls as needed** (for example the up and down cursor to move between options in a ```<select>``` box).

**However, sometimes you will end up having to write code that either uses non-semantic elements as buttons (or other types of control), or uses focusable controls for not quite the right purpose**. You might be trying to fix some bad code you've inherited, or you might be building some kind of complex widget that requires it.

**In terms of making non-focusable code focusable, WAI-ARIA extends the tabindex attribute with some new values:**

- **tabindex="0"** — as indicated above, this value **allows elements that are not normally tabbable to become tabbable**. This is the most useful value of tabindex.
- **tabindex="-1"** — this **allows not normally tabbable elements to receive focus programmatically**, e.g. via JavaScript, or as the target of links.

> We discussed this in more detail and showed a typical implementation back in our HTML accessibility article — see [Building keyboard accessibility back in](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML#building_keyboard_accessibility_back_in).


###  Accessibility of non-semantic controls

This follows on from the previous section — when a series of nested ```<div>```s along with CSS/JavaScript is used to create a complex UI-feature, or a native control is greatly enhanced/changed via JavaScript, not only can keyboard accessibility suffer, but screenreader users will find it difficult to work out what the feature does if there are no semantics or other clues. In such situations, ARIA can help to provide those missing semantics.


####  Form validation and error alerts

First of all, let's revisit the form example we first looked at in our CSS and JavaScript accessibility article (read Keeping it unobtrusive for a full recap). At the end of this section we showed that we have included some ARIA attributes on the error message box that displays any validation errors when you try to submit the form:

```
<div class="errors" role="alert" aria-relevant="all">
  <ul>
  </ul>
</div>
```

- ***role="alert"* automatically turns the element it is applied to into a live region, so changes to it are read out**; it also semantically identifies it as an alert message (important time/context sensitive information), and represents a better, more accessible way of delivering an alert to a user (modal dialogs like alert() calls have a number of accessibility problems; see Popup Windows by WebAIM).

- **An *aria-relevant* value of *all* instructs the screenreader to read out the contents of the error list when any changes are made to it** — i.e. when errors are added or removed. This is useful because **the user will want to know what errors are left**, not just what has been added or removed from the list.

We could go further with our ARIA usage, and provide some more validation help. How about indicating whether fields are required in the first place, and what range the age should be?

- At this point, take a copy of our form-validation.html and validation.js files, and save them in a local directory.Open them both in a text editor and have a look at how the code works.

- First of all, add a paragraph just above the opening ```<form>``` tag, like the one below, and mark both the form ```<label>s with an asterisk. This is normally how we mark required fields for sighted users.

```
<p>Fields marked with an asterisk (*) are required.</p>
```

- This makes visual sense, but it isn't as easy to understand for screenreader users. Fortunately, **WAI-ARIA provides the *aria-required* attribute to give screenreaders hints** that they should tell users that form inputs need to be filled in. Update the ```<input>```  elements like so:
 
``` 
<input type="text" name="name" id="name" aria-required="true">
<input type="number" name="age" id="age" aria-required="true">
```

- If you save the example now and test it with a screenreader, you should hear something like **"Enter your name star, required, edit text"**.

- It might also be useful if we give screenreader users and sighted users an idea of what the age value should be. This is often presented as a tooltip, or placeholder inside the form field perhaps. **WAI-ARIA does include *aria-valuemin* and *aria-valuemax*. properties to specify min and max values, but these currently don't seem very well supported; a better supported feature is the HTML5 *placeholder* attribute**, which can contain a message that is shown in the input when no value is entered, and is read out by a number of screenreaders. Update your number input like this:
```
<input type="number" name="age" id="age" placeholder="Enter 1 to 150" aria-required="true">
```

> **Note**: You can see the finished example live at form-validation-updated.html.

WAI-ARIA also enables some advanced form labelling techniques, beyond the classic ```<label>``` element. We already talked about using the aria-label property to provide a label where we don't want the label to be visible to sighted users (see the Signposts/Landmarks section, above). There are some other labelling techniques that use other properties such as ***aria-labelledby* if you want to designate a non-```<label>``` element as a label or label multiple form inputs with the same label, and *aria-describedby*, if you want to associate other information with a form input and have it read out as well**. See WebAIM's Advanced Form Labeling article for more details.

There are many other useful properties and states too, for indicating the status of form elements. For example, ***aria-disabled="true"* can be used to indicate that a form field is disabled**. Many browsers will just skip past disabled form fields, and they won't even be read out by screenreaders, but in some cases they will be perceived, so it is a good idea to include this attribute to let the screenreader know that a disabled input is in fact disabled.

If the disabled state of an input is likely to change, then it is also a good idea to indicate when it happens, and what the result is. For example, in our form-validation-checkbox-disabled.html demo **there is a checkbox that when checked, enables another form input to allow further information be entered. We've set up a hidden live region**:

```
<p class="hidden-alert" aria-live="assertive"></p>
```

which is hidden from view using absolute positioning. When this is checked/unchecked, **we update the text inside the hidden live region to tell screenreader users what the result of checking this checkbox is, as well as updating the aria-disabled state, and some visual indicators too**:

```
function toggleMusician(bool) {
  let instruItem = formItems[formItems.length-1];
  if(bool) {
    instruItem.input.disabled = false;
    instruItem.label.style.color = '#000';
    instruItem.input.setAttribute('aria-disabled', 'false');
    hiddenAlert.textContent = 'Instruments played field now enabled; use it to tell us what you play.';
  } else {
    instruItem.input.disabled = true;
    instruItem.label.style.color = '#999';
    instruItem.input.setAttribute('aria-disabled', 'true');
    instruItem.input.removeAttribute('aria-label');
    hiddenAlert.textContent = 'Instruments played field now disabled.';
  }
}
```


####  Describing non-semantic buttons as buttons

A few times in this course already, we've mentioned the native accessibility of (and the accessibility issues behind using other elements to fake) buttons, links, or form elements (see UI controls in the HTML accessibility article, and Enhancing keyboard accessibility, above). Basically, you can add keyboard accessibility back in without too much trouble in many cases, using tabindex and a bit of JavaScript.

But what about screenreaders? They still won't see the elements as buttons. If we test our fake-div-buttons.html example in a screenreader, **our fake buttons will be reported using phrases like "Click me!, group", which is obviously confusing**.

We can fix this using a WAI-ARIA role. Make a local copy of fake-div-buttons.html, and add **role="button"** to each button ```<div>```, for example:

```
<div data-message="This is from the first button" tabindex="0" role="button">Click me!</div>
```

Now when you try this using a screenreader, you'll have buttons be reported using phrases like **"Click me!, button"** — much better.

> **Note**: Don't forget however that using the correct semantic element where possible is always better. If you want to create a button, and can use a <button> element, you should use a <button> element!


#### Guiding users through complex widgets

There are a whole host of other roles that can identify non-semantic element structures as common UI features that go beyond what's available in standard HTML, for example combobox, slider, tabpanel, tree. You can see a number of useful examples in the [Deque university code library](https://dequeuniversity.com/library/), to give you an idea of how such controls can be made accessible.

Let's go through an example of our own. **We'll return to our simple absolutely-positioned tabbed interface** (see Hiding things in our CSS and JavaScript accessibility article), which you can find at Tabbed info box example (see source code).

This example as-is works fine in terms of keyboard accessibility — you can happily tab between the different tabs and select them to show the tab contents. It is also fairly accessible too — you can scroll through the content and use the headings to navigate, even if you can't see what is happening on screen. **It is however not that obvious what the content is — a screenreader currently reports the content as a list of links, and some content with three headings. It doesn't give you any idea of what the relationship is between the content**. Giving the user more clues as to the structure of the content is always good.

To improve things, we've created a new version of the example called aria-tabbed-info-box.html (see it running live). **We've updated the structure of the tabbed interface** like so:

```
<ul role="tablist">
  <li class="active" role="tab" aria-selected="true" aria-setsize="3" aria-posinset="1" tabindex="0">Tab 1</li>
  <li role="tab" aria-selected="false" aria-setsize="3" aria-posinset="2" tabindex="0">Tab 2</li>
  <li role="tab" aria-selected="false" aria-setsize="3" aria-posinset="3" tabindex="0">Tab 3</li>
</ul>
<div class="panels">
  <article class="active-panel" role="tabpanel" aria-hidden="false">
    ...
  </article>
  <article role="tabpanel" aria-hidden="true">
    ...
  </article>
  <article role="tabpanel" aria-hidden="true">
    ...
  </article>
</div>
```

**Note**: The most striking change here is that **we've removed the links that were originally present in the example**, and just used the list items as the tabs — this was done because it makes things less confusing for screenreader users (the links don't really take you anywhere; they just change the view), and it allows the setsize/position in set features to work better — when these were put on the links, the browser kept reporting "1 of 1" all the time, not "1 of 3", "2 of 3", etc.

The new features are as follows:

- **New roles — tablist, tab, tabpanel** — these identify the important areas of the tabbed interface — the container for the tabs, the tabs themselves, and the corresponding tabpanels.
- **aria-selected** — Defines which tab is currently selected. As different tabs are selected by the user, the value of this attribute on the different tabs is updated via JavaScript.
- **aria-hidden** — Hides an element from being read out by a screenreader. As different tabs are selected by the user, the value of this attribute on the different tabs is updated via JavaScript.
- **tabindex="0"** — As we've removed the links, we need to give the list items this attribute to provide it with keyboard focus.
- **aria-setsize** — This property allows you to specify to screenreaders that an element is part of a series, and how many items the series has.
- **aria-posinset** — This property allows you to specify what position in a series an element is in. Along with aria-setsize, it provides a screenreader with enough information to tell you that you are currently on item "1 of 3", etc. In many cases, browsers should be able to infer this information from the element hierarchy, but it certainly helps to provide more clues.

In our tests, this new structure did serve to improve things overall. The tabs are now recognized as tabs (e.g. "tab" is spoken by the screenreader), the selected tab is indicated by "selected" being read out with the tab name, and the screenreader also tells you which tab number you are currently on. In addition, because of the aria-hidden settings (only the non-hidden tab ever has aria-hidden="false" set), the non-hidden content is the only one you can navigate down to, meaning the selected content is easier to find.

> **Note**: If there is anything you explicitly don't want screen readers to read out, you can give them the aria-hidden="true" attribute.

Test your skills!
You've reached the end of this article, but can you remember the most important information? You can find some further tests to verify that you've retained this information before you move on — see Test your skills: [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics/Test_your_skills:_WAI-ARIA).


### Summary

This article has by no means covered all that's available in WAI-ARIA, but it should have given you enough information to understand how to use it, and know some of the most common patterns you will encounter that require it.