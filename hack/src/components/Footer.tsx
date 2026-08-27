import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: "var(--primary)" }}>
                🎯
              </div>
              <span className="font-bold text-white text-sm">CPGRAMS AI</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("भारत सरकार की स्मार्ट शिकायत निवारण प्रणाली — AI द्वारा संचालित।", "India's AI-powered smart grievance redress system — routing complaints to the right ministry, first time.")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-4">{t("सेवाएं", "Services")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/file-complaint" className="hover:text-white transition-colors">{t("शिकायत दर्ज करें", "File a Complaint")}</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">{t("मेरे केस", "Track My Cases")}</Link></li>
              <li><Link to="/appeals" className="hover:text-white transition-colors">{t("अपील करें", "File an Appeal")}</Link></li>
              <li><Link to="/directory" className="hover:text-white transition-colors">{t("अधिकारी निर्देशिका", "Officer Directory")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-4">{t("जानें", "Learn")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">{t("यह कैसे काम करता है", "How It Works")}</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">{t("सहायता केंद्र", "Help Center")}</Link></li>
              <li><Link to="/feedback" className="hover:text-white transition-colors">{t("फीडबैक दें", "Give Feedback")}</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">{t("गोपनीयता", "Privacy Notice")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-4">{t("संपर्क", "Contact")}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📞 1800-180-1111 (EPFO)</li>
              <li>📞 1800-425-8850 (CBDT)</li>
              <li>📞 1800-300-1947 (UIDAI)</li>
              <li>📞 139 (Railway)</li>
              <li className="pt-2 text-xs">DARPG, Government of India</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 CPGRAMS AI · {t("भारत सरकार", "Government of India")} · {t("सर्वाधिकार सुरक्षित", "All rights reserved")}
          </p>
          <p className="text-xs text-gray-600">
            {t("AI द्वारा संचालित — OpenAI GPT-4", "Powered by AI — OpenAI GPT-4")}
          </p>
        </div>
      </div>
    </footer>
  );
}
