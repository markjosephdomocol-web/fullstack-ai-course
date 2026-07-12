import { useState } from "react";
import "./App.css";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import WorkflowFilter from "./components/WorkflowFilter";
import { initialTasks } from "./data/tasks";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWorkflow, setSelectedWorkflow] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const workflowOptions = [
    "All",
    ...new Set(tasks.map((task) => task.workflow)),
  ];

  const statusOptions = [
    "All",
    ...new Set(tasks.map((task) => task.status)),
  ];

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const searchableText = [
      task.title,
      task.description,
      task.workflow,
      task.owner,
      task.status,
      task.riskLevel,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      normalizedSearchTerm === "" ||
      searchableText.includes(normalizedSearchTerm);

    const matchesWorkflow =
      selectedWorkflow === "All" ||
      task.workflow === selectedWorkflow;

    const matchesStatus =
      selectedStatus === "All" ||
      task.status === selectedStatus;

    return matchesSearch && matchesWorkflow && matchesStatus;
  });

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedWorkflow !== "All" ||
    selectedStatus !== "All";

  function handleAddTask(newTask) {
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function clearFilters() {
    setSearchTerm("");
    setSelectedWorkflow("All");
    setSelectedStatus("All");
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Mini Project 2</p>
          <h1>Workflow Tracker</h1>

          <p className="header-description">
            Track fictional compliance and business workflow tasks using
            React.
          </p>
        </div>

        <div className="task-count">
          <strong>{tasks.length}</strong>
          <span>Total tasks</span>
        </div>
      </header>

      <main>
        <TaskForm onAddTask={handleAddTask} />

        <WorkflowFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedWorkflow={selectedWorkflow}
          onWorkflowChange={setSelectedWorkflow}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          workflows={workflowOptions}
          statuses={statusOptions}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <section className="section-heading">
          <div>
            <p className="eyebrow">Current workload</p>
            <h2>Workflow tasks</h2>
          </div>

          <p className="results-count">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>
        </section>

        {filteredTasks.length > 0 ? (
          <section className="task-grid" aria-label="Workflow tasks">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </section>
        ) : (
          <section className="empty-state">
            <h2>No tasks found</h2>

            <p>
              No workflow tasks match your current search and filters.
            </p>

            <button type="button" onClick={clearFilters}>
              Clear filters
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;