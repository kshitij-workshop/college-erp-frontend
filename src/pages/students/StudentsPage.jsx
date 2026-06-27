import { useState } from "react";
import { Plus } from "lucide-react";

import { useStudents } from "@/hooks/useStudents";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import StudentTable from "@/components/common/StudentTable";
import StudentDialog from "@/components/students/StudentDialog";
import StudentViewSheet from "@/components/students/StudentViewSheet";
import DeleteStudentDialog from "@/components/students/DeleteStudentDialog";
import StudentPagination from "@/components/students/StudentPagination";
import StudentSkeleton from "@/components/students/StudentSkeleton";


export default function StudentsPage() {

    
  const {
    students,
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
  } = useStudents();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewStudentId, setViewStudentId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(null);

  // ===========================
  // Handlers
  // ===========================

  function handleAdd() {
    setSelectedStudent(null);
    setDialogOpen(true);
  }

  function handleEdit(student) {
    setSelectedStudent(student);
    setDialogOpen(true);
  }

  function handleView(student) {
    setViewStudentId(student.id);
    setViewOpen(true);
  }

  function handleDelete(student) {
    setDeleteStudent(student);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <PageHeader
        title="Students"
        description="Manage all students in your college"
        buttonText="Add Student"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      {/* Toolbar */}

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search students..."

        filters={filters}

        filterOptions={{
          departmentId: departments,

          status: [
            {
              id: "ACTIVE",
              name: "Active",
            },
            {
              id: "INACTIVE",
              name: "Inactive",
            },
          ],
        }}

        onFilterChange={handleFilterChange}

        onRefresh={refresh}
      />

      {/* Table */}

      {loading ? (
        <StudentSkeleton />
      ) : (
        <StudentTable
          students={students}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}

      <StudentPagination
        page={page}
        setPage={setPage}
        totalPages={pagination.totalPages}
        totalElements={pagination.totalElements}
      />

      {/* Add / Edit */}

      <StudentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        student={selectedStudent}
        refresh={refresh}
      />

      {/* View */}

      <StudentViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        studentId={viewStudentId}
      />

      {/* Delete */}

      <DeleteStudentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        student={deleteStudent}
        refresh={refresh}
      />

    </div>
  );
}