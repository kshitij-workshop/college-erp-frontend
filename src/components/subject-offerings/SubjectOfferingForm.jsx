import { Button } from "@/components/ui/button";

import FormSelect from "@/components/common/form/FormSelect";
import FormInput from "../common/form/FormInput";

export default function SubjectOfferingForm({
  form,
  loading,

  subjects,
  faculty,
  sections,

  onSubmit,

  submitLabel = "Save",
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* ================= Subject Offering ================= */}

      <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold">📘 Subject Offering</h3>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <FormSelect
            control={form.control}
            name="subjectId"
            label="Subject"
            placeholder="Select Subject"
            options={subjects}
            getOptionLabel={(subject) => `${subject.code} • ${subject.name}`}
          />

          <FormSelect
            control={form.control}
            name="facultyId"
            label="Faculty"
            placeholder="Select Faculty"
            options={faculty}
            getOptionLabel={(faculty) => faculty.fullName}
          />

          <FormSelect
            control={form.control}
            name="sectionId"
            label="Section"
            placeholder="Select Section"
            options={sections}
            getOptionLabel={(section) =>
              `${section.programName} • Sem ${section.semesterNumber} • ${section.name}`
            }
          />

          <FormInput
            control={form.control}
            name="academicSession"
            label="Academic Session"
            placeholder="2025-26"
            getOptionLabel={(option) => option.name}
          />
        </div>
      </div>

      {/* ================= Footer ================= */}

      <div className="flex items-center justify-end gap-3 border-t pt-6">
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
