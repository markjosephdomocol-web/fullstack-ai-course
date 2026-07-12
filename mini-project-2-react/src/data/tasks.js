export const initialTasks = [
  {
    id: 1,
    title: "Review vendor security questionnaire",
    description:
      "Check the fictional vendor questionnaire and record any missing security evidence.",
    workflow: "Vendor Due Diligence",
    owner: "Alex Reviewer",
    dueDate: "2026-07-18",
    status: "In Progress",
    riskLevel: "High",
  },
  {
    id: 2,
    title: "Confirm quarterly access list",
    description:
      "Review the sample user access list and identify accounts that need manager confirmation.",
    workflow: "Quarterly Access Review",
    owner: "Casey Manager",
    dueDate: "2026-07-20",
    status: "Not Started",
    riskLevel: "Medium",
  },
  {
    id: 3,
    title: "Collect audit evidence",
    description:
      "Upload fictional screenshots and approval records for the sample audit request.",
    workflow: "Audit Evidence Request",
    owner: "Jordan Analyst",
    dueDate: "2026-07-22",
    status: "Blocked",
    riskLevel: "High",
  },
  {
    id: 4,
    title: "Approve policy exception",
    description:
      "Review the fictional exception request and document the approval decision.",
    workflow: "Policy Exception Review",
    owner: "Morgan Admin",
    dueDate: "2026-07-25",
    status: "Completed",
    riskLevel: "Low",
  },
];