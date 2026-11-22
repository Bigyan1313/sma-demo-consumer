import { describe, expect, it } from 'vitest';
import { fetchOrderDynamic } from '../src/unsupported/dynamicUrl.js';
import { getCustomerViaWrapper } from '../src/unsupported/wrapper.js';

// These modules exist as coverage-limit material (FR-17). They only need to compile and load;
// no business assertions, so they never count as v1/v2 evidence.
describe('unsupported call patterns', () => {
  it('modules load and export functions', () => {
    expect(typeof fetchOrderDynamic).toBe('function');
    expect(typeof getCustomerViaWrapper).toBe('function');
  });
});
