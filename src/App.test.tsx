import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import CandlestickChart from './components/Chart';

jest.mock('./components/Chart', () => jest.fn(() => "Chart"));

describe('App', () => {
  it('renders App component without crashin and CandlestickChart component', () => {
    render(<App />);
    expect(CandlestickChart).toHaveBeenCalledTimes(1);
  });
});
