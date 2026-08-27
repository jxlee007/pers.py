import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50",
  secondary: "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200 active:bg-gray-300",
  success: "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  ghost: "bg-transparent text-indigo-600 hover:bg-indigo-50 border border-indigo-200",
};

const sizeClasses = {
  sm: "h-10 px-4 text-sm rounded-lg",
  md: "h-[52px] px-5 text-base rounded-xl",
  lg: "h-[60px] px-6 text-lg rounded-xl font-bold",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  loadingText,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center gap-2 font-semibold
        transition-all duration-150 cursor-pointer
        active:scale-[0.98] disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {loadingText || children}
        </>
      ) : (
        <>
          {icon && <span className="text-xl">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
