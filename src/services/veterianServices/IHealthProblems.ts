export interface IHealthProblems {
    getHealthIssues(): Promise<
        Record<
            string,
            number
        >
    >
}