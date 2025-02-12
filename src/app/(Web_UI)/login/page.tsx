import LoginForm from "@/components/LoginForm"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function LoginPage() {
          const cookiesValue = await cookies()
          let roles = await fetch("http://localhost:3000/api/auth/me/roles", {
              headers : { Cookie: cookiesValue.toString()}
          })
    
          const userRole = await roles.json();
    
          if (userRole && userRole.length > 0) {
            const roleNames = userRole.map((role: any) => role.name)
            
            if (roleNames.includes("Admin")) {
              redirect("/admin/dashboard")
            } else if (roleNames.includes("Veterian")) {
              redirect("/veterian/dashboard")
            } else if (roleNames.includes("DairyWorker")) {
              redirect("/dairyworker/dashboard")
            } else if (roleNames.includes("Supervisor")) {
              redirect("/supervisor/dashboard")
            }
        }
    return (
        <div className="h-screen content-center">
            <LoginForm/>
        </div>
    )
}
