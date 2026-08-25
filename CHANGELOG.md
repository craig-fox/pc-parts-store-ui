# Changelog

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
