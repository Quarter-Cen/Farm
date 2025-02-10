import { ProductReport } from "@prisma/client";

export interface iProductReportService {
    getStatProductReport() : Promise<ProductReport[]>
}
