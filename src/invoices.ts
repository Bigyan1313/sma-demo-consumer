import { getOrderInvoice } from './generated/apiClient.js';

/** Amount still due on an order's invoice. Call pattern: generated client function. */
export async function getAmountDue(orderId: number): Promise<number> {
  const invoice = await getOrderInvoice(orderId);
  return invoice.amountDue;
}

/** Human-readable invoice label, e.g. `INV-0001 (due 19.99)`. */
export async function getInvoiceLabel(orderId: number): Promise<string> {
  const invoice = await getOrderInvoice(orderId);
  return `${invoice.invoiceNumber} (due ${invoice.amountDue.toFixed(2)})`;
}
