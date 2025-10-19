export class Stopwatch {
  private startTime: number | null = null;
  private elapsedBeforePause: number = 0;
  private animationFrameId: number | null = null;
  private readonly renderCallback: (elapsed: number) => void;
  private readonly boundUpdate: () => void;
  private static readonly MAX_ELAPSED: number = 59 * 60 * 1000 + 59 * 1000 + 999;

  constructor(renderCallback: (elapsed: number) => void) {
    this.renderCallback = renderCallback;
    this.boundUpdate = this.update.bind(this); // bind once
  }

  public start(): void {
    if (this.isRunning()) return;

    this.startTime = performance.now();
    this.animationFrameId = requestAnimationFrame(this.boundUpdate);
  }

  public pause(): void {
    if (!this.isRunning()) return;

    this.elapsedBeforePause += performance.now() - (this.startTime as number);
    this.startTime = null;
    this.cancelAnimationFrame();
  }

  public reset(): void {
    this.startTime = null;
    this.elapsedBeforePause = 0;
    this.cancelAnimationFrame();
    this.renderCallback(0);
  }

  private update(): void {
    if (!this.isRunning()) return;

    const now: number = performance.now();
    let elapsed: number = this.elapsedBeforePause + (now - (this.startTime as number));
    if (elapsed > Stopwatch.MAX_ELAPSED) {
      elapsed = Stopwatch.MAX_ELAPSED;
      this.pause();
    }

    this.renderCallback(elapsed);
    this.animationFrameId = requestAnimationFrame(this.boundUpdate);
  }

  private cancelAnimationFrame(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public isRunning(): boolean {
    return this.startTime !== null;
  }

  public destroy(): void {
    this.cancelAnimationFrame();
    this.startTime = null;
    this.elapsedBeforePause = 0;
  }
}