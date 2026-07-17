export type Checkout = {
    customer: {
        firstName: string;
        lastName: string;
        email: string;
    };

    shippingAddress: {
        addressLine1: string;
        city: string;
        postcode: string;
        country: string;
    };
};