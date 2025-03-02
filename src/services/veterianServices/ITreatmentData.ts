import { Treatment } from "@prisma/client";
import { HealthStatus } from '@prisma/client';

export interface ITreatmentData {
    AddTreatmentData(
        nameDisease: string,
        events: string,
        details: string,
        date: Date,
        drugName: string,
        status: HealthStatus,
        notation: string,
        veterianId: bigint,
        cowId: bigint,
        cowWeight: number,
    ): Promise<Treatment | null>
    editTreatmentData(id: bigint, updatedData: Partial<Treatment>): Promise<Treatment | null>
    deleteTreatmentData(id: bigint):Promise<String>
    getCowWithTreatment(): Promise<Treatment[] | null>
    getTreatmentByID(id: bigint): Promise<Treatment | null>
    getAllTreatmentByVetID(id: bigint):Promise<Treatment[] | null>
}