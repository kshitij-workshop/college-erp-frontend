import { z } from "zod";

export const subjectOfferingSchema = z.object({
  subjectId: z.coerce.number({
    required_error: "Subject is required",
  }),

  facultyId: z.coerce.number({
    required_error: "Faculty is required",
  }),

  sectionId: z.coerce.number({
    required_error: "Section is required",
  }),

  academicSession: z.string().trim().min(1, "Academic session is required"),
});
