# demo-shop-consumer

A small TypeScript app that calls the Demo Shop API. It stands in for a **developer's own repo**:
it is self-contained (own `package.json`, lockfile, `tsconfig.json`, `vitest.config.ts`) and imports
nothing from the Self-Maintaining APIs monorepo. Later it is copied into the validation container and
receives repair PRs.

| File | Call pattern | Endpoint |
|---|---|---|
| `src/customers.ts` | `fetch` + template-literal URL | GET /customers/{id} |
| `src/orders.ts` | axios configured instance | GET /orders/{id}, GET /orders |
| `src/invoices.ts` | generated client (`src/generated/apiClient.ts`) | GET /orders/{id}/invoice |
| `src/admin.ts` | axios static import | DELETE /orders/{id} |
| `src/unsupported/*` | dynamic URL / custom wrapper | coverage-limit material (FR-17) |

Tests use msw to replay responses recorded from the real demo server (`test/fixtures/<version>/`).

```bash
npm ci
npm run typecheck
API_VERSION=v1 npm test   # all pass
API_VERSION=v2 npm test   # tests for the 5 breaking changes fail
```

Base URL: `DEMO_API_URL` (default `http://localhost:4001`).
