# Codersnack site generator

* Using Jekyll static site generator

### Local development

* Run jekyll in local
```
jekyll serve 
```

### Import snacks and jsons from strapi content management (in local)

* Run content management **strapi** in url http://localhost:1337/. Check: **http://localhost:1337/codersnacks** is working
* Run scripts:
````
./contentUpdate.sh
````
which include these two node scripts:
````
./node strapi-snacks-to-posts.js
````
````
./node strapi-snacks-to-jsons.js
````
Resulting in saving single snacks markdown in **_posts**
and json files (for mobile app) in **assets/jsons**