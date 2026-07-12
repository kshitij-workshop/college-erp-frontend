import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { getAttendanceSession } from "@/api/attendanceApi";

export function useAttendanceSession() {
  const { sessionId } = useParams();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadSession() {
    try {
      setLoading(true);

      const response = await getAttendanceSession(sessionId);

      setSession(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load attendance session."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  return {
    session,
    loading,
  };
}