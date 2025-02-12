import AdminGuard from '@/components/AdminGuard'


export default function AdminDashboard() {
    return (
        <>
            <AdminGuard role={['Admin',]}>
                <h1>Hello Admin</h1>
            </AdminGuard>
        </>
    )
}