import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { dashboardCases, caseTimelines, routingMatrix } from "../data/mockData";
import Timeline from "../components/Timeline";
import Button from "../components/Button";

const statusColors: Record<string, string> = {
  "In Progress": "bg-amber-500",
  "Escalated": "bg-red-500",
  "Resolved": "bg-emerald-500",
  "Awaiting Action": "bg-purple-500",
};

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useApp();
  const navigate = useNavigate();

  const caseData = dashboardCases.find((c) => c.id === id);
  const timeline = id ? caseTimelines[id] || [] : [];

  if (!caseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-5xl mb-4">❓</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t("केस नहीं मिला", "Case Not Found")}</h2>
          <p className="text-gray-500 mb-6">{t("केस ID गलत हो सकती है।", "The case ID may be incorrect.")}</p>
          <Link to="/dashboard">
            <Button>{t("डैशबोर्ड पर जाएं", "Go to Dashboard")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const routing = routingMatrix[caseData.complaint_type] || routingMatrix["other"];
  const completedSteps = timeline.filter((e) => e.status === "completed").length;
  const progress = Math.round((completedSteps / timeline.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          ← {t("वापस जाएं", "Go Back")}
        </button>

        {/* Case header */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="font-mono text-sm text-gray-400 mb-1">{caseData.id}</div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t(caseData.titleHi, caseData.title)}</h1>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full text-white font-semibold ${statusColors[caseData.status] || "bg-gray-400"}`}
                >
                  {caseData.status}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                  {routing.icon} {caseData.routed_to}
                </span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    caseData.priority === "critical"
                      ? "bg-red-100 text-red-700"
                      : caseData.priority === "high"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {caseData.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-extrabold text-red-600">{caseData.days_pending}</div>
              <div className="text-xs text-gray-400">{t("दिन लंबित", "days pending")}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>{t("प्रगति", "Progress")}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Auto-Escalation Active Banner */}
          {caseData.status === "Escalated" && (
            <div className="mt-5 p-4 rounded-xl bg-red-50 border-2 border-red-300 text-xs text-red-900">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold flex items-center gap-1.5 text-red-800">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                  🚨 {t("स्वतः एस्केलेशन सक्रिय — पर्यवेक्षी नोडल समीक्षा जारी", "Auto-Escalation Active — Under Nodal Supervisory Review")}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-200 text-red-900 font-mono">
                  CPGRAMS SLA: 30 DAYS
                </span>
              </div>
              <p className="leading-relaxed text-red-950 font-medium">
                {t(
                  "यह मामला प्रारंभिक समाधान से असंतोष के कारण वरिष्ठ नोडल अपीलीय प्राधिकरण को स्वतः एस्केलेट किया गया है। वैधानिक दिशानिर्देशों के तहत अपीलीय प्राधिकारी द्वारा 30 दिनों में अंतिम निपटान अनिवार्य है।",
                  "This case was auto-escalated to the senior Nodal Appellate Authority following citizen dissatisfaction. Under statutory CPGRAMS rules, the Appellate Authority is mandated to dispose of appeals within 30 days."
                )}
              </p>
              <div className="mt-2 pt-2 border-t border-red-200 flex items-center justify-between text-[11px] font-semibold text-red-800">
                <span>🏛️ {t("समीक्षाधीन प्राधिकारी: नोडल अपीलीय प्राधिकरण (Appellate Authority)", "Authority: Nodal Authority for Appeal")}</span>
                <Link to="/accountability" className="underline hover:text-red-950">
                  {t("जवाबदेही रडार देखें →", "View Accountability Radar →")}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Status info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-xs text-gray-400 font-medium mb-1">{t("दर्ज तिथि", "Filed Date")}</div>
            <div className="font-bold text-gray-900">📅 {caseData.filed_date}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-xs text-gray-400 font-medium mb-1">{t("वर्तमान चरण", "Current Stage")}</div>
            <div className="font-bold text-gray-900 text-sm">🔍 {caseData.current_stage}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-xs text-gray-400 font-medium mb-1">{t("अपेक्षित समाधान", "Expected Resolution")}</div>
            <div className="font-bold text-gray-900">🎯 {caseData.expected_resolution}</div>
          </div>
        </div>

        {/* BILINGUAL COMPLAINT TEXT - SIDE BY SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Native Language Card */}
          <div className="border border-blue-200 dark:border-blue-800/60 bg-blue-50/60 dark:bg-blue-950/30 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                <span>🗣️</span> {t("नागरिक की मूल आवाज़ / विवरण", "Citizen's Original Voice / Text")}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                {t("मातृभाषा", "Native Indic")}
              </span>
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
              &ldquo;{t(caseData.titleHi, caseData.title)} — {t("मेरी शिकायत पिछले कई हफ्तों से लंबित है और जमीनी स्तर पर समाधान नहीं हुआ है।", "Grievance submitted by citizen via voice transcription. Requires immediate statutory resolution.")}&rdquo;
            </p>
            <div className="text-[11px] text-blue-700 dark:text-blue-400 mt-3 pt-2 border-t border-blue-200/60 dark:border-blue-800/40 flex items-center justify-between">
              <span>🇮🇳 Sarvam AI Voice Verified</span>
              <span>Source: Citizen App</span>
            </div>
          </div>

          {/* English Translation Card */}
          <div className="border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <span>🌐</span> {t("अधिकारी हेतु अनुवादित विवरण (English)", "Official English Translation")}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                {t("रूटिंग अधिकृत", "Backend Standard")}
              </span>
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
              &ldquo;{caseData.title}. The citizen reported unresolved delays despite multiple follow-ups. Case is auto-routed to {routing.ministry} ({routing.department}).&rdquo;
            </p>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-3 pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-between">
              <span>🧠 LLM Intent Classified: 96% Match</span>
              <span>Target: {caseData.routed_to}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-5">
          <h2 className="font-bold text-gray-900 text-lg mb-6">{t("शिकायत की यात्रा", "Case Journey & Timeline")}</h2>
          <Timeline events={timeline} />
        </div>

        {/* Contact section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
          <h2 className="font-bold text-gray-900 mb-4">📞 {t("संपर्क करें", "Contact Department")}</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl">{routing.icon}</span>
            <div>
              <div className="font-bold text-gray-900">{routing.ministry}</div>
              <div className="text-sm text-gray-500">{routing.department}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`tel:${caseData.phone}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-sm transition-colors"
              style={{ background: "#10B981" }}
            >
              ☎️ {t("कॉल करें", "Call Now")} · {caseData.phone}
            </a>
            <a
              href={`sms:${caseData.phone}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-sm bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              📱 {t("SMS करें", "Send SMS")}
            </a>
            <button
              onClick={() => navigate("/appeals")}
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-gray-700 text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              ⚖️ {t("अपील दर्ज करें", "File Appeal")}
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/appeals" className="flex-1">
            <Button size="md" fullWidth variant="ghost">
              ⚖️ {t("अपील करें", "File an Appeal")}
            </Button>
          </Link>
          <Link to="/directory" className="flex-1">
            <Button size="md" fullWidth variant="secondary">
              👤 {t("अधिकारी देखें", "View Officer Directory")}
            </Button>
          </Link>
          <Link to={`/feedback`} className="flex-1">
            <Button size="md" fullWidth variant="secondary">
              ⭐ {t("फीडबैक दें", "Give Feedback")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
