import { BookOpen, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";

import { DAY_OF_WEEK_OPTIONS } from "@/constants/options";

export default function TimetableForm({
  form,
  loading,

  subjectOfferings,
  rooms,
  timeSlots,

  onSubmit,
  onCancel,

  submitLabel = "Save Timetable",
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
      {/* ================= Academic Information ================= */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Academic Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 pt-5">
          <FormSelect
            control={form.control}
            name="subjectOfferingId"
            label="Subject Offering"
            placeholder="Select subject offering"
            options={subjectOfferings}
            getOptionLabel={(offering) =>
              `${offering.subjectCode} • ${offering.subjectName} • SEC-${offering.sectionName}`
            }
          />

          <FormInput
            control={form.control}
            name="academicSession"
            label="Academic Session"
            placeholder="2025-26"
          />
        </CardContent>
      </Card>

      {/* ================= Schedule Information ================= */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Schedule Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormSelect
              control={form.control}
              name="dayOfWeek"
              label="Day"
              placeholder="Select day"
              options={DAY_OF_WEEK_OPTIONS}
              isNumber={false}
            />

            <FormSelect
              control={form.control}
              name="timeSlotId"
              label="Time Slot"
              placeholder="Select time slot"
              options={timeSlots}
              getOptionLabel={(slot) =>
                `${slot.label} (${slot.startTime} - ${slot.endTime})`
              }
            />
          </div>

          <FormSelect
            control={form.control}
            name="roomId"
            label="Room"
            placeholder="Select room"
            options={rooms}
            getOptionLabel={(room) => `${room.roomNumber} • ${room.roomType}`}
          />
        </CardContent>
      </Card>

      {/* ================= Footer ================= */}

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
