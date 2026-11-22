import { describe, expect, it } from 'vitest';
import { getAmountDue, getInvoiceLabel } from '../src/invoices.js';

describe('invoices', () => {
  it('amount due on order 1 is 19.99', async () => {
    expect(await getAmountDue(1)).toBe(19.99);
  });

  it('invoice label for order 2 is "INV-0002 (due 0.00)"', async () => {
    expect(await getInvoiceLabel(2)).toBe('INV-0002 (due 0.00)');
  });
});
