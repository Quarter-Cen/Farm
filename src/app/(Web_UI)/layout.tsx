import DefaultGuard from "@/components/DefaultGuard"
import Sidebar from "@/components/Sidebar"

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>  
        <DefaultGuard>
            <div className="flex min-h-screen scrollbar-custom">
                <Sidebar />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </DefaultGuard>
    </>
  )
}

