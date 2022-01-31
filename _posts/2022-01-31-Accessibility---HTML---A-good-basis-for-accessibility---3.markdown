---
layout: post
title:  Accessibility - HTML - A good basis for accessibility - 3
date:   2022-01-31T10:34:07.075Z
permalink: /ux-accessibility-html-3/
icon: https://codersnack.com/assets/images/ux-logo.png
categories: [snackpost]
---

> Information drawn from 
- [MDN - HTML - A good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)


### Accessible data tables

A basic data table can be written with very simple markup, for example:
```
<table>
  <tr>
    <td>Name</td>
    <td>Age</td>
    <td>Gender</td>
  </tr>
  <tr>
    <td>Gabriel</td>
    <td>13</td>
    <td>Male</td>
  </tr>
  <tr>
    <td>Elva</td>
    <td>8</td>
    <td>Female</td>
  </tr>
  <tr>
    <td>Freida</td>
    <td>5</td>
    <td>Female</td>
  </tr>
</table>
```

**But this has problems — there is no way for a screen reader user to associate rows or columns together as groupings of data.** To do this, you need to know what the header rows are and if they are heading up rows, columns, etc. This can only be done visually for the above table (see bad-table.html and try the example out yourself).

Now have a look at our [punk bands table example](https://github.com/mdn/learning-area/blob/main/css/styling-boxes/styling-tables/punk-bands-complete.html) :
```
<table>
      <caption>A summary of the UK's most famous punk bands</caption>
      <thead>
        <tr>
          <th scope="col">Band</th>
          <th scope="col">Year formed</th>
          <th scope="col">No. of Albums</th>
          <th scope="col">Most famous song</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Buzzcocks</th>
          <td>1976</td>
          <td>9</td>
          <td>Ever fallen in love (with someone you shouldn't've)</td>
        </tr>
        <tr>
          <th scope="row">The Clash</th>
          <td>1976</td>
          <td>6</td>
          <td>London Calling</td>
        </tr>
        <tr>
          <th scope="row">The Damned</th>
          <td>1976</td>
          <td>10</td>
          <td>Smash it up</td>
        </tr>
        <tr>
          <th scope="row">Sex Pistols</th>
          <td>1975</td>
          <td>1</td>
          <td>Anarchy in the UK</td>
        </tr>
        <tr>
          <th scope="row">Sham 69</th>
          <td>1976</td>
          <td>13</td>
          <td>If The Kids Are United</td>
        </tr>
        <tr>
          <th scope="row">Siouxsie and the Banshees</th>
          <td>1976</td>
          <td>11</td>
          <td>Hong Kong Garden</td>
        </tr>
        <tr>
          <th scope="row">Stiff Little Fingers</th>
          <td>1977</td>
          <td>10</td>
          <td>Suspect Device</td>
        </tr>
        <tr>
          <th scope="row">The Stranglers</th>
          <td>1974</td>
          <td>17</td>
          <td>No More Heroes</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row" colspan="2">Total albums</th>
          <td colspan="2">77</td>
        </tr>
      </tfoot>
    </table>
```

you can see a few accessibility aids at work here:

- **Table headers are defined using ```<th>``` elements** — you can also specify if they are headers for rows or columns using the scope attribute. This gives you complete groups of data that can be consumed by screen readers as single units.
- **The ```<caption>``` element and ```<table>``` summary attribute both do similar jobs — they act as alt text for a table, giving a screen reader user a useful quick summary of the table's contents**. The ```<caption>``` element is generally preferred as it makes it's content accessible to sighted users too, who might also find it useful. You don't really need both.

> **Note**: See our [HTML table advanced features and accessibility article](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced) for more details about accessible data tables.


### Text alternatives

**Whereas textual content is inherently accessible, the same cannot necessarily be said for multimedia content — image and video content cannot be seen by visually-impaired people, and audio content cannot be heard by hearing-impaired people**. We cover video and audio content in detail in the Accessible multimedia, but for this article **we'll look at accessibility for the humble ```<img>```  element.**

We have a simple example written up, accessible-image.html, which features four copies of the same image:

```
<img src="dinosaur.png">

<img src="dinosaur.png"
     alt="A red Tyrannosaurus Rex: A two legged dinosaur standing upright like a human, with small arms, and a large head with lots of sharp teeth.">

<img src="dinosaur.png"
     alt="A red Tyrannosaurus Rex: A two legged dinosaur standing upright like a human, with small arms, and a large head with lots of sharp teeth."
     title="The Mozilla red dinosaur">

<img src="dinosaur.png" aria-labelledby="dino-label">

<p id="dino-label">The Mozilla red Tyrannosaurus Rex: A two legged dinosaur standing upright like a human, with small arms, and a large head with lots of sharp teeth.</p>
```

**The first image, when viewed by a screen reader, doesn't really offer the user much help** — VoiceOver for example reads out "/dinosaur.png, image". It reads out the filename to try to provide some help. In this example the user will at least know it is a dinosaur of some kind, but often files may be uploaded with machine-generated file names (e.g. from a digital camera) and these file names would likely provide no context to the image's content.

> **Note**: This is why you should never include text content inside an image — screen readers can't access it. There are other disadvantages too — you can't select it and copy/paste it. Just don't do it!

**When a screen reader encounters the second image, it reads out the full alt attribute** — "A red Tyrannosaurus Rex: A two legged dinosaur standing upright like a human, with small arms, and a large head with lots of sharp teeth.".

**This highlights the importance of not only using meaningful file names in case so-called alt text is not available, but also making sure that alt text is provided in alt attributes wherever possible**. Note that the contents of the alt attribute should always provide a direct representation of the image and what it conveys visually. Any personal knowledge or extra description shouldn't be included here, as it is not useful for people who have not come across the image before.

One thing to consider is whether your images have meaning inside your content, or whether they are purely for visual decoration, and thus have no meaning. **If they are decorative, it is better to write an empty text as a value for alt attribute (see Empty alt attributes) or to just include them in the page as CSS background images.**

> **Note**: Read [Images in HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML) and [Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for a lot more information about image implementation and best practices.

**If you do want to provide extra contextual information, you should put it in the text surrounding the image, or inside a title attribute, as shown above**. In this case, most screen readers will read out the alt text, the title attribute, and the filename. In addition, browsers display title text as tooltips when moused over.


![title-attribute](https://codersnack.com/assets/images/title-attribute.png)

Let's have another quick look at the fourth method:
```
<img src="dinosaur.png" aria-labelledby="dino-label">

<p id="dino-label">The Mozilla red Tyrannosaurus ... </p>
```

**In this case, we are not using the alt attribute at all — instead, we have presented our description of the image as a regular text paragraph, given it an id, and then used the *aria-labelledby* attribute to refer to that id, which causes screen readers to use that paragraph as the alt text/label for that image**. This is especially useful if you **want to use the same text as a label for multiple images** — something that isn't possible with alt.

> **Note**: aria-labelledby is part of the WAI-ARIA spec, which allows developers to add in extra semantics to their markup to improve screen reader accessibility where needed. To find out more about how it works, read our [WAI-ARIA Basics article](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics).


#### Other text alternative mechanisms

Images also have another mechanisms available for providing descriptive text. For example, there is a **longdesc attribute that is meant to point to a separate web document containing an extended description of the image**, for example:

```
<img src="dinosaur.png" longdesc="dino-info.html">
```

**This sounds like a good idea, especially for *infographics* like big charts with lots of information on them that could perhaps be represented as an accessible data table instead (see Accessible data tables)**. However, **longdesc is not supported consistently by screen readers**, and the content is completely inaccessible to non-screen reader users. It is arguably much better to include the long description on the same page as the image, or link to it with a regular link.

**HTML5 includes two new elements — ```<figure>``` and ```<figcaption>```** — which are supposed to associate a figure of some kind (it could be anything, not necessarily an image) with a figure caption:

```
<figure>
  <img src="dinosaur.png" alt="The Mozilla Tyrannosaurus">
  <figcaption>A red Tyrannosaurus Rex: A two legged dinosaur standing upright like a human, with small arms, and a large head with lots of sharp teeth.</figcaption>
</figure>
```

**Unfortunately, most screen readers don't seem to associate figure captions with their figures yet**. That said, the element structure is **useful for CSS styling**, plus it provides a way to place a description of the image next to it in the source.

#### Empty alt attributes

```
<h3>
  <img src="article-icon.png" alt="">
  Tyrannosaurus Rex: the king of the dinosaurs
</h3>
```

**There may be times where an image is included in a page's design, but its primary purpose is for visual decoration**. You'll notice in the code example above that the image's alt attribute is empty — this is to make screen readers recognize the image, but **not attempt to describe the image** (instead they'd just say "image", or similar).

**The reason to use an empty alt instead of not including it is because many screen readers announce the whole image URL if no alt is provided**. In the above example, the image is acting as a visual decoration to the heading it's associated with. In cases like this, and in cases where an image is only decoration and has no content value, you should include an empty alt in your img elements. **Another alternative is to use the aria role attribute *role="presentation"* as this also stops screen readers from reading out alternative text.**

> **Note**: If possible you should use CSS to display images that are only decorative.


### More on links

**Links ( the ```<a>``` element with an href attribute ), depending on how they are used, can help or harm accessibility**. By default, links are accessible in appearance. They can improve accessibility by helping a user quickly navigate to different sections of a document. **They can also harm accessibility if their accessible styling is removed or if JavaScript causes them to behave in unexpected ways.**


#### Link styling

**By default, links are visually different from other text in both color and text-decoration, with links being blue and underlined by default, purple and underlined if visited, and with a focus-ring when they receive keyboard focus.**

**Color should not be used as the sole method of distinguishing links from non-linking content**. Link text color, like all text, has to be significantly different from the background color (a 4.5:1 contrast). In addition, links should visually be significantly different from non-linking text. With a **minimum contrast requirement of 3:1 between link text and surrounding text and between default**, visited, and focus/active states and a 4:5 contrast between all those state colors and the background color.


#### onclick events

**Anchor tags are often abused with the onclick event to create pseudo-buttons by setting href to "#" or "javascript:void(0)" to prevent the page from refreshing**.

These values cause unexpected behavior when copying or dragging links, opening links in a new tab or window, bookmarking, and when JavaScript is still downloading, errors out, or is disabled. This also conveys incorrect semantics to assistive technologies (e.g., screen readers). In these cases, it is **recommended to use a ```<button>```  instead**. In general you should only use an anchor for navigation using a proper URL.


#### External links and linking to non-HTML resources

**Links that open in a new tab or window via the *target="_blank"* declaration and links to whose href value points to a file resource should include an *indicator about the behavior* that will occur when the link is activated.**

People experiencing low vision conditions, who are navigating with the aid of screen reading technology, or who have cognitive concerns may become confused when the new tab, window, or application is opened unexpectedly. Older versions of screen reading software may not even announce the behavior.

*Link that opens a new tab or window*
```
<a target="_blank" href="https://www.wikipedia.org/">Wikipedia (opens in a new window)</a>
```

*Link to a non-HTML resource*
```
<a target="_blank" href="2017-annual-report.ppt">2017 Annual Report (PowerPoint)</a>
```

**If an icon is used in place of text to signify this kind of links behavior, make sure it includes an alternate description**.

- [WebAIM: Links and Hypertext - Hypertext Links]


#### Skip links

**A skip link, also known as skipnav, is an a element placed as close as possible to the opening ```<body>```  element that links to the beginning of the page's main content**. This link allows people to** bypass content repeated throughout multiple pages on a website, such as a website's header and primary navigation**.

**Skip links are especially useful for people who navigate with the aid of assistive technology such as switch control, voice command, or mouth sticks/head wands, where the act of moving through repetitive links can be a laborious task.**

- [WebAIM: "Skip Navigation" Links](https://webaim.org/techniques/skipnav/)


### Proximity

**Large amounts of interactive content—including anchors—placed in close visual proximity to each other should have space inserted to separate them**. **This spacing is beneficial for people who suffer from fine motor control issues** and may accidentally activate the wrong interactive content while navigating.

Spacing may be created **using CSS properties such as margin**.

- [Hand tremors and the giant-button-problem - Axess Lab](https://axesslab.com/hand-tremors/)


### Test your skills!

You've reached the end of this article, but can you remember the most important information? See [Test your skills: HTML Accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Test_your_skills:_HTML_accessibility) to verify that you've retained this information before you move on.


### Summary

You should now be well-versed in writing accessible HTML for most occasions. Our WAI-ARIA basics article will help to fill gaps in this knowledge, but this article has taken care of the basics. Next up we'll explore **CSS and JavaScript, and how accessibility is affected by their good or bad use**.

