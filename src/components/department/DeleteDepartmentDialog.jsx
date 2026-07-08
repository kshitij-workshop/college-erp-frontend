import { useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import { deleteDepartment } from "@/api/departmentApi";

export default function DeleteDepartmentDialog({
  open,
  onOpenChange,
  department,
  refresh,
}) {

  const [loading, setLoading] = useState(false);

  async function handleDelete() {

    if (!department) return;

    try {

      setLoading(true);

      await deleteDepartment(department.id);

      toast.success("Department deleted successfully");

      refresh?.();

      onOpenChange(false);

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Unable to delete department"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Department"
      description={`Are you sure you want to delete "${department?.name}"? This action cannot be undone.`}
      confirmText={loading ? "Deleting..." : "Delete"}
      onConfirm={handleDelete}
      loading={loading}
    />

  );

}