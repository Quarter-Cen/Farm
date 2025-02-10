// LoginService.ts
import { PrismaClient, User } from '@prisma/client';
import { AdminRole } from './loginServices/roles/adminRole';
import { SupervisorRole } from './loginServices/roles/supervisorRole';
import { DairyWorkerRole } from './loginServices/roles/dairyWorkerRole';
import { VeterianRole } from './loginServices/roles/veterianRole';
import { Role } from './loginServices/iLoginService';
import { ILoginService } from './loginServices/iLoginService';
import { serialize } from 'cookie';
import * as jose from 'jose';
import * as dotenv from 'dotenv';

dotenv.config(); 

const prisma = new PrismaClient();

export class LoginService implements ILoginService {
    async login(email: string, password: string): Promise<User | null> {
        const prisma = new PrismaClient();
        try {
            return await prisma.user.findUniqueOrThrow({
                where: {
                    email: email,
                    password: password
                }
            });
        } catch (exception) {
            return null;
        }
    }

    async createCookie(user: User): Promise<string> {

        const byteSecret = jose.base64url.decode(String(process.env.SECRET_KEY));


        const jwt = await new jose.EncryptJWT({'email': user.email, 'fullname': user.firstName + " " + user.lastName })
            .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' }) 
            .setExpirationTime('1w')
            .encrypt(byteSecret);  
        console.log(jwt);  

    
        const cookie = serialize('session', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, 
            path: '/',
        });

        return cookie;
    }

    async getUserFromSession(session: string):Promise<User | null> {
        const byteSecret = jose.base64url.decode(String(process.env.SECRET_KEY))
        let {payload, protectedHeader} = await jose.jwtDecrypt(session,byteSecret)
        let time = (new Date()).getTime()
        console.log(time,payload.exp)
        if (payload.exp && time < payload.exp * 1000){
            let email = payload.email ?? null
            if(email){
                const prisma = new PrismaClient()
                let user = await prisma.user.findFirst({
                    where : {
                        email: email
                    }
                })
                return user
            }
        }
        console.error("not found user from session")
        return null
    }

    async getCurrentRoles(session: string): Promise<Role[]> {
        let user = await this.getUserFromSession(session)
        if (!user) {
            
            return [];
        }
        console.log('User details:', user);

        const currentUser = await prisma.user.findUnique({
            where: { id: user.id },
            include: {
              admin: true,
              supervisor: true,
              dairyWorker: true,
              veterian: true,
            },
          });

        if (!currentUser) {
            console.error("not found current user")
            return [];
        }


    const roles: Role[] = [];

    if (currentUser.admin) {
        roles.push(new AdminRole());
    }

    if (currentUser.supervisor) {
        roles.push(new SupervisorRole());
    }

    if (currentUser.dairyWorker) {
        roles.push(new DairyWorkerRole());
    }

    if (currentUser.veterian) {
        roles.push(new VeterianRole());
    }

    return roles;
}

}
