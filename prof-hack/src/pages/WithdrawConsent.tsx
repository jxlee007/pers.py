import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getConsentRecords, withdrawConsent } from "../services/authService";

export default function WithdrawConsent() {
  const { t, currentUser } = useApp();
  const [records, setRecords] = useState(() => currentUser ? getConsentRecords(currentUser.id) : []);
  const [withdrawn, setWithdrawn] = useState<string | null>(null);

  if (!currentUser) return <div className="p-8 text-center"><Link to="/login" className="text-indigo-600 underline">{t("लॉगिन करें", "Login")}</Link></div>;

  function handleWithdraw(id: string, purpose: string) {
    if (withdrawConsent(id, currentUser!.id)) {
      setRecords(getConsentRecords(currentUser!.id));
      setWithdrawn(purpose);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">← {t("वापस", "Back")}</Link>
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-1">{t("सहमति प्रबंधित करें", "Manage Consent")}</h1>
      <p className="text-sm text-gray-500 mb-6">{t("अपनी सहमतियां देखें और वैकल्पिक सहमतियां वापस लें।", "View your consents and withdraw optional ones.")}</p>

      {withdrawn && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
          ✓ {t(`"${withdrawn}" सहमति वापस ले ली गई।`, `"${withdrawn}" consent withdrawn.`)}
        </div>
      )}

      <div className="space-y-3">
        {records.map((r) => (
          <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-900 text-sm">{r.purpose}</p>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {r.status === "active" ? t("सक्रिय", "Active") : t("वापस लिया", "Withdrawn")}
              </span>
            </div>
            {r.purpose === "Account authentication" ? (
              <p className="text-xs text-gray-400">{t("यह प्रसंस्करण खाते के लिए आवश्यक है और इसे बंद नहीं किया जा सकता। खाता हटाने के लिए 'खाता हटाएं' का उपयोग करें।", "This processing is necessary for your account and cannot be switched off. To remove it, use 'Delete account'.")}</p>
            ) : r.status === "active" ? (
              <button onClick={() => handleWithdraw(r.id, r.purpose)} className="mt-2 text-xs text-red-600 hover:underline font-medium">
                {t("वापस लें", "Withdraw")}
              </button>
            ) : (
              <p className="text-xs text-gray-400">{t("सहमति वापस ले ली गई।", "Consent withdrawn.")}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
