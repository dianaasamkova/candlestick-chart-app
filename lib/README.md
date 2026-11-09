# candlestick-app-chart

React component that charts BTC/USDT hourly prices for the last 30 days (from the Binance public API) and marks buy/sell signals where SMA(20) crosses SMA(60).

## Install

```bash
npm install candlestick-app-chart
```

Peer dependencies: `react` and `react-dom` ≥ 17.

## Usage

```tsx
import { CandlestickChart } from "candlestick-app-chart";

export default function Page() {
  return <CandlestickChart />;
}
```

## Development

```bash
yarn install
yarn test --watchAll=false   # unit tests for SMA and signal generation
yarn build                   # Rollup → dist/cjs, dist/esm, dist/types.d.ts
```

See the [repository README](https://github.com/dianaasamkova/candlestick-chart-app) and [TECH.md](https://github.com/dianaasamkova/candlestick-chart-app/blob/master/TECH.md) for design notes.
