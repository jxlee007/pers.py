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
    blue: "bg-blue-50 text-blue-700",
    yellow: "bg-amber-50 text-amber-700",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <div className={`rounded-xl p-4 ${colorMap[color] || colorMap.blue}`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs font-medium opacity-80 mt-0.5">{label}</div>
    </div>
  );
}
