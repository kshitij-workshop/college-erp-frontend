import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SectionForm from "./SectionForm";
import { useSectionForm } from "@/hooks/useSectionForm";

export default function SectionDialog({
  open,
  onOpenChange,
  section,
  refresh,
}) {
  const {
    form,
    loading,

    departments,
    programs,
    batches,
    semesters,

    handleDepartmentChange,
    handleProgramChange,
    handleBatchChange,

    onSubmit,
  } = useSectionForm(section, () => {
    onOpenChange(false);

    refresh();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="border-b px-8 py-6">
          <DialogTitle className="text-3xl font-bold">
            {section ? "Edit Section" : "Add Section"}
          </DialogTitle>
        </DialogHeader>

        <SectionForm
          form={form}
          loading={loading}
          departments={departments}
          programs={programs}
          batches={batches}
          semesters={semesters}
          handleDepartmentChange={handleDepartmentChange}
          handleProgramChange={handleProgramChange}
          handleBatchChange={handleBatchChange}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={section ? "Update Section" : "Create Section"}
        />
      </DialogContent>
    </Dialog>
  );
}
