import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { getSubjects } from "@/api/subjectApi";
import { getAllPrograms } from "@/api/academicApi";

const PAGE_SIZE = 10;

export function useSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [keyword, setKeyword] = useState("");

  const [filters, setFilters] = useState({
    programId: "",
    semesterNumber: "",
  });

  const [programs, setPrograms] = useState([]);

  async function loadPrograms() {
    try {
      const response = await getAllPrograms();
      setPrograms(response.data.data);
    } catch (error) {
      toast.error("Failed to load programs");
    }
  }

  useEffect(() => {
    loadPrograms();
  }, []);

  async function fetchSubjects() {
    try {
      setLoading(true);

      const response = await getSubjects();

      setSubjects(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubjects();
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const search = keyword.trim().toLowerCase();

      const matchesKeyword =
        subject.name.toLowerCase().includes(search) ||
        subject.code.toLowerCase().includes(search);

      const matchesProgram =
        !filters.programId ||
        String(subject.programId) === filters.programId;

      const matchesSemester =
        !filters.semesterNumber ||
        String(subject.semesterNumber) === filters.semesterNumber;

      return matchesKeyword && matchesProgram && matchesSemester;
    });
  }, [subjects, keyword, filters]);

  const pagination = useMemo(() => {
    const totalElements = filteredSubjects.length;

    const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));

    const start = (page - 1) * PAGE_SIZE;

    const end = start + PAGE_SIZE;

    return {
      totalElements,

      totalPages,

      data: filteredSubjects.slice(start, end),
    };
  }, [filteredSubjects, page]);

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

  return {
    subjects: pagination.data,

    loading,

    page,
    setPage,

    keyword,
    setKeyword,

    filters,
    handleFilterChange,
    programs,

    pagination,

    refresh: fetchSubjects,
  };
}
