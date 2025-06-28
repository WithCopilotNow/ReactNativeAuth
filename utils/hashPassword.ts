import { randomBytes, scrypt, type BinaryLike } from "node:crypto";
import { promisify } from "node:util";

export const scryptAsync: (password: BinaryLike, salt: BinaryLike, keyLen: number) => Promise<Buffer> = promisify(scrypt);

export async function hashPassword(confirmPassword: string): Promise<string> {
    try {
        const salt = randomBytes(32);
        const password = await scryptAsync(confirmPassword, salt, 64);
        return `${password.toString("hex")}:${salt.toString("hex")}`;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Failed to hash password");
    }
  
}
