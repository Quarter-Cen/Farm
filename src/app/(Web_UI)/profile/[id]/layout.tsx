import UserPageIdGuard from "@/components/UserPageIdGuard";

export default function DefaultLayout({
  children,
  params,  // ✅ ดึง params จาก Props ของ App Router
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>  
      <UserPageIdGuard params={{ id: params.id }}> {/* ✅ ใช้ params จาก Props */}
        {children}
      </UserPageIdGuard>
    </>
  );
}
