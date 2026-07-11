import {
  countTasksByStatus,
  formatDate,
  formatOwnerName,
  getHighRiskTasks,
  getRiskLabel,
  getStatusLabel,
  isOverdue,
  sortTasksByDueDate,
} from "./workflow-utils.js";

const STORAGE_KEY = "workflowTrackerTasks";

let tasks = [];

const taskListElement =
  document.querySelector("#task-list");

const taskCountElement =
  document.querySelector("#task-count");

const taskSummaryElement =
  document.querySelector("#task-summary");

const taskFormElement =
  document.querySelector("#task-form");

const formStatusElement =
  document.querySelector("#form-status");

const taskTitleElement =
  document.querySelector("#task-title");

const taskSearchElement =
  document.querySelector("#task-search");

const workflowFilterElement =
  document.querySelector("#workflow-filter");

const statusFilterElement =
  document.querySelector("#status-filter");

const clearFiltersButton =
  document.querySelector("#clear-filters");

/**
 * Escape text before inserting it into HTML.
 */
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Load tasks saved in localStorage.
 *
 * null means no saved task data exists yet.
 */
function loadTasksFromStorage() {
  const savedTasks =
    localStorage.getItem(STORAGE_KEY);

  if (savedTasks === null) {
    return null;
  }

  try {
    const parsedTasks = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks)) {
      throw new Error(
        "Saved task data is not an array.",
      );
    }

    return parsedTasks;
  } catch (error) {
    console.error(
      "Unable to read saved tasks:",
      error,
    );

    localStorage.removeItem(STORAGE_KEY);

    return null;
  }
}

/**
 * Save tasks in localStorage.
 */
function saveTasksToStorage(tasksToSave) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasksToSave),
  );
}

/**
 * Fetch starter task data.
 */
async function fetchInitialTasks() {
  const response =
    await fetch("./data/tasks.json");

  if (!response.ok) {
    throw new Error(
      `Unable to load tasks. HTTP status: ${response.status}`,
    );
  }

  const fetchedTasks = await response.json();

  if (!Array.isArray(fetchedTasks)) {
    throw new Error(
      "The fetched task data is not an array.",
    );
  }

  return fetchedTasks;
}

/**
 * Generate the next numeric task ID.
 */
function getNextTaskId() {
  const numericIds = tasks.map((task) => {
    const convertedId = Number(task.id);

    return Number.isFinite(convertedId)
      ? convertedId
      : 0;
  });

  return Math.max(0, ...numericIds) + 1;
}

/**
 * Find a task using its ID.
 *
 * String conversion allows numeric and string IDs.
 */
function getTaskById(taskId) {
  return tasks.find((task) => {
    return String(task.id) === String(taskId);
  });
}

/**
 * Return unique workflow names.
 */
function getWorkflowNames() {
  return [
    ...new Set(
      tasks.map((task) => task.workflow),
    ),
  ].sort((workflowA, workflowB) => {
    return workflowA.localeCompare(workflowB);
  });
}

/**
 * Populate the workflow filter.
 */
function populateWorkflowFilter() {
  const selectedWorkflow =
    workflowFilterElement.value || "all";

  const workflowNames =
    getWorkflowNames();

  workflowFilterElement.innerHTML = `
    <option value="all">
      All workflows
    </option>
  `;

  workflowNames.forEach((workflowName) => {
    const option =
      document.createElement("option");

    option.value = workflowName;
    option.textContent = workflowName;

    workflowFilterElement.append(option);
  });

  if (
    selectedWorkflow === "all" ||
    workflowNames.includes(selectedWorkflow)
  ) {
    workflowFilterElement.value =
      selectedWorkflow;
  } else {
    workflowFilterElement.value = "all";
  }
}

/**
 * Return tasks matching current search and filters.
 */
