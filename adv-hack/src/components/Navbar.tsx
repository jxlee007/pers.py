import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { lang, setLang, t, currentUser, logout, theme, toggleTheme, textScale, setTextScale, increaseTextScale, decreaseTextScale, resetTextScale } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: t("होम", "Home") },
    { to: "/file-complaint", label: t("शिकायत दर्ज करें", "Lodge Grievance"), highlight: true },
    { to: "/dashboard", label: t("स्थिति देखें", "View Status") },
    { to: "/accountability", label: t("पारदर्शिता", "Transparency") },
    { to: "/directory", label: t("नोडल PG अधिकारी", "Nodal PG Officers") },
    { to: "/how-it-works", label: t("हमारा दृष्टिकोण", "Our Approach") },
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
      {/* ── TOP UTILITY STRIP (WITH ACCESSIBILITY & THEME) ── */}
      <div className="gov-util-strip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-8 text-xs">
          {/* Left: Govt Identity */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-medium">
              {t("भारत सरकार", "Government of India")} | {t("कार्मिक, लोक शिकायत और पेंशन मंत्रालय", "Ministry of Personnel, Public Grievances & Pensions")}
            </span>
            <span className="sm:hidden font-medium">{t("भारत सरकार", "Govt. of India")}</span>
          </div>

          {/* Right: Accessibility Controls & Quick Links */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:text-white text-xs underline mr-2">
              {t("मुख्य सामग्री पर जाएं", "Skip to main content")}
            </a>

            {/* ── PERMANENT TEXT SCALER WIDGET ── */}
            <div
              className="flex items-center bg-white/10 rounded px-1 py-0.5 border border-white/20"
              title={t("फ़ॉन्ट आकार बदलें", "Text Scaling / Zoom")}
              role="group"
              aria-label="Text Size Controls"
            >
              <span className="sr-only">{t("पाठ आकार", "Font Size")}</span>
              <button
                type="button"
                onClick={decreaseTextScale}
                disabled={textScale === "sm"}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  textScale === "sm" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-200 hover:text-white hover:bg-white/10"
                } disabled:opacity-30 disabled:cursor-not-allowed`}
                title={t("आकार छोटा करें (A-)", "Decrease Text Size (A-)")}
                aria-label="Decrease Text Size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={resetTextScale}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  textScale === "md" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
                title={t("सामान्य आकार (A)", "Default Text Size (A)")}
                aria-label="Normal Text Size"
              >
                A
              </button>
              <button
                type="button"
                onClick={increaseTextScale}
                disabled={textScale === "xl"}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
                  textScale === "lg" || textScale === "xl" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-200 hover:text-white hover:bg-white/10"
                } disabled:opacity-30 disabled:cursor-not-allowed`}
                title={t("आकार बड़ा करें (A+)", "Increase Text Size (A+)")}
                aria-label="Increase Text Size"
              >
                A+
              </button>
            </div>

            {/* ── DEDICATED DARK MODE TOGGLE ── */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-medium text-white border border-white/20 transition-all cursor-pointer"
              title={theme === "dark" ? t("लाइट मोड सक्षम करें", "Switch to Light Mode") : t("डार्क मोड सक्षम करें", "Switch to Dark Mode")}
              aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <span>{theme === "dark" ? "☀️" : "🌙"}</span>
              <span className="hidden sm:inline">
                {theme === "dark" ? t("लाइट", "Light") : t("डार्क", "Dark")}
              </span>
            </button>

            {/* Language Toggle in Top Strip for mobile/convenience */}
            <button
              type="button"
              onClick={() => setLang(lang === "hi" ? "en" : "hi")}
              className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white border border-white/20 transition-colors"
              aria-label="Toggle language"
            >
              {lang === "hi" ? "ENG" : "हिन्दी"}
            </button>

            {/* Quick Gov links */}
            <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hidden lg:inline text-gray-300 hover:text-white text-[11px]">
              india.gov.in
            </a>
          </div>
        </div>
      </div>

      {/* ── DEPARTMENT HEADER BAR ── */}
      <div className="gov-header-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-2">
          {/* Left: Emblem + Dept Name */}
          <Link to="/" className="flex items-center gap-3">
            {/* Ashoka Emblem SVG */}
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
                <text x="28" y="52" textAnchor="middle" fontSize="5" fill="#ffffff" fontWeight="bold">INDIA</text>
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500 leading-tight">
                {t("प्रशासनिक सुधार और लोक शिकायत विभाग", "Department of Administrative Reforms & Public Grievances")}
              </div>
              <div className="text-base sm:text-lg font-bold text-[#1a237e] dark:text-blue-300 leading-tight">
                {t("CPGRAMS", "CPGRAMS")}
              </div>
              <div className="text-xs text-gray-500 leading-tight hidden sm:block">
                {t("केंद्रीकृत लोक शिकायत निवारण और निगरानी प्रणाली", "Centralized Public Grievance Redress And Monitoring System")}
              </div>
            </div>
          </Link>

          {/* Right: CPGRAMS Badge + Auth */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded transition-colors"
                >
                  <span>👤</span>
                  <span className="max-w-24 truncate">{currentUser.name.split(" ")[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-800 rounded transition-colors cursor-pointer"
                >
                  {t("लॉगआउट", "Sign Out")}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded transition-colors shadow-2xs"
                style={{ background: "var(--gov-saffron)" }}
              >
                <span>→</span>
                {t("साइन इन", "Sign In")}
              </Link>
            )}

            {/* CPGRAMS logo block with updated AI-Enabled tagline */}
            <div className="hidden lg:block border-l border-gray-200 dark:border-gray-700 pl-4 text-right">
              <div className="text-xl font-extrabold tracking-wide text-[#1a237e] dark:text-blue-300">CPGRAMS</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-tight max-w-36">
                {t("AI-सक्षम स्मार्ट रूटिंग", "AI-Enabled Smart Routing")}
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1.5" />
              <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1.5" />
              <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300" />
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
        <div className="sm:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] shadow-xl z-50">
          <div className="px-4 py-2 space-y-1">
            {/* Mobile Accessibility Bar */}
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800/50 rounded mb-2 text-xs">
              <span className="text-gray-500 dark:text-gray-400 font-semibold">{t("एक्सेसिबिलिटी", "Accessibility")}:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
                >
                  {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                </button>
                <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 rounded px-1">
                  <button onClick={decreaseTextScale} className="px-1.5 py-0.5 font-bold">A-</button>
                  <button onClick={resetTextScale} className="px-1.5 py-0.5 font-bold">A</button>
                  <button onClick={increaseTextScale} className="px-1.5 py-0.5 font-bold">A+</button>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-3 rounded text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-blue-50 dark:bg-blue-950/40 text-[#1a237e] dark:text-blue-300 font-bold"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-2 mt-2 space-y-1">
              <button
                onClick={() => { setLang(lang === "hi" ? "en" : "hi"); setMenuOpen(false); }}
                className="block w-full text-left px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
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
