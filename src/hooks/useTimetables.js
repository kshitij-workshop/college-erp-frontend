import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { getTimetableEntries } from "@/api/timetableApi";
import { getFaculty } from "@/api/facultyApi";

import {
  getAllBatches,
  getSemesters,
  getSections,
} from "@/api/academicApi";

const PAGE_SIZE = 10;

export function useTimetables() {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const [batches, setBatches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);
  const [faculty, setFaculty] = useState([]);

  const [filters, setFilters] = useState({
    batchId: "",
    semesterId: "",
    sectionId: "",
    facultyId: "",
    academicSession: "",
  });

  // ==========================================
  // Load Timetable
  // ==========================================

  async function loadTimetables() {
    try {
      setLoading(true);

      const response = await getTimetableEntries({
        batchId: filters.batchId || undefined,
        semesterId: filters.semesterId || undefined,
        sectionId: filters.sectionId || undefined,
        facultyId: filters.facultyId || undefined,
        academicSession: filters.academicSession || undefined,
      });

      setTimetables(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load timetable");
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // Load Batches
  // ==========================================

  async function loadBatches() {
    try {
      const response = await getAllBatches();
      setBatches(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // ==========================================
  // Load Semesters
  // ==========================================

  async function loadSemesters(batchId) {
    if (!batchId) {
      setSemesters([]);
      return;
    }

    try {
      const response = await getSemesters(batchId);
      setSemesters(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // ==========================================
  // Load Sections
  // ==========================================

  async function loadSections(semesterId) {
    if (!semesterId) {
      setSections([]);
      return;
    }

    try {
      const response = await getSections(semesterId);
      setSections(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // ==========================================
  // Load Faculty
  // ==========================================

  async function loadFaculty() {
    try {
      const response = await getFaculty();
      setFaculty(response.data.data.content);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadBatches();
    loadFaculty();
  }, []);

  useEffect(() => {
    loadTimetables();
  }, [
    filters.batchId,
    filters.semesterId,
    filters.sectionId,
    filters.facultyId,
    filters.academicSession,
  ]);

  // ==========================================
  // Search (Client Side)
  // ==========================================

  const filteredTimetables = useMemo(() => {
    const search = keyword.trim().toLowerCase();

    return timetables.filter((entry) => {
      return (
        entry.subjectName.toLowerCase().includes(search) ||
        entry.subjectCode.toLowerCase().includes(search) ||
        entry.facultyName.toLowerCase().includes(search) ||
        entry.roomNumber.toLowerCase().includes(search)
      );
    });
  }, [timetables, keyword]);

  // ==========================================
  // Pagination
  // ==========================================

  const pagination = useMemo(() => {
    const totalElements = filteredTimetables.length;
    const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));

    const start = (page - 1) * PAGE_SIZE;

    return {
      totalElements,
      totalPages,
      data: filteredTimetables.slice(start, start + PAGE_SIZE),
    };
  }, [filteredTimetables, page]);

  // ==========================================
  // Filters
  // ==========================================

  function handleFilterChange(name, value) {
    setPage(1);

    if (name === "batchId") {
      loadSemesters(value);

      setSemesters([]);
      setSections([]);

      setFilters((prev) => ({
        ...prev,
        batchId: value,
        semesterId: "",
        sectionId: "",
      }));

      return;
    }

    if (name === "semesterId") {
      loadSections(value);

      setSections([]);

      setFilters((prev) => ({
        ...prev,
        semesterId: value,
        sectionId: "",
      }));

      return;
    }

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return {
    timetables: pagination.data,

    loading,

    page,
    setPage,

    keyword,
    setKeyword,

    filters,
    handleFilterChange,

    pagination,

    batches,
    semesters,
    sections,
    faculty,

    refresh: loadTimetables,
  };
}
