'use strict';

// NODE v10.16.0 !!!!
const fs = require('fs');
const fsExtra = require('fs-extra');
const fetch = require('node-fetch');

const baseCMSUrl = 'http://localhost:1337';

const jsonUrlMap = [
    {
        filename: 'categories.json',
        urlPath: '/codersnacks-categories'
    },
    {
        filename: 'css.snacks.json',
        urlPath:
            '/codersnacks-asoc-snack-categories?codersnacks_category.key=css'
    },
    {
        filename: 'css.quizzes.json',
        urlPath: '/codersnacks-asoc-snack-quizs?codersnacks_category.key=css'
    },
    {
        filename: 'es6.snacks.json',
        urlPath:
            '/codersnacks-asoc-snack-categories?codersnacks_category.key=es6'
    },
    {
        filename: 'es6.quizzes.json',
        urlPath: '/codersnacks-asoc-snack-quizs?codersnacks_category.key=es6'
    },
    {
        filename: 'functional-programming.snacks.json',
        urlPath:
            '/codersnacks-asoc-snack-categories?codersnacks_category.key=functional-programming'
    },
    {
        filename: 'functional-programming.quizzes.json',
        urlPath:
            '/codersnacks-asoc-snack-quizs?codersnacks_category.key=functional-programming'
    },
    {
        filename: 'javascript-design-patterns.snacks.json',
        urlPath:
            '/codersnacks-asoc-snack-categories?codersnacks_category.key=javascript-design-patterns'
    },
    {
        filename: 'javascript-design-patterns.quizzes.json',
        urlPath:
            '/codersnacks-asoc-snack-quizs?codersnacks_category.key=javascript-design-patterns'
    },
    {
        filename: 'reactjs.snacks.json',
        urlPath:
            '/codersnacks-asoc-snack-categories?codersnacks_category.key=reactjs'
    },
    {
        filename: 'reactjs.quizzes.json',
        urlPath:
            '/codersnacks-asoc-snack-quizs?codersnacks_category.key=reactjs'
    },
    {
        filename: 'flutter.snacks.json',
        urlPath:
            '/codersnacks-asoc-snack-categories?codersnacks_category.key=flutter'
    },
    {
        filename: 'flutter.quizzes.json',
        urlPath:
            '/codersnacks-asoc-snack-quizs?codersnacks_category.key=flutter'
    },
    {
        filename: 'vuejs.snacks.json',
        urlPath:
            '/codersnacks-asoc-snack-categories?codersnacks_category.key=vuejs'
    },
    {
        filename: 'vuejs.quizzes.json',
        urlPath:
            '/codersnacks-asoc-snack-quizs?codersnacks_category.key=vuejs'
    }
];

// use map() to perform a fetch and handle the response for each url
Promise.all(
    jsonUrlMap.map(item =>
        fetch(baseCMSUrl + item.urlPath)
            .then(response => response.json())
            .then(response => {
                return {
                    filename: item.filename,
                    jsonResponse: JSON.stringify(response)
                };
            })
            .catch(error => {
                console.log(
                    'Error fetching data for ' + error + ':' + item.filename
                );
            })
    )
).then(data => {
    // do something with the data
    // console.log('JES data', data[0].jsonResponse);
    fsExtra.emptyDirSync('assets/jsons');

    data.forEach(function(item) {
        let content = item.jsonResponse;

        // Persist count of quizzes per category
        if(item.filename.indexOf('.quizzes.')!== -1) {
            var countFilename = 'assets/jsons/' + item.filename;
            countFilename = countFilename.replace('quizzes.json', 'quizzes-count.json');
            var objContent = {
                count:JSON.parse(content).length
            }
            fs.writeFile(countFilename, JSON.stringify(objContent), err => {
                if (err) throw err;
                console.log('JSON written to file for ' + countFilename);
            });
        }

        fs.writeFile('assets/jsons/' + item.filename, content, err => {
            if (err) throw err;
            console.log('JSON written to file for ' + item.filename);
        });
    });
});
