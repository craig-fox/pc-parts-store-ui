export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    customerId: string;
    firstName: string;
    preferredName: string;
};