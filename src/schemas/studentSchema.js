import { z } from "zod";

export const studentSchema = z.object({

  fullName: z
    .string()
    .min(3, "Full name is required"),

  email: z
    .email("Invalid email"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

  guardianName: z.string().optional(),

  guardianPhone: z.string().optional(),

  guardianRelation: z.string().optional(),

  departmentId: z.number({
    required_error: "Department is required",
  }),

  programId: z.number({
    required_error: "Program is required",
  }),

  batchId: z.number({
    required_error: "Batch is required",
  }),

  semesterId: z.number({
    required_error: "Semester is required",
  }),

  sectionId: z.number({
    required_error: "Section is required",
  }),

});