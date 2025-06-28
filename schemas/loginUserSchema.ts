import { z } from "zod/v4";

export const loginUserSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Invalid password")
    .refine((val) => /[A-Z]/.test(val), {
        message: "Invalid password",
    }).refine((val) => /[a-z]/.test(val), {
        message: "Invalid password",
    }).refine((val) => /\d/.test(val), {
        message: "Invalid password",
    }).refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: "Invalid password",
    }),
});

export type LoginUser = z.infer<typeof loginUserSchema>;