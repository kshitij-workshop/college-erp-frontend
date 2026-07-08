import { useEffect, useState } from "react";

import { getPrograms } from "@/api/programApi";
import { getDepartments } from "@/api/departmentApi";

export function useProgram() {
  const [programs, setPrograms] = useState([]);

  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");

  const [departmentId, setDepartmentId] = useState("");

  const [departments, setDepartments] = useState([]);

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
  // Fetch Programs
  // ===============================

  async function fetchPrograms() {
    try {
      setLoading(true);

      const response = await getPrograms();

      setPrograms(response.data.data);
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
    fetchPrograms();
  }

  // ===============================
  // Filter
  // ===============================

  const filteredPrograms = programs.filter((program) => {
    const matchesKeyword =
      program.name?.toLowerCase().includes(keyword.toLowerCase()) ||
      program.code?.toLowerCase().includes(keyword.toLowerCase());

    const matchesDepartment =
      !departmentId || program.departmentId === Number(departmentId);

    return matchesKeyword && matchesDepartment;
  });

  // ===============================
  // Effects
  // ===============================

  useEffect(() => {
    loadDepartments();

    fetchPrograms();
  }, []);

  return {
    programs: filteredPrograms,

    loading,

    keyword,
    setKeyword,

    departmentId,
    setDepartmentId,

    departments,

    refresh,
  };
}
