import EntityDialog from "@/components/common/EntityDialog";
import StudentForm from "./StudentForm";

import { useStudentForm } from "@/hooks/useStudentForm";

export default function StudentDialog({
  open,
  onOpenChange,
  student = null,
  refresh,
}) {
  const {
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
  } = useStudentForm(student, () => {
    refresh();
    onOpenChange(false);
  });

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title={student ? "Edit Student" : "Add Student"}
      description={
        student
          ? "Update the student's information."
          : "Fill in the details to create a new student."
      }
      size="xl"
    >
      <StudentForm
        form={form}
        loading={loading}

        departments={departments}
        programs={programs}
        batches={batches}
        semesters={semesters}
        sections={sections}

        handleDepartmentChange={handleDepartmentChange}
        handleProgramChange={handleProgramChange}
        handleBatchChange={handleBatchChange}
        handleSemesterChange={handleSemesterChange}

        onSubmit={onSubmit}

        submitLabel={
          student ? "Update Student" : "Create Student"
        }
      />
    </EntityDialog>
  );
}