import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";


export default async function DefaultGuard({ children }: PropsWithChildren) {
    let cookiesValue = await cookies()
    let me = await fetch("http://localhost:3000/api/auth/me", {
        headers : { Cookie: cookiesValue.toString()}
    })

    if(!me.ok){
        redirect('/login')
    }

    return (
        <>
            { children }
        </>
    )
}