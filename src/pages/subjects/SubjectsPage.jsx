import { useState } from "react";
import { Plus } from "lucide-react";

import { useSubjects } from "@/hooks/useSubjects";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import SubjectTable from "@/components/subjects/SubjectTable";
import SubjectDialog from "@/components/subjects/SubjectDialog";
import SubjectViewSheet from "@/components/subjects/SubjectViewSheet";
import DeleteSubjectDialog from "@/components/subjects/DeleteSubjectDialog";
import SubjectPagination from "@/components/subjects/SubjectPagination";
import SubjectSkeleton from "@/components/subjects/SubjectSkeleton";
import { SEMESTER_OPTIONS } from "@/constants/options";

export default function SubjectsPage() {
  const {
    subjects,
    loading,

    page,
    setPage,

    keyword,
    setKeyword,
    programs,

    pagination,

    filters,
    handleFilterChange,

    refresh,
  } = useSubjects();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewSubjectId, setViewSubjectId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteSubject, setDeleteSubject] = useState(null);

  // ===========================
  // Handlers
  // ===========================

  function handleAdd() {
    setSelectedSubject(null);

    setDialogOpen(true);
  }

  function handleEdit(subject) {
    setSelectedSubject(subject);

    setDialogOpen(true);
  }

  function handleView(subject) {
    setViewSubjectId(subject.id);

    setViewOpen(true);
  }

  function handleDelete(subject) {
    setDeleteSubject(subject);

    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subjects"
        description="Manage all subjects"
        buttonText="Add Subject"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search subjects..."
        filters={filters}
        filterOptions={{
          programId: programs,
          semesterNumber: SEMESTER_OPTIONS,
        }}
        onFilterChange={handleFilterChange}
        onRefresh={refresh}
      />

      {loading ? (
        <SubjectSkeleton />
      ) : (
        <SubjectTable
          subjects={subjects}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <SubjectPagination
        page={page}
        setPage={setPage}
        totalPages={pagination.totalPages}
        totalElements={pagination.totalElements}
      />

      <SubjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        subject={selectedSubject}
        refresh={refresh}
      />

      <SubjectViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        subjectId={viewSubjectId}
      />

      <DeleteSubjectDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        subject={deleteSubject}
        refresh={refresh}
      />
    </div>
  );
}
