import { z } from "zod";

export const programSchema = z.object({

  name: z
    .string()
    .min(2, "Program name is required"),

  code: z
    .string()
    .min(2, "Program code is required"),

  durationYear: z.coerce
    .number()
    .min(1, "Duration must be at least 1 year"),

  totalSemesters: z.coerce
    .number()
    .min(1, "Total semesters must be at least 1"),

  departmentId: z.coerce.number({
    required_error: "Department is required",
  }),

});