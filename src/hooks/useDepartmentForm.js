import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { departmentSchema } from "@/schemas/departmentSchema";
import { defaultDepartmentValues } from "@/constants/departmentDefaults";

import {
  createDepartment,
  updateDepartment,
} from "@/api/departmentApi";

export function useDepartmentForm(
  department = null,
  onSuccess,
) {

  const form = useForm({

    resolver: zodResolver(departmentSchema),

    defaultValues: defaultDepartmentValues,

  });

  const [loading, setLoading] = useState(false);

  // ===============================
  // Initialize Edit Form
  // ===============================

  useEffect(() => {

    if (!department) {

      form.reset(defaultDepartmentValues);

      return;

    }

    form.reset(department);

  }, [department]);

  // ===============================
  // Submit
  // ===============================

  async function onSubmit(values) {

    try {

      setLoading(true);

      if (department) {

        await updateDepartment(
          department.id,
          values
        );

        toast.success(
          "Department updated successfully"
        );

      } else {

        await createDepartment(values);

        toast.success(
          "Department created successfully"
        );

      }

      form.reset(defaultDepartmentValues);

      onSuccess?.();

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  }

  return {

    form,

    loading,

    onSubmit,

  };

}