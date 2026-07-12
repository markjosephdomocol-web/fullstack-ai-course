import { useState } from "react";

const initialFormData = {
  title: "",
  description: "",
  workflow: "Vendor Due Diligence",
  owner: "",
  dueDate: "",
  status: "Not Started",
  riskLevel: "Medium",
};

const workflowOptions = [
  "Vendor Due Diligence",
  "Quarterly Access Review",
  "Policy Exception Review",
  "Audit Evidence Request",
];

const statusOptions = [
  "Not Started",
  "In Progress",
  "Blocked",
  "Completed",
];

const riskOptions = ["Low", "Medium", "High"];

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = formData.title.trim();
    const trimmedOwner = formData.owner.trim();
    const trimmedDescription = formData.description.trim();

    if (!trimmedTitle || !trimmedOwner || !formData.dueDate) {
      setFormError("Title, owner, and due date are required.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      description:
        trimmedDescription || "No additional task description provided.",
      workflow: formData.workflow,
      owner: trimmedOwner,
      dueDate: formData.dueDate,
      status: formData.status,
      riskLevel: formData.riskLevel,
    };

    onAddTask(newTask);

    setFormData(initialFormData);
    setFormError("");
  }

  return (
    <section className="task-form-section">
      <div className="task-form-heading">
        <div>
          <p className="eyebrow">Create task</p>
          <h2>Add a workflow task</h2>
        </div>

        <p>
          Add a fictional task to the current workflow tracker.
        </p>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-field form-field-wide">
          <label htmlFor="title">Task title</label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Example: Review vendor access controls"
          />
        </div>

        <div className="form-field form-field-wide">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe what needs to be completed."
          />
        </div>

        <div className="form-field">
          <label htmlFor="workflow">Workflow</label>

          <select
            id="workflow"
            name="workflow"
            value={formData.workflow}
            onChange={handleChange}
          >
            {workflowOptions.map((workflow) => (
              <option key={workflow} value={workflow}>
                {workflow}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="owner">Owner</label>

          <input
            id="owner"
            name="owner"
            type="text"
            value={formData.owner}
            onChange={handleChange}
            placeholder="Example: Alex Reviewer"
          />
        </div>

        <div className="form-field">
          <label htmlFor="dueDate">Due date</label>

          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="riskLevel">Risk level</label>

          <select
            id="riskLevel"
            name="riskLevel"
            value={formData.riskLevel}
            onChange={handleChange}
          >
            {riskOptions.map((riskLevel) => (
              <option key={riskLevel} value={riskLevel}>
                {riskLevel}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          {formError && (
            <p className="form-error" role="alert">
              {formError}
            </p>
          )}

          <button type="submit">Add task</button>
        </div>
      </form>
    </section>
  );
}

export default TaskForm;