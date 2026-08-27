import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { sendOtp, verifyOtp, findUserByContact } from "../services/authService";

type Step = "contact" | "otp";

const HERO_SLIDES = [
  {
    icon: "🎤",
    title: "CPGRAMS AI Chatbot",
    desc: "Now the Grievance can be lodged just by Voice based Utility tool. Currently supports 22 Eighth Schedule languages.",
  },
  {
    icon: "🚀",
    title: "AI-Enabled Smart Routing",
    desc: "Your complaint reaches the RIGHT department the FIRST TIME — no bouncing, no delays.",
  },
  {
    icon: "📡",
    title: "Real-Time Status Tracking",
    desc: "Track your grievance status 24×7 using your unique Registration ID from any device.",
  },
];

export default function Login() {
  const { t, login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/dashboard";
  const fromComplaint = redirectTo.includes("file-complaint");
  const [step, setStep] = useState<Step>("contact");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [maskedDest, setMaskedDest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

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
        navigate(redirectTo);
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

  const slide = HERO_SLIDES[slideIndex];

  return (
    <div className="min-h-[calc(100vh-180px)] flex" style={{ background: "var(--background)" }}>
      {/* ── LEFT: Hero Panel ── */}
      <div
        className="hidden md:flex flex-col justify-center flex-1 p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d1757 0%, #1a237e 60%, #1565c0 100%)" }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }} />

        <div className="relative z-10 max-w-md">
          <div className="text-6xl mb-5">{slide.icon}</div>
          <h2 className="text-2xl font-extrabold text-white mb-3">{slide.title}</h2>
          <p className="text-blue-200 text-sm leading-relaxed mb-8">{slide.desc}</p>

          {/* Slide dots */}
          <div className="flex gap-2 mb-10">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className="transition-all rounded-full"
                style={{
                  width: i === slideIndex ? "24px" : "8px",
                  height: "8px",
                  background: i === slideIndex ? "white" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>

          {/* Portal info */}
          <div className="border-t border-white/20 pt-6 space-y-2">
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <span>🏛️</span>
              <span>{t("प्रशासनिक सुधार और लोक शिकायत विभाग", "Dept. of Administrative Reforms & Public Grievances")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <span>🔒</span>
              <span>{t("OTP-आधारित सुरक्षित प्रमाणीकरण", "OTP-based secure authentication")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <span>🌐</span>
              <span>{t("22+ भारतीय भाषाएं समर्थित", "22+ Indian languages supported")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Login Form ── */}
      <div className="flex flex-col justify-center w-full md:w-[420px] md:flex-shrink-0 p-6 sm:p-10 bg-white border-l border-gray-200">
        <div className="mb-7">
          <div className="text-sm text-gray-500 mb-1">{t("CPGRAMS · भारत सरकार", "CPGRAMS · Govt of India")}</div>
          <h1 className="text-2xl font-extrabold text-gray-900">{t("उपयोगकर्ता लॉगिन", "User Login")}</h1>
          <p className="text-sm text-gray-500 mt-1">{t("मोबाइल नंबर / ईमेल / यूजरनेम से लॉगिन करें", "Login with Mobile / Email / Username")}</p>
        </div>

        {/* Redirect notice */}
        {fromComplaint && (
          <div className="mb-4 flex items-start gap-2 bg-orange-50 border border-orange-200 rounded px-3 py-3">
            <span className="text-orange-500 text-lg flex-shrink-0">🔒</span>
            <p className="text-xs text-orange-800 leading-relaxed">
              <strong>{t("लॉगिन आवश्यक है।", "Login Required.")}</strong>{" "}
              {t(
                "शिकायत दर्ज करने के लिए पंजीकृत उपयोगकर्ता होना ज़रूरी है। लॉगिन करने के बाद आपको वापस शिकायत फॉर्म पर भेजा जाएगा।",
                "You must be a registered user to lodge a grievance. After login you will be redirected back to the complaint form."
              )}
            </p>
          </div>
        )}


        {step === "contact" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="form-field">
              <label>{t("मोबाइल नंबर / ईमेल / यूजरनेम", "Mobile No / Email Id / Username")} <span className="req">*</span></label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={t("मोबाइल नंबर या ईमेल दर्ज करें", "Mobile No / Email Id / Username")}
                autoFocus
                required
              />
              <div className="field-hint">{t("Demo: rahul@example.com या priya@example.com", "Demo: rahul@example.com or priya@example.com")}</div>
            </div>

            {/* Proof-of-Work (PoW) Cryptographic CAPTCHA */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 bg-gray-50 dark:bg-[#111827] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {t("PoW क्रिप्टोग्राफिक सुरक्षा सत्यापित", "PoW Security Verified")}
                </span>
              </div>
              <Link to="/pow-demo" className="text-[#1a237e] dark:text-blue-300 font-semibold hover:underline text-[11px]">
                ALTCHA →
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || !contact.trim()}
              className="btn-gov-primary w-full"
              style={{ padding: "12px", fontSize: "14px", justifyContent: "center" }}
            >
              {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" /> : null}
              {t("OTP से लॉगिन करें", "Login with OTP")}
            </button>

            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">{t("या", "OR")}</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <Link
              to="/signup"
              className="btn-gov-secondary w-full text-center"
              style={{ padding: "10px", fontSize: "14px", justifyContent: "center" }}
            >
              {t("नया पंजीकरण करें", "Click here to Register")}
            </Link>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex items-center justify-center gap-3 text-xs text-gray-500">
              <Link to="/privacy" className="hover:underline text-blue-700 dark:text-blue-400">
                {t("गोपनीयता सूचना", "Privacy Notice")}
              </Link>
              <span>•</span>
              <Link to="/dpdp" className="hover:underline text-blue-700 dark:text-blue-400">
                {t("DPDP 2023", "DPDP 2023")}
              </Link>
              <span>•</span>
              <Link to="/disclaimer" className="hover:underline text-blue-700 dark:text-blue-400">
                {t("अस्वीकरण", "Disclaimer")}
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
              <p>{t("OTP भेजा गया:", "OTP sent to:")} <span className="font-bold">{maskedDest}</span></p>
              <p className="text-xs text-blue-600 mt-0.5">{t("Demo OTP: 123456", "Demo OTP: 123456")}</p>
            </div>

            <div className="form-field">
              <label>{t("6-अंकीय OTP दर्ज करें", "Enter 6-digit OTP")} <span className="req">*</span></label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="● ● ● ● ● ●"
                className="text-2xl text-center tracking-[0.6em] font-mono"
                style={{ letterSpacing: "0.5em" }}
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.length !== 6 || attempts >= 3}
              className="btn-gov-primary w-full"
              style={{ padding: "12px", fontSize: "14px", justifyContent: "center" }}
            >
              {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" /> : null}
              {t("सत्यापित करें और लॉगिन करें", "Verify & Login")}
            </button>

            <div className="flex justify-between items-center text-xs">
              <button type="button" onClick={() => { setStep("contact"); setOtp(""); setError(""); }} className="text-blue-700 hover:underline">
                {t("मोबाइल/ईमेल बदलें", "Change mobile/email")}
              </button>
              <button type="button" onClick={handleResend} disabled={resendCooldown > 0} className="text-blue-700 hover:underline disabled:text-gray-400">
                {resendCooldown > 0 ? `${t("पुनः भेजें", "Resend")} (${resendCooldown}s)` : t("OTP पुनः भेजें", "Resend OTP")}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-xs text-gray-400 mt-6 border-t border-gray-100 pt-4">
          {t("यह साइट NIC, MeitY, GOI द्वारा डिज़ाइन और होस्ट की गई है।", "This site is designed, developed & hosted by NIC, Ministry of Electronics & IT (MeitY), Govt of India.")}
        </p>
      </div>
    </div>
  );
}
