import { generateSignals, calculateSMA, CandlestickDataPoint, Signal } from "./handler";

describe("generateSignals function", () => {
    it("should generate signals", () => {
        const candlestickData: CandlestickDataPoint[] = [];
        // Prices gradually decrease
        for (let i = 1; i <= 120; i++) {
            candlestickData.push({
                closeTime: i,
                close: (1 / i).toString(),
                volume: "100",
            });
        }

        // Prices then increase
        for (let i = 0; i <= 60; i++) {
            candlestickData.push({
                closeTime: i,
                close: (i * 100).toString(),
                volume: "100",
            });
        }

        const signals: Signal[] = generateSignals(candlestickData);
        expect(signals.length).toBeGreaterThan(0);
    });
})

describe("calculateSMA", () => {
    it("should calculate SMA correctly for a given period", () => {
        const candlestickData: CandlestickDataPoint[] = [
            { closeTime: 1, close: "10", volume: "100" },
            { closeTime: 2, close: "15", volume: "150" },
            { closeTime: 3, close: "20", volume: "200" },
        ];
        const period = 3;
        const expectedSMAValues = [(10 + 15 + 20) / 3]; // Expected SMA value for period of 3
        const actualSMAValues = calculateSMA(candlestickData, period);
        expect(actualSMAValues).toEqual(expectedSMAValues);
    });
});

describe("generateSignals: crossover timing", () => {
    // Flat at 100, then a step up to 200 at index 80.
    // Hand-checked at index 80: SMA20 = (19*100 + 200)/20 = 105 > SMA60 = (59*100 + 200)/60 ≈ 101.7,
    // and at index 79 both are 100, so the crossover (a buy) happens exactly at index 80.
    const series: CandlestickDataPoint[] = Array.from({length: 160}, (_, i) => ({
        closeTime: i,
        close: String(i < 80 ? 100 : 200),
        volume: "1",
    }));

    it("emits a single buy on the candle where the short SMA crosses above the long SMA", () => {
        expect(generateSignals(series)).toEqual([{type: "buy", timestamp: 80, price: "200", volume: "1"}]);
    });

    it("emits a sell on the candle where the short SMA crosses below the long SMA", () => {
        const down = series.map((point) => ({...point, close: point.close === "200" ? "50" : "100"}));
        expect(generateSignals(down)).toEqual([{type: "sell", timestamp: 80, price: "50", volume: "1"}]);
    });

    it("emits nothing when there is not enough data for the long SMA", () => {
        expect(generateSignals(series.slice(0, 59))).toEqual([]);
    });
});
