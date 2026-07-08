import { useState } from "react";
import { Plus } from "lucide-react";

import { useFaculty } from "@/hooks/useFaculty";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import FacultyTable from "@/components/faculty/FacultyTable";
import FacultyDialog from "@/components/faculty/FacultyDialog";
import FacultyViewSheet from "@/components/faculty/FacultyViewSheet";
import DeleteFacultyDialog from "@/components/faculty/DeleteFacultyDialog";
import FacultyPagination from "@/components/faculty/FacultyPagination";
import FacultySkeleton from "@/components/faculty/FacultySkeleton";


export default function FacultyPage() {

    
  const {
    faculty,
    loading,

    page,
    setPage,

    keyword,
    setKeyword,

    pagination,

    filters,
    handleFilterChange,

    departments,

    refresh,
  } = useFaculty();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewFacultyId, setViewFacultyId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteFaculty, setDeleteFaculty] = useState(null);

  // ===========================
  // Handlers
  // ===========================

  function handleAdd() {
    setSelectedFaculty(null);
    setDialogOpen(true);
  }

  function handleEdit(faculty) {
    setSelectedFaculty(faculty);
    setDialogOpen(true);
  }

  function handleView(faculty) {
    setViewFacultyId(faculty.id);
    setViewOpen(true);
  }

  function handleDelete(faculty) {
    setDeleteFaculty(faculty);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <PageHeader
        title="Faculty"
        description="Manage all faculty in your college"
        buttonText="Add Faculty"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      {/* Toolbar */}

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search faculty..."

        filters={filters}

        filterOptions={{
          departmentId: departments,

          status: [
    { id: "ACTIVE", name: "Active" },
    { id: "ON_LEAVE", name: "On Leave" },
    { id: "RESIGNED", name: "Resigned" },
    { id: "RETIRED", name: "Retired" },
  ],
        }}

        onFilterChange={handleFilterChange}

        onRefresh={refresh}
      />

      {/* Table */}

      {loading ? (
        <FacultySkeleton />
      ) : (
        <FacultyTable
          faculty={faculty}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}

      <FacultyPagination
        page={page}
        setPage={setPage}
        totalPages={pagination.totalPages}
        totalElements={pagination.totalElements}
      />

      {/* Add / Edit */}

      <FacultyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        faculty={selectedFaculty}
        refresh={refresh}
      />

      {/* View */}

      <FacultyViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        facultyId={viewFacultyId}
      />

      {/* Delete */}

      <DeleteFacultyDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        faculty={deleteFaculty}
        refresh={refresh}
      />

    </div>
  );
}