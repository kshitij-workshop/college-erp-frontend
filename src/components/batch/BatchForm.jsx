import { Button } from "@/components/ui/button";

import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";

export default function BatchForm({
  form,
  loading,

  departments,
  programs,

  handleDepartmentChange,

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
          label="Batch Name"
          placeholder="2024-2028"
        />

        <FormSelect
          control={form.control}
          name="departmentId"
          label="Department"
          placeholder="Select Department"
          options={departments}
          onValueChange={handleDepartmentChange}
        />
      </div>

      {/* Row 2 */}

      <div className="grid grid-cols-2 gap-6">
        <FormSelect
          control={form.control}
          name="programId"
          label="Program"
          placeholder="Select Program"
          options={programs}
        />

        <FormInput
          control={form.control}
          name="startYear"
          label="Start Year"
          placeholder="2024"
          type="number"
        />
      </div>

      {/* Row 3 */}

      <div className="grid grid-cols-2 gap-6">
        <FormInput
          control={form.control}
          name="endYear"
          label="End Year"
          placeholder="2028"
          type="number"
        />

        <div />
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
