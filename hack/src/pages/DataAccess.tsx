import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { dashboardCases } from "../data/mockData";
import { getConsentRecords } from "../services/authService";
import { useState } from "react";

export default function DataAccess() {
  const { t, currentUser } = useApp();
  const [copied, setCopied] = useState(false);

  if (!currentUser) return <div className="p-8 text-center"><Link to="/login" className="text-indigo-600 underline">{t("लॉगिन करें", "Login")}</Link></div>;

  const consents = getConsentRecords(currentUser.id);

  const dataCategories = [
    { label: t("खाता जानकारी", "Account information"), items: [`${t("नाम:", "Name:")} ${currentUser.name}`, `ID: ${currentUser.id}`] },
    { label: t("संपर्क जानकारी", "Contact information"), items: [`${t("मोबाइल:", "Mobile:")} ${currentUser.mobile || "—"}`, `${t("ईमेल:", "Email:")} ${currentUser.email || "—"}`] },
    { label: t("शिकायत जानकारी", "Complaint information"), items: [`${t("कुल शिकायतें:", "Total complaints:")} ${dashboardCases.length} (${t("डेमो डेटा", "demo data")})`, `${t("स्थितियां:", "Statuses:")} In Progress, Escalated, Awaiting`] },
    { label: t("भाषा वरीयता", "Language preference"), items: [`${t("वर्तमान:", "Current:")} ${currentUser.preferredLanguage === "hi" ? "हिन्दी" : "English"}`] },
    { label: t("सहमति रिकॉर्ड", "Consent records"), items: consents.map((c) => `${c.purpose}: ${c.status}`) },
  ];

  function handleExport() {
    const data = { user: { name: currentUser.name, email: currentUser.email, mobile: currentUser.mobile, createdAt: currentUser.createdAt }, consents, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "my-data-cpgrams.json"; a.click();
    URL.revokeObjectURL(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">← {t("वापस", "Back")}</Link>
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-1">{t("मेरा डेटा", "Your Data")}</h1>
      <p className="text-sm text-gray-500 mb-6">{t("आपके खाते में संग्रहीत जानकारी।", "Information stored in your account.")}</p>

      {copied && <div className="mb-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">✓ {t("डेटा डाउनलोड हो गया।", "Data downloaded.")}</div>}

      <div className="space-y-3 mb-6">
        {dataCategories.map((cat) => (
          <div key={cat.label} className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="font-semibold text-gray-900 text-sm mb-2">{cat.label}</p>
            <ul className="space-y-1">
              {cat.items.map((item, i) => <li key={i} className="text-sm text-gray-600">{item}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <button onClick={handleExport} className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-sm flex items-center justify-center gap-2">
        📥 {t("डेटा डाउनलोड करें (JSON)", "Download my data (JSON)")}
      </button>
    </div>
  );
}
