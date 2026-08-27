import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getConsentRecords, withdrawConsent } from "../services/authService";
import { useState } from "react";

export default function ConsentHistory() {
  const { t, currentUser } = useApp();
  const [records, setRecords] = useState(() => currentUser ? getConsentRecords(currentUser.id) : []);

  if (!currentUser) {
    return <div className="p-8 text-center"><Link to="/login" className="text-indigo-600 underline">{t("लॉगिन करें", "Login")}</Link></div>;
  }

  function handleWithdraw(id: string) {
    if (withdrawConsent(id, currentUser!.id)) {
      setRecords(getConsentRecords(currentUser!.id));
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">← {t("वापस", "Back")}</Link>
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">{t("सहमति इतिहास", "Consent History")}</h1>
      <p className="text-sm text-gray-500 mb-6">{t("आपकी सभी सहमतियां और उनकी स्थिति।", "All your consents and their status.")}</p>

      {records.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
          {t("कोई सहमति रिकॉर्ड नहीं मिला।", "No consent records found.")}
        </div>
      ) : (
        <div className="space-y-3">
          {records.map((r) => (
            <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{r.purpose}</p>
                  <div className="mt-2 space-y-1 text-xs text-gray-500">
                    <p>{t("सूचना:", "Notice:")} {r.noticeVersion} · {t("भाषा:", "Language:")} {r.language}</p>
                    <p>{t("दिया:", "Given:")} {new Date(r.consentedAt).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                    <p>{t("तरीका:", "Method:")} {r.method}</p>
                    {r.withdrawnAt && <p className="text-red-500">{t("वापस लिया:", "Withdrawn:")} {new Date(r.withdrawnAt).toLocaleDateString("en-IN")}</p>}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {r.status === "active" ? t("सक्रिय", "Active") : t("वापस लिया", "Withdrawn")}
                  </span>
                  {r.status === "active" && r.purpose !== "Account authentication" && (
                    <button
                      onClick={() => handleWithdraw(r.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      {t("वापस लें", "Withdraw")}
                    </button>
                  )}
                  {r.purpose === "Account authentication" && (
                    <span className="text-xs text-gray-400">{t("आवश्यक", "Required")}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
