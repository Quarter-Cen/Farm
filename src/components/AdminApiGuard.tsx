import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function AdminApiGuard(request: Request) {
  const cookieStore = cookies();
  const session = (await cookieStore).get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let meResponse = await fetch("http://localhost:3000/api/auth/me/roles", {
    headers: { Cookie: `session=${session}` },
  });

  if (!meResponse.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let roles = await meResponse.json();

  // ตรวจสอบว่า user มี role "Admin" หรือไม่
  const isAdmin = roles.some(role => role.name === "Admin");

  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
