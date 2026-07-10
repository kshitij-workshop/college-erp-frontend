import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { subjectSchema } from "@/schemas/subjectSchema";
import { defaultSubjectValues } from "@/constants/subjectDefaults";

import { createSubject, updateSubject } from "@/api/subjectApi";

import { getAllPrograms } from "@/api/academicApi";

export function useSubjectForm(subject = null, onSuccess) {
  const form = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: defaultSubjectValues,
  });

  const [submitting, setSubmitting] = useState(false);

  const [programs, setPrograms] = useState([]);

  async function loadPrograms() {
    try {
      const response = await getAllPrograms();

      setPrograms(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load programs");
    }
  }

  useEffect(() => {
    loadPrograms();
  }, []);

  // ===============================
  // Initialize Edit Form
  // ===============================

  useEffect(() => {
    if (!subject) {
      form.reset(defaultSubjectValues);

      return;
    }

    form.reset({
      name: subject.name,

      code: subject.code,

      credits: subject.credits,

      type: subject.type,

      programId: subject.programId,

      semesterNumber: subject.semesterNumber,
    });
  }, [subject]);

  // ===============================
  // Submit
  // ===============================

  async function onSubmit(values) {
    try {
      setSubmitting(true);

      if (subject) {
        await updateSubject(subject.id, values);

        toast.success("Subject updated successfully");
      } else {
        await createSubject(values);

        toast.success("Subject created successfully");
      }

      form.reset(defaultSubjectValues);

      onSuccess?.();
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    form,

    submitting,

    programs,

    onSubmit,
  };
}
