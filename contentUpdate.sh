#!/usr/bin/env bash
#
# Content update in netlify for jsons and posts (from Strapi content management)
#
node strapi-snacks-to-posts.js
node strapi-snacks-to-category-posts.js
node strapi-snacks-to-jsons.js
git add .
git commit -m 'content update'
git push origin master
