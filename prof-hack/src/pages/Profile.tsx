import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { updateUser } from "../services/authService";

export default function Profile() {
  const { t, currentUser, login, logout } = useApp();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [saved, setSaved] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t("लॉगिन आवश्यक है।", "Login required.")}</p>
          <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold">{t("लॉगिन करें", "Login")}</Link>
        </div>
      </div>
    );
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const updated = updateUser(currentUser!.id, { name, email });
    if (updated) {
      login(updated);
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  const actions = [
    { icon: "📋", label: t("मेरी शिकायतें", "My Complaints"), href: "/dashboard" },
    { icon: "🔒", label: t("गोपनीयता और डेटा", "Privacy & Data"), href: "/privacy" },
    { icon: "🔔", label: t("सूचनाएं", "Notifications"), href: "/privacy/consent" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{currentUser.name}</h1>
          <p className="text-sm text-gray-500">{currentUser.email || currentUser.mobile}</p>
        </div>
      </div>

      {saved && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
          ✓ {t("प्रोफाइल अपडेट हो गई।", "Profile updated successfully.")}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">{t("व्यक्तिगत जानकारी", "Personal Information")}</h2>
          {!editing && (
            <button onClick={() => setEditing(true)} className="text-sm text-indigo-600 hover:underline font-medium">{t("संपादित करें", "Edit")}</button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t("नाम", "Name")}</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t("ईमेल", "Email")}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={() => setEditing(false)} className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">{t("रद्द करें", "Cancel")}</button>
              <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">{t("सहेजें", "Save")}</button>
            </div>
          </form>
        ) : (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">{t("नाम", "Name")}</span><span className="font-medium">{currentUser.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">{t("मोबाइल", "Mobile")}</span><span className="font-medium">{currentUser.mobile || "—"}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">{t("ईमेल", "Email")}</span><span className="font-medium">{currentUser.email || "—"}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">{t("खाता बना", "Account created")}</span><span className="font-medium">{new Date(currentUser.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span></div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100 mb-4">
        {actions.map((a) => (
          <Link key={a.href} to={a.href} className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors">
            <span className="text-xl">{a.icon}</span>
            <span className="flex-1 text-sm font-medium text-gray-800">{a.label}</span>
            <span className="text-gray-400">›</span>
          </Link>
        ))}
      </div>

      <button
        onClick={() => { logout(); navigate("/"); }}
        className="w-full py-3.5 border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors text-sm"
      >
        {t("लॉगआउट", "Logout")}
      </button>
    </div>
  );
}
