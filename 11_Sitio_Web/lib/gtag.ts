export const GA_ID = 'G-6DPM8LHP43';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'consent' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

export function gtag(
  command: 'config' | 'event' | 'consent' | 'js',
  targetId: string | Date,
  config?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(command, targetId, config);
  }
}

export function pageview(path: string) {
  gtag('config', GA_ID, { page_path: path });
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
) {
  gtag('event', name, params);
}
