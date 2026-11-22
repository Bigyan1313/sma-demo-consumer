/**
 * Test setup: serves responses recorded from the real Demo Shop server
 * (test/fixtures/<API_VERSION>/, produced by demo/api/scripts/record-fixtures.ts) via msw.
 * No real network is used.
 *
 * API_VERSION=v1 (default) or v2.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

interface Fixture {
  request: { method: string; path: string; query: Record<string, string> };
  response: { status: number; body: unknown };
}

const version = process.env.API_VERSION ?? 'v1';
if (version !== 'v1' && version !== 'v2') {
  throw new Error(`API_VERSION must be "v1" or "v2", got "${version}"`);
}

function requestKey(method: string, path: string, query: Iterable<[string, string]>): string {
  const q = [...query].sort(([a], [b]) => a.localeCompare(b));
  return `${method.toUpperCase()} ${path}?${new URLSearchParams(q).toString()}`;
}

const fixtureDir = fileURLToPath(new URL(`./fixtures/${version}/`, import.meta.url));
const fixtures = new Map<string, Fixture>();
for (const file of readdirSync(fixtureDir).filter((f) => f.endsWith('.json'))) {
  const fixture = JSON.parse(readFileSync(`${fixtureDir}${file}`, 'utf8')) as Fixture;
  const { method, path, query } = fixture.request;
  fixtures.set(requestKey(method, path, Object.entries(query)), fixture);
}

const server = setupServer(
  http.all('*', ({ request }) => {
    const url = new URL(request.url);
    const fixture = fixtures.get(requestKey(request.method, url.pathname, url.searchParams));
    if (fixture) {
      const { status, body } = fixture.response;
      return body === null
        ? new HttpResponse(null, { status })
        : HttpResponse.json(body, { status });
    }
    if (
      version === 'v2' &&
      request.method === 'GET' &&
      url.pathname === '/orders' &&
      !url.searchParams.has('status')
    ) {
      return HttpResponse.json(
        { error: 'Missing required query parameter: status' },
        { status: 400 },
      );
    }
    return HttpResponse.json(
      { error: `No ${version} fixture for ${request.method} ${url.pathname}${url.search}` },
      { status: 404 },
    );
  }),
);

beforeAll(() => server.listen({ onUnhandledFrame: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
