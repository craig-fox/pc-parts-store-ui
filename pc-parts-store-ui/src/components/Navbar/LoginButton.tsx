import { Link } from "react-router-dom";

function LoginButton() {
    return (
        <Link
            to="/login"
            className="rounded-md bg-sky-500 px-4 py-2 hover:bg-sky-600 transition-colors"
        >
            Login
        </Link>
    );
}

export default LoginButton;