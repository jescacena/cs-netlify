# Codersnack site generator

* Using Jekyll static site generator

### Local development

* Run jekyll in local
```
jekyll serve 
```

### Import snacks from strapi (in local)

* Run content management **strapi** in url http://localhost:1337/. Check: **http://localhost:1337/codersnacks** is working
* Run node script:
````
./node strapi-snacks-to-posts.js
````
Resulting in saving single snacks markdown in **_posts**