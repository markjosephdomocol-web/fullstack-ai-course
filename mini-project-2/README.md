# Mini Project 2 — Workflow Tracker SPA

A browser-based workflow task tracker built with HTML, CSS, and vanilla JavaScript.

This project is Mini Project 2 of my Full Stack Development with AI learning program. It uses fictional compliance and operations workflow data to demonstrate JavaScript fundamentals, DOM events, asynchronous data loading, browser storage, filtering, form handling, and reusable utility functions.

## Current Project Status

Week 5 JavaScript interactivity checkpoint completed.

The current application can:

- Load starter task data from a local JSON file using `fetch`
- Save task data in browser `localStorage`
- Restore saved tasks after a browser refresh
- Create new workflow tasks through a form
- Validate required form fields
- Search tasks by title, description, workflow, or owner
- Filter tasks by workflow and status
- Combine search and filter conditions
- Clear active filters
- Change a task’s status directly from its card
- Delete tasks after confirmation
- Update dashboard summary counts automatically
- Sort tasks by due date
- Identify overdue tasks
- Display loading, empty, and error states
- Escape user-entered text before inserting it into generated HTML

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JavaScript modules
- Browser DOM APIs
- Fetch API
- JSON
- `localStorage`
- VS Code Live Server
- Git and GitHub

## Project Structure

```text
mini-project-2/
├── data/
│   └── tasks.json
├── app.js
├── index.html
├── README.md
├── styles.css
├── week-05-practice.js
└── workflow-utils.js
```

## File Responsibilities

### `index.html`

Contains the semantic page structure, including:

- Header
- Task summary section
- Task creation form
- Search and filter controls
- Task list container

### `styles.css`

Controls the presentation of:

- Page layout
- Summary cards
- Task cards
- Status and risk badges
- Form controls
- Search and filter controls
- Task action buttons
- Responsive layouts
- Empty and error states

### `app.js`

Contains the main application logic, including:

- Application state
- DOM element selection
- Task rendering
- Form submission handling
- Search and filtering
- Status updates
- Task deletion
- JSON loading
- `localStorage` persistence
- Loading and error handling

### `workflow-utils.js`

Contains reusable utility functions for:

- Formatting dates
- Formatting owner names
- Creating readable status labels
- Creating readable risk labels
- Checking whether a task is overdue
- Calculating days until a due date
- Filtering tasks by status
- Filtering tasks by risk
- Finding tasks by ID
- Sorting tasks by due date
- Counting tasks by status
- Finding high-risk tasks
- Finding tasks by owner

### `data/tasks.json`

Contains the fictional starter task records loaded when the application has no existing saved data.

### `week-05-practice.js`

Contains the Week 5 practice exercise for testing:

- `fetch`
- `async` and `await`
- JSON parsing
- `localStorage`

It is kept as a learning reference and is not required by the main application.

## How the Application Works

The application uses the `tasks` array in `app.js` as its main application state.

```javascript
let tasks = [];
```

The main data flow is:

```text
Application starts
      ↓
Check localStorage
      ↓
Saved tasks exist?
   ┌───────┴────────┐
   │                │
  Yes               No
   │                │
Load saved       Fetch tasks.json
tasks               │
   │             Save initial tasks
   └───────┬────────┘
           ↓
     Update tasks array
           ↓
     Render summary
           ↓
     Apply active filters
           ↓
     Render task cards
```

When the user creates, edits, or deletes a task, the flow is:

```text
User action
    ↓
Event handler runs
    ↓
Update the tasks array
    ↓
Save tasks to localStorage
    ↓
Re-render the interface
```

## Task Data Model

Each task is represented by a JavaScript object:

```javascript
{
  id: 1,
  workflow: "Vendor Due Diligence",
  title: "Review vendor security questionnaire",
  description: "Review the fictional questionnaire.",
  owner: "alex reviewer",
  status: "in-progress",
  dueDate: "2026-07-13",
  riskLevel: "high"
}
```

Each task contains:

- Unique ID
- Workflow name
- Task title
- Description
- Owner
- Status
- Due date
- Risk level

## JavaScript Concepts Practiced

### Variables and Application State

