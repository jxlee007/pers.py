import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { stateRankings, officerProfiles } from "../data/mockData";

export default function StateDetail() {
  const { stateName } = useParams<{ stateName: string }>();
  const { t } = useApp();
  const navigate = useNavigate();

  // Find state by slug or name
  const state = stateRankings.find(
    (s) =>
      s.state.toLowerCase() === decodeURIComponent(stateName || "").toLowerCase() ||
      s.abbreviation.toLowerCase() === (stateName || "").toLowerCase()
  );

  if (!state) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-6 text-center" style={{ background: "var(--background)" }}>
        <div className="text-4xl mb-3">📍</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t("राज्य नहीं मिला", "State Record Not Found")}</h2>
        <p className="text-sm text-gray-500 mb-4">{t("कृपया सही राज्य का चयन करें।", "Please select a valid state from the accountability dashboard.")}</p>
        <Link to="/accountability" className="btn-gov-primary text-xs px-4 py-2">
          ← {t("जवाबदेही डैशबोर्ड पर वापस जाएं", "Back to Accountability Dashboard")}
        </Link>
      </div>
    );
  }

  // Find officers stationed in this state or fallback to top officers if none
  const stateOfficers = officerProfiles.filter(
    (o) => o.state.toLowerCase() === state.state.toLowerCase()
  );
  const displayOfficers = stateOfficers.length > 0 ? stateOfficers : officerProfiles.slice(0, 3);

  // Derived state stats
  const pendingCases = state.totalCases - state.casesResolved;
  const appealsCount = Math.round(state.casesResolved * state.appealRate);
  const medal = state.rank === 1 ? "🥇" : state.rank === 2 ? "🥈" : state.rank === 3 ? "🥉" : null;

  // Time Analysis percentages based on rank
  const timeBuckets = state.rank <= 5
    ? [
        { label: "< 7 days", pct: 45, status: "good", color: "bg-green-600", labelHi: "< 7 दिन (तेज)" },
        { label: "7-14 days", pct: 35, status: "acceptable", color: "bg-blue-600", labelHi: "7-14 दिन (स्वीकार्य)" },
        { label: "14-21 days", pct: 18, status: "slow", color: "bg-amber-500", labelHi: "14-21 दिन (धीमा)" },
        { label: "> 21 days", pct: 2, status: "critical", color: "bg-red-500", labelHi: "> 21 दिन (अतिविलंब)" },
      ]
    : state.rank <= 18
    ? [
        { label: "< 7 days", pct: 22, status: "good", color: "bg-green-600", labelHi: "< 7 दिन" },
        { label: "7-14 days", pct: 38, status: "acceptable", color: "bg-blue-600", labelHi: "7-14 दिन" },
        { label: "14-21 days", pct: 28, status: "slow", color: "bg-amber-500", labelHi: "14-21 दिन" },
        { label: "> 21 days", pct: 12, status: "critical", color: "bg-red-500", labelHi: "> 21 दिन" },
      ]
    : [
        { label: "< 7 days", pct: 10, status: "good", color: "bg-green-600", labelHi: "< 7 दिन" },
        { label: "7-14 days", pct: 25, status: "acceptable", color: "bg-blue-600", labelHi: "7-14 दिन" },
        { label: "14-21 days", pct: 35, status: "slow", color: "bg-amber-500", labelHi: "14-21 दिन" },
        { label: "> 21 days", pct: 30, status: "critical", color: "bg-red-500", labelHi: "> 21 दिन (गंभीर)" },
      ];

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }} id="main-content">
      {/* ── HEADER ── */}
      <div style={{ background: "var(--gov-navy)", color: "white" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-2 text-xs opacity-75 mb-2">
            <Link to="/" className="hover:underline">{t("होम", "Home")}</Link>
            <span>›</span>
            <Link to="/accountability" className="hover:underline">{t("पारदर्शिता", "Transparency")}</Link>
            <span>›</span>
            <span className="opacity-100 font-semibold">{t(state.stateHi, state.state)}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center justify-center font-bold text-center">
                <span className="text-xl">{medal || `#${state.rank}`}</span>
                <span className="text-[10px] text-blue-200 tracking-wider font-mono">{state.abbreviation}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold">{t(state.stateHi, state.state)}</h1>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/20 text-blue-100">
                    {t("अखिल भारतीय रैंक", "All-India Rank")} #{state.rank}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-blue-200 mt-0.5">
                  {t(
                    "जन शिकायत निवारण एवं पारदर्शिता प्रदर्शन रिपोर्ट 2026",
                    "Public Grievance Redressal & Transparency Audit Report 2026"
                  )}
                </p>
              </div>
            </div>

            <Link
              to="/accountability"
              className="btn-gov-secondary text-xs px-3 py-2 text-white border-white/40 hover:bg-white/10 self-start sm:self-auto"
              style={{ background: "transparent", color: "white" }}
            >
              ← {t("सभी राज्य देखें", "All States")}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ── METRICS OVERVIEW CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded p-4 shadow-sm">
            <div className="text-xs text-gray-500 font-medium uppercase">{t("कुल प्राप्त केस", "Total Grievances")}</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{state.totalCases.toLocaleString()}</div>
            <div className="text-[11px] text-gray-400 mt-1">100% {t("पंजीकृत", "registered on portal")}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4 shadow-sm border-l-4 border-l-green-600">
            <div className="text-xs text-gray-500 font-medium uppercase">{t("हल किए गए", "Cases Resolved")}</div>
            <div className="text-2xl font-bold text-green-700 mt-1">{state.casesResolved.toLocaleString()}</div>
            <div className="text-[11px] text-green-600 font-semibold mt-1">{(state.resolutionRate * 100).toFixed(0)}% {t("समाधान दर", "resolution rate")}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4 shadow-sm border-l-4 border-l-amber-500">
            <div className="text-xs text-gray-500 font-medium uppercase">{t("लंबित मामले", "Pending Cases")}</div>
            <div className="text-2xl font-bold text-amber-700 mt-1">{pendingCases.toLocaleString()}</div>
            <div className="text-[11px] text-gray-500 mt-1">{state.avgResolutionDays} {t("दिन औसत समय", "days avg response")}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4 shadow-sm border-l-4 border-l-purple-600">
            <div className="text-xs text-gray-500 font-medium uppercase">{t("नागरिक अपीलें", "Citizen Appeals")}</div>
            <div className="text-2xl font-bold text-purple-800 mt-1">{appealsCount.toLocaleString()}</div>
            <div className="text-[11px] text-purple-600 font-semibold mt-1">{(state.appealRate * 100).toFixed(1)}% {t("अपील दर", "appeal rate")}</div>
          </div>
        </div>

        {/* ── TWO-COLUMN ANALYSIS: TIME & QUALITY ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Time Analysis */}
          <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>⏱️</span> {t("समाधान समय विश्लेषण", "Resolution Time Analysis")}
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              {t("शिकायत दर्ज होने से समाधान तक का समय वितरण।", "Distribution of time taken to resolve citizen complaints.")}
            </p>

            <div className="space-y-3">
              {timeBuckets.map((bucket) => (
                <div key={bucket.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-700">{t(bucket.labelHi, bucket.label)}</span>
                    <span className="font-bold text-gray-900">{bucket.pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${bucket.color}`}
                      style={{ width: `${bucket.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded bg-blue-50 border border-blue-200 text-xs text-blue-800">
              <span className="font-bold">{t("सरकारी मानक:", "Govt Mandate:")}</span>{" "}
              {t("सामान्य शिकायतों के लिए 21 कार्यदिवस अनिवार्य समय सीमा है।", "21 working days is the prescribed statutory timeline for standard grievances.")}
            </div>
          </div>

          {/* Resolution Quality Breakdown */}
          <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>🔍</span> {t("समाधान गुणवत्ता — वास्तविक बनाम कागजी", "Resolution Quality — Real vs Paper")}
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              {t("नागरिक संतुष्टि ऑडिट एवं पुष्टि के आधार पर समाधान की प्रकृति।", "Classification based on citizen verification & independent audit.")}
            </p>

            <div className="space-y-4">
              {/* Real Solution */}
              <div className="p-3.5 rounded bg-green-50 border border-green-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-green-900 flex items-center gap-1.5">
                    <span>✅</span> {t("वास्तविक समाधान (समस्या ठीक हुई)", "Real Solution (Problem Actually Solved)")}
                  </span>
                  <span className="text-sm font-extrabold text-green-800">
                    {(state.realSolutionRate * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-[11px] text-green-700 leading-relaxed">
                  {t(
                    "नागरिक ने पुष्टि की कि पेंशन, रिफंड या सेवा वास्तव में प्राप्त हुई।",
                    "Citizen confirmed pension credited, license delivered, or road repaired."
                  )}
                </p>
              </div>

              {/* Paper Compliance */}
              <div className="p-3.5 rounded bg-amber-50 border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                    <span>⚠️</span> {t("केवल कागजी खानापूर्ति (अधूरा/खारिज)", "Paper Compliance Only (Closed Without Fix)")}
                  </span>
                  <span className="text-sm font-extrabold text-amber-800">
                    {((1 - state.realSolutionRate) * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  {t(
                    "केवल 'प्रक्रिया जारी है' लिखकर केस बंद कर दिया गया। नागरिक असंतुष्ट रहा।",
                    "Closed with routine template replies or bounced without actual relief provided."
                  )}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-gray-100">
              <span className="text-gray-500">{t("नागरिक संतुष्टि स्कोर:", "Citizen Satisfaction Score:")}</span>
              <span className="font-bold text-amber-600 text-sm">★ {state.satisfaction.toFixed(1)} / 5.0</span>
            </div>
          </div>
        </div>

        {/* ── NODAL OFFICERS IN THIS STATE ── */}
        <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <span>👤</span>
                <span>{t(`${state.state} के नोडल लोक शिकायत अधिकारी`, `Nodal Public Grievance Officers in ${state.state}`)}</span>
              </h2>
              <p className="text-xs text-gray-500">
                {t(
                  "इस राज्य में पदस्थ प्रमुख अधिकारी। प्रोफ़ाइल पर क्लिक करके उनका संपूर्ण ट्रैक रिकॉर्ड देखें।",
                  "Verified officers handling grievances in this state. Click for full metrics & citizen reviews."
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayOfficers.map((officer) => (
              <div
                key={officer.id}
                onClick={() => navigate(`/officer/${officer.id}`)}
                className="border border-gray-200 rounded p-4 hover:border-[#1a237e] hover:shadow-md transition-all cursor-pointer bg-gray-50/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: officer.avatarColor }}
                    >
                      {officer.initials}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 hover:text-[#1a237e]">
                        {t(officer.nameHi, officer.name)}
                      </h3>
                      <div className="text-[11px] text-gray-500">{officer.designation}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    ★ {officer.metrics.avgRating}
                  </span>
                </div>

                <div className="text-xs text-gray-600 bg-white border border-gray-100 rounded px-2.5 py-1.5 mb-3">
                  <div className="font-semibold text-gray-800">{officer.ministry}</div>
                  <div className="text-[11px] text-gray-500">{officer.department}</div>
                </div>

                <div className="grid grid-cols-3 gap-1 text-center border-t border-gray-200 pt-2 text-xs">
                  <div>
                    <div className="text-[10px] text-gray-400">{t("हल दर", "Resolved")}</div>
                    <div className="font-bold text-green-700">{(officer.metrics.resolutionRate * 100).toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400">{t("वास्तविक", "Real Fix")}</div>
                    <div className="font-bold text-blue-700">{(officer.metrics.realSolutionRate * 100).toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400">{t("औसत समय", "Speed")}</div>
                    <div className="font-bold text-gray-900">{officer.metrics.avgResolutionDays}d</div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-200 text-right text-xs font-semibold text-[#1a237e]">
                  {t("पूर्ण प्रोफ़ाइल देखें", "View Officer Profile")} →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ACTION FOOTER ── */}
        <div className="bg-gradient-to-r from-[#1a237e] to-[#0d47a1] rounded text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base">{t("क्या आपकी कोई लंबित शिकायत है?", "Have an unresolved grievance in this state?")}</h3>
            <p className="text-xs text-blue-100 mt-1">
              {t(
                "CPGRAMS AI पर अपनी शिकायत दर्ज करें — सही नोडल अधिकारी को सीधी रूटिंग।",
                "Lodge on CPGRAMS AI — get automatically routed to verified high-performing nodal officers."
              )}
            </p>
          </div>
          <Link
            to="/file-complaint"
            className="btn-gov-accent flex-shrink-0 text-sm"
            style={{ padding: "10px 24px" }}
          >
            ✍️ {t("शिकायत दर्ज करें", "Lodge Grievance")}
          </Link>
        </div>
      </div>
    </div>
  );
}
