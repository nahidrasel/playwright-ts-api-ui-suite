# Instructions for AI coding assistants (Copilot, Cursor, Claude, etc.)

This is a Playwright + TypeScript automation framework. Follow these rules for any generated code.

## Locators
- Prefer getByRole, getByLabel, getByPlaceholder, getByText, then getByTestId. Avoid long CSS/XPath and nth-child.
- Scope actions and assertions to a row or component (filter the row, then act inside it).

## Waiting and assertions
- Never use page.waitForTimeout. Use web-first assertions: await expect(locator).toHaveText(...).
- Do not read text once (textContent) and then assert it with toBe on UI state.
- Always await Playwright actions and expect(locator) assertions.

## Structure
- Page objects in src/pages, reusable components in src/components, API clients in src/api, data factories in src/test-data.
- Tests import { test, expect } from '@fixtures', never from '@playwright/test'.
- Keep test intent (assertions) in the test files; page objects hold locators and actions.
- New dependencies for tests go through fixtures. Do not share mutable state between tests.

## Test data and secrets
- Each test creates its own unique data (factories) and cleans it up.
- Never hard-code credentials. Read them from src/utils/env.ts.

## Before you finish
- Only use Playwright APIs that exist. If unsure, check the official docs.
- Run npm run typecheck, npm run lint and the affected tests.
- A test must be able to fail: confirm the assertion checks the requirement.
