import CheckoutForm from "../components/Checkout/CheckoutForm";
import OrderSummary from "../components/Checkout/OrderSummary";

function CheckoutPage() {
    return (
        <div>

            <h1 className="mb-8 text-4xl font-bold">
                Checkout
            </h1>

            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

                <CheckoutForm />

                <OrderSummary />

            </div>

        </div>
    );
}

export default CheckoutPage;