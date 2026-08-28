import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  systemHealth,
  stateRankings,
  officerProfiles,
  escalations,
  escalationRules,
  officerEscalationMetrics,
  socialMediaImpact,
  topSharedCases,
  type EscalationRecord,
} from "../data/mockData";

export default function Accountability() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"rank" | "resolutionRate" | "avgResolutionDays" | "satisfaction">("rank");
  const [filterType, setFilterType] = useState<"all" | "states" | "uts">("all");
  const [escalationTab, setEscalationTab] = useState<"active" | "resolved" | "rules" | "watchlist">("active");
  const [selectedEscalation, setSelectedEscalation] = useState<EscalationRecord | null>(null);

  // Filter and sort state rankings
  const filteredStates = stateRankings
    .filter((s) => {
      const matchesSearch =
        s.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.stateHi.includes(searchTerm) ||
        s.abbreviation.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;
      if (filterType === "states") return s.rank <= 28;
      if (filterType === "uts") return s.rank > 28;
      return true;
    })
    .sort((a, b) => {
      if (sortField === "rank") return a.rank - b.rank;
      if (sortField === "resolutionRate") return b.resolutionRate - a.resolutionRate;
      if (sortField === "avgResolutionDays") return a.avgResolutionDays - b.avgResolutionDays;
      if (sortField === "satisfaction") return b.satisfaction - a.satisfaction;
      return 0;
    });

  // Top 4 Officers across the country
  const topOfficers = [...officerProfiles]
    .sort((a, b) => b.metrics.avgRating - a.metrics.avgRating || b.metrics.realSolutionRate - a.metrics.realSolutionRate)
    .slice(0, 4);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }} id="main-content">
      {/* ── BREADCRUMB & HEADER ── */}
      <div style={{ background: "var(--gov-navy)", color: "white" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-2 text-xs opacity-75 mb-2">
            <Link to="/" className="hover:underline">{t("होम", "Home")}</Link>
            <span>›</span>
            <span className="opacity-100 font-semibold">{t("पारदर्शिता एवं जवाबदेही इंजन", "Transparency & Accountability Engine")}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div
                className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider mb-2"
                style={{ background: "rgba(255,111,0,0.25)", color: "#ffd54f", border: "1px solid rgba(255,213,79,0.4)" }}
              >
                ⚖️ {t("सार्वजनिक जवाबदेही डैशबोर्ड", "Public Accountability Dashboard")}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t("सिस्टम स्वास्थ्य एवं प्रदर्शन निगरानी", "System Health & Performance Oversight")}
              </h1>
              <p className="text-sm text-blue-100 mt-1 max-w-2xl">
                {t(
                  "कागजी अनुपालन नहीं — वास्तविक समाधान। सभी 28 राज्यों, 8 केंद्र शासित प्रदेशों और 91,000+ अधिकारियों का पारदर्शी रिकॉर्ड।",
                  "Real solutions over paper compliance. Transparent public record of all 28 States, 8 UTs, and 91,000+ nodal grievance officers."
                )}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded p-3 text-right text-xs">
              <div className="text-blue-200">{t("अंतिम अद्यतन", "Data Last Audited")}</div>
              <div className="text-sm font-bold text-white mt-0.5">{systemHealth.lastUpdated}</div>
              <div className="text-[11px] text-green-300 mt-1 font-mono">● 2.47 Cr {t("केस ट्रैक किए गए", "Cases Tracked")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: SYSTEM HEALTH OVERVIEW (5-CARD RADAR) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Total Resolved vs Paper Compliance */}
          <div className="bg-white rounded border border-gray-200 shadow-sm p-4 border-t-4 border-t-[#2e7d32]">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span className="font-semibold uppercase tracking-wider">{t("समाधान गुणवत्ता", "Resolution Quality")}</span>
              <span className="text-base">🎯</span>
            </div>
            <div className="text-2xl font-extrabold text-gray-900 mb-0.5">
              {(systemHealth.totalResolved / 100000).toFixed(1)} {t("लाख", "Lakh")}
            </div>
            <div className="text-[11px] text-gray-500 mb-2">
              {t("कुल निवारित मामले (78% दर)", "Total resolved cases (78% rate)")}
            </div>
            {/* Split Bar */}
            <div className="space-y-1 pt-2 border-t border-gray-100">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-green-700">✅ {t("वास्तविक", "Real")}: 78%</span>
                <span className="text-amber-700">⚠️ {t("कागजी", "Paper")}: 22%</span>
              </div>
              <div className="h-2 w-full bg-amber-100 rounded-full overflow-hidden flex">
                <div className="bg-green-600 h-full" style={{ width: "78%" }} />
                <div className="bg-amber-400 h-full" style={{ width: "22%" }} />
              </div>
              <div className="text-[10px] text-gray-400">
                {t("नागरिक सत्यापन द्वारा प्रमाणित", "Verified via citizen audit")}
              </div>
            </div>
          </div>

          {/* Card 2: Central vs State Resolution Time */}
          <div className="bg-white rounded border border-gray-200 shadow-sm p-4 border-t-4 border-t-[#1a237e]">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span className="font-semibold uppercase tracking-wider">{t("औसत समाधान समय", "Avg Resolution Time")}</span>
              <span className="text-base">⏱️</span>
            </div>
            <div className="text-2xl font-extrabold text-gray-900 mb-0.5">
              18 {t("दिन", "Days")}
            </div>
            <div className="text-[11px] text-gray-500 mb-2">
              {t("राष्ट्रीय औसत (लक्ष्य: 21 दिन)", "National Average (Target: 21d)")}
            </div>
            <div className="space-y-1 pt-2 border-t border-gray-100 text-[11px]">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">🏛️ {t("केंद्र", "Central")}:</span>
                <span className="font-bold text-green-700">13 {t("दिन", "d")} ✅</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">🗺️ {t("राज्य", "State")}:</span>
                <span className="font-bold text-red-600">64 {t("दिन", "d")} ⚠️</span>
              </div>
              <div className="text-[10px] text-red-500 font-medium pt-0.5">
                ▲ {t("राज्यों में विलंब मुख्य अड़चन", "State delays remain key bottleneck")}
              </div>
            </div>
          </div>

          {/* Card 3: Citizen Satisfaction Score */}
          <div className="bg-white rounded border border-gray-200 shadow-sm p-4 border-t-4 border-t-[#e65100]">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span className="font-semibold uppercase tracking-wider">{t("नागरिक संतुष्टि", "Citizen Rating")}</span>
              <span className="text-base">⭐</span>
            </div>
            <div className="flex items-baseline gap-1.5 mb-0.5">
              <span className="text-2xl font-extrabold text-gray-900">4.2</span>
              <span className="text-xs font-semibold text-gray-400">/ 5.0</span>
            </div>
            <div className="text-[11px] text-gray-500 mb-2">
              {t("3.8 लाख सत्यापित नागरिक फीडबैक", "Based on 3.8L verified citizen reviews")}
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-amber-500 text-sm">★★★★☆</span>
              <span className="font-bold text-green-700 text-[11px]">+0.4 {t("पिछले वर्ष से", "vs last year")}</span>
            </div>
          </div>

          {/* Card 4: AUTO-ESCALATIONS THIS WEEK (CRITICAL COMPONENT) */}
          <div className="bg-white rounded border border-gray-200 shadow-sm p-4 border-t-4 border-t-[#c62828] relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span className="font-semibold uppercase tracking-wider text-red-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                {t("सक्रिय एस्केलेशन", "Active Escalations")}
              </span>
              <span className="text-base">🚨</span>
            </div>
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="text-2xl font-extrabold text-red-700">{systemHealth.activeEscalations}</span>
              <span className="text-[11px] font-semibold text-gray-500">
                ({t("दर:", "Rate:")} {systemHealth.escalationRate}%)
              </span>
            </div>
            <div className="text-[11px] text-gray-500 mb-2">
              {t("कागजी समाधान पर स्वतः अलर्ट", "Auto-triggered by citizen feedback")}
            </div>
            <div className="space-y-1 pt-2 border-t border-gray-100 text-[11px]">
              <div className="flex justify-between">
                <span className="text-gray-600">🏛️ {t("राज्य स्तर (नोडल):", "State Level:")}</span>
                <span className="font-bold text-gray-900">{systemHealth.stateEscalations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">🏢 {t("मंत्रालय स्तर:", "Ministry Level:")}</span>
                <span className="font-bold text-gray-900">{systemHealth.ministryEscalations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">⚖️ {t("अपीलीय प्राधिकरण:", "Appellate Authority:")}</span>
                <span className="font-bold text-purple-700">{systemHealth.appealEscalations}</span>
              </div>
            </div>
          </div>

          {/* Card 5: AI Precision & Active Officers */}
          <div className="bg-white rounded border border-gray-200 shadow-sm p-4 border-t-4 border-t-[#006064]">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span className="font-semibold uppercase tracking-wider">{t("AI सटीकता एवं नोडल", "AI & Officers")}</span>
              <span className="text-base">🤖</span>
            </div>
            <div className="text-2xl font-extrabold text-gray-900 mb-0.5">
              89%
            </div>
            <div className="text-[11px] text-gray-500 mb-2">
              {t("पहली बार सही विभाग को रूटिंग", "First-time correct routing rate")}
            </div>
            <div className="pt-2 border-t border-gray-100 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("सक्रिय नोडल अधिकारी:", "Active PG Officers:")}</span>
                <span className="font-bold text-gray-900">91,420</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("माह में हल एस्केलेशन:", "Redressed This Mo:")}</span>
                <span className="font-bold text-green-700">134 ✅</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: TOP PERFORMING OFFICERS LEADERBOARD ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>🏆</span>
              <span>{t("शीर्ष प्रदर्शनकारी नोडल अधिकारी (अखिल भारतीय)", "Top Performing Nodal Officers (All-India)")}</span>
            </h2>
            <p className="text-xs text-gray-500">
              {t(
                "नागरिक रेटिंग, वास्तविक समाधान दर और समयबद्धता के आधार पर सार्वजनिक वरीयता।",
                "Ranked by citizen satisfaction, real solution verification, and speed."
              )}
            </p>
          </div>
          <div className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded flex items-center gap-1.5 self-start">
            <span>🛡️</span>
            <span>{t("सत्यापित सरकारी अधिकारी", "Verified Government Officials")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topOfficers.map((officer, index) => (
            <div
              key={officer.id}
              onClick={() => navigate(`/officer/${officer.id}`)}
              className="bg-white border border-gray-200 rounded p-4 shadow-sm hover:shadow-md hover:border-[#1a237e] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: officer.avatarColor }}
                    >
                      {officer.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm leading-tight hover:text-[#1a237e]">
                        {t(officer.nameHi, officer.name)}
                      </h3>
                      <div className="text-[11px] text-gray-500 leading-tight mt-0.5">
                        {officer.designation}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-0.5">
                    ★ {officer.metrics.avgRating}
                  </span>
                </div>

                {/* Dept and State */}
                <div className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded mb-3 flex items-center justify-between">
                  <span className="font-medium text-gray-700">{officer.ministry}</span>
                  <span className="text-gray-400">📍 {officer.state}</span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs border-t border-gray-100 pt-2 mb-3">
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase">{t("वास्तविक समाधान", "Real Solution")}</div>
                    <div className="font-bold text-green-700">{(officer.metrics.realSolutionRate * 100).toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase">{t("औसत समय", "Avg Days")}</div>
                    <div className="font-bold text-gray-900">{officer.metrics.avgResolutionDays} {t("दिन", "days")}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase">{t("हल किए केस", "Resolved")}</div>
                    <div className="font-bold text-gray-800">{officer.metrics.casesResolved}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px] uppercase">{t("अपील दर", "Appeals")}</div>
                    <div className="font-bold text-green-600">{(officer.metrics.appealRate * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-[#1a237e] font-semibold">
                <span>{t("प्रोफ़ाइल एवं समीक्षाएं देखें", "View Profile & Reviews")}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2.5: PUBLIC AUTO-ESCALATION RADAR & CPGRAMS STATUTORY OVERSIGHT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="bg-white dark:bg-[#182236] border border-gray-200 dark:border-gray-700/80 rounded shadow-sm overflow-hidden border-t-4 border-t-[#c62828]">
          {/* Section Header */}
          <div className="p-5 border-b border-gray-200 dark:border-gray-700/80 bg-gradient-to-r from-red-50/40 via-white to-amber-50/30 dark:from-red-950/30 dark:via-[#182236] dark:to-amber-950/20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/60 mb-1.5">
                  🚨 {t("CPGRAMS वैधानिक स्वतः एस्केलेशन रडार", "CPGRAMS Statutory Auto-Escalation Radar")}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>{t("कागजी खानापूर्ति पर रोक: स्वतः एस्केलेशन प्रणाली", "Ending Paper Compliance: The Auto-Escalation Loop")}</span>
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 max-w-3xl leading-relaxed">
                  {t(
                    "जब कोई नागरिक शिकायत बंद होने के बाद 1-2 स्टार (खराब) रेटिंग देता है या 'समस्या ठीक नहीं हुई' दर्ज करता है, तो मामला स्वतः राज्य नोडल पीजी अधिकारी एवं नोडल अपीलीय प्राधिकरण को 24-48 घंटे में एस्केलेट होता है।",
                    "When a citizen rates ≤ 2 stars ('Poor') or reports 'problem not fixed', CPGRAMS auto-escalates to State Nodal PG Officers & the Nodal Appellate Authority within 24-48h."
                  )}
                </p>
              </div>

              {/* Status Summary Pills */}
              <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
                <div className="bg-white dark:bg-[#111827] border border-red-200 dark:border-red-800/60 shadow-2xs rounded px-3 py-1.5 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-red-600 dark:text-red-400 font-bold">{t("सक्रिय एस्केलेशन", "Active Escalations")}</div>
                  <div className="text-lg font-black text-red-700 dark:text-red-300">{systemHealth.activeEscalations}</div>
                </div>
                <div className="bg-white dark:bg-[#111827] border border-green-200 dark:border-green-800/60 shadow-2xs rounded px-3 py-1.5 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-green-600 dark:text-green-400 font-bold">{t("इस माह निवारित", "Redressed (Month)")}</div>
                  <div className="text-lg font-black text-green-700 dark:text-green-300">{systemHealth.escalationsResolvedThisMonth}</div>
                </div>
                <div className="bg-white dark:bg-[#111827] border border-blue-200 dark:border-blue-800/60 shadow-2xs rounded px-3 py-1.5 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold">{t("राष्ट्रीय एस्केलेशन दर", "National Rate")}</div>
                  <div className="text-lg font-black text-[#1a237e] dark:text-blue-300">{systemHealth.escalationRate}%</div>
                </div>
              </div>
            </div>

            {/* Radar Navigation Tabs */}
            <div className="flex gap-2 mt-5 overflow-x-auto pb-1 border-t border-gray-200/80 dark:border-gray-700/80 pt-4">
              <button
                onClick={() => setEscalationTab("active")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-bold transition-all ${
                  escalationTab === "active"
                    ? "bg-[#c62828] text-white shadow-xs"
                    : "bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span>🚨 {t("सक्रिय एस्केलेशन", "Active Escalations")}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${escalationTab === "active" ? "bg-white/30 text-white" : "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300"}`}>
                  {escalations.filter((e) => e.status === "active").length}
                </span>
              </button>

              <button
                onClick={() => setEscalationTab("resolved")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-bold transition-all ${
                  escalationTab === "resolved"
                    ? "bg-[#2e7d32] text-white shadow-xs"
                    : "bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span>✅ {t("नोडल अधिकारियों द्वारा हल", "Resolved by Nodal Officers")}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${escalationTab === "resolved" ? "bg-white/30 text-white" : "bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300"}`}>
                  {escalations.filter((e) => e.status === "closed").length}
                </span>
              </button>

              <button
                onClick={() => setEscalationTab("rules")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-bold transition-all ${
                  escalationTab === "rules"
                    ? "bg-[#1a237e] text-white shadow-xs"
                    : "bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span>⚖️ {t("CPGRAMS पदानुक्रम एवं नियम", "CPGRAMS Hierarchy & Rules")}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 font-semibold">
                  3 {t("नियम", "Rules")}
                </span>
              </button>

              <button
                onClick={() => setEscalationTab("watchlist")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-bold transition-all ${
                  escalationTab === "watchlist"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>⚠️ {t("अधिकारी जोखिम वॉचलिस्ट", "Officer Risk Watchlist")}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-semibold">
                  {Object.values(officerEscalationMetrics).filter((m) => m.red_flag).length} {t("फ्लैग", "Flags")}
                </span>
              </button>
            </div>
          </div>

          {/* TAB 1: ACTIVE ESCALATIONS */}
          {escalationTab === "active" && (
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
                <span>{t("सक्रिय समीक्षा के तहत लंबित एस्केलेशन केस (30-दिवसीय वैधानिक अपीलीय सीमा में)", "Active cases under supervisory review (tracked against 30-day statutory appeal mandate)")}</span>
                <span className="font-semibold text-red-600">● {t("लाइव डेटा", "Live Data")}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {escalations
                  .filter((e) => e.status === "active")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="border border-red-200 rounded-lg p-4 bg-red-50/20 hover:border-red-400 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-red-100 text-red-900 border border-red-200">
                            {item.id} 🚨
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                            ⏳ {item.daysOpen} {t("दिन खुले", "days open")}
                          </span>
                        </div>

                        <div className="mb-2">
                          <Link
                            to={`/case/${item.caseId}`}
                            className="font-mono text-xs font-bold text-[#1a237e] hover:underline"
                          >
                            {item.caseId}
                          </Link>
                          <div className="text-[11px] text-gray-600 mt-0.5">
                            {t("अधिकारी:", "Officer:")}{" "}
                            <Link
                              to={`/officer/${item.officerId}`}
                              className="font-semibold text-gray-900 hover:text-[#1a237e] underline"
                            >
                              {item.officerName}
                            </Link>{" "}
                            ({item.department})
                          </div>
                          <div className="text-[10px] text-gray-400">
                            📍 {item.state} • {item.ministry}
                          </div>
                        </div>

                        {/* Citizen feedback */}
                        <div className="p-2.5 rounded bg-white border border-gray-200 text-xs mb-3">
                          <div className="text-[10px] text-amber-700 font-bold flex items-center gap-1 mb-0.5">
                            <span>{"★".repeat(item.citizenRating)}</span>
                            <span>{t("नागरिक असंतोष रिपोर्ट:", "Citizen Dissatisfaction:")}</span>
                          </div>
                          <p className="text-gray-800 italic leading-relaxed">
                            "{t(item.feedbackHi, item.feedback)}"
                          </p>
                        </div>

                        {/* Escalated to authority */}
                        <div className="text-xs space-y-1 mb-3">
                          <div className="text-gray-500 font-medium text-[11px]">
                            {t("किसे एस्केलेट हुआ:", "Escalated to Authority:")}
                          </div>
                          <div className="font-bold text-indigo-900 flex items-center gap-1">
                            <span>🏛️</span>
                            <span>{item.escalatedTo}</span>
                          </div>
                          <div className="text-[10px] text-gray-500 font-mono">
                            {t("ट्रिगर नियम: ", "Rule: ")} {t(item.triggerRuleHi, item.triggerRule)}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-red-100 flex items-center justify-between text-xs">
                        <button
                          onClick={() => setSelectedEscalation(item)}
                          className="font-bold text-[#1a237e] hover:underline flex items-center gap-1"
                        >
                          <span>► {t("पूर्ण विवरण एवं ऑडिट", "View Audit Details")}</span>
                        </button>
                        <Link
                          to={`/officer/${item.officerId}`}
                          className="text-[11px] text-gray-500 hover:text-gray-800"
                        >
                          {t("प्रोफ़ाइल देखें →", "Officer Profile →")}
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 2: RESOLVED ESCALATIONS */}
          {escalationTab === "resolved" && (
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
                <span>{t("वरिष्ठ नोडल अधिकारियों के पर्यवेक्षी हस्तक्षेप से सफलतापूर्वक हल हुए मामले", "Cases where supervisory Nodal intervention compelled genuine remedy over paper compliance")}</span>
                <span className="font-semibold text-green-700">✓ {t("सत्यापित समाधान", "Remedy Verified")}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {escalations
                  .filter((e) => e.status === "closed")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="border border-green-200 rounded-lg p-4 bg-green-50/20 hover:border-green-400 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-green-100 text-green-900 border border-green-300">
                            {item.id} ✅
                          </span>
                          <Link
                            to={`/case/${item.caseId}`}
                            className="font-mono text-xs font-bold text-[#1a237e] hover:underline"
                          >
                            {item.caseId}
                          </Link>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-800 border border-green-300 flex items-center gap-1">
                          ✓ {t("हल हुआ (अवधि: 2-3 दिन)", "Resolved in 2-3 days")}
                        </span>
                      </div>

                      <div className="text-xs text-gray-600 mb-2">
                        {t("अधिकारी:", "Officer:")}{" "}
                        <Link
                          to={`/officer/${item.officerId}`}
                          className="font-semibold text-gray-900 hover:text-[#1a237e] underline"
                        >
                          {item.officerName}
                        </Link>{" "}
                        ({item.department}, {item.state})
                      </div>

                      <div className="p-2.5 rounded bg-white border border-gray-200 text-xs mb-2.5">
                        <div className="text-[10px] text-gray-500 font-semibold mb-0.5">{t("प्रारंभिक समस्या:", "Citizen Problem:")}</div>
                        <p className="text-gray-800 italic">"{t(item.feedbackHi, item.feedback)}"</p>
                      </div>

                      <div className="p-2.5 rounded bg-green-50 border border-green-200 text-xs mb-3">
                        <div className="text-[10px] text-green-800 font-bold uppercase tracking-wider mb-0.5">
                          🎯 {t("नोडल अधिकारी द्वारा प्रदत्त वास्तविक समाधान:", "Nodal Supervisory Remedy:")}
                        </div>
                        <p className="text-green-950 font-semibold">{t(item.resolutionHi, item.resolution)}</p>
                        <div className="text-[11px] text-green-800 mt-1">
                          <span className="font-bold">{t("दीर्घकालिक प्रभाव: ", "Systemic Impact: ")}</span>
                          {t(item.impactHi, item.impact)}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-green-100 flex items-center justify-between text-xs text-gray-500">
                        <span>🏛️ {item.escalatedTo}</span>
                        <button
                          onClick={() => setSelectedEscalation(item)}
                          className="font-bold text-[#1a237e] hover:underline"
                        >
                          {t("विवरण देखें →", "Audit Log →")}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 3: CPGRAMS HIERARCHY & STATUTORY RULES */}
          {escalationTab === "rules" && (
            <div className="p-5 space-y-6">
              {/* Hierarchy Blueprint */}
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span>🏛️</span>
                  <span>{t("CPGRAMS त्रि-स्तरीय जवाबदेही पदानुक्रम (वैधानिक ढांचा)", "CPGRAMS 3-Tier Accountability Hierarchy (Statutory Framework)")}</span>
                </h3>
                <p className="text-xs text-indigo-900 mb-4 leading-relaxed">
                  {t(
                    "CPGRAMS में प्रत्येक मंत्रालय, विभाग और राज्य में नोडल लोक शिकायत अधिकारी (निगरानी व मूल कारण विश्लेषण) तथा एक वरिष्ठ नोडल अपीलीय प्राधिकरण (30 दिनों में औपचारिक अपीलों का निपटारा) नियुक्त होते हैं।",
                    "Under CPGRAMS statutory rules, Nodal PG Officers supervise GROs & analyze root-causes, while the Nodal Authority for Appeal (senior in rank) disposes formal citizen appeals within 30 days."
                  )}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white rounded p-3 border border-indigo-100 shadow-2xs">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-xs mb-1.5">1</div>
                    <div className="font-bold text-gray-900">{t("फ्रंटलाइन अधिकारी (GRO)", "Front-line GRO")}</div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-tight">
                      {t("प्राथमिक शिकायत निवारण अधिकारी। 21 दिनों में वास्तविक समाधान आवश्यक।", "Grievance Redressal Officer. Must deliver real remedy within 21 days.")}
                    </div>
                    <div className="mt-2 text-[10px] text-red-600 font-semibold">
                      ⚡ {t("ट्रिगर: रेटिंग ≤ 2 स्टार", "Trigger: Rating ≤ 2 stars")}
                    </div>
                  </div>

                  <div className="bg-white rounded p-3 border border-indigo-100 shadow-2xs border-l-4 border-l-amber-500">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs mb-1.5">2</div>
                    <div className="font-bold text-gray-900">{t("नोडल PG अधिकारी (राज्य/केंद्र)", "Nodal PG Officer")}</div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-tight">
                      {t("पर्यवेक्षी निगरानी, मूल कारण विश्लेषण और पेंडेंसी की समीक्षा।", "Supervisory oversight of GROs, root cause analysis & pendency audits.")}
                    </div>
                    <div className="mt-2 text-[10px] text-amber-700 font-semibold">
                      ⚡ {t("कार्रवाई: 24-48 घंटे में हस्तक्षेप", "Action: 24-48h intervention")}
                    </div>
                  </div>

                  <div className="bg-white rounded p-3 border border-indigo-100 shadow-2xs border-l-4 border-l-purple-600">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-900 font-bold flex items-center justify-center text-xs mb-1.5">3</div>
                    <div className="font-bold text-gray-900">{t("नोडल अपीलीय प्राधिकरण", "Appellate Authority")}</div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-tight">
                      {t("नोडल अधिकारी से वरिष्ठ पद के अधिकारी। 30 दिनों में अपीलों का अनिवार्य निस्तारण।", "Senior in rank to Nodal GRO. Disposes formal citizen appeals in 30 days.")}
                    </div>
                    <div className="mt-2 text-[10px] text-purple-700 font-semibold">
                      ⚡ {t("सक्षम: 'खराब' फीडबैक मिलने पर", "Enabled on: 'Poor' feedback")}
                    </div>
                  </div>

                  <div className="bg-white rounded p-3 border border-indigo-100 shadow-2xs border-l-4 border-l-green-600">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-900 font-bold flex items-center justify-center text-xs mb-1.5">4</div>
                    <div className="font-bold text-gray-900">{t("CGA / PMO / DARPG", "CGA / PMO Oversight")}</div>
                    <div className="text-[11px] text-gray-500 mt-1 leading-tight">
                      {t("राष्ट्रीय जवाबदेही डैशबोर्ड, राज्य रैंकिंग और प्रणालीगत अड़चनों का ऑडिट।", "National public radar, state performance rankings & systemic delay audit.")}
                    </div>
                    <div className="mt-2 text-[10px] text-green-700 font-semibold">
                      ⚡ {t("प्रभाव: करियर जवाबदेही", "Impact: Career accountability")}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Explicit Rules Table */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  📜 {t("स्वतः एस्केलेशन के 3 वैधानिक नियम", "The 3 Statutory Auto-Escalation Rules")}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {escalationRules.map((rule) => (
                    <div key={rule.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-800">
                            {rule.id}
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200">
                            ⏱️ {t(rule.timelineHi, rule.timeline)}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-gray-900 mb-1">
                          {t(rule.nameHi, rule.name)}
                        </h4>

                        <div className="mt-2 space-y-2 text-xs">
                          <div>
                            <span className="text-gray-500 font-medium">{t("ट्रिगर संकेत:", "Trigger Signal:")}</span>
                            <div className="font-semibold text-red-700 mt-0.5">
                              {t(rule.triggerHi, rule.trigger)}
                            </div>
                          </div>

                          <div>
                            <span className="text-gray-500 font-medium">{t("स्वतः कार्रवाई:", "Automated Action:")}</span>
                            <div className="font-semibold text-gray-800 mt-0.5">
                              {t(rule.actionHi, rule.action)}
                            </div>
                          </div>

                          <div>
                            <span className="text-gray-500 font-medium">{t("संबद्ध प्राधिकारी:", "Target Role:")}</span>
                            <div className="font-bold text-indigo-900 mt-0.5">
                              {t(rule.targetRoleHi, rule.targetRole)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-200 text-[11px] text-gray-500">
                        <span className="font-bold text-gray-700">{t("कानूनी आधार: ", "Statutory Basis: ")}</span>
                        {t(rule.legalBasisHi, rule.legalBasis)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OFFICER RISK WATCHLIST */}
          {escalationTab === "watchlist" && (
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
                <span>{t("उच्च एस्केलेशन अथवा आवर्ती कागजी खानापूर्ति वाले अधिकारी (सार्वजनिक पारदर्शिता निगरानी सूची)", "Officers flagged for elevated escalation rates or repeat paper solutions (Public Watchlist)")}</span>
                <span className="font-semibold text-amber-700">⚠️ {t("सार्वजनिक निगरानी", "Public Scrutiny")}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                      <th className="py-2.5 px-3">{t("अधिकारी का नाम", "Officer Name")}</th>
                      <th className="py-2.5 px-3">{t("विभाग / राज्य", "Department / State")}</th>
                      <th className="py-2.5 px-3 text-center">{t("एस्केलेशन दर", "Escalation Rate")}</th>
                      <th className="py-2.5 px-3 text-center">{t("सक्रिय एस्केलेशन", "Active Escalations")}</th>
                      <th className="py-2.5 px-3 text-center">{t("जोखिम स्तर", "Risk Level")}</th>
                      <th className="py-2.5 px-3 text-center">{t("प्रशासनिक स्थिति", "Status")}</th>
                      <th className="py-2.5 px-3 text-right">{t("कार्रवाई", "Action")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(officerEscalationMetrics).map(([officerId, metrics]) => {
                      const officer = officerProfiles.find((o) => o.id === officerId);
                      if (!officer) return null;

                      return (
                        <tr key={officerId} className="hover:bg-red-50/30 transition-colors">
                          <td className="py-2.5 px-3 font-semibold text-gray-900">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px]"
                                style={{ background: officer.avatarColor }}
                              >
                                {officer.initials}
                              </span>
                              <Link to={`/officer/${officer.id}`} className="hover:text-[#1a237e] hover:underline">
                                {t(officer.nameHi, officer.name)}
                              </Link>
                            </div>
                          </td>

                          <td className="py-2.5 px-3 text-gray-600">
                            <div>{officer.ministry}</div>
                            <div className="text-[10px] text-gray-400">📍 {officer.state}</div>
                          </td>

                          <td className="py-2.5 px-3 text-center font-bold text-gray-900">
                            <span className={metrics.escalation_rate > 2.0 ? "text-red-700 font-extrabold" : "text-gray-800"}>
                              {metrics.escalation_rate}%
                            </span>
                            <span className="text-[10px] text-gray-400 block">
                              ({metrics.escalations_total} {t("कुल", "total")})
                            </span>
                          </td>

                          <td className="py-2.5 px-3 text-center font-bold">
                            {metrics.current_escalations > 0 ? (
                              <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[11px]">
                                {metrics.current_escalations} {t("सक्रिय", "Active")}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">0</span>
                            )}
                          </td>

                          <td className="py-2.5 px-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                metrics.risk_level === "high"
                                  ? "bg-red-100 text-red-800 border border-red-300"
                                  : metrics.risk_level === "medium"
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : "bg-green-100 text-green-800 border border-green-300"
                              }`}
                            >
                              {metrics.risk_level === "high"
                                ? `🔴 ${t("उच्च जोखिम", "High Risk")}`
                                : metrics.risk_level === "medium"
                                ? `🟡 ${t("मध्यम", "Moderate")}`
                                : `🟢 ${t("निम्न", "Low")}`}
                            </span>
                          </td>

                          <td className="py-2.5 px-3 text-center text-xs">
                            {metrics.red_flag ? (
                              <span className="text-red-700 font-bold flex items-center justify-center gap-1">
                                <span>🚩</span> {t("समीक्षाधीन", "Under Audit")}
                              </span>
                            ) : (
                              <span className="text-green-700 font-medium">✓ {t("सामान्य", "Standard")}</span>
                            )}
                          </td>

                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => navigate(`/officer/${officer.id}`)}
                              className="btn-gov-secondary text-xs px-2.5 py-1"
                            >
                              {t("ऑडिट देखें", "Audit")} →
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <span className="text-base flex-shrink-0">⚠️</span>
                <div>
                  <span className="font-bold">{t("नागरिक अधिकार सूचना:", "Citizen Advisory:")}</span>{" "}
                  {t(
                    "नागरिक शिकायत दर्ज करते समय अधिकारी की एस्केलेशन दर देखकर बेहतर प्रदर्शन करने वाले नोडल अधिकारी का अनुरोध कर सकते हैं। इससे अधिकारियों पर निष्पक्ष और समयबद्ध काम करने का दबाव बनता है।",
                    "Citizens can view officer escalation rates when lodging complaints and request high-performing nodal officers. This public transparency drives genuine redress across departments."
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── ESCALATION DETAILS MODAL ── */}
      {selectedEscalation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-2xl w-full border border-gray-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 bg-[#1a237e] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🚨</span>
                <h3 className="font-bold text-sm">
                  {t("स्वतः एस्केलेशन केस ऑडिट लॉग", "Auto-Escalation Case Audit Log")} — {selectedEscalation.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEscalation(null)}
                className="text-white/80 hover:text-white text-lg font-bold px-2 py-0.5 rounded hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div>
                  <div className="text-gray-400 font-mono text-[11px]">{selectedEscalation.caseId}</div>
                  <div className="font-bold text-sm text-gray-900">{selectedEscalation.department} ({selectedEscalation.ministry})</div>
                  <div className="text-gray-500">📍 {selectedEscalation.state} • {t("एस्केलेशन तिथि:", "Escalated on:")} {selectedEscalation.escalatedDate}</div>
                </div>
                <span
                  className={`font-bold px-2.5 py-1 rounded text-xs ${
                    selectedEscalation.status === "active"
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-green-100 text-green-800 border border-green-300"
                  }`}
                >
                  {selectedEscalation.status === "active"
                    ? `⏳ ${t("सक्रिय समीक्षा (खुले दिन: ", "Active (Days open: ")}${selectedEscalation.daysOpen})`
                    : `✓ ${t("संतुष्टि से बंद", "Closed Satisfactorily")}`}
                </span>
              </div>

              <div className="bg-gray-50 rounded p-3 border border-gray-200">
                <div className="text-[11px] text-gray-500 font-bold mb-1">
                  {t("नागरिक असंतोष रेटिंग एवं फीडबैक:", "Citizen Rating & Feedback Trigger:")}
                </div>
                <div className="text-amber-600 font-bold mb-1">
                  {"★".repeat(selectedEscalation.citizenRating)} ({selectedEscalation.citizenRating}/5.0 — {t("असंतोषजनक", "Poor")})
                </div>
                <p className="italic text-gray-800 leading-relaxed">
                  "{t(selectedEscalation.feedbackHi, selectedEscalation.feedback)}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded border border-gray-200 bg-white">
                  <div className="text-[11px] text-gray-500 font-semibold">{t("मूल फ्रंटलाइन अधिकारी:", "Assigned Frontline GRO:")}</div>
                  <div className="font-bold text-gray-900 mt-0.5">{selectedEscalation.officerName}</div>
                  <div className="text-[11px] text-gray-500">{selectedEscalation.officerDesignation}</div>
                </div>

                <div className="p-3 rounded border border-indigo-200 bg-indigo-50/50">
                  <div className="text-[11px] text-indigo-700 font-semibold">{t("पर्यवेक्षी नोडल प्राधिकारी:", "Supervisory Nodal Authority:")}</div>
                  <div className="font-bold text-indigo-950 mt-0.5">🏛️ {selectedEscalation.escalatedTo}</div>
                  <div className="text-[11px] text-indigo-800 font-mono mt-0.5">{selectedEscalation.triggerRule}</div>
                </div>
              </div>

              <div className="p-3 rounded border border-gray-200 bg-white">
                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                  🎯 {t("पर्यवेक्षी कार्रवाई एवं निस्तारण स्थिति:", "Supervisory Finding & Remedial Action:")}
                </div>
                <p className="text-gray-900 leading-relaxed">
                  {t(selectedEscalation.resolutionHi, selectedEscalation.resolution)}
                </p>
                <div className="mt-2 pt-2 border-t border-gray-100 text-[11px] text-gray-600">
                  <span className="font-bold text-gray-800">{t("सुधार प्रभाव: ", "Systemic Impact: ")}</span>
                  {t(selectedEscalation.impactHi, selectedEscalation.impact)}
                </div>
              </div>

              <div className="p-3 rounded bg-blue-50 border border-blue-200 text-[11px] text-blue-900 leading-relaxed">
                <span className="font-bold">⚖️ {t("CPGRAMS 30-दिवसीय वैधानिक गारंटी:", "CPGRAMS Statutory 30-Day Disposal Guarantee:")}</span>{" "}
                {t(
                  "नोडल अपीलीय प्राधिकरण को पहली अपील प्राप्त होने के 30 दिनों के भीतर शिकायतकर्ता की सुनवाई कर अंतिम निर्णय देना अनिवार्य है।",
                  "The Nodal Appellate Authority is statutorily mandated to dispose of appeals within 30 days of filing."
                )}
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <Link
                to={`/case/${selectedEscalation.caseId}`}
                onClick={() => setSelectedEscalation(null)}
                className="btn-gov-secondary text-xs px-3 py-1.5"
              >
                {t("केस टाइमलाइन देखें", "View Case Timeline")}
              </Link>

              <button
                onClick={() => setSelectedEscalation(null)}
                className="btn-gov-primary text-xs px-4 py-1.5"
              >
                {t("बंद करें", "Close Log")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION 3: ALL 36 STATES & UTS RANKINGS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 mb-12">
        <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>📊</span>
                  <span>{t("राज्य एवं केंद्र शासित प्रदेश प्रदर्शन रैंकिंग", "State & UT Performance League Table")}</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t(
                    "जन शिकायतों के समाधान में सभी राज्यों की पारदर्शिता रैंकिंग (1 से 36)। किसी भी राज्य पर क्लिक करके विस्तृत रिपोर्ट देखें।",
                    "Public grievance redress ranking across all states (1 to 36). Click any state for full audit."
                  )}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <div className="inline-flex rounded border border-gray-300 p-0.5 bg-white text-xs">
                  <button
                    onClick={() => setFilterType("all")}
                    className={`px-3 py-1 rounded font-semibold transition-colors ${
                      filterType === "all" ? "bg-[#1a237e] text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {t("सभी (36)", "All (36)")}
                  </button>
                  <button
                    onClick={() => setFilterType("states")}
                    className={`px-3 py-1 rounded font-semibold transition-colors ${
                      filterType === "states" ? "bg-[#1a237e] text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {t("राज्य (28)", "States (28)")}
                  </button>
                  <button
                    onClick={() => setFilterType("uts")}
                    className={`px-3 py-1 rounded font-semibold transition-colors ${
                      filterType === "uts" ? "bg-[#1a237e] text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {t("केंद्र शासित (8)", "UTs (8)")}
                  </button>
                </div>
              </div>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("राज्य का नाम खोजें (उदा. Maharashtra, Delhi, UP)...", "Search State / UT name...")}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded bg-white focus:border-[#1a237e] outline-none"
                />
                <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-gray-500 flex-shrink-0">{t("क्रमबद्ध:", "Sort By:")}</span>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as any)}
                  className="text-xs border border-gray-300 rounded px-2.5 py-2 bg-white text-gray-700 outline-none"
                >
                  <option value="rank">{t("रैंकिंग (1-36)", "Rank (1 to 36)")}</option>
                  <option value="resolutionRate">{t("समाधान दर (उच्च से निम्न)", "Resolution Rate (High to Low)")}</option>
                  <option value="avgResolutionDays">{t("समाधान गति (सबसे तेज)", "Fastest Resolution Speed")}</option>
                  <option value="satisfaction">{t("नागरिक संतुष्टि (सर्वोच्च)", "Citizen Rating (Highest)")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                  <th className="py-3 px-4 w-16 text-center">{t("रैंक", "Rank")}</th>
                  <th className="py-3 px-4">{t("राज्य / केंद्र शासित प्रदेश", "State / Union Territory")}</th>
                  <th className="py-3 px-4 text-center">{t("समाधान दर", "Resolution Rate")}</th>
                  <th className="py-3 px-4 text-center">{t("वास्तविक समाधान", "Real Solution")}</th>
                  <th className="py-3 px-4 text-center">{t("औसत समय", "Avg Time")}</th>
                  <th className="py-3 px-4 text-center">{t("नागरिक रेटिंग", "Rating")}</th>
                  <th className="py-3 px-4 text-center">{t("अपील दर", "Appeal Rate")}</th>
                  <th className="py-3 px-4 text-right">{t("कार्रवाई", "Action")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStates.map((s) => {
                  const medal =
                    s.rank === 1 ? "🥇" : s.rank === 2 ? "🥈" : s.rank === 3 ? "🥉" : null;

                  return (
                    <tr
                      key={s.state}
                      onClick={() => navigate(`/accountability/state/${encodeURIComponent(s.state.toLowerCase())}`)}
                      className="hover:bg-blue-50/60 transition-colors cursor-pointer"
                    >
                      {/* Rank */}
                      <td className="py-3 px-4 text-center font-bold text-gray-900">
                        {medal ? (
                          <span className="text-base" title={`Rank ${s.rank}`}>
                            {medal}
                          </span>
                        ) : (
                          <span className="text-gray-600">#{s.rank}</span>
                        )}
                      </td>

                      {/* State Name */}
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        <div className="flex items-center gap-2">
                          <span>{t(s.stateHi, s.state)}</span>
                          <span className="text-[10px] text-gray-400 font-mono">({s.abbreviation})</span>
                          {s.trend === "up" && <span className="text-green-600 dark:text-green-400 text-[10px]" title="Improving">▲</span>}
                          {s.trend === "down" && <span className="text-red-500 dark:text-red-400 text-[10px]" title="Declining">▼</span>}
                        </div>
                        <div className="text-[10px] text-gray-400 font-normal">
                          {s.totalCases.toLocaleString()} {t("केस दर्ज", "cases filed")}
                        </div>
                      </td>

                      {/* Resolution Rate */}
                      <td className="py-3 px-4 text-center">
                        <div className="font-bold text-gray-900">{(s.resolutionRate * 100).toFixed(0)}%</div>
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${
                              s.resolutionRate >= 0.85
                                ? "bg-green-600"
                                : s.resolutionRate >= 0.7
                                ? "bg-blue-600"
                                : "bg-amber-500"
                            }`}
                            style={{ width: `${s.resolutionRate * 100}%` }}
                          />
                        </div>
                      </td>

                      {/* Real Solution Rate */}
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-semibold ${
                            s.realSolutionRate >= 0.85
                              ? "text-green-700 dark:text-green-400"
                              : s.realSolutionRate >= 0.7
                              ? "text-blue-700 dark:text-blue-300"
                              : "text-amber-700 dark:text-amber-400"
                          }`}
                        >
                          {(s.realSolutionRate * 100).toFixed(0)}%
                        </span>
                      </td>

                      {/* Avg Resolution Days */}
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`font-medium ${
                            s.avgResolutionDays <= 15
                              ? "text-green-700 dark:text-green-400 font-bold"
                              : s.avgResolutionDays <= 30
                              ? "text-gray-700 dark:text-gray-300"
                              : "text-red-600 dark:text-red-400 font-semibold"
                          }`}
                        >
                          {s.avgResolutionDays} {t("दिन", "days")}
                        </span>
                      </td>

                      {/* Citizen Rating */}
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/50">
                          ★ {s.satisfaction.toFixed(1)}
                        </span>
                      </td>

                      {/* Appeal Rate */}
                      <td className="py-3 px-4 text-center text-gray-600">
                        {(s.appealRate * 100).toFixed(1)}%
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/accountability/state/${encodeURIComponent(s.state.toLowerCase())}`);
                          }}
                          className="btn-gov-secondary text-xs px-2.5 py-1"
                        >
                          {t("रिपोर्ट देखें", "View Audit")} →
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredStates.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500 text-sm">
                      {t("कोई राज्य नहीं मिला। कृपया अलग नाम खोजें।", "No states found matching your search criteria.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer of Table */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
            <div>
              {t("सत्यापन मानक: CPGRAMS 2026 ऑडिट गाइडलाइन्स के तहत मापा गया।", "Audited under CPGRAMS 2026 Comprehensive Grievance Handling Guidelines.")}
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block" /> {t("सर्वोत्कृष्ट (>85%)", "Benchmark (>85%)")}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> {t("सुधार आवश्यक (<70%)", "Needs Attention (<70%)")}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* ── SECTION 4: SOCIAL MEDIA IMPACT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 mb-12">
        <div className="bg-white dark:bg-[#141e2e] border border-gray-200 dark:border-gray-700 rounded shadow-sm overflow-hidden">

          {/* Header */}
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>📱</span>
                  <span>{t("सोशल मीडिया जवाबदेही प्रभाव", "Social Media Accountability Impact")}</span>
                  <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 ml-1">
                    {socialMediaImpact.hashtag}
                  </span>
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {t(
                    "नागरिकों के शेयर से जवाबदेही वायरल होती है। हर शेयर अधिकारी पर सामाजिक दबाव बनाता है।",
                    "Citizen shares make accountability viral. Each share amplifies pressure on officers beyond the internal dashboard."
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1.5 rounded-lg font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                  🔥 Trending #{socialMediaImpact.trending.rank} — {socialMediaImpact.trending.category}
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-6">

            {/* Top KPI row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: t("कुल शेयर", "Total Shares"),         value: socialMediaImpact.total_shares.toLocaleString(),      icon: "🔁", color: "text-indigo-700 dark:text-indigo-300" },
                { label: t("कुल पहुंच", "Total Reach"),          value: `${(socialMediaImpact.total_reach / 1000).toFixed(0)}K`, icon: "👥", color: "text-blue-700 dark:text-blue-300" },
                { label: t("कुल इम्प्रेशन", "Total Impressions"),  value: `${(socialMediaImpact.total_impressions / 1000000).toFixed(1)}M`, icon: "📣", color: "text-emerald-700 dark:text-emerald-400" },
                { label: t("एंगेजमेंट दर", "Engagement Rate"),    value: `${socialMediaImpact.engagement_rate}%`,              icon: "⚡", color: "text-amber-700 dark:text-amber-400" },
              ].map((kpi) => (
                <div key={kpi.label} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-[#192334]">
                  <div className="text-lg">{kpi.icon}</div>
                  <div className={`text-xl font-black mt-1 ${kpi.color}`}>{kpi.value}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Two-column: Platform breakdown + Share rate by rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Platform Breakdown */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {t("प्लेटफ़ॉर्म-वार शेयर:", "Shares by Platform:")}
                </h3>
                <div className="space-y-2.5">
                  {([
                    { key: "twitter",  icon: "𝕏",  label: "X (Twitter)",  bg: "bg-gray-900",        text: "text-white" },
                    { key: "whatsapp", icon: "💬", label: "WhatsApp",      bg: "bg-[#25D366]",      text: "text-white" },
                    { key: "linkedin", icon: "in", label: "LinkedIn",      bg: "bg-[#0A66C2]",      text: "text-white" },
                    { key: "facebook", icon: "f",  label: "Facebook",      bg: "bg-[#1877F2]",      text: "text-white" },
                  ] as const).map((p) => {
                    const d = socialMediaImpact.platform_breakdown[p.key];
                    const maxShares = 512;
                    const pct = Math.round((d.shares / maxShares) * 100);
                    return (
                      <div key={p.key} className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${p.bg} ${p.text}`}>
                          {p.icon}
                        </span>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">{p.label}</span>
                            <span className="text-gray-500 dark:text-gray-400">{d.shares.toLocaleString()} shares · {(d.reach / 1000).toFixed(0)}K reach</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-indigo-500" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Share Rate by Rating */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {t("रेटिंग-अनुसार शेयर दर (वायरल मैकेनिक्स):", "Share Rate by Star Rating (Viral Mechanics):")}
                </h3>
                <div className="space-y-2">
                  {Object.values(socialMediaImpact.share_rate_by_rating).reverse().map((r) => (
                    <div key={r.label} className="flex items-center gap-3 text-xs">
                      <span className="w-20 flex-shrink-0 text-right">{r.label}</span>
                      <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden relative">
                        <div
                          className={`h-full rounded transition-all ${
                            r.tone === "escalation" ? "bg-red-500" : r.tone === "neutral" ? "bg-gray-400" : "bg-emerald-500"
                          }`}
                          style={{ width: `${r.rate}%` }}
                        />
                        <span className="absolute right-2 top-0 bottom-0 flex items-center text-[10px] font-bold text-gray-700 dark:text-gray-300">{r.rate}%</span>
                      </div>
                      <span className="w-16 text-gray-500 dark:text-gray-400 flex-shrink-0">{r.count.toLocaleString()} posts</span>
                    </div>
                  ))}
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                    {t("ध्यान दें: नकारात्मक अनुभव अधिक शेयर होते हैं — यही जवाबदेही का वायरल तंत्र है।", "Note: Negative experiences share 2× more — that's the accountability pressure mechanism.")}
                  </p>
                </div>
              </div>

            </div>

            {/* Top Shared Cases */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {t("सर्वाधिक शेयर किए गए केस:", "Top Shared Cases:")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topSharedCases.map((c) => (
                  <Link
                    key={c.caseId}
                    to={`/case/${c.caseId}`}
                    className={`border rounded-lg p-3.5 hover:shadow-md transition-all block ${
                      c.tone === "praise"
                        ? "border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/60 dark:bg-emerald-950/20 hover:border-emerald-400"
                        : "border-red-200 dark:border-red-800/50 bg-red-50/60 dark:bg-red-950/20 hover:border-red-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-400">{c.caseId}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        c.tone === "praise"
                          ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400"
                          : "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-400"
                      }`}>
                        {"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 italic mb-2">
                      {t(c.snippetHi, c.snippetEn)}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400">
                      <span>🏛️ {c.officer} · {c.department}</span>
                      <span className="font-semibold">
                        🔁 {c.total_shares.toLocaleString()} shares · 👥 {(c.reach / 1000).toFixed(0)}K reach
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Behavioral Impact + Media Coverage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/50 dark:bg-indigo-950/20">
                <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-400 uppercase tracking-wider mb-3">
                  🎯 {t("व्यावहारिक सुधार प्रभाव:", "Behavioral Change Driven by Sharing:")}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{t("अधिकारियों ने सुधार किया", "Officers who improved")}</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{socialMediaImpact.behavioral_impact.officers_improved}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{t("एस्केलेट किए गए अधिकारी", "Officers escalated via social pressure")}</span>
                    <span className="font-bold text-red-600 dark:text-red-400">{socialMediaImpact.behavioral_impact.officers_escalated}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{t("प्रणालीगत समस्याएं उजागर", "Systemic issues exposed")}</span>
                    <span className="font-bold text-amber-700 dark:text-amber-400">{socialMediaImpact.behavioral_impact.systemic_issues_exposed}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#192334]">
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  📰 {t("मीडिया कवरेज:", "Media Coverage Generated:")}
                </h4>
                <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                  {socialMediaImpact.media_coverage.articles} {t("लेख", "Articles")}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {(socialMediaImpact.media_coverage.total_media_reach / 1000000).toFixed(1)}M {t("मीडिया पहुंच", "media reach")}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {socialMediaImpact.media_coverage.major_outlets.map((outlet) => (
                    <span key={outlet} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                      {outlet}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA to give feedback */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border border-indigo-200 dark:border-indigo-800/50">
              <div>
                <div className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">
                  {t("अपना अनुभव साझा करें", "Share your experience — add to the accountability record")}
                </div>
                <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-0.5">
                  {t("रेटिंग दें → सोशल मीडिया पर शेयर करें → वायरल जवाबदेही बनाएं", "Rate → Share on social media → Create viral accountability")}
                </p>
              </div>
              <Link
                to="/feedback"
                className="btn-gov-primary text-sm px-5 py-2 whitespace-nowrap flex-shrink-0"
              >
                ⭐ {t("फीडबैक एवं शेयर", "Rate & Share")}
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div />
    </div>
  );
}
