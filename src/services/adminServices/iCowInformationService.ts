import { Cow } from "@prisma/client";

export interface iCowInformationService {
  AddCow(
    name: string,
    gender: string,
    age: number,
    birthDate: Date,
    breed: string,
    healthStatus: string
  ): Promise<Cow>
  editCow(id: bigint) : Promise<Cow>
  deleteCow(id: bigint): Promise<void>
  getAllCow(): Promise<Cow[]>
  getCowByID(id: bigint): Promise<Cow | null>
}
