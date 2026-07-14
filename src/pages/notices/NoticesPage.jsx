import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/common/PageHeader";
import EntityToolbar from "@/components/common/EntityToolbar";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import NoticeDialog from "@/components/notices/NoticeDialog";
import NoticeTable from "@/components/notices/NoticeTable";
import { useNotices } from "@/hooks/useNotices";
import { deactivateNotice, deleteNotice } from "@/api/noticeApi";
import { useAuth } from "@/hooks/useAuth";

export default function NoticesPage() {
  const { user } = useAuth();
  const {
    notices,
    loading,
    keyword,
    setKeyword,
    filters,
    setFilters,
    refresh,
  } = useNotices();
  const [dialog, setDialog] = useState({ open: false, notice: null, key: 0 });
  const [action, setAction] = useState(null);
  const canManage = ["ADMIN", "FACULTY", "HOD"].includes(user?.role);
  const canDelete = user?.role === "ADMIN";
  function openCreate() {
    setDialog((current) => ({
      open: true,
      notice: null,
      key: current.key + 1,
    }));
  }
  function openEdit(notice) {
    setDialog((current) => ({ open: true, notice, key: current.key + 1 }));
  }
  async function executeAction() {
    try {
      if (action.type === "deactivate")
        await deactivateNotice(action.notice.id);
      else await deleteNotice(action.notice.id);
      toast.success(
        action.type === "deactivate"
          ? "Notice deactivated successfully"
          : "Notice deleted successfully",
      );
      await refresh();
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to update notice");
    } finally {
      setAction(null);
    }
  }
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notices"
        description="Publish and manage announcements for your college."
        buttonText={canManage ? "Publish Notice" : undefined}
        buttonIcon={Plus}
        onButtonClick={openCreate}
      />
      <EntityToolbar
        search={keyword}
        onSearchChange={setKeyword}
        placeholder="Search notices or authors..."
        filters={filters}
        filterConfig={{
          noticeType: {
            label: "Type",
            options: [
              "GENERAL",
              "EXAM",
              "FEE",
              "HOLIDAY",
              "EVENT",
              "DEPARTMENT",
              "PLACEMENT",
              "LIBRARY",
            ].map((id) => ({ id, name: id })),
          },
          audience: {
            label: "Audience",
            options: [
              "ALL",
              "STUDENTS",
              "FACULTY",
              "DEPARTMENT",
              "PROGRAM",
              "SECTION",
            ].map((id) => ({ id, name: id })),
          },
        }}
        onFilterChange={(key, value) =>
          setFilters((current) => ({ ...current, [key]: value }))
        }
        onRefresh={refresh}
      />
      {loading ? (
        <div className="rounded-2xl border bg-white py-20 text-center text-muted-foreground">
          Loading notices...
        </div>
      ) : (
        <NoticeTable
          notices={notices}
          canManage={canManage}
          canDelete={canDelete}
          onEdit={openEdit}
          onDeactivate={(notice) => setAction({ type: "deactivate", notice })}
          onDelete={(notice) => setAction({ type: "delete", notice })}
        />
      )}
      <NoticeDialog
        key={dialog.key}
        open={dialog.open}
        onOpenChange={(open) => setDialog((current) => ({ ...current, open }))}
        notice={dialog.notice}
        refresh={refresh}
      />
      <ConfirmDialog
        open={Boolean(action)}
        onOpenChange={(open) => !open && setAction(null)}
        title={
          action?.type === "deactivate"
            ? "Deactivate notice?"
            : "Delete notice?"
        }
        description={
          action?.type === "deactivate"
            ? "This notice will no longer be visible to recipients."
            : "This notice will be permanently removed."
        }
        confirmText={action?.type === "deactivate" ? "Deactivate" : "Delete"}
        onConfirm={executeAction}
      />
    </div>
  );
}
