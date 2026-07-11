import { useState } from "react";
import { Plus } from "lucide-react";

import { useTimeSlots } from "@/hooks/useTimeSlots";

import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";

import TimeSlotTable from "@/components/time-slots/TimeSlotTable";
import TimeSlotDialog from "@/components/time-slots/TimeSlotDialog";
import TimeSlotViewSheet from "@/components/time-slots/TimeSlotViewSheet";
import DeleteTimeSlotDialog from "@/components/time-slots/DeleteTimeSlotDialog";
import TimeSlotPagination from "@/components/time-slots/TimeSlotPagination";
import TimeSlotSkeleton from "@/components/time-slots/TimeSlotSkeleton";

export default function TimeSlotsPage() {
  const {
    timeSlots,
    loading,

    page,
    setPage,

    keyword,
    setKeyword,

    pagination,

    refresh,
  } = useTimeSlots();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewTimeSlotId, setViewTimeSlotId] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTimeSlot, setDeleteTimeSlot] = useState(null);

  // ==========================================
  // Handlers
  // ==========================================

  function handleAdd() {
    setSelectedTimeSlot(null);
    setDialogOpen(true);
  }

  function handleEdit(timeSlot) {
    setSelectedTimeSlot(timeSlot);
    setDialogOpen(true);
  }

  function handleView(timeSlot) {
    setViewTimeSlotId(timeSlot.id);
    setViewOpen(true);
  }

  function handleDelete(timeSlot) {
    setDeleteTimeSlot(timeSlot);
    setDeleteOpen(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <PageHeader
        title="Time Slots"
        description="Manage class time slots"
        buttonText="Add Time Slot"
        buttonIcon={Plus}
        onButtonClick={handleAdd}
      />

      {/* Toolbar */}

      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search time slots..."
        onRefresh={refresh}
      />

      {/* Table */}

      {loading ? (
        <TimeSlotSkeleton />
      ) : (
        <TimeSlotTable
          timeSlots={timeSlots}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}

      <TimeSlotPagination
        page={page}
        setPage={setPage}
        totalPages={pagination.totalPages}
        totalElements={pagination.totalElements}
      />

      {/* Add / Edit */}

      <TimeSlotDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        timeSlot={selectedTimeSlot}
        refresh={refresh}
      />

      {/* View */}

      <TimeSlotViewSheet
        open={viewOpen}
        onOpenChange={setViewOpen}
        timeSlotId={viewTimeSlotId}
      />

      {/* Delete */}

      <DeleteTimeSlotDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        timeSlot={deleteTimeSlot}
        refresh={refresh}
      />
    </div>
  );
}
