import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { t, currentUser, logout } = useApp();

  const totalVisitors = "79,00,034";

  // Official live government portal links
  const govPortals = [
    { label: t("CPGRAMS आधिकारिक पोर्टल", "CPGRAMS Official Portal"), url: "https://pgportal.gov.in", note: "pgportal.gov.in" },
    { label: t("भारत का राष्ट्रीय पोर्टल", "National Portal of India"), url: "https://www.india.gov.in", note: "india.gov.in" },
    { label: t("प्रशासनिक सुधार और लोक शिकायत विभाग", "DARPG (Grievance Reforms)"), url: "https://darpg.gov.in", note: "darpg.gov.in" },
    { label: t("कार्मिक और प्रशिक्षण विभाग", "DoPT (Personnel & Training)"), url: "https://dopt.gov.in", note: "dopt.gov.in" },
    { label: t("डिजिटल इंडिया", "Digital India"), url: "https://www.digitalindia.gov.in", note: "digitalindia.gov.in" },
    { label: t("राष्ट्रीय सूचना विज्ञान केंद्र", "National Informatics Centre (NIC)"), url: "https://www.nic.in", note: "nic.in" },
    { label: t("माईगॉव (MyGov)", "MyGov Citizen Portal"), url: "https://www.mygov.in", note: "mygov.in" },
    { label: t("लोक शिकायत निदेशालय (कैबिनेट सचिवालय)", "DPG (Cabinet Secretariat)"), url: "https://dpg.gov.in", note: "dpg.gov.in" },
  ];

  return (
    <footer style={{ background: "var(--footer-bg)", color: "#cbd5e1" }} className="border-t border-gray-800">
      {/* ── TOP SECTION: CPGRAMS BRANDING & DIRECTORY ── */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* CPGRAMS Section Reordered to the TOP */}
          <div className="mb-10 pb-8 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <a
                    href="https://pgportal.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:text-amber-300 transition-colors flex items-center gap-2"
                    title={t("आधिकारिक CPGRAMS पोर्टल खोलें (pgportal.gov.in)", "Visit Official CPGRAMS Portal (pgportal.gov.in)")}
                  >
                    <span>CPGRAMS</span>
                    <span className="text-sm font-normal text-blue-300 underline">↗ pgportal.gov.in</span>
                  </a>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded shadow-2xs tracking-wider"
                    style={{ background: "var(--gov-saffron)", color: "white" }}
                  >
                    {t("AI-सक्षम", "AI-Enabled")}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 border border-blue-700/50">
                    {t("भारत सरकार", "Government of India")}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-semibold text-gray-200 mb-1">
                  {t(
                    "केंद्रीकृत लोक शिकायत निवारण और निगरानी प्रणाली (CPGRAMS)",
                    "Centralised Public Grievance Redress And Monitoring System (CPGRAMS)"
                  )}
                </div>
              </div>

              {/* Authentication Access (Login / Sign In Button) */}
              <div className="flex items-center gap-3 self-start lg:self-center">
                {currentUser ? (
                  <div className="flex items-center gap-3 bg-white/5 border border-white/15 rounded-lg px-4 py-2.5">
                    <div className="text-xs sm:text-sm">
                      <div className="text-gray-400">{t("लॉग इन किया गया:", "Signed in as:")}</div>
                      <div className="text-white font-bold truncate max-w-40">{currentUser.name}</div>
                    </div>
                    <Link
                      to="/profile"
                      className="px-3 py-1.5 rounded text-xs font-semibold bg-blue-900/80 hover:bg-blue-800 text-white transition-colors"
                    >
                      {t("प्रोफ़ाइल", "Profile")}
                    </Link>
                    <button
                      onClick={logout}
                      className="px-3 py-1.5 rounded text-xs font-semibold bg-red-950/60 hover:bg-red-900 border border-red-800/80 text-red-200 transition-colors"
                    >
                      {t("लॉगआउट", "Sign Out")}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      to="/login"
                      className="btn-gov-accent text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all"
                      style={{ padding: "12px 28px" }}
                    >
                      👤 {t("पोर्टल लॉगिन करें", "Citizen Login")}
                    </Link>
                    <Link
                      to="/signup"
                      className="px-5 py-3 rounded text-sm sm:text-base font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/25 transition-colors"
                    >
                      {t("नया पंजीकरण", "Register")}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Remaining Paragraph (<p>) Content Shifted Directly Below CPGRAMS Section */}
            <div className="mt-5 space-y-3 text-sm sm:text-base text-gray-300 leading-relaxed max-w-5xl">
              <p>
                {t(
                  "केंद्रीकृत लोक शिकायत निवारण और निगरानी प्रणाली (CPGRAMS) नागरिकों को 24×7 किसी भी सार्वजनिक प्राधिकरण को सेवा वितरण से संबंधित विषय पर अपनी शिकायत दर्ज करने के लिए उपलब्ध एक एकल ऑनलाइन मंच है। यह भारत सरकार और राज्यों के सभी मंत्रालयों/विभागों से जुड़ा हुआ है — अब AI-सक्षम स्मार्ट रूटिंग के साथ।",
                  "Centralised Public Grievance Redress And Monitoring System (CPGRAMS) is an online platform available to citizens 24×7 to lodge their grievances to public authorities on any subject related to service delivery. It is a unified portal connected to all Ministries/Departments of the Government of India and States — now enhanced with AI-enabled smart routing."
                )}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                {t(
                  "यह साइट National Informatics Centre (NIC), इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय (MeitY), भारत सरकार द्वारा डिज़ाइन, विकसित और होस्ट की गई है। सामग्री का स्वामित्व प्रशासनिक सुधार और लोक शिकायत विभाग (DARPG) के पास है।",
                  "This site is designed, developed & hosted by National Informatics Centre (NIC), Ministry of Electronics & IT (MeitY), Government of India. Content is owned by Department of Administrative Reforms & Public Grievances (DARPG)."
                )}
              </p>
              <p className="text-xs text-gray-400">
                {t(
                  "पोर्टल सभी प्रमुख आधुनिक ब्राउज़रों जैसे Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari आदि के साथ पूरी तरह संगत है। सर्वोत्तम अनुभव के लिए 1440 × 900 या उच्चतर रिज़ॉल्यूशन अनुशंसित है।",
                  "Portal is compatible with all major browsers like Google Chrome, Mozilla Firefox, Microsoft Edge, Safari etc. · Best viewed in 1440 × 900 resolution or higher."
                )}
              </p>
            </div>
          </div>

          {/* ── 4 EXPANDED MULTI-COLUMN CONTENT GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-sm">
            {/* Column 1: Citizen Services */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                <span>📋</span>
                <span>{t("नागरिक सेवाएं", "Citizen Services")}</span>
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/file-complaint" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>✍️</span> {t("शिकायत दर्ज करें", "Lodge Grievance")}
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>🔍</span> {t("शिकायत स्थिति देखें", "View Status / Track")}
                  </Link>
                </li>
                <li>
                  <Link to="/accountability" className="text-amber-300 hover:text-amber-200 font-semibold transition-colors flex items-center gap-1.5">
                    <span>📊</span> {t("पारदर्शिता एवं जवाबदेही", "Accountability & Rankings")}
                  </Link>
                </li>
                <li>
                  <Link to="/appeals" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>⚖️</span> {t("अपील दर्ज करें", "File an Appeal")}
                  </Link>
                </li>
                <li>
                  <Link to="/directory" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5">
                    <span>👤</span> {t("नोडल PG अधिकारी सूची", "Nodal PG Officers Directory")}
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-blue-300 hover:text-white font-medium transition-colors flex items-center gap-1.5">
                    <span>🔐</span> {t("उपयोगकर्ता लॉगिन / साइन इन", "Citizen Login / Sign In")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Live Government Portals (New Functional Hyperlinks) */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                <span>🏛️</span>
                <span>{t("सरकारी पोर्टल लिंक", "Official Government Portals")}</span>
              </h3>
              <ul className="space-y-2 text-sm">
                {govPortals.slice(0, 5).map((p) => (
                  <li key={p.url}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white hover:underline transition-colors flex items-baseline justify-between gap-1 group"
                      title={`${p.label} (${p.note})`}
                    >
                      <span className="truncate group-hover:text-amber-300">{p.label}</span>
                      <span className="text-[11px] text-gray-500 font-mono flex-shrink-0">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Important Department Links */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                <span>🔗</span>
                <span>{t("महत्वपूर्ण विभाग", "Related Authorities")}</span>
              </h3>
              <ul className="space-y-2 text-sm">
                {govPortals.slice(5).map((p) => (
                  <li key={p.url}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white hover:underline transition-colors flex items-baseline justify-between gap-1 group"
                      title={`${p.label} (${p.note})`}
                    >
                      <span className="truncate group-hover:text-amber-300">{p.label}</span>
                      <span className="text-[11px] text-gray-500 font-mono flex-shrink-0">↗</span>
                    </a>
                  </li>
                ))}
                <li>
                  <Link to="/dpdp" className="text-amber-300 hover:text-amber-200 font-semibold transition-colors flex items-center gap-1">
                    <span>🛡️</span> {t("DPDP 2023 अनुपालन केंद्र", "DPDP Act 2023 Compliance")}
                  </Link>
                </li>
                <li>
                  <Link to="/pow-demo" className="text-green-300 hover:text-green-200 font-semibold transition-colors flex items-center gap-1">
                    <span>⚡</span> {t("PoW कैप्चा सुरक्षा डेमो", "PoW CAPTCHA Security Demo")}
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                    <span>💡</span> {t("निवारण प्रक्रिया", "Redress Process Guide")}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                    <span>🔒</span> {t("गोपनीयता सूचना", "Privacy Notice")}
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                    <span>❓</span> {t("अक्सर पूछे जाने वाले प्रश्न (FAQ)", "FAQs & Guidance")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: 24x7 Helplines */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                <span>📞</span>
                <span>{t("हेल्पलाइन नंबर", "National Helplines")}</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">EPFO ({t("पेंशन", "Pension")}):</span>
                  <a href="tel:18001801111" className="font-mono font-bold text-white hover:text-amber-300">1800-180-1111</a>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">CBDT ({t("आयकर", "Income Tax")}):</span>
                  <a href="tel:18004258850" className="font-mono font-bold text-white hover:text-amber-300">1800-425-8850</a>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">UIDAI ({t("आधार", "Aadhaar")}):</span>
                  <a href="tel:18003001947" className="font-mono font-bold text-white hover:text-amber-300">1800-300-1947</a>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">{t("रेलवे सेवा", "Railways")}:</span>
                  <a href="tel:139" className="font-mono font-bold text-white hover:text-amber-300">139</a>
                </li>
                <li className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">GSTN ({t("वस्तु एवं सेवा कर", "GST")}):</span>
                  <a href="tel:18002007777" className="font-mono font-bold text-white hover:text-amber-300">1800-200-7777</a>
                </li>
                <li className="pt-2 text-xs text-gray-400 leading-snug">
                  {t("DARPG कंट्रोल रूम:", "DARPG Control Room:")} 011-23401455 · 24×7
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── MIDDLE SECTION: SOCIAL & OFFICIAL GOVERNMENT PORTAL BADGES ── */}
      <div className="border-b border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-300">{t("हम पर जुड़े:", "Follow Us:")}</span>
              {[
                { icon: "f", label: "Facebook", color: "#1877f2", url: "https://www.facebook.com" },
                { icon: "𝕏", label: "X/Twitter", color: "#000000", url: "https://twitter.com" },
                { icon: "▶", label: "YouTube", color: "#ff0000", url: "https://www.youtube.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white hover:scale-105 transition-transform"
                  style={{ background: s.color }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Functioning Government Badges with Live URLs */}
            <div className="flex items-center gap-3 flex-wrap justify-center text-xs">
              {[
                { name: "Digital India", url: "https://www.digitalindia.gov.in" },
                { name: "GOI Web Directory", url: "https://goidirectory.gov.in" },
                { name: "india.gov.in", url: "https://www.india.gov.in" },
                { name: "NIC India", url: "https://www.nic.in" },
                { name: "pgportal.gov.in", url: "https://pgportal.gov.in" },
              ].map((badge) => (
                <a
                  key={badge.name}
                  href={badge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded text-xs font-semibold border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all flex items-center gap-1"
                >
                  <span>🏛️ {badge.name}</span>
                  <span className="text-[10px] text-gray-400">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM STRIP: POLICIES & AUDIT INFORMATION ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-xs text-gray-400">
          {/* Exact links from user image */}
          <div className="flex items-center gap-4 flex-wrap justify-center text-xs sm:text-sm text-gray-400">
            <Link to="/disclaimer" className="hover:text-white hover:underline transition-colors">
              {t("अस्वीकरण", "Disclaimer")}
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/website-policies" className="hover:text-white hover:underline transition-colors">
              {t("वेबसाइट नीतियां", "Website Policies")}
            </Link>
            <span className="text-gray-600">|</span>
            <a
              href="https://darpg.gov.in/en/web-information-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition-colors"
            >
              {t("वेब सूचना प्रबंधक", "Web Information Manager")}
            </a>
          </div>

          <div className="text-center sm:text-right text-xs">
            <div>
              Version 7.0.01092026.0.0 · {t("अंतिम अद्यतन:", "Last Updated:")} 27-08-2026
            </div>
            <div className="text-gray-400 mt-1">
              {t("कुल आगंतुक संख्या:", "Total Visitors:")}{" "}
              <strong className="text-amber-300 font-mono">{totalVisitors}</strong> (since 19-01-2024)
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
