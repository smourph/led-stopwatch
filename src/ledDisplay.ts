const LED_PATTERNS: number[][] = [
  [1, 1, 1, 1, 1, 1, 0], // 0
  [0, 1, 1, 0, 0, 0, 0], // 1
  [1, 1, 0, 1, 1, 0, 1], // 2
  [1, 1, 1, 1, 0, 0, 1], // 3
  [0, 1, 1, 0, 0, 1, 1], // 4
  [1, 0, 1, 1, 0, 1, 1], // 5
  [1, 0, 1, 1, 1, 1, 1], // 6
  [1, 1, 1, 0, 0, 0, 0], // 7
  [1, 1, 1, 1, 1, 1, 1], // 8
  [1, 1, 1, 1, 0, 1, 1], // 9
] as const;

type Variant = 'standard' | 'small' | 'bottom' | 'small-bottom';

export function renderLedDigit(digit: string, variant: Variant = 'standard'): string {
  if (digit === ':') {
    return '<div class="led-colon">'
      + '<div></div>'
      + '<div></div>'
      + '</div>';
  }

  if (digit === '.') {
    return '<div class="led-dot led-dot--small led-dot--bottom"></div>';
  }

  return renderNumberDigit();

  function renderNumberDigit(): string {
    const n: number = parseInt(digit, 10);
    if (isNaN(n)) return '';

    const pattern = LED_PATTERNS[n];

    const classes = [
      'led-digit',
      ...[
        variant === 'small' || variant === 'small-bottom' ? 'led-digit--small' : undefined,
        variant === 'bottom' || variant === 'small-bottom' ? 'led-digit--bottom' : undefined,
      ].filter(Boolean) as string[]
    ].join(' ');

    return `<div class="${classes}">`
      + `<div class="segment horizontal top${pattern[0] ? ' on' : ''}"></div>`
      + `<div class="segment vertical top-right${pattern[1] ? ' on' : ''}"></div>`
      + `<div class="segment vertical bottom-right${pattern[2] ? ' on' : ''}"></div>`
      + `<div class="segment horizontal bottom${pattern[3] ? ' on' : ''}"></div>`
      + `<div class="segment vertical bottom-left${pattern[4] ? ' on' : ''}"></div>`
      + `<div class="segment vertical top-left${pattern[5] ? ' on' : ''}"></div>`
      + `<div class="segment horizontal middle${pattern[6] ? ' on' : ''}"></div>`
      + `</div>`;
  }
}

export function renderLedTime(elapsed: number): string {
  const timeStr: string = formatTimeString(elapsed);
  return Array.from(timeStr)
    .map((char, idx) =>
      idx >= 6 // Last 3 chars are milliseconds → use small-bottom
        ? renderLedDigit(char, 'small-bottom')
        : renderLedDigit(char))
    .join('');
}

export function formatTimeString(elapsed: number): string {
  const maxElapsed: number = 59 * 60 * 1000 + 59 * 1000 + 999;
  const safeElapsed: number = Math.min(elapsed, maxElapsed);
  const ms: number = Math.floor(safeElapsed % 1000);
  const s: number = Math.floor((safeElapsed / 1000) % 60);
  const m: number = Math.floor((safeElapsed / 60000) % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}
