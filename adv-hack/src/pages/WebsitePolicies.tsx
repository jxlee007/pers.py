import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function WebsitePolicies() {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<"all" | "copyright" | "hyperlink" | "privacy" | "terms">("all");

  return (
    <div className="min-h-screen py-10" style={{ background: "var(--background)" }} id="main-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Link to="/" className="hover:underline">{t("होम", "Home")}</Link>
          <span>›</span>
          <span className="text-gray-800 dark:text-gray-200 font-semibold">{t("वेबसाइट नीतियां", "Website Policies")}</span>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#182236] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#131a2a]">
            <div className="inline-flex items-center gap-2 text-xs font-bold px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/50 text-[#1a237e] dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
              🏛️ {t("प्रशासनिक सुधार और लोक शिकायत विभाग · भारत सरकार", "Department of Administrative Reforms & Public Grievances · Govt of India")}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {t("वेबसाइट नीतियां (Website Policies)", "Website Policies")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t(
                "कॉपीराइट, हाइपरलिंकिंग, गोपनीयता नीति और नियम एवं शर्तें।",
                "Copyright Policy, Hyperlinking Policy, Privacy Policy, and Terms & Conditions."
              )}
            </p>

            {/* Tabs */}
            <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
              {[
                { id: "all", label: t("सभी नीतियां (All)", "All Policies"), icon: "📋" },
                { id: "copyright", label: t("कॉपीराइट नीति", "Copyright Policy"), icon: "©️" },
                { id: "hyperlink", label: t("हाइपरलिंकिंग नीति", "Hyperlinking Policy"), icon: "🔗" },
                { id: "privacy", label: t("गोपनीयता नीति", "Privacy Policy"), icon: "🛡️" },
                { id: "terms", label: t("नियम और शर्तें", "Terms & Conditions"), icon: "📜" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#1a237e] text-white shadow-sm"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-10 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* ── 1. COPYRIGHT POLICY ── */}
            {(activeTab === "all" || activeTab === "copyright") && (
              <section id="copyright" className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xl">©️</span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {t("कॉपीराइट नीति (Copyright Policy)", "Copyright Policy")}
                  </h2>
                </div>

                <p>
                  {t(
                    "इस वेबसाइट पर प्रदर्शित सामग्री को निःशुल्क पुनरुत्पादित किया जा सकता है। हालांकि, सामग्री को सटीक रूप से पुनरुत्पादित किया जाना चाहिए और इसका उपयोग अपमानजनक तरीके से या भ्रामक संदर्भ में नहीं किया जाना चाहिए। जहां भी सामग्री दूसरों को प्रकाशित या जारी की जा रही है, स्रोत को प्रमुखता से स्वीकार किया जाना चाहिए। हालांकि, इस सामग्री को पुनरुत्पादित करने की अनुमति किसी भी ऐसी सामग्री तक विस्तारित नहीं होगी जिसे किसी तीसरे पक्ष के कॉपीराइट के रूप में पहचाना गया हो। ऐसी सामग्री को पुनरुत्पादित करने का प्राधिकरण संबंधित विभागों/कॉपीराइट धारकों से प्राप्त किया जाना चाहिए।",
                    "Material featured on this Website may be reproduced free of charge. However, the material has to be reproduced accurately and not to be used in a derogatory manner or in a misleading context. Wherever the material is being published or issued to others, the source must be prominently acknowledged. However, the permission to reproduce this material shall not extend to any material which is identified as being copyright of a third party. Authorization to reproduce such material must be obtained from the departments/copyright holders concerned."
                  )}
                </p>
              </section>
            )}

            {/* ── 2. HYPERLINKING POLICY ── */}
            {(activeTab === "all" || activeTab === "hyperlink") && (
              <section id="hyperlinking" className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xl">🔗</span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {t("हाइपरलिंकिंग नीति (Hyperlinking Policy)", "Hyperlinking Policy")}
                  </h2>
                </div>

                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                    {t("बाहरी वेबसाइटों/पोर्टलों के लिंक (Links to external Websites/portals)", "Links to external Websites/portals")}
                  </h3>
                  <p>
                    {t(
                      "इस वेबसाइट में कई स्थानों पर आपको अन्य वेबसाइटों/पोर्टल/वेब एप्लीकेशन/मोबाइल एप्लीकेशनों के लिंक मिलेंगे। ये लिंक आपकी सुविधा के लिए रखे गए हैं। प्रशासनिक सुधार और लोक शिकायत विभाग लिंक किए गए गंतव्यों की सामग्री के लिए ज़िम्मेदार नहीं है और आवश्यक रूप से उनमें व्यक्त विचारों का समर्थन नहीं करता है। लिंक की मात्र उपस्थिति या इस वेबसाइट पर इसकी सूची को किसी भी प्रकार का समर्थन नहीं माना जाना चाहिए। हम गारंटी नहीं दे सकते कि ये लिंक हर समय काम करेंगे और लिंक किए गए गंतव्यों की उपलब्धता पर हमारा कोई नियंत्रण नहीं है।",
                      "At many places in this Website, you shall find links to other Websites/Portal/Web Application/Mobile applications. These links have been placed for your convenience.DEPARTMENT OF ADMINISTRATIVE REFORMS & PUBLIC GRIEVANCES is not responsible for the contents of the linked destinations and does not necessarily endorse the views expressed in them. Mere presence of the link or its listing on this Website should not be assumed as endorsement of any kind. We can not guarantee that these links will work all the time and we have no control over availability of linked destinations."
                    )}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                    {t("अन्य वेबसाइटों/पोर्टलों द्वारा हमारी वेबसाइट के लिंक (Links to our Website by other Websites/Portals)", "Links to our Website by other Websites/Portals")}
                  </h3>
                  <p>
                    {t(
                      "हम आपको इस वेबसाइट पर होस्ट की गई जानकारी से सीधे लिंक करने पर कोई आपत्ति नहीं करते हैं और इसके लिए किसी पूर्व अनुमति की आवश्यकता नहीं है। हालांकि, हम चाहते हैं कि आप हमें इस वेबसाइट पर दिए गए किसी भी लिंक के बारे में सूचित करें ताकि आपको उसमें होने वाले किसी भी बदलाव या अपडेट के बारे में सूचित किया जा सके। इसके अलावा, हम अपने पृष्ठों को आपकी साइट पर फ़्रेम में लोड करने की अनुमति नहीं देते हैं। इस वेबसाइट से संबंधित पृष्ठ उपयोगकर्ता के नए खुले ब्राउज़र विंडो में लोड होने चाहिए।",
                      "We do not object to you linking directly to the information that is hosted on this Website and no prior permission is required for the same. However, we would like you to inform us about any links provided to this Website so that you can be informed of any changes or updates therein. Also, we do not permit our pages to be loaded into frames on your site. The pages belonging to this Website must load into a newly opened browser window of the User."
                    )}
                  </p>
                </div>
              </section>
            )}

            {/* ── 3. PRIVACY POLICY ── */}
            {(activeTab === "all" || activeTab === "privacy") && (
              <section id="privacy" className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xl">🛡️</span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {t("गोपनीयता नीति (Privacy Policy)", "Privacy Policy")}
                  </h2>
                </div>

                <p>
                  {t(
                    "प्रशासनिक सुधार और लोक शिकायत विभाग स्वचालित रूप से आपसे कोई विशिष्ट व्यक्तिगत जानकारी (जैसे नाम, फोन नंबर या ई-मेल पता) कैप्चर नहीं करता है, जो हमें व्यक्तिगत रूप से आपकी पहचान करने की अनुमति देता है। यदि आप हमारी वेबसाइट पर आने पर हमें अपनी व्यक्तिगत जानकारी, जैसे नाम या पते प्रदान करना चुनते हैं, तो हम इसका उपयोग केवल जानकारी के लिए आपके अनुरोध को पूरा करने के लिए करते हैं।",
                    "Department of Administrative Reforms & Public Grievances does not automatically capture any specific personal information from you (like name, phone number or e-mail address), that allows us to identify you individually. If you choose to provide us with your personal information, like names or addresses, when you visit our Website, we use it only to fulfill your request for information."
                  )}
                </p>

                <p>
                  {t(
                    "हम इस साइट पर दी गई किसी भी व्यक्तिगत पहचान योग्य जानकारी को किसी तीसरे पक्ष (सार्वजनिक/निजी) को नहीं बेचते या साझा नहीं करते हैं। इस वेबसाइट पर प्रदान की गई किसी भी जानकारी को हानि, दुरुपयोग, अनधिकृत पहुंच या प्रकटीकरण, परिवर्तन या विनाश से संरक्षित किया जाएगा।",
                    "We do not sell or share any personally identifiable information volunteered on this site to any third party (public/private). Any information provided to this Website will be protected from loss, misuse, unauthorized access or disclosure, alteration, or destruction."
                  )}
                </p>

                <p>
                  {t(
                    "हम उपयोगकर्ता के बारे में कुछ जानकारी एकत्र करते हैं, जैसे इंटरनेट प्रोटोकॉल (आईपी) पता, डोमेन नाम, ब्राउज़र प्रकार, ऑपरेटिंग सिस्टम, यात्रा की तारीख और समय और देखे गए पृष्ठ। जब तक साइट को नुकसान पहुंचाने का प्रयास नहीं पाया जाता, हम इन पतों को हमारी साइट पर आने वाले व्यक्तियों की पहचान से जोड़ने का कोई प्रयास नहीं करते हैं।",
                    "We gather certain information about the User, such as Internet protocol (IP) address, domain name, browser type, operating system, the date and time of the visit and the pages visited. We make no attempt to link these addresses with the identity of individuals visiting our site unless an attempt to damage the site has been detected."
                  )}
                </p>
              </section>
            )}

            {/* ── 4. TERMS & CONDITIONS ── */}
            {(activeTab === "all" || activeTab === "terms") && (
              <section id="terms" className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xl">📜</span>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {t("नियम और शर्तें (Terms & Conditions)", "Terms & Conditions")}
                  </h2>
                </div>

                <p>
                  {t(
                    "यह वेबसाइट प्रशासनिक सुधार और लोक शिकायत विभाग, भारत सरकार द्वारा डिज़ाइन, विकसित और अनुरक्षित है।",
                    "This Website is designed, developed and maintained by Department of Administrative Reforms & Public Grievances , Government of India."
                  )}
                </p>

                <p>
                  {t(
                    "यद्यपि इस वेबसाइट पर सामग्री की सटीकता और प्रासंगिकता सुनिश्चित करने के लिए सभी प्रयास किए गए हैं, फिर भी इसे कानून के विवरण के रूप में नहीं माना जाना चाहिए या किसी कानूनी उद्देश्यों के लिए उपयोग नहीं किया जाना चाहिए। किसी भी संशय या संदेह की स्थिति में, उपयोगकर्ताओं को विभाग और/या अन्य स्रोतों से सत्यापन/जांच करने और उचित पेशेवर सलाह प्राप्त करने की सलाह दी जाती है।",
                    "Though all efforts have been made to ensure the accuracy and currency of the content on this Website, the same should not be construed as a statement of law or used for any legal purposes. In case of any ambiguity or doubts, users are advised to verify/check with the Department's and/or other source(s), and to obtain appropriate professional advice."
                  )}
                </p>

                <p>
                  {t(
                    "किसी भी परिस्थिति में यह विभाग किसी भी व्यय, हानि या क्षति के लिए उत्तरदायी नहीं होगा, जिसमें बिना किसी सीमा के, अप्रत्यक्ष या परिणामी हानि या क्षति, या इस वेबसाइट के उपयोग या डेटा के उपयोग के नुकसान से उत्पन्न होने वाली कोई भी क्षति शामिल है।",
                    "Under no circumstances will this Department be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the use of this Website."
                  )}
                </p>

                <p>
                  {t(
                    "इस वेबसाइट पर पोस्ट की गई जानकारी में गैर-सरकारी / निजी संगठन द्वारा बनाई और अनुरक्षित की गई जानकारी के हाइपरटेक्स्ट लिंक या पॉइंटर्स शामिल हो सकते हैं। प्रशासनिक सुधार और लोक शिकायत विभाग ये लिंक और पॉइंटर्स केवल आपकी जानकारी और सुविधा के लिए प्रदान कर रहा है। जब आप किसी बाहरी वेबसाइट के लिंक का चयन करते हैं, तो आप प्रशासनिक सुधार और लोक शिकायत विभाग की वेबसाइट छोड़ रहे होते हैं और बाहरी वेबसाइट के मालिकों/प्रायोजकों की गोपनीयता और सुरक्षा नीतियों के अधीन होते हैं।",
                    "The information posted on this Website could include hypertext links or pointers to information created and maintained by non-Government / private organization. Department of Administrative Reforms & Public Grievances is providing these links and pointers solely for your information and convenience. When you select a link to an external Website, you are leaving the Department of Administrative Reforms & Public Grievances Website and are subject to the privacy and security policies of the owners/ sponsors of the external Website."
                  )}
                </p>

                <p>
                  {t(
                    "प्रशासनिक सुधार और लोक शिकायत विभाग हर समय लिंक किए गए पृष्ठों की उपलब्धता की गारंटी नहीं देता है।",
                    "Department of Administrative Reforms & Public Grievances does not guarantee availability of linked pages at all times."
                  )}
                </p>

                <p>
                  {t(
                    "प्रशासनिक सुधार और लोक शिकायत विभाग लिंक की गई वेबसाइट में निहित कॉपीराइट सामग्री के उपयोग को अधिकृत नहीं कर सकता है। उपयोगकर्ताओं को सलाह दी जाती है कि वे लिंक की गई वेबसाइटों के मालिकों से ऐसे प्राधिकरण का अनुरोध करें।",
                    "Department of Administrative Reforms & Public Grievances cannot authorize use of copyrighted materials contained in linked Website. Users are advised to request such authorization from owners of linked Websites."
                  )}
                </p>

                <p>
                  {t(
                    "प्रशासनिक सुधार और लोक शिकायत विभाग यह गारंटी नहीं देता है कि लिंक की गई वेबसाइटें भारत सरकार के वेब दिशानिर्देशों का अनुपालन करती हैं।",
                    "Department of Administrative Reforms & Public Grievances does not guarantee that linked Websites comply with Indian Government Web Guidelines."
                  )}
                </p>
              </section>
            )}
          </div>

          {/* Card Footer */}
          <div className="p-4 sm:p-6 bg-gray-50 dark:bg-[#131a2a] border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
            <Link to="/disclaimer" className="text-[#1a237e] dark:text-blue-300 font-semibold hover:underline">
              ← {t("अस्वीकरण (Disclaimer)", "Disclaimer")}
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/dpdp" className="text-[#1a237e] dark:text-blue-300 font-semibold hover:underline">
                {t("DPDP 2023 अनुपालन केंद्र", "DPDP 2023 Compliance")} →
              </Link>
              <a
                href="https://darpg.gov.in/en/web-information-manager"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a237e] dark:text-blue-300 font-semibold hover:underline"
              >
                {t("वेब सूचना प्रबंधक (WIM)", "Web Information Manager")} ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
