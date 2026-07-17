import { useState } from "react";
import type { Checkout } from "../../types/Checkout";

function CheckoutForm() {
    const [checkout, setCheckout] = useState<Checkout>({
        customer: {
            firstName: "",
            lastName: "",
            email: "",
        },
        shippingAddress: {
            addressLine1: "",
            city: "",
            postcode: "",
            country: "",
        },
    });

    const updateCustomer = (
        field: keyof Checkout["customer"],
        value: string
    ) => {
        setCheckout((current) => ({
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
        setCheckout((current) => ({
            ...current,
            shippingAddress: {
                ...current.shippingAddress,
                [field]: value,
            },
        }));
    };

    const inputClass = "rounded-md border border-slate-300 px-3 py-2";

    return (
        <form className="space-y-6 rounded-lg border border-slate-200 bg-white p-6">
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
                        className={inputClass}
                    />
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
                        className={inputClass}
                    />
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
                    className={inputClass}
                />
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
                    className={inputClass}
                />
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
                        className={inputClass}
                    />
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
                        className={inputClass}
                    />
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
                        className={inputClass}
                    />
                </div>
            </div>
        </form>
    );
}

export default CheckoutForm;
