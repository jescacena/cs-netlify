---
layout: post
title:  Git rebase Tutorial
date:   2022-04-21T14:36:08.671Z
permalink: /git-rebase-tutorial/
icon: https://codersnack.com/assets/images/git-icon.png
categories: [snackpost]
---

> Information drawn from 
- [Linuxhint - Git rebase tutorial](https://linuxhint.com/git-rebase-tutorial/)


####  Git Rebase: Definitions

According to the git documentation,**the rebase command will reapply commits on top of another base tip**. This definition might be a little daunting. It’s easier to explain rebase as a procedure that **adds the changes of the current branch to the tail of another branch**. Let’s walk through an example to get a better idea of what happens.


#### Git Rebasing Example

In this example, we will first create a test case with ‘master’ and ‘feature’ branch. Then we will do a standard merge. Next, we will recreate the test case and perform rebase and merge.

####  1. Creating Master and Feature Branches
Here is the scenario we will create:
```
A — B — C (master)
     \
      E — F (feature)
```

In the above example, we are taking the following path:
- Commit A: we add a.txt file in the ‘master’ branch
- Commit B: we add b.txt file in the ‘master’ branch
- At this stage, we create the branch ‘feature’ which means it will have a.txt and b.txt
- Commit C: we add c.txt file in the ‘master’ branch
- We go to the ‘feature’ branch
- Commit E: we modify a.txt in ‘feature’ branch
- Commit F: we modify b.txt in ‘feature’ branch

You can **create a folder and run the following code inside the folder to create the above situation**:

```
git init
touch a.txt
git add -A
git commit -m "Commit A: added a.txt"
 
touch b.txt
git add -A
git commit -m "Commit B: added b.txt"
git branch feature
 
touch c.txt
git add -A
git commit -m "Commit C: added c.txt"
git status
git checkout feature
 
echo aaa > a.txt
git add -A
git commit -m "Commit E: modified a.txt"
 
echo bbb > b.txt
git add -A
git commit -m "Commit F: modified b.txt"
```

####   1. 2. Simple Merge

Let’s use the log command to check both branches.

```
Results for ‘master’:

$ git checkout master
Switched to branch 'master'
 
$ git log --oneline
2bbde47 Commit C: added c.txt
b430ab5 Commit B: added b.txt
6f30e95 Commit A: added a.txt
 
$ ls
a.txt    b.txt    c.txt
Results for ‘feature’:

$ git checkout feature
Switched to branch 'feature'
 
$ git log --oneline
0286690 Commit F: modified b.txt
7c5c85e Commit E: modified a.txt
b430ab5 Commit B: added b.txt
6f30e95 Commit A: added a.txt
 
$ ls
a.txt    b.txt
```

**Notice how the feature branch does not have Commit C**

Now **let’s run merge ‘feature’ branch with ‘master’ branch**. You will be asked to enter a comment. In the comment, add “Commit G:” at the beginning to make it easier to track.

```
$ git checkout master
Switched to branch 'master'
 
$ git merge feature
Merge made by the 'recursive' strategy.
a.txt | 1 +
b.txt | 1 +
2 files changed, 2 insertions(+)

Results for ‘master’:

$ git checkout master
 Already on 'master'
 
$ git log --oneline
 d086ff9 Commit G: Merge branch 'feature'
 0286690 Commit F: modified b.txt
 7c5c85e Commit E: modified a.txt
 2bbde47 Commit C: added c.txt
 b430ab5 Commit B: added b.txt
 6f30e95 Commit A: added a.txt
 
 $ ls
 a.txt b.txt c.txt
Results for ‘feature’:

$ git checkout feature
Switched to branch 'feature'
 
$ git log --oneline
0286690 Commit F: modified b.txt
7c5c85e Commit E: modified a.txt
b430ab5 Commit B: added b.txt
6f30e95 Commit A: added a.txt
 
$ ls
a.txt    b.txt
```
In the ‘master’ branch, you will notice there is a **new commit G that has merged the changes from ‘feature’ branch**. Basically, the following action has taken place:

```
A — B — C  — G (master)
     \     /
      E — F (feature)
```
**In the Commit G, all the changes from ‘feature’ branch have been brought into the master branch. But the ‘feature’ branch itself has remained untouched due to the merge process**. Notice the hash of each commit. After the merge, E (7c5c85e) and F (0286690) commit has the same hash on the ‘feature’ and ‘master’ branch.


####  3. Merging with Rebasing

Let’s repeat step 1 to create the ‘master’ and ‘feature’ branches again.

```
Results for ‘master’:

$ git checkout master
Switched to branch 'master'
 
$ git log --oneline
7f573d8 Commit C: added c.txt
795da3c Commit B: added b.txt
0f4ed5b Commit A: added a.txt
 
$ ls
a.txt    b.txt    c.txt
Results for ‘feature’:

$ git checkout feature
Switched to branch 'feature'
 
$ git log --oneline
8ed0c4e Commit F: modified b.txt
6e12b57 Commit E: modified a.txt
795da3c Commit B: added b.txt
0f4ed5b Commit A: added a.txt
 
$ ls
a.txt b.txt
Let’s rebase from the ‘feature’ branch.

$ git checkout feature
Switched to branch 'feature'
 
$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: Commit E: modified a.txt
Applying: Commit F: modified b.txt
Then merge ‘feature’ into ‘master’.

$ git checkout master
Switched to branch 'master'
 
$ git merge feature
Updating 7f573d8..9efa1a3
Fast-forward
 a.txt | 1 +
 b.txt | 1 +
 2 files changed, 2 insertions(+)

Results for ‘master’ branch:

$ git checkout master
Already on 'master'
 
$ git log --oneline
9efa1a3 Commit F: modified b.txt
8710174 Commit E: modified a.txt
7f573d8 Commit C: added c.txt
795da3c Commit B: added b.txt
0f4ed5b Commit A: added a.txt
 
$ ls
a.txt    b.txt    c.txt
Results for ‘feature’ branch:

$ git checkout feature
Switched to branch 'feature'
 
$ git log --oneline
9efa1a3 Commit F: modified b.txt
8710174 Commit E: modified a.txt
7f573d8 Commit C: added c.txt
795da3c Commit B: added b.txt
0f4ed5b Commit A: added a.txt
 
$ ls
a.txt    b.txt    c.txt
```

**Notice that after the rebase and merge both branches are the same**. Also, the hashes for E and F have changed in both branches. Basically, in the rebase scenario, this is what happened:

```
A — B — C
         \
          E’ — F’ (feature, master)
```

That’s why there is no new commit. **The E and F commits have been recalculated and latched to the end of the ‘master’ branch.**

**Rebasing is a useful tool when you want to clean up the history of your work**. However, there is a danger which has given birth to the golden rule.


####  Golden Rule of Rebasing
The golden rule of rebasing is :

> **Never rebase a public branch**.

As you can see from the example above, **rebasing recalculates the commits**. When multiple people are branching from a public repository, rebasing can create situations where developers who have created new branches will run into very complicated merge situations. So, it’s a good idea **never to rebase public branches that are shared**.

In Conclusion:
Rebasing is a unique feature of Git. But use it with caution.

More Information:
Here are some links for further study:

- [Git Rebase Documentation](https://git-scm.com/docs/git-rebase)
- [Atlassian Merging vs Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

