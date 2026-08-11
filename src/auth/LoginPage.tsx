import { useState } from "react";
import { useAuth } from "./AuthContext";
import type { LoginRequest } from "./authTypes";

function LoginPage() {
  const { login: authenticate } = useAuth();

  const [login, setLogin] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateLogin = (field: keyof LoginRequest, value: string) => {
    setLogin((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await authenticate(login);
    } catch (error) {
      console.error(error);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-medium">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={login.email}
            onChange={(e) => updateLogin("email", e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={login.password}
            onChange={(e) => updateLogin("password", e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-sky-500 px-4 py-2 font-medium text-white transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
