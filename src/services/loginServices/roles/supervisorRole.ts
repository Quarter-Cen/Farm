import { Role } from '../iLoginService';

export class SupervisorRole implements Role {
    name = 'Supervisor';

    getRoleName(): string {
        return this.name;
    }
}