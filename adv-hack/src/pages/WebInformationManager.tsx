import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function WebInformationManager() {
  const { t } = useApp();

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }} id="main-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Link to="/" className="hover:underline">{t("होम", "Home")}</Link>
          <span>›</span>
          <span className="text-gray-800 dark:text-gray-200 font-semibold">{t("वेब सूचना प्रबंधक", "Web Information Manager")}</span>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#131a2a]">
            <div className="inline-flex items-center gap-2 text-xs font-bold px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/50 text-[#1a237e] dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
              🇮🇳 {t("GIGW 3.0 अनिवार्य वैधानिक पद", "Mandatory GIGW 3.0 Statutory Role")}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {t("वेब सूचना प्रबंधक (Web Information Manager)", "Web Information Manager")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t(
                "भारत सरकार के वेबसाइट दिशानिर्देशों (GIGW) के तहत नामित नोडल अधिकारी।",
                "Designated Nodal Officer under Guidelines for Indian Government Websites (GIGW)."
              )}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Overview Box */}
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
              <p>
                {t(
                  "भारत सरकार के दिशानिर्देशों (GIGW 3.0) के अनुसार, CPGRAMS पोर्टल पर प्रकाशित सभी सामग्री की गुणवत्ता, प्रमाणिकता, सुरक्षा, समयबद्ध अद्यतन और दिव्यांगजन सुगमता सुनिश्चित करने के लिए एक समर्पित 'वेब सूचना प्रबंधक' (WIM) को नियुक्त किया गया है। पोर्टल संबंधी किसी भी सुझाव या सामग्री सुधार के लिए आप सीधे संपर्क कर सकते हैं।",
                  "In compliance with the Guidelines for Indian Government Websites (GIGW 3.0), a designated Web Information Manager (WIM) oversees the quality, authenticity, security, accessibility, and currency of all content published on the CPGRAMS portal."
                )}
              </p>
            </div>

            {/* Officer Details Card */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gray-50/60 dark:bg-[#111827]">
              <div className="flex items-start gap-4 flex-col sm:flex-row">
                <div className="w-16 h-16 rounded-full bg-[#1a237e] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-md">
                  SP
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/50 px-2 py-0.5 rounded border border-green-200 dark:border-green-800">
                    ✓ {t("नामित वेब सूचना प्रबंधक", "Designated Web Information Manager")}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                    {t("श्री सरदेन्दु कुमार पांडे", "Shri Sardendu Kumar Pandey")}
                  </h2>
                  <div className="text-sm font-semibold text-[#1a237e] dark:text-blue-300">
                    {t("निदेशक (लोक शिकायत) / Director (Public Grievances)", "Director (Public Grievances)")}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {t("प्रशासनिक सुधार और लोक शिकायत विभाग (DARPG)", "Department of Administrative Reforms & Public Grievances (DARPG)")}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t("कार्मिक, लोक शिकायत और पेंशन मंत्रालय, भारत सरकार", "Ministry of Personnel, Public Grievances & Pensions, Govt. of India")}
                  </div>

                  {/* Contact Table */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white dark:bg-[#182236] p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-gray-400 font-semibold uppercase text-[10px] block">{t("कार्यालय का पता", "Office Address")}</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200 mt-1 block">
                        Room No. 512, 5th Floor, Sardar Patel Bhawan, Sansad Marg, New Delhi — 110001
                      </span>
                    </div>

                    <div className="bg-white dark:bg-[#182236] p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-gray-400 font-semibold uppercase text-[10px] block">{t("संपर्क विवरण", "Direct Contact")}</span>
                      <div className="mt-1 space-y-1">
                        <div className="font-medium text-gray-800 dark:text-gray-200">
                          📞 Telephone: <a href="tel:01123401455" className="text-[#1a237e] dark:text-blue-300 font-mono font-bold">011-23401455</a>
                        </div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">
                          📧 Email: <a href="mailto:director-pg@darpg.gov.in" className="text-[#1a237e] dark:text-blue-300 font-mono font-bold">director-pg@darpg.gov.in</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Responsibilities */}
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span>📋</span>
                <span>{t("वेब सूचना प्रबंधक के वैधानिक दायित्व", "Statutory Responsibilities of WIM")}</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{t("पोर्टल पर सामग्री का समय पर अद्यतन और अप्रचलित जानकारी को हटाना।", "Ensuring timely updating of portal content and archival of obsolete information.")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{t("दिव्यांगजन सुगमता मानकों (WCAG 2.1 AA / GIGW 3.0) का शत-प्रतिशत अनुपालन।", "Guaranteeing strict adherence to accessibility standards (WCAG 2.1 AA & GIGW 3.0).")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{t("नागरिकों से प्राप्त सामग्री संबंधी फीडबैक और सुझावों का त्वरित समाधान।", "Promptly addressing content-related citizen inquiries, corrections, and portal feedback.")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{t("डेटा सुरक्षा अधिकारी (DPO) के साथ समन्वय कर DPDP 2023 अनुपालन की निगरानी।", "Collaborating with the Data Protection Officer (DPO) to maintain DPDP Act 2023 compliance.")}</span>
                </li>
              </ul>
            </div>

            {/* Direct Official Link */}
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-blue-950 dark:text-blue-200">
                  {t("आधिकारिक DARPG वेब सूचना प्रबंधक विवरण:", "Official DARPG Web Information Manager Listing:")}
                </div>
                <div className="text-gray-600 dark:text-gray-400 mt-0.5">
                  https://darpg.gov.in/en/web-information-manager
                </div>
              </div>
              <a
                href="https://darpg.gov.in/en/web-information-manager"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gov-primary text-xs px-4 py-2 whitespace-nowrap flex-shrink-0 flex items-center gap-1"
              >
                <span>{t("आधिकारिक पोर्टल पर देखें", "View on DARPG.gov.in")}</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 bg-gray-50 dark:bg-[#131a2a] border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
            <Link to="/disclaimer" className="text-[#1a237e] dark:text-blue-300 font-semibold hover:underline">
              ← {t("अस्वीकरण (Disclaimer)", "Disclaimer")}
            </Link>
            <Link to="/website-policies" className="text-[#1a237e] dark:text-blue-300 font-semibold hover:underline">
              {t("वेबसाइट नीतियां (Website Policies) →", "Website Policies →")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
