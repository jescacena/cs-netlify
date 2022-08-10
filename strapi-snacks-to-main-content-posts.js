"use strict";

// NODE v10.16.0 !!!!
const fs = require("fs");
const fsExtra = require("fs-extra");
const fetch = require("node-fetch");

function getTodayDate() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }

    if (mm < 10) {
        mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
}

function getMarkdownHeader(title, date, slug, featured_image_url) {
    return `---
layout: main-content-post
title:  ${title}
date:   ${date}
permalink: /${slug}/main-content/
icon: ${featured_image_url}
categories: [snack-main-content-post]
---`;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
};

fetch("http://localhost:1337/codersnacks?_limit=10000")
    .then(response => response.json())
    .then(data => {
        // console.log(data)

        // fsExtra.emptyDirSync("_main_content_posts");

        var todayDate = getTodayDate();

        data.forEach(function(item) {
            // console.log(item);
            // let content = JSON.stringify(item.explanation, null, 2).replaceAll('\\n','\n');
            let content = item.explanation;

            let slug = item.header.replaceAll(" ", "-");
            slug = slug.replace("?", "");
            slug = slug.replace(":", "");
            slug = `${slug}-MC`;

            let title = item.header.replace(":", "");
            let contentHeader = getMarkdownHeader(
                title,
                item.updated_at,
                item.slug,
                item.featured_image_url
            );

            fs.writeFile(
                "_posts/" + todayDate + "-" + slug + ".markdown",
                contentHeader + "\n\n" + content,
                err => {
                    if (err) throw err;
                    console.log(
                        "Markdown Main Content Post written to file for " + item.header
                    );
                }
            );
        });
    })
    .catch(err => console.error("ERROR!!", err));

getTodayDate();