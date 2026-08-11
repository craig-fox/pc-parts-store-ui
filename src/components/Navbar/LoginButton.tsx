import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { environment } from "../../config/environment";

function LoginButton() {
  const { user, isAuthenticated, logout } = useAuth();

  if (environment.dataSource === "fixture") {
    return null;
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <span>Hello, {user.preferredName?.trim() || user.firstName}</span>

        <button
          onClick={logout}
          className="rounded-md bg-sky-500 px-4 py-2 transition-colors hover:bg-sky-600"
        >
          Logout
        </button>
      </div>
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
