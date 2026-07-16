import type { ReactNode } from "react";

type EmptyStateProps = {
    title: string;
    message: string;
    action?: ReactNode;
};

function EmptyState({ title, message, action }: EmptyStateProps) {
    return (
        <div className="mx-auto max-w-xl py-16 text-center">
    <h1 className="text-3xl font-bold">
        {title}
    </h1>

    <p className="mt-4 text-slate-600">
        {message}
    </p>

    {action && (
        <div className="mt-8">
            {action}
        </div>
    )}
</div>
    );
}

export default EmptyState;