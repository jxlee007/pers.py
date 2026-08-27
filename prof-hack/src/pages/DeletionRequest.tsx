import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { submitPrivacyRequest, verifyOtp, sendOtp } from "../services/authService";

type Step = "review" | "reauth" | "confirm" | "done";

export default function DeletionRequest() {
  const { t, currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("review");
  const [otp, setOtp] = useState("");
  const [maskedDest, setMaskedDest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!currentUser) return <div className="p-8 text-center"><Link to="/login" className="text-indigo-600 underline">{t("लॉगिन करें", "Login")}</Link></div>;

  async function handleReauth() {
    setLoading(true);
    const contact = currentUser!.email || currentUser!.mobile;
    const { masked } = await sendOtp(contact);
    setMaskedDest(masked);
    setLoading(false);
    setStep("reauth");
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await verifyOtp(otp);
    if (result.success) { setStep("confirm"); }
    else { setError(t("गलत OTP।", "Incorrect OTP.")); }
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    submitPrivacyRequest({ userId: currentUser!.id, type: "deletion", description: "Account deletion request" });
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🗑️</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t("हटाने का अनुरोध सबमिट हो गया", "Deletion request submitted")}</h2>
        <p className="text-sm text-gray-500 mb-6">{t("आपका अनुरोध प्राप्त हो गया। प्रसंस्करण में 30 दिन तक लग सकते हैं।", "Your request has been received. Processing may take up to 30 days.")}</p>
        <button onClick={() => { logout(); navigate("/"); }} className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold text-sm">{t("लॉगआउट", "Logout")}</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">← {t("वापस", "Back")}</Link>
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-1">{t("खाता हटाएं", "Delete account")}</h1>

      {step === "review" && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-sm text-amber-800">
            ⚠️ {t("खाता हटाने से आपकी जानकारी हट जाएगी या अनाम हो जाएगी जहां लागू हो। कुछ जानकारी कानूनी दायित्वों के कारण रखी जा सकती है।", "Deleting your account may remove or anonymise information where applicable. Some information may be retained where required by law.")}
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm space-y-2">
            <p className="font-medium text-gray-900">{t("हटाने से क्या होगा:", "What happens on deletion:")}</p>
            <ul className="space-y-1 text-gray-600 ml-2">
              <li>• {t("प्रोफाइल जानकारी हटाई जाएगी", "Profile information will be deleted")}</li>
              <li>• {t("सहमति रिकॉर्ड अनाम किए जाएंगे", "Consent records will be anonymised")}</li>
              <li>• {t("सबमिट की गई शिकायतें विभाग के पास रह सकती हैं", "Submitted complaints may remain with the department")}</li>
            </ul>
          </div>
          <button onClick={handleReauth} disabled={loading} className="w-full py-3.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors text-sm">
            {loading ? <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : t("जारी रखें", "Continue")}
          </button>
        </div>
      )}

      {step === "reauth" && (
        <form onSubmit={handleVerify} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <p className="text-sm text-gray-600">{t("पहचान सत्यापित करें। OTP भेजा गया:", "Verify your identity. OTP sent to:")} <span className="font-semibold">{maskedDest}</span></p>
          <p className="text-xs text-gray-400">{t("Demo OTP: 123456", "Demo OTP: 123456")}</p>
          <input type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="000000" className="w-full px-4 py-4 border border-gray-300 rounded-xl text-2xl text-center tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500" autoFocus />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading || otp.length !== 6} className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors text-sm">
            {loading ? <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : t("सत्यापित करें", "Verify")}
          </button>
        </form>
      )}

      {step === "confirm" && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
            {t("क्या आप वाकई अपना खाता हटाना चाहते हैं? यह क्रिया उलट नहीं की जा सकती।", "Are you sure you want to delete your account? This action cannot be undone.")}
          </div>
          <div className="flex gap-2">
            <Link to="/privacy" className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold text-center hover:bg-gray-50">{t("रद्द करें", "Cancel")}</Link>
            <button onClick={handleDelete} disabled={loading} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors">
              {loading ? <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : t("हां, खाता हटाएं", "Yes, delete account")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
