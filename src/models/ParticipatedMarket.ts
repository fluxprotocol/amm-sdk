import { MarketGraphData } from "./Market";

export interface ParticipatedMarket {
    participated_date: string;
    market: Omit<MarketGraphData, 'pool'>;
}
