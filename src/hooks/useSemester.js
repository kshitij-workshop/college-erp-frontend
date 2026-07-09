import { useEffect, useState } from "react";

import { getSemesters } from "@/api/semesterApi";
import { getDepartments } from "@/api/departmentApi";
import { getProgramsByDepartment } from "@/api/programApi";
import { getBatchesByProgram } from "@/api/batchApi";

export function useSemester() {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");

  const [filters, setFilters] = useState({
    departmentId: "",
    programId: "",
    batchId: "",
  });

  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [batches, setBatches] = useState([]);

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
  // Load Batches
  // ===============================

  async function loadBatches(programId) {
    if (!programId) {
      setBatches([]);
      return;
    }

    try {
      const response = await getBatchesByProgram(programId);
      setBatches(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // ===============================
  // Fetch Semesters
  // ===============================

  async function fetchSemesters() {
    try {
      setLoading(true);

      const response = await getSemesters();

      setSemesters(response.data.data);
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
        batchId: "",
      });

      setBatches([]);

      await loadPrograms(value);

      return;
    }

    if (key === "programId") {
      setFilters((prev) => ({
        ...prev,
        programId: value,
        batchId: "",
      }));

      await loadBatches(value);

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
    fetchSemesters();
  }

  // ===============================
  // Client-side Filtering
  // ===============================

  const filteredSemesters = semesters.filter((semester) => {
    const matchesKeyword = semester.semesterNumber
      ?.toString()
      .includes(keyword);

    const matchesBatch =
      !filters.batchId || semester.batchId === Number(filters.batchId);

    return matchesKeyword && matchesBatch;
  });

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {
    loadDepartments();

    fetchSemesters();
  }, []);

  return {
    semesters: filteredSemesters,

    loading,

    keyword,
    setKeyword,

    filters,

    handleFilterChange,

    departments,
    programs,
    batches,

    refresh,
  };
}
