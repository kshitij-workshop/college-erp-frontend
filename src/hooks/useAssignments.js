import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getAssignmentsByOffering } from "@/api/assignmentApi";
import { getMySubjectOfferings } from "@/api/subjectOfferingApi";
import { useAuth } from "@/hooks/useAuth";

export function useAssignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({ subjectOfferingId: "", status: "" });

  async function refresh() {
    if (user?.role !== "FACULTY") {
      setAssignments([]);
      setOfferings([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const offeringsResponse = await getMySubjectOfferings();
      const assignedOfferings = offeringsResponse.data.data ?? [];
      setOfferings(assignedOfferings);
      const responses = await Promise.all(
        assignedOfferings.map((offering) =>
          getAssignmentsByOffering(offering.id),
        ),
      );
      setAssignments(responses.flatMap((response) => response.data.data ?? []));
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to load assignments",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const id = window.setTimeout(refresh, 0);
    return () => window.clearTimeout(id);
  }, [user]);

  const filteredAssignments = useMemo(() => {
    const search = keyword.trim().toLowerCase();
    return assignments.filter((assignment) => {
      const matchesSearch =
        !search ||
        [assignment.title, assignment.subjectName, assignment.sectionName]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(search));
      const matchesOffering =
        !filters.subjectOfferingId ||
        String(assignment.subjectOfferingId) === filters.subjectOfferingId;
      const matchesStatus =
        !filters.status ||
        (filters.status === "ACTIVE" ? assignment.active : !assignment.active);
      return matchesSearch && matchesOffering && matchesStatus;
    });
  }, [assignments, keyword, filters]);

  return {
    assignments: filteredAssignments,
    offerings,
    loading,
    keyword,
    setKeyword,
    filters,
    setFilters,
    refresh,
  };
}
