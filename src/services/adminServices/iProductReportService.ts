import { ProductReport } from "@prisma/client";

export interface iCowInformationService {
    getStatProductReport() : Promise<[ProductReport]>
}
