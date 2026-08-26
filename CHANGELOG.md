# Changelog

## [1.1.0] - 2026-08-26

### Added

- Added persisted checkout details using browser local storage.
- Added automatic pre-population of customer details and shipping address from previously saved checkout details.
- Added a saved checkout details prompt allowing customers to:
  - Use their previously saved details.
  - Enter a new shipping address while retaining their saved customer details.
- Added payment status display to orders, including a `Payment: Paid` indicator.
- Added E2E coverage for:
  - Checkout and order placement.
  - Inventory availability during checkout.
  - Standard and express shipping.
  - Entering a new shipping address.
  - Reusing saved checkout details.
  - Payment status on completed orders.
- Added authenticated inventory API access for E2E test infrastructure.
- Added an authenticated E2E test account for inventory state management.

### Changed

- Checkout now saves customer and shipping details after a successful order.
- Checkout form now supports pre-populating first name, last name, email, and shipping address.
- Updated E2E inventory reset handling to authenticate through the API gateway.
- Updated E2E tests to work with the authenticated inventory service.
- E2E tests now run serially to avoid conflicts caused by shared inventory state.

### Testing

- Added unit tests for checkout detail persistence and retrieval.
- Expanded `CheckoutPage` test coverage for saved checkout details.
- Updated checkout E2E tests to cover the new persisted checkout experience.
- All UI unit tests and E2E tests pass.

## [1.0.1] - 2026-08-26

### Changed

- Updated the UI to communicate with backend services exclusively through the API Gateway.
- Removed the demo/fixture data source from the application.
- Updated authentication, customer registration, product and order API integration for the API Gateway.
- Updated order creation to provide the required idempotency key and shipping method.
- Updated local development to use `npm run dev` with the API Gateway as the backend entry point.
- Removed service-level CORS configuration now that the API Gateway provides the browser-facing API boundary.

### Quality

- Updated automated tests to reflect the API Gateway architecture.
- All automated tests passing.
- TypeScript compilation passing.
- Production build passing.
- Linting and formatting checks passing.

## [1.0.0] - 2026-08-14

### Added

- Full API integration with the Spring Boot backend.
- Customer authentication and login.
- Protected checkout and order functionality.
- Orders page displaying orders retrieved from the backend.
- Fixture mode for standalone demonstrations without the backend.
- API mode for full-stack integration with the Spring Boot services.

### Changed

- Completed the transition from frontend-only functionality to the integrated full-stack application.
- Added authenticated API requests for customer and order operations.
- Refined order management and checkout integration.
- Removed unused inventory-service integration that is not required for the 1.0 release.
- Completed automated test coverage across services, contexts, pages and components.
- Finalised production build and deployment configuration.

### Quality

- All automated tests passing.
- TypeScript compilation passing.
- Production build passing.
- Linting and formatting checks passing.
- Fixture mode verified.
- API integration mode verified.

## [0.2.0] - 2026-07-21

### Added

- Production deployment to AWS S3 and CloudFront.
- Wildcard route and custom 404 page.
- Improved unit and end-to-end test coverage.

### Changed

- Moved application from a nested folder to the repository root.
- Refactored shared test helpers.
- Improved build and deployment process.
- Updated project documentation.

## [0.1.0] - 2026-07-20

### Added

- Product catalogue with search, filtering and sorting
- Product detail pages
- Shopping cart
- Quantity management
- Checkout flow
- Order confirmation
- Order history
- Responsive Tailwind UI
- Unit tests with Vitest
- End-to-end tests with Playwright
- ESLint/Oxlint and Prettier formatting
