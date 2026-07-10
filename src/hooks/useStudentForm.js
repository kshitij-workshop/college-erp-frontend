import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { studentSchema } from "@/schemas/studentSchema";
import { defaultStudentValues } from "@/constants/studentDefaults";

import { createStudent, updateStudent } from "@/api/studentApi";

import {
  getDepartments,
  getPrograms,
  getBatches,
  getSemesters,
  getSections,
} from "@/api/academicApi";

export function useStudentForm(student = null, onSuccess) {
  const form = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: defaultStudentValues,
  });

  const [submitting, setSubmitting] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [batches, setBatches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [sections, setSections] = useState([]);

  // ===============================
  // Load Dropdowns
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
      const response = await getPrograms(departmentId);
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
      const response = await getBatches(programId);
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
      const response = await getSemesters(batchId);
      setSemesters(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load semesters");
    }
  }

  async function loadSections(semesterId) {
    if (!semesterId) {
      setSections([]);
      return;
    }
    try {
      const response = await getSections(semesterId);
      setSections(response.data.data);
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
      setSubmitting(true);

      const payload = {
        fullName: values.fullName,

        email: values.email,

        phone: values.phone,

        gender: values.gender,

        bloodGroup: values.bloodGroup,

        dateOfBirth: values.dateOfBirth,

        address: values.address,

        guardianName: values.guardianName,

        guardianPhone: values.guardianPhone,

        guardianRelation: values.guardianRelation,

        departmentId: values.departmentId,

        programId: values.programId,

        batchId: values.batchId,

        semesterId: values.semesterId,

        sectionId: values.sectionId,

        rollNumber: values.rollNumber,

        registrationNumber: values.registrationNumber,

        admissionDate: values.admissionDate,

        studentStatus: values.status,
      };

      if (student) {
        await updateStudent(student.id, payload);
        toast.success("Student updated successfully");
      } else {
        await createStudent(payload);
        toast.success("Student created successfully");
      }

      form.reset(defaultStudentValues);

      setPrograms([]);
      setBatches([]);
      setSemesters([]);
      setSections([]);

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
