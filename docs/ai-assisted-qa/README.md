# AI-assisted QA: human-in-the-loop example

This small showcase documents a reviewable way to use AI during test design without treating model output as truth.

## Flow

```text
Requirement + acceptance criteria
             |
             v
AI proposes scenarios and edge cases
             |
             v
Map scenarios to criteria and flag assumptions
             |
             v
Human review: accept / revise / reject
             |
             v
Implement approved tests -> run tests -> report observed results
```

## Included artefacts

- `requirement.md`: scoped example requirement and acceptance criteria.
- `prompt-template.md`: reusable prompt with explicit anti-hallucination and privacy constraints.
- `scenario-review.md`: candidate scenarios, traceability, decisions, and reviewer checklist.

The example connects to the existing `tests/ui/cart.spec.ts`. It does not integrate a model API, run agents, or automatically commit generated tests. Those capabilities would need a separate design, credentials management, evaluation strategy, and explicit human approval.
