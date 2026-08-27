import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Button from "../components/Button";

export default function RoutingResult() {
  const { t, routingResult, complaintText } = useApp();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!routingResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t("कोई परिणाम नहीं", "No Result Yet")}</h2>
          <p className="text-gray-500 mb-6">{t("पहले शिकायत दर्ज करें।", "Please file a complaint first.")}</p>
          <Link to="/file-complaint">
            <Button size="lg">{t("शिकायत दर्ज करें", "File a Complaint")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const caseId = `CPG_${Date.now().toString().slice(0, 10)}_${Math.floor(Math.random() * 900 + 100)}`;
  const confidencePct = Math.round(routingResult.confidence * 100);

  function copyDetails() {
    const details = `CPGRAMS Case\nMinistry: ${routingResult!.correct_ministry}\nDepartment: ${routingResult!.correct_department}\nContact: ${routingResult!.contact}\nCase ID: ${caseId}`;
    navigator.clipboard.writeText(details);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function submitToCPGRAMS() {
    setSubmitted(true);
    localStorage.setItem("cpgrams_last_case", JSON.stringify({ id: caseId, result: routingResult, text: complaintText, date: new Date().toISOString() }));
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success banner */}
        <div className="bg-emerald-500 text-white rounded-2xl p-5 text-center mb-6">
          <div className="text-4xl mb-2">🎯</div>
          <div className="font-bold text-xl">{t("सही विभाग मिला!", "CORRECT ROUTING FOUND!")}</div>
          <div className="text-emerald-100 text-sm mt-1">
            {t("AI ने पहली बार में सही जगह ढूंढी।", "AI found the right place on the first try.")}
          </div>
        </div>

        {/* Main result card */}
        <div className="bg-white rounded-2xl border-2 border-indigo-200 shadow-sm p-6 mb-5">
          <div className="flex items-start gap-4 mb-5">
            <div className="text-5xl">{routingResult.icon}</div>
            <div className="flex-1">
              <div className="font-bold text-xl text-gray-900">{routingResult.correct_ministry}</div>
              <div className="text-sm text-indigo-600 font-medium mt-0.5">{routingResult.ministry_name_hi}</div>
              <div className="text-sm text-gray-500 mt-1">{routingResult.correct_department}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-extrabold text-indigo-700">{confidencePct}%</div>
              <div className="text-xs text-gray-400">{t("आत्मविश्वास", "Confidence")}</div>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="mb-5">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${confidencePct}%`,
                  background: confidencePct >= 90 ? "#10B981" : confidencePct >= 75 ? "#F59E0B" : "#EF4444",
                }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {confidencePct >= 90 ? t("बहुत उच्च सटीकता", "Very High Accuracy") : confidencePct >= 75 ? t("उच्च सटीकता", "High Accuracy") : t("मध्यम सटीकता", "Moderate Accuracy")}
            </div>
          </div>

          {/* Why routed here */}
          <div className="bg-indigo-50 rounded-xl p-4 mb-5">
            <div className="font-semibold text-indigo-800 text-sm mb-2">
              🤔 {t("क्यों यहाँ रूट किया?", "Why Routed Here?")}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t(routingResult.why_routed_here_hi, routingResult.why_routed_here)}
            </p>
          </div>

          {/* Root issue */}
          <div className="bg-gray-50 rounded-xl p-4 mb-5">
            <div className="font-semibold text-gray-700 text-sm mb-1">{t("मूल समस्या", "Root Issue Identified")}</div>
            <p className="text-sm text-gray-600">{routingResult.root_issue}</p>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-5">
            <span className="text-2xl">📞</span>
            <div>
              <div className="text-xs text-gray-500 font-medium">{t("संपर्क नंबर", "Contact Number")}</div>
              <a href={`tel:${routingResult.contact}`} className="font-bold text-emerald-700 text-lg hover:text-emerald-800">
                {routingResult.contact}
              </a>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={copyDetails}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 text-sm transition-colors"
            >
              {copied ? "✅" : "📋"} {copied ? t("कॉपी हो गया!", "Copied!") : t("कॉपी करें", "Copy Details")}
            </button>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-100 text-emerald-700 font-semibold text-sm">
                ✅ {t("सबमिट हो गया!", "Submitted!")}
              </div>
            ) : (
              <button
                onClick={submitToCPGRAMS}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white text-sm transition-colors"
                style={{ background: "var(--primary)" }}
              >
                📤 {t("CPGRAMS में सबमिट करें", "Submit to CPGRAMS")}
              </button>
            )}

            <a
              href={`tel:${routingResult.contact}`}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
            >
              📞 {t("कॉल करें", "Call Department")}
            </a>
          </div>
        </div>

        {/* Where old system would send it */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-5">
          <div className="font-bold text-red-700 mb-3">
            ❌ {t("पुराना सिस्टम यहाँ भेजता:", "WHERE OLD SYSTEM WOULD HAVE SENT IT:")}
          </div>
          <div className="space-y-2">
            {routingResult.wrong_routes_old_system.map((wrong, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-red-700">
                <span className="mt-0.5 font-bold">{i + 1}.</span>
                <span>{wrong}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-red-200">
            <div className="flex items-center gap-2 text-sm text-emerald-700 font-semibold">
              ✅ {t("लेकिन AI ने सीधे सही जगह भेजा:", "AI correctly sent to:")} {routingResult.correct_ministry}
            </div>
          </div>
        </div>

        {/* Case ID if submitted */}
        {submitted && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl p-6 mb-5 text-center">
            <div className="text-sm opacity-80 mb-1">{t("आपका केस नंबर:", "YOUR CASE NUMBER:")}</div>
            <div className="font-mono text-2xl sm:text-3xl font-bold tracking-wider mb-3">{caseId}</div>
            <button
              onClick={() => { navigator.clipboard.writeText(caseId); }}
              className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              📋 {t("कॉपी करें", "Copy")}
            </button>
          </div>
        )}

        {/* Next steps */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/dashboard" className="flex-1">
            <Button size="md" fullWidth variant="secondary">
              📋 {t("मेरे केस देखें", "View My Cases")}
            </Button>
          </Link>
          <Link to="/file-complaint" className="flex-1">
            <Button size="md" fullWidth variant="ghost">
              ✍️ {t("नई शिकायत", "File Another")}
            </Button>
          </Link>
          <Link to="/feedback" className="flex-1">
            <Button size="md" fullWidth variant="secondary">
              ⭐ {t("फीडबैक दें", "Give Feedback")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
