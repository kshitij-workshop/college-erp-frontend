import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import ExamDialog from "@/components/exams/ExamDialog";
import ExamTable from "@/components/exams/ExamTable";
import MarksDialog from "@/components/exams/MarksDialog";
import { useExams } from "@/hooks/useExams";
import { useAuth } from "@/hooks/useAuth";
import { deleteExam, lockExam, publishExamResult } from "@/api/examApi";

export default function ExamPage() {
  const { user } = useAuth();
  const {
    exams,
    offerings,
    loading,
    keyword,
    setKeyword,
    filters,
    setFilters,
    refresh,
  } = useExams();
  const [createOpen, setCreateOpen] = useState(false);
  const [createDialogKey, setCreateDialogKey] = useState(0);
  const [marksExam, setMarksExam] = useState(null);
  const [marksOpen, setMarksOpen] = useState(false);
  const [resultsExam, setResultsExam] = useState(null);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const examsWithSection = useMemo(
    () =>
      exams.map((exam) => ({
        ...exam,
        sectionId: offerings.find(
          (offering) => offering.id === exam.subjectOfferingId,
        )?.sectionId,
      })),
    [exams, offerings],
  );

  async function executeAction() {
    const { exam, type } = confirmAction;
    try {
      if (type === "lock") await lockExam(exam.id);
      if (type === "publish") await publishExamResult(exam.id);
      if (type === "delete") await deleteExam(exam.id);
      toast.success(
        type === "lock"
          ? "Exam locked successfully"
          : type === "publish"
            ? "Results published successfully"
            : "Exam deleted successfully",
      );
      await refresh();
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Unable to update exam");
    } finally {
      setConfirmAction(null);
    }
  }

  const actionCopy = {
    lock: [
      "Lock marks?",
      "Locked marks cannot be changed. Only an administrator can perform this action.",
    ],
    publish: [
      "Publish results?",
      "Published results become available to students.",
    ],
    delete: ["Delete exam?", "This exam will be permanently removed."],
  };

  const canManage = ["ADMIN", "FACULTY"].includes(user?.role);
  const canDelete = user?.role === "ADMIN";

  function handleCreateOpenChange(open) {
    setCreateOpen(open);
  }

  function openCreateDialog() {
    setCreateDialogKey((key) => key + 1);
    setCreateOpen(true);
  }

  function openMarksDialog(exam) {
    setMarksExam(exam);
    setMarksOpen(true);
  }

  function openResultsDialog(exam) {
    setResultsExam(exam);
    setResultsOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Exams"
        description="Create exams, record marks, and publish results."
        buttonText={canManage ? "Create Exam" : undefined}
        buttonIcon={Plus}
        onButtonClick={openCreateDialog}
      />
      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search exams, subjects or sections..."
        filters={filters}
        filterConfig={{
          examType: {
            label: "Exam type",
            options: [
              { id: "CLASS_TEST", name: "Class Test" },
              { id: "INTERNAL", name: "Internal" },
              { id: "EXTERNAL", name: "External" },
            ],
          },
          status: {
            label: "Status",
            options: [
              { id: "DRAFT", name: "Draft" },
              { id: "LOCKED", name: "Locked" },
              { id: "PUBLISHED", name: "Published" },
            ],
          },
        }}
        onFilterChange={(key, value) =>
          setFilters((current) => ({ ...current, [key]: value }))
        }
        onRefresh={refresh}
      />
      {loading ? (
        <div className="rounded-2xl border bg-white py-20 text-center text-muted-foreground">
          Loading exams...
        </div>
      ) : (
        <ExamTable
          exams={examsWithSection}
          canManage={canManage}
          canDelete={canDelete}
          onEnterMarks={openMarksDialog}
          onViewResults={openResultsDialog}
          onLock={(exam) => setConfirmAction({ exam, type: "lock" })}
          onPublish={(exam) => setConfirmAction({ exam, type: "publish" })}
          onDelete={(exam) => setConfirmAction({ exam, type: "delete" })}
        />
      )}
      <ExamDialog
        key={createDialogKey}
        open={createOpen}
        onOpenChange={handleCreateOpenChange}
        offerings={offerings}
        refresh={refresh}
      />
      <MarksDialog
        exam={marksExam}
        open={marksOpen}
        onOpenChange={setMarksOpen}
      />
      <MarksDialog
        exam={resultsExam}
        open={resultsOpen}
        onOpenChange={setResultsOpen}
        readOnly
      />
      <ConfirmDialog
        open={Boolean(confirmAction)}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title={confirmAction ? actionCopy[confirmAction.type][0] : ""}
        description={confirmAction ? actionCopy[confirmAction.type][1] : ""}
        confirmText={
          confirmAction?.type === "delete"
            ? "Delete"
            : confirmAction?.type === "publish"
              ? "Publish"
              : "Lock"
        }
        onConfirm={executeAction}
      />
    </div>
  );
}
