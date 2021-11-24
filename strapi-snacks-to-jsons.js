"use strict";

// NODE v10.16.0 !!!!
const fs = require("fs");
const fsExtra = require("fs-extra");
const fetch = require("node-fetch");

const baseCMSUrl = "http://localhost:1337";

const jsonUrlMap = [
  {
    filename: "categories.json",
    urlPath: "/codersnacks-categories",
  },
  {
    filename: "css.snacks.json",
    urlPath: "/codersnacks-asoc-snack-categories?codersnacks_category.key=css",
  },
  {
    filename: "css.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=css",
  },
  {
    filename: "es6.snacks.json",
    urlPath: "/codersnacks-asoc-snack-categories?codersnacks_category.key=es6",
  },
  {
    filename: "es6.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=es6",
  },
  {
    filename: "functional-programming.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=functional-programming",
  },
  {
    filename: "functional-programming.quizzes.json",
    urlPath:
      "/codersnacks-asoc-snack-quizs?codersnacks_category.key=functional-programming",
  },
  {
    filename: "javascript-design-patterns.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=javascript-design-patterns",
  },
  {
    filename: "javascript-design-patterns.quizzes.json",
    urlPath:
      "/codersnacks-asoc-snack-quizs?codersnacks_category.key=javascript-design-patterns",
  },
  {
    filename: "reactjs.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=reactjs",
  },
  {
    filename: "reactjs.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=reactjs",
  },
  {
    filename: "flutter.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=flutter",
  },
  {
    filename: "flutter.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=flutter",
  },
  {
    filename: "vuejs.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=vuejs",
  },
  {
    filename: "vuejs.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=vuejs",
  },
  {
    filename: "js-unit-testing.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=js-unit-testing",
  },
  {
    filename: "js-unit-testing.quizzes.json",
    urlPath:
      "/codersnacks-asoc-snack-quizs?codersnacks_category.key=js-unit-testing",
  },
  {
    filename: "redux.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=redux",
  },
  {
    filename: "redux.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=redux",
  },
  {
    filename: "typescript.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=typescript",
  },
  {
    filename: "typescript.quizzes.json",
    urlPath:
      "/codersnacks-asoc-snack-quizs?codersnacks_category.key=typescript",
  },
  {
    filename: "web-performance.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=web-performance",
  },
  {
    filename: "web-performance.quizzes.json",
    urlPath:
      "/codersnacks-asoc-snack-quizs?codersnacks_category.key=web-performance",
  },
  {
    filename: "web-components.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=web-components",
  },
  {
    filename: "web-components.quizzes.json",
    urlPath:
      "/codersnacks-asoc-snack-quizs?codersnacks_category.key=web-components",
  },
  {
    filename: "webpack.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=webpack",
  },
  {
    filename: "webpack.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=webpack",
  },
  {
    filename: "pwa.snacks.json",
    urlPath: "/codersnacks-asoc-snack-categories?codersnacks_category.key=pwa",
  },
  {
    filename: "pwa.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=pwa",
  },
  {
    filename: "react-native.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=react-native",
  },
  {
    filename: "react-native.quizzes.json",
    urlPath:
      "/codersnacks-asoc-snack-quizs?codersnacks_category.key=react-native",
  },
  {
    filename: "angular.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=angular",
  },
  {
    filename: "angular.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=angular",
  },
  {
    filename: "ux.snacks.json",
    urlPath: "/codersnacks-asoc-snack-categories?codersnacks_category.key=ux",
  },
  {
    filename: "ux.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=ux",
  },
  {
    filename: "nextjs.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=nextjs",
  },
  {
    filename: "nextjs.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=nextjs",
  },
  {
    filename: "gatsbyjs.snacks.json",
    urlPath:
      "/codersnacks-asoc-snack-categories?codersnacks_category.key=gatsbyjs",
  },
  {
    filename: "gatsbyjs.quizzes.json",
    urlPath: "/codersnacks-asoc-snack-quizs?codersnacks_category.key=gatsbyjs",
  },
];

// use map() to perform a fetch and handle the response for each url
Promise.all(
  jsonUrlMap.map((item) => {
    const url =
      item.urlPath !== "categories.json"
        ? baseCMSUrl + item.urlPath + "&_limit=10000"
        : baseCMSUrl + item.urlPath + "?_limit=10000";
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        return {
          filename: item.filename,
          jsonResponse: JSON.stringify(response),
        };
      })
      .catch((error) => {
        console.log("Error fetching data for " + error + ":" + item.filename);
      });
  })
).then((data) => {
  // do something with the data
  // console.log('JES data', data[0].jsonResponse);
  fsExtra.emptyDirSync("assets/jsons");

  data.forEach(function (item) {
    let content = item.jsonResponse;

    // Persist count of quizzes per category
    if (item.filename.indexOf(".quizzes.") !== -1) {
      var countFilename = "assets/jsons/" + item.filename;
      countFilename = countFilename.replace(
        "quizzes.json",
        "quizzes-count.json"
      );
      var objContent = {
        count: JSON.parse(content).length,
      };
      fs.writeFile(countFilename, JSON.stringify(objContent), (err) => {
        if (err) throw err;
        console.log("JSON written to file for " + countFilename);
      });
    }

    fs.writeFile("assets/jsons/" + item.filename, content, (err) => {
      if (err) throw err;
      console.log("JSON written to file for " + item.filename);
    });
  });
});
