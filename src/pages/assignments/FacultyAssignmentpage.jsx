import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import AssignmentDialog from "@/components/assignments/AssignmentDialog";
import AssignmentTable from "@/components/assignments/AssignmentTable";
import SubmissionsDialog from "@/components/assignments/SubmissionsDialog";
import { useAssignments } from "@/hooks/useAssignments";
import { deleteAssignment } from "@/api/assignmentApi";
import { useAuth } from "@/hooks/useAuth";

export default function FacultyAssignmentsPage() {
  const { user } = useAuth();
  const {
    assignments,
    offerings,
    loading,
    keyword,
    setKeyword,
    filters,
    setFilters,
    refresh,
  } = useAssignments();
  const [dialog, setDialog] = useState({
    open: false,
    assignment: null,
    key: 0,
  });
  const [submissionAssignment, setSubmissionAssignment] = useState(null);
  const [submissionsOpen, setSubmissionsOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const isFaculty = user?.role === "FACULTY";
  function openCreate() {
    setDialog((current) => ({
      open: true,
      assignment: null,
      key: current.key + 1,
    }));
  }
  function openEdit(assignment) {
    setDialog((current) => ({ open: true, assignment, key: current.key + 1 }));
  }
  function openSubmissions(assignment) {
    setSubmissionAssignment(assignment);
    setSubmissionsOpen(true);
  }
  async function confirmDelete() {
    try {
      await deleteAssignment(deleting.id);
      toast.success("Assignment deleted successfully");
      await refresh();
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to delete assignment",
      );
    } finally {
      setDeleting(null);
    }
  }
  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        description="Create assignments and grade student submissions."
        buttonText={isFaculty ? "Create Assignment" : undefined}
        buttonIcon={Plus}
        onButtonClick={openCreate}
      />
      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search assignments, subjects or sections..."
        filters={filters}
        filterConfig={{
          subjectOfferingId: {
            label: "Subject offering",
            options: offerings,
            getOptionLabel: (offering) =>
              `${offering.subjectCode} • ${offering.sectionName}`,
          },
          status: {
            label: "Status",
            options: [
              { id: "ACTIVE", name: "Active" },
              { id: "INACTIVE", name: "Inactive" },
            ],
          },
        }}
        onFilterChange={(key, value) =>
          setFilters((current) => ({ ...current, [key]: value }))
        }
        onRefresh={refresh}
      />
      {!isFaculty ? (
        <div className="rounded-2xl border border-dashed bg-white py-20 text-center text-muted-foreground">
          Assignments are managed by assigned faculty members.
        </div>
      ) : loading ? (
        <div className="rounded-2xl border bg-white py-20 text-center text-muted-foreground">
          Loading assignments...
        </div>
      ) : (
        <AssignmentTable
          assignments={assignments}
          onEdit={openEdit}
          onDelete={setDeleting}
          onSubmissions={openSubmissions}
        />
      )}
      <AssignmentDialog
        key={dialog.key}
        open={dialog.open}
        onOpenChange={(open) => setDialog((current) => ({ ...current, open }))}
        assignment={dialog.assignment}
        offerings={offerings}
        refresh={refresh}
      />
      <SubmissionsDialog
        assignment={submissionAssignment}
        open={submissionsOpen}
        onOpenChange={setSubmissionsOpen}
      />
      <ConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete assignment?"
        description="This assignment and its submissions will be permanently removed."
        confirmText="Delete"
        onConfirm={confirmDelete}
      />
    </div>
  );
}
