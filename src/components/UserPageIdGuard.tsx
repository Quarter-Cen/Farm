
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";

export default async function UserPageIdGuard({ children, params }: PropsWithChildren<{ params: { id: string } }>) {
    let cookiesValue = await cookies();

    let meResponse = await fetch("http://localhost:3000/api/auth/me", {
        headers: { Cookie: cookiesValue.toString() }
    });

    if (!meResponse.ok) {
        redirect('/login');
    }

    let meData = await meResponse.json(); // อ่านค่า body เป็น JSON
    let userId = meData.id?.toString(); // แปลงเป็น string เพื่อให้เทียบกับ URL param ได้ง่ายขึ้น

    console.log("User ID:", userId);
    console.log("Accessing ID:", params.id);

    // ถ้า user กำลังเข้าถึงหน้าโปรไฟล์ของคนอื่น
    if (params.id !== userId) {
        redirect(`/profile/${userId}`); // พาไปที่โปรไฟล์ของตัวเอง
    }

    return <>{children}</>;
}
