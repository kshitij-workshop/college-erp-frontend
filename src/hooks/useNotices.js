import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getNotices } from "@/api/noticeApi";

export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({ noticeType: "", audience: "" });
  async function refresh() {
    try {
      setLoading(true);
      const response = await getNotices();
      setNotices(response.data.data ?? []);
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Failed to load notices");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const id = window.setTimeout(refresh, 0);
    return () => window.clearTimeout(id);
  }, []);
  const filteredNotices = useMemo(() => {
    const search = keyword.trim().toLowerCase();
    return notices.filter(
      (notice) =>
        (!search ||
          [notice.title, notice.content, notice.createdByName]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(search))) &&
        (!filters.noticeType || notice.noticeType === filters.noticeType) &&
        (!filters.audience || notice.audience === filters.audience),
    );
  }, [notices, keyword, filters]);
  return {
    notices: filteredNotices,
    loading,
    keyword,
    setKeyword,
    filters,
    setFilters,
    refresh,
  };
}
