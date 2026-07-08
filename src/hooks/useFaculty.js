import { useEffect, useState } from "react";

import { getFaculty } from "@/api/facultyApi";
import { getDepartments } from "@/api/academicApi";

export function useFaculty() {

  const [faculty, setFaculty] = useState([]);
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
    designation: "",
    status: "",
});

  // ===============================
  // Dropdown Data
  // ===============================

  const [departments, setDepartments] = useState([]);

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
  // Fetch Faculty
  // ===============================

  async function fetchFaculty() {

    try {

      setLoading(true);

      const response = await getFaculty({

        page,

        size,

        search: keyword,

        ...filters,

      });

      const data = response.data.data;

      setFaculty(data.content);

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

    fetchFaculty();

  }

  // ===============================
  // Effects
  // ===============================

  useEffect(() => {

    loadDepartments();

  }, []);

  useEffect(() => {

    fetchFaculty();

  }, [page, keyword, filters]);

  // ===============================
  // Return
  // ===============================

  return {

    faculty,

    loading,

    page,

    setPage,

    keyword,

    setKeyword,

    pagination,

    filters,

    handleFilterChange,

    departments,

    refresh,

  };

}