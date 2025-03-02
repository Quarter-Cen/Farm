import UserPageIdGuard from "@/components/UserPageIdGuard";

export default async function DefaultLayout({
  children,
  params,  // props coming from App Router
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>; // Make params a Promise
}) {
  // Wait for the params to resolve if it's a Promise
  const resolvedParams = await params;

  return (
    <>  
      <UserPageIdGuard params={{ id: resolvedParams.id }}> {/* Use the resolved params */}
        {children}
      </UserPageIdGuard>
    </>
  );
}
