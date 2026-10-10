# Playwright + TypeScript UI and API automation

A portfolio framework demonstrating maintainable Playwright test automation: page and component objects, typed API clients, fixtures, test-data factories, OpenAPI-generated types, lint/type checks, and GitHub Actions reporting.

The tests use public demo targets: [Sauce Demo](https://www.saucedemo.com) for UI and [JSONPlaceholder](https://jsonplaceholder.typicode.com) for API. JSONPlaceholder simulates writes rather than persisting them.

## Quick start

Requirements: Node.js 22 and npm.

```bash
npm ci
npx playwright install chromium
npm test
```

Useful commands:

| Command | Purpose |
| --- | --- |
| `npm test` | Run the configured projects |
| `npm run test:ui` / `npm run test:api` | Run UI or API tests |
| `npm run test:smoke` | Run smoke-tagged tests |
| `npm run typecheck` / `npm run lint` | Static quality checks |
| `npm run api:types` | Regenerate types from the OpenAPI source |
| `npm run report` | Open the most recent Playwright HTML report |

## Architecture

```text
tests/ ──> fixtures ──> page/component objects ──> Playwright browser
   │          │
   │          └──────> API clients ──> Playwright APIRequestContext
   └────────────────> assertions against requirements

openapi/posts.yaml ──> generated TypeScript API types
src/test-data/ ───────> data factories and reference data
```

- **Tests** express the requirement and own assertions.
- **Fixtures** compose page objects, API clients, and test data; fixture teardown disposes resources.
- **Page/component objects** keep locators and user actions near the UI component they represent.
- **API clients** centralise requests and response typing. Generated TypeScript types help at compile time; they do not validate JSON at runtime.
- **Factories** create test-specific data rather than sharing mutable state.
- **CI** runs dependency installation, generated-type drift checks, linting, type checking, and Playwright tests; reports are uploaded even when tests fail.

### Test-design examples

- **Positive API:** verify a successful status *and* the response fields that satisfy the requirement.
- **Negative API:** request a non-existent record and assert both the expected 404 status and response shape.
- **UI state transition:** add a product, open the cart, and assert the item and cart count—not just that a click completed.
- **Isolation:** use per-test data and fixture teardown; do not depend on execution order.
- **Boundary thinking:** add empty, malformed, missing-field, duplicate, and permission-related cases when the target API contract supports them. Do not assume a demo service enforces rules it does not implement.

Current examples are deliberately scoped to the behavior supported by the public demo APIs; see `docs/ai-assisted-qa/` for a worked, human-reviewed scenario-design example.

## Configuration and secrets

Base URLs and non-sensitive defaults live in appsettings files. Optional credentials and API authorization are supplied through environment variables or GitHub Actions secrets. Never commit real credentials, tokens, customer data, or production configuration. The Sauce Demo account used by this public sample is a documented demo account, not a private credential.

## AI-assisted QA showcase

The `docs/ai-assisted-qa/` example demonstrates a bounded workflow:

1. Start with a requirement and explicit acceptance criteria.
2. Ask an AI assistant to propose scenarios, risks, and edge cases using the included prompt.
3. Map proposals to acceptance criteria and identify gaps or unsupported assumptions.
4. Have a human reviewer approve or reject each proposal.
5. Implement and run the accepted tests; report actual results separately from AI suggestions.

This is a documented, human-in-the-loop workflow—not an autonomous agent or a claim that AI-generated tests are correct by default. Assistant conventions are in `.github/copilot-instructions.md`.

## Repository layout

- `src/pages`, `src/components`: UI abstractions
- `src/fixtures`: shared fixtures and teardown
- `src/api`: API clients and generated types
- `src/test-data`: data factories
- `tests/ui`, `tests/api`, `tests/unit`: UI, API, and focused helper tests
- `openapi/posts.yaml`: API type-generation source
- `.github/workflows/playwright.yml`: CI pipeline

## Adapting the framework

1. Configure `BASE_URL` and `API_URL` for your application.
2. Add page/component objects around stable, user-facing locators.
3. Create data through supported APIs and clean it up when the target supports deletion.
4. Assert observable behavior and contract-relevant fields, not implementation details.
5. Run `npm run typecheck`, `npm run lint`, and the relevant tests before opening a PR.
