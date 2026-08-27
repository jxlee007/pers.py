import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function WebsitePolicies() {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<"copyright" | "hyperlink" | "privacy" | "security" | "terms">("copyright");

  const policies = [
    {
      id: "copyright",
      title: t("कॉपीराइट नीति", "Copyright Policy"),
      icon: "©️",
      content: (
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            {t(
              "इस पोर्टल पर प्रदर्शित सामग्री को किसी भी प्रारूप या माध्यम में निःशुल्क पुनरुत्पादित किया जा सकता है, बशर्ते सामग्री का सटीक पुनरुत्पादन किया जाए और इसका उपयोग किसी अपमानजनक तरीके से या भ्रामक संदर्भ में न किया जाए।",
              "Material featured on this portal may be reproduced free of charge in any format or media without requiring specific prior permission. This is subject to the material being reproduced accurately and not being used in a derogatory manner or in a misleading context."
            )}
          </p>
          <p>
            {t(
              "जहां भी सामग्री प्रकाशित या दूसरों को जारी की जा रही है, स्रोत को प्रमुखता से स्वीकार किया जाना चाहिए (उदा. 'स्रोत: CPGRAMS, भारत सरकार')।",
              "Where the material is being published or issued to others, the source must be prominently acknowledged (e.g., 'Source: CPGRAMS, Government of India')."
            )}
          </p>
          <p>
            {t(
              "हालाँकि, इस सामग्री को पुनरुत्पादित करने की अनुमति किसी भी ऐसी सामग्री तक विस्तारित नहीं होगी जो किसी तीसरे पक्ष के कॉपीराइट के रूप में स्पष्ट रूप से पहचानी गई हो। ऐसी सामग्री को पुनरुत्पादित करने का प्राधिकरण संबंधित कॉपीराइट धारक से प्राप्त किया जाना चाहिए।",
              "However, the permission to reproduce this material shall not extend to any material which is explicitly identified as being the copyright of a third party. Authorization to reproduce such material must be obtained from the respective copyright holders."
            )}
          </p>
        </div>
      ),
    },
    {
      id: "hyperlink",
      title: t("हाइपरलिंकिंग नीति", "Hyperlinking Policy"),
      icon: "🔗",
      content: (
        <div className="space-y-4 text-sm leading-relaxed">
          <h3 className="font-bold text-base text-gray-900 dark:text-white">
            {t("बाहरी वेबसाइटों/पोर्टलों के लिंक (Links to external websites)", "Links to External Websites/Portals")}
          </h3>
          <p>
            {t(
              "इस पोर्टल में कई स्थानों पर आपको अन्य सरकारी और गैर-सरकारी वेबसाइटों के लिंक मिलेंगे। ये लिंक नागरिक सुविधा के लिए दिए गए हैं। DARPG बाहरी साइटों की निरंतर उपलब्धता की गारंटी नहीं दे सकता है और इन लिंक किए गए पृष्ठों की विश्वसनीयता के लिए जिम्मेदार नहीं है।",
              "At many places in this portal, you will find links to other government and statutory websites/portals. These links have been placed for citizen convenience. DARPG is not responsible for the contents and reliability of the linked websites and does not necessarily endorse the views expressed in them."
            )}
          </p>
          <h3 className="font-bold text-base text-gray-900 dark:text-white mt-4">
            {t("अन्य वेबसाइटों द्वारा CPGRAMS का लिंकिंग (Links to CPGRAMS by other websites)", "Links to CPGRAMS by Other Websites")}
          </h3>
          <p>
            {t(
              "हम आपको इस पोर्टल पर होस्ट की गई जानकारी से सीधे लिंक करने से प्रतिबंधित नहीं करते हैं और इसके लिए किसी पूर्व अनुमति की आवश्यकता नहीं है। हालांकि, हम चाहते हैं कि आप हमें इस पोर्टल पर दिए गए किसी भी लिंक के बारे में सूचित करें।",
              "We do not object to you linking directly to the information that is hosted on this portal and no prior permission is required for the same. However, we do not permit our pages to be loaded into frames on your site; the pages of CPGRAMS must load into a newly opened browser window of the user."
            )}
          </p>
        </div>
      ),
    },
    {
      id: "privacy",
      title: t("गोपनीयता एवं DPDP नीति", "Privacy & DPDP Policy"),
      icon: "🛡️",
      content: (
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            {t(
              "CPGRAMS डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (DPDP Act 2023) और सूचना प्रौद्योगिकी अधिनियम, 2000 के प्रावधानों का कड़ाई से पालन करता है।",
              "CPGRAMS strictly complies with the statutory mandates of the Digital Personal Data Protection Act, 2023 (DPDP Act 2023) and the Information Technology Act, 2000."
            )}
          </p>
          <p>
            {t(
              "हम नागरिकों से केवल शिकायत पंजीकरण, प्रमाणीकरण और समाधान के लिए आवश्यक न्यूनतम व्यक्तिगत डेटा एकत्र करते हैं। आपका संवेदनशील व्यक्तिगत डेटा किसी भी अनधिकृत वाणिज्यिक उद्देश्य के लिए उपयोग या साझा नहीं किया जाता है।",
              "We collect only the minimum necessary personal data required for grievance redressal and authentication. Citizens retain statutory rights of Access, Correction, Erasure, and Grievance Redressal under Chapter III of the DPDP Act 2023."
            )}
          </p>
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs">
            <span className="font-bold text-blue-900 dark:text-blue-200">
              {t("विस्तृत DPDP अनुपालन केंद्र:", "Detailed DPDP Compliance Center:")}
            </span>{" "}
            {t("नागरिक अपने डेटा अधिकारों का प्रयोग करने के लिए हमारे समर्पित DPDP पोर्टल पर जा सकते हैं।", "Citizens may exercise their statutory data rights via our dedicated DPDP portal.")}
            <div className="mt-2">
              <Link to="/dpdp" className="font-bold text-[#1a237e] dark:text-blue-300 underline">
                {t("DPDP 2023 अनुपालन केंद्र खोलें →", "Open DPDP 2023 Compliance Center →")}
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: t("सुरक्षा एवं बॉट सुरक्षा नीति", "Security & PoW Bot Policy"),
      icon: "🔒",
      content: (
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            {t(
              "राष्ट्रीय सुरक्षा और नागरिक पहुंच दोनों को संतुलित करने के लिए, CPGRAMS आधुनिक प्रूफ-ऑफ-वर्क (PoW) क्रिप्टोग्राफिक कैप्चा (ALTCHA मानक) का उपयोग करता है।",
              "To balance national infrastructure security with seamless citizen access, CPGRAMS employs Proof-of-Work (PoW) Cryptographic CAPTCHA (ALTCHA standard), in line with CERT-In and NIC cybersecurity recommendations."
            )}
          </p>
          <p>
            {t(
              "यह प्रणाली नागरिक की गोपनीयता से समझौता किए बिना (पारंपरिक छवि-पहचान कैप्चा के विपरीत) स्वचालित बॉट हमलों, स्पैम और DDoS हमलों को ब्राउज़र-स्तरीय गणितीय सत्यापन के माध्यम से रोकती है।",
              "Unlike invasive third-party tracking CAPTCHAs, this technology executes a zero-tracking client-side cryptographic proof that validates genuine citizen access while fully respecting DPDP data privacy requirements."
            )}
          </p>
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-xs">
            <span className="font-bold text-green-900 dark:text-green-200">
              {t("PoW क्रिप्टोग्राफिक कैप्चा लाइव डेमो:", "PoW Cryptographic CAPTCHA Live Demo:")}
            </span>{" "}
            {t("देखें कि यह तकनीक नागरिकों के लिए अदृश्य रहते हुए बॉट्स को कैसे रोकती है।", "Experience how background cryptographic puzzles prevent automated abuse without frustrating citizens.")}
            <div className="mt-2">
              <Link to="/pow-demo" className="font-bold text-green-800 dark:text-green-300 underline">
                {t("प्रूफ-ऑफ-वर्क (PoW) सुरक्षा डेमो चलाएं →", "Launch Proof-of-Work Security Demo →")}
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "terms",
      title: t("नियम और शर्तें", "Terms & Conditions"),
      icon: "📜",
      content: (
        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            {t(
              "यह पोर्टल प्रशासनिक सुधार और लोक शिकायत विभाग (DARPG), कार्मिक, लोक शिकायत और पेंशन मंत्रालय, भारत सरकार द्वारा डिजाइन और अनुरक्षित है।",
              "This portal is designed, developed, and maintained by National Informatics Centre (NIC) and content provided by Department of Administrative Reforms & Public Grievances (DARPG), Government of India."
            )}
          </p>
          <p>
            {t(
              "इस पोर्टल का उपयोग करने वाले किसी भी नागरिक को सत्य और सटीक जानकारी प्रदान करनी चाहिए। भ्रामक, दुर्भावनापूर्ण या अवांछित शिकायतें दर्ज करने पर लागू कानूनी प्रावधानों के तहत कार्रवाई की जा सकती है।",
              "Citizens accessing this portal must submit factual grievances. Submitting knowingly false, frivolous, defamatory, or malicious complaints may attract appropriate legal consequences under applicable laws."
            )}
          </p>
        </div>
      ),
    },
  ];

  const current = policies.find((p) => p.id === activeTab)!;

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }} id="main-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Link to="/" className="hover:underline">{t("होम", "Home")}</Link>
          <span>›</span>
          <span className="text-gray-800 dark:text-gray-200 font-semibold">{t("वेबसाइट नीतियां", "Website Policies")}</span>
        </div>

        <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#131a2a]">
            <div className="inline-flex items-center gap-2 text-xs font-bold px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/50 text-[#1a237e] dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
              🏛️ {t("भारत सरकार वेबसाइट दिशानिर्देश (GIGW) अनुपालन", "GIGW Guidelines Compliant")}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {t("वेबसाइट नीतियां (Website Policies)", "Website Policies")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t(
                "CPGRAMS पोर्टल की कॉपीराइट, हाइपरलिंकिंग, डेटा सुरक्षा और नियम व शर्तें।",
                "Official policies governing copyright, hyperlinking, privacy, and usage of the CPGRAMS portal."
              )}
            </p>

            {/* Policy Tabs */}
            <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
              {policies.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id as any)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                    activeTab === p.id
                      ? "bg-[#1a237e] text-white shadow-sm"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">
              <span className="text-2xl">{current.icon}</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{current.title}</h2>
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              {current.content}
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="p-4 sm:p-6 bg-gray-50 dark:bg-[#131a2a] border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div>{t("अंतिम समीक्षा: अगस्त 2026 · CPGRAMS v7.0", "Last Reviewed: August 2026 · CPGRAMS v7.0")}</div>
            <Link to="/web-information-manager" className="text-[#1a237e] dark:text-blue-300 font-semibold hover:underline">
              {t("वेब सूचना प्रबंधक (WIM) विवरण →", "Web Information Manager Details →")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
