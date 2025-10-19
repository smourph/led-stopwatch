import {StopwatchUI} from './stopwatchUI';

export function bootstrap(): StopwatchUI {
  return new StopwatchUI();
}

// Auto-start when loaded in browser and keep reference to instance for lifecycle
if (typeof document !== 'undefined') {
  let _instance: StopwatchUI | null = null;
  const start = () => {
    _instance = bootstrap();
    // destroy on unload to clean up event listeners
    window.addEventListener('beforeunload', () => {
      _instance?.destroy();
      _instance = null;
    });
  };

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}
