import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getExams } from "@/api/examApi";
import {
  getMySubjectOfferings,
  getSubjectOfferings,
} from "@/api/subjectOfferingApi";
import { useAuth } from "@/hooks/useAuth";

export function useExams() {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({ examType: "", status: "" });

  async function refresh() {
    try {
      setLoading(true);
      const response = await getExams();
      setExams(response.data.data ?? []);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message ?? "Failed to load exams");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      refresh();
      (user?.role === "FACULTY"
        ? getMySubjectOfferings()
        : getSubjectOfferings()
      )
        .then((response) => setOfferings(response.data.data ?? []))
        .catch(() => toast.error("Failed to load assigned subject offerings"));
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [user]);

  const filteredExams = useMemo(() => {
    const search = keyword.trim().toLowerCase();
    return exams.filter((exam) => {
      if (
        user?.role === "FACULTY" &&
        !offerings.some((offering) => offering.id === exam.subjectOfferingId)
      )
        return false;
      const matchesSearch =
        !search ||
        [exam.name, exam.subjectName, exam.sectionName]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(search));
      const matchesType =
        !filters.examType || exam.examType === filters.examType;
      const matchesStatus =
        !filters.status ||
        (filters.status === "DRAFT" && !exam.locked) ||
        (filters.status === "LOCKED" && exam.locked && !exam.resultPublished) ||
        (filters.status === "PUBLISHED" && exam.resultPublished);
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [exams, keyword, filters, offerings, user]);

  return {
    exams: filteredExams,
    offerings,
    loading,
    keyword,
    setKeyword,
    filters,
    setFilters,
    refresh,
  };
}
