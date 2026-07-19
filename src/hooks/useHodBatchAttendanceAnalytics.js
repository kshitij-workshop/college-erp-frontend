import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  getDepartmentSubjectOfferings,
  getBatchAttendanceAnalytics,
} from "@/api/attendanceApi";

export function useHodBatchAttendanceAnalytics({
  setStudents,
  setLoading,
}) {
  const [subjectOfferings, setSubjectOfferings] = useState([]);

  const [programId, setProgramId] = useState("");
  const [batchId, setBatchId] = useState("");

  const [loadingFilters, setLoadingFilters] = useState(false);

  // ==========================================
  // Load Department Subject Offerings
  // ==========================================

  async function loadSubjectOfferings() {
    try {
      setLoadingFilters(true);

      const response = await getDepartmentSubjectOfferings();

      const offerings = response.data;

      setSubjectOfferings(offerings);

      if (offerings.length > 0) {
        setProgramId(String(offerings[0].programId));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load department data.");
    } finally {
      setLoadingFilters(false);
    }
  }

  // ==========================================
  // Programs
  // ==========================================

  const programs = useMemo(() => {
    return [
      ...new Map(
        subjectOfferings.map((item) => [
          item.programId,
          {
            id: item.programId,
            name: item.programName,
          },
        ]),
      ).values(),
    ];
  }, [subjectOfferings]);

  // ==========================================
  // Batches
  // ==========================================

  const batches = useMemo(() => {
    return [
      ...new Map(
        subjectOfferings
          .filter(
            (item) =>
              String(item.programId) === programId
          )
          .map((item) => [
            item.batchId,
            {
              id: item.batchId,
              name: item.batchName,
            },
          ]),
      ).values(),
    ];
  }, [subjectOfferings, programId]);

  // ==========================================
  // Auto Select First Batch
  // ==========================================

  useEffect(() => {
    if (!programId) return;

    const firstBatch = batches[0];

    if (firstBatch) {
      setBatchId(String(firstBatch.batchId));
    }
  }, [programId, batches]);

  // ==========================================
  // Load Analytics
  // ==========================================

  async function loadAnalytics(id) {
    if (!id) {
      setStudents([]);
      return;
    }

    try {
      setLoading(true);

      const response =
        await getBatchAttendanceAnalytics(id);

      setStudents(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load attendance analytics.");
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // Effects
  // ==========================================

  useEffect(() => {
    loadSubjectOfferings();
  }, []);

  useEffect(() => {
    if (batchId) {
      loadAnalytics(batchId);
    } else {
      setStudents([]);
    }
  }, [batchId]);

  return {
  departments: [],

  loadingFilters,

  programs,
  batches,

  departmentId: "",
  setDepartmentId: () => {},

  programId,
  setProgramId,

  batchId,
  setBatchId,
};
}