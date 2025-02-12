import AdminGuard from '@/components/AdminGuard'


export default function LoginPage() {
    return (
        <>
            <AdminGuard>
                <h1>Hello Admin</h1>
            </AdminGuard>
        </>
    )
}