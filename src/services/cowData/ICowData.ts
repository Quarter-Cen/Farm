import { Cow } from "@prisma/client";

export interface ICowData {
    getCowData(
        id: bigint,
        name: string,
        gender: string,
        age: number,
        weight: number,
        birthdate: Date,
        breed: string,
        healthStatus: string,
        recordedAt: Date,
        veterianId: bigint
    ): Promise<Cow | null>;

    editCowData(
        id: bigint,
        name?: string,
        gender?: string,
        age?: number,
        weight?: number,
        birthdate?: Date,
        breed?: string,
        healthStatus?: string,
        recordedAt?: Date,
        veterianId?: bigint
    ): Promise<Cow | null>;

    createCowData(
        name: string,
        gender: string,
        age: number,
        weight: number,
        birthdate: Date,
        breed: string,
        healthStatus: string,
        recordedAt: Date,
        veterianId: bigint
    ): Promise<Cow>

    deleteCowData(
        id: bigint
    ): Promise<Cow | null>
}