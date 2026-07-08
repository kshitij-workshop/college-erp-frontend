import { Button } from "@/components/ui/button";

import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";

export default function FacultyForm({
  form,
  loading,

  departments,

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
            placeholder="Rahul Kumar"
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

          <FormSelect
            control={form.control}
            name="gender"
            label="Gender"
            placeholder="Select Gender"
            isNumber={false}
            options={[
              {
                id: "MALE",
                name: "Male",
              },
              {
                id: "FEMALE",
                name: "Female",
              },
              {
                id: "OTHER",
                name: "Other",
              },
            ]}
          />

          <FormInput
            control={form.control}
            name="dateOfBirth"
            type="date"
            label="Date of Birth"
          />

          <FormSelect
            control={form.control}
            name="bloodGroup"
            label="Blood Group"
            placeholder="Select Blood Group"
            isNumber={false}
            options={[
              { id: "A+", name: "A+" },
              { id: "A-", name: "A-" },
              { id: "B+", name: "B+" },
              { id: "B-", name: "B-" },
              { id: "AB+", name: "AB+" },
              { id: "AB-", name: "AB-" },
              { id: "O+", name: "O+" },
              { id: "O-", name: "O-" },
            ]}
          />

          <div className="lg:col-span-2">
            <FormInput
              control={form.control}
              name="address"
              label="Address"
              placeholder="Enter complete address"
            />
          </div>
        </div>
      </div>

      {/* ================= Professional Information ================= */}

      <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-6 shadow-sm">
        <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
          🎓 Professional Information
        </h3>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <FormSelect
            control={form.control}
            name="departmentId"
            label="Department"
            placeholder="Select Department"
            options={departments}
            isNumber={true}
          />

          <FormSelect
            control={form.control}
            name="designation"
            label="Designation"
            placeholder="Select Designation"
            isNumber={false}
            options={[
              {
                id: "PROFESSOR",
                name: "Professor",
              },
              {
                id: "ASSOCIATE_PROFESSOR",
                name: "Associate Professor",
              },
              {
                id: "ASSISTANT_PROFESSOR",
                name: "Assistant Professor",
              },
              {
                id: "LECTURER",
                name: "Lecturer",
              },
              {
                id: "HOD",
                name: "Head of Department",
              },
            ]}
          />

          <FormInput
            control={form.control}
            name="qualification"
            label="Qualification"
            placeholder="M.Tech / Ph.D"
          />

          <FormInput
            control={form.control}
            name="specialization"
            label="Specialization"
            placeholder="Artificial Intelligence"
          />

          <FormInput
            control={form.control}
            name="experienceYears"
            type="number"
            label="Experience (Years)"
            placeholder="5"
          />

          <FormInput
            control={form.control}
            name="joiningDate"
            type="date"
            label="Joining Date"
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
