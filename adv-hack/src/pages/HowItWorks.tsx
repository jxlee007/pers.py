import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import FlowDiagram from "../components/FlowDiagram";

export default function HowItWorks() {
  const { t } = useApp();

  const flowSteps = [
    {
      number: 1,
      title: "Citizen Input",
      titleHi: "नागरिक इनपुट",
      description: "Describe your problem in plain language — voice or text, any Indian language.",
      descriptionHi: "अपनी समस्या साधारण भाषा में बताएं — आवाज़ या टेक्स्ट, किसी भी भारतीय भाषा में।",
      icon: "✍️",
    },
    {
      number: 2,
      title: "LLM Classification",
      titleHi: "LLM वर्गीकरण",
      description: "GPT-4 reads the actual problem context, not just keywords.",
      descriptionHi: "GPT-4 केवल कीवर्ड नहीं, असली समस्या का संदर्भ पढ़ता है।",
      icon: "🤖",
    },
    {
      number: 3,
      title: "Routing Logic",
      titleHi: "रूटिंग तर्क",
      description: "AI maps complaint to the correct ministry/department with confidence score.",
      descriptionHi: "AI शिकायत को सही मंत्रालय/विभाग से मिलाता है और आत्मविश्वास स्कोर देता है।",
      icon: "🎯",
    },
    {
      number: 4,
      title: "First-Time Routing",
      titleHi: "पहली बार सही रूटिंग",
      description: "Complaint goes to the RIGHT place on the first submission.",
      descriptionHi: "शिकायत पहली बार में ही सही जगह जाती है।",
      icon: "✅",
    },
    {
      number: 5,
      title: "Faster Resolution",
      titleHi: "तेज़ समाधान",
      description: "No bouncing between departments. Resolution in weeks, not months.",
      descriptionHi: "विभागों के बीच कोई उछाल नहीं। हफ्तों में समाधान, महीनों में नहीं।",
      icon: "⚡",
    },
    {
      number: 6,
      title: "Citizen Audit & Auto-Escalation",
      titleHi: "नागरिक ऑडिट एवं स्वतः एस्केलेशन",
      description: "If resolution is poor (≤2★) or paper-only, AI auto-escalates to Nodal Officers with 30-day statutory appeal.",
      descriptionHi: "यदि समाधान खराब (≤2★) या कागजी हो, तो AI स्वतः राज्य नोडल अधिकारी को 24h में एस्केलेट करता है।",
      icon: "🚨",
    },
  ];

  const compareRows = [
    { aspect: t("इनपुट", "Input"), old: t("15-फ़ील्ड फॉर्म", "15-field form"), new: t("1 बटन — आवाज़ इनपुट", "1 button — voice input") },
    { aspect: t("भाषा", "Language"), old: t("सिर्फ English", "English only"), new: t("22 भारतीय भाषाएं", "All 22 Indian languages") },
    { aspect: t("रूटिंग", "Routing"), old: t("कीवर्ड मिलान", "Keyword matching"), new: t("AI संदर्भ समझ", "AI context understanding") },
    { aspect: t("कागजी खानापूर्ति पर रोक", "Fake Resolution Handling"), old: t("केस बंद, नागरिक बेबस", "Case closed on paper, citizen helpless"), new: t("स्वतः एस्केलेशन + 30-दिन वैधानिक अपील", "Auto-escalation + 30-day statutory appeal mandate") },
    { aspect: t("अधिकारी जवाबदेही", "Officer Accountability"), old: t("पर्दे के पीछे बंद", "Hidden behind closed doors"), new: t("सार्वजनिक एस्केलेशन दर एवं ऑडिट", "Public escalation rate & transparent audit") },
    { aspect: t("टेक्स्ट आकार", "Text size"), old: "12px", new: "18px+" },
    { aspect: t("दस्तावेज़", "Documents"), old: t("अनिवार्य", "Required"), new: t("वैकल्पिक", "Optional") },
    { aspect: t("भरने का समय", "Time to file"), old: t("15 मिनट+", "15+ minutes"), new: t("3-5 मिनट", "3-5 minutes") },
    { aspect: t("समाधान", "Resolution"), old: t("3 महीने+ (अक्सर असफल)", "3 months+ (often fails)"), new: t("18 दिन औसत", "18 days average") },
    { aspect: t("मोबाइल", "Mobile"), old: t("डेस्कटॉप-पहले", "Desktop-first"), new: t("मोबाइल-पहले (2G)", "Mobile-first (2G ready)") },
  ];

  const techStack = [
    { icon: "⚛️", name: "React 19", desc: t("फ्रंटएंड फ्रेमवर्क", "Frontend framework") },
    { icon: "🎨", name: "Tailwind CSS v4", desc: t("स्टाइलिंग", "Styling") },
    { icon: "🤖", name: "OpenAI GPT-4o", desc: t("LLM वर्गीकरण", "LLM classification") },
    { icon: "🗄️", name: "Mock JSON Data", desc: t("परीक्षण डेटा", "Testing data") },
    { icon: "🌐", name: "React Router v7", desc: t("नेविगेशन", "Navigation") },
    { icon: "🎤", name: "Web Speech API", desc: t("वॉयस इनपुट", "Voice input") },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 to-purple-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
            {t("यह कैसे काम करता है?", "How It Works")}
          </h1>
          <p className="text-indigo-200 text-lg max-w-xl mx-auto">
            {t(
              "AI-सक्षम तकनीक और वैधानिक स्वतः एस्केलेशन: पहली बार में सही रूटिंग और कागजी समाधान पर स्थायी रोक।",
              "AI-enabled routing and statutory auto-escalation: right department the first time, with zero tolerance for paper compliance."
            )}
          </p>
        </div>
      </section>

      {/* Flow diagram */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {t("नागरिक शिकायत एवं जवाबदेही यात्रा — 6 कदम", "The 6-Step Citizen Accountability Journey")}
        </h2>
        <p className="text-center text-xs text-gray-500 max-w-xl mx-auto mb-10">
          {t(
            "इनपुट से लेकर वास्तविक राहत तक — यदि फ्रंटलाइन अधिकारी केवल कागजी खानापूर्ति करते हैं तो नागरिक फीडबैक स्वतः पर्यवेक्षी हस्तक्षेप को सक्रिय करता है।",
            "From plain-language filing to verified on-the-ground relief — with automatic supervisory escalation if remedies are merely on paper."
          )}
        </p>
        <FlowDiagram steps={flowSteps} />
      </section>

      {/* THE ACCOUNTABILITY PRESSURE CHAIN */}
      <section className="py-14 bg-gradient-to-b from-red-50/40 via-white to-gray-50 border-y border-red-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-red-100 text-red-800 border border-red-200 mb-2">
              ⚡ {t("जवाबदेही दबाव चक्र", "The Accountability Pressure Chain")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t("कागजी खानापूर्ति पर रोक: स्वतः एस्केलेशन कैसे काम करता है?", "How Auto-Escalation Eliminates Fake Resolutions")}
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-2xl mx-auto">
              {t(
                "अधिकारी केवल परिपत्र या औपचारिकता दिखाकर केस बंद नहीं कर सकते। नागरिक का असंतोष सीधे वरिष्ठ अधिकारियों के रडार पर आता है।",
                "Officers cannot simply close cases with boilerplate circulars. Citizen dissatisfaction directly activates senior supervisory oversight."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs relative">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">कदम 1 • Step 1</div>
              <div className="text-lg font-bold text-gray-900 mb-2">⚠️ {t("कागजी समाधान", "Paper-Only Closure")}</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t(
                  "फ्रंटलाइन अधिकारी पोर्टल पर 'सुलझाया गया' मार्क करते हैं, लेकिन नागरिक को पेंशन, कार्ड या कार्य जमीन पर नहीं मिलता।",
                  "Officer marks grievance 'Closed' on portal with an internal circular, but no physical benefit is delivered."
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-300 p-5 shadow-2xs relative">
              <div className="text-xs font-bold text-amber-600 uppercase mb-1">कदम 2 • Step 2</div>
              <div className="text-lg font-bold text-amber-900 mb-2">⭐ {t("नागरिक 1-2 स्टार देता है", "Citizen Rates ≤ 2 Stars")}</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t(
                  "नागरिक 'खराब' रेटिंग दर्ज करता है या 'समस्या ठीक नहीं हुई' चुनता है। CPGRAMS AI तुरंत 3 सिग्नल्स को मॉनिटर करता है।",
                  "Citizen marks 'Poor' or flags 'problem not fixed'. CPGRAMS AI monitors rating, keywords, and re-filed patterns."
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-red-300 p-5 shadow-2xs relative bg-red-50/20">
              <div className="text-xs font-bold text-red-600 uppercase mb-1">कदम 3 • Step 3</div>
              <div className="text-lg font-bold text-red-900 mb-2">🚨 {t("स्वतः एस्केलेशन ट्रिगर", "Supervisory Auto-Trigger")}</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t(
                  "केस 24h में राज्य नोडल पीजी अधिकारी को जाता है और नोडल अपीलीय प्राधिकरण (30-दिवसीय वैधानिक SLA) पोर्टल पर खुल जाता है।",
                  "Escalates to State Nodal PG Officer within 24h & directly unlocks Nodal Appellate Authority with a 30-day statutory mandate."
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-indigo-200 p-5 shadow-2xs relative">
              <div className="text-xs font-bold text-indigo-600 uppercase mb-1">कदम 4 • Step 4</div>
              <div className="text-lg font-bold text-indigo-950 mb-2">📊 {t("सार्वजनिक एस्केलेशन दर", "Public Rate Increases")}</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t(
                  "अधिकारी की एस्केलेशन दर (जैसे 3.4%) राष्ट्रीय डैशबोर्ड और अधिकारी प्रोफ़ाइल पर पारदर्शी रूप से दिखती है।",
                  "Officer's escalation rate publicly rises on the national radar, visible to citizens, peers, and ministries."
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-purple-200 p-5 shadow-2xs relative">
              <div className="text-xs font-bold text-purple-600 uppercase mb-1">कदम 5 • Step 5</div>
              <div className="text-lg font-bold text-purple-950 mb-2">⚖️ {t("करियर व प्रशासनिक दबाव", "Supervisory Pressure")}</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t(
                  "30 दिनों में 3 से अधिक खराब रेटिंग या 5 अपीलों पर नोडल अधिकारी द्वारा प्रशासनिक समीक्षा और रेड फ्लैग जारी होता है।",
                  "Over 3 poor ratings or 5 appeals flags the officer for administrative inquiry by senior Nodal authorities."
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-green-300 p-5 shadow-2xs relative bg-green-50/20">
              <div className="text-xs font-bold text-green-700 uppercase mb-1">कदम 6 • Step 6</div>
              <div className="text-lg font-bold text-green-900 mb-2">🎯 {t("वास्तविक राहत की प्राप्ति", "Real Remedy Delivered")}</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t(
                  "कागजी बहाने बंद: फ्रंटलाइन अधिकारी तुरंत काम पूरा करते हैं (धन वापसी, भौतिक कार्ड, सड़क मरम्मत) और केस संतोष से बंद होता है।",
                  "Paper compliance ends: officers deliver true restitution (pension credited, DL issued, road resurfaced)."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI routing explanation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            {t("AI रूटिंग इंजन", "The AI Routing Engine")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">📥</div>
              <h3 className="font-bold text-gray-900 mb-2">{t("इनपुट", "Input")}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t("नागरिक की शिकायत किसी भी भारतीय भाषा में (आवाज़ या टेक्स्ट)", "Citizen complaint in any Indian language (voice or text)")}
              </p>
            </div>
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-bold text-indigo-800 mb-2">{t("AI प्रसंस्करण", "AI Processing")}</h3>
              <div className="text-sm text-indigo-700 space-y-1 text-left">
                <div>→ {t("complaint_type पहचानता है", "Identifies complaint_type")}</div>
                <div>→ {t("root_issue निकालता है", "Extracts root_issue")}</div>
                <div>→ {t("correct_ministry मैप करता है", "Maps correct_ministry")}</div>
                <div>→ {t("confidence स्कोर देता है", "Returns confidence score")}</div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">📤</div>
              <h3 className="font-bold text-gray-900 mb-2">{t("आउटपुट", "Output")}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t("सटीक मंत्रालय, विभाग, संपर्क नंबर और स्पष्टीकरण के साथ", "Exact ministry, department, contact number, and plain-language explanation")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          {t("पुराना बनाम नया — विस्तृत तुलना", "Old vs. New — Detailed Comparison")}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 bg-gray-50 text-gray-600 text-sm font-semibold rounded-tl-xl">{t("पहलू", "Aspect")}</th>
                <th className="p-4 bg-red-50 text-red-700 text-sm font-semibold">❌ {t("पुराना CPGRAMS", "Old CPGRAMS")}</th>
                <th className="p-4 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-tr-xl">✅ {t("CPGRAMS AI", "CPGRAMS AI")}</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="p-4 text-sm font-semibold text-gray-700 border-b border-gray-100">{row.aspect}</td>
                  <td className="p-4 text-sm text-red-700 border-b border-gray-100 text-center">{row.old}</td>
                  <td className="p-4 text-sm text-emerald-700 font-medium border-b border-gray-100 text-center">{row.new}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {t("प्रौद्योगिकी स्टैक", "Built With")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:border-indigo-200 transition-colors">
                <span className="text-2xl">{tech.icon}</span>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{tech.name}</div>
                  <div className="text-xs text-gray-500">{tech.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("अब आज़माएं", "Try It Now")}</h2>
        <p className="text-gray-500 mb-6">{t("अपनी पहली शिकायत दर्ज करें — 3 मिनट से कम में।", "File your first complaint in under 3 minutes.")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/file-complaint"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg"
            style={{ background: "var(--primary)" }}
          >
            ✍️ {t("शिकायत दर्ज करें", "File a Complaint")}
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-gray-700 text-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            📋 {t("मेरे केस", "View My Cases")}
          </Link>
        </div>
      </section>
    </div>
  );
}
