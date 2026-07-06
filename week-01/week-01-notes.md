# Week 1 Notes — Developer Setup, Git, GitHub, and Command Line

## What I learned

This week I learned how to:

* Navigate folders using the terminal
* Create project folders and files
* Configure Git
* Initialize a Git repository
* Stage changes
* Commit changes
* Push code to GitHub
* Write a basic README
* Use `.gitignore`

## Important commands

```bash
pwd
ls
cd folder-name
cd ..
mkdir folder-name
git status
git init
git add .
git commit -m "message"
git branch -M main
git remote -v
git push -u origin main
```

## Git vs GitHub

Git is the tool that tracks file history on my computer.

GitHub is the online platform where I publish and share my Git repositories.

## Notes to remember

* Commit small changes often.
* Read terminal errors carefully.
* Do not commit secrets.
* Do not commit `node_modules`.
* A good README explains what the project is and why it exists.

## Checkpoint Answers

1. What is the difference between Git and GitHub?

Answer: Git is the tool installed on my computer that tracks changes in my files and keeps a history of my work. Github is the online platform where I can upload, store, share, and showcase my Git repositories.

2. What does `.gitignore` do?

Answer: it teslls Git which files or folders it should not track. This is useful for avoiding unnecessary or sensitive files like node_modules, .env, logs and build outputs.

3. What is the difference between `git add`, `git commit`, and `git push`?

Answer: git add stages files and prepares them for a commit. git commit saves a snapshot of the staged changes in my local Git history. git push uploads my local commits to Github.

4. What does `git status` show?

Answer: git status shows the current state of my repository. It tells me which files are untracked, modified, staged, committed, or if my working tree is clean.

5. What makes a good commit message?

Answer: A good comit message is short, clear, and explains what changed. It should help someone understand the purpose of the commit, such as docs: add week 1 notes or fix: correct README typo.

6. Why should we not commit `.env` files?

Answer: .env files often contain private information like API keys, passwords, tokens, and database URLs. Committing them to Github can expose secrets and create security risks.

7. Why is a README important for a portfolio project?

Answer: A README explains what the project is, why it exists, what tools were used, how to run it, and what I learned. For a portfolio project, it helps other people quickly understand my work.

8. What is the purpose of the `main` branch?

Answer: the main branch is the primary branch of the project. It usually contains the stable version of the code and represents the main history of the repository.
