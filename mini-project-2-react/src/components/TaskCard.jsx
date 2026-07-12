import StatusBadge from "./StatusBadge";

function TaskCard({ task }) {
  return (
    <article className="task-card">
      <div className="task-card-header">
        <div>
          <p className="workflow-name">{task.workflow}</p>
          <h2>{task.title}</h2>
        </div>

        <StatusBadge status={task.status} />
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-details">
        <div>
          <span className="detail-label">Owner</span>
          <span>{task.owner}</span>
        </div>

        <div>
          <span className="detail-label">Due date</span>
          <span>{task.dueDate}</span>
        </div>

        <div>
          <span className="detail-label">Risk</span>
          <span className={`risk risk-${task.riskLevel.toLowerCase()}`}>
            {task.riskLevel}
          </span>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;