The application uses `let` for task state because the array reference is reassigned after task updates:

```javascript
let tasks = [];
```

The array may be replaced when a task is added, updated, or deleted.

```javascript
tasks = [...tasks, newTask];
```

### Arrays and Objects

The full task list is an array, while each individual task is an object.

```javascript
const tasks = [
  {
    id: 1,
    title: "Review vendor security questionnaire",
    status: "in-progress",
  },
];
```

### Functions

Functions divide the application into smaller responsibilities.

Examples include:

- Loading tasks
- Saving tasks
- Rendering task cards
- Creating summary statistics
- Processing form submissions
- Applying search and filters
- Updating task statuses
- Deleting tasks

### Array Methods

The project uses several important array methods:

- `map` transforms tasks into new task objects or HTML strings
- `filter` creates a new array containing matching tasks
- `find` returns the first task matching an ID
- `reduce` calculates status totals
- `sort` orders tasks by due date
- `some` checks whether any required form value is missing

### DOM Manipulation

JavaScript selects page elements using `document.querySelector()`:

```javascript
const taskListElement =
  document.querySelector("#task-list");
```

The application updates the page using properties such as:

```javascript
taskListElement.innerHTML = taskCards;
taskCountElement.textContent = "7 tasks";
```

### DOM Events

The application reacts to browser events using `addEventListener()`.

Examples include:

```javascript
taskFormElement.addEventListener(
  "submit",
  handleTaskSubmit,
);
```

```javascript
taskSearchElement.addEventListener(
  "input",
  renderFilteredTasks,
);
```

```javascript
statusFilterElement.addEventListener(
  "change",
  renderFilteredTasks,
);
```

### Form Handling

The application stops the browser’s normal form submission behavior:

```javascript
event.preventDefault();
```

It then reads the form values with `FormData`:

```javascript
const formData = new FormData(taskFormElement);
```

The form data is converted into a new task object, added to the task state, saved, and rendered.

### JSON

JSON is a text format used to store and transfer structured data.

The starter task records are stored in:

```text
data/tasks.json
```

The browser converts the JSON response into JavaScript values using:

```javascript
const fetchedTasks = await response.json();
```

### Fetch API

The application loads starter tasks using `fetch`:

```javascript
const response =
  await fetch("./data/tasks.json");
```

It checks the response before using the data:

```javascript
if (!response.ok) {
  throw new Error(
    `Unable to load tasks. HTTP status: ${response.status}`,
  );
}
```

### Promises and Async/Await

`fetch()` returns a promise because the request may take time to complete.

The application uses `async` and `await` to handle this asynchronous operation:

```javascript
async function fetchInitialTasks() {
  const response =
    await fetch("./data/tasks.json");

  return response.json();
}
```

### Local Storage

`localStorage` allows the application to save data in the user’s browser.

Because `localStorage` only stores strings, the task array is converted into JSON:

```javascript
localStorage.setItem(
  "workflowTrackerTasks",
  JSON.stringify(tasks),
);
```

The saved JSON is converted back into an array when the page opens:

```javascript
const parsedTasks =
  JSON.parse(savedTasks);
```

`localStorage` is useful for this prototype, but it is not a replacement for a real backend database.

### Search and Filtering

The application builds searchable text from several task properties:

```javascript
const searchableText = [
  task.title,
  task.description,
  task.workflow,
  task.owner,
]
  .join(" ")
  .toLowerCase();
```

It then checks whether each task matches the current search, workflow, and status selections.

The original `tasks` array is not modified. A temporary filtered array is created for display.

### Immutable Updates

Task updates create new arrays and objects instead of changing the existing values directly.

Example status update:

```javascript
tasks = tasks.map((task) => {
  if (String(task.id) !== String(taskId)) {
    return task;
  }

  return {
    ...task,
    status: newStatus,
  };
});
```

Example deletion:

```javascript
tasks = tasks.filter((task) => {
  return String(task.id) !== String(taskId);
});
```

### Event Delegation

The task cards are generated dynamically, so the application places event listeners on the parent task-list container.

```javascript
taskListElement.addEventListener(
  "change",
  handleTaskListChange,
);
```

