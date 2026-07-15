import { Link } from "react-router";

type EmptyStateProps = {
    title: string;
    message: string;
    backTo?: string;
    backLabel?: string;
};

function EmptyState({ title, message, backTo, backLabel }: EmptyStateProps) {
    return (
        <div>
            {backTo && (
                <Link
                    to={backTo}
                    className="mb-8 inline-block text-sky-600 hover:text-sky-700"
                >
                    ← {backLabel ?? "Back"}
                </Link>
            )}

            <h1 className="text-3xl font-bold">
                {title}
            </h1>

            <p className="mt-4 text-slate-600">
                {message}
            </p>
        </div>
    );
}

export default EmptyState;