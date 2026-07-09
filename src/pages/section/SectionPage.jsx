import { useState } from "react";

import { Plus } from "lucide-react";

import { useSection } from "@/hooks/useSection";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import SectionTable from "@/components/section/SectionTable";
import SectionDialog from "@/components/section/SectionDialog";
import SectionViewSheet from "@/components/section/SectionViewSheet";
import DeleteSectionDialog from "@/components/section/DeleteSectionDialog";
import SectionSkeleton from "@/components/section/SectionSkeleton";

export default function SectionPage() {
  const {
    sections,
    loading,

    keyword,
    setKeyword,

    filters,
    handleFilterChange,

    departments,
    programs,
    batches,
    semesters,

    refresh,
  } = useSection();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewSectionId, setViewSectionId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteSection, setDeleteSection] = useState(null);

  function handleAdd() {
    setSelectedSection(null);

    setDialogOpen(true);
  }

  function handleEdit(section) {
    setSelectedSection(section);

    setDialogOpen(true);
  }

  function handleView(section) {
    setViewSectionId(section.id);

    setViewOpen(true);
  }

  function handleDelete(section) {
    setDeleteSection(section);

    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sections"
        description="Manage academic sections"
        buttonText="Add Section"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search sections..."
        filters={filters}
        filterOptions={{
          departmentId: departments,
          programId: programs,
          batchId: batches,
          semesterId: semesters,
        }}
        onFilterChange={handleFilterChange}
        onRefresh={refresh}
      />

      {loading ? (
        <SectionSkeleton />
      ) : (
        <SectionTable
          sections={sections}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <SectionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        section={selectedSection}
        refresh={refresh}
      />

      <SectionViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        sectionId={viewSectionId}
      />

      <DeleteSectionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        section={deleteSection}
        refresh={refresh}
      />
    </div>
  );
}
