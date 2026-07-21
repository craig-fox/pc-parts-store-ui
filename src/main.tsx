import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OrdersProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </OrdersProvider>
  </StrictMode>,
);
