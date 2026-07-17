import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
}


const variantClasses = {
    primary:
        "bg-sky-600 hover:bg-sky-700 text-white",

    secondary:
        "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",

    danger:
        "border border-red-300 bg-white text-red-600 hover:bg-red-50 hover:border-red-400",
};

export default function Button({
    children,
    variant = "primary",
    type = "button",
    disabled = false,
    className,
    onClick,
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
                rounded-md
                px-4
                py-2
                font-medium
                transition-colors
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${variantClasses[variant]}
                ${className ?? ""}
            `}
        >
            {children}
        </button>
    );
}