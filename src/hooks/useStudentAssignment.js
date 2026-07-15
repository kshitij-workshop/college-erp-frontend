import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getMyAssignments } from "@/api/assignmentApi";

export function useStudentAssignments() {
  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(true);

  async function loadAssignments() {
    try {
      setLoading(true);

      const response = await getMyAssignments();

      setAssignments(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to load assignments",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssignments();
  }, []);

  return {
    assignments,

    loading,

    refresh: loadAssignments,
  };
}
