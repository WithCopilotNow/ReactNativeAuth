import z from "zod/v4";

export const sessionSchema = z.object({
  _id: z.string().refine((val) => /^[a-f0-9]{24}$/.test(val), "Invalid session id format"),
  username: z.string().min(1, "Invalid session username"),
  email: z.email("Invalid session email address"),
  password: z.string()
    .refine(
      (val) => /^[a-f0-9]{128}:[a-f0-9]{64}$/.test(val),
      "Invalid session password format"
    ),
  createdAt: z.coerce.date("Invalid session creation date format"),
  updatedAt: z.coerce.date("Invalid session update date format"),
});

export type Session = z.infer<typeof sessionSchema>;