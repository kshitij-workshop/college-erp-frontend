import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SubjectForm from "./SubjectForm";
import { useSubjectForm } from "@/hooks/useSubjectForm";

export default function SubjectDialog({
  open,
  onOpenChange,

  subject,

  refresh,
}) {
  const {
    form,

    submitting,

    programs,

    onSubmit,
  } = useSubjectForm(subject, () => {
    onOpenChange(false);

    refresh();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{subject ? "Edit Subject" : "Add Subject"}</DialogTitle>
        </DialogHeader>

        <SubjectForm
          form={form}
          submitting={submitting}
          programs={programs}
          onSubmit={onSubmit}
          submitLabel={subject ? "Update Subject" : "Create Subject"}
        />
      </DialogContent>
    </Dialog>
  );
}
