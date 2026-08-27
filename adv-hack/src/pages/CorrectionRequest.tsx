import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { submitPrivacyRequest, updateUser } from "../services/authService";

export default function CorrectionRequest() {
  const { t, currentUser, login } = useApp();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!currentUser) return <div className="p-8 text-center"><Link to="/login" className="text-indigo-600 underline">{t("लॉगिन करें", "Login")}</Link></div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    submitPrivacyRequest({ userId: currentUser!.id, type: "correction", description: `Name: ${name}, Email: ${email}` });
    const updated = updateUser(currentUser!.id, { name, email });
    if (updated) login(updated);
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t("सुधार अनुरोध सबमिट हो गया", "Correction request submitted")}</h2>
        <p className="text-sm text-gray-500 mb-6">{t("आपका सुधार अनुरोध प्राप्त हो गया और प्रोफाइल अपडेट हो गई।", "Your correction request has been received and profile updated.")}</p>
        <Link to="/privacy" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm">{t("गोपनीयता केंद्र", "Privacy Centre")}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">← {t("वापस", "Back")}</Link>
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-1">{t("मेरी जानकारी सुधारें", "Correct my information")}</h1>
      <p className="text-sm text-gray-500 mb-6">{t("नीचे सही जानकारी दर्ज करें।", "Enter the correct information below.")}</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t("वर्तमान नाम", "Current name")}</label>
          <p className="text-sm text-gray-400 mb-2">{currentUser.name}</p>
          <label className="block text-xs font-semibold text-gray-700 mb-1">{t("नया नाम", "New name")}</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">{t("वर्तमान ईमेल", "Current email")}</label>
          <p className="text-sm text-gray-400 mb-2">{currentUser.email || "—"}</p>
          <label className="block text-xs font-semibold text-gray-700 mb-1">{t("नया ईमेल", "New email")}</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button type="submit" disabled={loading} className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors text-sm">
          {loading ? <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : t("सुधार अनुरोध सबमिट करें", "Submit correction request")}
        </button>
      </form>
    </div>
  );
}
