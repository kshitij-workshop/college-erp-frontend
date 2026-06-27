import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { studentSchema } from "@/schemas/studentSchema";
import { defaultStudentValues } from "@/constants/studentDefaults";

import {
  getDepartments,
  getPrograms,
  getBatches,
  getSemesters,
  getSections,
} from "@/api/academicApi";

import {
  createStudent,
  updateStudent,
} from "@/api/studentApi";

export function useStudentForm(student = null, onSuccess) {
  const form = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: defaultStudentValues,
  });

  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [batches, setBatches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);

  const [loading, setLoading] = useState(false);

  // ===============================
  // Load Dropdown Data
  // ===============================

  async function loadDepartments() {
    try {
      const res = await getDepartments();
      setDepartments(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments");
    }
  }

  async function loadPrograms(departmentId) {
    if (!departmentId) return;

    try {
      const res = await getPrograms(departmentId);
      setPrograms(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load programs");
    }
  }

  async function loadBatches(programId) {
    if (!programId) return;

    try {
      const res = await getBatches(programId);
      setBatches(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load batches");
    }
  }

  async function loadSemesters(batchId) {
    if (!batchId) return;

    try {
      const res = await getSemesters(batchId);
      setSemesters(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load semesters");
    }
  }

  async function loadSections(semesterId) {
    if (!semesterId) return;

    try {
      const res = await getSections(semesterId);
      setSections(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load sections");
    }
  }

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {
    loadDepartments();
  }, []);

  // ===============================
  // Initialize Edit Form
  // ===============================

  useEffect(() => {
    async function initializeEditForm() {
      if (!student) {
        form.reset(defaultStudentValues);

        setPrograms([]);
        setBatches([]);
        setSemesters([]);
        setSections([]);

        return;
      }

      form.reset(student);

      await loadPrograms(student.departmentId);
      await loadBatches(student.programId);
      await loadSemesters(student.batchId);
      await loadSections(student.semesterId);
    }

    if (departments.length > 0) {
      initializeEditForm();
    }
  }, [student, departments]);

  // ===============================
  // Cascading Dropdowns
  // ===============================

  async function handleDepartmentChange(departmentId) {
    form.setValue("programId", undefined);
    form.setValue("batchId", undefined);
    form.setValue("semesterId", undefined);
    form.setValue("sectionId", undefined);

    setPrograms([]);
    setBatches([]);
    setSemesters([]);
    setSections([]);

    await loadPrograms(departmentId);
  }

  async function handleProgramChange(programId) {
    form.setValue("batchId", undefined);
    form.setValue("semesterId", undefined);
    form.setValue("sectionId", undefined);

    setBatches([]);
    setSemesters([]);
    setSections([]);

    await loadBatches(programId);
  }

  async function handleBatchChange(batchId) {
    form.setValue("semesterId", undefined);
    form.setValue("sectionId", undefined);

    setSemesters([]);
    setSections([]);

    await loadSemesters(batchId);
  }

  async function handleSemesterChange(semesterId) {
    form.setValue("sectionId", undefined);

    setSections([]);

    await loadSections(semesterId);
  }

  // ===============================
  // Submit
  // ===============================

  async function onSubmit(values) {
    try {
      setLoading(true);

      if (student) {
        await updateStudent(student.id, values);
        toast.success("Student updated successfully");
      } else {
        await createStudent(values);
        toast.success("Student created successfully");
      }

      form.reset(defaultStudentValues);

      onSuccess?.();

    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    loading,

    departments,
    programs,
    batches,
    semesters,
    sections,

    handleDepartmentChange,
    handleProgramChange,
    handleBatchChange,
    handleSemesterChange,

    onSubmit,
  };
}