import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";

interface RoleGuardProps extends PropsWithChildren {
    role: string[]
}

export default async function RoleGuard({ children, role }: RoleGuardProps) {
    let cookiesValue = await cookies();
    let roles = await fetch("http://localhost:3000/api/auth/me/roles", {
        headers: { Cookie: cookiesValue.toString() }
    })

    if (!roles.ok) {
        redirect('/login');
    }

    const userRoles = await roles.json()


    const hasAccess = userRoles.some((userRole: any) => role.includes(userRole.name))

    if (!hasAccess) {
        redirect('/login')
    }

    return <>{children}</>
}
