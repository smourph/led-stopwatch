import {Stopwatch} from '../src/stopwatch';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

describe('Stopwatch', () => {
  let originalRequestAnimationFrame: {
    (callback: FrameRequestCallback): number;
    (callback: FrameRequestCallback): number;
  };
  let originalCancelAnimationFrame: { (handle: number): void; (handle: number): void; };

  beforeEach(() => {
    vi.useFakeTimers();

    originalRequestAnimationFrame = globalThis.requestAnimationFrame;
    globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0);

    originalCancelAnimationFrame = globalThis.cancelAnimationFrame;
    globalThis.cancelAnimationFrame = (id: number) => clearTimeout(id);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();

    globalThis.requestAnimationFrame = originalRequestAnimationFrame;
    globalThis.cancelAnimationFrame = originalCancelAnimationFrame;
  });

  it('starts the stopwatch at 0', () => {
    const render = vi.fn();
    const stopwatch = new Stopwatch(render);

    stopwatch.start();

    expect(stopwatch['elapsedBeforePause']).toBe(0);
    expect(stopwatch['startTime']).toBe(0);
  });

  it('increments elapsed time after start', () => {
    const render = vi.fn();
    const stopwatch = new Stopwatch(render);

    stopwatch.start();
    vi.advanceTimersByTime(500);

    stopwatch.pause();

    expect(stopwatch['elapsedBeforePause']).toBeGreaterThanOrEqual(500);
    expect(stopwatch['startTime']).toBeNull();
  });

  it('pauses the stopwatch', () => {
    const render = vi.fn();
    const stopwatch = new Stopwatch(render);

    stopwatch.start();
    vi.advanceTimersByTime(300);
    stopwatch.pause();

    vi.advanceTimersByTime(200);
    expect(stopwatch['elapsedBeforePause']).toBe(300);
    expect(stopwatch['startTime']).toBeNull();

    vi.advanceTimersByTime(400);
    expect(stopwatch['elapsedBeforePause']).toBe(300);
  });

  it('resets the stopwatch to 0', () => {
    const render = vi.fn();
    const stopwatch = new Stopwatch(render);

    stopwatch.start();
    vi.advanceTimersByTime(400);
    stopwatch.pause();
    stopwatch.reset();

    expect(stopwatch['elapsedBeforePause']).toBe(0);
    expect(render).toHaveBeenLastCalledWith(0);
    expect(stopwatch['startTime']).toBeNull();
  });
});