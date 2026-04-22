export interface MaxConv {
  (command: string, action: string, options?: { callback?: () => void }): void;
  q?: any[];
}

declare global {
  interface Window {
    maxconv: MaxConv;
  }
}
