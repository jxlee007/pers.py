import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function DpdpCompliance() {
  const { t, currentUser } = useApp();
  const [activeSection, setActiveSection] = useState<"notice" | "rights" | "consent" | "dpo" | "dpbi">("notice");
  const [nomineeSubmitted, setNomineeSubmitted] = useState(false);
  const [nomineeName, setNomineeName] = useState("");
  const [nomineeContact, setNomineeContact] = useState("");

  const consentLedger = [
    {
      id: "c1",
      purpose: t("खाता प्रमाणीकरण एवं OTP लॉगिन", "Account Authentication & OTP Login"),
      basis: t("धारा 4(1) एवं धारा 6 सहमति", "Section 4(1) & Section 6 Consent"),
      date: "2026-08-20 10:14 IST",
      status: "Active",
      removable: false,
      desc: t("लॉगिन और खाता सुरक्षा के लिए आवश्यक।", "Mandatory for account security & authentication."),
    },
    {
      id: "c2",
      purpose: t("AI-सक्षम शिकायत वर्गीकरण एवं रूटिंग", "AI-Enabled Grievance Routing Assistance"),
      basis: t("धारा 5 विनिर्दिष्ट उद्देश्य", "Section 5 Specified Purpose"),
      date: "2026-08-21 14:32 IST",
      status: "Active",
      removable: true,
      desc: t("शिकायत टेक्स्ट को सही मंत्रालय तक त्वरित पहुंचाने के लिए।", "Enables LLM classification of complaint text."),
    },
    {
      id: "c3",
      purpose: t("SMS एवं WhatsApp स्थिति सूचनाएं", "SMS & WhatsApp Status Notifications"),
      basis: t("धारा 6 वैकल्पिक सहमति", "Section 6 Optional Consent"),
      date: "2026-08-21 14:32 IST",
      status: "Active",
      removable: true,
      desc: t("केस प्रगति की वास्तविक समय सूचनाएं।", "Real-time updates delivered to mobile."),
    },
    {
      id: "c4",
      purpose: t("नागरिक समाधान गुणवत्ता फीडबैक", "Citizen Resolution Quality Feedback"),
      basis: t("धारा 6 वैकल्पिक सहमति", "Section 6 Optional Consent"),
      date: "2026-08-25 09:18 IST",
      status: "Active",
      removable: true,
      desc: t("केस बंद होने के बाद अधिकारी प्रदर्शन समीक्षा।", "Participate in post-resolution satisfaction audits."),
    },
  ];

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }} id="main-content">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Link to="/" className="hover:underline">{t("होम", "Home")}</Link>
          <span>›</span>
          <Link to="/privacy" className="hover:underline">{t("गोपनीयता", "Privacy")}</Link>
          <span>›</span>
          <span className="text-gray-800 dark:text-gray-200 font-semibold">{t("DPDP 2023 अनुपालन केंद्र", "DPDP Act 2023 Compliance")}</span>
        </div>

        {/* Main Header */}
        <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold px-2.5 py-1 rounded bg-green-50 dark:bg-green-950/50 text-green-800 dark:text-green-300 mb-2 border border-green-200 dark:border-green-800">
                🛡️ {t("डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (DPDP Act, 2023)", "Digital Personal Data Protection Act, 2023")}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                {t("DPDP 2023 वैधानिक अनुपालन एवं नागरिक अधिकार केंद्र", "DPDP Act 2023 Statutory Compliance & Rights Center")}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
                {t(
                  "नागरिक (डेटा प्रिंसिपल) के अधिकारों का संरक्षण, सहमति प्रबंधन, और डेटा सुरक्षा बोर्ड ऑफ इंडिया (DPBI) शिकायत निवारण ढांचा।",
                  "Protecting citizen (Data Principal) rights, consent architecture, and Data Protection Board of India (DPBI) redressal framework."
                )}
              </p>
            </div>

            <div className="flex-shrink-0 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-xs text-blue-900 dark:text-blue-200">
              <div className="font-bold">{t("डेटा प्रत्ययी (Data Fiduciary):", "Data Fiduciary:")}</div>
              <div>DARPG, Government of India</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 font-mono">DPO Reg: IN-DARPG-DPDP-001</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 border-t border-gray-100 dark:border-gray-700 pt-4">
            {[
              { id: "notice", label: t("धारा 5 सूचना", "Section 5 Notice"), icon: "📄" },
              { id: "rights", label: t("नागरिक अधिकार (अध्याय III)", "Data Principal Rights"), icon: "⚖️" },
              { id: "consent", label: t("सहमति खाता-बही", "Consent Ledger"), icon: "📋" },
              { id: "dpo", label: t("डेटा सुरक्षा अधिकारी (DPO)", "Data Protection Officer"), icon: "👤" },
              { id: "dpbi", label: t("DPBI बोर्ड अपील", "DPBI Board Escalation"), icon: "🏛️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                  activeSection === tab.id
                    ? "bg-[#1a237e] text-white shadow-sm"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── TAB 1: SECTION 5 NOTICE ── */}
        {activeSection === "notice" && (
          <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-2xl">📄</span>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("धारा 5 — व्यक्तिगत डेटा एकत्र करने से पूर्व अनिवार्य सूचना", "Section 5 Notice — Prior to Personal Data Processing")}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("DPDP अधिनियम 2023 की धारा 5(1) के तहत नागरिक को दी जाने वाली स्पष्ट एवं मदवार सूचना।", "Clear itemised statutory notice under Section 5(1) of DPDP Act 2023.")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider mb-2">
                  1. {t("एकत्रित किए जाने वाले व्यक्तिगत डेटा की मदें", "Itemised Personal Data Collected")}
                </h3>
                <ul className="space-y-1.5 text-xs">
                  <li>• <strong>{t("पहचान एवं संपर्क:", "Identity & Contact:")}</strong> {t("नाम, मोबाइल नंबर, ईमेल आईडी (प्रमाणीकरण हेतु)।", "Name, Mobile Number, Email ID (for authentication).")}</li>
                  <li>• <strong>{t("स्थान विवरण:", "Location:")}</strong> {t("राज्य, जिला, पिनकोड (अधिकार क्षेत्र निर्धारण हेतु)।", "State, District, Pincode (to determine jurisdiction).")}</li>
                  <li>• <strong>{t("शिकायत विवरण:", "Grievance Record:")}</strong> {t("शिकायत का विवरण एवं संलग्न सहायक दस्तावेज।", "Grievance text and supporting annexures.")}</li>
                  <li className="text-amber-600 dark:text-amber-400 font-semibold">• <strong>{t("डेटा न्यूनीकरण:", "Data Minimisation:")}</strong> {t("कोई अनावश्यक बायोमेट्रिक या वित्तीय डेटा एकत्र नहीं किया जाता।", "No redundant sensitive or biometric data collected.")}</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider mb-2">
                  2. {t("प्रसंस्करण का विनिर्दिष्ट उद्देश्य", "Specified Purpose of Processing")}
                </h3>
                <ul className="space-y-1.5 text-xs">
                  <li>• {t("नागरिक की शिकायत को संबंधित नोडल अधिकारी तक पहुंचाना।", "Transmitting grievance to the competent public authority.")}</li>
                  <li>• {t("AI-सक्षम सटीकता से गलत विभाग में भटकने से रोकना।", "Eliminating bouncing delays via AI-enabled smart classification.")}</li>
                  <li>• {t("21-दिवसीय वैधानिक समय सीमा के भीतर समाधान की निगरानी।", "Tracking resolution progress against statutory 21-day timeline.")}</li>
                  <li>• {t("समाधान के पश्चात नागरिक संतुष्टि सत्यापन एवं ऑडिट।", "Post-resolution citizen verification & satisfaction audit.")}</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs">
              <span className="font-bold text-blue-900 dark:text-blue-200">
                {t("आठवीं अनुसूची भाषा सुलभता:", "Eighth Schedule Language Accessibility:")}
              </span>{" "}
              {t(
                "DPDP अधिनियम की धारा 5(3) के अनुसार, यह सूचना संविधान की 8वीं अनुसूची में विनिर्दिष्ट सभी 22 आधिकारिक भारतीय भाषाओं में उपलब्ध कराई जा रही है।",
                "As mandated by Section 5(3), this notice is accessible in English and all 22 scheduled Indian languages."
              )}
            </div>
          </div>
        )}

        {/* ── TAB 2: DATA PRINCIPAL RIGHTS (CHAPTER III) ── */}
        {activeSection === "rights" && (
          <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-2xl">⚖️</span>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("अध्याय III — नागरिक (डेटा प्रिंसिपल) के वैधानिक अधिकार", "Chapter III — Statutory Data Principal Rights")}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("DPDP 2023 के तहत नागरिक किसी भी समय अपने डेटा अधिकारों का प्रयोग कर सकते हैं।", "Direct tools to exercise your statutory rights guaranteed under Sections 11-14.")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Right 1: Access */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-[#111827] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase mb-1">
                    {t("धारा 11 — पहुंच का अधिकार", "Section 11 — Right to Access")}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                    {t("व्यक्तिगत डेटा की प्रति प्राप्त करें", "Access & Summary of Personal Data")}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    {t("अपने सभी व्यक्तिगत डेटा, शिकायतों का इतिहास और किस विभाग के साथ साझा किया गया, उसका पूरा सारांश डाउनलोड करें।", "Download a complete extract of all your personal data, filed complaints, and departmental transfers.")}
                  </p>
                </div>
                <Link to="/privacy/access" className="btn-gov-secondary text-xs px-3 py-1.5 text-center">
                  📂 {t("डेटा सारांश देखें / डाउनलोड करें", "Access My Data")} →
                </Link>
              </div>

              {/* Right 2: Correction & Erasure */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-[#111827] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-green-800 dark:text-green-300 uppercase mb-1">
                    {t("धारा 12 — सुधार एवं मिटाने का अधिकार", "Section 12 — Correction & Erasure")}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                    {t("डेटा सुधार अथवा विलोपन अनुरोध", "Correction, Updating & Erasure")}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    {t("अशुद्ध या भ्रामक व्यक्तिगत डेटा में सुधार का अनुरोध करें या खाता बंद होने पर डेटा मिटाने का अनुरोध करें।", "Request immediate rectification of inaccurate personal details or statutory erasure of completed grievance records.")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to="/privacy/correction" className="btn-gov-secondary text-xs px-2 py-1.5 text-center flex-1">
                    ✏️ {t("सुधार करें", "Correct")}
                  </Link>
                  <Link to="/privacy/delete" className="px-2 py-1.5 rounded text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 hover:bg-red-100 transition-colors text-center flex-1">
                    🗑️ {t("विलोपन", "Erase")}
                  </Link>
                </div>
              </div>

              {/* Right 3: Grievance Redressal */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-[#111827] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase mb-1">
                    {t("धारा 13 — शिकायत निवारण का अधिकार", "Section 13 — Privacy Grievance Redressal")}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                    {t("डेटा गोपनीयता शिकायत दर्ज करें", "Raise Data Protection Grievance")}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    {t("डेटा उल्लंघन या अनुचित प्रसंस्करण संबंधी शिकायत DARPG के डेटा संरक्षण अधिकारी (DPO) के समक्ष उठाएं।", "Report any unauthorized processing, security concern, or delay in exercising rights to the Data Protection Officer.")}
                  </p>
                </div>
                <Link to="/privacy/grievance" className="btn-gov-secondary text-xs px-3 py-1.5 text-center">
                  📢 {t("गोपनीयता शिकायत उठाएं", "Lodge Privacy Grievance")} →
                </Link>
              </div>

              {/* Right 4: Right to Nominate */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-[#111827] flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase mb-1">
                    {t("धारा 14 — नामांकित करने का अधिकार", "Section 14 — Right to Nominate")}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                    {t("कानूनी उत्तराधिकारी / प्रतिनिधि नामांकन", "Nomination of Representative")}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    {t("असमर्थता या मृत्यु की स्थिति में अपने डेटा अधिकारों का प्रयोग करने के लिए किसी व्यक्ति को नामांकित करें।", "Nominate an individual who shall exercise your data principal rights in event of death or incapacity.")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection("rights")}
                  className="btn-gov-secondary text-xs px-3 py-1.5 text-center"
                >
                  👥 {t("नामांकन फॉर्म भरें", "Manage Nominee")} →
                </button>
              </div>
            </div>

            {/* Nomination Form Section 14 */}
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 mt-4">
              <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200 mb-2">
                ✍️ {t("धारा 14 नामांकन फॉर्म (Statutory Nominee Designation)", "Section 14 Nominee Designation")}
              </h4>
              {nomineeSubmitted ? (
                <div className="p-3 bg-green-100 dark:bg-green-950/60 border border-green-300 text-green-900 dark:text-green-200 rounded text-xs font-semibold">
                  ✓ {t(`नामांकन सफलतापूर्वक पंजीकृत! नामांकित व्यक्ति: ${nomineeName} (${nomineeContact})`, `Nominee successfully recorded! Nominee: ${nomineeName} (${nomineeContact})`)}
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (nomineeName && nomineeContact) setNomineeSubmitted(true);
                  }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs"
                >
                  <input
                    type="text"
                    required
                    value={nomineeName}
                    onChange={(e) => setNomineeName(e.target.value)}
                    placeholder={t("नामांकित व्यक्ति का पूरा नाम", "Nominee Full Name")}
                    className="p-2 border border-amber-300 dark:border-amber-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    required
                    value={nomineeContact}
                    onChange={(e) => setNomineeContact(e.target.value)}
                    placeholder={t("मोबाइल / ईमेल", "Nominee Mobile or Email")}
                    className="p-2 border border-amber-300 dark:border-amber-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                  <button type="submit" className="btn-gov-primary text-xs py-2 px-3">
                    {t("नामांकित दर्ज करें", "Register Nominee")}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 3: CONSENT LEDGER (SECTION 6) ── */}
        {activeSection === "consent" && (
          <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-2xl">📋</span>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("धारा 6 — नागरिक सहमति खाता-बही (Consent Ledger)", "Section 6 — Consent Ledger & Revocation")}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("सहमति उतनी ही आसानी से वापस ली जा सकती है जितनी आसानी से दी गई थी (धारा 6(4))।", "Right to withdraw consent as easily as it was granted under Section 6(4).")}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 px-3">{t("उद्देश्य", "Processing Purpose")}</th>
                    <th className="py-3 px-3">{t("कानूनी आधार", "Lawful Basis")}</th>
                    <th className="py-3 px-3">{t("सहमति तिथि", "Timestamp")}</th>
                    <th className="py-3 px-3 text-center">{t("स्थिति", "Status")}</th>
                    <th className="py-3 px-3 text-right">{t("वापसी कार्रवाई", "Action")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {consentLedger.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">
                        <div>{c.purpose}</div>
                        <div className="text-[10px] text-gray-400 font-normal mt-0.5">{c.desc}</div>
                      </td>
                      <td className="py-3 px-3 text-gray-600 dark:text-gray-400">{c.basis}</td>
                      <td className="py-3 px-3 font-mono text-gray-500">{c.date}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300 font-bold text-[10px]">
                          ✓ {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {c.removable ? (
                          <Link
                            to="/privacy/withdraw"
                            className="text-red-600 dark:text-red-400 font-semibold hover:underline"
                          >
                            {t("वापस लें", "Withdraw")}
                          </Link>
                        ) : (
                          <span className="text-gray-400 text-[10px]">{t("अनिवार्य कोर", "Mandatory Core")}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 4: DATA PROTECTION OFFICER (DPO) ── */}
        {activeSection === "dpo" && (
          <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-2xl">👤</span>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("डेटा संरक्षण अधिकारी (Data Protection Officer - DPO)", "Data Protection Officer (DPO) - DARPG")}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("DPDP अधिनियम की धारा 8 एवं धारा 9 के तहत नामित वैधानिक संपर्क।", "Statutory contact mandated under Sections 8 & 9 for significant data fiduciary.")}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-[#111827] flex flex-col sm:flex-row items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-[#880e4f] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                DP
              </div>
              <div className="flex-1 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("डॉ. अनुराग श्रीवास्तव, आई.ए.एस.", "Dr. Anurag Srivastava, IAS")}
                </h3>
                <div className="text-xs font-semibold text-[#1a237e] dark:text-blue-300">
                  {t("संयुक्त सचिव एवं नामित डेटा संरक्षण अधिकारी (DPO)", "Joint Secretary & Designated Data Protection Officer")}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {t("प्रशासनिक सुधार और लोक शिकायत विभाग (DARPG), भारत सरकार", "Department of Administrative Reforms & Public Grievances, Government of India")}
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>📞 <strong>Telephone:</strong> 011-23741006 / 011-23401455</div>
                  <div>📧 <strong>DPO Email:</strong> <a href="mailto:dpo-cpgrams@nic.in" className="text-[#1a237e] dark:text-blue-300 underline font-bold">dpo-cpgrams@nic.in</a></div>
                  <div className="sm:col-span-2">🏢 <strong>Office:</strong> 5th Floor, Sardar Patel Bhawan, Sansad Marg, New Delhi — 110001</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 5: DPBI BOARD ESCALATION ── */}
        {activeSection === "dpbi" && (
          <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-2xl">🏛️</span>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("धारा 18 — डेटा संरक्षण बोर्ड ऑफ इंडिया (DPBI) में अपील", "Section 18 — Escalation to Data Protection Board of India (DPBI)")}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("यदि आप DPO के समाधान से संतुष्ट नहीं हैं तो सीधे केंद्रीय बोर्ड में शिकायत दर्ज करने का अधिकार।", "Direct statutory right to approach DPBI if aggrieved by Data Fiduciary.")}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs leading-relaxed space-y-2">
              <p className="font-semibold text-blue-900 dark:text-blue-200">
                {t("वैधानिक प्रक्रिया (Statutory Procedure under Section 18):", "Statutory Procedure under Section 18:")}
              </p>
              <p>
                {t(
                  "1. नागरिक पहले DARPG के DPO के समक्ष शिकायत दर्ज करें। DPO को 7 कार्यदिवसों के भीतर पावती और 30 दिनों में पूर्ण निवारण प्रदान करना अनिवार्य है।",
                  "1. The citizen must first register a grievance with the internal DPO. The DPO must acknowledge within 7 days and resolve within 30 days."
                )}
              </p>
              <p>
                {t(
                  "2. यदि DPO कोई समाधान नहीं देता या समाधान असंतोषजनक है, तो नागरिक सीधे डेटा संरक्षण बोर्ड ऑफ इंडिया (DPBI) के डिजिटल पोर्टल पर अपील प्रस्तुत कर सकते हैं।",
                  "2. If the DPO fails to resolve or the citizen is aggrieved, an appeal may be filed directly to the Data Protection Board of India (DPBI)."
                )}
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-xs text-gray-600 dark:text-gray-300">
              <div className="font-bold text-gray-900 dark:text-white mb-1">
                {t("डेटा संरक्षण बोर्ड ऑफ इंडिया (DPBI) संदर्भ:", "Data Protection Board of India (DPBI) Reference:")}
              </div>
              <div>Digital Personal Data Protection Board of India, New Delhi</div>
              <div className="mt-1">
                Official Digital Portal: <a href="https://meity.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#1a237e] dark:text-blue-300 underline font-bold">dpbi.gov.in (via MeitY) ↗</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
