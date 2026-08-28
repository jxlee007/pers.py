import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { officerProfiles } from "../data/mockData";

export default function OfficerProfile() {
  const { officerId } = useParams<{ officerId: string }>();
  const { t } = useApp();
  const navigate = useNavigate();
  const [requested, setRequested] = useState(false);

  const officer = officerProfiles.find((o) => o.id === officerId);

  if (!officer) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-6 text-center" style={{ background: "var(--background)" }}>
        <div className="text-4xl mb-3">👤</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t("अधिकारी प्रोफ़ाइल नहीं मिली", "Officer Record Not Found")}</h2>
        <p className="text-sm text-gray-500 mb-4">{t("कृपया सही अधिकारी का चयन करें।", "Please select a valid officer from the directory.")}</p>
        <Link to="/accountability" className="btn-gov-primary text-xs px-4 py-2">
          ← {t("जवाबदेही डैशबोर्ड पर वापस जाएं", "Back to Accountability Dashboard")}
        </Link>
      </div>
    );
  }

  const speedAdvantage = officer.metrics.mandatedDays - officer.metrics.avgResolutionDays;

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }} id="main-content">
      {/* ── HEADER BAR ── */}
      <div style={{ background: "var(--gov-navy)", color: "white" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-2 text-xs opacity-75 mb-3">
            <Link to="/" className="hover:underline">{t("होम", "Home")}</Link>
            <span>›</span>
            <Link to="/accountability" className="hover:underline">{t("पारदर्शिता", "Transparency")}</Link>
            <span>›</span>
            <Link to={`/accountability/state/${officer.state.toLowerCase()}`} className="hover:underline">
              {officer.state}
            </Link>
            <span>›</span>
            <span className="opacity-100 font-semibold">{t(officer.nameHi, officer.name)}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-extrabold text-2xl shadow-md border-2 border-white/30 flex-shrink-0"
                style={{ background: officer.avatarColor }}
              >
                {officer.initials}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold">{t(officer.nameHi, officer.name)}</h1>
                  <span className="bg-green-500/20 text-green-300 border border-green-400/30 text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                    ✓ {t("सत्यापित नोडल अधिकारी", "Verified PG Officer")}
                  </span>
                </div>
                <p className="text-blue-100 text-sm mt-0.5">{officer.designation}</p>
                <div className="flex items-center gap-2 text-xs text-blue-200 mt-1 flex-wrap">
                  <span>🏛️ {officer.ministry}</span>
                  <span>•</span>
                  <span>📂 {officer.department}</span>
                  <span>•</span>
                  <span>📍 {officer.state}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded p-3 text-center sm:text-right self-start sm:self-auto min-w-32">
              <div className="text-xs text-blue-200">{t("नागरिक संतुष्टि स्कोर", "Citizen Rating")}</div>
              <div className="text-2xl font-black text-amber-400 mt-0.5">
                ★ {officer.metrics.avgRating} <span className="text-xs text-white font-normal">/ 5.0</span>
              </div>
              <div className="text-[10px] text-blue-100 mt-0.5">
                {officer.metrics.feedbackCount} {t("नागरिक समीक्षाएं", "verified reviews")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ── KEY PERFORMANCE INDICATORS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded p-4 shadow-sm">
            <div className="text-xs text-gray-500 font-medium uppercase">{t("कुल केस संभाले", "Total Handled")}</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{officer.metrics.totalCases}</div>
            <div className="text-[11px] text-gray-400 mt-1">{t("अखिल भारतीय CPGRAMS", "Assigned via CPGRAMS")}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4 shadow-sm border-l-4 border-l-green-600">
            <div className="text-xs text-gray-500 font-medium uppercase">{t("हल किए गए केस", "Cases Resolved")}</div>
            <div className="text-2xl font-bold text-green-700 mt-1">{officer.metrics.casesResolved}</div>
            <div className="text-[11px] text-green-600 font-semibold mt-1">{(officer.metrics.resolutionRate * 100).toFixed(0)}% {t("सफलता दर", "resolution rate")}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4 shadow-sm border-l-4 border-l-blue-600">
            <div className="text-xs text-gray-500 font-medium uppercase">{t("सक्रिय / लंबित केस", "Currently Pending")}</div>
            <div className="text-2xl font-bold text-blue-700 mt-1">{officer.metrics.casesPending}</div>
            <div className="text-[11px] text-gray-400 mt-1">{t("सक्रिय समीक्षा के तहत", "Under active review")}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-4 shadow-sm border-l-4 border-l-purple-600">
            <div className="text-xs text-gray-500 font-medium uppercase">{t("नागरिक अपीलें", "Appeals Filed")}</div>
            <div className="text-2xl font-bold text-purple-700 mt-1">
              {Math.round(officer.metrics.totalCases * officer.metrics.appealRate)}
            </div>
            <div className="text-[11px] text-purple-600 font-semibold mt-1">
              {(officer.metrics.appealRate * 100).toFixed(1)}% {t("(अति-निम्न अपील दर)", "(Extremely low bounce)")}
            </div>
          </div>
        </div>

        {/* ── SPEED & QUALITY CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Speed Advantage */}
          <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>⚡</span> {t("समाधान समय बनाम सरकारी मानक", "Resolution Speed vs Mandate")}
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              {t("अधिकारी की औसत गति निर्धारित 21 दिनों से कहीं बेहतर है।", "Officer's average days to redress vs statutory timeline.")}
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-green-800">
                    {t(officer.nameHi, officer.name)}: {officer.metrics.avgResolutionDays} {t("दिन", "days")}
                  </span>
                  <span className="text-green-700 font-bold">
                    {speedAdvantage > 0 ? `+${speedAdvantage} ${t("दिन तेजी ✅", "days faster ✅")}` : "On time"}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: `${Math.min(100, (officer.metrics.avgResolutionDays / officer.metrics.mandatedDays) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{t("सरकारी निर्धारित समय सीमा (मानक):", "Prescribed Statutory Limit:")}</span>
                  <span className="text-gray-900 font-bold">{officer.metrics.mandatedDays} {t("दिन", "days")}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded bg-green-50 border border-green-200 text-xs text-green-800 flex items-center gap-2">
              <span className="text-base">🚀</span>
              <span>
                {t(
                  `यह अधिकारी राष्ट्रीय औसत से ${speedAdvantage} दिन पहले केस हल करते हैं।`,
                  `Redresses grievances ${speedAdvantage} days faster than statutory guidelines.`
                )}
              </span>
            </div>
          </div>

          {/* Real vs Paper Solution Rate */}
          <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>🎯</span> {t("समाधान गुणवत्ता प्रमाणीकरण", "Resolution Quality Verification")}
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              {t("कागजी खानापूर्ति नहीं — वास्तविक राहत प्रदान करने का प्रतिशत।", "Audited real-remedy rate vs superficial compliance.")}
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded bg-green-50 border border-green-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-green-900 flex items-center gap-1">
                    <span>✅</span> {t("वास्तविक समाधान (समस्या ठीक हुई)", "Real Remedy Delivered")}
                  </div>
                  <div className="text-[11px] text-green-700 mt-0.5">
                    {t("नागरिकों ने पुष्टि की कि उनका कार्य सम्पन्न हुआ।", "Citizens confirmed money/service received.")}
                  </div>
                </div>
                <span className="text-xl font-black text-green-800">
                  {(officer.metrics.realSolutionRate * 100).toFixed(0)}%
                </span>
              </div>

              <div className="p-3 rounded bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-gray-700">
                    {t("अस्पष्ट / पुनर्विचार आवश्यक", "Paper Only / Clarification Needed")}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    {t("नियमों के तहत राहत संभव न होने पर मार्गदर्शन दिया गया।", "Guided to appropriate alternative procedure.")}
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-600">
                  {(officer.metrics.paperComplianceRate * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
              <span>{t("प्रदर्शन रुझान:", "Performance Trend:")}</span>
              <span className="font-bold text-green-700 capitalize flex items-center gap-1">
                📈 {officer.metrics.performanceTrend}
              </span>
            </div>
          </div>
        </div>

        {/* ── ESCALATION STATUS & QUALITY AUDIT ── */}
        <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🚨</span>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  {t("एस्केलेशन स्थिति एवं गुणवत्ता ऑडिट", "Escalation Status & Quality Audit")}
                </h2>
                {officer.escalationMetrics.currentEscalations > 0 ? (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 animate-pulse">
                    ⚠️ {officer.escalationMetrics.currentEscalations} {t("सक्रिय एस्केलेशन", "Active Escalation")}
                  </span>
                ) : (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-green-100 text-green-800 border border-green-200 flex items-center gap-1">
                    ✓ {t("सक्रिय एस्केलेशन शून्य (स्पष्ट रिकॉर्ड)", "No Active Escalations (Clean Record)")}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t(
                  "कागजी खानापूर्ति पर रोक: जब नागरिक असंतुष्ट होता है, केस वरिष्ठ नोडल अधिकारियों को स्वतः एस्केलेट होता है।",
                  "Anti-paper-compliance audit: Cases auto-escalate to supervisory Nodal Officers when citizens report unfixed problems."
                )}
              </p>
            </div>

            {/* Risk Badge */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-gray-500">{t("पर्यवेक्षी जोखिम स्तर:", "Supervisory Risk:")}</span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider border ${
                  officer.escalationMetrics.riskLevel === "low"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : officer.escalationMetrics.riskLevel === "medium"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-red-50 text-red-800 border-red-300"
                }`}
              >
                {officer.escalationMetrics.riskLevel === "low"
                  ? `🟢 ${t("निम्न जोखिम", "Low Risk")}`
                  : officer.escalationMetrics.riskLevel === "medium"
                  ? `🟡 ${t("मध्यम निगरानी", "Moderate Watch")}`
                  : `🔴 ${t("उच्च समीक्षा (रेड फ्लैग)", "High Audit (Red Flag)")}`}
              </span>
            </div>
          </div>

          {/* Metric Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="bg-gray-50 rounded p-3 border border-gray-200">
              <div className="text-[11px] text-gray-500 uppercase">{t("एस्केलेशन दर", "Escalation Rate")}</div>
              <div className="text-xl font-bold text-gray-900 mt-0.5">
                {officer.escalationMetrics.escalationRate}%
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                {t("राष्ट्रीय औसत: 2.1% (कम = बेहतर)", "National avg: 2.1% (Lower is better)")}
              </div>
            </div>

            <div className="bg-gray-50 rounded p-3 border border-gray-200">
              <div className="text-[11px] text-gray-500 uppercase">{t("कुल एस्केलेशन", "Total Escalations")}</div>
              <div className="text-xl font-bold text-gray-900 mt-0.5">
                {officer.escalationMetrics.escalationsTotal}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                {t("पूरे कार्यकाल में दर्ज", "Total recorded over tenure")}
              </div>
            </div>

            <div className="bg-gray-50 rounded p-3 border border-gray-200">
              <div className="text-[11px] text-gray-500 uppercase">{t("सफलतापूर्वक हल", "Nodal Redressed")}</div>
              <div className="text-xl font-bold text-green-700 mt-0.5">
                {officer.escalationMetrics.escalationsResolved}
              </div>
              <div className="text-[10px] text-green-600 mt-0.5">
                {t("नोडल हस्तक्षेप से हल हुए", "Resolved upon supervisory intervention")}
              </div>
            </div>

            <div className="bg-gray-50 rounded p-3 border border-gray-200">
              <div className="text-[11px] text-gray-500 uppercase">{t("सक्रिय समीक्षाधीन", "Currently Active")}</div>
              <div
                className={`text-xl font-bold mt-0.5 ${
                  officer.escalationMetrics.currentEscalations > 0 ? "text-red-600" : "text-gray-700"
                }`}
              >
                {officer.escalationMetrics.currentEscalations}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                {officer.escalationMetrics.currentEscalations > 0
                  ? t("नोडल अपीलीय जांच जारी", "Appellate review in progress")
                  : t("कोई लंबित एस्केलेशन नहीं", "Zero pending escalations")}
              </div>
            </div>
          </div>

          {/* Escalation History Items */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>📋 {t("विस्तृत एस्केलेशन इतिहास", "Chronological Escalation Audit Trail")}</span>
              <span className="text-[11px] font-normal text-gray-400">
                {officer.escalationHistory.length} {t("रिकॉर्ड उपलब्ध", "records available")}
              </span>
            </h3>

            {officer.escalationHistory.length > 0 ? (
              <div className="space-y-3">
                {officer.escalationHistory.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg border p-4 transition-all ${
                      item.outcome === "active"
                        ? "bg-red-50/40 border-red-200"
                        : "bg-gray-50/60 border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-800">
                          {item.id}
                        </span>
                        <Link
                          to={`/case/${item.caseId}`}
                          className="font-mono text-xs font-semibold text-[#1a237e] hover:underline"
                        >
                          {item.caseId}
                        </Link>
                        <span className="text-xs text-gray-400">• {item.date}</span>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                          item.outcome === "active"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-green-100 text-green-800 border border-green-300"
                        }`}
                      >
                        {item.outcome === "active"
                          ? `⏳ ${t("सक्रिय समीक्षा (नोडल अपीलीय प्राधिकरण)", "Active Review (Appellate Authority)")}`
                          : `✓ ${t("संतुष्टि से हल (बंद)", "Resolved Satisfactorily (Closed)")}`}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-3 pt-3 border-t border-gray-200/70">
                      <div>
                        <div className="text-gray-500 font-medium">{t("नागरिक असंतोष / कारण:", "Citizen Trigger / Root Cause:")}</div>
                        <div className="text-gray-800 font-semibold mt-0.5">
                          "{t(item.reasonHi, item.reason)}"
                        </div>
                        <div className="text-gray-500 mt-2 font-medium">
                          🏛️ {t("किसे एस्केलेट हुआ:", "Escalated To Authority:")}
                        </div>
                        <div className="text-indigo-900 font-bold mt-0.5">
                          {item.escalatedTo}
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-500 font-medium">{t("पर्यवेक्षी समाधान / स्थिति:", "Resolution Action & Finding:")}</div>
                        <div className="text-gray-800 font-semibold mt-0.5">
                          {t(item.resolutionHi, item.resolution)}
                        </div>
                        {item.impact && (
                          <div className="mt-2 p-2 rounded bg-white border border-gray-200 text-[11px] text-gray-600">
                            <span className="font-bold text-gray-800">{t("सुधार प्रभाव: ", "Impact: ")}</span>
                            {t(item.impactHi || item.impact, item.impact)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-green-50/60 border border-green-200 text-center text-xs text-green-800">
                <div className="text-base mb-1">🌟</div>
                <div className="font-bold">{t("कोई ऐतिहासिक एस्केलेशन दर्ज नहीं है", "Clean Record — Zero Historical Escalations")}</div>
                <div className="text-[11px] text-green-700 mt-0.5">
                  {t(
                    "इस अधिकारी के खिलाफ कभी कोई कागजी खानापूर्ति अथवा असंतोषजनक समाधान का एस्केलेशन नहीं हुआ।",
                    "This officer has a 100% genuine redress record with zero citizen appeal escalations."
                  )}
                </div>
              </div>
            )}
          </div>

          {/* The Pressure Chain Explanation */}
          <div className="mt-4 p-3.5 rounded bg-blue-50/60 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
            <span className="text-base flex-shrink-0">⚖️</span>
            <div className="leading-relaxed">
              <span className="font-bold">
                {t("पारदर्शिता से जवाबदेही कैसे सुनिश्चित होती है?", "How auto-escalation drives real accountability:")}
              </span>{" "}
              {t(
                "CPGRAMS 2.0 में अधिकारी केवल कागजी जवाब देकर केस बंद नहीं कर सकते। यदि नागरिक 1-2 स्टार देता है, तो सिस्टम 24 घंटे में वरिष्ठ नोडल अधिकारियों को अलर्ट भेजता है। सार्वजनिक एस्केलेशन दर बढ़ने से करियर पर प्रभाव पड़ता है, जिससे वास्तविक समाधान देने का दबाव बना रहता है।",
                "Officers cannot close grievances on paper. If a citizen rates ≤ 2 stars, CPGRAMS auto-escalates to supervisory Nodal Officers within 24h. Visible public escalation rates create healthy career pressure to provide real remedy."
              )}
            </div>
          </div>
        </div>

        {/* ── VERIFIED CITIZEN REVIEWS ── */}
        <div className="bg-white border border-gray-200 rounded p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <span>💬</span>
                <span>{t("नागरिक प्रतिक्रिया एवं समीक्षाएं", "Verified Citizen Feedback & Reviews")}</span>
              </h2>
              <p className="text-xs text-gray-500">
                {t(
                  "केस बंद होने के बाद नागरिकों द्वारा दर्ज किया गया वास्तविक फीडबैक।",
                  "Direct feedback submitted by citizens after grievance resolution."
                )}
              </p>
            </div>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded font-mono">
              {officer.feedback.length} {t("समीक्षाएं प्रदर्शित", "sample reviews")}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {officer.feedback.map((f, i) => (
              <div key={i} className="border border-gray-200 rounded p-4 bg-gray-50/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-500 text-xs font-bold">
                      {"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}
                    </span>
                    <span className="text-[10px] text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded font-mono">
                      ✓ {t("सत्यापित केस", "Verified")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-800 italic leading-relaxed mb-3">
                    "{t(f.textHi, f.text)}"
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-2 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="font-semibold text-gray-700">{f.citizen}</span>
                  <span>📍 {f.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CONTACT & PREFERENCE ACTION ── */}
        <div className="bg-white border border-gray-200 rounded p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-gray-900">{t("सरकारी संपर्क विवरण", "Official Contact Details")}</h3>
            <div className="flex items-center gap-4 text-xs text-gray-600 mt-1 flex-wrap">
              <span>📞 {officer.contact}</span>
              <span>•</span>
              <span>📧 {officer.email}</span>
            </div>
            <div className="text-[11px] text-gray-400 mt-1">
              {t("संबद्ध कार्यालय:", "Office:")} {officer.department}, {officer.state}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {requested ? (
              <div className="bg-green-50 border border-green-300 text-green-800 text-xs font-bold px-4 py-2.5 rounded flex items-center gap-1.5 w-full sm:w-auto justify-center">
                <span>✓</span> {t("प्राथमिकता सहेजी गई! शिकायत दर्ज करते समय यह अधिकारी चुने जाएंगे।", "Officer Preferred! Will be prioritized during filing.")}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setRequested(true)}
                className="btn-gov-secondary text-xs px-4 py-2.5 w-full sm:w-auto text-center"
              >
                ⭐ {t("इस अधिकारी को प्राथमिकता दें", "Request This Officer")}
              </button>
            )}

            <button
              onClick={() => navigate("/file-complaint")}
              className="btn-gov-primary text-xs px-5 py-2.5 flex-shrink-0 w-full sm:w-auto text-center"
            >
              ✍️ {t("शिकायत दर्ज करें", "Lodge Grievance")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
