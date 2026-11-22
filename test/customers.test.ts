import { describe, expect, it } from 'vitest';
import { getCustomerDisplayName } from '../src/customers.js';

describe('customers', () => {
  it('display name for customer 1 is "Ada Lovelace"', async () => {
    expect(await getCustomerDisplayName(1)).toBe('Ada Lovelace');
  });

  it('display name for customer 3 is "Grace Hopper"', async () => {
    expect(await getCustomerDisplayName(3)).toBe('Grace Hopper');
  });

  it('rejects for an unknown customer', async () => {
    await expect(getCustomerDisplayName(999)).rejects.toThrow(/status 404/);
  });
});
