import RoleGuard from '@/components/RoleGuard'


export default function VeterianDashBoard() {
    return (
        <>
            <RoleGuard role={['Veterian',]}>
                <h1>Hello Veterian</h1>
            </RoleGuard>
        </>
    )
}