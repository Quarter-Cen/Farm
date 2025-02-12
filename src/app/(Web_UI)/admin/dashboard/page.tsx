import AdminGuard from '@/components/RoleGuard'
import Dashboard from '@/components/AdminDashboard'


export default function AdminDashboard() {
    return (
        <>
            <AdminGuard role={['Admin',]}>
                <Dashboard/>
            </AdminGuard>
        </>
    )
}