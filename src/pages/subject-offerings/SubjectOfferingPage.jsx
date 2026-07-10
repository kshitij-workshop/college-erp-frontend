import { useState } from "react";
import { Plus } from "lucide-react";

import { useSubjectOfferings } from "@/hooks/useSubjectOfferings";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import SubjectOfferingTable from "@/components/subject-offerings/SubjectOfferingTable";
import SubjectOfferingDialog from "@/components/subject-offerings/SubjectOfferingDialog";
import SubjectOfferingViewSheet from "@/components/subject-offerings/SubjectOfferingViewSheet";
import DeleteSubjectOfferingDialog from "@/components/subject-offerings/DeleteSubjectOfferingDialog";
import SubjectOfferingPagination from "@/components/subject-offerings/SubjectOfferingPagination";
import SubjectOfferingSkeleton from "@/components/subject-offerings/SubjectOfferingSkeleton";

export default function SubjectOfferingPage() {
  const {
    subjectOfferings,
    loading,

    page,
    setPage,

    keyword,
    setKeyword,

    pagination,

    filters,
    handleFilterChange,

    programs,
    faculty,
    sections,
    refresh,
  } = useSubjectOfferings();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSubjectOffering, setSelectedSubjectOffering] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewSubjectOfferingId, setViewSubjectOfferingId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteSubjectOffering, setDeleteSubjectOffering] = useState(null);

  // ===========================
  // Handlers
  // ===========================

  function handleAdd() {
    setSelectedSubjectOffering(null);

    setDialogOpen(true);
  }

  function handleEdit(subjectOffering) {
    setSelectedSubjectOffering(subjectOffering);

    setDialogOpen(true);
  }

  function handleView(subjectOffering) {
    setViewSubjectOfferingId(subjectOffering.id);

    setViewOpen(true);
  }

  function handleDelete(subjectOffering) {
    setDeleteSubjectOffering(subjectOffering);

    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <PageHeader
        title="Subject Offerings"
        description="Assign faculty members to subjects for each section."
        buttonText="Add Subject Offering"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      {/* Toolbar */}

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search subject, faculty or section..."
        filters={filters}
        filterOptions={{
          programId: programs,

          facultyId: faculty,
        }}
        onFilterChange={handleFilterChange}
        onRefresh={refresh}
      />

      {/* Table */}

      {loading ? (
        <SubjectOfferingSkeleton />
      ) : (
        <SubjectOfferingTable
          subjectOfferings={subjectOfferings}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}

      <SubjectOfferingPagination
        page={page}
        setPage={setPage}
        totalPages={pagination.totalPages}
        totalElements={pagination.totalElements}
      />

      {/* Add / Edit */}

      <SubjectOfferingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        subjectOffering={selectedSubjectOffering}
        refresh={refresh}
      />

      {/* View */}

      <SubjectOfferingViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        subjectOfferingId={viewSubjectOfferingId}
      />

      {/* Delete */}

      <DeleteSubjectOfferingDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        subjectOffering={deleteSubjectOffering}
        refresh={refresh}
      />
    </div>
  );
}
