import { LoginService } from "@/services/login"
import { NextResponse } from "next/server";
import * as cookie from 'cookie'
export async function POST(request:Request) {
    let data = await request.json()
    let loginService = new LoginService()
    let user = data as {email:string; password:string}
    let loginResponse = await loginService.login(user.email, user.password)
    if (loginResponse) {
        let cookieResponse = await loginService.createCookie(loginResponse)
        let res = NextResponse.json("Login successful")
        let parse_cookie = cookie.parse(cookieResponse)
        for (let i in parse_cookie) {
            if (parse_cookie[i]) {
                res.cookies.set(i, parse_cookie[i])
            }
        }
        return res
    } else {
        let res = NextResponse.json('Login Unsuccessful', {
            status : 404
        })
        return res
    }
}