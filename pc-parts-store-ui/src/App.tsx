import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<MainLayout />}>

                    <Route path="/" element={<HomePage />} />

                    <Route
                        path="/products"
                        element={<ProductsPage />}
                    />

                    <Route
                        path="/cart"
                        element={<CartPage />}
                    />

                    <Route
                        path="/orders"
                        element={<OrdersPage />}
                    />

                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    
                    <Route
                        path="/products/:id"
                        element={<ProductDetailsPage />}
                    />
                    <Route
                        path="/cart"
                        element={<CartPage />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;