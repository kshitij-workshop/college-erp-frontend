import { Button } from "@/components/ui/button";
import FormInput from "@/components/common/form/FormInput";

export default function DepartmentForm({
  form,
  loading,
  onSubmit,
  submitLabel = "Save",
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-6 px-8 py-6">
        {/* Name + Code */}
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="name"
            label="Department Name"
            placeholder="Computer Science & Engineering"
          />

          <FormInput
            control={form.control}
            name="code"
            label="Department Code"
            placeholder="CSE"
          />
        </div>

        {/* Description */}
        <FormInput
          control={form.control}
          name="description"
          label="Description"
          placeholder="Enter department description"
        />
      </div>

      {/* Button */}
      <div className="flex justify-end gap-4 border-t px-8 py-6">
        <Button type="button" variant="outline">
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}