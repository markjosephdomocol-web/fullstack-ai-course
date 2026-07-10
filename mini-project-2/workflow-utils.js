/**
 * Convert an owner's name into title case.
 *
 * Example:
 * "alex reviewer" becomes "Alex Reviewer"
 */
export function formatOwnerName(ownerName) {
  return ownerName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Convert a YYYY-MM-DD date into a readable date.
 */
export function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * Convert a status code into a readable label.
 */
export function getStatusLabel(status) {
  const statusLabels = {
    "not-started": "Not started",
    "in-progress": "In progress",
    blocked: "Blocked",
    completed: "Completed",
  };

  return statusLabels[status] ?? "Unknown";
}

/**
 * Convert a risk code into a readable label.
 */
export function getRiskLabel(riskLevel) {
  const riskLabels = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  return riskLabels[riskLevel] ?? "Unknown";
}

/**
 * Check whether a task is overdue.
 *
 * Completed tasks are never considered overdue.
 */
export function isOverdue(task, today = new Date()) {
  if (task.status === "completed") {
    return false;
  }

  const dueDate = new Date(`${task.dueDate}T00:00:00`);
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return dueDate < startOfToday;
}

/**
 * Calculate how many days remain before a task is due.
 *
 * Negative numbers mean the task is overdue.
 */
export function getDaysUntilDue(dateString, today = new Date()) {
  const dueDate = new Date(`${dateString}T00:00:00`);
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const difference = dueDate.getTime() - startOfToday.getTime();

  return Math.ceil(difference / millisecondsPerDay);
}

/**
 * Return only tasks matching a specific status.
 */
export function filterTasksByStatus(tasks, status) {
  if (status === "all") {
    return [...tasks];
  }

  return tasks.filter((task) => task.status === status);
}

/**
 * Return only tasks matching a specific risk level.
 */
export function filterTasksByRisk(tasks, riskLevel) {
  if (riskLevel === "all") {
    return [...tasks];
  }

  return tasks.filter((task) => task.riskLevel === riskLevel);
}

/**
 * Find one task using its ID.
 */
export function findTaskById(tasks, taskId) {
  return tasks.find((task) => task.id === taskId);
}

/**
 * Return a new array sorted by due date.
 *
 * The original array is not changed.
 */
export function sortTasksByDueDate(tasks) {
  return [...tasks].sort((taskA, taskB) => {
    return new Date(taskA.dueDate) - new Date(taskB.dueDate);
  });
}

/**
 * Count how many tasks exist for each status.
 */
export function countTasksByStatus(tasks) {
  return tasks.reduce(
    (counts, task) => {
      counts[task.status] += 1;
      return counts;
    },
    {
      "not-started": 0,
      "in-progress": 0,
      blocked: 0,
      completed: 0,
    },
  );
}

/**
 * Return all high-risk tasks.
 */
export function getHighRiskTasks(tasks) {
  return tasks.filter((task) => task.riskLevel === "high");
}

export function getTasksByOwner(tasks, ownerName) {
  return tasks.filter((task) => {
    return task.owner.toLowerCase() === ownerName.toLowerCase();
  });
}