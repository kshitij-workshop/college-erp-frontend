import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { subjectOfferingSchema } from "@/schemas/subjectOfferingSchema";
import { defaultSubjectOfferingValues } from "@/constants/subjectOfferingDefaults";

import {
  createSubjectOffering,
  updateSubjectOffering,
} from "@/api/subjectOfferingApi";

import { getSubjects } from "@/api/subjectApi";
import { getFaculty } from "@/api/facultyApi";
import { getAllSections } from "@/api/academicApi";

export function useSubjectOfferingForm(subjectOffering, onSuccess) {
  const form = useForm({
    resolver: zodResolver(subjectOfferingSchema),
    defaultValues: defaultSubjectOfferingValues,
  });

  const [loading, setLoading] = useState(false);

  const [subjects, setSubjects] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [sections, setSections] = useState([]);

  async function loadSubjects() {
    try {
      const response = await getSubjects();
      setSubjects(response.data.data);
    } catch (error) {
      toast.error("Failed to load subjects");
    }
  }

  async function loadFaculty() {
    try {
      const response = await getFaculty();
      setFaculty(response.data.data.content);
    } catch (error) {
      toast.error("Failed to load faculty");
    }
  }

  async function loadSections() {
    try {
      const response = await getAllSections();
      setSections(response.data.data);
    } catch (error) {
      toast.error("Failed to load sections");
    }
  }

  useEffect(() => {
    loadSubjects();
    loadFaculty();
    loadSections();
  }, []);

  useEffect(() => {
    if (!subjectOffering) {
      form.reset(defaultSubjectOfferingValues);
      return;
    }

    form.reset({
      subjectId: subjectOffering.subjectId,
      facultyId: subjectOffering.facultyId,
      sectionId: subjectOffering.sectionId,
      academicSession: subjectOffering.academicSession,
    });
  }, [subjectOffering]);

  async function onSubmit(values) {
    try {
      setLoading(true);

      if (subjectOffering) {
        await updateSubjectOffering(subjectOffering.id, values);
        toast.success("Subject offering updated successfully");
      } else {
        await createSubjectOffering(values);
        toast.success("Subject offering created successfully");
      }

      form.reset(defaultSubjectOfferingValues);
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }


  return {
    form,
    loading,
    subjects,
    faculty,
    sections,
    onSubmit,
  };
}
