import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { getTimeSlots } from "@/api/timeSlotApi";

const PAGE_SIZE = 10;

export function useTimeSlots() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [keyword, setKeyword] = useState("");

  // ===============================
  // Load Time Slots
  // ===============================

  async function loadTimeSlots() {
    try {
      setLoading(true);

      const response = await getTimeSlots();

      setTimeSlots(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load time slots");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTimeSlots();
  }, []);

  // ===============================
  // Search
  // ===============================

  const filteredTimeSlots = useMemo(() => {
    const search = keyword.trim().toLowerCase();

    return timeSlots.filter((slot) =>
      slot.label.toLowerCase().includes(search),
    );
  }, [timeSlots, keyword]);

  // ===============================
  // Pagination
  // ===============================

  const pagination = useMemo(() => {
    const totalElements = filteredTimeSlots.length;

    const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));

    const start = (page - 1) * PAGE_SIZE;

    return {
      totalElements,
      totalPages,
      data: filteredTimeSlots.slice(start, start + PAGE_SIZE),
    };
  }, [filteredTimeSlots, page]);

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  return {
    timeSlots: pagination.data,

    loading,

    page,
    setPage,

    keyword,
    setKeyword,

    pagination,

    refresh: loadTimeSlots,
  };
}
