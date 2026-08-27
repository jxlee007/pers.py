import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { dashboardCases } from "../data/mockData";
import Card, { StatCard } from "../components/Card";

const statusColors: Record<string, string> = {
  "In Progress": "bg-amber-100 text-amber-800",
  "Escalated": "bg-red-100 text-red-800",
  "Resolved": "bg-emerald-100 text-emerald-800",
  "Awaiting Action": "bg-purple-100 text-purple-800",
};

const priorityMap: Record<string, "critical" | "high" | "medium" | "low"> = {
  critical: "critical",
  high: "high",
  medium: "medium",
  low: "low",
};

export default function Dashboard() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const stats = [
    { label: t("कुल दर्ज", "Total Filed"), value: dashboardCases.length, color: "blue", icon: "📋" },
    { label: t("जारी है", "In Progress"), value: dashboardCases.filter((c) => c.status === "In Progress").length, color: "yellow", icon: "⏳" },
    { label: t("समाधान हुआ", "Resolved"), value: 0, color: "green", icon: "✅" },
    { label: t("एस्केलेट", "Escalated"), value: dashboardCases.filter((c) => c.status === "Escalated").length, color: "red", icon: "⚠️" },
  ];

  const filters = [
    { id: "all", label: t("सभी", "All") },
    { id: "In Progress", label: t("जारी", "In Progress") },
    { id: "Escalated", label: t("एस्केलेट", "Escalated") },
    { id: "Awaiting Action", label: t("प्रतीक्षा", "Awaiting") },
  ];

  const filtered = filter === "all" ? dashboardCases : dashboardCases.filter((c) => c.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("आपकी सक्रिय शिकायतें", "Your Active Grievances")}</h1>
            <p className="text-gray-500 text-sm mt-1">{t("सभी शिकायतों की स्थिति देखें", "Track status of all your filed complaints")}</p>
          </div>
          <Link
            to="/file-complaint"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ background: "var(--primary)" }}
          >
            <span>+</span>
            <span className="hidden sm:inline">{t("नई शिकायत", "New Complaint")}</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === f.id ? "bg-indigo-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Case grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <Card
              key={c.id}
              hover
              padding="md"
              priority={priorityMap[c.priority] || "none"}
              onClick={() => navigate(`/case/${c.id}`)}
            >
              {/* Case ID + priority */}
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-xs text-gray-400 font-medium">{c.id}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    c.priority === "critical"
                      ? "bg-red-100 text-red-700"
                      : c.priority === "high"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {c.priority === "critical" ? "🔴" : c.priority === "high" ? "🟡" : "🔵"} {c.priority.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-sm leading-snug mb-3">
                {t(c.titleHi, c.title)}
              </h3>

              {/* Status badge */}
              <div className="mb-3">
                <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold ${statusColors[c.status] || "bg-gray-100 text-gray-700"}`}>
                  {c.status === "In Progress" ? "⏳" : c.status === "Escalated" ? "⚠️" : c.status === "Awaiting Action" ? "🔔" : "✅"}
                  {c.status}
                </span>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-500">
                <div>
                  <span className="font-medium text-gray-600">{t("विभाग:", "Dept:")}</span> {c.routed_to}
                </div>
                <div>
                  <span className="font-medium text-gray-600">{t("दिन:", "Days:")}</span>{" "}
                  <span className={c.days_pending > 100 ? "text-red-600 font-bold" : ""}>{c.days_pending}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">{t("दर्ज:", "Filed:")}</span> {c.filed_date}
                </div>
                <div>
                  <span className="font-medium text-gray-600">{t("समाधान:", "Due:")}</span> {c.expected_resolution}
                </div>
              </div>

              {/* Current stage */}
              <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600 mb-3">
                📍 {c.current_stage}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/case/${c.id}`); }}
                  className="flex-1 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  {t("विस्तार देखें", "View Details")}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/appeals"); }}
                  className="flex-1 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t("अपील", "Appeal")}
                </button>
              </div>
            </Card>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">📭</div>
              <div className="font-medium">{t("इस श्रेणी में कोई केस नहीं", "No cases in this category")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
