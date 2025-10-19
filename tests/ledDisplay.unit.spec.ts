import {describe, expect, it} from 'vitest';
import {formatTimeString} from '../src/ledDisplay';

describe('formatTimeString', () => {
  it('formats zero correctly', () => {
    expect(formatTimeString(0)).toBe('00:00.000');
  });

  it('milliseconds correctly', () => {
    expect(formatTimeString(123)).toBe('00:00.123');
    expect(formatTimeString(61000)).toBe('01:01.000');
  });

  it('formats secondes correctly', () => {
    expect(formatTimeString(12345)).toBe('00:12.345');
  });

  it('formats minutes', () => {
    expect(formatTimeString(2100987)).toBe('35:00.987');
  });

  it('clamps to max 59:59.999', () => {
    const beyond = 999999 * 60 * 1000;
    expect(formatTimeString(beyond)).toBe('59:59.999');
  });
});