function getVisibleTasks() {
  const searchQuery =
    taskSearchElement.value
      .trim()
      .toLowerCase();

  const selectedWorkflow =
    workflowFilterElement.value;

  const selectedStatus =
    statusFilterElement.value;

  return tasks.filter((task) => {
    const searchableText = [
      task.title,
      task.description,
      task.workflow,
      task.owner,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      searchableText.includes(searchQuery);

    const matchesWorkflow =
      selectedWorkflow === "all" ||
      task.workflow === selectedWorkflow;

    const matchesStatus =
      selectedStatus === "all" ||
      task.status === selectedStatus;

    return (
      matchesSearch &&
      matchesWorkflow &&
      matchesStatus
    );
  });
}

/**
 * Build the status badge HTML.
 */
function createStatusBadge(status) {
  return `
    <span class="badge badge-${escapeHtml(status)}">
      ${escapeHtml(getStatusLabel(status))}
    </span>
  `;
}

/**
 * Build the due-date display.
 */
function createDueDateDisplay(task) {
  const overdue = isOverdue(task);

  const overdueClass =
    overdue ? "overdue" : "";

  const overdueText =
    overdue ? " — Overdue" : "";

  return `
    <span class="${overdueClass}">
      ${escapeHtml(formatDate(task.dueDate))}
      ${overdueText}
    </span>
  `;
}

/**
 * Build one task card.
 */
function createTaskCard(task) {
  const taskId = escapeHtml(task.id);

  return `
    <article
      class="task-card"
      data-task-id="${taskId}"
    >
      <div class="task-card-header">
        <div>
          <p class="eyebrow">
            ${escapeHtml(task.workflow)}
          </p>

          <h3>
            ${escapeHtml(task.title)}
          </h3>
        </div>

        ${createStatusBadge(task.status)}
      </div>

      <p class="task-card-description">
        ${escapeHtml(task.description)}
      </p>

      <dl class="task-meta">
        <div>
          <dt>Owner</dt>

          <dd>
            ${escapeHtml(
              formatOwnerName(task.owner),
            )}
          </dd>
        </div>

        <div>
          <dt>Due date</dt>

          <dd>
            ${createDueDateDisplay(task)}
          </dd>
        </div>

        <div>
          <dt>Risk</dt>

          <dd class="risk-${escapeHtml(
            task.riskLevel,
          )}">
            ${escapeHtml(
              getRiskLabel(task.riskLevel),
            )}
          </dd>
        </div>
      </dl>

      <div class="task-card-actions">
        <div class="task-status-control">
          <label for="status-${taskId}">
            Update status
          </label>

          <select
            id="status-${taskId}"
            class="task-status-select"
            data-task-id="${taskId}"
          >
            <option
              value="not-started"
              ${
                task.status === "not-started"
                  ? "selected"
                  : ""
              }
            >
              Not started
            </option>

            <option
              value="in-progress"
              ${
                task.status === "in-progress"
                  ? "selected"
                  : ""
              }
            >
              In progress
            </option>

            <option
              value="blocked"
              ${
                task.status === "blocked"
                  ? "selected"
                  : ""
              }
            >
              Blocked
            </option>

            <option
              value="completed"
              ${
                task.status === "completed"
                  ? "selected"
                  : ""
              }
            >
              Completed
            </option>
          </select>
        </div>

        <button
          type="button"
          class="delete-task-button"
          data-task-id="${taskId}"
          aria-label="Delete ${escapeHtml(task.title)}"
        >
          Delete task
        </button>
      </div>
    </article>
  `;
}

/**
 * Show the loading state.
 */
function renderLoadingState() {
  taskCountElement.textContent =
    "Loading...";

  taskSummaryElement.innerHTML = "";

  taskListElement.setAttribute(
    "aria-busy",
    "true",
  );

  taskListElement.innerHTML = `
    <div class="empty-state">
      <h3>Loading tasks...</h3>

      <p>
        Please wait while the workflow data is loaded.
      </p>
    </div>
  `;
}

/**
 * Show an error state.
 */
function renderErrorState(error) {
  taskCountElement.textContent =
    "Unable to load tasks";

  taskSummaryElement.innerHTML = "";

  taskListElement.setAttribute(
    "aria-busy",
    "false",
  );

  taskListElement.innerHTML = `
    <div class="empty-state">
      <h3>Something went wrong</h3>

      <p>
        The workflow tasks could not be loaded.
        Check the browser console for more information.
      </p>
    </div>
  `;

  console.error(
    "Application initialization failed:",
    error,
  );
}

/**
 * Display task cards.
 */
function renderTasks(tasksToRender) {
  const sortedTasks =
    sortTasksByDueDate(tasksToRender);

  taskListElement.setAttribute(
    "aria-busy",
    "false",
  );

  if (sortedTasks.length === tasks.length) {
    taskCountElement.textContent =
      `${sortedTasks.length} tasks`;
  } else {
    taskCountElement.textContent =
      `${sortedTasks.length} of ${tasks.length} tasks`;
  }

  if (sortedTasks.length === 0) {
    taskListElement.innerHTML = `
      <div class="empty-state">
        <h3>No matching tasks</h3>

        <p>
          Try changing your search or filter selections.
        </p>
      </div>
    `;

    return;
  }

  taskListElement.innerHTML =
    sortedTasks
      .map((task) => {
        return createTaskCard(task);
      })
      .join("");
}

/**
 * Display summary statistics.
 */
function renderTaskSummary(allTasks) {
  const statusCounts =
    countTasksByStatus(allTasks);

  const highRiskCount =
    getHighRiskTasks(allTasks).length;

  const summaryItems = [
    {
      label: "Total tasks",
      value: allTasks.length,
    },
    {
      label: "In progress",
      value: statusCounts["in-progress"],
    },
    {
      label: "Blocked",
      value: statusCounts.blocked,
    },
    {
      label: "High risk",
      value: highRiskCount,
    },
  ];

  taskSummaryElement.innerHTML =
    summaryItems
      .map((item) => {
        return `
          <article class="summary-card">
            <p>
              ${escapeHtml(item.label)}
            </p>

            <strong>
              ${escapeHtml(item.value)}
            </strong>
          </article>
        `;
      })
      .join("");
}

/**
 * Render cards using current search and filters.
 */
function renderFilteredTasks() {
  const visibleTasks =
    getVisibleTasks();

  renderTasks(visibleTasks);
}

/**
 * Render the entire application.
 */
function renderApp() {
  populateWorkflowFilter();
  renderTaskSummary(tasks);
  renderFilteredTasks();
}

/**
 * Show Create Task form feedback.
 */
function showFormStatus(message, type) {
  formStatusElement.textContent = message;

  formStatusElement.className =
    `form-status form-status-${type}`;
}

/**
 * Handle Create Task form submission.
 */
function handleTaskSubmit(event) {
  event.preventDefault();

  const formData =
    new FormData(taskFormElement);

  const newTask = {
    id: getNextTaskId(),

    title: String(
      formData.get("title"),
    ).trim(),

    workflow: String(
      formData.get("workflow"),
    ).trim(),

    description: String(
      formData.get("description"),
    ).trim(),

    owner: String(
      formData.get("owner"),
    ).trim(),

    dueDate: String(
      formData.get("dueDate"),
    ),

    status: String(
      formData.get("status"),
    ),

    riskLevel: String(
      formData.get("riskLevel"),
    ),
  };

  const requiredValues = [
    newTask.title,
    newTask.workflow,
    newTask.description,
    newTask.owner,
    newTask.dueDate,
    newTask.status,
    newTask.riskLevel,
  ];

  const hasMissingValue =
    requiredValues.some((value) => {
      return value === "";
    });

  if (hasMissingValue) {
    showFormStatus(
      "Please complete every required field.",
      "error",
    );

    return;
  }

  tasks = [...tasks, newTask];

  saveTasksToStorage(tasks);

  renderApp();

  taskFormElement.reset();

  showFormStatus(
    `"${newTask.title}" was added successfully.`,
    "success",
  );

  taskTitleElement.focus();

  console.log("Task created:", newTask);
}

/**
 * Update one task's status.
 */
function updateTaskStatus(taskId, newStatus) {
  const taskToUpdate =
    getTaskById(taskId);

  if (!taskToUpdate) {
    console.error(
      `Task with ID ${taskId} was not found.`,
    );

    return;
  }

  tasks = tasks.map((task) => {
    if (String(task.id) !== String(taskId)) {
      return task;
    }

    return {
      ...task,
      status: newStatus,
    };
  });

  saveTasksToStorage(tasks);
  renderApp();

  console.log(
    `Task ${taskId} status changed to ${newStatus}.`,
  );
}

/**
 * Delete one task.
 */
function deleteTask(taskId) {
  const taskToDelete =
    getTaskById(taskId);

  if (!taskToDelete) {
    console.error(
      `Task with ID ${taskId} was not found.`,
    );

    return;
  }

  const userConfirmed = window.confirm(
    `Delete "${taskToDelete.title}"?`,
  );

  if (!userConfirmed) {
    return;
  }

  tasks = tasks.filter((task) => {
    return String(task.id) !== String(taskId);
  });

  saveTasksToStorage(tasks);
  renderApp();

  console.log(
    "Task deleted:",
    taskToDelete,
  );
}

/**
 * Handle status changes inside the task list.
 */
function handleTaskListChange(event) {
  const statusSelect =
    event.target.closest(
      ".task-status-select",
    );

  if (!statusSelect) {
    return;
  }

  const taskId =
    statusSelect.dataset.taskId;

  const newStatus =
    statusSelect.value;

  updateTaskStatus(
    taskId,
    newStatus,
  );
}

/**
 * Handle button clicks inside the task list.
 */
function handleTaskListClick(event) {
  const deleteButton =
    event.target.closest(
      ".delete-task-button",
    );

  if (!deleteButton) {
    return;
  }

  const taskId =
    deleteButton.dataset.taskId;

  deleteTask(taskId);
}

/**
 * Clear search and filters.
 */
function clearFilters() {
  taskSearchElement.value = "";
  workflowFilterElement.value = "all";
  statusFilterElement.value = "all";

  renderFilteredTasks();

  taskSearchElement.focus();
}

/**
 * Start the application.
 */
async function initializeApp() {
  renderLoadingState();

  try {
    const savedTasks =
      loadTasksFromStorage();

    if (savedTasks !== null) {
      tasks = savedTasks;

      console.log(
        "Tasks loaded from localStorage.",
      );
    } else {
      tasks = await fetchInitialTasks();

      saveTasksToStorage(tasks);

      console.log(
        "Tasks loaded from tasks.json.",
      );
    }

    renderApp();
  } catch (error) {
    renderErrorState(error);
  }
}

taskFormElement.addEventListener(
  "submit",
  handleTaskSubmit,
);

taskSearchElement.addEventListener(
  "input",
  renderFilteredTasks,
);

workflowFilterElement.addEventListener(
  "change",
  renderFilteredTasks,
);

statusFilterElement.addEventListener(
  "change",
  renderFilteredTasks,
);

clearFiltersButton.addEventListener(
  "click",
  clearFilters,
);

taskListElement.addEventListener(
  "change",
  handleTaskListChange,
);

taskListElement.addEventListener(
  "click",
  handleTaskListClick,
);

initializeApp();