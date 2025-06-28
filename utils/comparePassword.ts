import { timingSafeEqual } from "node:crypto";
import { scryptAsync } from "./hashPassword";


export async function comparePassword(password: string, hash: string): Promise<boolean> {
    try {
        const [ oldHash, salt ] = hash.split(":");
        const parsedSalt = Buffer.from(salt, "hex");
        const parsedHashPassword = Buffer.from(oldHash, "hex");
        const hashPassword = await scryptAsync(password, parsedSalt, 64);
        return timingSafeEqual(hashPassword, parsedHashPassword);
    } catch (error) {
        console.error("Error comparing password:", error);
        throw error;
    }
  
}
