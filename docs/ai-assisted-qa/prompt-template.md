# Prompt template: requirement to test scenarios

You are assisting a QA engineer. Do not write or execute code yet.

Given the requirement and acceptance criteria below:
1. Propose positive, negative, boundary, and state-transition scenarios where relevant.
2. For each scenario, provide an ID, preconditions, test data, action, expected observable result, and linked acceptance criteria.
3. Flag assumptions and behaviors that require product/API-contract confirmation.
4. Identify redundant scenarios and risks not covered.
5. Do not invent endpoints, UI states, business rules, or test results.
6. Separate confirmed behavior from hypotheses.
7. Return a coverage matrix and a short list of questions for a human reviewer.

Requirement:
[Paste requirement]

Acceptance criteria:
[Paste explicit acceptance criteria]

Known target behavior / contract:
[Paste verified details]

Constraints:
- Use isolated test data.
- Prefer role/label/user-facing locators for UI.
- Assert outcomes and relevant response fields.
- Do not recommend fixed sleeps.
- Never include secrets, personal data, or production customer data in prompts.
- Human approval is required before scenarios become committed tests.
