import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function DefaultApiGuard(request : Request) {
  const cookieStore = cookies();
  const session = (await cookieStore).get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let me = await fetch("http://localhost:3000/api/auth/me", {
    headers: { Cookie: `session=${session}` },
  });

  if (!me.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

