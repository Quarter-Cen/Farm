import { Role } from '../iLoginService';

export class DairyWorkerRole implements Role {
    name = 'DairyWorker';

    getRoleName(): string {
        return this.name;
    }
}

export type { Role };
