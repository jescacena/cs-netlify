---
layout: main-content-post
title:  GatsbyJS - Sourcing Content from JSON or YAML
date:   2021-11-04T22:01:09.066Z
permalink: /gatsbyjs-sourcing-content-yaml-json/main-content/
icon: https://codersnack.com/assets/images/gatsbyjs-logo.png
categories: [snack-main-content-post]
---

As you work with Gatsby, **you might want to source data from a JSON or YAML file directly into a page or component**. This guide will cover approaches for those techniques, as well as architecting a Gatsby site from a YAML file.

## Directly import data with YAML

This section starts with YAML data sourcing. If you want to see how to do it using JSON instead, jump to the next section.

**Add the YAML content**
In your Gatsby project folder, **create a directory called *content*** and inside, add a file called **My-YAML-Content.yaml** with the following content:

*content/My-YAML-Content.yaml*
```
title: YAML content used at build time with Gatsby
content:
  - item:
      Cupcake ipsum dolor. Sit amet marshmallow topping cheesecake muffin. Halvah
      croissant candy canes bonbon candy. Apple pie jelly beans topping carrot cake
      danish tart cake cheesecake. Muffin danish chocolate soufflé pastry icing bonbon
      oat cake. Powder cake jujubes oat cake. Lemon drops tootsie roll marshmallow halvah
      carrot cake.
  - item:
      Doggo ipsum borkdrive much ruin diet you are doing me the shock the neighborhood pupper doggorino length boy many pats, boofers heckin shooberino wrinkler.
      Very good spot very jealous pupper very hand that feed shibe smol, shoob.
      Long bois pupper doggo you are doin me a concern big ol yapper, smol boof most angery pupper I have ever seen puggorino.
      Mlem blep wow very biscit dat tungg tho wow very biscit, thicc ur givin me a spook.
      Many pats heckin you are doing me the shock corgo ur givin me a spook very hand that feed shibe shooberino, big ol pupper doge pats borkdrive.
      Such treat what a nice floof super chub such treat, smol thicc.
      Puggorino very good spot most angery pupper I have ever seen you are doing me the shock big ol pupper porgo corgo shoober, heckin good boys lotsa pats noodle horse very taste wow thicc.
      What a nice floof long doggo blep length boy borking doggo, much ruin diet floofs borkf.
  - item: 192.33
  - item: 111111
```
**Import YAML into the page component**
Now that you have something you want to show, the only thing missing is to create a page that will consume the data.

**Add a new file called *yml-at-buildtime.js*** inside the pages folder, with the following code:

*src/pages/yml-at-buildtime.js*
```
import React from "react"
import YAMLData from "../../content/My-YAML-Content.yaml"
const YAMLbuildtime = () => (
  <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
    <h1>{YAMLData.title}</h1>
    <ul>
      {YAMLData.content.map((data, index) => {
        return <li key={`content_item_${index}`}>{data.item}</li>
      })}
    </ul>
  </div>
)
export default YAMLbuildtime
```

**The above code imports YAML source data as an array**, iterates over it with the Array.map method, and renders the data-filled markup through a functional React component.


## Directly import data with JSON

In addition to (or instead of) sourcing from YAML, you can use JSON as a data source in a Gatsby site.

**Add the JSON content**
In your Gatsby project folder, **create a directory named *content*** if it doesn’t exist, and then add a new file inside called My-JSON-Content.json with the following content:

*content/My-JSON-Content.json*
```
{
  "title": "JSON content used at build time with Gatsby",
  "content": [
    {
      "item": "Cupcake ipsum dolor. Sit amet marshmallow topping cheesecake muffin. Halvah croissant candy canes bonbon candy. Apple pie jelly beans topping carrot cake danish tart cake cheesecake. Muffin danish chocolate soufflé pastry icing bonbon oat cake. Powder cake jujubes oat cake. Lemon drops tootsie roll marshmallow halvah carrot cake."
    },
    {
      "item": "Doggo ipsum borkdrive much ruin diet you are doing me the shock the neighborhood pupper doggorino length boy many pats, boofers heckin shooberino wrinkler. Very good spot very jealous pupper very hand that feed shibe smol, shoob. Long bois pupper doggo you are doin me a concern big ol yapper, smol boof most angery pupper I have ever seen puggorino. Mlem blep wow very biscit dat tungg tho wow very biscit, thicc ur givin me a spook. Many pats heckin you are doing me the shock corgo ur givin me a spook very hand that feed shibe shooberino, big ol pupper doge pats borkdrive. Such treat what a nice floof super chub such treat, smol thicc. Puggorino very good spot most angery pupper I have ever seen you are doing me the shock big ol pupper porgo corgo shoober, heckin good boys lotsa pats noodle horse very taste wow thicc. What a nice floof long doggo blep length boy borking doggo, much ruin diet floofs borkf."
    },
    {
      "item": 192.33
    },
    {
      "item": 111111
    }
  ]
}
```
**Import JSON into the page component**
Now that you have JSON data that needs to be shown, all that’s missing is a page to consume it.

Add **a new file called *json-at-buildtime.js*** inside the pages folder with the following code:

*src/pages/json-at-buildtime.js*
```
import React from "react"
import JSONData from "../../content/My-JSON-Content.json"
const JSONbuildtime = () => (
  <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
    <h1>{JSONData.title}</h1>
    <ul>
      {JSONData.content.map((data, index) => {
        return <li key={`content_item_${index}`}>{data.item}</li>
      })}
    </ul>
  </div>
)
export default JSONbuildtime
```

Similar to the YAML example above, this code snippet shows how to import a JSON file for sourcing data. When imported, the data can be iterated upon with the Array.map method and rendered in a React component.

Out of the box and without any extra configuration, the page will show content sourced from a JSON file.

