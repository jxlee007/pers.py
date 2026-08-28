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
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/50 text-[#1a237e] dark:text-blue-300 mb-3 border border-blue-200 dark:border-blue-800">
              ⚖️ {t("आधिकारिक सरकारी अस्वीकरण एवं नीतियां", "Official Government Disclaimer & Policies")}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {t("अस्वीकरण (Disclaimer)", "Disclaimer")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t(
                "केंद्रीय लोक शिकायत निवारण और निगरानी प्रणाली (CPGRAMS) — एनआईसी, भारत सरकार",
                "Centralised Public Grievance Redress And Monitoring System (CPGRAMS) — NIC, Government of India"
              )}
            </p>
          </div>

          <div className="space-y-8 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* ── SECTION 1: DISCLAIMER ── */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                <span>📌</span>
                <span>{t("अस्वीकरण (Disclaimer)", "Disclaimer")}</span>
              </h2>

              <p>
                {t(
                  "यह पोर्टल राष्ट्रीय सूचना विज्ञान केंद्र (NIC), भारत सरकार द्वारा डिज़ाइन, विकसित और होस्ट किया गया है।",
                  "This Portal is designed, developed and hosted by National Informatics Centre , Government of India."
                )}
              </p>

              <p>
                {t(
                  "यद्यपि इस पोर्टल पर सामग्री की सटीकता और प्रासंगिकता सुनिश्चित करने के लिए सभी प्रयास किए गए हैं, फिर भी इसे कानून के विवरण के रूप में नहीं माना जाना चाहिए या किसी कानूनी उद्देश्यों के लिए उपयोग नहीं किया जाना चाहिए। एनआईसी सामग्री की सटीकता, पूर्णता, उपयोगिता या अन्यथा के संबंध में कोई जिम्मेदारी स्वीकार नहीं करता है। उपयोगकर्ताओं को सलाह दी जाती है कि वे संबंधित सरकारी विभाग (विभागों) और/या अन्य स्रोतों के साथ किसी भी जानकारी को सत्यापित/जांच लें, और पोर्टल में प्रदान की गई जानकारी पर कार्रवाई करने से पहले कोई भी उचित पेशेवर सलाह प्राप्त करें।",
                  "Though all efforts have been made to ensure the accuracy and currency of the content on this Portal, the same should not be construed as a statement of law or used for any legal purposes. NIC accepts no responsibility in relation to the accuracy, completeness, usefulness or otherwise, of the contents. Users are advised to verify/check any information with the relevant Government department(s) and/or other source(s), and to obtain any appropriate professional advice before acting on the information provided in the Portal."
                )}
              </p>

              <p>
                {t(
                  "यह भारत सरकार का एक पोर्टल है जिसका उद्देश्य नागरिकों को उनकी शिकायतों के निवारण के लिए एक मंच प्रदान करना है। यदि आपकी देश में किसी भी सरकारी संगठन के खिलाफ कोई शिकायत है, तो आप अपनी शिकायत यहां दर्ज कर सकते हैं जो तत्काल निवारण के लिए संबंधित मंत्रालय/विभाग/राज्य सरकार के पास जाएगी।",
                  "This is a Government of India Portal aimed at providing the citizens with a platform for redress of their grievances. If you have any grievance against any Government organization in the country, you may lodge your grievance here which will go to the Ministry/Department/State Government concerned for immediate redress."
                )}
              </p>

              <p>
                {t(
                  "किसी भी परिस्थिति में सरकार या एनआईसी किसी भी व्यय, हानि या क्षति के लिए उत्तरदायी नहीं होगा, जिसमें बिना किसी सीमा के, अप्रत्यक्ष या परिणामी हानि या क्षति, या इस पोर्टल के उपयोग या डेटा के उपयोग के नुकसान से उत्पन्न होने वाली कोई भी क्षति शामिल है।",
                  "In no event will the Government or NIC be liable for any expense, loss or damage including, without limitation, indirect or consequential loss or damage, or any expense, loss or damage whatsoever arising from use, or loss of use, of data, arising out of or in connection with the use of this Portal."
                )}
              </p>

              <p>
                {t(
                  "इस पोर्टल पर शामिल की गई अन्य वेबसाइटों के लिंक केवल जनता की सुविधा के लिए प्रदान किए गए हैं। एनआईसी लिंक की गई वेबसाइटों की सामग्री या विश्वसनीयता के लिए जिम्मेदार नहीं है और आवश्यक रूप से उनके भीतर व्यक्त दृष्टिकोण का समर्थन नहीं करता है। हम हर समय ऐसे लिंक किए गए पृष्ठों की उपलब्धता की गारंटी नहीं दे सकते।",
                  "Links to other websites that have been included on this Portal are provided for public convenience only. NIC is not responsible for the contents or reliability of linked websites and does not necessarily endorse the view expressed within them. We cannot guarantee the availability of such linked pages at all times."
                )}
              </p>

              <p>
                {t(
                  "इस पोर्टल पर प्रदर्शित सामग्री को हमें एक मेल भेजकर उचित अनुमति लेने के बाद निःशुल्क पुनरुत्पादित किया जा सकता है। हालाँकि, सामग्री को सटीक रूप से पुनरुत्पादित किया जाना चाहिए और इसका उपयोग अपमानजनक तरीके से या भ्रामक संदर्भ में नहीं किया जाना चाहिए। जहां भी सामग्री दूसरों को प्रकाशित या जारी की जा रही है, स्रोत को प्रमुखता से स्वीकार किया जाना चाहिए। हालाँकि, इस सामग्री को पुनरुत्पादित करने की अनुमति किसी भी ऐसी सामग्री तक विस्तारित नहीं होगी जिसे किसी तीसरे पक्ष के कॉपीराइट के रूप में पहचाना गया हो। ऐसी सामग्री को पुनरुत्पादित करने का प्राधिकरण संबंधित विभागों/कॉपीराइट धारकों से प्राप्त किया जाना चाहिए।",
                  "Material featured on this Portal may be reproduced free of charge after taking proper permission by sending a mail to us. However, the material has to be reproduced accurately and not to be used in a derogatory manner or in a misleading context. Wherever the material is being published or issued to others, the source must be prominently acknowledged. However, the permission to reproduce this material shall not extend to any material which is identified as being copyright of a third party. Authorisation to reproduce such material must be obtained from the departments/copyright holders concerned."
                )}
              </p>

              <p>
                {t(
                  "ये नियम और शर्तें भारतीय कानूनों के अनुसार शासित और व्याख्यायित की जाएंगी। इन नियमों और शर्तों के तहत उत्पन्न होने वाला कोई भी विवाद भारत की अदालतों के अनन्य क्षेत्राधिकार के अधीन होगा।",
                  "These terms and conditions shall be governed by and construed in accordance with the Indian Laws. Any dispute arising under these terms and conditions shall be subject to the exclusive jurisdiction of the courts of India."
                )}
              </p>
            </section>

            {/* ── SECTION 2: PRIVACY POLICY ── */}
            <section className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                <span>🛡️</span>
                <span>{t("गोपनीयता नीति (Privacy Policy)", "Privacy Policy")}</span>
              </h2>

              <p>
                {t(
                  "लोक शिकायत पोर्टल स्वचालित रूप से आपसे कोई विशिष्ट व्यक्तिगत जानकारी (जैसे नाम, फोन नंबर या ई-मेल पता) कैप्चर नहीं करता है, जो हमें व्यक्तिगत रूप से आपकी पहचान करने की अनुमति देता है।",
                  "Public Grievance Portal does not automatically capture any specific personal information from you, (like name, phone number or e-mail address), that allows us to identify you individually."
                )}
              </p>

              <p>
                {t(
                  "यदि लोक शिकायत पोर्टल आपसे व्यक्तिगत जानकारी प्रदान करने का अनुरोध करता है, तो आपको उन विशेष उद्देश्यों के लिए सूचित किया जाएगा जिनके लिए जानकारी एकत्र की जाती है और आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए पर्याप्त सुरक्षा उपाय किए जाएंगे।",
                  "If the Public Grievance Portal requests you to provide personal information, you will be informed for the particular purposes for which the information is gathered and adequate security measures will be taken to protect your personal information."
                )}
              </p>

              <p>
                {t(
                  "हम लोक शिकायत पोर्टल साइट पर दी गई किसी भी व्यक्तिगत पहचान योग्य जानकारी को किसी तीसरे पक्ष (सार्वजनिक/निजी) को नहीं बेचते या साझा नहीं करते हैं। इस पोर्टल पर प्रदान की गई किसी भी जानकारी को हानि, दुरुपयोग, अनधिकृत पहुंच या प्रकटीकरण, परिवर्तन या विनाश से संरक्षित किया जाएगा।",
                  "We do not sell or share any personally identifiable information volunteered on the Public Grievance Portal site to any third party (public/private). Any information provided to this Portal will be protected from loss, misuse, unauthorized access or disclosure, alteration, or destruction."
                )}
              </p>

              <p>
                {t(
                  "हम उपयोगकर्ता के बारे में कुछ जानकारी एकत्र करते हैं, जैसे इंटरनेट प्रोटोकॉल (आईपी) पते, डोमेन नाम, ब्राउज़र प्रकार, ऑपरेटिंग सिस्टम, यात्रा की तारीख और समय और देखे गए पृष्ठ। जब तक साइट को नुकसान पहुंचाने का प्रयास नहीं पाया जाता, हम इन पतों को हमारी साइट पर आने वाले व्यक्तियों की पहचान से जोड़ने का कोई प्रयास नहीं करते हैं।",
                  "We gather certain information about the User, such as Internet protocol (IP) addresses, domain name, browser type, operating system, the date and time of the visit and the pages visited. We make no attempt to link these addresses with the identity of individuals visiting our site unless an attempt to damage the site has been detected."
                )}
              </p>
            </section>

            {/* ── SECTION 3: LINKING POLICY ── */}
            <section className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                <span>🔗</span>
                <span>{t("लिंकिंग नीति (Linking Policy)", "Linking Policy")}</span>
              </h2>

              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                  {t("बाहरी वेबसाइटों/पोर्टलों के लिंक (Links to external websites/portals)", "Links to external websites/portals")}
                </h3>
                <p>
                  {t(
                    "इस पोर्टल में कई स्थानों पर आपको अन्य वेबसाइटों/पोर्टलों के लिंक मिलेंगे। ये लिंक आपकी सुविधा के लिए रखे गए हैं। एनआईसी लिंक की गई वेबसाइटों की सामग्री और विश्वसनीयता के लिए ज़िम्मेदार नहीं है और आवश्यक रूप से उनमें व्यक्त विचारों का समर्थन नहीं करता है। लिंक की मात्र उपस्थिति या इस पोर्टल पर इसकी सूची को किसी भी प्रकार का समर्थन नहीं माना जाना चाहिए। हम गारंटी नहीं दे सकते कि ये लिंक हर समय काम करेंगे और लिंक किए गए पृष्ठों की उपलब्धता पर हमारा कोई नियंत्रण नहीं है।",
                    "At many places in this Portal, you shall find links to other websites/portals. This links have been placed for your convenience. NIC is not responsible for the contents and reliability of the linked websites and does not necessarily endorse the views expressed in them. Mere presence of the link or its listing on this Portal should not be assumed as endorsement of any kind. We can not guarantee that these links will work all the time and we have no control over availability of linked pages."
                  )}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                  {t("अन्य वेबसाइटों द्वारा लोक शिकायत पोर्टल के लिंक (Links to Public Grievance Portal by other websites)", "Links to Public Grievance Portal by other websites")}
                </h3>
                <p>
                  {t(
                    "हम आपको इस पोर्टल पर होस्ट की गई जानकारी से सीधे लिंक करने पर कोई आपत्ति नहीं करते हैं और इसके लिए किसी पूर्व अनुमति की आवश्यकता नहीं है। हालाँकि, हम चाहते हैं कि आप हमें इस पोर्टल पर दिए गए किसी भी लिंक के बारे में सूचित करें ताकि आपको उसमें होने वाले किसी भी बदलाव या अपडेट के बारे में सूचित किया जा सके। इसके अलावा, हम अपने पृष्ठों को आपकी साइट पर फ़्रेम में लोड करने की अनुमति नहीं देते हैं। इस पोर्टल से संबंधित पृष्ठ उपयोगकर्ता के नए खुले ब्राउज़र विंडो में लोड होने चाहिए।",
                    "We do not object to you linking directly to the information that is hosted on this Portal and no prior permission is required for the same. However, we would like you to inform us about any links provided to this Portal so that you can be informed of any changes or updations therein. Also, we do not permit our pages to be loaded into frames on your site. The pages belonging to this Portal must load into a newly opened browser window of the User."
                  )}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs">
                <p className="text-gray-700 dark:text-gray-300">
                  {t(
                    "हमारे पोर्टल से लिंक करने के लिए अधिक विवरण और बैनर के लिए हमारे संपर्क अनुभाग पर जाएं:",
                    "For more details and banners to link to our Portal visit our Contact Us Section:"
                  )}{" "}
                  <a
                    href="https://pgportal.gov.in/Home/ContactUs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#1a237e] dark:text-blue-300 underline inline-flex items-center gap-1 ml-1"
                  >
                    <span>Contact Us (pgportal.gov.in/Home/ContactUs)</span>
                    <span>↗</span>
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Footer Bar of Card */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div>
              {t("राष्ट्रीय सूचना विज्ञान केंद्र (NIC) · भारत सरकार", "National Informatics Centre (NIC) · Government of India")}
            </div>
            <div className="flex items-center gap-4">
              <Link to="/website-policies" className="text-[#1a237e] dark:text-blue-300 font-semibold hover:underline">
                {t("वेबसाइट नीतियां", "Website Policies")} →
              </Link>
              <a
                href="https://darpg.gov.in/en/web-information-manager"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a237e] dark:text-blue-300 font-semibold hover:underline"
              >
                {t("वेब सूचना प्रबंधक", "Web Information Manager")} ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
