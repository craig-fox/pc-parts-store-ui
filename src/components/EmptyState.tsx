import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  message: string;
  action?: ReactNode;
  icon?: React.ReactNode;
};

function EmptyState({ title, message, action, icon }: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      {icon && <div className="mb-4 text-5xl">{icon}</div>}
      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="mt-4 text-slate-600">{message}</p>

      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

export default EmptyState;
