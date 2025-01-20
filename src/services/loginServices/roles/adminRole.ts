import { Role } from '../iLoginService';

export class AdminRole implements Role {
    name = 'Admin';

    getRoleName(): string {
        return this.name;
    }
}