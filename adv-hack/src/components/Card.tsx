import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  onClick?: () => void;
  priority?: "critical" | "high" | "medium" | "low" | "none";
}

const paddingMap = { sm: "p-4", md: "p-5", lg: "p-6" };
const priorityBorder = {
  critical: "border-l-4 border-l-red-500",
  high: "border-l-4 border-l-amber-500",
  medium: "border-l-4 border-l-blue-500",
  low: "border-l-4 border-l-emerald-500",
  none: "",
};

export default function Card({ children, className = "", hover = false, padding = "md", onClick, priority = "none" }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl border border-gray-200 shadow-sm
        ${paddingMap[padding]}
        ${hover ? "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer" : ""}
        ${priorityBorder[priority]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function StatCard({ label, value, color, icon }: { label: string; value: string | number; color: string; icon: string }) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/40",
    yellow: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-800/40",
    green: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/40",
    red: "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-800/40",
    purple: "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800/40",
  };

  return (
    <div className={`rounded-xl p-4 transition-colors ${colorMap[color] || colorMap.blue}`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs font-medium opacity-80 mt-0.5">{label}</div>
    </div>
  );
}
