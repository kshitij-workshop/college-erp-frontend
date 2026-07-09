import { useState } from "react";

import { Plus } from "lucide-react";

import { useBatch } from "@/hooks/useBatch";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import BatchTable from "@/components/batch/BatchTable";
import BatchDialog from "@/components/batch/BatchDialog";
import BatchViewSheet from "@/components/batch/BatchViewSheet";
import DeleteBatchDialog from "@/components/batch/DeleteBatchDialog";
import BatchSkeleton from "@/components/batch/BatchSkeleton";

export default function BatchPage() {
  const {
    batches,
    loading,

    keyword,
    setKeyword,

    filters,
    handleFilterChange,

    departments,
    programs,

    refresh,
  } = useBatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewBatchId, setViewBatchId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteBatch, setDeleteBatch] = useState(null);

  // ===========================
  // Handlers
  // ===========================

  function handleAdd() {
    setSelectedBatch(null);

    setDialogOpen(true);
  }

  function handleEdit(batch) {
    setSelectedBatch(batch);

    setDialogOpen(true);
  }

  function handleView(batch) {
    setViewBatchId(batch.id);

    setViewOpen(true);
  }

  function handleDelete(batch) {
    setDeleteBatch(batch);

    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Batches"
        description="Manage academic batches"
        buttonText="Add Batch"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search batches..."
        filters={filters}
        filterOptions={{
          departmentId: departments,
          programId: programs,
        }}
        onFilterChange={handleFilterChange}
        onRefresh={refresh}
      />

      {loading ? (
        <BatchSkeleton />
      ) : (
        <BatchTable
          batches={batches}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <BatchDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        batch={selectedBatch}
        refresh={refresh}
      />

      <BatchViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        batchId={viewBatchId}
      />

      <DeleteBatchDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        batch={deleteBatch}
        refresh={refresh}
      />
    </div>
  );
}
