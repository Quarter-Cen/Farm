import UserPageIdGuard from "@/components/UserPageIdGuard";

export default async function DefaultLayout({
  children,
  params,  // ✅ ดึง params จาก Props ของ App Router
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  // Ensure params is resolved before passing it
  const resolvedParams = await params;

  return (
    <>  
      <UserPageIdGuard params={{ id: resolvedParams.id }}> {/* ✅ ใช้ params จาก Props */}
        {children}
      </UserPageIdGuard>
    </>
  );
}
