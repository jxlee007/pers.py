import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Landing() {
  const { t, setLang, lang } = useApp();

  const stats = [
    { label: t("शिकायतें दर्ज", "Complaints Filed"), value: "2.4 करोड़", valueEn: "24M+", icon: "📋" },
    { label: t("AI सटीकता", "AI Accuracy"), value: "94%", valueEn: "94%", icon: "🎯" },
    { label: t("पहली बार सही रूटिंग", "First-Time Correct Routing"), value: "89%", valueEn: "89%", icon: "✅" },
    { label: t("औसत समाधान", "Avg. Resolution"), value: "18 दिन", valueEn: "18 Days", icon: "⚡" },
  ];

  const categories = [
    { icon: "🏦", label: t("पेंशन / EPF", "Pension / EPF"), type: "pension" },
    { icon: "📊", label: t("आयकर", "Income Tax"), type: "tax" },
    { icon: "🚗", label: t("ड्राइविंग लाइसेंस", "Driving License"), type: "license" },
    { icon: "🆔", label: t("आधार", "Aadhaar"), type: "aadhaar" },
    { icon: "🛣️", label: t("सड़क / PWD", "Roads / PWD"), type: "road" },
    { icon: "🚂", label: t("रेलवे", "Railway"), type: "railway" },
    { icon: "🧾", label: t("GST", "GST"), type: "gst" },
    { icon: "📢", label: t("अन्य", "Other"), type: "other" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Language selection banner */}
      <div className="bg-indigo-600 text-white py-2 px-4 text-center text-sm">
        <span className="mr-4">{t("भाषा बदलें:", "Switch language:")}</span>
        <button onClick={() => setLang("hi")} className={`mr-3 font-semibold underline-offset-2 ${lang === "hi" ? "underline" : "opacity-70 hover:opacity-100"}`}>
          🇮🇳 हिंदी
        </button>
        <button onClick={() => setLang("en")} className={`font-semibold underline-offset-2 ${lang === "en" ? "underline" : "opacity-70 hover:opacity-100"}`}>
          🇬🇧 English
        </button>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-300 blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                🇮🇳 {t("भारत सरकार · DARPG", "Government of India · DARPG")}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                {t("CPGRAMS AI", "CPGRAMS AI")}{" "}
                <span className="text-yellow-300">{t("स्मार्ट", "Smart")}</span>{" "}
                {t("शिकायत राउटर", "Complaint Router")}
              </h1>

              <p className="text-lg sm:text-xl text-indigo-100 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {t(
                  "आपकी शिकायत पहली बार ही सही विभाग तक पहुंचती है। AI तकनीक से बनी — किसान, मजदूर, सभी के लिए।",
                  "Your grievance reaches the RIGHT department the FIRST TIME. Powered by AI — designed for every Indian citizen."
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/file-complaint"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl text-lg hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  ✍️ {t("शिकायत दर्ज करें", "File a Complaint")}
                </Link>
                <Link
                  to="/how-it-works"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white font-semibold rounded-xl text-lg hover:bg-white/25 transition-colors border border-white/30"
                >
                  🎯 {t("यह कैसे काम करता है?", "How It Works?")}
                </Link>
              </div>
            </div>

            {/* Hero card preview */}
            <div className="flex-1 max-w-sm w-full">
              <div className="bg-white rounded-2xl shadow-2xl p-6 text-gray-900">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-xs text-gray-400 ml-2">AI Routing Preview</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-4 border">
                  "My pension hasn't arrived for 3 months..."
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <span className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
                  AI analyzing complaint...
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                    ✅ EPFO — {t("पेंशन प्रभाग", "Pension Division")}
                  </div>
                  <div className="text-xs text-emerald-600">Confidence: 96% · 1800-180-1111</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {t("EPF पेंशन केवल EPFO संभालता है।", "EPF pension is solely handled by EPFO.")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-4">
                <div className="text-3xl mb-1">{s.icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700">{lang === "hi" ? s.value : s.valueEn}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison: Old vs New */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
          {t("क्या बदला?", "What Changed?")}
        </h2>
        <p className="text-gray-500 text-center mb-10">{t("पुराना बनाम नया — रात और दिन का फर्क", "Old vs. New — Night and Day Difference")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old System */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-red-700 font-bold text-lg mb-5">
              ❌ {t("पुराना सिस्टम", "OLD SYSTEM")}
            </div>
            <ol className="space-y-3">
              {[
                t("शिकायत टाइप करो", "Type complaint"),
                t("कीवर्ड मिलान → गलत विभाग", "Keyword match → Wrong dept"),
                t("विभाग 2 को उछाल दिया गया", "Bounce to dept 2"),
                t("विभाग 3 को उछाल दिया गया", "Bounce to dept 3"),
                t("3 महीने बाद छोड़ दिया", "Abandoned after 3 months"),
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-200 text-red-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-red-800">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 text-sm text-red-600 font-semibold">
              ⏱️ {t("औसत समय: 15 मिनट भरने + 3 महीने इंतजार", "Avg time: 15 min to fill + 3 months waiting")}
            </div>
          </div>

          {/* New System */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-lg mb-5">
              ✅ {t("नया AI सिस्टम", "NEW AI SYSTEM")}
            </div>
            <ol className="space-y-3">
              {[
                t("शिकायत बोलो या टाइप करो", "Speak or type complaint"),
                t("AI असली समस्या समझता है", "AI understands actual problem"),
                t("सही विभाग को रूट करता है", "Routes to CORRECT dept"),
                t("पहली बार में समाधान", "Gets resolved first time"),
                t("हफ्तों में समाधान", "Resolved in weeks"),
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-emerald-800">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 text-sm text-emerald-600 font-semibold">
              ⚡ {t("औसत समय: 3-5 मिनट भरना + 18 दिन समाधान", "Avg time: 3-5 min to file + 18 day resolution")}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            {t("किस विषय की शिकायत है?", "What's Your Complaint About?")}
          </h2>
          <p className="text-gray-500 text-center text-sm mb-8">{t("एक चुनें और शुरू करें", "Choose a category to get started")}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.type}
                to={`/file-complaint?type=${cat.type}`}
                className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-400 hover:shadow-md transition-all text-center group"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-700">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6" style={{ background: "#EEF2FF" }}>
          🎯
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("CPGRAMS AI के बारे में", "About CPGRAMS AI")}</h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-4">
          {t(
            "वर्तमान CPGRAMS कठोर कीवर्ड मिलान का उपयोग करता है जिससे शिकायतें गलत विभागों में चली जाती हैं। हमारा AI वास्तविक समस्या को पढ़ता है और पहली बार में सही मंत्रालय को रूट करता है।",
            "Current CPGRAMS uses rigid keyword matching that bounces complaints between wrong departments. Our AI reads the actual problem and routes to the correct ministry on first submission — no bouncing, no delays."
          )}
        </p>
        <p className="text-gray-500 text-base">
          {t("7 करोड़ भारतीयों के लिए — डिजिटल साक्षरता की जरूरत नहीं।", "Designed for 70 million Indians — no digital literacy required.")}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/file-complaint"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg"
            style={{ background: "var(--primary)" }}
          >
            ✍️ {t("अभी शिकायत दर्ज करें", "File Complaint Now")}
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-gray-700 text-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            📋 {t("मेरे केस देखें", "View My Cases")}
          </Link>
        </div>
      </section>
    </div>
  );
}
