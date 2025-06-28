import mongoose from "mongoose";
import { z } from "zod/v4"

type UserType = {
  _id?: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<UserType>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true, id: false, virtuals: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

export const User: mongoose.Model<UserType> = mongoose.models.User || mongoose.model("User", userSchema);

export const dbUserSchema = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId, { error: "dbUser does not have an id" }).transform((id) => id.toHexString()),
  username: z.string().min(1, "dbUser must have a username"),
  email: z.email("dbUser must have a valid email address"),
  password: z.string().refine(
      (val) => /^[a-f0-9]{128}:[a-f0-9]{64}$/.test(val),
      "dbUser must have a valid password format"
    ),
  createdAt: z.coerce.date("Invalid dbUser creation date format"),
  updatedAt: z.coerce.date("Invalid dbUser update date format"),
});

export type DbUser = z.infer<typeof dbUserSchema>;

