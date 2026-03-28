import { z } from "zod"

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(120),
    email: z.string().trim().email("Invalid email").max(254),
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(128, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const loginCredentialsSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1, "Password is required").max(128),
})
