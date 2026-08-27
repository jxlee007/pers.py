import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Disclaimer() {
  const { t } = useApp();

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }} id="main-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Link to="/" className="hover:underline">{t("होम", "Home")}</Link>
          <span>›</span>
          <span className="text-gray-800 dark:text-gray-200 font-semibold">{t("अस्वीकरण", "Disclaimer")}</span>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-10">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/50 text-[#1a237e] dark:text-blue-300 mb-3 border border-blue-200 dark:border-blue-800">
              ⚖️ {t("कानूनी सूचना एवं दायित्व अस्वीकरण", "Legal Notice & Liability Disclaimer")}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {t("अस्वीकरण (Disclaimer)", "Disclaimer")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t(
                "केंद्रीय लोक शिकायत निवारण और निगरानी प्रणाली (CPGRAMS) के उपयोग की वैधानिक शर्तें।",
                "Statutory terms and conditions governing the use of CPGRAMS."
              )}
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* Clause 1 */}
            <section>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span>1.</span>
                <span>{t("सामग्री की सटीकता (Accuracy of Content)", "Accuracy of Content")}</span>
              </h2>
              <p>
                {t(
                  "यद्यपि इस पोर्टल (CPGRAMS) पर सामग्री की सटीकता और प्रासंगिकता सुनिश्चित करने के लिए सभी प्रयास किए गए हैं, फिर भी इसे कानून के विवरण के रूप में नहीं माना जाना चाहिए या किसी कानूनी उद्देश्यों के लिए उपयोग नहीं किया जाना चाहिए। किसी भी संशय या संदेह की स्थिति में, उपयोगकर्ताओं को संबंधित मंत्रालय/विभाग/संगठन से सत्यापन करने की सलाह दी जाती है।",
                  "Though all efforts have been made to ensure the accuracy and currency of the content on this portal (CPGRAMS), the same should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify/check with the concerned Ministry/Department/Organization and/or other source(s)."
                )}
              </p>
            </section>

            {/* Clause 2 */}
            <section>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span>2.</span>
                <span>{t("दायित्व की सीमा (Limitation of Liability)", "Limitation of Liability")}</span>
              </h2>
              <p>
                {t(
                  "किसी भी परिस्थिति में प्रशासनिक सुधार और लोक शिकायत विभाग (DARPG), राष्ट्रीय सूचना विज्ञान केंद्र (NIC) या भारत सरकार किसी भी व्यय, हानि या क्षति के लिए उत्तरदायी नहीं होगी, जिसमें बिना किसी सीमा के, अप्रत्यक्ष या परिणामी हानि या क्षति, या इस पोर्टल के उपयोग या उपयोग की अक्षमता से उत्पन्न होने वाली कोई भी क्षति शामिल है।",
                  "Under no circumstances will the Department of Administrative Reforms & Public Grievances (DARPG), National Informatics Centre (NIC), or the Government of India be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the use of this Portal."
                )}
              </p>
            </section>

            {/* Clause 3 */}
            <section>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span>3.</span>
                <span>{t("बाहरी लिंक एवं हाइपरलिंकिंग (External Links & Hyperlinking)", "External Links & Hyperlinking")}</span>
              </h2>
              <p>
                {t(
                  "इस पोर्टल में अन्य सरकारी और गैर-सरकारी वेबसाइटों/पोर्टलों के लिंक केवल नागरिक सुविधा के लिए शामिल किए गए हैं। DARPG बाहरी साइटों की सामग्री या उपलब्धता के लिए जिम्मेदार नहीं है और न ही उनमें व्यक्त विचारों का आवश्यक रूप से समर्थन करता है। बाहरी लिंक का संचालन किसी भी समय बदलने के अधीन है।",
                  "Links to other government and non-government websites/portals are included solely for citizen convenience. DARPG does not guarantee the availability or accuracy of such linked pages at all times. The inclusion of any link does not imply endorsement by the Government of India."
                )}
              </p>
            </section>

            {/* Clause 4 */}
            <section>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span>4.</span>
                <span>{t("AI-सक्षम वर्गीकरण एवं स्वतः-रूटिंग (AI-Enabled Routing Assistance)", "AI-Enabled Routing Assistance")}</span>
              </h2>
              <p>
                {t(
                  "CPGRAMS पर AI-सक्षम रूटिंग सहायता नागरिक शिकायतों को त्वरित रूप से संबंधित विभाग तक पहुंचाने के लिए एक तकनीकी मार्गदर्शन उपकरण है। अंतिम अधिकार क्षेत्र और स्वीकार्यता संबंधित मंत्रालय/विभाग के सक्षम प्राधिकारी के नियमों के अधीन है।",
                  "The AI-enabled classification system operates as an administrative guidance mechanism to streamline grievance routing. The final determination of jurisdiction and admissibility rests solely with the competent public authority in the concerned Ministry or Department."
                )}
              </p>
            </section>

            {/* Clause 5 */}
            <section>
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span>5.</span>
                <span>{t("लागू कानून एवं क्षेत्राधिकार (Governing Law & Jurisdiction)", "Governing Law & Jurisdiction")}</span>
              </h2>
              <p>
                {t(
                  "ये नियम और शर्तें भारतीय कानूनों के अनुसार शासित और व्याख्यायित की जाएंगी। इन नियमों और शर्तों से उत्पन्न होने वाला कोई भी विवाद भारत की सक्षम अदालतों के अनन्य क्षेत्राधिकार के अधीन होगा।",
                  "These terms and conditions shall be governed by and construed in accordance with the Indian Laws. Any dispute arising under these terms and conditions shall be subject to the exclusive jurisdiction of the courts of India."
                )}
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div>
              {t("प्रशासनिक सुधार और लोक शिकायत विभाग · भारत सरकार", "DARPG · Ministry of Personnel, Public Grievances & Pensions")}
            </div>
            <Link to="/website-policies" className="text-[#1a237e] dark:text-blue-300 font-semibold hover:underline">
              {t("वेबसाइट नीतियां देखें →", "View Website Policies →")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
