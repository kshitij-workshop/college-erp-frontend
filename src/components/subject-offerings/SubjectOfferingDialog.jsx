import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SubjectOfferingForm from "./SubjectOfferingForm";
import { useSubjectOfferingForm } from "@/hooks/useSubjectOfferingForm";

export default function SubjectOfferingDialog({
  open,
  onOpenChange,

  subjectOffering,

  refresh,
}) {
  const {
    form,
    loading,

    subjects,
    faculty,
    sections,

    onSubmit,
  } = useSubjectOfferingForm(subjectOffering, () => {
    onOpenChange(false);

    refresh();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="border-b px-8 py-6">
          <DialogTitle className="text-3xl font-bold">
            {subjectOffering ? "Edit Subject Offering" : "Add Subject Offering"}
          </DialogTitle>
        </DialogHeader>

        <SubjectOfferingForm
          form={form}
          loading={loading}
          subjects={subjects}
          faculty={faculty}
          sections={sections}
          onSubmit={onSubmit}
          submitLabel={
            subjectOffering
              ? "Update Subject Offering"
              : "Create Subject Offering"
          }
        />
      </DialogContent>
    </Dialog>
  );
}
