import AdminGuard from '@/components/AdminGuard'


export default function VeterianDashBoard() {
    return (
        <>
            <AdminGuard role={['Veterian',]}>
                <h1>Hello Veterian</h1>
            </AdminGuard>
        </>
    )
}