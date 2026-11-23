# BTC/USDT Price Chart with SMA Signals

A React chart of the last 30 days of BTC/USDT prices from the public Binance API, with buy and sell markers where a 20-hour and a 60-hour simple moving average cross. The chart is published as a small npm package and used by a separate example app.

> **Context:** a weekend project from March 2024, kept as written. It's here as an example of earlier work; my current projects are [FlagPilot](https://github.com/dianaasamkova/flagpilot), [File Tree Explorer](https://github.com/dianaasamkova/file-tree-explorer) and [Realtime Todos](https://github.com/dianaasamkova/realtime-todos).

## What's in it

- **`lib/`**: the chart component, published to npm as [`candlestick-app-chart`](https://www.npmjs.com/package/candlestick-app-chart). Rollup builds CommonJS, ES module and type definitions, with React as a peer dependency.
- **`app/`**: a Create React App that installs the package and renders the chart.
- **Signals** (`lib/src/utils/handler.ts`): simple moving averages over closing prices and a crossover check, with Jest tests.
- **Rendering:** Chart.js through react-chartjs-2, a time axis, and arrows drawn with the annotation plugin.

## Tech stack

React 18 · TypeScript · Chart.js 4 · chartjs-plugin-annotation · axios · Rollup · Create React App · Jest

## Run it

```bash
cd app
yarn install
yarn start
```

To build the package:

```bash
cd lib
npm install
npm run build:npm
```

## What I'd do differently today

- **Align the averages with the candles.** `calculateSMA` returns a shorter array that starts at index `period - 1`, while the crossover loop reads it by candle index, so the markers land at the wrong times.
- **Draw real candlesticks.** It plots closing prices as a line; an OHLC chart would match the name.
- **Handle the request properly:** a loading state, cancelling on unmount, and typed API data instead of `any`.
- **Test the crossover itself,** with a fixture where the expected signals are known, not only that some signals appear.
