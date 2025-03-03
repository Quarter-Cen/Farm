"use client"

import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm"; 
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuth = async () => {
      try {
        // Check if user is already authenticated
        const response = await fetch("/api/auth/me/roles", {
          credentials: "include" // Important for cookies
        });

        if (response.ok) {
          const userRole = await response.json();
          
          if (userRole && userRole.length > 0) {
            const roleNames = userRole.map((role) => role.name);
            
            // Redirect based on user role
            if (roleNames.includes("Admin")) {
              router.push("/admin/dashboard");
            } else if (roleNames.includes("Veterian")) {
              router.push("/veterian/treatment");
            } else if (roleNames.includes("DairyWorker")) {
              router.push("/dairyworker/resorce");
            } else if (roleNames.includes("Supervisor")) {
              router.push("/supervisor/productReport");
            }
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking auth
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-screen content-center">
      <LoginForm />
    </div>
  );
}