import RoleGuard from '@/components/RoleGuard'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>  
        <RoleGuard role={['Admin',]}>
            {children}
        </RoleGuard>
    </>
  )
}

