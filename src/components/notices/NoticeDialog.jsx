import { useEffect, useState } from "react";
import { toast } from "sonner";
import EntityDialog from "@/components/common/EntityDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNotice, updateNotice } from "@/api/noticeApi";
import {
  getAllPrograms,
  getAllSections,
  getDepartments,
} from "@/api/academicApi";

const blank = {
  title: "",
  content: "",
  noticeType: "GENERAL",
  audience: "ALL",
  departmentId: "",
  programId: "",
  sectionId: "",
  expiryDate: "",
};
const audienceLabel = {
  DEPARTMENT: "Department",
  PROGRAM: "Program",
  SECTION: "Section",
};

export default function NoticeDialog({ open, onOpenChange, notice, refresh }) {
  const [values, setValues] = useState(
    notice
      ? {
          ...blank,
          ...notice,
          departmentId: String(notice.departmentId ?? ""),
          programId: String(notice.programId ?? ""),
          sectionId: String(notice.sectionId ?? ""),
          expiryDate: notice.expiryDate ?? "",
        }
      : blank,
  );
  const [options, setOptions] = useState({
    departments: [],
    programs: [],
    sections: [],
  });
  const [saving, setSaving] = useState(false);
  const editing = Boolean(notice);
  const set = (key, value) =>
    setValues((current) => ({ ...current, [key]: value }));
  useEffect(() => {
    Promise.all([getDepartments(), getAllPrograms(), getAllSections()])
      .then(([departments, programs, sections]) =>
        setOptions({
          departments: departments.data.data ?? [],
          programs: programs.data.data ?? [],
          sections: sections.data.data ?? [],
        }),
      )
      .catch(() => toast.error("Failed to load notice audience options"));
  }, []);
  const targetKey =
    values.audience === "DEPARTMENT"
      ? "departmentId"
      : values.audience === "PROGRAM"
        ? "programId"
        : values.audience === "SECTION"
          ? "sectionId"
          : null;
  const targetOptions =
    targetKey === "departmentId"
      ? options.departments
      : targetKey === "programId"
        ? options.programs
        : options.sections;
  async function submit(event) {
    event.preventDefault();
    if (
      !values.title.trim() ||
      !values.content.trim() ||
      (targetKey && !values[targetKey])
    )
      return toast.error(
        targetKey
          ? `Select a ${audienceLabel[values.audience].toLowerCase()}`
          : "Title and content are required",
      );
    const payload = {
      title: values.title.trim(),
      content: values.content.trim(),
      noticeType: values.noticeType,
      audience: values.audience,
      departmentId:
        values.audience === "DEPARTMENT" ? Number(values.departmentId) : null,
      programId:
        values.audience === "PROGRAM" ? Number(values.programId) : null,
      sectionId:
        values.audience === "SECTION" ? Number(values.sectionId) : null,
      expiryDate: values.expiryDate || null,
    };
    try {
      setSaving(true);
      if (editing) await updateNotice(notice.id, payload);
      else await createNotice(payload);
      toast.success(
        editing
          ? "Notice updated successfully"
          : "Notice published successfully",
      );
      await refresh();
      onOpenChange(false);
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to save notice");
    } finally {
      setSaving(false);
    }
  }
  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      title={editing ? "Edit Notice" : "Publish Notice"}
      description="Choose who should receive this notice."
      size="lg"
    >
      <form onSubmit={submit} className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium">Title</span>
          <Input
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Important announcement"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Content</span>
          <Textarea
            value={values.content}
            onChange={(e) => set("content", e.target.value)}
            rows={6}
            placeholder="Write the notice details"
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">Notice type</span>
            <Select
              value={values.noticeType}
              onValueChange={(value) => set("noticeType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "GENERAL",
                  "EXAM",
                  "FEE",
                  "HOLIDAY",
                  "EVENT",
                  "DEPARTMENT",
                  "PLACEMENT",
                  "LIBRARY",
                ].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Audience</span>
            <Select
              value={values.audience}
              onValueChange={(value) => set("audience", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "ALL",
                  "STUDENTS",
                  "FACULTY",
                  "DEPARTMENT",
                  "PROGRAM",
                  "SECTION",
                ].map((audience) => (
                  <SelectItem key={audience} value={audience}>
                    {audience}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          {targetKey && (
            <label className="space-y-2">
              <span className="text-sm font-medium">
                {audienceLabel[values.audience]}
              </span>
              <Select
                value={values[targetKey]}
                onValueChange={(value) => set(targetKey, value)}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={`Select ${audienceLabel[values.audience].toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {targetOptions.map((option) => (
                    <SelectItem key={option.id} value={String(option.id)}>
                      {option.name ??
                        option.code ??
                        `${option.programName ?? ""} ${option.name ?? ""}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          )}
          <label className="space-y-2">
            <span className="text-sm font-medium">
              Expiry date{" "}
              <span className="text-muted-foreground">(optional)</span>
            </span>
            <Input
              type="date"
              value={values.expiryDate}
              onChange={(e) => set("expiryDate", e.target.value)}
            />
          </label>
        </div>
        <div className="flex justify-end gap-3 border-t pt-5">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button disabled={saving}>
            {saving ? "Saving..." : editing ? "Save Changes" : "Publish Notice"}
          </Button>
        </div>
      </form>
    </EntityDialog>
  );
}
