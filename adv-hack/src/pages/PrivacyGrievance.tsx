import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { submitPrivacyRequest } from "../services/authService";

export default function PrivacyGrievance() {
  const { t, currentUser } = useApp();
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refNum, setRefNum] = useState("");

  if (!currentUser) return <div className="p-8 text-center"><Link to="/login" className="text-indigo-600 underline">{t("लॉगिन करें", "Login")}</Link></div>;

  const issueTypes = [
    t("डेटा एक्सेस से इनकार", "Data access denied"),
    t("गलत जानकारी सुधार नहीं हुआ", "Incorrect information not corrected"),
    t("सहमति सम्मान नहीं किया", "Consent not respected"),
    t("अनावश्यक डेटा एकत्र किया", "Unnecessary data collected"),
    t("डेटा सुरक्षा चिंता", "Data security concern"),
    t("अन्य", "Other"),
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const req = submitPrivacyRequest({ userId: currentUser!.id, type: "grievance", description: `Type: ${issueType}. ${description}` });
    setRefNum(req.id);
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">📢</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t("गोपनीयता शिकायत सबमिट हो गई", "Privacy grievance submitted")}</h2>
        <p className="text-sm font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2 mb-3">{refNum}</p>
        <p className="text-sm text-gray-500 mb-2">{t("सबमिट:", "Submitted:")} {new Date().toLocaleDateString("en-IN")}</p>
        <p className="text-xs text-gray-400 mb-6">{t("हम 30 दिनों के भीतर जवाब देने का प्रयास करेंगे।", "We will attempt to respond within 30 days.")}</p>
        <Link to="/privacy" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm">{t("गोपनीयता केंद्र", "Privacy Centre")}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">← {t("वापस", "Back")}</Link>
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-1">{t("गोपनीयता शिकायत", "Privacy Grievance")}</h1>
      <p className="text-sm text-gray-500 mb-6">{t("डेटा संबंधित चिंता दर्ज करें। privacy@cpgrams.gov.in", "Report a data-related concern. privacy@cpgrams.gov.in")}</p>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("समस्या का प्रकार", "Issue type")}</label>
          <select value={issueType} onChange={(e) => setIssueType(e.target.value)} required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">{t("चुनें...", "Select...")}</option>
            {issueTypes.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("विवरण", "Description")}</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required placeholder={t("अपनी चिंता विस्तार से बताएं...", "Describe your concern in detail...")} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>
        <button type="submit" disabled={loading || !issueType || !description} className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors text-sm">
          {loading ? <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : t("शिकायत सबमिट करें", "Submit grievance")}
        </button>
      </form>
    </div>
  );
}
