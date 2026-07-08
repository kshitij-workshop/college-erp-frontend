import EntityDialog from "@/components/common/EntityDialog";
import FacultyForm from "./FacultyForm";

import { useFacultyForm } from "@/hooks/useFacultyForm";

export default function FacultyDialog({
  open,
  onOpenChange,
  faculty = null,
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
  } = useFacultyForm(faculty, () => {
    refresh();
    onOpenChange(false);
  });

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title={faculty ? "Edit Faculty" : "Add Faculty"}
      description={
        faculty
          ? "Update the faculty's information."
          : "Fill in the details to create a new faculty."
      }
      size="xl"
    >
      <FacultyForm
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
          faculty ? "Update Faculty" : "Create Faculty"
        }
      />
    </EntityDialog>
  );
}