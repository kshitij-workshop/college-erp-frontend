import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { semesterSchema } from "@/schemas/semesterSchema";
import { defaultSemesterValues } from "@/constants/semesterDefaults";

import { createSemester, updateSemester } from "@/api/semesterApi";

import { getDepartments } from "@/api/departmentApi";
import { getProgramsByDepartment } from "@/api/programApi";
import { getBatchesByProgram } from "@/api/batchApi";

export function useSemesterForm(semester = null, onSuccess) {
  const form = useForm({
    resolver: zodResolver(semesterSchema),

    defaultValues: defaultSemesterValues,
  });

  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [batches, setBatches] = useState([]);

  // ===============================
  // Load Departments
  // ===============================

  async function loadDepartments() {
    try {
      const response = await getDepartments();

      setDepartments(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load departments");
    }
  }

  // ===============================
  // Load Programs
  // ===============================

  async function loadPrograms(departmentId) {
    if (!departmentId) {
      setPrograms([]);

      return;
    }

    try {
      const response = await getProgramsByDepartment(departmentId);

      setPrograms(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load programs");
    }
  }

  // ===============================
  // Load Batches
  // ===============================

  async function loadBatches(programId) {
    if (!programId) {
      setBatches([]);

      return;
    }

    try {
      const response = await getBatchesByProgram(programId);

      setBatches(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load batches");
    }
  }

  // ===============================
  // Initial Load
  // ===============================

  useEffect(() => {
    loadDepartments();
  }, []);

  // ===============================
  // Edit Mode
  // ===============================

  useEffect(() => {
    async function initializeForm() {
      if (!semester) {
        form.reset(defaultSemesterValues);

        setPrograms([]);
        setBatches([]);

        return;
      }

      await loadPrograms(semester.departmentId);

      await loadBatches(semester.programId);

      form.reset({
        ...semester,
      });
    }

    initializeForm();
  }, [semester]);

  // ===============================
  // Department Change
  // ===============================

  async function handleDepartmentChange(departmentId) {
    form.setValue("programId", undefined);
    form.setValue("batchId", undefined);

    setPrograms([]);
    setBatches([]);

    await loadPrograms(departmentId);
  }

  // ===============================
  // Program Change
  // ===============================

  async function handleProgramChange(programId) {
    form.setValue("batchId", undefined);

    setBatches([]);

    await loadBatches(programId);
  }

  // ===============================
  // Submit
  // ===============================

  async function onSubmit(values) {
    try {
      setLoading(true);

      const payload = {
        semesterNumber: values.semesterNumber,

        batchId: values.batchId,

        current: values.current,
      };

      if (semester) {
        await updateSemester(semester.id, payload);

        toast.success("Semester updated successfully");
      } else {
        await createSemester(payload);

        toast.success("Semester created successfully");
      }

      form.reset(defaultSemesterValues);

      onSuccess?.();
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
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

    handleDepartmentChange,
    handleProgramChange,

    onSubmit,
  };
}
