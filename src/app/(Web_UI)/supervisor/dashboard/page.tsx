import AdminGuard from '@/components/AdminGuard'


export default function SupervisorDashBoard() {
    return (
        <>
            <AdminGuard role={['Supervisor',]}>
                <h1>Hello Supervisor</h1>
            </AdminGuard>
        </>
    )
}