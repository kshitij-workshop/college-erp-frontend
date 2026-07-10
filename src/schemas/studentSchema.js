import { z } from "zod";

export const studentSchema = z.object({
  fullName: z.string().trim().min(3, "Full name is required"),

  email: z.string().trim().email("Invalid email address"),

  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),

  gender: z.string().min(1, "Gender is required"),

  bloodGroup: z.string().min(1, "Blood group is required"),

  dateOfBirth: z.string().min(1, "Date of birth is required"),

  address: z.string().trim().min(5, "Address is required"),

  guardianName: z.string().trim().min(3, "Guardian name is required"),

  guardianPhone: z.string().regex(/^[6-9]\d{9}$/, "Invalid guardian phone"),

  guardianRelation: z.string().trim().min(2, "Guardian relation is required"),

  departmentId: z.coerce.number({
    required_error: "Department is required",
  }),

  programId: z.coerce.number({
    required_error: "Program is required",
  }),

  batchId: z.coerce.number({
    required_error: "Batch is required",
  }),

  semesterId: z.coerce.number({
    required_error: "Semester is required",
  }),

  sectionId: z.coerce.number({
    required_error: "Section is required",
  }),

  rollNumber: z.string().trim().min(1, "Roll number is required"),

  registrationNumber: z
    .string()
    .trim(),
  admissionDate: z.string().min(1, "Admission date is required"),

  status: z.string().min(1, "Status is required"),
});
