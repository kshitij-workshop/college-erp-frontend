import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import BatchForm from "./BatchForm";

import { useBatchForm } from "@/hooks/useBatchForm";

export default function BatchDialog({ open, onOpenChange, batch, refresh }) {
  const {
    form,
    loading,

    departments,
    programs,

    handleDepartmentChange,

    onSubmit,
  } = useBatchForm(batch, () => {
    onOpenChange(false);

    refresh();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="border-b px-8 py-6">
          <DialogTitle className="text-3xl font-bold">
            {batch ? "Edit Batch" : "Add Batch"}
          </DialogTitle>
        </DialogHeader>

        <BatchForm
          form={form}
          loading={loading}
          departments={departments}
          programs={programs}
          handleDepartmentChange={handleDepartmentChange}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={batch ? "Update Batch" : "Create Batch"}
        />
      </DialogContent>
    </Dialog>
  );
}
