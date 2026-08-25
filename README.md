# PC Parts Store

A modern e-commerce frontend built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

The application allows customers to browse PC components, manage a shopping cart, complete checkout, and view their orders.

This project forms the frontend of a larger full-stack portfolio application backed by Spring Boot microservices.

---

## Features

### Product Catalogue

- Browse PC components
- Product detail pages
- Product categories
- Product search
- Product sorting
- Stock availability indicators
- Product images

### Shopping Cart

- Add products to the cart
- Update item quantities
- Remove items
- Clear the cart
- Automatic subtotal calculation
- Shipping calculation based on order value and parcel weight
- Order total calculation

### Checkout

- Shipping address entry
- Order summary
- Shipping cost calculation
- Order total calculation
- Authenticated order creation
- Order confirmation

### Orders

- View previously placed orders
- Display order status
- Display order items and quantities
- Display order totals

### Authentication

- Customer login
- Authenticated API requests
- Protected routes
- Logout

### Testing

- Unit tests using Vitest
- Component tests using React Testing Library
- Tests for business logic and utility functions
- Tests for API services and authentication
- Tests for application state and context

---

## Technology Stack

| Technology            | Purpose             |
| --------------------- | ------------------- |
| React                 | User interface      |
| TypeScript            | Type safety         |
| Vite                  | Development tooling |
| Tailwind CSS          | Styling             |
| React Router          | Client-side routing |
| Vitest                | Unit testing        |
| React Testing Library | Component testing   |

---

## Project Structure

```text
src
├── auth
├── components
├── context
├── fixtures
├── layouts
├── pages
├── reducers
├── services
├── test
│   └── mocks
├── types
├── utils
├── assets
└── App.tsx
```

---

## Running

The frontend communicates with the Spring Boot backend services.

```text
React application
      |
      ├── Authentication Service
      ├── Product Service
      └── Order Service
```

Authenticated requests use the JWT returned by the authentication service.

---

## Running the Application

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

See below for running the development server in API mode

The application will be available at the URL displayed by Vite.

---

## Running the Backend Locally

To run the application against the Spring Boot backend, clone the API
repository:

```bash
git clone https://github.com/craig-fox/pc-parts-store-api.git
```

Start the backend infrastructure and services from the API project root:

```bash
docker compose up -d
```

See the `pc-parts-store-api` README for backend setup and prerequisites.

Start the pc-parts-store-ui application by running

```bash
npm run dev:integration
```

---

## Running Tests

Run all tests:

```bash
npm test
```

or:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

---

## Project Goals

This project demonstrates modern frontend development practices, including:

- Component-based architecture
- Strong typing with TypeScript
- Reusable UI components
- Context-based state management
- Business logic separated into utility modules
- Authenticated REST API integration
- Responsive design with Tailwind CSS
- Comprehensive automated testing

The frontend is part of a larger cloud-native e-commerce application using
Spring Boot microservices and AWS infrastructure.

The application is intended to evolve beyond the 1.0 release as the backend
architecture and cloud deployment are developed further.
