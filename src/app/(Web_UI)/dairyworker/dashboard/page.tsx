import RoleGuard from '@/components/RoleGuard'


export default function DairyWorkerDashBoard() {
    return (
        <>
            <RoleGuard role={['DairyWorker']}>
                <h1>Hello DairyWorker</h1>
            </RoleGuard>
        </>
    )
}