import Logo from "./Logo";
import NavLinks from "./NavLinks";
import LoginButton from "./LoginButton";
import CartBadge from "../Cart/CartBadge";
import { useAuth } from "../../auth/AuthContext";

function Navbar() {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {isAuthenticated && user && (
          <span>Hello, {user.preferredName?.trim() || user.firstName}</span>
        )}

        <Logo />

        <CartBadge />

        <div className="flex items-center gap-8">
          <NavLinks />
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
