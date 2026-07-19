import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getStudentProfile } from "@/api/profileApi";

export function useStudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    try {
      setLoading(true);

      const response = await getStudentProfile();

      setStudent(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    student,
    loading,
  };
}