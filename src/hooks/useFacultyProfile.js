import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getFacultyProfile } from "@/api/profileApi";

export function useFacultyProfile() {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile() {
    try {
      setLoading(true);

      const response = await getFacultyProfile();

      setFaculty(response.data.data);
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
    faculty,
    loading,
  };
}