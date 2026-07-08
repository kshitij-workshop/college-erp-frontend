import { useState } from "react";

import { Plus } from "lucide-react";

import { useProgram } from "@/hooks/useProgram";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import ProgramTable from "@/components/program/ProgramTable";
import ProgramDialog from "@/components/program/ProgramDialog";
import ProgramViewSheet from "@/components/program/ProgramViewSheet";
import DeleteProgramDialog from "@/components/program/DeleteProgramDialog";
import ProgramSkeleton from "@/components/program/ProgramSkeleton";

export default function ProgramPage() {
  const {
    programs,
    loading,

    keyword,
    setKeyword,

    departmentId,
    setDepartmentId,

    departments,

    refresh,
  } = useProgram();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewProgramId, setViewProgramId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteProgram, setDeleteProgram] = useState(null);

  // ===========================
  // Handlers
  // ===========================

  function handleAdd() {
    setSelectedProgram(null);

    setDialogOpen(true);
  }

  function handleEdit(program) {
    setSelectedProgram(program);

    setDialogOpen(true);
  }

  function handleView(program) {
    setViewProgramId(program.id);

    setViewOpen(true);
  }

  function handleDelete(program) {
    setDeleteProgram(program);

    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Programs"
        description="Manage all academic programs"
        buttonText="Add Program"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search programs..."
        filters={{
          departmentId,
        }}
        filterOptions={{
          departmentId: departments,
        }}
        onFilterChange={(key, value) => {
          if (key === "departmentId") {
            setDepartmentId(value);
          }
        }}
        onRefresh={refresh}
      />

      {loading ? (
        <ProgramSkeleton />
      ) : (
        <ProgramTable
          programs={programs}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ProgramDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        program={selectedProgram}
        refresh={refresh}
      />

      <ProgramViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        programId={viewProgramId}
      />

      <DeleteProgramDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        program={deleteProgram}
        refresh={refresh}
      />
    </div>
  );
}
