import { useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import AssignmentSummary from "@/components/assignments/AssignmentSummary";
import AssignmentFilters from "@/components/assignments/AssignmentFilters";
import StudentAssignmentCard from "@/components/assignments/StudentAssignmentCard";
import AssignmentDetailsDialog from "@/components/assignments/AssignmentDetailsDialog";
import SubmitAssignmentDialog from "@/components/assignments/SubmitAssignmentDialog";
import { useStudentAssignments } from "@/hooks/useStudentAssignment";
import StudentSubmissionDialog from "@/components/assignments/StudentSubmissionDialog";

export default function StudentAssignmentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  function handleView(assignment) {
    setSelectedAssignment(assignment);
    setDetailsOpen(true);
  }

  const [submitOpen, setSubmitOpen] = useState(false);

  function handleSubmit(assignment) {
    setSelectedAssignment(assignment);
    setSubmitOpen(true);
  }

  const [submissionOpen, setSubmissionOpen] = useState(false);

  function handleViewSubmission(assignment) {
    setSelectedAssignment(assignment);
    setSubmissionOpen(true);
  }

  const {
    assignments,

    loading,

    refresh,
  } = useStudentAssignments();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        description="Track your assignments, submissions and grades."
      />

      <AssignmentSummary assignments={assignments} />

      <div className="grid gap-6 lg:grid-cols-2">
        {assignments.map((assignment) => (
          <StudentAssignmentCard
            key={assignment.assignmentId}
            assignment={assignment}
            onView={handleView}
            onSubmit={handleSubmit}
            onViewSubmission={handleViewSubmission}
          />
        ))}
      </div>

      <AssignmentDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        assignment={selectedAssignment}
        onSubmit={(assignment) => {
          setDetailsOpen(false);
          handleSubmit(assignment);
        }}
      />

      <StudentSubmissionDialog
        open={submissionOpen}
        onOpenChange={setSubmissionOpen}
        assignmentId={selectedAssignment?.assignmentId}
      />

      <SubmitAssignmentDialog
        open={submitOpen}
        onOpenChange={setSubmitOpen}
        assignment={selectedAssignment}
        refresh={refresh}
      />
    </div>
  );
}
