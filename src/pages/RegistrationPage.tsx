import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "../components/common/Button";
import { customerService } from "../services/customerService";
import type { RegistrationRequest } from "../types/RegistrationRequest";

function RegistrationPage() {
  const navigate = useNavigate();

  type RegistrationForm = {
    firstName: string;
    lastName: string;
    preferredName: string;
    email: string;
    address: string;
    password: string;
  };

  const [form, setForm] = useState<RegistrationForm>({
    firstName: "",
    lastName: "",
    preferredName: "",
    email: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    email: "",
    address: "",
    password: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field: keyof RegistrationRequest, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  function validate() {
    const newErrors = {
      firstName: "",
      lastName: "",
      preferredName: "",
      email: "",
      address: "",
      password: "",
    };

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const preferredName = form.preferredName.trim();
    const email = form.email.trim();
    const address = form.address.trim();

    if (!firstName) {
      newErrors.firstName = "First name is required.";
    } else if (firstName.length < 2 || firstName.length > 100) {
      newErrors.firstName = "Name must be between 2 and 100 characters.";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (lastName.length < 2 || lastName.length > 100) {
      newErrors.lastName = "Name must be between 2 and 100 characters.";
    }

    if (
      preferredName &&
      (preferredName.length < 2 || preferredName.length > 100)
    ) {
      newErrors.preferredName = "Name must be between 2 and 100 characters.";
    }

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (email.length > 255) {
      newErrors.email = "Email must not exceed 255 characters.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email must be a valid email address.";
    }

    if (!address) {
      newErrors.address = "Address is required.";
    } else if (address.length < 5 || address.length > 255) {
      newErrors.address = "Address must be between 5 and 255 characters.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8 || form.password.length > 50) {
      newErrors.password = "Password must be between 8 and 50 characters.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setSubmitError("");

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const request: RegistrationRequest = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        preferredName: form.preferredName.trim() || null,
        email: form.email.trim(),
        address: form.address.trim(),
        password: form.password,
      };
      console.log("ABOUT TO REGISTER:", JSON.stringify(request));

      await customerService.registerCustomer(request);

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setSubmitError(
        "Unable to complete registration. Please check your details and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="mx-auto max-w-xl px-6 py-12">
        <h1 className="mb-8 text-4xl font-bold">Register an Account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="first-name" className="mb-2 font-medium">
                First Name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className={`rounded-md border px-3 py-2 ${
                  errors.firstName ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
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
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className={`rounded-md border px-3 py-2 ${
                  errors.lastName ? "border-red-500" : "border-slate-300"
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="preferred-name" className="mb-2 font-medium">
              Preferred Name
            </label>
            <input
              id="preferred-name"
              name="preferredName"
              type="text"
              value={form.preferredName}
              onChange={(e) => updateField("preferredName", e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2"
            />
            <p className="mt-1 text-sm text-slate-500">
              Optional. We&apos;ll use your first name if you leave this blank.
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={`rounded-md border px-3 py-2 ${
                errors.email ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              className={`rounded-md border px-3 py-2 ${
                errors.address ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              className={`rounded-md border px-3 py-2 ${
                errors.password ? "border-red-500" : "border-slate-300"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {submitError && (
            <p role="alert" className="text-sm text-red-600">
              {submitError}
            </p>
          )}

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Registering Account..." : "Register Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-sky-600 hover:text-sky-700"
          >
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}

export default RegistrationPage;
