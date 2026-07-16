import { useEffect, useState } from "react";

import {
  getAttendanceAnalytics,
  getMySubjectOfferings,
} from "@/api/attendanceApi";

export function useAttendanceAnalytics({
  setStudents,
  setLoading,
}) {
  const [offerings, setOfferings] = useState([]);

  const [selectedOffering, setSelectedOffering] = useState("");

  const [loadingOfferings, setLoadingOfferings] = useState(false);

  async function loadOfferings() {
    try {
      setLoadingOfferings(true);

      const response = await getMySubjectOfferings();

      const data = response.data.data;

      setOfferings(data);

      if (data.length > 0) {
        setSelectedOffering(String(data[0].id));
      }
    } finally {
      setLoadingOfferings(false);
    }
  }

  async function loadAnalytics(subjectOfferingId) {
    if (!subjectOfferingId) {
      setStudents([]);
      return;
    }

    try {
      setLoading(true);

      const response = await getAttendanceAnalytics(subjectOfferingId);

      setStudents(response.data.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOfferings();
  }, []);

  useEffect(() => {
    if (selectedOffering) {
      loadAnalytics(selectedOffering);
    }
  }, [selectedOffering]);

  return {
    offerings,

    selectedOffering,
    setSelectedOffering,

    loadingOfferings,

    refresh: () => loadAnalytics(selectedOffering),
  };
}