import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation"; 
import { cookies } from "next/headers";

const router = useRouter()
export default async function LoginPage() {
          const cookiesValue = await cookies();
          if(cookiesValue.get('session')){
            let roles = await fetch("http://localhost:3000/api/auth/me/roles", {
              headers : { Cookie: cookiesValue.toString()}
          })
    
          const userRole = await roles.json();
    
          if (userRole && userRole.length > 0) {
            const roleNames = userRole.map((role: any) => role.name)
            
            if (roleNames.includes("Admin")) {
              router.push("/admin/dashboard")
            } else if (roleNames.includes("Veterian")) {
              router.push("/veterian/treatment")
            } else if (roleNames.includes("DairyWorker")) {
              router.push("/dairyworker/resorce")
            } else if (roleNames.includes("Supervisor")) {
              router.push("/supervisor/productReport")
            }
          }
        }
    return (
        <div className="h-screen content-center">
            <LoginForm/>
        </div>
    )
}
