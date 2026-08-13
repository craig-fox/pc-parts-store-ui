# Changelog

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
