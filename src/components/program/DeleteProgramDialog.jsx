import { useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import { deleteProgram } from "@/api/programApi";

export default function DeleteProgramDialog({
  open,
  onOpenChange,
  program,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!program) return;

    try {
      setLoading(true);

      await deleteProgram(program.id);

      toast.success("Program deleted successfully");

      refresh?.();

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to delete program",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Program"
      description={`Are you sure you want to delete "${program?.name}"? This action cannot be undone.`}
      confirmText={loading ? "Deleting..." : "Delete"}
      onConfirm={handleDelete}
      loading={loading}
    />
  );
}
