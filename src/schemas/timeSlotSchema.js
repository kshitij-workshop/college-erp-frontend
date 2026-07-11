import { z } from "zod";

export const timeSlotSchema = z
  .object({
    label: z
      .string()
      .trim()
      .min(1, "Label is required"),

    startTime: z
      .string()
      .min(1, "Start time is required"),

    endTime: z
      .string()
      .min(1, "End time is required"),
  })
  .refine(
    (data) => data.startTime < data.endTime,
    {
      path: ["endTime"],
      message: "End time must be after start time",
    }
  );