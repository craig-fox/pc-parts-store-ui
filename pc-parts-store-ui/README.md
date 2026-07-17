# PC Parts Store

A modern e-commerce frontend built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. The application allows customers to browse PC components, manage a shopping cart, complete the checkout process, and view their orders.

This project forms the frontend of a larger full-stack portfolio application that will eventually integrate with a Spring Boot microservices backend.

---

## Features

### Product Catalogue

* Browse a range of PC components
* Product detail pages
* Product categories
* Search products
* Sort products
* Stock availability indicators

### Shopping Cart

* Add products to the cart
* Update item quantities
* Remove items
* Clear the cart
* Automatic subtotal calculation
* Shipping calculation based on order value and parcel weight
* Order total calculation

### Checkout

* Customer information form
* Shipping address entry
* Order summary
* Shipping cost calculation
* Order total calculation

### Testing

* Unit tests using Vitest
* Component tests using React Testing Library
* Utility function tests for business logic

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
├── components
├── context
├── pages
├── test
│   └── fixtures
├── types
├── utils
├── assets
└── App.tsx
```

---

## Current Functionality

* Home page
* Product catalogue
* Product details
* Shopping cart
* Checkout
* Shipping calculation
* Responsive navigation
* Reusable UI components

---

## Planned Enhancements

* Order confirmation workflow
* Orders page
* Local storage persistence
* User authentication
* Backend integration with Spring Boot
* REST API integration
* Inventory management
* Order history
* Product images from backend
* Responsive improvements
* Accessibility enhancements

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

The application will be available at the URL displayed by Vite.

---

## Running Tests

Run all tests:

```bash
npm test
```

or

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

* Component-based architecture
* Strong typing with TypeScript
* Reusable UI components
* Context-based state management
* Business logic separated into utility modules
* Responsive design with Tailwind CSS
* Comprehensive automated testing

It is intended to evolve into a full-stack e-commerce application backed by Spring Boot microservices and cloud-native infrastructure.
