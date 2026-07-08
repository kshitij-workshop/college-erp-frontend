import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProgramForm from "./ProgramForm";

import { useProgramForm } from "@/hooks/useProgramForm";

export default function ProgramDialog({
  open,
  onOpenChange,
  program,
  refresh,
}) {
  const {
    form,
    loading,

    departments,

    onSubmit,
  } = useProgramForm(program, () => {
    onOpenChange(false);

    refresh();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="border-b px-8 py-6">
          <DialogTitle className="text-3xl font-bold">
            {program ? "Edit Program" : "Add Program"}
          </DialogTitle>
        </DialogHeader>

        <ProgramForm
          form={form}
          loading={loading}
          departments={departments}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={program ? "Update Program" : "Create Program"}
        />
      </DialogContent>
    </Dialog>
  );
}
