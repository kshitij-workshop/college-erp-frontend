import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getAllDepartments,
  getProgramsByDepartment,
  getBatchesByProgram,
} from "@/api/academicApi";

import { getBatchAttendanceAnalytics } from "@/api/attendanceApi";

export function useBatchAttendanceAnalytics({
  setStudents,
  setLoading,
}) {
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [batches, setBatches] = useState([]);

  const [departmentId, setDepartmentId] = useState("");
  const [programId, setProgramId] = useState("");
  const [batchId, setBatchId] = useState("");

  const [loadingFilters, setLoadingFilters] = useState(false);

  async function loadDepartments() {
    try {
      setLoadingFilters(true);

      const response = await getAllDepartments();

      setDepartments(response.data.data);
    } catch {
      toast.error("Failed to load departments");
    } finally {
      setLoadingFilters(false);
    }
  }

  async function loadPrograms(id) {
    if (!id) return;

    try {
      const response = await getProgramsByDepartment(id);

      setPrograms(response.data.data);
    } catch {
      toast.error("Failed to load programs");
    }
  }

  async function loadBatches(id) {
    if (!id) return;

    try {
      const response = await getBatchesByProgram(id);

      setBatches(response.data.data);
    } catch {
      toast.error("Failed to load batches");
    }
  }

  async function loadAnalytics(id) {
    if (!id) {
      setStudents([]);
      return;
    }

    try {
      setLoading(true);

      const response = await getBatchAttendanceAnalytics(id);

      setStudents(response.data.data);
    } catch {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    setProgramId("");
    setBatchId("");

    setPrograms([]);
    setBatches([]);

    setStudents([]);

    if (departmentId) {
      loadPrograms(departmentId);
    }
  }, [departmentId]);

  useEffect(() => {
    setBatchId("");

    setBatches([]);

    setStudents([]);

    if (programId) {
      loadBatches(programId);
    }
  }, [programId]);

  useEffect(() => {
    setStudents([]);

    if (batchId) {
      loadAnalytics(batchId);
    }
  }, [batchId]);

  return {
    departments,
    programs,
    batches,

    loadingFilters,

    departmentId,
    setDepartmentId,

    programId,
    setProgramId,

    batchId,
    setBatchId,

    refresh: () => loadAnalytics(batchId),
  };
}