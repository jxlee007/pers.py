import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { appeals, dashboardCases, escalations } from "../data/mockData";
import Card from "../components/Card";
import Button from "../components/Button";

type Tab = "active" | "auto_escalated" | "approved" | "pending";

export default function Appeals() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("active");
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState("");
  const [appealReason, setAppealReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const autoEscalatedAppeals = escalations.filter((e) => e.escalationLevel === "appeal");

  const tabItems = [
    { id: "active" as Tab, label: t("सक्रिय अपील", "Active Appeals"), count: appeals.filter((a) => a.status === "Under Review").length },
    { id: "auto_escalated" as Tab, label: t("🚨 स्वतः एस्केलेटेड (फीडबैक)", "🚨 Auto-Escalated (Feedback)"), count: autoEscalatedAppeals.length },
    { id: "approved" as Tab, label: t("स्वीकृत", "Approved"), count: appeals.filter((a) => a.status === "Approved").length },
  ];

  const filtered = {
    active: appeals.filter((a) => a.status === "Under Review"),
    auto_escalated: [],
    approved: appeals.filter((a) => a.status === "Approved"),
    pending: [],
  }[tab];

  const statusBadge: Record<string, string> = {
    "Under Review": "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60",
    "Approved": "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60",
    "Rejected": "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/60",
  };

  const processSteps = [
    {
      n: 1,
      title: t("समाधान से असंतुष्ट", "Dissatisfied with resolution"),
      desc: t("विभाग ने केवल कागजी जवाब दिया या समस्या ठीक नहीं हुई", "Paper compliance or unresolved grievance"),
    },
    {
      n: 2,
      title: t("स्वतः अपील सक्षमीकरण", "Portal Auto-Trigger"),
      desc: t("नागरिक द्वारा 'खराब' (≤ 2) रेटिंग देने पर अपील स्वतः सक्रिय", "Auto-enabled when citizen registers 'Poor' rating"),
    },
    {
      n: 3,
      title: t("नोडल अपीलीय प्राधिकरण", "Nodal Appellate Authority"),
      desc: t("नोडल अधिकारी से वरिष्ठ अधिकारी द्वारा 30 दिनों में अनिवार्य निस्तारण", "Senior officer in rank disposes within 30 days"),
    },
    {
      n: 4,
      title: t("द्वितीय अपील (यदि आवश्यक)", "Second Appeal (if needed)"),
      desc: t("पहली अपील के बाद भी असंतुष्ट तो द्वितीय अपीलीय समीक्षा", "Available if unsatisfied with initial appeal"),
    },
  ];

  function handleSubmitAppeal() {
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setSelectedCase("");
      setAppealReason("");
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("अपील और एस्केलेशन", "Appeals & Escalations")}</h1>
            <p className="text-gray-500 text-sm mt-1">{t("समाधान से असंतुष्ट? अपील दर्ज करें।", "Unsatisfied with resolution? File an appeal.")}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors flex-shrink-0"
            style={{ background: "var(--primary)" }}
          >
            📋 <span className="hidden sm:inline">{t("नई अपील", "New Appeal")}</span><span className="sm:hidden">+</span>
          </button>
        </div>

        {/* Process flow */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-6">
          <h2 className="font-bold text-indigo-800 mb-4 text-sm">{t("अपील प्रक्रिया", "Appeal Process")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {processSteps.map((step) => (
              <div key={step.n} className="bg-white rounded-xl p-4 text-center">
                <div className="w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center mx-auto mb-2" style={{ background: "var(--primary)" }}>
                  {step.n}
                </div>
                <div className="font-semibold text-gray-900 text-xs mb-1">{step.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {tabItems.map((ti) => (
            <button
              key={ti.id}
              onClick={() => setTab(ti.id)}
              className={`flex items-center gap-2 flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                tab === ti.id ? "bg-indigo-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {ti.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === ti.id ? "bg-white/30 text-white" : "bg-gray-100 text-gray-500"}`}>
                {ti.count}
              </span>
            </button>
          ))}
        </div>

        {/* Appeal cards */}
        {tab === "auto_escalated" ? (
          <div className="space-y-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-center justify-between">
              <span className="font-semibold flex items-center gap-1.5">
                <span>🚨</span>
                {t(
                  "नागरिक द्वारा 'खराब' रेटिंग या कागजी खानापूर्ति दर्ज करने पर स्वतः सक्षम अपीलीय मामले।",
                  "Appeals automatically unlocked when citizens registered 'Poor' (≤ 2 stars) feedback after closure."
                )}
              </span>
              <span className="font-bold text-red-800 uppercase tracking-wider text-[10px]">
                30-Day SLA Mandate
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {autoEscalatedAppeals.map((item) => (
                <Card key={item.id} padding="md" hover>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                          {item.id}
                        </span>
                        <span className="font-mono text-xs text-gray-500">{item.caseId}</span>
                      </div>
                      <div className="font-bold text-gray-900 text-sm mt-1">
                        {item.department} ({item.ministry})
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      ⏳ {item.daysOpen} / 30 {t("दिन", "days")}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-gray-50 border border-gray-200 text-xs mb-3 italic text-gray-800">
                    "{t(item.feedbackHi, item.feedback)}"
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                    <div>
                      <span className="font-medium text-gray-700">{t("अधिकारी:", "Officer:")}</span>{" "}
                      <Link to={`/officer/${item.officerId}`} className="text-[#1a237e] underline font-semibold">
                        {item.officerName}
                      </Link>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">{t("राज्य:", "State:")}</span> {item.state}
                    </div>
                  </div>

                  <div className="bg-indigo-50 rounded-lg px-3 py-2 text-xs text-indigo-950 font-semibold mb-3">
                    🏛️ {item.escalatedTo}
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => navigate(`/case/${item.caseId}`)}
                      className="flex-1 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      {t("केस देखें", "View Case")}
                    </button>
                    <Link
                      to="/accountability"
                      className="flex-1 py-2 text-xs font-semibold text-center text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {t("जवाबदेही रडार", "Accountability")}
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-200">
            <div className="text-5xl mb-3">📭</div>
            <div className="font-medium">{t("इस श्रेणी में कोई अपील नहीं", "No appeals in this category")}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((appeal) => (
              <Card key={appeal.id} padding="md" hover>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-mono text-xs text-gray-400">{appeal.id}</div>
                    <div className="font-bold text-gray-900 text-sm mt-1">{appeal.grievance_title}</div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusBadge[appeal.status] || "bg-gray-100 text-gray-700"}`}>
                    {appeal.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-500 mb-4">
                  <div><span className="font-medium text-gray-700">{t("अपील प्रकार:", "Type:")}</span> {appeal.appeal_type}</div>
                  <div><span className="font-medium text-gray-700">{t("दर्ज:", "Filed:")}</span> {appeal.filed_date}</div>
                  <div><span className="font-medium text-gray-700">{t("दिन:", "Days:")}</span> {appeal.days_since_filed}</div>
                  {appeal.next_hearing && (
                    <div><span className="font-medium text-gray-700">{t("अगली सुनवाई:", "Hearing:")}</span> {appeal.next_hearing}</div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600 mb-3">
                  ⚖️ {appeal.appellate_authority}
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/case/${appeal.grievance_id}`)}
                    className="flex-1 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    {t("केस देखें", "View Case")}
                  </button>
                  <button className="flex-1 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    {t("विस्तार", "Details")}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* File Appeal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-lg">{t("नई अपील दर्ज करें", "File New Appeal")}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>

            {submitted ? (
              <div className="p-8 text-center">
                <div className="text-5xl mb-3">✅</div>
                <div className="font-bold text-gray-900 text-lg">{t("अपील दर्ज हो गई!", "Appeal Filed Successfully!")}</div>
                <div className="text-gray-500 text-sm mt-2">{t("हम जल्द ही आपसे संपर्क करेंगे।", "We'll contact you shortly.")}</div>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("शिकायत चुनें", "Select Complaint")}</label>
                  <select
                    value={selectedCase}
                    onChange={(e) => setSelectedCase(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 bg-white"
                  >
                    <option value="">{t("-- शिकायत चुनें --", "-- Select a complaint --")}</option>
                    {dashboardCases.map((c) => (
                      <option key={c.id} value={c.id}>{c.id} — {c.title.slice(0, 35)}...</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t("अपील का कारण", "Reason for Appeal")}</label>
                  <textarea
                    value={appealReason}
                    onChange={(e) => setAppealReason(e.target.value)}
                    placeholder={t("समाधान से असंतोष का कारण बताएं...", "Explain why you are unsatisfied with the resolution...")}
                    className="w-full h-28 px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none outline-none focus:border-indigo-400"
                    style={{ fontSize: "16px" }}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    {t("रद्द करें", "Cancel")}
                  </button>
                  <button
                    onClick={handleSubmitAppeal}
                    disabled={!selectedCase || appealReason.length < 20}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50"
                    style={{ background: "var(--primary)" }}
                  >
                    {t("अपील दर्ज करें", "Submit Appeal")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
