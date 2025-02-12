import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";


export default async function AdminGuard({ children }: PropsWithChildren) {
    let me = await fetch("http://localhost:3000/api/auth/me", {
        headers : { Cookie: cookies().toString()}
    })

    if(!me.ok){
        redirect('/login')
    }

    let roles = await fetch("http://localhost:3000/api/auth/me/roles", {
        headers : { Cookie: cookies().toString()}
    })

    if (!roles.ok) {
        redirect('/login');
    }

    const user = await roles.json();
    const allowedRoles = ['Admin', 'Manager'];

    const hasAccess = user.some((role:any) => allowedRoles.includes(role.name));

    if (!hasAccess) {
        redirect('/login');
    }

    return (
        <>
            { children }
        </>
    )
}