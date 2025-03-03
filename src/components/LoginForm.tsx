'use client'

import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const login = async () => {
    setIsLoading(true);
    try {
      let response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          ...form,
        }),
      });

      if (response.ok) {
        // Use relative URL and include credentials to send cookies
        let rolesResponse = await fetch("/api/auth/me/roles", {
          credentials: "include" // This is important to send cookies
        });

        if (rolesResponse.ok) {
          const userRole = await rolesResponse.json();

          if (userRole && userRole.length > 0) {
            const roleNames = userRole.map((role: any) => role.name);
            
            // Use router.push instead of redirect for client components
            if (roleNames.includes("Admin")) {
              router.push("/admin/dashboard");
            } else if (roleNames.includes("Veterian")) {
              router.push("/veterian/dashboard");
            } else if (roleNames.includes("DairyWorker")) {
              router.push("/dairyworker/dashboard");
            } else if (roleNames.includes("Supervisor")) {
              router.push("/supervisor/dashboard");
            } else {
              router.push("/login");
            }
          } else {
            alert("You do not have permission to access this page.");
          }
        } else {
          alert("Failed to retrieve user roles.");
        }
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = form.email && form.password;

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
          Email:
        </label>
        <input
          id="email"
          type="email"
          onChange={(e) => updateForm(e, "email")}
          value={form.email}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
          Password:
        </label>
        <input
          id="password"
          type="password"
          onChange={(e) => updateForm(e, "password")}
          value={form.password}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />
      </div>
      <button
        onClick={login}
        disabled={!isFormValid || isLoading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: isFormValid && !isLoading ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isFormValid && !isLoading ? "pointer" : "not-allowed",
        }}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}