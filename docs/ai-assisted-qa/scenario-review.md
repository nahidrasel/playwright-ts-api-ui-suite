# AI-assisted scenario proposal and review

The scenarios below are candidate ideas for the cart requirement. They are not treated as validated until checked against the acceptance criteria, target behavior, and test environment.

| ID | Proposed scenario | Coverage | Decision | Reason |
| --- | --- | --- | --- | --- |
| CART-01 | Add one available product and verify it appears in the cart | AC1–AC4 | Accept | Matches the implemented demo behavior; see `tests/ui/cart.spec.ts` |
| CART-02 | Verify cart count changes from zero to one after adding a product | AC2 | Accept | Observable state assertion; already covered by the current test |
| CART-03 | Add two different products and verify both appear | AC1–AC4 | Candidate | Useful extension; implement after confirming fixture/app state and locator support |
| CART-04 | Add an unavailable product | — | Reject for current sample | The current example does not establish a supported unavailable-product state |
| CART-05 | Verify stock is reserved after checkout | — | Reject for current scope | Checkout/inventory persistence is outside this requirement and sample test |

## Reviewer checklist

- [ ] Every accepted scenario maps to an explicit acceptance criterion.
- [ ] Proposed behavior is supported by the target application or API contract.
- [ ] Assertions verify outcomes, not only successful clicks.
- [ ] Data and browser state are isolated.
- [ ] Negative/boundary cases are included only when the target supports meaningful validation.
- [ ] A human reviewer has approved the final test before it is added.
- [ ] Test results are recorded from actual execution, not inferred from generated code.

AI output is a draft. Reviewers should revise or reject scenarios that are duplicated, untestable, speculative, or outside scope.
