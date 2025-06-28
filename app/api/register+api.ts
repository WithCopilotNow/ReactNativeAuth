import { connectDB } from "@/lib/db";
import { registerUserSchema } from "@/schemas/registerUserSchema";
import { User } from "@/schemas/userSchema";
import { hashPassword } from "@/utils/hashPassword";
import { jsonErrorResponce } from "@/utils/jsonErrorResponce";

export async function POST(req: Request): Promise<Response> {
    try {
        await connectDB();
        const formData = await req.json();
        const result = registerUserSchema.safeParse(formData);
        if(!result.success) return jsonErrorResponce(result.error.issues[0].message, 400);
        const dbUser = await User.findOne({ email: result.data.email });
        if(dbUser) return jsonErrorResponce("User already exists", 409);
        const hashedPassword = await hashPassword(result.data.password);
        const newUser = await User.create({ username: result.data.username, email: result.data.email, password: hashedPassword });
        return new Response(JSON.stringify(newUser), { status: 201, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error in POST /api/register", error);
        return jsonErrorResponce("Internal server error", 500);
    }
}