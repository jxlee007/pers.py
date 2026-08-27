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
  ];

  const compareRows = [
    { aspect: t("इनपुट", "Input"), old: t("15-फ़ील्ड फॉर्म", "15-field form"), new: t("1 बटन — आवाज़ इनपुट", "1 button — voice input") },
    { aspect: t("भाषा", "Language"), old: t("सिर्फ English", "English only"), new: t("22 भारतीय भाषाएं", "All 22 Indian languages") },
    { aspect: t("रूटिंग", "Routing"), old: t("कीवर्ड मिलान", "Keyword matching"), new: t("AI संदर्भ समझ", "AI context understanding") },
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
              "AI की शक्ति से शिकायतें पहली बार में ही सही विभाग तक पहुंचती हैं।",
              "AI-powered complaint routing that gets it right the first time — every time."
            )}
          </p>
        </div>
      </section>

      {/* Flow diagram */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          {t("शिकायत यात्रा — 5 कदम", "The 5-Step Complaint Journey")}
        </h2>
        <FlowDiagram steps={flowSteps} />
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
