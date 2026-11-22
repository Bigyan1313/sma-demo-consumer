import axios from 'axios';
import { apiBaseUrl } from './config.js';

/** Cancels (deletes) an order. Call pattern: axios static import. Returns true on success. */
export async function cancelOrder(id: number): Promise<boolean> {
  const res = await axios.delete(`${apiBaseUrl()}/orders/${id}`);
  return res.status === 204;
}
