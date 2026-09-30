# Instructions for AI coding assistants (Copilot, Cursor, Claude, etc.)

This is a Playwright + TypeScript automation framework. Follow these rules for any generated code.

## Locators
- Prefer getByRole, getByLabel, getByPlaceholder, getByText, then getByTestId. Avoid long CSS/XPath and nth-child.
- Scope actions and assertions to a row or component (filter the row, then act inside it).

## Shadow DOM
- If the app uses Shadow DOM, prefer a scoped locator on the host element and then descend with locator() instead of brittle global selectors.
- Do not cross Shadow DOM boundaries with long XPath or page-level CSS hacks when a host-scoped selector is sufficient.
- For web components, prefer patterns like hostLocator.locator('button') or hostLocator.getByRole('button') instead of global element queries.
- Keep selectors readable and component-focused; do not reach into unrelated nested DOM trees.

## Waiting and assertions
- Never use page.waitForTimeout. Use web-first assertions: await expect(locator).toHaveText(...).
- Do not read text once (textContent) and then assert it with toBe on UI state.
- Always await Playwright actions and expect(locator) assertions.

## Component Object Model (Scoped Locators)
- Page objects in src/pages, reusable components in src/components, API clients in src/api, data factories in src/test-data.
- Keep locators close to the component or page object that owns them; do not duplicate selectors across tests.
- Scope actions and assertions to a row or component, then act inside that scoped area.
- Prefer component-level locators such as row.locator(...), hostLocator.locator(...), or pageObject.getByRole(...).

## Test Data Strategy (Factory, API Fixture & Teardown)
- Create unique test data for each test using factories or API fixtures instead of reusing shared mutable state.
- Prefer creating data through the app API when it is fast and realistic, then delete or clean it up in teardown.
- Each test should own its setup and cleanup; never rely on leftover state from another test.
- Use fixtures to isolate browser state and reset test data between runs.

## Test data and secrets
- Each test creates its own unique data (factories) and cleans it up.
- Never hard-code credentials. Read them from src/utils/env.ts.

## Before you finish
- Only use Playwright APIs that exist. If unsure, check the official docs.
- Run npm run typecheck, npm run lint and the affected tests.
- A test must be able to fail: confirm the assertion checks the requirement.
