import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { sectionSchema } from "@/schemas/sectionSchema";
import { defaultSectionValues } from "@/constants/sectionDefaults";

import { createSection, updateSection } from "@/api/sectionApi";

import { getDepartments } from "@/api/departmentApi";
import { getProgramsByDepartment } from "@/api/programApi";
import { getBatchesByProgram } from "@/api/batchApi";
import { getSemestersByBatch } from "@/api/semesterApi";

export function useSectionForm(section = null, onSuccess) {
  const form = useForm({
    resolver: zodResolver(sectionSchema),

    defaultValues: defaultSectionValues,
  });

  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [batches, setBatches] = useState([]);
  const [semesters, setSemesters] = useState([]);

  // ===============================
  // Loaders
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

  async function loadSemesters(batchId) {
    if (!batchId) {
      setSemesters([]);

      return;
    }

    try {
      const response = await getSemestersByBatch(batchId);

      setSemesters(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load semesters");
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
      if (!section) {
        form.reset(defaultSectionValues);

        setPrograms([]);
        setBatches([]);
        setSemesters([]);

        return;
      }

      await loadPrograms(section.departmentId);

      await loadBatches(section.programId);

      await loadSemesters(section.batchId);

      form.reset({
        ...section,
      });
    }

    initializeForm();
  }, [section]);

  // ===============================
  // Cascading Dropdowns
  // ===============================

  async function handleDepartmentChange(departmentId) {
    form.setValue("programId", undefined);
    form.setValue("batchId", undefined);
    form.setValue("semesterId", undefined);

    setPrograms([]);
    setBatches([]);
    setSemesters([]);

    await loadPrograms(departmentId);
  }

  async function handleProgramChange(programId) {
    form.setValue("batchId", undefined);
    form.setValue("semesterId", undefined);

    setBatches([]);
    setSemesters([]);

    await loadBatches(programId);
  }

  async function handleBatchChange(batchId) {
    form.setValue("semesterId", undefined);

    setSemesters([]);

    await loadSemesters(batchId);
  }

  // ===============================
  // Submit
  // ===============================

  async function onSubmit(values) {
    try {
      setLoading(true);

      const payload = {
        name: values.name,

        maxStrength: values.maxStrength,

        semesterId: values.semesterId,
      };

      if (section) {
        await updateSection(section.id, payload);

        toast.success("Section updated successfully");
      } else {
        await createSection(payload);

        toast.success("Section created successfully");
      }

      form.reset(defaultSectionValues);

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
    semesters,

    handleDepartmentChange,
    handleProgramChange,
    handleBatchChange,

    onSubmit,
  };
}
