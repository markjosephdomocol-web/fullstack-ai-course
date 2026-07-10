import {
  countTasksByStatus,
  formatDate,
  formatOwnerName,
  getHighRiskTasks,
  getRiskLabel,
  getStatusLabel,
  getTasksByOwner,
  isOverdue,
  sortTasksByDueDate,
} from "./workflow-utils.js";

/**
 * An array containing fictional workflow task objects.
 */
const tasks = [
  {
    id: 1,
    workflow: "Vendor Due Diligence",
    title: "Review vendor security questionnaire",
    description:
      "Review the fictional vendor questionnaire and document missing answers.",
    owner: "alex reviewer",
    status: "in-progress",
    dueDate: "2026-07-13",
    riskLevel: "high",
  },
  {
    id: 2,
    workflow: "Quarterly Access Review",
    title: "Collect application access list",
    description:
      "Collect a dummy list of active users from the sample application.",
    owner: "casey manager",
    status: "not-started",
    dueDate: "2026-07-15",
    riskLevel: "medium",
  },
  {
    id: 3,
    workflow: "Policy Exception Review",
    title: "Confirm exception owner",
    description:
      "Confirm that the fictional policy exception has an assigned owner.",
    owner: "jordan analyst",
    status: "blocked",
    dueDate: "2026-07-09",
    riskLevel: "high",
  },
  {
    id: 4,
    workflow: "Audit Evidence Request",
    title: "Upload sample approval record",
    description:
      "Attach a fictional approval record to the audit evidence request.",
    owner: "taylor reviewer",
    status: "completed",
    dueDate: "2026-07-08",
    riskLevel: "low",
  },
  {
    id: 5,
    workflow: "Vendor Due Diligence",
    title: "Document remediation actions",
    description:
      "Create fictional follow-up tasks for the vendor's missing controls.",
    owner: "alex reviewer",
    status: "not-started",
    dueDate: "2026-07-18",
    riskLevel: "medium",
  },
  {
    id: 6,
    workflow: "Quarterly Access Review",
    title: "Review privileged accounts",
    description:
      "Check dummy privileged accounts and identify unnecessary access.",
    owner: "casey manager",
    status: "in-progress",
    dueDate: "2026-07-12",
    riskLevel: "high",
  },
  {
    id: 7,
    workflow: "Incident Response Review",
    title: "Review sample incident timeline",
    description: "Review a fictional incident and confirm escalation timestamps.",
    owner: "morgan analyst",
    status: "not=started",
    dueDate: "2026-07-29",
    riskLevel: "medium",
  }
];

const taskListElement = document.querySelector("#task-list");
const taskCountElement = document.querySelector("#task-count");
const taskSummaryElement = document.querySelector("#task-summary");

/**
 * Build the status badge HTML.
 */
function createStatusBadge(status) {
  return `
    <span class="badge badge-${status}">
      ${getStatusLabel(status)}
    </span>
  `;
}

/**
 * Build the due date display.
 */
function createDueDateDisplay(task) {
  const overdueClass = isOverdue(task) ? "overdue" : "";
  const overdueText = isOverdue(task) ? " — Overdue" : "";

  return `
    <span class="${overdueClass}">
      ${formatDate(task.dueDate)}${overdueText}
    </span>
  `;
}

/**
 * Build the HTML for one task card.
 */
function createTaskCard(task) {
  return `
    <article class="task-card">
      <div class="task-card-header">
        <div>
          <p class="eyebrow">${task.workflow}</p>
          <h3>${task.title}</h3>
        </div>

        ${createStatusBadge(task.status)}
      </div>

      <p class="task-card-description">
        ${task.description}
      </p>

      <dl class="task-meta">
        <div>
          <dt>Owner</dt>
          <dd>${formatOwnerName(task.owner)}</dd>
        </div>

        <div>
          <dt>Due date</dt>
          <dd>${createDueDateDisplay(task)}</dd>
        </div>

        <div>
          <dt>Risk</dt>
          <dd class="risk-${task.riskLevel}">
            ${getRiskLabel(task.riskLevel)}
          </dd>
        </div>
      </dl>
    </article>
  `;
}

/**
 * Display all task cards.
 */
function renderTasks(tasksToRender) {
  const sortedTasks = sortTasksByDueDate(tasksToRender);

  taskCountElement.textContent = `${sortedTasks.length} tasks`;

  if (sortedTasks.length === 0) {
    taskListElement.innerHTML = `
      <div class="empty-state">
        <h3>No tasks found</h3>
        <p>There are no workflow tasks to display.</p>
      </div>
    `;

    return;
  }

  taskListElement.innerHTML = sortedTasks
    .map((task) => createTaskCard(task))
    .join("");
}

/**
 * Display summary statistics.
 */
function renderTaskSummary(allTasks) {
  const statusCounts = countTasksByStatus(allTasks);
  const highRiskCount = getHighRiskTasks(allTasks).length;

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

  taskSummaryElement.innerHTML = summaryItems
    .map((item) => {
      return `
        <article class="summary-card">
          <p>${item.label}</p>
          <strong>${item.value}</strong>
        </article>
      `;
    })
    .join("");
}

/**
 * Start the application.
 */
function initializeApp() {
  renderTaskSummary(tasks);
  renderTasks(tasks);
}

const blockedTasks = tasks.filter((task) => {
    return task.status === "blocked";
});

const selectedTask = tasks.find((task) => {
  return task.id === 4;
});

console.log("Selected task:", selectedTask);

const taskTitles = tasks.map((task) => {
  return task.title;
});

console.log("Task titles:", taskTitles);

console.log(
  "Alex's tasks:",
  getTasksByOwner(tasks, "alex reviewer"),
);

initializeApp();