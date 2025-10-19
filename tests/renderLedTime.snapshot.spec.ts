import {describe, expect, it} from 'vitest';
import {renderLedTime} from '../src/ledDisplay';

describe('renderLedTime snapshot', () => {
  it('renders full time (12:34.567) consistently', () => {
    const html = renderLedTime((12 * 60 + 34) * 1000 + 567);
    expect(html).toMatchSnapshot();
  });

  it('renders zero time (00:00.000) consistently', () => {
    const html = renderLedTime(0);
    expect(html).toMatchSnapshot();
  });
});

