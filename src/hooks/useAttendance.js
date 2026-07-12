import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getMyClasses,
  getStudentsForClass,
  markAttendance,
} from "@/api/attendanceApi";

export function useAttendance() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [classes, setClasses] = useState([]);

  const [selectedClass, setSelectedClass] = useState(null);

  const [students, setStudents] = useState([]);

  const [attendance, setAttendance] = useState({});

  const [loadingClasses, setLoadingClasses] = useState(false);

  const [loadingStudents, setLoadingStudents] = useState(false);

  const [saving, setSaving] = useState(false);

  async function loadClasses(date) {
    try {
      setLoadingClasses(true);

      const response = await getMyClasses(date);

      setClasses(response.data.data);

      setSelectedClass(null);

      setStudents([]);

      setAttendance({});
    } catch (error) {
      console.error(error);

      toast.error("Failed to load classes.");
    } finally {
      setLoadingClasses(false);
    }
  }

  async function loadStudents(timetableEntryId) {
    try {
      setLoadingStudents(true);

      const response = await getStudentsForClass(timetableEntryId);

      setStudents(response.data.data);

      const initialAttendance = {};

      response.data.data.forEach((student) => {
        initialAttendance[student.studentId] = "PRESENT";
      });

      setAttendance(initialAttendance);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load students.");
    } finally {
      setLoadingStudents(false);
    }
  }

  function selectClass(classItem) {
    setSelectedClass(classItem);

    loadStudents(classItem.timetableEntryId);
  }

  function updateAttendance(studentId, status) {
    setAttendance((previous) => ({
      ...previous,
      [studentId]: status,
    }));
  }

  function markAllPresent() {
  const updatedAttendance = {};

  students.forEach((student) => {
    updatedAttendance[student.studentId] = "PRESENT";
  });

  setAttendance(updatedAttendance);
}

  const summary = {
    total: students.length,

    present: Object.values(attendance).filter((status) => status === "PRESENT")
      .length,

    absent: Object.values(attendance).filter((status) => status === "ABSENT")
      .length,

    late: Object.values(attendance).filter((status) => status === "LATE")
      .length,

    leave: Object.values(attendance).filter((status) => status === "LEAVE")
      .length,
  };

  async function saveAttendance() {
    if (!selectedClass) {
      toast.error("Please select a class.");

      return;
    }

    try {
      setSaving(true);

      const entries = students.map((student) => ({
        studentId: student.studentId,
        status: attendance[student.studentId],
      }));

      await markAttendance({
        timetableEntryId: selectedClass.timetableEntryId,
        sessionDate: selectedDate,
        entries,
      });

      toast.success("Attendance marked successfully.");

      setSelectedClass(null);
      setStudents([]);
      setAttendance({});
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to mark attendance.",
      );
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadClasses(selectedDate);
  }, [selectedDate]);

  return {
    selectedDate,
    setSelectedDate,

    classes,
    selectedClass,

    students,

    attendance,

    summary,

    loadingClasses,
    loadingStudents,

    saving,

    loadClasses,
    loadStudents,

    selectClass,

    updateAttendance,

    saveAttendance,
    markAllPresent,
  };
}
