import axios from 'axios';
import { apiBaseUrl } from './config.js';

/** Flat shipping fee added to every order, in the shop currency. */
export const SHIPPING_FEE = 5;

/** Order as returned by GET /orders/{id}. */
interface OrderResponse {
  id: number;
  customerId: number;
  total: number;
  status: 'open' | 'closed';
}

/** Order summary as returned by GET /orders. */
interface OrderSummaryResponse {
  id: number;
  customerId: number;
  status: 'open' | 'closed';
}

/** Call pattern: axios configured instance. */
const api = axios.create({ baseURL: apiBaseUrl(), timeout: 5000 });

/** Order total plus shipping, rounded to cents. */
export async function getOrderTotalWithShipping(id: number): Promise<number> {
  const { data } = await api.get<OrderResponse>(`/orders/${id}`);
  return Math.round((data.total + SHIPPING_FEE) * 100) / 100;
}

/** Ids of all open orders. Fetches every order and filters on the client. */
export async function listOpenOrders(): Promise<number[]> {
  const { data } = await api.get<OrderSummaryResponse[]>('/orders');
  return data.filter((o) => o.status === 'open').map((o) => o.id);
}
