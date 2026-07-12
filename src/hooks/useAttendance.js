import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getClasses,
  getStudentsForClass,
  markAttendance,
  getAttendanceSheet,
  updateAttendance as updateAttendanceApi,
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

  const [attendanceMarked, setAttendanceMarked] = useState(false);


  const [sessionId, setSessionId] = useState(null);

  async function loadClasses(date) {
    try {
      setLoadingClasses(true);

      const response = await getClasses(date);

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

  async function loadAttendanceSheet(timetableEntryId) {
    try {
      setLoadingStudents(true);

      const response = await getAttendanceSheet(timetableEntryId, selectedDate);

      const data = response.data.data;

      setAttendanceMarked(data.attendanceMarked);

      setSessionId(data.sessionId);

      setStudents(data.students);

      const attendanceMap = {};

      data.students.forEach((student) => {
        attendanceMap[student.studentId] = student.status;
      });

      setAttendance(attendanceMap);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to load attendance.",
      );
    } finally {
      setLoadingStudents(false);
    }
  }

  function selectClass(classItem) {
    setSelectedClass(classItem);

    loadAttendanceSheet(classItem.timetableEntryId);
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

    
      if (attendanceMarked) {
        await updateAttendanceApi(sessionId, {
          entries,
        });

        toast.success("Attendance updated successfully.");
      } else {
        await markAttendance({
          timetableEntryId: selectedClass.timetableEntryId,
          sessionDate: selectedDate,
          entries,
        });

        toast.success("Attendance submitted successfully.");
      }
      await loadAttendanceSheet(selectedClass.timetableEntryId);
      await loadClasses(selectedDate);

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
    attendanceMarked,

    selectClass,

    updateAttendance,
    loadAttendanceSheet,

    saveAttendance,
    markAllPresent,
    
  };
}
