import AdminGuard from '@/components/AdminGuard'


export default function DairyWorkerDashBoard() {
    return (
        <>
            <AdminGuard role={['DairyWorker']}>
                <h1>Hello DairyWorker</h1>
            </AdminGuard>
        </>
    )
}