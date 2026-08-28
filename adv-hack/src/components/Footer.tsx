import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { t } = useApp();

  const totalVisitors = "79,00,034";

  const helplines = [
    { label: t("EPFO (पेंशन)", "EPFO (Pension)"), number: "1800-180-1111", href: "tel:18001801111" },
    { label: t("CBDT (आयकर)", "CBDT (Tax)"), number: "1800-425-8850", href: "tel:18004258850" },
    { label: t("UIDAI (आधार)", "UIDAI (Aadhaar)"), number: "1800-300-1947", href: "tel:18003001947" },
    { label: t("रेलवे", "Railways"), number: "139", href: "tel:139" },
    { label: t("DARPG कंट्रोल रूम", "DARPG 24×7"), number: "011-23401455", href: "tel:01123401455" },
  ];

  const officialPortals = [
    { name: "pgportal.gov.in", label: t("CPGRAMS मूल पोर्टल", "CPGRAMS Official"), url: "https://pgportal.gov.in" },
    { name: "darpg.gov.in", label: t("प्रशासनिक सुधार विभाग", "DARPG Ministry"), url: "https://darpg.gov.in" },
    { name: "india.gov.in", label: t("भारत का राष्ट्रीय पोर्टल", "National Portal of India"), url: "https://www.india.gov.in" },
    { name: "digitalindia.gov.in", label: t("डिजिटल इंडिया", "Digital India"), url: "https://www.digitalindia.gov.in" },
  ];

  return (
    <footer style={{ background: "var(--footer-bg)", color: "#cbd5e1" }} className="border-t border-gray-800 text-sm">
      {/* ── MAIN FOOTER CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Column 1 & 2: Brand, Identity & Helplines (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Link to="/" className="text-white font-extrabold text-2xl tracking-wide hover:text-amber-400 transition-colors flex items-center gap-2">
                <span>🏛️ CPGRAMS</span>
              </Link>
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs tracking-wider"
                style={{ background: "var(--gov-saffron)", color: "white" }}
              >
                {t("AI-सक्षम 2.0", "AI-Enabled 2.0")}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 border border-blue-700/50">
                {t("भारत सरकार", "Govt. of India")}
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              {t(
                "केंद्रीकृत लोक शिकायत निवारण और निगरानी प्रणाली — नागरिकों को 24×7 पारदर्शी, स्वतः-रूटिंग और जवाबदेह शिकायत निवारण सुविधा।",
                "Centralised Public Grievance Redress And Monitoring System — 24×7 transparent, auto-routed, and accountable public grievance redressal."
              )}
            </p>

            {/* Compact Helplines Strip */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>📞</span> {t("24×7 राष्ट्रीय हेल्पलाइन नंबर", "National 24×7 Helplines")}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {helplines.map((h) => (
                  <a
                    key={h.number}
                    href={h.href}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="text-gray-400 text-[11px]">{h.label}:</span>
                    <span className="font-mono font-bold text-amber-300">{h.number}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Citizen Grievance Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3.5 pb-1 border-b border-white/10">
              {t("नागरिक सेवाएं", "Grievance Services")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/file-complaint" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>✍️</span> {t("शिकायत दर्ज करें", "Lodge Grievance")}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>🔍</span> {t("स्थिति ट्रैक करें", "Track Grievance")}
                </Link>
              </li>
              <li>
                <Link to="/accountability" className="text-amber-300 hover:text-amber-200 font-semibold transition-colors flex items-center gap-1.5">
                  <span>📊</span> {t("जवाबदेही रडार", "Accountability Radar")}
                </Link>
              </li>
              <li>
                <Link to="/appeals" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>⚖️</span> {t("अपील प्रक्रिया", "Appeals Process")}
                </Link>
              </li>
              <li>
                <Link to="/directory" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>👤</span> {t("नोडल अधिकारी सूची", "Nodal PG Directory")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Privacy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3.5 pb-1 border-b border-white/10">
              {t("अनुपालन एवं नीतियां", "Compliance & Policies")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dpdp" className="text-amber-300 hover:text-amber-200 font-semibold transition-colors flex items-center gap-1.5">
                  <span>🛡️</span> {t("DPDP 2023 अनुपालन", "DPDP 2023 Compliance")}
                </Link>
              </li>
              <li>
                <Link to="/pow-demo" className="text-emerald-300 hover:text-emerald-200 font-semibold transition-colors flex items-center gap-1.5">
                  <span>⚡</span> {t("PoW कैप्चा सुरक्षा", "PoW CAPTCHA Demo")}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>🔒</span> {t("गोपनीयता सूचना", "Privacy Notice")}
                </Link>
              </li>
              <li>
                <Link to="/website-policies" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>📜</span> {t("वेबसाइट नीतियां", "Website Policies")}
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>⚖️</span> {t("अस्वीकरण", "Disclaimer")}
                </Link>
              </li>
              <li>
                <Link to="/web-information-manager" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>ℹ️</span> {t("वेब सूचना प्रबंधक", "Web Info Manager")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Official Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3.5 pb-1 border-b border-white/10">
              {t("सरकारी पोर्टल", "Official Portals")}
            </h4>
            <ul className="space-y-2 text-xs">
              {officialPortals.map((p) => (
                <li key={p.url}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span className="group-hover:text-amber-300 truncate">{p.label}</span>
                    <span className="text-[10px] text-gray-600 group-hover:text-gray-400 font-mono">↗</span>
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/help" className="text-blue-300 hover:text-white transition-colors flex items-center gap-1 font-medium">
                  <span>❓</span> {t("सहायता एवं FAQ", "Help & Guidance")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR: ATTRIBUTION & METRICS ── */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div className="text-center sm:text-left">
            <span>
              {t(
                "प्रशासनिक सुधार और लोक शिकायत विभाग (DARPG), भारत सरकार",
                "Department of Administrative Reforms & Public Grievances (DARPG), Govt. of India"
              )}
            </span>
            <span className="hidden sm:inline mx-2 text-gray-600">|</span>
            <span className="block sm:inline text-gray-400">
              {t("राष्ट्रीय सूचना विज्ञान केंद्र (NIC) द्वारा होस्टेड", "Hosted by National Informatics Centre (NIC)")}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-400 flex-wrap justify-center">
            <span>v7.0</span>
            <span className="text-gray-600">•</span>
            <span>{t("आगंतुक:", "Visitors:")} <strong className="text-amber-300 font-mono">{totalVisitors}</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
