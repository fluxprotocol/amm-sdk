import { getPriceHistoryConfig, Period } from "./PriceHistoryService";

describe('PriceHistoryService', () => {
    describe('getPriceHistoryConfig', () => {
        it('should give back hour when viewing 1 day', () => {
            const now = new Date(1613051643292);
            const result = getPriceHistoryConfig(Period.OneDay, now);

            expect(result.metric).toBe('hour');
            expect(result.chosenPeriodDate).toStrictEqual(new Date(1612965243292));
        })

        it('should give back day when viewing 1 week', () => {
            const now = new Date(1613051643292);
            const result = getPriceHistoryConfig(Period.OneWeek, now);

            expect(result.metric).toBe('day');
            expect(result.chosenPeriodDate).toStrictEqual(new Date(1612446843292));
        })

        it('should give back day when viewing 3 weeks', () => {
            const now = new Date(1613051643292);
            const result = getPriceHistoryConfig(Period.ThreeWeeks, now);

            expect(result.metric).toBe('day');
            expect(result.chosenPeriodDate).toStrictEqual(new Date(1611237243292));
        })

        it('should give back day when viewing 1 month', () => {
            const now = new Date(1613051643292);
            const result = getPriceHistoryConfig(Period.OneMonth, now);

            expect(result.metric).toBe('day');
            expect(result.chosenPeriodDate).toStrictEqual(new Date(1610373243292));
        })

        it('should give back week when viewing all', () => {
            const now = new Date(1613051643292);
            const result = getPriceHistoryConfig(Period.All, now);

            expect(result.metric).toBe('week');
            expect(result.chosenPeriodDate).toStrictEqual(new Date(0));
        })
    });
});
