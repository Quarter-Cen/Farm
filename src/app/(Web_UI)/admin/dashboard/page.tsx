import AdminGuard from '@/components/AdminGuard'
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