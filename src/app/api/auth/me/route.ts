import { LoginService } from "@/services/login";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    const loginService = new LoginService();

    if (session) {
        let user = await loginService.getUserFromSession(session);
        
        return NextResponse.json({
            username: user?.email,
            fullname: user?.firstName,
            id: user?.id ? user.id.toString() : null // แปลง bigint เป็น string ถ้ามีค่า
        });
    }

    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
}
