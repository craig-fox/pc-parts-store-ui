import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext.tsx";
import { AuthProvider } from "./auth/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  </StrictMode>,
);
