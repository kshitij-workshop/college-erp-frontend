import { Button } from "@/components/ui/button";

import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";

export default function StudentForm({
  form,
  loading,

  departments,
  programs,
  batches,
  semesters,
  sections,

  handleDepartmentChange,
  handleProgramChange,
  handleBatchChange,
  handleSemesterChange,

  onSubmit,

  submitLabel = "Save",
}) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* ================= Personal Information ================= */}

      <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6 shadow-sm">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
          👤 Personal Information
        </h3>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <FormInput
            control={form.control}
            name="fullName"
            label="Full Name"
            placeholder="Rahul Sharma"
          />

          <FormInput
            control={form.control}
            name="email"
            type="email"
            label="Email"
            placeholder="rahul@gmail.com"
          />

          <FormInput
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="9876543210"
          />

          <FormInput
            control={form.control}
            name="guardianName"
            label="Guardian Name"
            placeholder="Father Name"
          />

          <FormInput
            control={form.control}
            name="guardianPhone"
            label="Guardian Phone"
            placeholder="9876543210"
          />

          <FormInput
            control={form.control}
            name="guardianRelation"
            label="Guardian Relation"
            placeholder="Father"
          />
        </div>
      </div>

      {/* ================= Academic Information ================= */}

      <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6 shadow-sm">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
          🎓 Academic Information
        </h3>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
            getOptionLabel={(semester) => `Semester ${semester.semesterNumber}`}
            onValueChange={handleSemesterChange}
          />

          <FormSelect
            control={form.control}
            name="sectionId"
            label="Section"
            placeholder="Select Section"
            options={sections}
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
