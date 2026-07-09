import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { batchSchema } from "@/schemas/batchSchema";
import { defaultBatchValues } from "@/constants/batchDefaults";

import { createBatch, updateBatch } from "@/api/batchApi";

import { getDepartments } from "@/api/departmentApi";
import { getProgramsByDepartment } from "@/api/programApi";

export function useBatchForm(batch = null, onSuccess) {
  const form = useForm({
    resolver: zodResolver(batchSchema),

    defaultValues: defaultBatchValues,
  });

  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([]);

  const [programs, setPrograms] = useState([]);

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
      if (!batch) {
        form.reset(defaultBatchValues);

        setPrograms([]);

        return;
      }

      await loadPrograms(batch.departmentId);

      form.reset({
        ...batch,
      });
    }

    initializeForm();
  }, [batch]);

  // ===============================
  // Department Change
  // ===============================

  async function handleDepartmentChange(departmentId) {
    form.setValue("programId", undefined);

    setPrograms([]);

    await loadPrograms(departmentId);
  }

  // ===============================
  // Submit
  // ===============================

  async function onSubmit(values) {
    try {
      setLoading(true);

      const payload = {
        name: values.name,

        startYear: values.startYear,

        endYear: values.endYear,

        programId: values.programId,
      };

      if (batch) {
        await updateBatch(batch.id, payload);

        toast.success("Batch updated successfully");
      } else {
        await createBatch(payload);

        toast.success("Batch created successfully");
      }

      form.reset(defaultBatchValues);

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

    handleDepartmentChange,

    onSubmit,
  };
}
