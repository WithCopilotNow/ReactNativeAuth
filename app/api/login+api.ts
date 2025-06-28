import { connectDB } from "@/lib/db";
import { loginUserSchema } from "@/schemas/loginUserSchema";
import { dbUserSchema, User } from "@/schemas/userSchema";
import { comparePassword } from "@/utils/comparePassword";
import { jsonErrorResponce } from "@/utils/jsonErrorResponce";

export async function POST(req: Request): Promise<Response> {
    try {
        await connectDB();
        const formData = await req.json();
        const result = loginUserSchema.safeParse(formData);
        if(!result.success) return jsonErrorResponce(result.error.issues[0].message, 400);
        const dbUser = await User.findOne({ email: result.data.email });
        if(!dbUser) return jsonErrorResponce("User not found", 404);
        const parsedDbUser = dbUserSchema.parse(dbUser);
        const isEqual = await comparePassword(result.data.password, parsedDbUser.password);
        if(!isEqual) return jsonErrorResponce("Invalid password", 401);
        return new Response(JSON.stringify(parsedDbUser), { status: 202, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error in POST /api/login", error);
        return jsonErrorResponce("Internal server error", 500);
    }
}