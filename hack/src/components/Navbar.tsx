import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { lang, setLang, t, currentUser, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: "/", label: t("होम", "Home") },
    { to: "/file-complaint", label: t("शिकायत दर्ज करें", "File Complaint") },
    { to: "/dashboard", label: t("मेरे केस", "My Cases") },
    { to: "/directory", label: t("अधिकारी", "Directory") },
    { to: "/appeals", label: t("अपील", "Appeals") },
    { to: "/how-it-works", label: t("यह कैसे काम करता है", "How It Works") },
    { to: "/help", label: t("मदद", "Help") },
  ];

  const isActive = (to: string) => loc.pathname === to;

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: "var(--primary)" }}>
              🎯
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900 text-sm leading-tight">CPGRAMS AI</div>
              <div className="text-xs text-gray-500 leading-tight">{t("स्मार्ट शिकायत राउटर", "Smart Complaint Router")}</div>
            </div>
            <div className="sm:hidden font-bold text-gray-900 text-sm">CPGRAMS AI</div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(l.to) ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "hi" ? "en" : "hi")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Toggle language"
            >
              🇮🇳 {lang === "hi" ? "EN" : "हि"}
            </button>

            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-200 transition-colors"
                >
                  <span>👤</span>
                  <span className="max-w-20 truncate">{currentUser.name.split(" ")[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                >
                  {t("लॉगआउट", "Logout")}
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-200 transition-colors"
                >
                  {t("लॉगिन", "Login")}
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                  style={{ background: "var(--primary)" }}
                >
                  {t("खाता बनाएं", "Sign Up")}
                </Link>
              </div>
            )}

            <Link
              to="/file-complaint"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{ background: currentUser ? "var(--primary)" : "#6B7280" }}
            >
              <span>+</span>
              <span>{t("शिकायत करें", "File Complaint")}</span>
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-0.5 bg-gray-600 mb-1.5"></div>
              <div className="w-5 h-0.5 bg-gray-600 mb-1.5"></div>
              <div className="w-5 h-0.5 bg-gray-600"></div>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(l.to) ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-2 mt-2">
              {currentUser ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">
                    👤 {currentUser.name}
                  </Link>
                  <Link to="/privacy" onClick={() => setMenuOpen(false)} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">
                    🔒 {t("गोपनीयता और डेटा", "Privacy & Data")}
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50">
                    {t("लॉगआउट", "Logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">
                    {t("लॉगिन", "Login")}
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="block px-3 py-3 rounded-lg text-base font-medium text-indigo-700 hover:bg-indigo-50">
                    {t("खाता बनाएं", "Sign Up")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
