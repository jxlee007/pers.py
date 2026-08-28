import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const TICKER_MESSAGES = [
  "Any grievance sent by email will not be attended to / entertained. Please lodge your grievance on this portal only.",
  "शिकायत अब आवाज़-आधारित AI टूल से भी दर्ज की जा सकती है। | Grievances can now be lodged via Voice-based AI Tool.",
  "Government is not charging any fee from the public for filing grievances.",
];

export default function Landing() {
  const { t, setLang, lang } = useApp();
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % TICKER_MESSAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: t("कुल शिकायतें", "Total Grievances Filed"), value: "2,47,83,104", icon: "📋", color: "#1a237e" },
    { label: t("AI रूटिंग सटीकता", "AI Routing Accuracy"), value: "94%", icon: "🎯", color: "#2e7d32" },
    { label: t("पहली बार सही रूटिंग", "First-Time Correct Routing"), value: "89%", icon: "✅", color: "#006064" },
    { label: t("औसत समाधान", "Avg. Resolution Time"), value: t("18 दिन", "18 Days"), icon: "⚡", color: "#e65100" },
  ];

  const journey = [
    {
      step: "01",
      title: t("पंजीकरण करें", "Register"),
      desc: t("मोबाइल नंबर या ईमेल से OTP के साथ पंजीकरण करें।", "Register using your mobile or email with OTP verification."),
      icon: "👤",
    },
    {
      step: "02",
      title: t("शिकायत दर्ज करें", "Lodge Grievance"),
      desc: t("अपनी समस्या हिंदी या English में टाइप करें या बोलें।", "Describe your problem in Hindi or English — type or speak."),
      icon: "✍️",
    },
    {
      step: "03",
      title: t("AI विश्लेषण", "AI Analysis"),
      desc: t("हमारा AI आपकी शिकायत पढ़कर सही मंत्रालय तय करता है।", "Our AI reads your complaint and identifies the correct ministry."),
      icon: "🤖",
    },
    {
      step: "04",
      title: t("स्थिति ट्रैक करें", "Track Status"),
      desc: t("पंजीकरण ID से शिकायत की स्थिति कभी भी देखें।", "Check your grievance status anytime using the registration ID."),
      icon: "📡",
    },
    {
      step: "05",
      title: t("समाधान / अपील", "Resolution / Appeal"),
      desc: t("समाधान न मिले तो अपील करें — हम जवाबदेह हैं।", "Not satisfied? File an appeal — we are accountable."),
      icon: "⚖️",
    },
  ];

  const whatsNew = [
    { date: "27 Jul 2022", title: "Strengthening of Machinery for Redressal of Public Grievance (CPGRAMS) PDF — 1.05 MB" },
    { date: "23 Aug 2024", title: "Comprehensive Guidelines for Handling the Public Grievances PDF — 0.25 MB" },
    { date: "21 Aug 2026", title: "CPGRAMS AI — Smart Routing System launched for faster grievance resolution" },
  ];

  const notTakenUp = [
    t("RTI मामले", "RTI Matters"),
    t("न्यायालय से संबंधित / Sub-judice मामले", "Court related / Sub-judice matters"),
    t("धार्मिक मामले", "Religious matters"),
    t("सरकारी कर्मचारियों की सेवा संबंधी शिकायतें (जब तक DoPT OM No. 11013/08/2013-Estt.(A-III) dated 31.08.2015 के अनुसार नहीं)", "Grievances of Govt employees regarding service matters unless prescribed channels exhausted per DoPT OM"),
  ];

  return (
    <div id="main-content" className="min-h-screen" style={{ background: "var(--background)" }}>

      {/* ── ANNOUNCEMENT TICKER ── */}
      <div className="ticker-strip">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 overflow-hidden">
          <span className="flex-shrink-0 bg-white text-red-700 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">
            {t("सूचना", "Notice")}
          </span>
          <div className="overflow-hidden flex-1 h-5 flex items-center">
            <span key={tickerIndex} className="ticker-inner">{TICKER_MESSAGES[tickerIndex]}</span>
          </div>
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #1565c0 100%)" }}
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full mb-5 uppercase tracking-wider"
                style={{ background: "rgba(255,111,0,0.25)", color: "#ffd54f", border: "1px solid rgba(255,213,79,0.4)" }}
              >
                🇮🇳 {t("भारत सरकार · DARPG · AI-सक्षम", "Government of India · DARPG · AI-Enabled")}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                {t("CPGRAMS", "CPGRAMS")}{" "}
                <span style={{ color: "#ffd54f" }}>{t("AI स्मार्ट", "AI Smart")}</span>
                <br className="hidden sm:block" />
                {t("शिकायत राउटर", "Grievance Router")}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0" style={{ color: "rgba(255,255,255,0.85)" }}>
                {t(
                  "अब आप अपनी शिकायत बोलचाल के माध्यम से आसानी से दर्ज कर सकते हैं। AI तकनीक से पहली बार सही विभाग तक पहुंचती है आपकी शिकायत।",
                  "Now the grievance can be lodged just by Voice based utility tool. AI ensures your complaint reaches the RIGHT department the FIRST TIME."
                )}
              </p>

              {/* CTA group */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/signup"
                  className="btn-gov-accent"
                  style={{ padding: "14px 32px", fontSize: "15px" }}
                >
                  👤 {t("पंजीकरण / लॉगिन करें", "Register / Login")}
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded text-sm"
                  style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)", color: "white" }}
                >
                  🔍 {t("शिकायत स्थिति देखें", "View Grievance Status")}
                </Link>
              </div>

              {/* Disclaimer note */}
              <p className="text-xs mt-5 opacity-70">
                ⚠️ {t(
                  "ईमेल द्वारा भेजी गई कोई भी शिकायत स्वीकार नहीं की जाएगी। कृपया इस पोर्टल पर दर्ज करें।",
                  "Grievances sent via email will not be attended. Please lodge only on this portal."
                )}
              </p>
            </div>

            {/* AI Demo Card */}
            <div className="flex-shrink-0 w-full max-w-sm">
              <div className="bg-white rounded text-gray-900 shadow-2xl overflow-hidden">
                <div className="px-4 py-3 flex items-center gap-2" style={{ background: "#1a237e" }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <span className="text-xs text-blue-200 ml-2 font-mono">CPGRAMS AI · Live Routing Demo</span>
                </div>
                <div className="p-4">
                  <div className="bg-gray-50 border rounded p-3 text-sm text-gray-600 mb-3">
                    "My pension hasn't arrived for 3 months. I am an EPFO member..."
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin inline-block" />
                    <span>AI analyzing complaint...</span>
                  </div>
                  <div className="ai-route-badge">
                    <div className="flex items-center gap-2 font-bold text-green-800 mb-1 text-sm">
                      ✅ EPFO — {t("पेंशन प्रभाग", "Pension Division")}
                    </div>
                    <div className="text-xs text-green-700">Confidence: 96% · Helpline: 1800-180-1111</div>
                    <div className="text-xs text-gray-500 mt-1.5">
                      {t("EPF पेंशन केवल EPFO संभालता है।", "EPF pension is solely handled by EPFO.")}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link
                      to="/file-complaint"
                      className="flex-1 text-center py-2.5 text-sm font-bold rounded text-white transition-colors"
                      style={{ background: "#1a237e" }}
                    >
                      {t("शिकायत दर्ज करें", "Lodge Grievance")}
                    </Link>
                    <Link
                      to="/how-it-works"
                      className="px-3 py-2.5 text-sm font-semibold rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      {t("और जानें", "Learn more")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 PRIMARY ACTION TILES (INC. TRANSPARENCY) ── */}
      <section className="py-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link to="/signup" className="action-tile">
              <div className="action-tile-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="16" fill="#e8eaf6"/>
                  <path d="M10 22v-1a6 6 0 0112 0v1" stroke="#1a237e" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="16" cy="12" r="4" stroke="#1a237e" strokeWidth="2"/>
                  <path d="M20 18l2 2 4-4" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">{t("पंजीकरण / लॉगिन", "Register / Login")}</div>
                <div className="text-xs text-gray-500 mt-0.5">{t("खाता बनाएं और शुरू करें", "Create account to get started")}</div>
              </div>
            </Link>

            <Link to="/dashboard" className="action-tile" style={{ borderTopColor: "#2e7d32" }}>
              <div className="action-tile-icon" style={{ background: "#e8f5e9" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="16" fill="#e8f5e9"/>
                  <circle cx="16" cy="16" r="8" stroke="#2e7d32" strokeWidth="2"/>
                  <path d="M12 16l3 3 5-5" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">{t("शिकायत स्थिति देखें", "View Status")}</div>
                <div className="text-xs text-gray-500 mt-0.5">{t("पंजीकरण ID से ट्रैक करें", "Track using Registration ID")}</div>
              </div>
            </Link>

            <Link to="/accountability" className="action-tile" style={{ borderTopColor: "#880e4f" }}>
              <div className="action-tile-icon" style={{ background: "#fce4ec" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="16" fill="#fce4ec"/>
                  <path d="M16 6v20M8 12l8-6 8 6M9 20l-3-6h6l-3 6zM23 20l-3-6h6l-3 6z" stroke="#880e4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base flex items-center justify-center gap-1">
                  <span>{t("पारदर्शिता एवं रैंकिंग", "Accountability")}</span>
                  <span className="text-[10px] bg-green-100 text-green-800 font-bold px-1.5 py-0.2 rounded">LIVE</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{t("राज्य व अधिकारी प्रदर्शन ऑडिट", "State & Officer Rankings")}</div>
              </div>
            </Link>

            <Link to="/help" className="action-tile" style={{ borderTopColor: "#e65100" }}>
              <div className="action-tile-icon" style={{ background: "#fff3e0" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="16" fill="#fff3e0"/>
                  <path d="M16 8a8 8 0 100 16A8 8 0 0016 8z" stroke="#e65100" strokeWidth="2"/>
                  <path d="M16 14a2 2 0 011.732 3c-.346.6-1.732 2-1.732 2" stroke="#e65100" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="16" cy="22" r="1" fill="#e65100"/>
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">{t("संपर्क एवं सहायता", "Contact & Help")}</div>
                <div className="text-xs text-gray-500 mt-0.5">{t("सहायता और हेल्पलाइन", "Helplines & FAQs")}</div>
              </div>
            </Link>
          </div>

          {/* Accountability High-Impact Strip */}
          <div className="mt-6 bg-blue-50/80 border border-blue-200 rounded p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-blue-900 bg-white border border-blue-200 px-2 py-0.5 rounded shadow-2xs">
                🏆 {t("राष्ट्रीय रैंकिंग लीडर:", "National Benchmark:")}
              </span>
              <span className="font-semibold text-gray-800">
                1. 🥇 {t("महाराष्ट्र", "Maharashtra")} (94% {t("वास्तविक समाधान", "real solutions")}, 9 {t("दिन", "days")})
              </span>
              <span className="text-gray-300 hidden md:inline">|</span>
              <span className="font-semibold text-gray-800">
                2. 🥈 {t("तेलंगाना", "Telangana")} (91%)
              </span>
              <span className="text-gray-300 hidden md:inline">|</span>
              <span className="font-semibold text-gray-800">
                3. 🥉 {t("दिल्ली", "Delhi")} (87%)
              </span>
            </div>

            <Link
              to="/accountability"
              className="text-[#1a237e] font-bold hover:underline flex items-center gap-1 flex-shrink-0"
            >
              <span>{t("सभी 36 राज्य एवं अधिकारी ऑडिट देखें", "View All 36 States & Officer Audits")}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT CPGRAMS + WHAT'S NEW ── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* About (2/3) */}
            <div className="lg:col-span-2">
              <h2 className="section-title text-lg">
                {t("CPGRAMS के बारे में", "About CPGRAMS")}
              </h2>
              <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                <p>
                  {t(
                    "Centralised Public Grievance Redress and Monitoring System (CPGRAMS) एक ऑनलाइन प्लेटफॉर्म है जो नागरिकों को 24×7 अपनी शिकायत दर्ज करने की सुविधा देता है। यह एकल पोर्टल भारत के सभी मंत्रालयों/विभागों से जुड़ा है।",
                    "Centralised Public Grievance Redress and Monitoring System (CPGRAMS) is an online platform available to the citizens 24×7 to lodge their grievances to the public authorities on any subject related to service delivery. It is a single portal connected to all the Ministries/Departments of Government of India and States."
                  )}
                </p>
                <p>
                  {t(
                    "CPGRAMS AI इस प्रणाली को AI-सक्षम रूटिंग के साथ अपग्रेड करता है — कीवर्ड मिलान की बजाय वास्तविक समस्या को समझकर पहली बार सही विभाग को शिकायत भेजता है।",
                    "CPGRAMS AI upgrades this system with AI-enabled routing — instead of keyword matching, it understands the actual problem and routes to the correct ministry on first submission, eliminating delays from wrong routing."
                  )}
                </p>
              </div>

              {/* Issues NOT taken up */}
              <div className="mt-6 bg-orange-50 dark:bg-amber-950/40 border border-orange-200 dark:border-amber-800/60 rounded p-4">
                <p className="text-sm font-semibold text-orange-800 dark:text-amber-300 mb-2">
                  ⚠️ {t("जिन मामलों पर शिकायत नहीं की जाती:", "Issues which are not taken up for redress:")}
                </p>
                <ul className="space-y-1">
                  {notTakenUp.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-orange-700 dark:text-amber-200">
                      <span className="mt-0.5 flex-shrink-0">▶</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Note */}
              <div className="mt-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded p-4">
                <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1">{t("नोट:", "Note:")}</p>
                <ol className="list-decimal list-inside space-y-1 text-xs text-blue-700 dark:text-blue-200">
                  <li>
                    {t(
                      "यदि आप DPOG के अधीन मंत्रालयों/विभागों से संतोषजनक निवारण नहीं पाते हैं, तो Cabinet Secretariat, GOI में DPG की सहायता ली जा सकती है।",
                      "If you have not got a satisfactory redress within reasonable time relating to Ministries/Departments under DPG purview, you may seek help of DPG in resolution."
                    )}
                  </li>
                  <li>
                    {t(
                      "Government is not charging fee from the public for filing grievances. All money being paid by the public for filing grievance is going only to M/s CSC only",
                      "Government is not charging fee from the public for filing grievances. All money being paid by the public for filing grievance is going only to M/s CSC only"
                    )}
                  </li>
                </ol>
              </div>
            </div>

            {/* What's New (1/3) */}
            <div>
              <h2 className="section-title text-lg">{t("नया क्या है?", "What's New")}</h2>
              <div className="space-y-3">
                {whatsNew.map((item, i) => (
                  <div key={i} className="flex gap-3 bg-gray-50 dark:bg-[#182236] border border-gray-200 dark:border-gray-700 rounded p-3 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-200 transition-colors cursor-pointer">
                    <div
                      className="flex-shrink-0 text-center rounded px-2 py-1 text-white text-xs font-bold leading-tight"
                      style={{ background: "var(--gov-navy)", minWidth: "52px" }}
                    >
                      {item.date.split(" ")[0]}<br />
                      <span className="font-normal text-blue-200">{item.date.split(" ").slice(1).join(" ")}</span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-8 border-t border-b border-gray-200 dark:border-gray-800" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-700">
            {stats.map((s) => (
              <div key={s.label} className="bg-white dark:bg-[#182236] text-center py-6 px-4">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIZEN JOURNEY ── */}
      <section className="py-14 bg-white dark:bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-title text-xl inline-block">
              {t("नागरिक यात्रा — शुरू से अंत तक", "Citizen Journey — End to End")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {t("5 सरल चरणों में अपनी शिकायत का समाधान पाएं", "Get your grievance resolved in 5 simple steps")}
            </p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div
              className="absolute top-10 left-0 right-0 h-0.5 hidden lg:block"
              style={{ background: "linear-gradient(to right, #1a237e, #2196f3, #1a237e)", zIndex: 0, margin: "0 8%" }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
              {journey.map((step) => (
                <div key={step.step} className="flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-4 border-4 bg-white dark:bg-[#182236] shadow-md"
                    style={{ borderColor: "var(--gov-navy)" }}
                  >
                    {step.icon}
                  </div>
                  <div
                    className="text-xs font-extrabold mb-1 px-2 py-0.5 rounded"
                    style={{ background: "var(--gov-navy)", color: "white" }}
                  >
                    STEP {step.step}
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white text-sm mb-1">{step.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Link to="/file-complaint" className="btn-gov-primary" style={{ padding: "13px 36px", fontSize: "15px" }}>
              ✍️ {t("अभी शिकायत दर्ज करें", "Lodge Grievance Now")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── OLD vs NEW COMPARISON ── */}
      <section className="py-12 bg-gray-50 dark:bg-[#0f172a] border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="section-title text-xl inline-block">{t("क्या बदला?", "What Changed?")}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t("पुराना बनाम नया — AI का प्रभाव", "Old vs New — The AI difference")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded p-5">
              <div className="flex items-center gap-2 font-bold text-red-700 dark:text-red-300 mb-4 text-sm uppercase tracking-wide">
                ❌ {t("पुरानी प्रणाली", "Old System")}
              </div>
              <ol className="space-y-2.5">
                {[
                  t("शिकायत टाइप करो", "Type complaint"),
                  t("कीवर्ड मिलान → गलत विभाग", "Keyword match → Wrong department"),
                  t("विभाग 2 को उछाल दिया गया", "Bounced to Department 2"),
                  t("विभाग 3 को उछाल दिया गया", "Bounced to Department 3"),
                  t("3 महीने बाद बिना समाधान छोड़ दिया", "Abandoned after 3 months"),
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-200">
                    <span className="w-5 h-5 rounded-full bg-red-200 dark:bg-red-900/70 text-red-700 dark:text-red-200 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-4 text-xs text-red-600 dark:text-red-400 font-semibold pt-3 border-t border-red-200 dark:border-red-800/50">
                ⏱️ {t("औसत: 15 मिनट भरने + 3+ महीने इंतजार", "Avg: 15 min to fill + 3+ months wait")}
              </div>
            </div>

            <div className="bg-green-50 dark:bg-emerald-950/40 border border-green-200 dark:border-emerald-800/60 rounded p-5">
              <div className="flex items-center gap-2 font-bold text-green-700 dark:text-emerald-300 mb-4 text-sm uppercase tracking-wide">
                ✅ {t("नया AI सिस्टम", "New AI System")}
              </div>
              <ol className="space-y-2.5">
                {[
                  t("शिकायत बोलो या टाइप करो", "Speak or type complaint"),
                  t("AI असली समस्या समझता है", "AI understands actual problem"),
                  t("सही विभाग को सीधे रूट करता है", "Routes directly to CORRECT department"),
                  t("पहली बार में समाधान", "Gets resolved on first attempt"),
                  t("हफ्तों में समाधान — पारदर्शी ट्रैकिंग", "Resolved in weeks — transparent tracking"),
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-800 dark:text-emerald-200">
                    <span className="w-5 h-5 rounded-full bg-green-200 dark:bg-emerald-900/70 text-green-700 dark:text-emerald-200 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-4 text-xs text-green-600 dark:text-emerald-400 font-semibold pt-3 border-t border-green-200 dark:border-emerald-800/50">
                ⚡ {t("औसत: 3-5 मिनट भरना + 18 दिन समाधान", "Avg: 3-5 min to file + 18-day resolution")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
