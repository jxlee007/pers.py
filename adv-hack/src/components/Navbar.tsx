import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { lang, setLang, t, currentUser, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: t("होम", "Home") },
    { to: "/file-complaint", label: t("शिकायत दर्ज करें", "Lodge Grievance"), highlight: true },
    { to: "/dashboard", label: t("स्थिति देखें", "View Status") },
    { to: "/accountability", label: t("पारदर्शिता", "Transparency") },
    { to: "/directory", label: t("नोडल PG अधिकारी", "Nodal PG Officers") },
    { to: "/how-it-works", label: t("निवारण प्रक्रिया", "Redress Process") },
    { to: "/appeals", label: t("अपील", "Appeal") },
    { to: "/help", label: t("सहायता", "Help") },
  ];

  const isActive = (to: string) => loc.pathname === to;

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header>
      {/* ── TOP UTILITY STRIP ── */}
      <div className="gov-util-strip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-7">
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline">
              {t("भारत सरकार", "Government of India")} | {t("कार्मिक, लोक शिकायत और पेंशन मंत्रालय", "Ministry of Personnel, Public Grievances & Pensions")}
            </span>
            <span className="sm:hidden text-xs">{t("भारत सरकार", "Govt. of India")}</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:text-white text-xs underline">
              {t("मुख्य सामग्री पर जाएं", "Skip to main content")}
            </a>
            <a href="#" className="hidden sm:inline">{t("होम", "Home")}</a>
            <a href="#" className="hidden sm:inline">{t("संपर्क करें", "Contact Us")}</a>
            <a href="#" className="hidden sm:inline">{t("हमारे बारे में", "About Us")}</a>
            <a href="#" className="hidden sm:inline">{t("सहायता", "FAQs/Help")}</a>
            <a href="#" className="hidden sm:inline">{t("साइट मैप", "Site Map")}</a>
          </div>
        </div>
      </div>

      {/* ── DEPARTMENT HEADER BAR ── */}
      <div className="gov-header-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-2">
          {/* Left: Emblem + Dept Name */}
          <Link to="/" className="flex items-center gap-3">
            {/* Ashoka Emblem SVG placeholder */}
            <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 56 56" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="27" fill="#1a237e" stroke="#e8eaf6" strokeWidth="1"/>
                <circle cx="28" cy="28" r="14" fill="none" stroke="#ff6f00" strokeWidth="1.5"/>
                <circle cx="28" cy="28" r="3" fill="#ff6f00"/>
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 15 * Math.PI) / 180;
                  const x1 = 28 + 11 * Math.sin(angle);
                  const y1 = 28 - 11 * Math.cos(angle);
                  const x2 = 28 + 14 * Math.sin(angle);
                  const y2 = 28 - 14 * Math.cos(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ff6f00" strokeWidth="1"/>;
                })}
                <text x="28" y="52" textAnchor="middle" fontSize="5" fill="#1a237e" fontWeight="bold">INDIA</text>
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500 leading-tight">
                {t("प्रशासनिक सुधार और लोक शिकायत विभाग", "Department of Administrative Reforms & Public Grievances")}
              </div>
              <div className="text-sm sm:text-base font-bold text-[#1a237e] leading-tight">
                {t("CPGRAMS", "CPGRAMS")}
              </div>
              <div className="text-xs text-gray-500 leading-tight hidden sm:block">
                {t("केंद्रीकृत लोक शिकायत निवारण और निगरानी प्रणाली", "Centralized Public Grievance Redress And Monitoring System")}
              </div>
            </div>
          </Link>

          {/* Right: CPGRAMS Badge + Language + Auth */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "hi" ? "en" : "hi")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Toggle language"
            >
              🌐 {lang === "hi" ? "English" : "हिंदी"}
            </button>

            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded transition-colors"
                >
                  <span>👤</span>
                  <span className="max-w-24 truncate">{currentUser.name.split(" ")[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 border border-red-200 rounded transition-colors"
                >
                  {t("लॉगआउट", "Sign Out")}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded transition-colors"
                style={{ background: "var(--gov-saffron)" }}
              >
                <span>→</span>
                {t("साइन इन", "Sign In")}
              </Link>
            )}

            {/* CPGRAMS logo block */}
            <div className="hidden lg:block border-l border-gray-200 pl-4 text-right">
              <div className="text-xl font-extrabold tracking-wide" style={{ color: "var(--gov-navy)" }}>CPGRAMS</div>
              <div className="text-[10px] text-gray-500 leading-tight max-w-36">AI-Powered Smart Routing</div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-2 rounded hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-0.5 bg-gray-600 mb-1.5" />
              <div className="w-5 h-0.5 bg-gray-600 mb-1.5" />
              <div className="w-5 h-0.5 bg-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVIGATION BAR ── */}
      <nav className="gov-nav hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`gov-nav-link ${isActive(link.to) ? "active" : ""} ${link.highlight ? "font-bold" : ""}`}
                style={link.highlight && !isActive(link.to) ? { color: "#ffd54f" } : {}}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-auto flex items-center gap-2 py-1">
              <Link
                to="/file-complaint"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white rounded transition-colors"
                style={{ background: "var(--gov-saffron)" }}
              >
                ✍️ {t("शिकायत दर्ज करें", "Lodge Grievance")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white shadow-lg z-50">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-3 rounded text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-blue-50 text-[#1a237e] font-bold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-2 mt-2 space-y-1">
              <button
                onClick={() => { setLang(lang === "hi" ? "en" : "hi"); setMenuOpen(false); }}
                className="block w-full text-left px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded"
              >
                🌐 {lang === "hi" ? "Switch to English" : "हिंदी में बदलें"}
              </button>
              {currentUser ? (
                <>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded">
                    👤 {currentUser.name}
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded">
                    {t("लॉगआउट", "Sign Out")}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-sm font-medium text-[#1a237e] hover:bg-blue-50 rounded">
                    {t("लॉगिन करें", "Sign In")}
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-sm font-bold text-white rounded text-center" style={{ background: "var(--gov-saffron)" }}>
                    {t("पंजीकरण करें", "Register")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
