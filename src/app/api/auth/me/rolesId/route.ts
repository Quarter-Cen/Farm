import { LoginService } from "@/services/login";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    const loginService = new LoginService();

    if (session) {
        let roles = await loginService.getUserRoleIds(session);
        roles = JSON.parse(JSON.stringify(roles, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
        return NextResponse.json(roles);
    }
}
