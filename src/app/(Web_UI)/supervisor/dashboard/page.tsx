import RoleGuard from '@/components/RoleGuard'


export default function SupervisorDashBoard() {
    return (
        <>
            <RoleGuard role={['Supervisor',]}>
                <h1>Hello Supervisor</h1>
            </RoleGuard>
        </>
    )
}