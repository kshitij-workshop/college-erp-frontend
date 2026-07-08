import { useEffect, useState } from "react";

import { getDepartments } from "@/api/departmentApi";

export function useDepartment() {

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");

  // ===============================
  // Fetch Departments
  // ===============================

  async function fetchDepartments() {

    try {

      setLoading(true);

      const response = await getDepartments();

      setDepartments(response.data.data);

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

    fetchDepartments();

  }

  // ===============================
  // Search
  // ===============================

  const filteredDepartments = departments.filter((department) =>

    department.name
      ?.toLowerCase()
      .includes(keyword.toLowerCase()) ||

    department.code
      ?.toLowerCase()
      .includes(keyword.toLowerCase())

  );

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {

    fetchDepartments();

  }, []);

  return {

    departments: filteredDepartments,

    loading,

    keyword,

    setKeyword,

    refresh,

  };

}