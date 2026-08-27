import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { sendOtp, verifyOtp, createUser, addConsentRecord } from "../services/authService";

type Step = "contact" | "privacy" | "consent" | "otp" | "profile";

const SUPPORTED_LANGS = [
  { code: "hi", label: "हिन्दी", name: "Hindi" },
  { code: "en", label: "English", name: "English" },
  { code: "ta", label: "தமிழ்", name: "Tamil" },
  { code: "te", label: "తెలుగు", name: "Telugu" },
  { code: "bn", label: "বাংলা", name: "Bengali" },
  { code: "mr", label: "मराठी", name: "Marathi" },
  { code: "gu", label: "ગુજરાતી", name: "Gujarati" },
  { code: "kn", label: "ಕನ್ನಡ", name: "Kannada" },
];

export default function Signup() {
  const { t, login, lang } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("contact");
  const [contact, setContact] = useState("");
  const [prefLang, setPrefLang] = useState(lang);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [maskedDest, setMaskedDest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requiredConsent, setRequiredConsent] = useState(false);
  const [optionalNotif, setOptionalNotif] = useState(false);
  const [privacyRead, setPrivacyRead] = useState(false);

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.trim()) return;
    setStep("privacy");
  }

  async function handleConsent(e: React.FormEvent) {
    e.preventDefault();
    if (!requiredConsent) return;
    setLoading(true);
    const { masked } = await sendOtp(contact.trim());
    setMaskedDest(masked);
    setLoading(false);
    setStep("otp");
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) return;
    setLoading(true);
    setError("");
    const result = await verifyOtp(otp);
    if (result.success) {
      setStep("profile");
    } else {
      setError(result.error === "expired" ? t("OTP समाप्त।", "OTP expired.") : t("गलत OTP।", "Incorrect OTP."));
    }
    setLoading(false);
  }

  async function handleProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const user = createUser({ name: name.trim(), mobile: contact.includes("@") ? "" : contact, email: contact.includes("@") ? contact : email, preferredLanguage: prefLang });
    const langLabel = SUPPORTED_LANGS.find((l) => l.code === prefLang)?.name || "English";
    addConsentRecord({ userId: user.id, purpose: "Account authentication", noticeVersion: "v1.2", language: langLabel, status: "active", consentedAt: new Date().toISOString(), method: "OTP + affirmative consent" });
    if (optionalNotif) {
      addConsentRecord({ userId: user.id, purpose: "Optional notifications", noticeVersion: "v1.2", language: langLabel, status: "active", consentedAt: new Date().toISOString(), method: "Affirmative checkbox" });
    }
    login(user);
    setLoading(false);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4" style={{ background: "var(--primary)" }}>
            🎯
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{t("खाता बनाएं", "Create Account")}</h1>
          <div className="flex justify-center gap-1.5 mt-4">
            {(["contact", "privacy", "consent", "otp", "profile"] as Step[]).map((s, i) => (
              <div key={s} className={`h-1.5 rounded-full transition-all ${step === s ? "w-8 bg-indigo-600" : i < (["contact","privacy","consent","otp","profile"] as Step[]).indexOf(step) ? "w-4 bg-indigo-300" : "w-4 bg-gray-200"}`} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {step === "contact" && (
            <form onSubmit={handleStep1} className="space-y-4">
              <h2 className="font-semibold text-gray-900">{t("संपर्क विवरण", "Contact Details")}</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("मोबाइल नंबर या ईमेल", "Mobile number or email")}</label>
                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="9876543210 या email@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500" autoFocus required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("पसंदीदा भाषा", "Preferred language")}</label>
                <select value={prefLang} onChange={(e) => setPrefLang(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {SUPPORTED_LANGS.map((l) => <option key={l.code} value={l.code}>{l.label} — {l.name}</option>)}
                </select>
              </div>
              <button type="submit" disabled={!contact.trim()} className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {t("आगे", "Continue")}
              </button>
              <div className="text-center">
                <Link to="/login" className="text-sm text-indigo-600 hover:underline">{t("पहले से खाता है? लॉगिन करें", "Already have an account? Login")}</Link>
              </div>
            </form>
          )}

          {step === "privacy" && (
            <div className="space-y-4">
              <h2 className="font-semibold text-gray-900">{t("हम आपकी जानकारी का उपयोग कैसे करते हैं", "How we use your information")}</h2>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 space-y-2 text-sm text-gray-700">
                <p className="font-medium text-indigo-800">{t("आपका मोबाइल नंबर / ईमेल का उपयोग:", "We use your mobile number / email to:")}</p>
                <ul className="space-y-1 ml-2">
                  <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">✓</span><span>{t("आपका खाता बनाने और सुरक्षित करने के लिए", "create and secure your account")}</span></li>
                  <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">✓</span><span>{t("आपको प्रमाणित करने के लिए", "authenticate your login")}</span></li>
                  <li className="flex items-start gap-2"><span className="text-indigo-600 mt-0.5">✓</span><span>{t("आपकी शिकायतों तक पहुंच प्रदान करने के लिए", "provide access to your complaints")}</span></li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
                <p>{t("शिकायत जानकारी को पंजीकृत करने, वर्गीकृत करने, रूट करने और ट्रैक करने के लिए संसाधित किया जा सकता है।", "Complaint information may be processed to register, classify, route and track your complaint.")}</p>
                <p className="mt-2 text-xs text-gray-400">{t("AI सहायता का उपयोग शिकायतों को वर्गीकृत करने में मदद के लिए किया जाता है। केवल शिकायत विवरण साझा किया जाता है, व्यक्तिगत पहचान नहीं।", "AI assistance is used to classify complaints. Only complaint text is shared, not your personal identity.")}</p>
              </div>
              <div className="flex items-center justify-between">
                <Link to="/privacy" target="_blank" className="text-sm text-indigo-600 hover:underline font-medium">{t("पूरी गोपनीयता सूचना पढ़ें", "Read full Privacy Notice")}</Link>
                <span className="text-xs text-gray-400">v1.2 · 27 Aug 2026</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep("contact")} className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">{t("वापस", "Back")}</button>
                <button onClick={() => setStep("consent")} className="flex-2 flex-grow py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">{t("समझ गया", "Continue")}</button>
              </div>
            </div>
          )}

          {step === "consent" && (
            <form onSubmit={handleConsent} className="space-y-4">
              <h2 className="font-semibold text-gray-900">{t("सहमति", "Consent")}</h2>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{t("आवश्यक", "Required")}</p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={requiredConsent} onChange={(e) => setRequiredConsent(e.target.checked)} className="mt-0.5 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                    <span className="text-sm text-gray-700">{t("मैं अपना खाता बनाने और सुरक्षित करने के लिए आवश्यक प्रसंस्करण से सहमत हूं।", "I agree to processing necessary for creating and securing my account.")}</span>
                  </label>
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{t("वैकल्पिक", "Optional")}</p>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={optionalNotif} onChange={(e) => setOptionalNotif(e.target.checked)} className="mt-0.5 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                    <span className="text-sm text-gray-700">{t("मैं वैकल्पिक सूचनाएं प्राप्त करना चाहता/चाहती हूं (शिकायत अपडेट, टिप्स)।", "I want to receive optional notifications (complaint updates, tips).")}</span>
                  </label>
                </div>
              </div>
              <p className="text-xs text-gray-400">{t("सहमति कभी भी वापस ली जा सकती है। गोपनीयता केंद्र में जाएं।", "Consent can be withdrawn at any time from the Privacy Centre.")}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setStep("privacy")} className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">{t("वापस", "Back")}</button>
                <button type="submit" disabled={!requiredConsent || loading} className="flex-2 flex-grow py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {loading ? <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : t("OTP भेजें", "Send OTP")}
                </button>
              </div>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-sm text-gray-600">{t("OTP भेजा गया:", "OTP sent to:")} <span className="font-semibold">{maskedDest}</span></p>
                <p className="text-xs text-gray-400 mt-0.5">{t("Demo OTP: 123456", "Demo OTP: 123456")}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("6-अंकीय OTP", "6-digit OTP")}</label>
                <input type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="000000" className="w-full px-4 py-4 border border-gray-300 rounded-xl text-2xl text-center tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500" autoFocus />
              </div>
              {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">{error}</div>}
              <button type="submit" disabled={loading || otp.length !== 6} className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {loading ? <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : t("सत्यापित करें", "Verify")}
              </button>
            </form>
          )}

          {step === "profile" && (
            <form onSubmit={handleProfile} className="space-y-4">
              <h2 className="font-semibold text-gray-900">{t("बेसिक प्रोफाइल", "Basic Profile")}</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("पूरा नाम", "Full name")}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("जैसे: रमेश शर्मा", "e.g. Ramesh Sharma")} className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500" autoFocus required />
              </div>
              {!contact.includes("@") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("ईमेल (वैकल्पिक)", "Email (optional)")}</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              )}
              <button type="submit" disabled={!name.trim() || loading} className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {loading ? <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : t("डैशबोर्ड पर जाएं", "Continue to Dashboard")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
