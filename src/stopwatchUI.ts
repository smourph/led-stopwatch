import {Stopwatch} from './stopwatch';
import {formatTimeString, renderLedTime} from './ledDisplay';

export class StopwatchUI {
  private readonly stopwatch: Stopwatch;
  private readonly stopwatchDiv: HTMLElement;
  private readonly container: HTMLElement;
  private readonly resetBtn: HTMLButtonElement | null;

  private readonly boundOnContainerClick: (e: MouseEvent) => void;
  private readonly boundOnResetClick: (e: MouseEvent) => void;
  private readonly boundOnKeyDown: (e: KeyboardEvent) => void;

  constructor() {
    const container = document.getElementById('stopwatch-container');
    const stopwatchEl = document.getElementById('stopwatch');

    if (!container || !stopwatchEl) {
      throw new Error('StopwatchUI: required DOM elements not found (#stopwatch-container, #stopwatch)');
    }

    this.container = container;
    this.stopwatchDiv = stopwatchEl;

    const reset = document.getElementById('reset');
    this.resetBtn = reset instanceof HTMLButtonElement ? reset : null;

    this.stopwatch = new Stopwatch(this.render.bind(this));

    this.boundOnContainerClick = this.onContainerClick.bind(this);
    this.boundOnResetClick = this.onResetClick.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);

    this.attachEvents();
    this.render(0);
  }

  private render(elapsed: number): void {
    const timeStr: string = formatTimeString(elapsed);

    this.stopwatchDiv.innerHTML = renderLedTime(elapsed);

    this.stopwatchDiv.setAttribute('data-time', timeStr);
    this.stopwatchDiv.setAttribute('aria-label', timeStr);
  }

  private onContainerClick(): void {
    if (this.stopwatch.isRunning()) {
      this.stopwatch.pause();
    } else {
      this.stopwatch.start();
    }
  }

  private onResetClick(e: MouseEvent): void {
    e.stopPropagation();
    this.stopwatch.reset();
  }

  private onKeyDown(e: KeyboardEvent): void {
    // Space toggles start/pause, Escape resets
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      this.stopwatch.isRunning() ? this.stopwatch.pause() : this.stopwatch.start();
    } else if (e.key === 'Escape') {
      this.stopwatch.reset();
    }
  }

  private attachEvents(): void {
    this.container.addEventListener('click', this.boundOnContainerClick);
    if (this.resetBtn) this.resetBtn.addEventListener('click', this.boundOnResetClick);
    document.addEventListener('keydown', this.boundOnKeyDown);
  }

  public destroy(): void {
    this.container.removeEventListener('click', this.boundOnContainerClick);
    if (this.resetBtn) this.resetBtn.removeEventListener('click', this.boundOnResetClick);
    document.removeEventListener('keydown', this.boundOnKeyDown);
    this.stopwatch.destroy();
  }
}
