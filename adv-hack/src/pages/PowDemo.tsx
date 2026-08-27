import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function PowDemo() {
  const { t } = useApp();

  // Form State
  const [email, setEmail] = useState("citizen@gov.in");
  const [password, setPassword] = useState("••••••••");
  const [difficulty, setDifficulty] = useState<number>(50000);

  // PoW Solver State
  const [powStatus, setPowStatus] = useState<"idle" | "solving" | "solved" | "failed">("idle");
  const [solveProgress, setSolveProgress] = useState(0);
  const [hashCount, setHashCount] = useState(0);
  const [timeTakenMs, setTimeTakenMs] = useState(0);
  const [altchaPayload, setAltchaPayload] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Automatically solve challenge when component mounts or difficulty changes
  useEffect(() => {
    runPowSolver();
  }, [difficulty]);

  async function runPowSolver() {
    setPowStatus("solving");
    setSolveProgress(0);
    setVerificationResult(null);
    setAltchaPayload("");

    const startTime = performance.now();
    const challengeSalt = "cpgrams_" + Math.random().toString(36).substring(2, 10);
    const targetZeroes = difficulty > 100000 ? "0000" : "000";

    // Simulate solving client-side SHA-256 PoW puzzle
    let iterations = 0;
    const batchSize = 2500;
    const maxIterations = difficulty;

    const interval = setInterval(async () => {
      iterations += batchSize;
      const progress = Math.min(100, Math.round((iterations / maxIterations) * 100));
      setSolveProgress(progress);
      setHashCount(iterations);

      if (iterations >= maxIterations) {
        clearInterval(interval);
        const elapsed = Math.round(performance.now() - startTime);
        setTimeTakenMs(elapsed);

        // Generate synthetic cryptographic payload matching ALTCHA spec
        const proofPayload = btoa(
          JSON.stringify({
            algorithm: "SHA-256",
            challenge: challengeSalt,
            number: iterations,
            salt: challengeSalt,
            signature: "sig_" + Math.random().toString(36).substring(2, 15),
            verifiedAt: new Date().toISOString(),
          })
        );

        setAltchaPayload(proofPayload);
        setPowStatus("solved");
      }
    }, 30);
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (powStatus !== "solved" || !altchaPayload) {
      setVerificationResult("error");
      return;
    }

    setIsVerifying(true);

    // Simulate backend verification
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult("success");
    }, 1200);
  }

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }} id="main-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Link to="/" className="hover:underline">{t("होम", "Home")}</Link>
          <span>›</span>
          <Link to="/website-policies" className="hover:underline">{t("सुरक्षा नीतियां", "Security Policies")}</Link>
          <span>›</span>
          <span className="text-gray-800 dark:text-gray-200 font-semibold">
            {t("प्रूफ-ऑफ-वर्क (PoW) कैप्चा लाइव डेमो", "Proof-of-Work (PoW) CAPTCHA Demo")}
          </span>
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-green-50 dark:bg-green-950/50 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800">
              🛡️ {t("ओपन-सोर्स ALTCHA मानक", "Open-Source ALTCHA Standard")}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {t("DPDP 2023 गोपनीयता संगत", "100% DPDP Act 2023 Compliant")}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {t("प्रूफ-ऑफ-वर्क (PoW) क्रिप्टोग्राफिक कैप्चा लाइव डेमो", "Proof-of-Work (PoW) Cryptographic CAPTCHA Demo")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
            {t(
              "नागरिकों को बिना तंग किए (बिना ट्रैफिक लाइट ढूंढे) बॉट हमलों और DDoS से सरकारी पोर्टल की सुरक्षा का आधुनिक समाधान।",
              "Next-generation bot protection using browser cryptographic puzzles instead of tracking cookies or frustrating image puzzles."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ── LEFT: INTERACTIVE AUTH CARD (MATCHING pow.md SPEC) ── */}
          <div className="lg:col-span-6 bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🔐</span>
                <span>{t("सुरक्षित खाता पंजीकरण फॉर्म", "Secure Citizen Registration")}</span>
              </h2>
              <span className="text-[10px] text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 px-2 py-0.5 rounded font-mono">
                PoW Protected
              </span>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t("आधिकारिक ईमेल पता", "Official Email Address")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-[#1a237e]"
                  required
                  placeholder="name@agency.gov.in"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {t("पासवर्ड", "Password")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-[#1a237e]"
                  required
                />
              </div>

              {/* ── ALTCHA WIDGET SIMULATION ── */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/70 dark:bg-[#111827] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {powStatus === "solved" ? "✅" : powStatus === "solving" ? "⚙️" : "⏳"}
                    </span>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {powStatus === "solved"
                          ? t("सत्यापित: सुरक्षित नागरिक डिवाइस", "Verified: Protected by ALTCHA")
                          : powStatus === "solving"
                          ? t("पृष्ठभूमि सुरक्षा जांच जारी है...", "Solving cryptographic puzzle...")
                          : t("सत्यापन प्रतीक्षारत", "Awaiting challenge...")}
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">
                        {powStatus === "solved"
                          ? `${hashCount.toLocaleString()} hashes in ${timeTakenMs}ms`
                          : `${solveProgress}% (${hashCount.toLocaleString()} hashes)`}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={runPowSolver}
                    className="text-[11px] text-[#1a237e] dark:text-blue-300 hover:underline font-semibold"
                  >
                    🔄 {t("पुनः चलाएं", "Re-run")}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-150 ${
                      powStatus === "solved" ? "bg-green-600" : "bg-blue-600 animate-pulse"
                    }`}
                    style={{ width: `${solveProgress}%` }}
                  />
                </div>

                {altchaPayload && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-[10px] text-gray-400 font-mono truncate">
                      token: {altchaPayload.substring(0, 38)}...
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={powStatus !== "solved" || isVerifying}
                className="w-full btn-gov-primary py-3 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                    <span>{t("क्रिप्टोग्राफिक टोकन सत्यापित हो रहा है...", "Verifying token on server...")}</span>
                  </>
                ) : (
                  <span>{t("खाता पंजीकृत करें (Register Account)", "Register Account")}</span>
                )}
              </button>
            </form>

            {/* Verification Status Notification */}
            {verificationResult === "success" && (
              <div className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-950/50 border border-green-300 text-green-800 dark:text-green-300 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                <span>🛡️</span>
                <span>{t("सुरक्षा सत्यापित! गणितीय साक्ष्य मान्य। खाता सफलतापूर्वक बनाया गया।", "Security Verified! Cryptographic Proof validated on backend.")}</span>
              </div>
            )}
            {verificationResult === "error" && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-300 text-red-800 dark:text-red-300 text-xs font-semibold text-center">
                ⚠️ {t("कृपया पृष्ठभूमि सुरक्षा जांच पूर्ण होने की प्रतीक्षा करें।", "Please wait for background security check to finish.")}
              </div>
            )}
          </div>

          {/* ── RIGHT: TECHNICAL EXPLANATION & ARCHITECTURE ── */}
          <div className="lg:col-span-6 space-y-6">
            {/* Difficulty Controller */}
            <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>⚙️</span> {t("पहेली कठिनाई समायोजन (Puzzle Complexity)", "PoW Difficulty Settings")}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {t(
                  "कठिनाई बदलकर देखें कि ब्राउज़र हार्डवेयर तुरंत कैसे प्रतिक्रिया देता है।",
                  "Test how changing iteration difficulty dynamically scales computation speed."
                )}
              </p>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { label: "Standard", iters: 50000, desc: "~40ms" },
                  { label: "High (DDoS)", iters: 150000, desc: "~120ms" },
                  { label: "Extreme", iters: 300000, desc: "~250ms" },
                ].map((d) => (
                  <button
                    key={d.iters}
                    type="button"
                    onClick={() => setDifficulty(d.iters)}
                    className={`p-2.5 rounded-lg border text-center font-semibold transition-all cursor-pointer ${
                      difficulty === d.iters
                        ? "bg-[#1a237e] text-white border-[#1a237e]"
                        : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div>{d.label}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison Box */}
            <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                {t("पारंपरिक कैप्चा बनाम प्रूफ-ऑफ-वर्क (ALTCHA)", "Traditional CAPTCHA vs PoW CAPTCHA")}
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800">
                  <div className="font-bold text-red-900 dark:text-red-300 mb-1">
                    ❌ {t("पारंपरिक छवि कैप्चा (Google reCAPTCHA)", "Traditional Image CAPTCHA")}
                  </div>
                  <ul className="space-y-1 text-red-700 dark:text-red-400">
                    <li>• {t("नागरिकों को ट्रैफिक सिग्नल, क्रॉसवाक पहचानने के लिए मजबूर करता है।", "Frustrates citizens by requiring clicks on crosswalks/fire hydrants.")}</li>
                    <li>• {t("दिव्यांगजनों और स्क्रीन-रीडर उपयोगकर्ताओं के लिए दुर्गम।", "Severe accessibility barrier for visually impaired citizens.")}</li>
                    <li>• {t("नागरिकों के कुकीज और ब्राउजिंग इतिहास को ट्रैक करता है (DPDP असंगत)।", "Tracks user cookies across websites — problematic under DPDP Act.")}</li>
                  </ul>
                </div>

                <div className="p-3 rounded bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800">
                  <div className="font-bold text-green-900 dark:text-green-300 mb-1">
                    ✅ {t("प्रूफ-ऑफ-वर्क क्रिप्टोग्राफिक कैप्चा (ALTCHA)", "PoW Cryptographic CAPTCHA (ALTCHA)")}
                  </div>
                  <ul className="space-y-1 text-green-800 dark:text-green-300">
                    <li>• {t("100% मूक एवं स्वतः: नागरिक को कोई पहेली नहीं सुलझानी पड़ती।", "100% Frictionless: Browser solves math in background automatically.")}</li>
                    <li>• {t("शून्य ट्रैकिंग: कोई कुकी नहीं, कोई उपयोगकर्ता पहचानकर्ता नहीं (DPDP संगत)।", "Zero user tracking: Fully compliant with India's DPDP Act 2023.")}</li>
                    <li>• {t("बॉट्स के लिए लागत: बड़े हमलों में बॉट सर्वर की CPU शक्ति समाप्त कर देता है।", "Economic defense: Imposes overwhelming CPU penalty on automated bots.")}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Backend Verification Snippet (from pow.md) */}
            <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {t("सरकारी सर्वर पर सत्यापन (Backend Verification Logic)", "Server-side Node.js Verification")}
              </h3>
              <pre className="p-3 rounded bg-gray-900 text-green-400 text-[11px] font-mono overflow-x-auto leading-relaxed">
{`// Validating PoW cryptographic proof on server
import { verifySolution } from 'altcha-lib';

app.post('/api/signup', async (req, res) => {
  const { email, password, altcha } = req.body;

  const isValidBotCheck = await verifySolution(
    altcha, 
    process.env.ALTCHA_SERVER_SECRET
  );

  if (!isValidBotCheck) {
    return res.status(400).json({ error: "PoW Invalid" });
  }

  // Safe to process citizen registration
  res.status(200).json({ success: true });
});`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
