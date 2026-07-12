import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useTimeSlotForm } from "@/hooks/useTimeSlotForm";

import TimeSlotForm from "./TimeSlotForm";

export default function TimeSlotDialog({
  open,
  onOpenChange,
  timeSlot,
  refresh,
}) {
  function handleSuccess() {
    onOpenChange(false);
    refresh?.();
  }

  const { form, loading, onSubmit } = useTimeSlotForm(timeSlot, handleSuccess);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="border-b px-8 py-6">
          <DialogTitle className="text-3xl font-bold">
            {timeSlot ? "Edit Time Slot" : "Add Time Slot"}
          </DialogTitle>
        </DialogHeader>

        <TimeSlotForm
          form={form}
          loading={loading}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={timeSlot ? "Update Time Slot" : "Create Time Slot"}
        />
      </DialogContent>
    </Dialog>
  );
}
