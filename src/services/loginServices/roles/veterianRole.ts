import { Role } from '../iLoginService';

export class VeterianRole implements Role {
    name = 'Veterian';

    getRoleName(): string {
        return this.name;
    }
}