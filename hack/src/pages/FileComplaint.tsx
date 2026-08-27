import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { classifyComplaint } from "../services/llmRouter";
import { testComplaints } from "../data/mockData";
import Button from "../components/Button";

type Mode = "idle" | "recording" | "processing" | "done";

export default function FileComplaint() {
  const { t, setRoutingResult, setComplaintText: setGlobalText, complaintText: globalText, apiKey } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [text, setText] = useState(globalText || "");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<Mode>("idle");
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(12).fill(6));
  const [recordTime, setRecordTime] = useState(0);
  const [preview, setPreview] = useState<{ ministry: string; confidence: number; icon: string } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const starterType = searchParams.get("type");

  useEffect(() => {
    if (starterType) {
      const starters: Record<string, string> = {
        pension: t("मेरी पेंशन 3 महीने से नहीं आई है...", "My pension hasn't arrived for 3 months..."),
        tax: t("ITR दाखिल किया लेकिन रिफंड नहीं आया...", "Filed ITR but refund is still pending..."),
        license: t("ड्राइविंग लाइसेंस 6 महीने से लंबित है...", "Driving license pending for 6 months..."),
        aadhaar: t("आधार नामांकन अस्वीकृत हुआ...", "Aadhaar enrollment was rejected..."),
        road: t("सड़क की मरम्मत नहीं हुई...", "Road repair not done despite sanction..."),
        railway: t("IRCTC टिकट रिफंड नहीं मिला...", "IRCTC ticket refund not received..."),
        gst: t("GST रिटर्न अपलोड विफल हुई...", "GST return upload failed..."),
        other: "",
      };
      if (starters[starterType]) setText(starters[starterType]);
    }
  }, [starterType]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (waveRef.current) clearInterval(waveRef.current);
    };
  }, []);

  function startRecording() {
    setMode("recording");
    setRecordTime(0);
    timerRef.current = setInterval(() => setRecordTime((t) => t + 1), 1000);
    waveRef.current = setInterval(() => {
      setWaveHeights(Array(12).fill(0).map(() => 6 + Math.random() * 36));
    }, 120);
  }

  function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (waveRef.current) clearInterval(waveRef.current);
    setMode("idle");
    const sample = testComplaints[Math.floor(Math.random() * testComplaints.length)];
    setText(sample.text);
  }

  function formatTime(s: number) {
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }

  async function handleSubmit() {
    if (text.trim().length < 20) return;
    setMode("processing");
    try {
      const result = await classifyComplaint(text, apiKey || undefined);
      setGlobalText(text);
      setRoutingResult(result);
      navigate("/routing-result");
    } catch {
      setMode("idle");
    }
  }

  function loadSample(sample: typeof testComplaints[0]) {
    setText(sample.text);
  }

  const charCount = text.length;
  const maxChars = 1000;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t("शिकायत दर्ज करें", "File a New Complaint")}
          </h1>
          <p className="text-gray-500 mt-1">
            {t("सादे भाषा में अपनी समस्या बताएं — AI सही विभाग ढूंढेगा।", "Describe your problem in plain language — AI finds the right department.")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-5">
            {/* Voice input */}
            {mode === "recording" ? (
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white text-center">
                <div className="text-5xl mb-4 pulse-icon inline-block">🎤</div>
                <div className="font-bold text-xl mb-2">{t("बोलते रहो...", "Keep speaking...")}</div>
                <div className="text-indigo-200 text-sm mb-4">{formatTime(recordTime)}</div>

                {/* Waveform */}
                <div className="flex items-end justify-center gap-1 h-12 mb-6 bg-white/10 rounded-lg px-4 py-2">
                  {waveHeights.map((h, i) => (
                    <div key={i} className="wave-bar flex-1" style={{ height: `${h}px`, background: "rgba(255,255,255,0.8)" }} />
                  ))}
                </div>

                <button
                  onClick={stopRecording}
                  className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-lg transition-colors"
                >
                  ⏹️ {t("रिकॉर्डिंग बंद करो", "Stop Recording")}
                </button>
              </div>
            ) : (
              <button
                onClick={startRecording}
                className="w-full flex items-center gap-4 p-5 bg-white border-2 border-dashed border-indigo-300 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0 bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
                  🎤
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-lg">{t("आवाज़ से बताएं", "Speak Your Problem")}</div>
                  <div className="text-sm text-gray-500">{t("टैप करें और हिंदी/English में बोलें", "Tap to speak in Hindi or English")}</div>
                </div>
              </button>
            )}

            {/* OR divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400 font-medium">{t("या", "OR")}</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Text input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("शिकायत लिखें", "Write Your Complaint")}
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, maxChars))}
                placeholder={t(
                  "मेरी पेंशन 3 महीने से नहीं आई है। मैं EPFO सदस्य हूं और...",
                  "My pension hasn't arrived for 3 months. I am an EPFO member and..."
                )}
                className="w-full h-40 sm:h-52 px-4 py-3 border-2 border-gray-200 rounded-xl text-base resize-none outline-none focus:border-indigo-500 transition-colors leading-relaxed"
                style={{ fontSize: "16px" }}
              />
              <div className="flex justify-between items-center mt-1">
                <span className={`text-xs ${charCount < 20 ? "text-red-500" : "text-gray-400"}`}>
                  {charCount < 20 ? t(`कम से कम 20 अक्षर (${20 - charCount} और)`, `Min 20 chars (${20 - charCount} more)`) : t(`${charCount}/${maxChars} अक्षर`, `${charCount}/${maxChars} chars`)}
                </span>
                <button
                  onClick={() => setText("")}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  {t("साफ़ करें", "Clear")}
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("ईमेल (ट्रैकिंग के लिए)", "Email for Tracking")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("आपका ईमेल", "your@email.com")}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-indigo-500 transition-colors"
                style={{ fontSize: "16px" }}
              />
            </div>

            {/* API Key (optional) */}
            <details className="bg-white border border-gray-200 rounded-xl">
              <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900">
                ⚙️ {t("OpenAI API Key (वैकल्पिक)", "OpenAI API Key (Optional)")}
              </summary>
              <div className="px-4 pb-4">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => {
                    localStorage.setItem("openai_key", e.target.value);
                  }}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-400 mt-2"
                />
                <p className="text-xs text-gray-400 mt-1">{t("बिना API key के mock data का उपयोग होता है।", "Without API key, smart mock routing is used.")}</p>
              </div>
            </details>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={text.trim().length < 20}
              loading={mode === "processing"}
              loadingText={t("🤖 AI विश्लेषण कर रहा है...", "🤖 AI is analyzing your complaint...")}
              size="lg"
              fullWidth
            >
              🎯 {t("विश्लेषण करें और रूट करें", "Analyze & Route Complaint")}
            </Button>
          </div>

          {/* Right: Sample complaints + preview */}
          <div className="space-y-5">
            {/* Live preview */}
            {preview && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 animate-pulse-in">
                <div className="font-semibold text-emerald-800 mb-2">🔮 {t("पूर्वावलोकन", "Live Preview")}</div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{preview.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900">{preview.ministry}</div>
                    <div className="text-sm text-gray-500">Confidence: {Math.round(preview.confidence * 100)}%</div>
                  </div>
                </div>
              </div>
            )}

            {/* Sample complaints */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-800 mb-4 text-sm">
                💡 {t("उदाहरण शिकायतें — क्लिक करके लोड करें", "Sample Complaints — Click to Load")}
              </h3>
              <div className="space-y-2">
                {testComplaints.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => loadSample(sample)}
                    className="w-full text-left px-3 py-3 rounded-lg bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 border border-transparent transition-all text-sm text-gray-700 leading-snug"
                  >
                    "{sample.text.slice(0, 80)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* What AI checks */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
              <h3 className="font-semibold text-indigo-800 mb-3 text-sm">
                🤖 {t("AI क्या देखता है?", "What AI Analyzes")}
              </h3>
              <ul className="space-y-2">
                {[
                  t("असली समस्या (कीवर्ड नहीं)", "Actual problem (not keywords)"),
                  t("सही मंत्रालय/विभाग", "Correct ministry/department"),
                  t("आत्मविश्वास स्कोर (0-100%)", "Confidence score (0-100%)"),
                  t("गलत रूटिंग क्यों होती थी", "Why old system would fail"),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-indigo-700">
                    <span className="text-indigo-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
