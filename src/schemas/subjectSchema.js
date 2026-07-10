import { z } from "zod";

export const subjectSchema = z.object({

  name: z
    .string()
    .trim()
    .min(2, "Subject name is required"),

  code: z
    .string()
    .trim()
    .min(2, "Subject code is required")
    .max(20, "Subject code is too long"),

  credits: z.coerce
    .number()
    .min(1, "Credits must be at least 1")
    .max(10, "Credits cannot exceed 10"),

  type: z
    .string()
    .min(1, "Subject type is required"),

  programId: z.coerce.number({
    required_error: "Program is required",
  }),

  semesterNumber: z.coerce
    .number()
    .min(1, "Semester is required")
    .max(8, "Invalid semester"),

});