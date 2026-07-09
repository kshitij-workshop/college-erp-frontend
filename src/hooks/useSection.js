import { useEffect, useState } from "react";

import { getSections } from "@/api/sectionApi";
import { getDepartments } from "@/api/departmentApi";
import { getProgramsByDepartment } from "@/api/programApi";
import { getBatchesByProgram } from "@/api/batchApi";
import { getSemestersByBatch } from "@/api/semesterApi";

export function useSection() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");

  const [filters, setFilters] = useState({
    departmentId: "",
    programId: "",
    batchId: "",
    semesterId: "",
  });

  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [batches, setBatches] = useState([]);
  const [semesters, setSemesters] = useState([]);

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
  // Load Semesters
  // ===============================

  async function loadSemesters(batchId) {
    if (!batchId) {
      setSemesters([]);

      return;
    }

    try {
      const response = await getSemestersByBatch(batchId);

      setSemesters(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // ===============================
  // Fetch Sections
  // ===============================

  async function fetchSections() {
    try {
      setLoading(true);

      const response = await getSections();

      setSections(response.data.data);
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
        semesterId: "",
      });

      setPrograms([]);
      setBatches([]);
      setSemesters([]);

      await loadPrograms(value);

      return;
    }

    if (key === "programId") {
      setFilters((prev) => ({
        ...prev,
        programId: value,
        batchId: "",
        semesterId: "",
      }));

      setBatches([]);
      setSemesters([]);

      await loadBatches(value);

      return;
    }

    if (key === "batchId") {
      setFilters((prev) => ({
        ...prev,
        batchId: value,
        semesterId: "",
      }));

      setSemesters([]);

      await loadSemesters(value);

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
    fetchSections();
  }

  // ===============================
  // Client-side Filtering
  // ===============================

  const filteredSections = sections.filter((section) => {
    const matchesKeyword = section.name
      ?.toLowerCase()
      .includes(keyword.toLowerCase());

    const matchesSemester =
      !filters.semesterId || section.semesterId === Number(filters.semesterId);

    return matchesKeyword && matchesSemester;
  });

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {
    loadDepartments();

    fetchSections();
  }, []);

  return {
    sections: filteredSections,

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
  };
}
