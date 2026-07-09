import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SemesterForm from "./SemesterForm";

import { useSemesterForm } from "@/hooks/useSemesterForm";

export default function SemesterDialog({
  open,
  onOpenChange,
  semester,
  refresh,
}) {
  const {
    form,
    loading,

    departments,
    programs,
    batches,

    handleDepartmentChange,
    handleProgramChange,

    onSubmit,
  } = useSemesterForm(semester, () => {
    onOpenChange(false);

    refresh();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="border-b px-8 py-6">
          <DialogTitle className="text-3xl font-bold">
            {semester ? "Edit Semester" : "Add Semester"}
          </DialogTitle>
        </DialogHeader>

        <SemesterForm
          form={form}
          loading={loading}
          departments={departments}
          programs={programs}
          batches={batches}
          handleDepartmentChange={handleDepartmentChange}
          handleProgramChange={handleProgramChange}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={semester ? "Update Semester" : "Create Semester"}
        />
      </DialogContent>
    </Dialog>
  );
}
