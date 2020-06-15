---
layout: post
title:  What is Unit Testing and TDD?
date:   2020-01-28T19:17:01.851Z
permalink: /js-unit-testing-whatis-tdd/
icon: https://codersnack.com/assets/images/js-unit-testing-icon.png
categories: [snackpost]
---

### - References -

- [Medium - What Every Unit Test needs](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d)

**A unit test runs some code over a segment of your program checking the input and output**. These tests allow developers to check individual areas of a program **to see where (and why) errors occur**.

This comes with an inherent understanding of what you’re trying to test for and how the code should function.

>Every developer knows we should write unit tests in order to prevent defects from being deployed to production.

#### Why Bother with Test Discipline?
**Your tests are your first and best line of defense against software defects**. Your tests are more important than linting & static analysis (which can only find a subclass of errors, not problems with your actual program logic). Tests are as important as the implementation itself (all that matters is that the code meets the requirement — how it’s implemented doesn’t matter at all unless it’s implemented poorly).

Unit tests combine many **features** that make them your secret weapon to application success:

- **Design aid**: Writing tests first gives you a clearer perspective on the ideal API design.
- **Feature documentation (for developers)**: Test descriptions enshrine in code every implemented feature requirement.
- **Test your developer understanding**: Does the developer understand the problem enough to articulate in code all critical component requirements?
- **Quality Assurance**: Manual QA is error prone. In my experience, it’s impossible for a developer to remember all features that need testing after making a change to refactor, add new features, or remove features.
- **Continuous Delivery Aid**: Automated QA affords the opportunity to automatically prevent broken builds from being deployed to production.

Unit tests don’t need to be twisted or manipulated to serve all of those broad-ranging goals. Rather, it is in the essential nature of a unit test to satisfy all of those needs. These benefits are all side-effects of a well-written test suite with good coverage.

#### The Science of TDD
**Test-driven development (TDD) is a software development process** that relies on the repetition of a very short development cycle: 
- requirements are turned into very specific test cases, 
- then the code is improved so that the tests pass

>This is opposed to software development that allows code to be added that is not proven to meet requirements.

The evidence says:
- **TDD can reduce bug density**.
- **TDD can encourage more modular designs** (enhancing software agility/team velocity).
- **TDD can reduce code complexity**.

Says science: *There is significant empirical evidence that TDD works*.

#### Write Tests First
Studies from Microsoft Research, IBM, and Springer tested the efficacy of test-first vs test-after methodologies and consistently found that a test-first process produces better results than adding tests later. It is resoundingly clear: Before you implement, write the test.
>Before you implement,write the test.

#### How unit tests are used
- **Design aid**: written during design phase, prior to implementation.
- **Feature documentation & test of developer understanding**: The test should provide a clear description of the feature being tested.
- **QA/Continuous Delivery**: The tests should halt the delivery pipeline on failure and produce a good bug report when they fail.
