# Mini Project 2 — Workflow Tracker SPA

# Workflow Tracker

A browser-based workflow task tracker built with HTML, CSS, and vanilla JavaScript.

This project is Mini Project 2 of my Full Stack Development with AI learning program. It uses fictional compliance and operations workflow data to demonstrate JavaScript fundamentals, reusable utility functions, array methods, DOM rendering, and basic debugging.

## Current Project Status

Week 4 JavaScript fundamentals checkpoint completed.

The current version can:

* Store fictional workflow tasks as JavaScript objects
* Render task cards dynamically in the browser
* Display task status and risk badges
* Sort tasks by due date
* Identify overdue tasks
* Format owner names and due dates
* Count tasks by status
* Display dashboard summary cards
* Filter task data using reusable utility functions

Interactive task creation, editing, filtering controls, and local storage will be added during later weeks.

## Technologies Used

* HTML5
* CSS3
* JavaScript
* JavaScript modules
* Browser DOM APIs
* Git and GitHub

## Project Structure

```text
mini-project-2/
├── index.html
├── styles.css
├── workflow-utils.js
├── app.js
└── README.md
```

## How the Application Works

The application follows this data flow:

```text
Task data
   ↓
JavaScript utility functions
   ↓
HTML template strings
   ↓
DOM update
   ↓
Rendered workflow task cards
```

The fictional task records are stored as an array of objects inside `app.js`.

Each task contains:

* ID
* Workflow name
* Task title
* Description
* Owner
* Status
* Due date
* Risk level

The application uses utility functions from `workflow-utils.js` to process the task data before displaying it.

## JavaScript Concepts Practiced

### Variables

I used `const` for values that should not be reassigned.

```javascript
const tasks = [];
```

I would use `let` when a variable needs to be reassigned later.

### Arrays and Objects

The task list is an array, while each individual task is represented by an object.

```javascript
const tasks = [
  {
    id: 1,
    title: "Review vendor security questionnaire",
    status: "in-progress",
    riskLevel: "high",
  },
];
```

### Functions

Functions are used to separate reusable logic into smaller pieces.

Examples include:

* Formatting dates
* Formatting owner names
* Checking overdue tasks
* Filtering by status
* Filtering by risk
* Counting tasks
* Sorting tasks by due date

### Array Methods

The project practices several important array methods:

* `map` transforms task objects into HTML strings
* `filter` creates a new array containing matching tasks
* `find` returns the first matching task
* `reduce` calculates task counts
* `sort` orders tasks by due date

### DOM Manipulation

JavaScript selects elements from the page using `document.querySelector()`.

```javascript
const taskListElement = document.querySelector("#task-list");
```

It then updates the page by assigning generated HTML to `innerHTML`.

```javascript
taskListElement.innerHTML = taskCards;
```

### JavaScript Modules

Reusable functions are exported from `workflow-utils.js`.

```javascript
export function formatDate(dateString) {
  // Formatting logic
}
```

They are imported into `app.js`.

```javascript
import { formatDate } from "./workflow-utils.js";
```

This keeps the project organized and avoids placing all application logic in one file.

## Utility Functions

The project currently includes utility functions for:

1. Formatting owner names
2. Formatting dates
3. Getting readable status labels
4. Getting readable risk labels
5. Checking whether a task is overdue
6. Calculating the number of days until a due date
7. Filtering tasks by status
8. Filtering tasks by risk level
9. Finding a task by ID
10. Sorting tasks by due date
11. Counting tasks by status
12. Getting high-risk tasks
13. Getting tasks by owner

## Checkpoint Answers

### What is the difference between an array and an object?

An array stores an ordered collection of values. An object stores related information using named properties. In this project, the task list is an array, and every task inside the array is an object.

### What does `return` do inside a function?

`return` sends a result back to the code that called the function. It also stops the function at that point.

### What is the difference between `=` and `===`?

`=` assigns a value. `===` compares two values and checks that both the value and data type match.

### When would I use `map` instead of `forEach`?

I would use `map` when I need to transform every array item and create a new array. I would use `forEach` when I only need to perform an action for each item and do not need a new array.

### What does `filter` return?

`filter` returns a new array containing only the items that pass its condition. It does not modify the original array.

### What is the DOM?

The DOM, or Document Object Model, is the browser's JavaScript-accessible representation of an HTML page. JavaScript can use it to find, update, add, or remove page elements.

### Why are `export` and `import` being used?

They allow code to be separated into different files. Reusable utility functions are exported from `workflow-utils.js` and imported into `app.js`.

### Why does `sortTasksByDueDate` use `[...tasks]`?

The spread syntax creates a copy of the task array before calling `sort()`. This prevents the original array from being modified accidentally.

## How to Run the Project

Because the project uses JavaScript modules, it should be opened through a local development server.

### Using VS Code Live Server

1. Open the `mini-project-2` folder in VS Code.
2. Open `index.html`.
3. Right-click inside the file.
4. Select **Open with Live Server**.

Opening the HTML file directly may cause JavaScript module import errors in some browsers.

## Debugging Process

When the application does not work, I check:

1. The first red error in the browser Console
2. The filename and line number shown by the error
3. Whether imported function names match exported function names
4. Whether file imports include `./`
5. Whether object properties are spelled correctly
6. Whether brackets, parentheses, and commas match
7. Whether the HTML element IDs match the JavaScript selectors
8. Whether all files were saved before refreshing the browser

## Fictional Data Notice

This project uses fictional sample data only.

It does not contain real company policies, customer data, security reports, employee records, contracts, audit evidence, credentials, or confidential business information.

## What I Learned

Through this checkpoint, I learned how to:

* Represent application data using arrays and objects
* Write reusable JavaScript functions
* Use `return` to produce function results
* Use `map`, `filter`, `find`, `reduce`, and `sort`
* Avoid mutating an original array before sorting
* Split JavaScript across files using modules
* Select and update HTML elements through the DOM
* Render data-driven user interface components
* Read browser Console errors while debugging

## Planned Improvements

The next versions of the Workflow Tracker will add:

* Task creation form
* Status editing
* Workflow filters
* Risk filters
* Search
* Local storage persistence
* Form validation
* React components
* TypeScript data models
* Deployment to Vercel

## Course Context

This project is part of a 20-week Full Stack Development with AI learning program focused on practical projects, GitHub portfolio development, deployment, databases, APIs, authentication, and AI integration.
