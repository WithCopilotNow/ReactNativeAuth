import z from "zod/v4";

export const registerUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long")
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  }).refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  }).refine((val) => /\d/.test(val), {
    message: "Password must contain at least one number",
  }).refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: "Password must contain at least one special character",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
});

export type RegisterUser = z.infer<typeof registerUserSchema>