import { Treatment } from "@prisma/client";

export interface ITreatmentData {
    AddTreatmentData(
        nameDisease: string,
        events: string,
        details: string,
        date: Date,
        drugName: string,
        status: string,
        notation: string,
    ): Promise<Treatment | null>
    editTreatmentData(id: bigint, updatedData: Partial<Treatment>): Promise<Treatment | null>
    deleteTreatmentData(id: bigint):Promise<String>
    getCowWithTreatment(): Promise<Treatment[]>
    getTreatmentByID(id: bigint): Promise<Treatment | null>
}