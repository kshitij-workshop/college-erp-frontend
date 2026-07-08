import { z } from "zod";

export const facultySchema = z.object({

  fullName: z
    .string()
    .min(3, "Full name is required"),

  email: z
    .email("Invalid email"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

  gender: z
    .string()
    .min(1, "Gender is required"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required"),

  bloodGroup: z
    .string()
    .min(1, "Blood group is required"),

  address: z
    .string()
    .min(3, "Address is required"),

  departmentId: z.number({
    required_error: "Department is required",
  }),

  designation: z
    .string()
    .min(1, "Designation is required"),

  qualification: z
    .string()
    .min(2, "Qualification is required"),

  specialization: z
    .string()
    .min(2, "Specialization is required"),

  experienceYears: z.coerce
    .number()
    .min(0, "Experience cannot be negative"),

  joiningDate: z
    .string()
    .min(1, "Joining date is required"),

});