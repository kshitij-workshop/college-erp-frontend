import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useTimetableForm } from "@/hooks/useTimetableForm";

import TimetableForm from "./TimetableForm";

export default function TimetableDialog({
  open,
  onOpenChange,
  timetable,
  refresh,
}) {
  function handleSuccess() {
    onOpenChange(false);
    refresh?.();
  }

  const {
    form,
    loading,
    subjectOfferings,
    rooms,
    timeSlots,
    onSubmit,
  } = useTimetableForm(timetable, handleSuccess);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-4xl p-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b px-8 py-6">
          <DialogTitle className="text-3xl font-bold">
            {timetable
              ? "Edit Timetable"
              : "Create Timetable"}
          </DialogTitle>
        </DialogHeader>

        <TimetableForm
          form={form}
          loading={loading}
          subjectOfferings={subjectOfferings}
          rooms={rooms}
          timeSlots={timeSlots}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={
            timetable
              ? "Update Timetable"
              : "Create Timetable"
          }
        />
      </DialogContent>
    </Dialog>
  );
}