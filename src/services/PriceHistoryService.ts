import subDays from 'date-fns/subDays';
import subWeeks from 'date-fns/subWeeks';
import subMonths from 'date-fns/subMonths';
import { queryGraph } from './GraphQLService';
import { SdkConfig } from '../models/SdkConfig';
import { PriceHistoryData } from '../models/PriceHistoryData';

export enum Period {
    OneDay = '1d',
    OneWeek = '1w',
    OneMonth = '1m',
    ThreeWeeks = '3w',
    All = 'all',
}

interface GetPriceHistoryConfigResult {
    chosenPeriodDate: Date;
    metric: string;
}

export function getPriceHistoryConfig(period: Period, now = new Date()): GetPriceHistoryConfigResult {
    switch (period) {
        case Period.OneDay:
            return {
                chosenPeriodDate: subDays(now, 1),
                metric: 'hour',
            };
        case Period.OneWeek:
            return {
                chosenPeriodDate: subWeeks(now, 1),
                metric: 'day',
            };
        case Period.ThreeWeeks:
            return {
                chosenPeriodDate: subWeeks(now, 3),
                metric: 'day',
            };
        case Period.OneMonth:
            return {
                chosenPeriodDate: subMonths(now, 1),
                metric: 'day',
            }
        case Period.All:
            return {
                chosenPeriodDate: new Date(0),
                metric: 'week'
            };
    }
}

export async function getPriceHistoryByMarketId(sdkConfig: SdkConfig, marketId: string, period: Period): Promise<PriceHistoryData[]> {
    const historyConfig = getPriceHistoryConfig(period);

    const result = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'MarketPriceHistory',
        query: `
            query MarketPriceHistory($marketId: String!, $beginTimestamp: String!, $dateMetric: DateMetric) {
                history: getPriceHistory(poolId: $marketId, beginTimestamp: $beginTimestamp, dateMetric: $dateMetric) {
                    pointKey
                    dataPoints {
                        outcome
                        price
                    }
                }
            }
        `,
        variables: {
            marketId,
            beginTimestamp: historyConfig.chosenPeriodDate.getTime().toString(),
            dateMetric: historyConfig.metric,
        }
    });

    return result?.data?.history || [];
}
