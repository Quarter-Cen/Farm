export interface IWeightData {
    getWeight(
        weight: number,
        recordedAt: Date
    ): Promise<{
        month: string; // ชื่อเดือน
        averageWeight: number; // น้ำหนักเฉลี่ย
        minWeight: number; // น้ำหนักต่ำสุด
        maxWeight: number; // น้ำหนักสูงสุด
    }[]>
}