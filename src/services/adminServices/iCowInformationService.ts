import { Cow } from "@prisma/client";

export interface iCowInformationService {
  AddCow(
    name: string,
    gender: string,
    age: number,
    birthDate: Date,
    breed: string,
    healthStatus: string
  ): Promise<Cow | null>
  editCow(id: bigint, updatedData: Partial<Cow>) : Promise<Cow | null>
  deleteCow(id: bigint): Promise<string>
  getAllCow(): Promise<Cow[]>
  getCowByID(id: bigint): Promise<Cow | null>
}
