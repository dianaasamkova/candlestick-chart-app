export interface CandlestickDataPoint {
    closeTime: number;
    close: string;
    volume: string;
}

export interface Signal {
    type: "buy" | "sell";
    timestamp: number;
    price: string;
    volume: string;

}

export function generateSignals(candlestickData: CandlestickDataPoint[]): Signal[] {
    const signals: Signal[] = [];


    const shortPeriod: number = 20;
    const longPeriod: number = 60;

    const shortSMA: number[] = calculateSMA(candlestickData, shortPeriod);
    const longSMA: number[] = calculateSMA(candlestickData, longPeriod);


    // calculateSMA returns one value per complete window: sma[k] is the average of the window ending at candle
    // k + period - 1. Shift by that offset so both averages describe the same candle i.
    const shortAt = (i: number): number => shortSMA[i - (shortPeriod - 1)];
    const longAt = (i: number): number => longSMA[i - (longPeriod - 1)];

    // Start at the second candle that has a long SMA, so the previous candle has one too.
    for (let i = longPeriod; i < candlestickData.length; i++) {
        const currentShortSMA: number = shortAt(i);
        const currentLongSMA: number = longAt(i);
        const previousShortSMA: number = shortAt(i - 1);
        const previousLongSMA: number = longAt(i - 1);


        if (currentShortSMA > currentLongSMA && previousShortSMA <= previousLongSMA) {
            signals.push({
                type: "buy",
                timestamp: candlestickData[i].closeTime,
                price: candlestickData[i].close,
                volume: candlestickData[i].volume,
            });
        } else if (currentShortSMA < currentLongSMA && previousShortSMA >= previousLongSMA) {
            signals.push({
                type: "sell",
                timestamp: candlestickData[i].closeTime,
                price: candlestickData[i].close,
                volume: candlestickData[i].volume,
            });
        }
    }

    return signals;
}

// Function that calculates simple moving average (SMA) for a given period
export function calculateSMA(data: CandlestickDataPoint[], period: number): number[] {
    const smaValues: number[] = [];
    for (let i = period - 1; i < data.length; i++) {
        let sum: number = 0;
        for (let j = i; j > i - period; j--) {
            sum += parseFloat(data[j].close.toString());
        }
        smaValues.push(sum / period);
    }
    return smaValues;
}
