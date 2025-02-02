export interface IHealthCounts {
    getCattleHealthStats(): Promise<{
        month: string; 
        count: number 
    }[]>;
}
