import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getAttendanceHistory } from "@/api/attendanceApi";

export function useAttendanceHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    try {
      setLoading(true);

      const response = await getAttendanceHistory();

      setHistory(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load attendance history."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return {
    history,
    loading,
    loadHistory,
  };
}