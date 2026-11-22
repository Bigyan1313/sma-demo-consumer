import { describe, expect, it } from 'vitest';
import { cancelOrder } from '../src/admin.js';

describe('admin', () => {
  it('cancelling order 2 succeeds', async () => {
    expect(await cancelOrder(2)).toBe(true);
  });

  it('cancelling an unknown order rejects', async () => {
    await expect(cancelOrder(999)).rejects.toThrow(/404/);
  });
});
