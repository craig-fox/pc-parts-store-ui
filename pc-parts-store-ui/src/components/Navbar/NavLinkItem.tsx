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
                    ? "font-semibold text-sky-400"
                    : "transition-colors hover:text-sky-400"
            }
        >
            {label}
        </NavLink>
    );
}

export default NavLinkItem;
