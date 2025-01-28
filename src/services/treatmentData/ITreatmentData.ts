import { Treatment } from "@prisma/client";

export interface ITreatmentData {
    getTreatmentData(
        id: bigint | null,
        nameDisease: string | null,
        events: string | null,
        details: string | null,
        date: Date | null,
        drugName: string | null,
        status: string | null,
        responsibleMan: string | null,
        notation: string | null,
        veterianId: bigint | null,
        cowId: bigint | null
    ): Promise<Treatment | null>

    createTreatmentData(
        nameDisease: string,
        events: string,
        details: string,
        date: Date,
        drugName: string,
        status: string,
        responsibleMan: string,
        notation: string,
        veterianId: bigint,  // ID ของสัตวแพทย์
        cowId: bigint        // ID ของวัว
    ): Promise<Treatment>

    updateTreatmentData(
        id: bigint,
        nameDisease?: string,
        events?: string,
        details?: string,
        date?: Date,
        drugName?: string,
        status?: string,
        responsibleMan?: string,
        notation?: string
    ): Promise<Treatment | null>

    deleteTreatmentData(
        id: bigint 
    ):Promise<Treatment | null>
}