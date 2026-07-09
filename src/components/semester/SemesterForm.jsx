import { Button } from "@/components/ui/button";

import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";
import FormSwitch from "@/components/common/form/FormSwitch";

export default function SemesterForm({
  form,
  loading,

  departments,
  programs,
  batches,

  handleDepartmentChange,
  handleProgramChange,

  onSubmit,
  onCancel,

  submitLabel = "Save",
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
      {/* Semester Number */}

      <FormInput
        control={form.control}
        name="semesterNumber"
        label="Semester Number"
        placeholder="Enter semester number"
        type="number"
      />

      {/* Department & Program */}

      <div className="grid grid-cols-2 gap-6">
        <FormSelect
          control={form.control}
          name="departmentId"
          label="Department"
          placeholder="Select Department"
          options={departments}
          onValueChange={handleDepartmentChange}
        />

        <FormSelect
          control={form.control}
          name="programId"
          label="Program"
          placeholder="Select Program"
          options={programs}
          onValueChange={handleProgramChange}
        />
      </div>

      {/* Batch */}

      <FormSelect
        control={form.control}
        name="batchId"
        label="Batch"
        placeholder="Select Batch"
        options={batches}
      />

      {/* Current Semester */}

      <FormSwitch
        control={form.control}
        name="current"
        label="Current Semester"
        description="Only one semester should be marked as current for a batch."
      />

      {/* Footer */}

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