The handler identifies the control that triggered the event:

```javascript
const statusSelect =
  event.target.closest(".task-status-select");
```

This is called event delegation. It allows one parent listener to handle events from every task card, including cards created after the page initially loads.

### Escaping User Input

The application escapes user-entered values before adding them to generated HTML:

```javascript
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
```

This prevents entered HTML from being interpreted as real page elements.

## Application States

The app handles several interface states.

### Loading State

Displayed while the starter JSON data is being requested:

```text
Loading tasks...
Please wait while the workflow data is loaded.
```

### Success State

Displays the task summary and task cards after data has loaded successfully.

### Empty State

Displayed when there are no saved tasks:

```text
No matching tasks
```

### No Search Results State

Displayed when tasks exist but none match the current search and filters:

```text
No matching tasks
Try changing your search or filter selections.
```

### Error State

Displayed if the starter JSON file cannot be loaded:

```text
Something went wrong
The workflow tasks could not be loaded.
```

## Features

### Create Tasks

Users can enter:

- Task title
- Workflow
- Description
- Owner
- Due date
- Status
- Risk level

After submission:

1. The default page refresh is prevented.
2. Form values are collected.
3. A new task ID is generated.
4. A new task object is created.
5. The task is added to application state.
6. Tasks are saved to `localStorage`.
7. The summary and task cards are re-rendered.
8. The form is cleared.

### Search Tasks

Users can search across:

- Task titles
- Descriptions
- Workflow names
- Owner names

The results update immediately through the `input` event.

### Filter Tasks

Users can filter by:

- Workflow
- Status

Search and filters can be used at the same time.

### Update Task Status

Each task card contains a status dropdown.

Changing the dropdown:

1. Finds the task by ID.
2. Creates an updated task object.
3. Replaces the task array.
4. Saves the updated data.
5. Re-renders the dashboard.

### Delete Tasks

Each task card contains a delete button.

The user must confirm the action before the task is removed.

### Persistent Data

Created, edited, and deleted task data remains after refreshing the browser because it is stored in `localStorage`.

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

## How to Run the Project

Because the project uses JavaScript modules and `fetch`, it must be opened through a local development server.

### Using VS Code Live Server

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Open `mini-project-2/index.html`.
4. Right-click inside `index.html`.
5. Select **Open with Live Server**.

The application will usually open at an address similar to:

```text
http://127.0.0.1:5500/mini-project-2/index.html
```

Do not open `index.html` directly using a `file:///` address because JavaScript modules and `fetch` may be blocked by the browser.

This version does not use npm or Vite, so it does not require:

```bash
npm run dev
```

## Testing Checklist

### Task Loading

- Starter tasks load from `tasks.json`
- Saved tasks load from `localStorage`
- Refreshing preserves the current task state

### Task Creation

- Required fields are validated
- A new task is displayed immediately
- Summary counts update
- The form clears after submission
- The new task remains after refresh

### Search and Filters

- Search matches titles
- Search matches descriptions
- Search matches workflow names
- Search matches owners
- Workflow filters work
- Status filters work
- Search and filters work together
- Clear filters restores the full list
- Empty search results display a helpful message

### Status Updates

- Status badges update immediately
- Summary counts update
- Changes remain after refresh
- Tasks disappear when they no longer match an active status filter

### Task Deletion

- A confirmation dialog appears
- Cancel keeps the task
- Confirm removes the task
- Summary counts update
- Deleted tasks remain deleted after refresh

### Application States

- Loading state appears during a delayed request
- Empty state appears for an empty saved array
- Error state appears when `tasks.json` is unavailable
- The application recovers after the JSON file is restored

## Debugging Process

When the application does not work, I check:

1. The first red error in the browser console
2. The filename and line number in the error
3. Whether all files were saved
4. Whether Live Server is running
5. Whether the JSON path is correct
6. Whether the JSON syntax is valid
7. Whether imported names match exported names
8. Whether file imports include `./`
9. Whether HTML IDs match JavaScript selectors
10. Whether task property names are spelled consistently
11. Whether status values use the expected format
12. Whether localStorage contains old or invalid data
13. Whether quotation marks are included around storage keys

