import { GraduationCap, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";
import FormTextarea from "@/components/common/form/FormTextarea";

import {
  GENDER_OPTIONS,
  BLOOD_GROUP_OPTIONS,
  STUDENT_STATUS_OPTIONS,
} from "@/constants/options";

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
  onCancel,

  submitLabel = "Save Student",
}) {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 p-8"
    >
      {/* ================= Personal Information ================= */}

      <Card>

        <CardHeader>

          <CardTitle className="flex items-center gap-2">

            <User className="h-5 w-5 text-primary" />

            Personal Information

          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-6">

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <FormInput
              control={form.control}
              name="fullName"
              label="Full Name"
              placeholder="Enter full name"
            />

            <FormInput
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="student@example.com"
            />

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <FormInput
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="9876543210"
            />

            <FormSelect
              control={form.control}
              name="gender"
              label="Gender"
              placeholder="Select gender"
              options={GENDER_OPTIONS}
              isNumber={false}
            />

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <FormSelect
              control={form.control}
              name="bloodGroup"
              label="Blood Group"
              placeholder="Select blood group"
              options={BLOOD_GROUP_OPTIONS}
              isNumber={false}
            />

            <FormInput
              control={form.control}
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
            />

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <FormInput
              control={form.control}
              name="guardianName"
              label="Guardian Name"
              placeholder="Enter guardian name"
            />

            <FormInput
              control={form.control}
              name="guardianPhone"
              label="Guardian Phone"
              placeholder="9876543210"
            />

          </div>

          <FormInput
            control={form.control}
            name="guardianRelation"
            label="Guardian Relation"
            placeholder="Father / Mother / Guardian"
          />

          <FormTextarea
            control={form.control}
            name="address"
            label="Address"
            placeholder="Enter complete address"
            rows={3}
          />

        </CardContent>

      </Card>

      {/* ================= Academic Information ================= */}

      <Card>

        <CardHeader>

          <CardTitle className="flex items-center gap-2">

            <GraduationCap className="h-5 w-5 text-primary" />

            Academic Information

          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-6">

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <FormSelect
              control={form.control}
              name="departmentId"
              label="Department"
              placeholder="Select department"
              options={departments}
              onValueChange={handleDepartmentChange}
            />

            <FormSelect
              control={form.control}
              name="programId"
              label="Program"
              placeholder="Select program"
              options={programs}
              onValueChange={handleProgramChange}
            />

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <FormSelect
              control={form.control}
              name="batchId"
              label="Batch"
              placeholder="Select batch"
              options={batches}
              onValueChange={handleBatchChange}
            />

            <FormSelect
              control={form.control}
              name="semesterId"
              label="Semester"
              placeholder="Select semester"
              options={semesters}
              getOptionLabel={(semester) =>
                `Semester ${semester.semesterNumber}`
              }
              onValueChange={handleSemesterChange}
            />

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <FormSelect
              control={form.control}
              name="sectionId"
              label="Section"
              placeholder="Select section"
              options={sections}
            />

            <FormSelect
              control={form.control}
              name="status"
              label="Status"
              placeholder="Select status"
              options={STUDENT_STATUS_OPTIONS}
              isNumber={false}
            />

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <FormInput
              control={form.control}
              name="rollNumber"
              label="Roll Number"
              placeholder="24CSE001"
            />

            <FormInput
              control={form.control}
              name="registrationNumber"
              label="Registration Number"
              placeholder="24105157105"
            />

          </div>

          <FormInput
            control={form.control}
            name="admissionDate"
            label="Admission Date"
            type="date"
          />

        </CardContent>

      </Card>

      {/* ================= Footer ================= */}

      <div className="flex justify-end gap-3 border-t pt-6">

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : submitLabel}
        </Button>

      </div>

    </form>
  );
}