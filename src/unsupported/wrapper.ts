import { apiBaseUrl } from '../config.js';

/** Custom wrapper around fetch; call sites pass only a path string. */
export async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${apiBaseUrl()}${path}`);
  if (!res.ok) throw new Error(`Request to ${path} failed with status ${res.status}`);
  return (await res.json()) as T;
}

/**
 * Calls the API through the wrapper. Coverage-limit material for the Locate stage (FR-17):
 * must be reported as "Needs review", never as "not affected".
 */
export async function getCustomerViaWrapper(id: number): Promise<unknown> {
  return request(`/customers/${id}`);
}
