import AdminGuard from '@/components/RoleGuard'


export default function SupervisorDashBoard() {
    return (
        <>
            <AdminGuard role={['Supervisor',]}>
                <h1>Hello Supervisor</h1>
            </AdminGuard>
        </>
    )
}