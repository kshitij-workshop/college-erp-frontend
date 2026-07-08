import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { programSchema } from "@/schemas/programSchema";
import { defaultProgramValues } from "@/constants/programDefaults";

import { createProgram, updateProgram } from "@/api/programApi";

import { getDepartments } from "@/api/departmentApi";

export function useProgramForm(program = null, onSuccess) {
  const form = useForm({
    resolver: zodResolver(programSchema),

    defaultValues: defaultProgramValues,
  });

  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([]);

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
  // Initialize Edit Form
  // ===============================

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    if (!program) {
      form.reset(defaultProgramValues);

      return;
    }

    form.reset({
      ...program,

      departmentId: program.departmentId,
    });
  }, [program]);

  // ===============================
  // Submit
  // ===============================

  async function onSubmit(values) {
    try {
      setLoading(true);

      if (program) {
        await updateProgram(program.id, values);

        toast.success("Program updated successfully");
      } else {
        await createProgram(values);

        toast.success("Program created successfully");
      }

      form.reset(defaultProgramValues);

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

    onSubmit,
  };
}
