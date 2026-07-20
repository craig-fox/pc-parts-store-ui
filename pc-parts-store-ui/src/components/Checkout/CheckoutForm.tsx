import type { Checkout } from "../../types/Checkout";
import type { CheckoutErrors } from "../../types/CheckoutErrors";

interface CheckoutFormProps {
    checkout: Checkout;
    setCheckout: React.Dispatch<React.SetStateAction<Checkout>>;
    errors: CheckoutErrors;
}


function CheckoutForm({
    checkout,
    setCheckout,
    errors
}: CheckoutFormProps) {


    const updateCustomer = (
        field: keyof Checkout["customer"],
        value: string
    ) => {
        setCheckout(current => ({
            ...current,
            customer: {
                ...current.customer,
                [field]: value,
            },
        }));
    };

    const updateShippingAddress = (
        field: keyof Checkout["shippingAddress"],
        value: string
    ) => {
        setCheckout(current => ({
            ...current,
            shippingAddress: {
                ...current.shippingAddress,
                [field]: value,
            },
        }));
    };

    const getInputClass = (hasError: boolean) =>
        `rounded-md border px-3 py-2 ${
            hasError
                ? "border-red-500"
                : "border-slate-300"
        }`;

    return (
        <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-6">
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col">
                    <label htmlFor="first-name" className="mb-2 font-medium">
                        First Name
                    </label>
                    <input
                        id="first-name"
                        name="firstName"
                        type="text"
                        value={checkout.customer.firstName}
                        onChange={(e) =>
                            updateCustomer("firstName", e.target.value)
                        }
                        className={getInputClass(
                            !!errors.firstName
                        )}
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.firstName}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="last-name" className="mb-2 font-medium">
                        Last Name
                    </label>
                    <input
                        id="last-name"
                        name="lastName"
                        type="text"
                        value={checkout.customer.lastName}
                        onChange={(e) =>
                            updateCustomer("lastName", e.target.value)
                        }
                        className={getInputClass(
                            !!errors.lastName
                        )}
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.lastName}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-medium">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={checkout.customer.email}
                    onChange={(e) =>
                        updateCustomer("email", e.target.value)
                    }
                    className={getInputClass(
                        !!errors.email
                    )}
                />
                {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
            </div>

            <div className="flex flex-col">
                <label htmlFor="address" className="mb-2 font-medium">
                    Address
                </label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    value={checkout.shippingAddress.addressLine1}
                    onChange={(e) =>
                        updateShippingAddress(
                            "addressLine1",
                            e.target.value
                        )
                    }
                    className={getInputClass(
                        !!errors.address
                    )}
                />
                {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.address}
                        </p>
                    )}
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col">
                    <label htmlFor="city" className="mb-2 font-medium">
                        City
                    </label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        value={checkout.shippingAddress.city}
                        onChange={(e) =>
                            updateShippingAddress(
                                "city",
                                e.target.value
                            )
                        }
                        className={getInputClass(
                            !!errors.city
                        )}
                    />
                    {errors.city && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.city}
                        </p>
                    )}
                    
                </div>

                <div className="flex flex-col">
                    <label htmlFor="postcode" className="mb-2 font-medium">
                        Postcode
                    </label>
                    <input
                        id="postcode"
                        name="postcode"
                        type="text"
                        value={checkout.shippingAddress.postcode}
                        onChange={(e) =>
                            updateShippingAddress(
                                "postcode",
                                e.target.value
                            )
                        }
                        className={getInputClass(
                            !!errors.postcode
                        )}
                    />
                    {errors.postcode && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.postcode}
                        </p>
                    )}
                    
                </div>

                <div className="flex flex-col">
                    <label htmlFor="country" className="mb-2 font-medium">
                        Country
                    </label>
                    <input
                        id="country"
                        name="country"
                        type="text"
                        value={checkout.shippingAddress.country}
                        onChange={(e) =>
                            updateShippingAddress(
                                "country",
                                e.target.value
                            )
                        }
                        className={getInputClass(
                            !!errors.country
                        )}
                    />
                    {errors.country && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.country}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CheckoutForm;
