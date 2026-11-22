// GENERATED from demo-shop v1 spec — do not edit by hand
// Source: Demo Shop API 1.0.0 (demo/api/specs/v1.yaml)
// Regenerate with: npm run gen:client -w @sma/demo-api

/** Thrown when the API answers with a non-2xx status. */
export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(method: string, path: string, status: number, body: unknown) {
    super(`${method} ${path} failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

function baseUrl(): string {
  return process.env.DEMO_API_URL ?? 'http://localhost:4001';
}

async function request<T>(
  method: string,
  path: string,
  query: Record<string, string | number | undefined> = {},
): Promise<T> {
  const url = new URL(path, baseUrl());
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  const res = await fetch(url, { method, headers: { accept: 'application/json' } });
  const text = await res.text();
  const body: unknown = text.length > 0 ? JSON.parse(text) : undefined;
  if (!res.ok) throw new ApiError(method, path, res.status, body);
  return body as T;
}

export interface Customer {
  id: number;
  customer_name: string;
  email: string;
}

export type OrderStatus = "open" | "closed";

export interface Order {
  id: number;
  customerId: number;
  total: number;
  status: OrderStatus;
}

export interface OrderSummary {
  id: number;
  customerId: number;
  status: OrderStatus;
}

export interface Invoice {
  orderId: number;
  invoiceNumber: string;
  amountDue: number;
  issuedAt: string;
}

export interface ErrorSchema {
  error: string;
}

/**
 * Get a customer by id — `GET /customers/{id}`
 */
export async function getCustomer(id: number): Promise<Customer> {
  return request<Customer>('GET', `/customers/${encodeURIComponent(String(id))}`);
}

/**
 * List orders, optionally filtered by status — `GET /orders`
 */
export async function listOrders(query: { status?: "open" | "closed" | "all" } = {}): Promise<Array<OrderSummary>> {
  return request<Array<OrderSummary>>('GET', '/orders', query);
}

/**
 * Get an order by id — `GET /orders/{id}`
 */
export async function getOrder(id: number): Promise<Order> {
  return request<Order>('GET', `/orders/${encodeURIComponent(String(id))}`);
}

/**
 * Delete (cancel) an order — `DELETE /orders/{id}`
 */
export async function deleteOrder(id: number): Promise<void> {
  return request<void>('DELETE', `/orders/${encodeURIComponent(String(id))}`);
}

/**
 * Get the invoice for an order — `GET /orders/{id}/invoice`
 */
export async function getOrderInvoice(id: number): Promise<Invoice> {
  return request<Invoice>('GET', `/orders/${encodeURIComponent(String(id))}/invoice`);
}
