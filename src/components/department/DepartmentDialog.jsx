import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import DepartmentForm from "./DepartmentForm";
import { useDepartmentForm } from "@/hooks/useDepartmentForm";

export default function DepartmentDialog({
  open,
  onOpenChange,
  department,
  refresh,
}) {
  const { form, loading, onSubmit } = useDepartmentForm(department, () => {
    onOpenChange(false);
    refresh();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
        <DialogHeader>
          <div className="px-8 py-6 border-b">
            <DialogTitle className="text-3xl font-bold">
              {department ? "Edit Department" : "Add Department"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <DepartmentForm
          form={form}
          loading={loading}
          onSubmit={onSubmit}
          submitLabel={department ? "Update" : "Create Department"}
        />
      </DialogContent>
    </Dialog>
  );
}
