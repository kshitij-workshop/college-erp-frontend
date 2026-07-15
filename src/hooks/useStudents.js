import { useEffect, useState } from "react";

import { getStudents } from "@/api/studentApi";
import { getDepartments } from "@/api/academicApi";
import { getAllSemesters } from "@/api/academicApi";
import { getPrograms } from "@/api/academicApi";
import { getBatches } from "@/api/academicApi";

export function useStudents() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const size = 10;

  const [keyword, setKeyword] = useState("");

  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
  });

  // ===============================
  // Filters
  // ===============================

  const [filters, setFilters] = useState({
    departmentId: "",
    programId: "",
    batchId: "",
    semesterId: "",
    sectionId: "",
    status: "",
  });

  // ===============================
  // Dropdown Data
  // ===============================

  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [batches, setBatches] = useState([]);

  // ===============================
  // Filter Change
  // ===============================

  const handleFilterChange = (key, value) => {

    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    setPage(0);

  };

  
  // ===============================
  // Load Programs
  // ===============================

  async function loadPrograms(departmentId) {

    try {

      const response = await getPrograms(departmentId);

      setPrograms(response.data.data);

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {

    if (filters.departmentId) {

      loadPrograms(filters.departmentId);

    } else {

      setPrograms([]);

    }

  }, [filters.departmentId]);

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

  useEffect(() => {
  async function loadSemesters() {
    const res = await getAllSemesters(); // or your API
    setSemesters(res.data.data);
  }

  loadSemesters();
}, []);

async function loadBatches(programId) {

    try {

      const response = await getBatches(programId);

      setBatches(response.data.data);

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {

    if (filters.programId) {

      loadBatches(filters.programId);

    } else {

      setBatches([]);

    }

  }, [filters.programId]);

  // ===============================
  // Fetch Students
  // ===============================

  async function fetchStudents() {

    try {

      setLoading(true);

      const response = await getStudents({

        page,

        size,

        keyword,

        ...filters,

      });

      const data = response.data.data;

      setStudents(data.content);

      setPagination({

        totalPages: data.totalPages,

        totalElements: data.totalElements,

      });

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  // ===============================
  // Refresh
  // ===============================

  function refresh() {

    fetchStudents();

  }

  // ===============================
  // Effects
  // ===============================

  useEffect(() => {

    loadDepartments();

  }, []);

  useEffect(() => {

    fetchStudents();

  }, [page, keyword, filters]);

  // ===============================
  // Return
  // ===============================

  return {

    students,

    loading,

    page,

    setPage,

    keyword,

    setKeyword,

    pagination,

    filters,

    handleFilterChange,

    departments,
    semesters,
    programs,
    batches, 

    refresh,

  };

}