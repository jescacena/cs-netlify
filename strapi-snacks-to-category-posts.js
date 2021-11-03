"use strict";

// NODE v10.16.0 !!!!
const fs = require("fs");
const fsExtra = require("fs-extra");
const fetch = require("node-fetch");

const baseCMSUrl = "http://localhost:1337";

const categoryUrlMap = [
    {
        categorySlug: "functional-programming",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=functional-programming"
    },
    {
        categorySlug: "es6",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=es6"
    },
    {
        categorySlug: "css",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=css"
    },
    {
        categorySlug: "javascript-design-patterns",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=javascript-design-patterns"
    },
    {
        categorySlug: "reactjs",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=reactjs"
    },
    {
        categorySlug: "flutter",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=flutter"
    },
    {
        categorySlug: "vuejs",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=vuejs"
    },
    {
        categorySlug: "js-unit-testing",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=js-unit-testing"
    },
    {
        categorySlug: "redux",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=redux"
    },
    {
        categorySlug: "typescript",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=typescript"
    },
    {
        categorySlug: "web-performance",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=web-performance"
    },
    {
        categorySlug: "web-components",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=web-components"
    },
    {
        categorySlug: "webpack",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=webpack"
    },
    {
        categorySlug: "pwa",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=pwa"
    },
    {
        categorySlug: "react-native",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=react-native"
    },
    {
        categorySlug: "angular",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=angular"
    },
    {
        categorySlug: "ux",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=ux"
    },
    {
        categorySlug: "gatsbyjs",
        urlPath:
            "/codersnacks-asoc-snack-categories?codersnacks_category.key=gatsbyjs"
    }
];

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

function getMarkdownHeaderForCategory(category) {
    return `---
layout: category-post
title:  ${category.header}
date:   ${category.updated_at}
permalink: /${category.key}/
categories: [catpost]
icon: ${category.image_url.replace('http:','https:')}
exclude: true
---`;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
};

const todayDate = getTodayDate();

const getMarkdownListFromSnackList = snackList => {
    let result = "";

    snackList.forEach(item => {
        result += ` * [${item.snack.header}](${item.snack.weblink}) \n`;
    });

    return result;
};

const writeCategoryPost = data => {
    const category = data.snackList[0].category;

    // TODO 1.- Build Markdown header
    const markdownHeader = getMarkdownHeaderForCategory(
        data.snackList[0].category
    );

    const markdownBody = getMarkdownListFromSnackList(data.snackList);

    let markdownContent = `${markdownHeader}\n${markdownBody}`;

    const filename = `${todayDate}-${category.key}.markdown`;
    fs.writeFile(`_posts/${filename}`, markdownContent, err => {
        if (err) throw err;
        console.log(`Markdown Category Post written to file ${filename} `);
    });
};

Promise.all(
    categoryUrlMap.map(item =>
        fetch(baseCMSUrl + item.urlPath)
            .then(response => response.json())
            .then(response => {
                return {
                    categorySlug: item.categorySlug,
                    snackList: response.map(item => {
                        return {
                            category: item.codersnacks_category,
                            snack: item.codersnack
                        };
                    })
                };
            })
            .catch(error => {
                console.log(
                    "Error fetching data for " + error + ":" + item.filename
                );
            })
    )
).then(data => {
    // fsExtra.emptyDirSync("_posts");

    data.forEach(categoryItem => writeCategoryPost(categoryItem));
});
