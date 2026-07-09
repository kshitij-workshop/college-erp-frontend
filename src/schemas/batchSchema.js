import { z } from "zod";

export const batchSchema = z
  .object({
    name: z.string().min(2, "Batch name is required"),

    startYear: z.coerce.number().min(2000),

    endYear: z.coerce.number().min(2000),

    departmentId: z.coerce.number({
      required_error: "Department is required",
    }),

    programId: z.coerce.number({
      required_error: "Program is required",
    }),
  })
  .refine(
    (data) => data.endYear > data.startYear,

    {
      message: "End year must be greater than start year",
      path: ["endYear"],
    },
  );
