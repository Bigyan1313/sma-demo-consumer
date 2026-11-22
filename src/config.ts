/** Base URL of the Demo Shop API, read at call time. */
export function apiBaseUrl(): string {
  return process.env.DEMO_API_URL ?? 'http://localhost:4001';
}
