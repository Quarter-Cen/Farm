'use client'

import { useState } from "react";
import { redirect } from "next/navigation"; 

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setForm({
      ...form,
      [key]: e.target.value,
    })
  }

  const login = async () => {
    let response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        ...form,
      }),
    })

    console.log(response);
    if (response.ok) {
      const cookiesValue = document.cookie
      let roles = await fetch("http://localhost:3000/api/auth/me/roles", {
          headers : { Cookie: cookiesValue.toString()}
      })

      const userRole = await roles.json();

      if (userRole && userRole.length > 0) {
        const roleNames = userRole.map((role: any) => role.name)
        
        if (roleNames.includes("Admin")) {
          redirect("/admin/dashboard");
        } else if (roleNames.includes("Veterian")) {
          redirect("/veterian/dashboard");
        } else if (roleNames.includes("DairyWorker")) {
          redirect("/dairyworker/dashboard");
        } else if (roleNames.includes("Supervisor")) {
          redirect("/supervisor/dashboard");
        } else {
          redirect("/login");
        }
      } else {
        alert("You do not have permission to access this page.");
      }

    } else {

      alert("Login failed. Please try again.")
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
        disabled={!isFormValid}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: isFormValid ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isFormValid ? "pointer" : "not-allowed",
        }}
      >
        Login
      </button>
    </div>
  );
}
