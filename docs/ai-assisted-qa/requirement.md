# Worked example: add an item to the cart

## Requirement

As a signed-in shopper, I can add an available product to my cart and see that product in the cart.

## Acceptance criteria

- AC1: The product can be identified by its visible name.
- AC2: After selecting Add to cart, the cart count reflects one item.
- AC3: Opening the cart shows the selected product.
- AC4: The test does not depend on another test's browser or cart state.

## Scope and assumptions

This example targets the public Sauce Demo sample app and the existing UI fixture. It demonstrates scenario design; it does not claim to test checkout, inventory concurrency, or production payment flows.
