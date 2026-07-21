import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="text-2xl font-bold transition-colors hover:text-sky-400"
    >
      🖥️ PC Parts Store
    </Link>
  );
}

export default Logo;
