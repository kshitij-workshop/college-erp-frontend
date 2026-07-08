import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { facultySchema } from "@/schemas/facultySchema";
import { defaultFacultyValues } from "@/constants/facultyDefaults";

import { getDepartments } from "@/api/academicApi";

import {
  createFaculty,
  updateFaculty,
} from "@/api/facultyApi";

export function useFacultyForm(faculty = null, onSuccess) {

  const form = useForm({

    resolver: zodResolver(facultySchema),

    defaultValues: defaultFacultyValues,

  });

  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);

  // ===============================
  // Load Departments
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

    if (!faculty) {

      form.reset(defaultFacultyValues);

      return;

    }

    form.reset({

      ...faculty,

      departmentId: faculty.departmentId,

    });

  }, [faculty]);

  // ===============================
  // Submit
  // ===============================

  async function onSubmit(values) {

    try {

      setLoading(true);

      if (faculty) {

        await updateFaculty(

          faculty.id,

          values

        );

        toast.success("Faculty updated successfully");

      } else {

        await createFaculty(values);

        toast.success("Faculty created successfully");

      }

      form.reset(defaultFacultyValues);

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

    departments,

    onSubmit,

  };

}