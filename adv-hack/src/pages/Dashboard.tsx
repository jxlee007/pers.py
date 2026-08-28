import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { dashboardCases, caseOfficerMap, officerProfiles } from "../data/mockData";
import Card, { StatCard } from "../components/Card";

const statusColors: Record<string, string> = {
  "In Progress": "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60",
  "Escalated": "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/60",
  "Resolved": "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60",
  "Awaiting Action": "bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60",
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
        {/* Accountability Banner */}
        <div className="mb-6 bg-gradient-to-r from-[#1a237e] to-[#0d47a1] rounded p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <div>
              <div className="font-bold text-sm">
                {t("पारदर्शिता एवं जवाबदेही इंजन सक्रिय है", "Public Accountability & Transparency Engine Active")}
              </div>
              <div className="text-xs text-blue-100 mt-0.5">
                {t(
                  "सभी राज्यों की रैंकिंग, अधिकारियों की वास्तविक समाधान दर और सार्वजनिक रेटिंग देखें।",
                  "View state rankings (Maharashtra #1), officer performance audits & citizen ratings."
                )}
              </div>
            </div>
          </div>
          <Link
            to="/accountability"
            className="btn-gov-accent text-xs font-bold whitespace-nowrap self-stretch sm:self-auto text-center"
            style={{ padding: "8px 16px" }}
          >
            📊 {t("जवाबदेही डैशबोर्ड देखें", "View Accountability Dashboard")}
          </Link>
        </div>

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
                filter === f.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-[#182236] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
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

              {/* Assigned Officer Badge */}
              {(() => {
                const officerId = caseOfficerMap[c.id];
                const officer = officerProfiles.find((o) => o.id === officerId);
                if (!officer) return null;
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/officer/${officer.id}`);
                    }}
                    className="bg-blue-50/80 border border-blue-200/80 rounded-lg p-2.5 mb-3 flex items-center justify-between text-xs hover:border-[#1a237e] hover:bg-blue-50 transition-all cursor-pointer"
                    title={t("अधिकारी का सार्वजनिक ट्रैक रिकॉर्ड देखें", "View officer's public track record")}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0"
                        style={{ background: officer.avatarColor }}
                      >
                        {officer.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 leading-tight truncate flex items-center gap-1">
                          <span className="truncate">{t(officer.nameHi, officer.name)}</span>
                          <span className="text-amber-600 font-bold text-[10px] flex-shrink-0">★ {officer.metrics.avgRating}</span>
                        </div>
                        <div className="text-[10px] text-gray-500 truncate">
                          {t("नोडल अधिकारी", "Nodal PG Officer")} · {(officer.metrics.realSolutionRate * 100).toFixed(0)}% {t("वास्तविक समाधान", "real fix")}
                        </div>
                      </div>
                    </div>
                    <span className="text-[#1a237e] text-[11px] font-bold flex-shrink-0 ml-2">
                      {t("जांचें", "Audit")} →
                    </span>
                  </div>
                );
              })()}

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-gray-100 dark:border-gray-700/60">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/case/${c.id}`); }}
                  className="flex-1 py-2 text-xs font-semibold text-[#1a237e] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border border-blue-100 dark:border-blue-800/40"
                >
                  {t("विस्तार देखें", "View Details")}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/feedback"); }}
                  className="py-2 px-2.5 text-xs font-semibold text-green-700 dark:text-emerald-300 bg-green-50 dark:bg-emerald-950/40 rounded-lg hover:bg-green-100 dark:hover:bg-emerald-900/50 transition-colors border border-green-100 dark:border-emerald-800/40"
                  title={t("समाधान गुणवत्ता रेटिंग दें", "Rate resolution quality")}
                >
                  ★ {t("रेटिंग", "Rate")}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate("/appeals"); }}
                  className="py-2 px-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
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
