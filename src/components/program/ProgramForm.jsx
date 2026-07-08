import { Button } from "@/components/ui/button";

import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";

export default function ProgramForm({
  form,
  loading,

  departments,

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
          label="Program Name"
          placeholder="Bachelor of Technology"
        />

        <FormInput
          control={form.control}
          name="code"
          label="Program Code"
          placeholder="BTECH-CSE"
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
        />

        <FormInput
          control={form.control}
          name="durationYear"
          label="Duration (Years)"
          placeholder="4"
          type="number"
        />
      </div>

      {/* Row 3 */}

      <div className="grid grid-cols-2 gap-6">
        <FormInput
          control={form.control}
          name="totalSemesters"
          label="Total Semesters"
          placeholder="8"
          type="number"
        />

        <div />
      </div>

      {/* Footer */}

      <div className="flex justify-end gap-3 border-t pt-6">
        <Button type="button" variant="outline" onClick={() => onCancel?.()}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
