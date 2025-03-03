"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()
  const [id, setId] = useState("");
  
  useEffect(() => {
    fetch("/api/auth/me/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          console.log(data)
          setId(data.id)
          router.push(`/profile/${data.id}`);
        }
      })
      .catch((error) => console.log("Error fetching roles:", error));
  }, [router]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}