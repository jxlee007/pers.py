import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { sendOtp, verifyOtp, findUserByContact } from "../services/authService";

type Step = "contact" | "otp";

export default function Login() {
  const { t, login } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("contact");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [maskedDest, setMaskedDest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.trim()) return;
    setLoading(true);
    setError("");
    const { masked } = await sendOtp(contact.trim());
    setMaskedDest(masked);
    setLoading(false);
    setStep("otp");
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) return;
    if (attempts >= 3) {
      setError(t("बहुत अधिक प्रयास। कृपया बाद में पुनः प्रयास करें।", "Too many attempts. Please try again later."));
      return;
    }
    setLoading(true);
    setError("");
    const result = await verifyOtp(otp);
    if (result.success) {
      const user = findUserByContact(contact.trim());
      if (user) {
        login(user);
        navigate("/dashboard");
      } else {
        navigate("/signup");
      }
    } else {
      setAttempts((a) => a + 1);
      if (result.error === "expired") {
        setError(t("OTP समाप्त हो गया। पुनः भेजें।", "OTP expired. Please resend."));
      } else if (attempts >= 2) {
        setError(t("बहुत अधिक प्रयास। 10 मिनट प्रतीक्षा करें।", "Too many attempts. Wait 10 minutes."));
      } else {
        setError(t(`गलत OTP। ${3 - attempts - 1} प्रयास शेष।`, `Incorrect OTP. ${3 - attempts - 1} attempt(s) left.`));
      }
    }
    setLoading(false);
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    setLoading(true);
    setError("");
    await sendOtp(contact.trim());
    setLoading(false);
    setOtp("");
    setResendCooldown(30);
    const interval = setInterval(() => {
      setResendCooldown((c) => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4" style={{ background: "var(--primary)" }}>
            🎯
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{t("वापस स्वागत है", "Welcome back")}</h1>
          <p className="text-gray-500 mt-1 text-sm">{t("अपने खाते में लॉगिन करें", "Sign in to your account")}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {step === "contact" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {t("मोबाइल नंबर या ईमेल", "Mobile number or email")}
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t("उदा. 9876543210 या rahul@example.com", "e.g. 9876543210 or rahul@example.com")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  autoFocus
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{t("Demo: rahul@example.com या priya@example.com", "Demo: rahul@example.com or priya@example.com")}</p>
              </div>

              <button
                type="submit"
                disabled={loading || !contact.trim()}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                {t("OTP भेजें", "Send OTP")}
              </button>

              <div className="text-center space-y-2 pt-2">
                <Link to="/signup" className="block text-sm text-indigo-600 hover:underline font-medium">
                  {t("नया खाता बनाएं", "Create account")}
                </Link>
                <Link to="/privacy" className="block text-xs text-gray-500 hover:underline">
                  {t("गोपनीयता सूचना", "Privacy Notice")}
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-sm text-gray-600">
                  {t("OTP भेजा गया:", "OTP sent to:")} <span className="font-semibold text-gray-900">{maskedDest}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{t("Demo OTP: 123456", "Demo OTP: 123456")}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {t("6-अंकीय OTP दर्ज करें", "Enter 6-digit OTP")}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl text-2xl text-center tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.length !== 6 || attempts >= 3}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                {t("सत्यापित करें और लॉगिन करें", "Verify & Login")}
              </button>

              <div className="flex justify-between items-center text-sm">
                <button
                  type="button"
                  onClick={() => { setStep("contact"); setOtp(""); setError(""); }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {t("मोबाइल/ईमेल बदलें", "Change mobile/email")}
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className="text-indigo-600 hover:underline disabled:text-gray-400 disabled:no-underline font-medium"
                >
                  {resendCooldown > 0 ? `${t("पुनः भेजें", "Resend")} (${resendCooldown}s)` : t("OTP पुनः भेजें", "Resend OTP")}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          {t("CPGRAMS AI · भारत सरकार · DARPG", "CPGRAMS AI · Government of India · DARPG")}
        </p>
      </div>
    </div>
  );
}
