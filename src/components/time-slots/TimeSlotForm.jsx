import { Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import FormInput from "@/components/common/form/FormInput";

export default function TimeSlotForm({
  form,
  loading,
  onSubmit,
  onCancel,
  submitLabel = "Save Time Slot",
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-primary" />
            Time Slot Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <FormInput
            control={form.control}
            name="label"
            label="Label"
            placeholder="e.g. Period 1"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              control={form.control}
              name="startTime"
              label="Start Time"
              type="time"
            />

            <FormInput
              control={form.control}
              name="endTime"
              label="End Time"
              type="time"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 border-t pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
