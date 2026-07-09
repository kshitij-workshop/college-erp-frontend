import { useState } from "react";

import { Plus } from "lucide-react";

import { useSemester } from "@/hooks/useSemester";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import SemesterTable from "@/components/semester/SemesterTable";
import SemesterDialog from "@/components/semester/SemesterDialog";
import SemesterViewSheet from "@/components/semester/SemesterViewSheet";
import DeleteSemesterDialog from "@/components/semester/DeleteSemesterDialog";
import SemesterSkeleton from "@/components/semester/SemesterSkeleton";

export default function SemesterPage() {
  const {
    semesters,
    loading,

    keyword,
    setKeyword,

    filters,
    handleFilterChange,

    departments,
    programs,
    batches,

    refresh,
  } = useSemester();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewSemesterId, setViewSemesterId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteSemester, setDeleteSemester] = useState(null);

  // ===========================
  // Handlers
  // ===========================

  function handleAdd() {
    setSelectedSemester(null);

    setDialogOpen(true);
  }

  function handleEdit(semester) {
    setSelectedSemester(semester);

    setDialogOpen(true);
  }

  function handleView(semester) {
    setViewSemesterId(semester.id);

    setViewOpen(true);
  }

  function handleDelete(semester) {
    setDeleteSemester(semester);

    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Semesters"
        description="Manage academic semesters"
        buttonText="Add Semester"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search semesters..."
        filters={filters}
        filterOptions={{
          departmentId: departments,
          programId: programs,
          batchId: batches,
        }}
        onFilterChange={handleFilterChange}
        onRefresh={refresh}
      />

      {loading ? (
        <SemesterSkeleton />
      ) : (
        <SemesterTable
          semesters={semesters}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <SemesterDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        semester={selectedSemester}
        refresh={refresh}
      />

      <SemesterViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        semesterId={viewSemesterId}
      />

      <DeleteSemesterDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        semester={deleteSemester}
        refresh={refresh}
      />
    </div>
  );
}
