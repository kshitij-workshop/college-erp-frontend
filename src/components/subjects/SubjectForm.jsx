import { Button } from "@/components/ui/button";

import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";

import { SUBJECT_TYPE_OPTIONS, SEMESTER_OPTIONS } from "@/constants/options";

export default function SubjectForm({
  form,
  submitting,

  programs,

  onSubmit,

  submitLabel = "Save",
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* ================= Subject Information ================= */}

      <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold">📚 Subject Information</h3>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <FormInput
            control={form.control}
            name="name"
            label="Subject Name"
            placeholder="Data Structures"
          />

          <FormInput
            control={form.control}
            name="code"
            label="Subject Code"
            placeholder="CSE301"
          />

          <FormInput
            control={form.control}
            name="credits"
            type="number"
            label="Credits"
            placeholder="4"
          />

          <FormSelect
            control={form.control}
            name="type"
            label="Subject Type"
            placeholder="Select Subject Type"
            options={SUBJECT_TYPE_OPTIONS}
            isNumber={false}
          />
        </div>
      </div>

      {/* ================= Academic Information ================= */}

      <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold">🎓 Academic Information</h3>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <FormSelect
            control={form.control}
            name="programId"
            label="Program"
            placeholder="Select Program"
            options={programs}
          />

          <FormSelect
            control={form.control}
            name="semesterNumber"
            label="Semester"
            placeholder="Select Semester"
            options={SEMESTER_OPTIONS}
          />
        </div>
      </div>

      {/* ================= Footer ================= */}

      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <Button type="button" variant="outline">
          Cancel
        </Button>

        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
