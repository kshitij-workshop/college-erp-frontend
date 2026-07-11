import { z } from "zod";

export const timetableSchema = z.object({
  subjectOfferingId: z
    .number({
      required_error: "Subject offering is required",
    })
    .positive("Subject offering is required"),

  roomId: z
    .number({
      required_error: "Room is required",
    })
    .positive("Room is required"),

  timeSlotId: z
    .number({
      required_error: "Time slot is required",
    })
    .positive("Time slot is required"),

  dayOfWeek: z
    .string({
      required_error: "Day is required",
    })
    .min(1, "Day is required"),

  academicSession: z
    .string({
      required_error: "Academic session is required",
    })
    .trim()
    .min(1, "Academic session is required")
    .max(20, "Academic session is too long"),
});