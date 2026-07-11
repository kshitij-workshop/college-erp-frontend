import { useState } from "react";
import { Plus } from "lucide-react";

import { useTimetables } from "@/hooks/useTimetables";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import TimetableTable from "@/components/timetable/TimetableTable";
import TimetableDialog from "@/components/timetable/TimetableDialog";
import TimetableViewSheet from "@/components/timetable/TimetableViewSheet";
import DeleteTimetableDialog from "@/components/timetable/DeleteTimetableDialog";
import TimetablePagination from "@/components/timetable/TimetablePagination";
import TimetableSkeleton from "@/components/timetable/TimetableSkeleton";

export default function TimetablePage() {
  const {
    timetables,
    loading,

    page,
    setPage,

    keyword,
    setKeyword,

    filters,
    handleFilterChange,

    pagination,

    batches,
    semesters,
    sections,
    faculty,

    refresh,
  } = useTimetables();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTimetable, setSelectedTimetable] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewTimetableId, setViewTimetableId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTimetable, setDeleteTimetable] = useState(null);

  // ===============================
  // Handlers
  // ===============================

  function handleAdd() {
    setSelectedTimetable(null);
    setDialogOpen(true);
  }

  function handleEdit(timetable) {
    setSelectedTimetable(timetable);
    setDialogOpen(true);
  }

  function handleView(timetable) {
    setViewTimetableId(timetable.id);
    setViewOpen(true);
  }

  function handleDelete(timetable) {
    setDeleteTimetable(timetable);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <PageHeader
        title="Class Timetable"
        description="Manage class schedules and timetable entries."
        buttonText="Add Timetable"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      {/* Toolbar */}

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search subject, faculty or room..."
        filters={filters}
        onFilterChange={handleFilterChange}
        onRefresh={refresh}
        filterConfig={{
          batchId: {
            label: "Batch",
            options: batches,
            getOptionLabel: (batch) => `${batch.name} . ${batch.departmentName}`,
          },

          semesterId: {
            label: "Semester",
            options: semesters,
            getOptionLabel: (semester) => `Semester ${semester.semesterNumber}`,
          },

          sectionId: {
            label: "Section",
            options: sections,
            getOptionLabel: (section) => section.name,
          },

          facultyId: {
            label: "Faculty",
            options: faculty,
            getOptionLabel: (faculty) => faculty.fullName,
          },
        }}
      />

      {/* Table */}

      {loading ? (
        <TimetableSkeleton />
      ) : (
        <TimetableTable
          timetables={timetables}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}

      <TimetablePagination
        page={page}
        setPage={setPage}
        totalPages={pagination.totalPages}
        totalElements={pagination.totalElements}
      />

      {/* Add / Edit */}

      <TimetableDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        timetable={selectedTimetable}
        refresh={refresh}
      />

      {/* View */}

      <TimetableViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        timetableId={viewTimetableId}
      />

      {/* Delete */}

      <DeleteTimetableDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        timetable={deleteTimetable}
        refresh={refresh}
      />
    </div>
  );
}
