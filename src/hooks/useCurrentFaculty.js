import { useEffect, useState } from "react";
import { getCurrentFaculty } from "@/api/facultyApi";

export function useCurrentFaculty() {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadFaculty() {
    try {
      const response = await getCurrentFaculty();
      console.log("Faculty API Response:", response);
      setFaculty(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFaculty();
  }, []);

  return {
    faculty,
    loading,
    refresh: loadFaculty,
  };
}