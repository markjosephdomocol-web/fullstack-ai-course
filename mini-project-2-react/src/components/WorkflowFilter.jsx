function WorkflowFilter({
  searchTerm,
  onSearchChange,
  selectedWorkflow,
  onWorkflowChange,
  selectedStatus,
  onStatusChange,
  workflows,
  statuses,
  onClearFilters,
  hasActiveFilters,
}) {
  return (
    <section className="filters-panel" aria-label="Task filters">
      <div className="filter-control filter-search">
        <label htmlFor="task-search">Search tasks</label>

        <input
          id="task-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search title, owner, or workflow"
        />
      </div>

      <div className="filter-control">
        <label htmlFor="workflow-filter">Workflow</label>

        <select
          id="workflow-filter"
          value={selectedWorkflow}
          onChange={(event) => onWorkflowChange(event.target.value)}
        >
          {workflows.map((workflow) => (
            <option key={workflow} value={workflow}>
              {workflow}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-control">
        <label htmlFor="status-filter">Status</label>

        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <button
        className="clear-filters-button"
        type="button"
        onClick={onClearFilters}
        disabled={!hasActiveFilters}
      >
        Clear filters
      </button>
    </section>
  );
}

export default WorkflowFilter;