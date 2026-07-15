import { NavLink } from "react-router-dom";

type NavLinkItemProps = {
    to: string;
    label: string;
};

function NavLinkItem({ to, label }: NavLinkItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-sky-400 font-semibold"
                    : "hover:text-sky-400 transition-colors"
            }
        >
            {label}
        </NavLink>
    );
}

export default NavLinkItem;