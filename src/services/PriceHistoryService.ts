import { queryGraph } from './GraphQLService';
import { SdkConfig } from '../models/SdkConfig';
import { PriceHistoryData } from '../models/PriceHistoryData';

export enum DateMetric {
    minute = "minute",
    hour = "hour",
    day = "day",
    week = "week",
    month = "month",
    year = "year",
}

export interface PriceHistoryOptions {
    beginDate: Date;
    metric: DateMetric;
    endDate?: Date;
}

export async function getPriceHistoryByMarketId(sdkConfig: SdkConfig, marketId: string, options: PriceHistoryOptions): Promise<PriceHistoryData[]> {
    const result = await queryGraph(sdkConfig.graphApiUrl, {
        operationName: 'MarketPriceHistory',
        query: `
            query MarketPriceHistory($marketId: String!, $beginTimestamp: String!, $endTimestamp: String, $dateMetric: DateMetric) {
                history: getPriceHistory(poolId: $marketId, beginTimestamp: $beginTimestamp, endTimestamp: $endTimestamp, dateMetric: $dateMetric) {
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
            beginTimestamp: options.beginDate.getTime().toString(),
            endTimestamp: options.endDate?.getTime().toString(),
            dateMetric: options.metric,
        }
    });

    return result?.data?.history || [];
}
