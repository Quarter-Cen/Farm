import { Treatment } from "@prisma/client";

export interface iCowCareReportService {
    getStatTreatmentReport() : Promise<Treatment[]>
}
