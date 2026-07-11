import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { getRooms } from "@/api/roomApi";

const PAGE_SIZE = 10;

export function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [keyword, setKeyword] = useState("");

  const [filters, setFilters] = useState({
    roomType: "",
    active: "",
  });

  // ==========================================
  // Load Rooms
  // ==========================================

  async function loadRooms() {
    try {
      setLoading(true);

      const response = await getRooms();

      setRooms(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRooms();
  }, []);

  // ==========================================
  // Search + Filters
  // ==========================================

  const filteredRooms = useMemo(() => {
    const search = keyword.trim().toLowerCase();

    return rooms.filter((room) => {
      const matchesKeyword = room.roomNumber.toLowerCase().includes(search);

      const matchesRoomType =
        !filters.roomType || room.roomType === filters.roomType;

      const matchesStatus =
        filters.active === ""
          ? true
          : room.active === (filters.active === "true");

      return matchesKeyword && matchesRoomType && matchesStatus;
    });
  }, [rooms, keyword, filters]);

  // ==========================================
  // Pagination
  // ==========================================

  const pagination = useMemo(() => {
    const totalElements = filteredRooms.length;

    const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));

    const start = (page - 1) * PAGE_SIZE;

    return {
      totalElements,
      totalPages,
      data: filteredRooms.slice(start, start + PAGE_SIZE),
    };
  }, [filteredRooms, page]);

  // ==========================================
  // Filters
  // ==========================================

  function handleFilterChange(name, value) {
    setPage(1);

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  // ==========================================
  // Return
  // ==========================================

  return {
    rooms: pagination.data,

    loading,

    page,
    setPage,

    keyword,
    setKeyword,

    filters,
    handleFilterChange,

    pagination,

    refresh: loadRooms,
  };
}
