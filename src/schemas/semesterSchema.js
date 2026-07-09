import { z } from "zod";

export const semesterSchema = z.object({
  semesterNumber: z.coerce.number().min(1, "Semester number is required"),

  departmentId: z.coerce.number({
    required_error: "Department is required",
  }),

  programId: z.coerce.number({
    required_error: "Program is required",
  }),

  batchId: z.coerce.number({
    required_error: "Batch is required",
  }),

  current: z.boolean(),
});
