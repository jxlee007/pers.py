import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { t } = useApp();

  const totalVisitors = "79,00,034";

  return (
    <footer style={{ background: "var(--footer-bg)", color: "#b0bec5" }}>
      {/* ── MAIN FOOTER LINKS ── */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-white font-extrabold text-lg tracking-wide">CPGRAMS</div>
                <div
                  className="text-xs font-bold px-1.5 py-0.5 rounded"
                  style={{ background: "var(--gov-saffron)", color: "white" }}
                >
                  AI
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#78909c" }}>
                {t(
                  "केंद्रीकृत लोक शिकायत निवारण और निगरानी प्रणाली — AI-संचालित स्मार्ट रूटिंग के साथ।",
                  "Centralised Public Grievance Redress And Monitoring System — with AI-powered smart routing."
                )}
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">{t("सेवाएं", "Services")}</h3>
              <ul className="space-y-2 text-xs">
                <li><Link to="/file-complaint" className="hover:text-white transition-colors">{t("शिकायत दर्ज करें", "Lodge Grievance")}</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">{t("शिकायत स्थिति देखें", "View Status")}</Link></li>
                <li><Link to="/accountability" className="hover:text-white transition-colors text-amber-300 font-semibold">📊 {t("पारदर्शिता एवं रैंकिंग", "Accountability & Rankings")}</Link></li>
                <li><Link to="/appeals" className="hover:text-white transition-colors">{t("अपील करें", "File an Appeal")}</Link></li>
                <li><Link to="/directory" className="hover:text-white transition-colors">{t("नोडल PG अधिकारी", "Nodal PG Officers")}</Link></li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">{t("जानकारी", "Information")}</h3>
              <ul className="space-y-2 text-xs">
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">{t("निवारण प्रक्रिया", "Redress Process")}</Link></li>
                <li><Link to="/help" className="hover:text-white transition-colors">{t("सहायता / FAQ", "Help / FAQs")}</Link></li>
                <li><Link to="/feedback" className="hover:text-white transition-colors">{t("फीडबैक", "Feedback")}</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t("गोपनीयता सूचना", "Privacy Notice")}</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">{t("वेबसाइट नीतियां", "Website Policies")}</a></li>
              </ul>
            </div>

            {/* Contact / Helplines */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">{t("हेल्पलाइन", "Helplines")}</h3>
              <ul className="space-y-1.5 text-xs" style={{ color: "#78909c" }}>
                <li>📞 1800-180-1111 <span className="text-gray-500">(EPFO)</span></li>
                <li>📞 1800-425-8850 <span className="text-gray-500">(CBDT)</span></li>
                <li>📞 1800-300-1947 <span className="text-gray-500">(UIDAI)</span></li>
                <li>📞 139 <span className="text-gray-500">(Railway)</span></li>
                <li>📞 1800-200-7777 <span className="text-gray-500">(GST)</span></li>
                <li className="pt-1 text-gray-600 text-xs">DARPG, Government of India</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── SOCIAL / BADGES ── */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: "#546e7a" }}>{t("हम पर", "Follow us:")}</span>
              {[
                { icon: "f", label: "Facebook", color: "#1877f2" },
                { icon: "𝕏", label: "X/Twitter", color: "#000000" },
                { icon: "▶", label: "YouTube", color: "#ff0000" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white hover:opacity-90 transition-opacity"
                  style={{ background: s.color }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Govt badge strip */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {["Digital India 2018", "GOI Web Directory", "india.gov.in", "NIC"].map((badge) => (
                <div
                  key={badge}
                  className="px-2 py-1 rounded text-xs border"
                  style={{ borderColor: "rgba(255,255,255,0.15)", color: "#90a4ae", background: "rgba(255,255,255,0.05)" }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM STRIP ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <p className="text-xs text-center" style={{ color: "#546e7a" }}>
          {t(
            "यह साइट National Informatics Centre, MeitY, Government of India द्वारा डिज़ाइन, विकसित और होस्ट की गई है। सामग्री प्रशासनिक सुधार और लोक शिकायत विभाग के स्वामित्व में है।",
            "This site is designed, developed & hosted by National Informatics Centre, Ministry of Electronics & IT (MeitY), Government of India and Content owned by Department of Administrative Reforms & Public Grievances."
          )}
        </p>
        <p className="text-xs text-center mt-1.5" style={{ color: "#455a64" }}>
          Portal is Compatible with all major Browsers like Google Chrome, Mozilla Firefox, Microsoft Edge, Safari etc. · Best Viewed in 1440 x 900 resolution
        </p>
        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-4 text-xs flex-wrap justify-center" style={{ color: "#546e7a" }}>
            <a href="#" className="hover:text-white transition-colors">{t("अस्वीकरण", "Disclaimer")}</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">{t("वेबसाइट नीतियां", "Website Policies")}</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">{t("वेब सूचना प्रबंधक", "Web Information Manager")}</a>
          </div>
          <div className="text-xs text-center" style={{ color: "#455a64" }}>
            Version 7.0.01092019.0.0 · Last Updated: 21-08-2026 · <span style={{ color: "#546e7a" }}>Total Visitors: <strong style={{ color: "#78909c" }}>{totalVisitors}</strong> (since 19-01-2024)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
