import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function LoginButton() {
  const { isAuthenticated, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <button
        onClick={logout}
        className="rounded-md bg-sky-500 px-4 py-2 transition-colors hover:bg-sky-600"
      >
        Logout
      </button>
    );
  }

  return (
    <Link
      to="/login"
      className="rounded-md bg-sky-500 px-4 py-2 transition-colors hover:bg-sky-600"
    >
      Login
    </Link>
  );
}

export default LoginButton;
