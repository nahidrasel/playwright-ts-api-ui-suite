# Playwright + TypeScript framework

UI and API automation with page and component objects, fixtures, per-test data, saved authentication, CI, linting and AI-assistant guidelines.

The sample tests run against public demo targets: [Sauce Demo](https://www.saucedemo.com) (UI) and [JSONPlaceholder](https://jsonplaceholder.typicode.com) (API). Replace pages, clients and data with your own application.

## Quick start

```bash
npm install
npx playwright install chromium
npm test
npm run report
```

This project uses appsettings-based configuration for the base URL and environment values, while username/password are loaded from GitHub secrets or local environment variables.

## Commands

| Command                                     | What it does                                 |
| ------------------------------------------- | -------------------------------------------- |
| `npm test`                                  | All projects (setup, unit, UI, API)          |
| `npm run test:ui` / `test:api`              | One project                                  |
| `npm run test:smoke`                        | Tests tagged @smoke                          |
| `npm run test:headed` / `test:debug`        | Watch or step through                        |
| `npx playwright test tests/ui/cart.spec.ts` | One file                                     |
| `npm run api:types`                         | Generate API types from the OpenAPI document |
| `npm run typecheck` / `lint` / `format`     | Quality checks                               |

## Structure

```text
src/
  pages/        page objects (extend BasePage)
  components/   reusable component objects (table, product card, modal)
  fixtures/     one merged test object: page objects, API clients, data
  api/          API clients, response wrapper and generated OpenAPI types
  test-data/    factories (unique data) and static reference data
  utils/        env config and helpers
tests/
  auth.setup.ts log in once, save storageState
  ui/           UI specs (start authenticated)
  api/          API specs (no browser)
  unit/         focused framework helper tests
openapi/posts.yaml   API contract; source for generated TypeScript types
playwright.config.ts   projects, reporters, retries, trace and screenshots
.github/workflows/     CI pipeline
.github/copilot-instructions.md   rules for AI assistants
```

## API contracts

`openapi/posts.yaml` is the source of truth for the Posts API request and response types. Run `npm run api:types` after changing the contract; the generated definitions are written to `src/api/posts.generated.d.ts`.

API client methods return `IApiResponse<T>`, which contains the HTTP status, headers, and a typed body. These generated TypeScript types are compile-time only: they do not validate the shape of JSON at runtime. API tests validate status codes and important response values separately. JSONPlaceholder simulates writes rather than persisting them, so the update test uses a seeded post ID.

## Conventions

- Tests import `test` and `expect` from `@fixtures`, not from `@playwright/test`.
- Locators: role, label, placeholder, text, then test id. No hard waits; use web-first assertions.
- Assertions live in tests; page objects hold locators and actions.
- Tests create unique data with factories and clean up created records when the API supports it. No shared mutable state, so everything is parallel-safe.
- Secrets come from environment variables or CI secrets, never from the repo.
- Retries only in CI, as a safety net; fix flakiness at the root.
- Tag tests with `{ tag: '@smoke' }` for fast pull-request feedback.

## How the pieces map to common interview topics

| Topic                                | Where to look                                               |
| ------------------------------------ | ----------------------------------------------------------- |
| Fixtures with setup and teardown     | `src/fixtures/index.ts` (`postClient` disposes its context) |
| storageState authentication          | `tests/auth.setup.ts` + `chromium-ui` project               |
| Page and component objects           | `src/pages`, `src/components`                               |
| Row/component scoping                | `InventoryPage.item(name)`                                  |
| API testing                          | `tests/api/posts.spec.ts`, `src/api`                        |
| Test data factories                  | `src/test-data/post.factory.ts`                             |
| Data-driven tests                    | `INVALID_LOGINS` loop in `login.spec.ts`                    |
| CI, reporting, artifacts             | `.github/workflows/playwright.yml`, config reporters        |
| Lint rules that catch flaky patterns | `eslint.config.mjs`                                         |
| AI conventions                       | `.github/copilot-instructions.md`                           |

## Adapting to your application

1. Set `BASE_URL`, `API_URL` and credentials in `.env` (secrets in CI).
2. Change `testIdAttribute` in `playwright.config.ts` if your app uses `data-testid`.
3. Replace `src/pages`, `src/components` and `src/api` with your own.
4. Update `tests/auth.setup.ts` for your login flow; add a second setup file per role if needed.
5. Add API-based data fixtures (create through the API, delete after `use()`).

## CI sharding (when the suite grows)

```bash
npx playwright test --shard=1/4
```

Run one shard per job in a matrix, and merge reports with the `blob` reporter.
