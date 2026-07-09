import { z } from "zod";

export const sectionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Section name is required")
    .max(5, "Section name is too long"),

  maxStrength: z.coerce.number().min(1, "Maximum strength must be at least 1"),

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
});
