import { useEffect } from 'react';

/**
 * Observes a given element using ResizeObserver.
 */
export default function useResizeObserver(
  element: Element | null,
  options: ResizeObserverOptions | undefined,
  observerCallback: ResizeObserverCallback
): void {
  useEffect(() => {
    if (!element || !('ResizeObserver' in window)) {
      return undefined;
    }

    const observer = new ResizeObserver(observerCallback);

    observer.observe(element, options);

    return () => {
      observer.disconnect();
    };
  }, [element, options, observerCallback]);
}
