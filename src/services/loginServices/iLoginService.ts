import { User } from "@prisma/client";


export interface ILoginService {
    login(username: string, password: string): Promise<User | null>;
    createCookie(user:User): Promise<string>;
    getUserFromSession(session: string): Promise<User | null>
    getCurrentRoles(session: string):Promise<Role[]>
}

export interface Role {
    name: string;
    getRoleName(): string;
}