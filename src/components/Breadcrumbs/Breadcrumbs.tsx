import { Link } from "react-router-dom";

export type Breadcrumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Breadcrumb[];
};

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center">
              {item.href && !isLast ? (
                <Link to={item.href} className="hover:text-sky-600">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-900">{item.label}</span>
              )}

              {!isLast && <span className="mx-2 text-slate-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
