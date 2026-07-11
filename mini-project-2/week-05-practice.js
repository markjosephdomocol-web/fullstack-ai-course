const PRACTICE_STORAGE_KEY = "workflowTrackerPracticeTasks";

/**
 * Loads sample tasks from the JSON file.
 *
 * @returns {Promise<Array>} The loaded task records.
 */
async function fetchPracticeTasks() {
  const response = await fetch("./data/tasks.json");

  if (!response.ok) {
    throw new Error(
      `Unable to load tasks. HTTP status: ${response.status}`
    );
  }

  return response.json();
}

/**
 * Saves tasks in browser localStorage.
 *
 * @param {Array} tasks
 */
function savePracticeTasks(tasks) {
  localStorage.setItem(
    PRACTICE_STORAGE_KEY,
    JSON.stringify(tasks)
  );
}

/**
 * Reads saved tasks from browser localStorage.
 *
 * @returns {Array}
 */
function loadPracticeTasks() {
  const savedTasks = localStorage.getItem(
    PRACTICE_STORAGE_KEY
  );

  if (!savedTasks) {
    return [];
  }

  try {
    return JSON.parse(savedTasks);
  } catch (error) {
    console.error("The saved task data is invalid:", error);
    return [];
  }
}

/**
 * Runs the Week 5 fetch and localStorage exercise.
 */
async function runPracticeExercise() {
  try {
    console.log("Loading sample tasks...");

    const fetchedTasks = await fetchPracticeTasks();

    console.log("Tasks loaded with fetch:", fetchedTasks);

    savePracticeTasks(fetchedTasks);

    const savedTasks = loadPracticeTasks();

    console.log("Tasks loaded from localStorage:", savedTasks);
    console.log(`Total saved tasks: ${savedTasks.length}`);
  } catch (error) {
    console.error("Week 5 practice exercise failed:", error);
  }
}

runPracticeExercise();