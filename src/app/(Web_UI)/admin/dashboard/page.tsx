import RoleGuard from '@/components/RoleGuard'
import Dashboard from '@/components/AdminDashboard'


export default function AdminDashboard() {
    return (
        <>
            <RoleGuard role={['Admin',]}>
                <Dashboard/>
            </RoleGuard>
        </>
    )
}