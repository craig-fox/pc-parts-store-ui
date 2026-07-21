import NavLinkItem from "./NavLinkItem";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/cart", label: "Cart" },
  { to: "/orders", label: "Orders" },
];

function NavLinks() {
  return (
    <div className="flex items-center gap-8">
      {navLinks.map((link) => (
        <NavLinkItem key={link.to} to={link.to} label={link.label} />
      ))}
    </div>
  );
}

export default NavLinks;
