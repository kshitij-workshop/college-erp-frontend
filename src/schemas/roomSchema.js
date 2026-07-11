import { z } from "zod";

export const roomSchema = z.object({
  roomNumber: z
    .string()
    .trim()
    .min(1, "Room number is required"),

  capacity: z.coerce
    .number()
    .min(1, "Capacity must be greater than 0"),

  roomType: z
    .string()
    .min(1, "Room type is required"),
});