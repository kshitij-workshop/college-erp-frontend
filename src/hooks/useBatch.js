import { useEffect, useState } from "react";

import { getBatches } from "@/api/batchApi";
import { getDepartments } from "@/api/departmentApi";
import { getProgramsByDepartment } from "@/api/programApi";

export function useBatch() {
  const [batches, setBatches] = useState([]);

  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");

  const [filters, setFilters] = useState({
    departmentId: "",
    programId: "",
  });

  const [departments, setDepartments] = useState([]);

  const [programs, setPrograms] = useState([]);

  // ===============================
  // Load Departments
  // ===============================

  async function loadDepartments() {
    try {
      const response = await getDepartments();

      setDepartments(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // ===============================
  // Load Programs
  // ===============================

  async function loadPrograms(departmentId) {
    if (!departmentId) {
      setPrograms([]);

      return;
    }

    try {
      const response = await getProgramsByDepartment(departmentId);

      setPrograms(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // ===============================
  // Fetch Batches
  // ===============================

  async function fetchBatches() {
    try {
      setLoading(true);

      const response = await getBatches();

      setBatches(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ===============================
  // Filter Change
  // ===============================

  async function handleFilterChange(key, value) {
    if (key === "departmentId") {
      setFilters({
        departmentId: value,

        programId: "",
      });

      await loadPrograms(value);

      return;
    }

    setFilters((prev) => ({
      ...prev,

      [key]: value,
    }));
  }

  // ===============================
  // Refresh
  // ===============================

  function refresh() {
    fetchBatches();
  }

  // ===============================
  // Client-side Filtering
  // ===============================

  const filteredBatches = batches.filter((batch) => {
    const matchesKeyword = batch.name
      ?.toLowerCase()
      .includes(keyword.toLowerCase());

    const matchesProgram =
      !filters.programId || batch.programId === Number(filters.programId);

    return matchesKeyword && matchesProgram;
  });

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {
    loadDepartments();

    fetchBatches();
  }, []);

  return {
    batches: filteredBatches,

    loading,

    keyword,
    setKeyword,

    filters,

    handleFilterChange,

    departments,

    programs,

    refresh,
  };
}
