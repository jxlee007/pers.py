import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function PrivacyCentre() {
  const { t, currentUser } = useApp();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t("गोपनीयता केंद्र तक पहुंचने के लिए लॉगिन करें।", "Login to access the Privacy Centre.")}</p>
          <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold">{t("लॉगिन करें", "Login")}</Link>
        </div>
      </div>
    );
  }

  const sections = [
    {
      heading: t("मेरा डेटा", "My Data"),
      items: [
        { icon: "📂", label: t("मेरी जानकारी देखें", "View my information"), desc: t("आपके खाते में संग्रहीत सभी जानकारी देखें।", "See all information stored in your account."), href: "/privacy/access" },
      ],
    },
    {
      heading: t("मेरी सहमति", "My Consent"),
      items: [
        { icon: "📋", label: t("सहमति इतिहास देखें", "View consent history"), desc: t("देखें कि आपने कब और किस लिए सहमति दी।", "See when and what you consented to."), href: "/privacy/consent" },
      ],
    },
    {
      heading: t("डेटा अधिकार", "Data Rights"),
      items: [
        { icon: "✏️", label: t("मेरी जानकारी सुधारें", "Correct my information"), desc: t("अपना नाम, ईमेल, या भाषा सुधारें।", "Correct your name, email, or language preference."), href: "/privacy/correction" },
        { icon: "🗑️", label: t("खाता हटाने का अनुरोध", "Request account deletion"), desc: t("अपना डेटा हटाने का अनुरोध करें।", "Request removal of your data."), href: "/privacy/delete" },
      ],
    },
    {
      heading: t("सहमति प्रबंधन", "Consent Management"),
      items: [
        { icon: "🔔", label: t("सहमति प्रबंधित करें / वापस लें", "Manage / Withdraw consent"), desc: t("वैकल्पिक सहमतियां वापस लें।", "Withdraw optional consent purposes."), href: "/privacy/withdraw" },
      ],
    },
    {
      heading: t("शिकायत", "Grievance"),
      items: [
        { icon: "📢", label: t("गोपनीयता शिकायत उठाएं", "Raise privacy grievance"), desc: t("डेटा संबंधित चिंता दर्ज करें।", "Report a concern about your data."), href: "/privacy/grievance" },
      ],
    },
    {
      heading: t("संपर्क और सूचना", "Contact & Notice"),
      items: [
        { icon: "📄", label: t("गोपनीयता सूचना देखें", "View Privacy Notice"), desc: "Privacy Notice v1.2 · 27 Aug 2026", href: "/privacy" },
        { icon: "📧", label: t("गोपनीयता संपर्क / DPO", "Privacy contact / DPO"), desc: "privacy@cpgrams.gov.in · DARPG", href: "/privacy/grievance" },
      ],
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("गोपनीयता और डेटा", "Privacy & Data")}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t("अपनी जानकारी और सहमति प्रबंधित करें।", "Manage your information and consent.")}</p>
      </div>

      {/* DPDP Statutory Compliance Banner */}
      <Link
        to="/dpdp"
        className="mb-6 block p-4 rounded-xl bg-gradient-to-r from-[#1a237e] to-[#0d47a1] text-white shadow-sm hover:shadow-md transition-all"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {t("वैधानिक अनुपालन", "Statutory Compliance")}
              </div>
              <div className="text-sm font-bold mt-0.5">
                {t("DPDP अधिनियम 2023 अनुपालन केंद्र", "DPDP Act 2023 Compliance Center")}
              </div>
              <div className="text-xs text-blue-100 mt-0.5">
                {t("धारा 5 सूचना, धारा 6 सहमति खाता-बही, DPO एवं DPBI शिकायतें", "Section 5 Notice, Consent Ledger, DPO & DPBI Escalation")}
              </div>
            </div>
          </div>
          <span className="text-sm font-bold bg-white/20 px-3 py-1.5 rounded-lg flex-shrink-0">
            {t("खोलें →", "Open →")}
          </span>
        </div>
      </Link>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{section.heading}</h2>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
              {section.items.map((item) => (
                <Link key={item.href} to={item.href} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-gray-400 self-center">›</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
