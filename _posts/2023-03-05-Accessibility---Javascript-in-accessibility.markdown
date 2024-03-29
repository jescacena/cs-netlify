---
layout: post
title:  Accessibility - Javascript in accessibility
date:   2022-01-31T12:34:02.435Z
permalink: /ux-accessibility-javascript/
icon: https://codersnack.com/assets/images/ux-logo.png
categories: [snackpost]
---

> Information drawn from 
- [MDN - Accessibility-CSS_and_JavaScript](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/CSS_and_JavaScript)

**JavaScript can also break accessibility, depending on how it is used.**

Modern JavaScript is a powerful language, and we can do so much with it these days, from simple content and UI updates to fully-fledged 2D and 3D games. There is no rule that says all content has to be 100% accessible to all people — you just need to do what you can, and make your apps as accessible as possible.

Simple content and functionality is arguably easy to make accessible — for example text, images, tables, forms and push button that activate functions. As we looked at in our HTML: A good basis for accessibility article, the key considerations are:

- **Good semantics: Using the right element for the right job**. For example, making sure you use headings and paragraphs, and ```<button>```  and ```<a>```  elements
- **Making sure content is available as text, either directly as text content, good text labels for form elements, or text alternatives, e.g. alt text for images.**

**We also looked at an example of how to use JavaScript to build in functionality where it is missing — see Building keyboard accessibility back in. This is not ideal — really you should just use the right element for the right job** — but it shows that it is possible in situations where for some reason you can't control the markup that is used. **Another way to improve accessibility for non-semantic JavaScript-powered widgets is to use WAI-ARIA to provide extra semantics for screen reader users**. The next article will also cover this in detail.

**Complex functionality like 3D games are not so easy to make accessible — a complex 3D game created using WebGL will be rendered on a ```<canvas>```  element, which has no facility at this time to provide text alternatives or other information for severely visually impaired users to make use of**. It is arguable that such a game doesn't really have this group of people as a part of its main target audience, and it would be unreasonable to expect you to make it 100% accessible to blind people, **however you could implement keyboard controls so it is usable by non-mouse users, and make the color scheme contrasting enough to be usable by those with color deficiencies**.


#### The problem with too much JavaScript

**The problem often comes when people rely on JavaScript too much**. Sometimes you'll see a website where everything has been done with JavaScript — the HTML has been generated by JavaScript, the CSS has been generated by JavaScript, etc. This has all kinds of accessibility and other issues associated with it, so it is not advised.

As well as using the right element for the right job, you should also make sure you are using the right technology for the right job! **Think carefully about whether you need that shiny JavaScript-powered 3D information box, or whether plain old text would do**. Think carefully about whether you need a complex non-standard form widget, or whether a text input would do. **And don't generate all your HTML content using JavaScript if at all possible**.


#### Keeping it unobtrusive

You should keep unobtrusive JavaScript in mind when creating your content. **The idea of unobtrusive JavaScript is that it should be used wherever possible to enhance functionality, not build it in entirely — basic functions should ideally work without JavaScript, although it is appreciated that this is not always an option**. But again, a large part of it is using built-in browser functionality where possible.

**Good example uses of unobtrusive JavaScript include:**

