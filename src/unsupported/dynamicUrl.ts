import { apiBaseUrl } from '../config.js';

/**
 * URL assembled at runtime, so static analysis cannot tell which endpoint it hits.
 * Coverage-limit material for the Locate stage (FR-17): must be reported as "Needs review".
 */
export async function fetchOrderDynamic(id: number): Promise<unknown> {
  const path = ['orders', String(id)].join('/');
  const res = await fetch(`${apiBaseUrl()}/${path}`);
  return res.json();
}
