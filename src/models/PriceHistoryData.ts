interface PriceForOutcome {
    price: string;
    outcome: number;
}

export interface PriceHistoryData {
    pointKey: string;
    dataPoints: PriceForOutcome[];
}
