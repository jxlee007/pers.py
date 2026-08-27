import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { systemHealth, stateRankings, officerProfiles } from "../data/mockData";

export default function Accountability() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"rank" | "resolutionRate" | "avgResolutionDays" | "satisfaction">("rank");
  const [filterType, setFilterType] = useState<"all" | "states" | "uts">("all");

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

      {/* ── SECTION 1: SYSTEM HEALTH OVERVIEW ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Resolved vs Paper Compliance */}
          <div className="bg-white rounded border border-gray-200 shadow-sm p-5 border-t-4 border-t-[#2e7d32]">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">{t("समाधान दर", "Resolution Quality")}</span>
              <span className="text-lg">🎯</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
              {(systemHealth.totalResolved / 100000).toFixed(1)} {t("लाख", "Lakh")}
            </div>
            <div className="text-xs text-gray-500 mb-3">
              {t("कुल निवारित मामले (78% कुल दर)", "Total resolved cases (78% rate)")}
            </div>
            {/* Split Bar */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-green-700">✅ {t("वास्तविक समाधान", "Real Solution")}: 78%</span>
                <span className="text-amber-700">⚠️ {t("कागजी खानापूर्ति", "Paper Only")}: 22%</span>
              </div>
              <div className="h-2 w-full bg-amber-100 rounded-full overflow-hidden flex">
                <div className="bg-green-600 h-full" style={{ width: "78%" }} />
                <div className="bg-amber-400 h-full" style={{ width: "22%" }} />
              </div>
              <div className="text-[10px] text-gray-400">
                {t("नागरिक सत्यापन एवं ऑडिट द्वारा प्रमाणित", "Verified via citizen verification & audit")}
              </div>
            </div>
          </div>

          {/* Card 2: Central vs State Resolution Time */}
          <div className="bg-white rounded border border-gray-200 shadow-sm p-5 border-t-4 border-t-[#1a237e]">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">{t("औसत समाधान समय", "Avg Resolution Time")}</span>
              <span className="text-lg">⏱️</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
              18 {t("दिन", "Days")}
            </div>
            <div className="text-xs text-gray-500 mb-3">
              {t("राष्ट्रीय औसत (लक्ष्य: 21 दिन)", "National Average (Target: 21 days)")}
            </div>
            <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">🏛️ {t("केंद्र मंत्रालय", "Central Ministries")}:</span>
                <span className="font-bold text-green-700">13 {t("दिन", "Days")} ✅</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">🗺️ {t("राज्य विभाग", "State Departments")}:</span>
                <span className="font-bold text-red-600">64 {t("दिन", "Days")} ⚠️</span>
              </div>
              <div className="text-[10px] text-red-500 font-medium pt-0.5">
                ▲ {t("राज्यों में समाधान गति चिंता का विषय है", "State-level delays remain key bottleneck")}
              </div>
            </div>
          </div>

          {/* Card 3: Citizen Satisfaction Score */}
          <div className="bg-white rounded border border-gray-200 shadow-sm p-5 border-t-4 border-t-[#e65100]">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">{t("नागरिक संतुष्टि", "Citizen Satisfaction")}</span>
              <span className="text-lg">⭐</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">4.2</span>
              <span className="text-sm font-semibold text-gray-400">/ 5.0</span>
            </div>
            <div className="text-xs text-gray-500 mb-3">
              {t("3.8 लाख सत्यापित नागरिक फीडबैक", "Based on 3.8 Lakh verified citizen reviews")}
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-amber-500 text-base">★★★★☆</span>
              <span className="font-bold text-green-700">+0.4 {t("पिछले वर्ष से", "vs last year")}</span>
            </div>
          </div>

          {/* Card 4: First-time routing & Accountability */}
          <div className="bg-white rounded border border-gray-200 shadow-sm p-5 border-t-4 border-t-[#006064]">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-semibold uppercase tracking-wider">{t("AI सटीकता एवं जवाबदेही", "AI Precision & Officers")}</span>
              <span className="text-lg">🤖</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
              89%
            </div>
            <div className="text-xs text-gray-500 mb-3">
              {t("पहली बार सही विभाग को रूटिंग", "First-time correct routing rate")}
            </div>
            <div className="pt-2 border-t border-gray-100 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("सक्रिय नोडल अधिकारी", "Active Nodal Officers")}:</span>
                <span className="font-bold text-gray-900">91,420</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t("बाउंस रोकथाम दर", "Bounce Avoidance")}:</span>
                <span className="font-bold text-green-700">94.2%</span>
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
                          {s.trend === "up" && <span className="text-green-600 text-[10px]" title="Improving">▲</span>}
                          {s.trend === "down" && <span className="text-red-500 text-[10px]" title="Declining">▼</span>}
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
                              ? "text-green-700"
                              : s.realSolutionRate >= 0.7
                              ? "text-blue-700"
                              : "text-amber-700"
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
                              ? "text-green-700 font-bold"
                              : s.avgResolutionDays <= 30
                              ? "text-gray-700"
                              : "text-red-600 font-semibold"
                          }`}
                        >
                          {s.avgResolutionDays} {t("दिन", "days")}
                        </span>
                      </td>

                      {/* Citizen Rating */}
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
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
    </div>
  );
}
