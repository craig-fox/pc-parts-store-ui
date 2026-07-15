import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link
            to="/"
            className="text-2xl font-bold hover:text-sky-400 transition-colors"
        >
            🖥️ PC Parts Store
        </Link>
    );
}

export default Logo;