- **Providing client-side form validation, which alerts users to problems with their form entries quickly, without having to wait for the server to check the data**. If it isn't available, the form will still work, but validation might be slower.
- **Providing custom controls for HTML5 ```<video>``` s that are accessible to keyboard-only users, along with a direct link to the video** that can be used to access it if JavaScript is not available (the default ```<video>```  browser controls aren't keyboard accessible in most browsers).

As an example, we've written a quick and dirty client-side form validation example — see [form-validation.html](https://github.com/mdn/learning-area/blob/main/accessibility/css/form-validation.html) (also see the [demo live](https://mdn.github.io/learning-area/accessibility/css/form-validation.html)). Here you'll see a simple form; **when you try to submit the form with one or both fields left empty, the submit fails, and an error message box appears to tell you what is wrong**.


![ux-accessibility-form-validation-unobstrusive.png](https://codersnack.com/assets/images/ux-accessibility-form-validation-unobstrusive.png)

**This kind of form validation is unobtrusive — you can still use the form absolutely fine without the JavaScript being available, and any sensible form implementation will have server-side validation active as well, because it is too easy for malicious users to bypass client-side validation** (for example, by turning JavaScript off in the browser). The client-side validation is still really useful for reporting errors — users can know about mistakes they make instantly, rather than having to wait for a round trip to the server and a page reload. This is a definite usability advantage.

**Note**: Server-side validation has not been implemented in this simple demo.

**We've made this form validation pretty accessible too. We've used ```<label>```  elements** to make sure the form labels are unambiguously linked to their inputs, so screen readers can read them out alongside:

```
<label for="name">Enter your name:</label>
<input type="text" name="name" id="name">
```

**We only do the validation when the form is submitted — this is so that we don't update the UI too often and potentially confuse screen reader** (and possibly other) users:

```
form.onsubmit = validate;

function validate(e) {
  errorList.innerHTML = '';
  for(let i = 0; i < formItems.length; i++) {
    const testItem = formItems[i];
    if(testItem.input.value === '') {
      errorField.style.left = '360px';
      createLink(testItem);
    }
  }

  if(errorList.innerHTML !== '') {
    e.preventDefault();
  }
}
```

> **Note**: In this example, **we are hiding and showing the error message box using absolute positioning rather than another method such as visibility or display**, because it doesn't interfere with the screen reader being able to read content from it.

Real form validation would be much more complex than this — you'd want to check that the entered name actually looks like a name, the entered age is actually a number and is realistic (e.g. nonnegative and less than 4 digits). Here we've just implemented a simple check that a value has been filled in to each input field (if(testItem.input.value === '')).

When the validation has been performed, if the tests pass then the form is submitted. If there are errors (if(errorList.innerHTML !== '')) then we stop the form submitting (using preventDefault()), and display any error messages that have been created (see below). **This mechanism means that the errors will only be shown if there are errors, which is better for usability**.

For each input that doesn't have a value filled in when the form is submitted, we create a list item with a link and insert it in the errorList.

```
function createLink(testItem) {
  const listItem = document.createElement('li');
  const anchor = document.createElement('a');

  anchor.textContent = testItem.input.name + ' field is empty: fill in your ' + testItem.input.name + '.';
  anchor.href = '#' + testItem.input.name;
  anchor.onclick = function() {
    testItem.input.focus();
  };
  listItem.appendChild(anchor);
  errorList.appendChild(listItem);
}
```

Each link serves a dual purpose — it tells you what the error is, plus you can click on it/activate it to jump straight to the input element in question and correct your entry.

> **Note**: The focus() part of this example is a bit tricky. Chrome and Edge (and newer versions of IE) will focus the element when the link is clicked, without needing the onclick/focus() block. Safari will only highlight the form element with the link on its own, so needs the onclick/focus() block to actually focus it. Firefox doesn't focus the inputs properly at all in this context, so Firefox users can't take advantage of this at present (although everything else works fine). The Firefox issue should be fixed soon — work is being done to give Firefox behavior parity with other browsers (see bug 277178).

**In addition, the errorField is placed at the top of the source order (although it is positioned differently in the UI using CSS)**, meaning that users can find out exactly what's wrong with their form submissions and get to the input elements in question by going back up to the start of the page.


![ux-accessibility-form-errors-atthetop.png](https://codersnack.com/assets/images/ux-accessibility-form-errors-atthetop.png)

**As a final note, we have used some *WAI-ARIA attributes* in our demo to help solve accessibility problems caused by areas of content constantly updating without a page reload (screen readers won't pick this up or alert users to it by default)**:

```
<div class="errors" role="alert" aria-relevant="all">
  <ul>
  </ul>
</div>
```

We will explain these attributes in our next article, which covers WAI-ARIA in much more detail.

> **Note**: Some of you will probably be thinking about that fact that **HTML5 forms have built-in validation mechanisms** like the required, min/minlength, and max/maxlength attributes (see the ```<input>```  element reference for more information). We didn't end up using these in the demo because cross-browser support for them is patchy (for example IE10 and above only).

---

> **Note**: WebAIM's [Usable and Accessible Form Validation and Error Recovery](https://webaim.org/techniques/formvalidation/) provides some further useful information about accessible form validation.


#### Other JavaScript accessibility concerns

There are other things to be aware of when implementing JavaScript and thinking about accessibility. We will add more as we find them.

**mouse-specific events**

As you will be aware, **most user interactions are implemented in client-side JavaScript using event handlers**, which allow us to run functions in response to certain events happening. Some events can have accessibility issues. The main example you'll come across is mouse-specific events like mouseover, mouseout, dblclick, etc. **Functionality that runs in response to these events will not be accessible using other mechanisms, like keyboard controls.**

**To mitigate such problems, you should double up these events with similar events that can be activated by other means (so-called device-independent event handlers) — *focus and blur* would provide accessibility for keyboard users.**

Let's look at an example that highlights when this could be useful. **Maybe we want to provide a thumbnail image that shows a larger version of the image when it is moused over or focused** (like you'd see on an e-commerce product catalog.)

We've made a very simple example, which you can find at [mouse-and-keyboard-events.html](https://mdn.github.io/learning-area/accessibility/css/mouse-and-keyboard-events.html) (see also the [source code](https://github.com/mdn/learning-area/blob/main/accessibility/css/mouse-and-keyboard-events.html)). The code features two functions that show and hide the zoomed-in image; these are run by the following lines that set them as event handlers:

```
imgThumb.onmouseover = showImg;
imgThumb.onmouseout = hideImg;

imgThumb.onfocus = showImg;
imgThumb.onblur = hideImg;
```

The first two lines run the functions when the mouse pointer hovers over and stops hovering over the thumbnail, respectively. This won't allow us to access the zoomed view by keyboard though — to allow that, we've included the last two lines, **which run the functions when the image is focused and blurred (when focus stops). This can be done by tabbing over the image,** because we've included tabindex="0" on it.

**The click event is interesting — it sounds mouse-dependent, but most browsers will activate onclick event handlers after Enter/Return is pressed on a link or form element that has focus**, or when such an element is tapped on a touchscreen device. This doesn't work by default however when you allow a non-default-focusable event to have focus using tabindex — in such cases you need to detect specifically when that exact key is pressed (see Building keyboard accessibility back in).