To reset the application to the starter task data, run:

```javascript
localStorage.removeItem("workflowTrackerTasks");
location.reload();
```

## Week 4 Checkpoint Answers

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

The DOM, or Document Object Model, is the browser’s JavaScript-accessible representation of an HTML page. JavaScript can use it to find, update, add, or remove page elements.

### Why are `export` and `import` being used?

They allow code to be separated into different files. Reusable utility functions are exported from `workflow-utils.js` and imported into `app.js`.

### Why does `sortTasksByDueDate` use `[...tasks]`?

The spread syntax creates a copy of the task array before calling `sort()`. This prevents the original array from being modified accidentally.

## Week 5 Checkpoint Answers

### What is a promise?

A promise represents the future result of an asynchronous operation. It may eventually succeed with a value or fail with an error. In this project, `fetch()` returns a promise.

### Why do we need loading and error states?

Loading and error states explain what is happening while data is being requested or when a request fails. Without them, the page could appear blank or broken.

### What is JSON?

JSON is a text format used to store and transfer structured data. The project’s starter tasks are stored in a JSON file and converted into JavaScript objects when loaded.

### What is the difference between application state and the DOM?

Application state is the data used by the app, such as the `tasks` array. The DOM is the browser’s representation of the visible HTML page. The application updates its state first and then renders that state into the DOM.

### What does `event.preventDefault()` do?

It prevents the browser from performing the event’s normal default action. In the task form, it stops the browser from refreshing the page after submission.

### What is `localStorage`?

`localStorage` is browser storage that saves string values for a specific website. This project uses it to preserve task data after the page is refreshed.

### Why do we use `JSON.stringify()` and `JSON.parse()`?

`localStorage` only stores strings. `JSON.stringify()` converts the task array into a string, while `JSON.parse()` converts the stored string back into a JavaScript array.

### What is event delegation?

Event delegation means placing an event listener on a parent element and using it to handle events triggered by its child elements. This project uses event delegation for dynamically rendered task status controls and delete buttons.

### Why should filters not modify the original task array?

Filters should only control which tasks are displayed. Keeping the original task array unchanged prevents hidden tasks from being accidentally deleted or lost.

### Why is `try...catch` useful?

`try...catch` allows the application to handle errors safely. This project uses it when reading saved JSON and when initializing asynchronous task data.

## What I Learned

Through Weeks 4 and 5, I learned how to:

- Represent application data using arrays and objects
- Write reusable JavaScript functions
- Use `return` to produce function results
- Use `map`, `filter`, `find`, `reduce`, `sort`, and `some`
- Avoid accidental array mutation
- Split JavaScript into modules
- Select and update DOM elements
- Render data-driven interface components
- Handle form submissions
- Prevent default browser behavior
- Work with DOM events
- Use event delegation
- Read JSON data using `fetch`
- Use promises and `async`/`await`
- Catch asynchronous errors
- Save and restore data using `localStorage`
- Apply search and filter conditions
- Update task state immutably
- Handle loading, empty, and error states
- Escape user-entered text
- Debug browser errors using DevTools

## Known Limitations

- Data is stored only in the current browser
- Data does not synchronize across devices
- Clearing browser storage removes saved tasks
- There is no backend API or database yet
- There is no user authentication
- Existing task details cannot be fully edited yet
- Workflows are limited to predefined form options
- Automated tests have not yet been added
- The app has not yet been converted to React or TypeScript

## Planned Improvements

The next versions of the Workflow Tracker will add:

- React components
- React state management
- Controlled React forms
- Reusable hooks
- TypeScript task models
- Typed component props
- Improved form validation
- Workflow detail views
- Analytics summaries
- Deployment to Vercel
- Automated tests in later course phases

## Fictional Data Notice

This project uses fictional sample data only.

It does not contain real company policies, customer data, security reports, employee records, contracts, audit evidence, credentials, or confidential business information.

## Course Context

This project is part of a 20-week Full Stack Development with AI learning program focused on practical projects, GitHub portfolio development, frontend development, backend APIs, databases, authentication, deployment, testing, and AI integration.