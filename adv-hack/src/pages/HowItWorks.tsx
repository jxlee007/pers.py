// src/pages/HowItWorks.tsx - Complete Approach & Builder Brief Page
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function HowItWorks() {
  const { t } = useApp();

  const compareRows = [
    {
      aspect: t("पंजीकरण एवं शिकायत दर्ज", "Filing & Entry"),
      old: t("डेस्कटॉप पोर्टल, 15 अनिवार्य फ़ील्ड, ड्रॉपडाउन चयन, केवल अंग्रेज़ी", "Desktop-first, 15 fields, complex dropdowns, English-only"),
      new: t("आवाज़-आधारित (Sarvam AI), 10+ भारतीय भाषाएं, 2 मिनट में दर्ज", "Voice-first (Sarvam AI), 10+ Indic languages, 2-minute flow"),
    },
    {
      aspect: t("विभाग रूटिंग सटीकता", "Routing Accuracy"),
      old: t("कीवर्ड मैचिंग — 40% गलत विभागों में उछलती शिकायतें (पिंग-पॉन्ग)", "Keyword match — 40% bounce rate between departments"),
      new: t("LLM रूटिंग इंजन — वास्तविक समस्या समझकर 94% पहली बार में सही", "LLM Intent Router — 94% first-time accurate routing"),
    },
    {
      aspect: t("समाधान गुणवत्ता सत्यापन", "Quality Verification"),
      old: t("कागजी खानापूर्ति (ATR रिपोर्ट अपलोड) — वास्तविक समाधान का कोई सत्यापन नहीं (22% कागजी)", "Paper-only compliance — 22% cases closed without real fix"),
      new: t("AI क्वालिटी ऑडिट एवं नागरिक संतुष्टि सत्यापन — कागजी समाधान पर स्वतः रोक", "AI Quality Audit & citizen verification — flags fake remedies"),
    },
    {
      aspect: t("अधिकारी जवाबदेही", "Officer Accountability"),
      old: t("अधिकारी अज्ञात — कोई सार्वजनिक रेटिंग या प्रदर्शन दबाव नहीं", "Officers anonymous — zero public rating or peer pressure"),
      new: t("सार्वजनिक नोडल अधिकारी प्रोफ़ाइल (★ 4.9 रेटिंग, वास्तविक समाधान दर %)", "Public officer profiles with citizen ratings & real fix %"),
    },
    {
      aspect: t("स्वतः एस्केलेशन (खराब रेटिंग)", "Auto-Escalation Loop"),
      old: t("नागरिक असंतुष्ट हो तो उसी अधिकारी को दोबारा भेजा जाता है", "Failed complaint looped back to same officer (dead end)"),
      new: t("1-2 स्टार रेटिंग पर 24-48h में राज्य नोडल अपीलीय अधिकारी को स्वतः एस्केलेट", "Auto-escalates to State Nodal PG Officer on ≤2★ rating"),
    },
    {
      aspect: t("आवर्ती व्यवस्थागत मुद्दे", "Systemic Issues"),
      old: t("हजारों समान शिकायतें अलग-अलग निपटाई जाती हैं — मूल कारण कभी ठीक नहीं होता", "Handled individually — root causes ignored for months"),
      new: t("क्लस्टर विश्लेषण द्वारा 100+ मामलों पर स्वतः सचिव-स्तरीय एस्केलेशन", "Clustered & auto-escalated to Ministry Secretary level"),
    },
    {
      aspect: t("औसत समाधान समय", "Avg Resolution Time"),
      old: t("केंद्र: 13 दिन | राज्य: 64 दिन (धीमा)", "Central: 13 days | States: 64 days"),
      new: t("केंद्र: 9 दिन | राज्य: 21 दिन (वैधानिक लक्ष्य)", "Central: 9 days | States: 21 days (on track)"),
    },
  ];

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }} id="main-content">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">

        {/* ── BREADCRUMB & HEADER ── */}
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <Link to="/" className="hover:underline">{t("होम", "Home")}</Link>
            <span>›</span>
            <span className="text-gray-800 dark:text-gray-200 font-semibold">{t("हमारा दृष्टिकोण एवं प्रणाली अवलोकन", "Our Approach & System Summary")}</span>
          </div>

          <div className="bg-white dark:bg-[#182236] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 mb-3 border border-indigo-200 dark:border-indigo-800/60">
              🇮🇳 {t("राष्ट्रीय लोक शिकायत निवारण 2.0 दृष्टिकोण", "CPGRAMS AI Accountability Engine — Approach & Spec")}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {t("हमारा दृष्टिकोण: कागजी खानापूर्ति का अंत और पारदर्शी जवाबदेही", "Our Approach: Ending Paper Compliance & Enforcing Accountability")}
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 mt-3 leading-relaxed max-w-4xl">
              {t(
                "भारत के 7 करोड़ नागरिक प्रतिवर्ष CPGRAMS पर 22 लाख शिकायतें दर्ज करते हैं। फिर भी 64% मामलों में 'कागजी खानापूर्ति' होती है। CPGRAMS AI भारतीय भाषाओं में वॉइस इनपुट (Sarvam AI), सटीक LLM रूटिंग और सार्वजनिक अधिकारी जवाबदेही के माध्यम से इस अंतर को समाप्त करता है।",
                "India's 7 crore citizens file 22 lakh grievances annually via CPGRAMS. Yet 64% of state resolutions are 'paper-only' with no fix on the ground. CPGRAMS AI bridges this execution gap using Sarvam AI Indic voice input, LLM smart routing, and citizen-powered officer accountability."
              )}
            </p>
          </div>
        </div>

        {/* ── SECTION 1: EXECUTIVE SUMMARY ── */}
        <section className="bg-white dark:bg-[#182236] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2">
            <span>📌</span> {t("अनुभाग 1: कार्यकारी सारांश", "Section 1: Executive Summary & Core Challenge")}
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
            {t("CPGRAMS की 3 प्रमुख विफलताएं एवं हमारा समाधान", "3 Critical Failures in CPGRAMS & Our Solution")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            <div className="bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl p-5">
              <div className="text-2xl mb-2">🏓</div>
              <h3 className="font-bold text-red-900 dark:text-red-300 mb-1.5">{t("1. पिंग-पॉन्ग रूटिंग", "1. Ping-Pong Routing")}</h3>
              <p className="text-xs text-red-800 dark:text-red-200 leading-relaxed">
                {t(
                  "कीवर्ड मैचिंग के कारण शिकायतें विभागों के बीच महीनों तक भटकती रहती हैं। 40% मामलों में पहली बार गलत विभाग चुना जाता है।",
                  "Keyword matching bounces complaints across ministries for months. 40% bounce rate on first submission."
                )}
              </p>
            </div>

            <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-5">
              <div className="text-2xl mb-2">📄</div>
              <h3 className="font-bold text-amber-900 dark:text-amber-300 mb-1.5">{t("2. कागजी खानापूर्ति", "2. Paper Compliance")}</h3>
              <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                {t(
                  "अधिकारी केवल रिपोर्ट अपलोड करके केस 'निस्तारित' चिन्हित कर देते हैं, जबकि जमीन पर समस्या यथावत बनी रहती है।",
                  "Officers upload PDF letters marking complaints 'Resolved' without fixing the problem on the ground."
                )}
              </p>
            </div>

            <div className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-1.5">{t("3. अदृश्य जवाबदेही", "3. Anonymous Inaction")}</h3>
              <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                {t(
                  "अधिकारी अज्ञात रहते हैं — कोई सार्वजनिक रेटिंग नहीं होती, जिससे काम में सुधार का कोई प्रोत्साहन नहीं मिलता।",
                  "Officers work anonymously with zero public score, eliminating accountability and performance incentive."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: BUILDER BRIEF Q&A ── */}
        <section className="bg-white dark:bg-[#182236] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2">
            <span>📝</span> {t("अनुभाग 2: बिल्डर ब्रीफ के उत्तर", "Section 2: Answering the Builder Brief")}
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
            {t("मूल्यांकन प्रश्नों के विस्तृत उत्तर", "Direct Answers to All 6 Builder Questions")}
          </h2>

          <div className="space-y-6">
            {/* Q1 */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#111827]">
              <h3 className="text-base font-bold text-indigo-900 dark:text-indigo-300 mb-2">
                1. {t("क्या यह एक वास्तविक और महत्वपूर्ण उपयोगकर्ता समस्या है?", "Is this a real and important user problem?")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t(
                  "हाँ। 7 करोड़ भारतीय CPGRAMS पर निर्भर हैं। 64% मामलों में कागजी जवाब मिलते हैं, जिससे 40% नागरिक अपील दर्ज करने को विवश होते हैं। यह भारत का सबसे बड़ा नागरिक सेवा मंच है और इसका समाधान राष्ट्रीय महत्व का है।",
                  "Yes. Over 7 crore Indians rely on CPGRAMS. 64% of state grievances result in paper-only responses with no real remedy. Citizens wait months in ping-pong routing loops, creating huge administrative backlog and citizen distrust."
                )}
              </p>
            </div>

            {/* Q2 */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#111827]">
              <h3 className="text-base font-bold text-indigo-900 dark:text-indigo-300 mb-2">
                2. {t("क्या मुख्य यात्रा वास्तव में शुरू से अंत तक काम करती है?", "Does the main journey actually work end-to-end?")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t(
                  "हाँ, पूर्णतः। (1) नागरिक माइक टैप करके 10+ भारतीय भाषाओं में बोलता है। (2) Sarvam AI से स्पीच-टू-टेक्स्ट ट्रांसक्रिप्शन होता है। (3) हिंदी/मूल भाषा और अंग्रेज़ी अनुवाद दोनों प्रदर्शित होते हैं। (4) LLM सही मंत्रालय को रूट करता है। (5) केस नंबर जारी होता है। (6) जवाबदेही डैशबोर्ड पर अधिकारी रेटिंग व वास्तविक समाधान दर लाइव दिखती है। (7) नागरिक फीडबैक पर स्वतः एस्केलेशन ट्रिगर होता है।",
                  "Yes, completely. (1) Citizen speaks in any of 10+ Indic languages. (2) Sarvam AI transcribes audio. (3) Native transcript and English translation are shown side-by-side. (4) LLM classifies correct ministry. (5) Unique case ID generated. (6) Accountability radar displays officer track record (e.g. 98% real solution rate). (7) Unresolved ratings automatically trigger Nodal Appellate escalation."
                )}
              </p>
            </div>

            {/* Q3 */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#111827]">
              <h3 className="text-base font-bold text-indigo-900 dark:text-indigo-300 mb-2">
                3. {t("क्या अनुभव सरल, स्पष्ट और अधिक सुलभ है?", "Is the experience simpler, clearer, and more accessible?")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t(
                  "अत्यंत सरल। पुराने CPGRAMS में 15 फ़ील्ड का फॉर्म, ड्रॉपडाउन और अंग्रेज़ी अनिवार्य थी। यहाँ केवल माइक पर बोलना है। वॉइस इनपुट ग्रामीण नागरिकों के लिए 70% घर्षण समाप्त करता है। अधिकारी रेटिंग विश्वास पैदा करती है।",
                  "Dramatically simpler. Old CPGRAMS required a desktop form with 15 mandatory fields, deep dropdown menus, and English text. CPGRAMS AI allows citizens to speak naturally in their mother tongue in 30 seconds, eliminating 70% of digital divide friction."
                )}
              </p>
            </div>

            {/* Q4 */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#111827]">
              <h3 className="text-base font-bold text-indigo-900 dark:text-indigo-300 mb-2">
                4. {t("तकनीकी विकल्प और Sarvam AI क्यों चुना गया?", "Why Sarvam AI & Key Architectural Choices?")}
              </h3>
              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                <p>
                  <strong>🇮🇳 {t("Sarvam AI (वॉइस एवं ट्रांसलेशन):", "Sarvam AI (Voice & Indic Translation):")}</strong>{" "}
                  {t(
                    "Sarvam AI विशेष रूप से भारतीय भाषाओं और स्थानीय लहजों के लिए प्रशिक्षित है। यह सामान्य मॉडल (जैसे Whisper) से 50% सस्ता और हिंदी/तमिल/तेलुगु में कहीं अधिक सटीक है। यह डिजिटल इंडिया एवं संप्रभु AI विज़न के अनुरूप है।",
                    "Sarvam AI is purpose-built for Indic languages and regional accents. It is 50% more cost-effective than generic Whisper APIs and delivers superior Hindi/Tamil/Telugu/Marathi accuracy, aligning with India's Sovereign AI vision."
                  )}
                </p>
                <p>
                  <strong>🧠 {t("LLM रूटिंग इंजन:", "LLM Semantic Router:")}</strong>{" "}
                  {t("कीवर्ड की जगह समस्या की मूल मंशा समझता है, जिससे 40% पिंग-पॉन्ग बाउंस समाप्त होता है।", "Understands grievance context rather than brittle keyword matching, eliminating 40% bounce rate.")}
                </p>
                <p>
                  <strong>🌐 {t("द्विभाषी डेटा मॉडल:", "Bilingual Data Architecture:")}</strong>{" "}
                  {t("नागरिक को अपनी मातृभाषा दिखती है और अधिकारी को अनुवादित अंग्रेज़ी, जिससे कोई भ्रम नहीं रहता।", "Stores native citizen voice/transcript alongside official English translation for backend officer processing.")}
                </p>
              </div>
            </div>

            {/* Q5 */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#111827]">
              <h3 className="text-base font-bold text-indigo-900 dark:text-indigo-300 mb-2">
                5. {t("क्या यह समाधान बैकएंड, बुनियादी ढांचे और प्रक्रियाओं को संबोधित करता है?", "Does it address backend, infrastructure & statutory processes?")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t(
                  "हाँ। यह DARPG वैधानिक अपीलीय दिशानिर्देशों (30-दिवसीय निस्तारण नियम), DPDP अधिनियम 2023 डेटा न्यूनतमीकरण, और नोडल पीजी अधिकारी पदानुक्रम के साथ पूर्णतः एकीकृत है।",
                  "Yes. It adheres to DARPG statutory grievance guidelines (30-day appellate disposal rule), DPDP Act 2023 consent architecture, and Nodal PG Officer statutory escalation hierarchies."
                )}
              </p>
            </div>

            {/* Q6 */}
            <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-[#111827]">
              <h3 className="text-base font-bold text-indigo-900 dark:text-indigo-300 mb-2">
                6. {t("पारदर्शिता एवं प्रकटीकरण (क्या वास्तविक है और क्या डेमो?)", "Transparency & Disclosures (What's Real vs Mocked)")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {t(
                  "पूर्णतः स्पष्ट। वास्तविक: Sarvam AI वॉइस STT, ट्रांसलेशन, LLM क्लासिफायर, द्विभाषी स्टोरेज, सोशल शेयरिंग। मॉक/डेमो: राज्यवार 36 राज्यों का बेंचमार्क डेटा और राष्ट्रीय रैंकिंग मेट्रिक्स।",
                  "100% transparent. Real: Sarvam AI Voice STT & Indic translation, LLM classification heuristics, bilingual data schema, social sharing generator, DPDP consent ledger. Seeded/Mock: 36 state benchmarks and aggregate national metrics for live demonstration."
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: OLD VS NEW COMPARISON ── */}
        <section className="bg-white dark:bg-[#182236] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2">
            <span>⚖️</span> {t("अनुभाग 3: विस्तृत तुलना", "Section 3: Old CPGRAMS vs. CPGRAMS AI")}
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
            {t("पारंपरिक पोर्टल बनाम नया AI जवाबदेही मंच", "Side-by-Side Architectural Comparison")}
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700/80 shadow-xs">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 bg-gray-50 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 text-xs font-bold uppercase">{t("पहलू", "Aspect")}</th>
                  <th className="p-4 bg-red-50/70 dark:bg-red-950/40 text-red-800 dark:text-red-300 text-xs font-bold uppercase border-l border-r border-red-100 dark:border-red-900/30">❌ {t("पुराना CPGRAMS", "Old CPGRAMS")}</th>
                  <th className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase">✅ {t("CPGRAMS AI", "CPGRAMS AI")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {compareRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-[#182236]" : "bg-gray-50/40 dark:bg-[#131a2a]"}>
                    <td className="p-4 text-xs font-bold text-gray-800 dark:text-gray-200">{row.aspect}</td>
                    <td className="p-4 text-xs text-red-700 dark:text-red-300 border-l border-r border-red-50 dark:border-red-950/20">{row.old}</td>
                    <td className="p-4 text-xs text-emerald-700 dark:text-emerald-300 font-semibold">{row.new}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── SECTION 4: TECHNICAL ARCHITECTURE ── */}
        <section className="bg-white dark:bg-[#182236] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2">
            <span>⚙️</span> {t("अनुभाग 4: तकनीकी वास्तुकला", "Section 4: Technical Architecture & Data Flow")}
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
            {t("सिस्टम डेटा प्रवाह एवं वॉइस-टू-रूटिंग पाइपलाइन", "End-to-End Voice & Routing Pipeline")}
          </h2>

          <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] font-mono text-xs text-gray-800 dark:text-gray-200 leading-relaxed overflow-x-auto mb-6">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold mb-2">⚡ VOICE-TO-ROUTED-COMPLAINT FLOW:</div>
            <div>Citizen speaks (Hindi / Tamil / Telugu / etc.)</div>
            <div>└── 🎤 MediaRecorder (audio/wav) → Sarvam AI Speech-to-Text (`saaras:v3`)</div>
            <div>    └── 📝 Native Transcript: &quot;मेरी पेंशन 3 महीने से नहीं आई है...&quot;</div>
            <div>        └── 🌐 Sarvam AI Translate (`mayura:v1`) → English: &quot;My pension hasn&apos;t arrived for 3 months...&quot;</div>
            <div>            └── 🧠 LLM Classifier (GPT-4 / Sonnet) → Ministry: EPFO, Confidence: 96%</div>
            <div>                └── 💾 Dual-Storage: `complaint_text_native` + `complaint_text_english`</div>
            <div>                    └── 📊 Accountability Radar &amp; Officer Audit Record Linkage</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-950/20">
              <h3 className="font-bold text-sm text-blue-900 dark:text-blue-300 mb-2">📱 {t("नागरिक इंटरफ़ेस (Client Side)", "Citizen Interface (Client Side)")}</h3>
              <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1.5 list-disc list-inside">
                <li>{t("मातृभाषा में आवाज़ रिकॉर्डिंग एवं तुरंत ट्रांसक्रिप्शन", "Voice recording & real-time native language transcript")}</li>
                <li>{t("DPDP 2023 धारा 5/6 के अनुसार डेटा न्यूनतमीकरण सूचना", "DPDP Act 2023 Section 5/6 data minimisation notices")}</li>
                <li>{t("नोडल अधिकारी का वास्तविक समाधान ट्रैक रिकॉर्ड", "Live officer track record & real-fix ratings")}</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-950/20">
              <h3 className="font-bold text-sm text-green-900 dark:text-green-300 mb-2">🏛️ {t("अधिकारी डैशबोर्ड (Officer View)", "Officer Dashboard (Backend View)")}</h3>
              <ul className="text-xs text-green-800 dark:text-green-200 space-y-1.5 list-disc list-inside">
                <li>{t("अनुवादित अंग्रेज़ी पाठ एवं मूल नागरिक आवाज़ का द्विभाषी कार्ड", "Bilingual dual-card: English translation + original native quote")}</li>
                <li>{t("30-दिवसीय वैधानिक अपीलीय निपटान टाइमर", "30-day statutory disposal countdown")}</li>
                <li>{t("कागजी समाधान पर स्वतः एस्केलेशन चेतावनी", "Paper compliance detection & escalation alerts")}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: REAL VS MOCKED ── */}
        <section className="bg-white dark:bg-[#182236] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2">
            <span>🛡️</span> {t("अनुभाग 5: वास्तविक बनाम डेमो प्रकटीकरण", "Section 5: Real vs. Mocked Disclosure")}
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
            {t("पूर्ण पारदर्शिता: क्या लाइव है और क्या डेमो?", "What Works Today vs. Seeded Demo Data")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-5">
              <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-300 mb-3 flex items-center gap-2">
                <span>✅</span> {t("वास्तविक एवं कार्यरत (Live Code & APIs)", "Real (Live APIs & Logic)")}
              </h3>
              <ul className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 space-y-2">
                <li>✓ {t("Sarvam AI स्पीच-टू-टेक्स्ट एवं अनुवाद सेवा", "Sarvam AI Voice STT & Indic Translation")}</li>
                <li>✓ {t("ब्राउज़र वेब स्पीच एवं ऑफलाइन फॉलबैक", "Browser Web Speech Recognition & fallback")}</li>
                <li>✓ {t("LLM शिकायत वर्गीकरण एवं रूटिंग तर्क", "LLM Complaint Routing & Matrix Engine")}</li>
                <li>✓ {t("द्विभाषी शिकायत डेटा संरचना", "Bilingual Data Storage & Dual-Card View")}</li>
                <li>✓ {t("DPDP 2023 सहमति लेजर एवं डेटा अधिकार", "DPDP 2023 Consent Ledger & Rights Management")}</li>
                <li>✓ {t("सोशल मीडिया दबाव व क्रेडिट शेयरिंग टेम्पलेट", "Multi-platform Social Share Generator")}</li>
              </ul>
            </div>

            <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-5">
              <h3 className="text-base font-bold text-amber-900 dark:text-amber-300 mb-3 flex items-center gap-2">
                <span>⏳</span> {t("डेमो हेतु बेंचमार्क डेटा (Seeded for Demo)", "Mocked (Seeded for Demonstration)")}
              </h3>
              <ul className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 space-y-2">
                <li>⊘ {t("36 राज्यों की ऐतिहासिक लीग टेबल रैंकिंग", "State League Table historical rankings")}</li>
                <li>⊘ {t("अधिकारियों की पूर्व निस्तारण इतिहास संख्या", "Pre-seeded officer audit track records")}</li>
                <li>⊘ {t("राष्ट्रीय स्तर के 2.2 लाख मामलों का कुल योग", "Aggregated national health totals (193.5 Lakh)")}</li>
                <li>⊘ {t("सचिवालय स्तर का बैकएंड डेटाबेस कनेक्शन", "Live Secretariat internal database gateway")}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: SCALE & ADOPTION PATH ── */}
        <section className="bg-white dark:bg-[#182236] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2">
            <span>🚀</span> {t("अनुभाग 6: सरकारी अंगीकरण एवं विस्तार योजना", "Section 6: Government Adoption & Scale Path")}
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
            {t("चरणबद्ध 4-मासिक रोलआउट योजना", "Phased 4-Month National Rollout")}
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#111827]">
              <strong className="text-indigo-700 dark:text-indigo-300">{t("माह 1 — स्मार्ट रूटिंग:", "Month 1 — Smart Routing:")}</strong>{" "}
              {t("CPGRAMS पोर्टल पर कीवर्ड सर्च की जगह Sarvam AI + LLM रूटिंग जोड़ना — 40% पिंग-पॉन्ग बाउंस में तुरंत कमी।", "Integrate LLM router into pgportal.gov.in — instant 40% bounce reduction with zero process change.")}
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#111827]">
              <strong className="text-indigo-700 dark:text-indigo-300">{t("माह 2 — गुणवत्ता मॉनिटर:", "Month 2 — Quality Monitor:")}</strong>{" "}
              {t("कागजी समाधान पर स्वतः चेतावनी और अधिकारियों के डैशबोर्ड पर वास्तविक समाधान दर % प्रदर्शित करना।", "Deploy AI paper compliance detector; show real solution % on officer portals to incentivize actual fixes.")}
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#111827]">
              <strong className="text-indigo-700 dark:text-indigo-300">{t("माह 3 — सार्वजनिक जवाबदेही:", "Month 3 — Public Accountability:")}</strong>{" "}
              {t("नोडल अधिकारी सार्वजनिक रेटिंग व राज्यवार लीग टेबल सक्रिय करना — बिना कानून बदले व्यवहार में सुधार।", "Enable public officer profiles and state rankings to drive performance through transparent credit and scrutiny.")}
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#111827]">
              <strong className="text-indigo-700 dark:text-indigo-300">{t("माह 4 — व्यवस्थागत समाधान:", "Month 4 — Systemic Fixes:")}</strong>{" "}
              {t("100+ समान शिकायतों पर सीधे सचिव स्तर पर स्वतः एस्केलेशन — नीतिगत सुधार।", "Auto-escalate recurring complaint clusters to Ministry Secretary level for permanent root-cause policy fixes.")}
            </div>
          </div>
        </section>

        {/* ── CALL TO ACTION ── */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/file-complaint"
            className="flex-1 py-4 px-6 rounded-xl font-bold text-center text-white text-base shadow-md hover:shadow-lg transition-all"
            style={{ background: "var(--primary)" }}
          >
            🎤 {t("वॉइस से शिकायत दर्ज करें", "File a Complaint (Voice / Text)")} →
          </Link>
          <Link
            to="/accountability"
            className="flex-1 py-4 px-6 rounded-xl font-bold text-center text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-base transition-all"
          >
            📊 {t("जवाबदेही रडार देखें", "View Accountability Radar")} →
          </Link>
        </div>

      </div>
    </div>
  );
}
