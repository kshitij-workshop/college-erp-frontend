import { Button } from "@/components/ui/button";

import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";

export default function SectionForm({
  form,
  loading,

  departments,
  programs,
  batches,
  semesters,

  handleDepartmentChange,
  handleProgramChange,
  handleBatchChange,

  onSubmit,
  onCancel,

  submitLabel = "Save",
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
      {/* Row 1 */}

      <div className="grid grid-cols-2 gap-6">
        <FormInput
          control={form.control}
          name="name"
          label="Section Name"
          placeholder="A"
        />

        <FormInput
          control={form.control}
          name="maxStrength"
          label="Maximum Strength"
          type="number"
          placeholder="60"
        />
      </div>

      {/* Row 2 */}

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

      {/* Row 3 */}

      <div className="grid grid-cols-2 gap-6">
        <FormSelect
          control={form.control}
          name="batchId"
          label="Batch"
          placeholder="Select Batch"
          options={batches}
          onValueChange={handleBatchChange}
        />

        <FormSelect
          control={form.control}
          name="semesterId"
          label="Semester"
          placeholder="Select Semester"
          options={semesters}
          onValueChange={undefined}
          getOptionLabel={(semester) => `Semester ${semester.semesterNumber}`}
        />
      </div>

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
