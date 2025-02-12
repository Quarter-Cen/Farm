import DefaultGuard from "@/components/DefaultGuard"

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>  
        <DefaultGuard>
            {children}
        </DefaultGuard>
    </>
  )
}

