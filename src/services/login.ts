// LoginService.ts
import { PrismaClient, User } from '@prisma/client';
import { AdminRole } from './loginServices/roles/adminRole';
import { SupervisorRole } from './loginServices/roles/supervisorRole';
import { DairyWorkerRole } from './loginServices/roles/dairyWorkerRole';
import { VeterianRole } from './loginServices/roles/veterianRole';
import { Role } from './loginServices/iLoginService';
import { ILoginService } from './loginServices/iLoginService';

const prisma = new PrismaClient();

export class LoginService implements ILoginService {
    async login(username: string, password: string): Promise<User | null> {
        return null
    }

    async createCookie(user: User): Promise<string> {
        let cookie = ""
        return cookie;
    }

    async getUserFromSession(session: string):Promise<User | null> {
        return null
    }

    async getCurrentRoles(session: string): Promise<Role[]> {
    const user = await prisma.user.findUnique({
        where: { email: session }, // หรือถ้า session คือ userId ก็ใช้ userId
        include: {
            admin: true,       // เพิ่มการดึงข้อมูล admin
            supervisor: true,  // เพิ่มการดึงข้อมูล supervisor
            dairyWorker: true, // เพิ่มการดึงข้อมูล dairyWorker
            veterian: true,    // เพิ่มการดึงข้อมูล veterian
        },
    });

    if (!user) {
        return [];
    }

    const roles: Role[] = [];

    if (user.admin) {
        roles.push(new AdminRole());
    }

    if (user.supervisor) {
        roles.push(new SupervisorRole());
    }

    if (user.dairyWorker) {
        roles.push(new DairyWorkerRole());
    }

    if (user.veterian) {
        roles.push(new VeterianRole());
    }

    return roles;
}

}
