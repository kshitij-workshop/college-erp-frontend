import { useState } from "react";

import { Plus } from "lucide-react";

import { useDepartment } from "@/hooks/useDepartment";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import DepartmentTable from "@/components/department/DepartmentTable";
import DepartmentDialog from "@/components/department/DepartmentDialog";
import DepartmentViewSheet from "@/components/department/DepartmentViewSheet";
import DeleteDepartmentDialog from "@/components/department/DeleteDepartmentDialog";
import DepartmentSkeleton from "@/components/department/DepartmentSkeleton";

export default function DepartmentPage() {

  const {
    departments,
    loading,
    keyword,
    setKeyword,
    refresh,
  } = useDepartment();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewDepartmentId, setViewDepartmentId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteDepartment, setDeleteDepartment] = useState(null);

  // ===========================
  // Handlers
  // ===========================

  function handleAdd() {
    setSelectedDepartment(null);
    setDialogOpen(true);
  }

  function handleEdit(department) {
    setSelectedDepartment(department);
    setDialogOpen(true);
  }

  function handleView(department) {
    setViewDepartmentId(department.id);
    setViewOpen(true);
  }

  function handleDelete(department) {
    setDeleteDepartment(department);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Departments"
        description="Manage all departments in your college"
        buttonText="Add Department"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search departments..."
        onRefresh={refresh}
      />

      {loading ? (

        <DepartmentSkeleton />

      ) : (

        <DepartmentTable
          departments={departments}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      )}

      <DepartmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        department={selectedDepartment}
        refresh={refresh}
      />

      <DepartmentViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        departmentId={viewDepartmentId}
      />

      <DeleteDepartmentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        department={deleteDepartment}
        refresh={refresh}
      />

    </div>
  );
}