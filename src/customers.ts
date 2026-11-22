import { apiBaseUrl } from './config.js';

/** Customer as returned by GET /customers/{id}. */
interface CustomerResponse {
  id: number;
  customer_name: string;
  email: string;
}

/** Returns the name to show for a customer. Call pattern: fetch with a template-literal URL. */
export async function getCustomerDisplayName(id: number): Promise<string> {
  const res = await fetch(`${apiBaseUrl()}/customers/${id}`);
  if (!res.ok) throw new Error(`Customer ${id} request failed with status ${res.status}`);
  const customer = (await res.json()) as CustomerResponse;
  return customer.customer_name;
}
