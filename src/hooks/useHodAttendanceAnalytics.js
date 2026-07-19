import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  getDepartmentSubjectOfferings,
  getAttendanceAnalytics,
} from "@/api/attendanceApi";

export function useHodAttendanceAnalytics({
  setStudents,
  setLoading,
  setSelectedOfferingId,
}) {
  const [subjectOfferings, setSubjectOfferings] = useState([]);

  const [programId, setProgramId] = useState("");
  const [batchName, setBatchName] = useState("");
  const [subjectOfferingId, setSubjectOfferingId] = useState("");

  const [loadingFilters, setLoadingFilters] = useState(false);

  async function loadSubjectOfferings() {
    try {
      setLoadingFilters(true);

      const response = await getDepartmentSubjectOfferings();

      const offerings = response.data;

      setSubjectOfferings(offerings);

      if (offerings.length > 0) {
        setProgramId(String(offerings[0].programId));
      }
    } catch {
      toast.error("Failed to load subject offerings");
    } finally {
      setLoadingFilters(false);
    }
  }


  useEffect(() => {
  if (!programId) return;

  const firstBatch = subjectOfferings.find(
    (item) => String(item.programId) === programId
  );

  if (firstBatch) {
    setBatchName(firstBatch.batchName);
  }
}, [programId, subjectOfferings]);

useEffect(() => {
  if (!batchName) return;

  const firstSubject = subjectOfferings.find(
    (item) =>
      String(item.programId) === programId &&
      item.batchName === batchName
  );

  if (firstSubject) {
    setSubjectOfferingId(String(firstSubject.id));
  }
}, [batchName, programId, subjectOfferings]);
  async function loadAnalytics(id) {
    if (!id) {
      setStudents([]);
      return;
    }

    try {
      setLoading(true);

      const response = await getAttendanceAnalytics(id);

      setStudents(response.data.data);

      if (setSelectedOfferingId) {
        setSelectedOfferingId(id);
      }
    } catch {
      toast.error("Failed to load attendance analytics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSubjectOfferings();
  }, []);

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

  const batches = useMemo(() => {
    return [
      ...new Map(
        subjectOfferings
          .filter((item) => String(item.programId) === programId)
          .map((item) => [
            item.batchName,
            {
              id: item.batchName,
              name: item.batchName,
            },
          ]),
      ).values(),
    ];
  }, [subjectOfferings, programId]);

  const subjects = useMemo(() => {
    return subjectOfferings.filter(
      (item) =>
        String(item.programId) === programId && item.batchName === batchName,
    );
  }, [subjectOfferings, programId, batchName]);

  useEffect(() => {
    if (subjectOfferingId) {
      loadAnalytics(subjectOfferingId);
    } else {
      setStudents([]);
    }
  }, [subjectOfferingId]);

  return {
    loadingFilters,

    programs,
    batches,
    subjects,

    programId,
    setProgramId,

    batchName,
    setBatchName,

    subjectOfferingId,
    setSubjectOfferingId,
  };
}
