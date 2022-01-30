---
layout: post
title:  JS Clean Code - Testing - Concurrency - Error Handling
date:   2021-11-29T09:29:29.850Z
permalink: /js-clean-code-testing-concurrency-error-handling/
icon: https://codersnack.com/assets/images/js-clean-code.png
categories: [snackpost]
---

> Information drawn from 
- [Clean Code Javascript - Ryan McDermott](https://github.com/ryanmcdermott/clean-code-javascript)


### Testing

Testing is more important than shipping.**If you have no tests or an inadequate amount, then every time you ship code you won't be sure that you didn't break anything**. Deciding on what constitutes an adequate amount is up to your team, but having 100% coverage (all statements and branches) is how you achieve very high confidence and developer peace of mind. This means that in addition to having a great testing framework, you also need to use a good coverage tool.

**There's no excuse to not write tests**. There are plenty of good JS test frameworks, so find one that your team prefers. When you find one that works for your team, then **aim to always write tests for every new feature/module you introduce.** If your preferred method is Test Driven Development (TDD), that is great, but the main point is to just make sure you are reaching your coverage goals before launching any feature, or refactoring an existing one.

#### Single concept per test

*Bad:*
``` 
import assert from "assert";

describe("MomentJS", () => {
  it("handles date boundaries", () => {
    let date;

    date = new MomentJS("1/1/2015");
    date.addDays(30);
    assert.equal("1/31/2015", date);

    date = new MomentJS("2/1/2016");
    date.addDays(28);
    assert.equal("02/29/2016", date);

    date = new MomentJS("2/1/2015");
    date.addDays(28);
    assert.equal("03/01/2015", date);
  });
});
```
*Good:*
```
import assert from "assert";

describe("MomentJS", () => {
  it("handles 30-day months", () => {
    const date = new MomentJS("1/1/2015");
    date.addDays(30);
    assert.equal("1/31/2015", date);
  });

  it("handles leap year", () => {
    const date = new MomentJS("2/1/2016");
    date.addDays(28);
    assert.equal("02/29/2016", date);
  });

  it("handles non-leap year", () => {
    const date = new MomentJS("2/1/2015");
    date.addDays(28);
    assert.equal("03/01/2015", date);
  });
});
```

### Concurrency
********

#### Use Promises, not callbacks

**Callbacks aren't clean, and they cause excessive amounts of nesting**. With ES2015/ES6, Promises are a built-in global type. Use them!

*Bad:*
```
import { get } from "request";
import { writeFile } from "fs";

get(
  "https://en.wikipedia.org/wiki/Robert_Cecil_Martin",
  (requestErr, response, body) => {
    if (requestErr) {
      console.error(requestErr);
    } else {
      writeFile("article.html", body, writeErr => {
        if (writeErr) {
          console.error(writeErr);
        } else {
          console.log("File written");
        }
      });
    }
  }
);
```

*Good:*
```
import { get } from "request-promise";
import { writeFile } from "fs-extra";

get("https://en.wikipedia.org/wiki/Robert_Cecil_Martin")
  .then(body => {
    return writeFile("article.html", body);
  })
  .then(() => {
    console.log("File written");
  })
  .catch(err => {
    console.error(err);
  });
```


#### Async/Await are even cleaner than Promises

**Promises are a very clean alternative to callbacks, but ES2017/ES8 brings async and await which offer an even cleaner solution**. All you need is a function that is prefixed in an async keyword, and then you can write your logic imperatively without a then chain of functions. Use this if you can take advantage of ES2017/ES8 features today!

*Bad:*
```
import { get } from "request-promise";
import { writeFile } from "fs-extra";

get("https://en.wikipedia.org/wiki/Robert_Cecil_Martin")
  .then(body => {
    return writeFile("article.html", body);
  })
  .then(() => {
    console.log("File written");
  })
  .catch(err => {
    console.error(err);
  });
```

*Good:*
```
import { get } from "request-promise";
import { writeFile } from "fs-extra";

async function getCleanCodeArticle() {
  try {
    const body = await get(
      "https://en.wikipedia.org/wiki/Robert_Cecil_Martin"
    );
    await writeFile("article.html", body);
    console.log("File written");
  } catch (err) {
    console.error(err);
  }
}

getCleanCodeArticle()
```


### Error Handling

**Thrown errors are a good thing!** They mean the **runtime has successfully identified when something in your program has gone wrong** and it's letting you know by stopping function execution on the current stack, killing the process (in Node), and notifying you in the console with a stack trace.

#### Don't ignore caught errors

**Doing nothing with a caught error doesn't give you the ability to ever fix or react to said error**. Logging the error to the console (console.log) isn't much better as often times it can get lost in a sea of things printed to the console. If you wrap any bit of code in a try/catch it means you think an error may occur there and therefore you should have a plan, or create a code path, for when it occurs.

*Bad:*
```
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}
```
*Good:*

```
try {
  functionThatMightThrow();
} catch (error) {
  // One option (more noisy than console.log):
  console.error(error);
  // Another option:
  notifyUserOfError(error);
  // Another option:
  reportErrorToService(error);
  // OR do all three!
}
```

#### Don't ignore rejected promises

For the same reason you shouldn't ignore caught errors from try/catch.

*Bad:*
```
getdata()
  .then(data => {
    functionThatMightThrow(data);
  })
  .catch(error => {
    console.log(error);
  });
```

*Good:*

```
getdata()
  .then(data => {
    functionThatMightThrow(data);
  })
  .catch(error => {
    // One option (more noisy than console.log):
    console.error(error);
    // Another option:
    notifyUserOfError(error);
    // Another option:
    reportErrorToService(error);
    // OR do all three!
  });
```