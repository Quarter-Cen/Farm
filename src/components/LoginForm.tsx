"use client";

import { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const updateForm = (e: any, key: any) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const login = async () => {
    let response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        ...form,
      }),
    });

    console.log(response);
  };

  return (
    <div>
      email:{" "}
      <input
        type="text"
        onChange={(e) => updateForm(e, "email")}
        value={form.email}
      />{" "}
      <br />
      Password:{" "}
      <input
        type="text"
        onChange={(e) => updateForm(e, "password")}
        value={form.password}
      />{" "}
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
}
