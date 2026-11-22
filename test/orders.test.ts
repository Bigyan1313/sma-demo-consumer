import { describe, expect, it } from 'vitest';
import { getOrderTotalWithShipping, listOpenOrders } from '../src/orders.js';

describe('orders', () => {
  it('order 1 total with shipping is 24.99', async () => {
    expect(await getOrderTotalWithShipping(1)).toBe(24.99);
  });

  it('order 4 total with shipping is 105', async () => {
    expect(await getOrderTotalWithShipping(4)).toBe(105);
  });

  it('rejects for an unknown order', async () => {
    await expect(getOrderTotalWithShipping(999)).rejects.toThrow(/404/);
  });

  it('open orders are 1 and 3', async () => {
    expect(await listOpenOrders()).toEqual([1, 3]);
  });
});
