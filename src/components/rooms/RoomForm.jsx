import { Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";

import { ROOM_TYPE_OPTIONS } from "@/constants/options";

export default function RoomForm({
  form,
  loading,
  onSubmit,
  onCancel,
  submitLabel = "Save Room",
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Room Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput
              control={form.control}
              name="roomNumber"
              label="Room Number"
              placeholder="Room 101"
            />

            <FormInput
              control={form.control}
              name="capacity"
              label="Capacity"
              type="number"
              placeholder="60"
            />
          </div>

          <FormSelect
            control={form.control}
            name="roomType"
            label="Room Type"
            placeholder="Select room type"
            options={ROOM_TYPE_OPTIONS}
            isNumber={false}
          />
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
