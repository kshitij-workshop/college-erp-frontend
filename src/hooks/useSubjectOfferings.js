import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { getSubjectOfferings } from "@/api/subjectOfferingApi";
import { getAllPrograms } from "@/api/academicApi";
import { getFaculty } from "@/api/facultyApi";

const PAGE_SIZE = 10;

export function useSubjectOfferings() {
  const [subjectOfferings, setSubjectOfferings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [keyword, setKeyword] = useState("");

  const [programs, setPrograms] = useState([]);
  const [faculty, setFaculty] = useState([]);

  const [filters, setFilters] = useState({
    programId: "",
    facultyId: "",
  });

  // ===============================
  // Load Data
  // ===============================

  async function loadSubjectOfferings() {
    try {
      setLoading(true);

      const response = await getSubjectOfferings();

      setSubjectOfferings(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load subject offerings");
    } finally {
      setLoading(false);
    }
  }

  async function loadPrograms() {
    try {
      const response = await getAllPrograms();

      setPrograms(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadFaculty() {
  try {
    const response = await getFaculty();

    const facultyOptions = response.data.data.content.map((faculty) => ({
      id: faculty.id,
      name: faculty.fullName,
    }));

    setFaculty(facultyOptions);
  } catch (error) {
    console.error(error);
    toast.error("Failed to load faculty");
  }
}

  useEffect(() => {
    loadSubjectOfferings();
    loadPrograms();
    loadFaculty();
  }, []);

  // ===============================
  // Search + Filters
  // ===============================

  const filteredSubjectOfferings = useMemo(() => {
    const search = keyword.trim().toLowerCase();

    return subjectOfferings.filter((offering) => {
      const matchesKeyword =
        offering.subjectName.toLowerCase().includes(search) ||
        offering.subjectCode.toLowerCase().includes(search) ||
        offering.facultyName.toLowerCase().includes(search) ||
        offering.sectionName.toLowerCase().includes(search);

      const matchesProgram =
        !filters.programId || String(offering.programId) === filters.programId;

      const matchesFaculty =
        !filters.facultyId || String(offering.facultyId) === filters.facultyId;

      return matchesKeyword && matchesProgram && matchesFaculty;
    });
  }, [subjectOfferings, keyword, filters]);

  // ===============================
  // Pagination
  // ===============================

  const pagination = useMemo(() => {
    const totalElements = filteredSubjectOfferings.length;

    const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));

    const start = (page - 1) * PAGE_SIZE;

    return {
      totalElements,

      totalPages,

      data: filteredSubjectOfferings.slice(start, start + PAGE_SIZE),
    };
  }, [filteredSubjectOfferings, page]);

  // ===============================
  // Filters
  // ===============================

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

  // ===============================
  // Return
  // ===============================

  return {
    subjectOfferings: pagination.data,

    loading,

    page,
    setPage,

    keyword,
    setKeyword,

    filters,
    handleFilterChange,

    pagination,

    programs,
    faculty,

    refresh: loadSubjectOfferings,
  };
}
