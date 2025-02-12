import { LoginService } from "@/services/login";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(request:Request) {
    
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value
    const loginService = new LoginService()
    if (session) {
        let user = await loginService.getUserFromSession(session)
        return NextResponse.json({
            username: user?.email,
            fullname: user?.firstName
        })
    }
    return NextResponse.json({error : "Not Authorize"}, {status : 401})
}