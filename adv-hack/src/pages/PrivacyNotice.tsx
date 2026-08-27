import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

interface Section {
  id: string;
  title: string;
  titleHi: string;
  content: string;
  contentHi: string;
}

const sections: Section[] = [
  { id: "collect", title: "What data we collect", titleHi: "हम क्या डेटा एकत्र करते हैं", content: "We collect your mobile number or email address for account creation and authentication. We collect the complaint text you provide. We do not collect Aadhaar, PAN, date of birth, gender, caste, or unnecessary sensitive personal data during basic account creation.", contentHi: "हम खाता निर्माण और प्रमाणीकरण के लिए आपका मोबाइल नंबर या ईमेल पता एकत्र करते हैं। हम आपके द्वारा प्रदान किया गया शिकायत टेक्स्ट एकत्र करते हैं। हम बेसिक खाता निर्माण के दौरान आधार, PAN, जन्मतिथि, लिंग, जाति, या अनावश्यक संवेदनशील व्यक्तिगत डेटा एकत्र नहीं करते।" },
  { id: "why", title: "Why we collect it", titleHi: "हम इसे क्यों एकत्र करते हैं", content: "Contact information is collected solely to create and secure your account, authenticate your login using OTP, and allow you to access and track your complaints.", contentHi: "संपर्क जानकारी केवल आपका खाता बनाने और सुरक्षित करने, OTP का उपयोग करके आपके लॉगिन को प्रमाणित करने, और आपको अपनी शिकायतों तक पहुंचने और उन्हें ट्रैक करने की अनुमति देने के लिए एकत्र की जाती है।" },
  { id: "complaint", title: "Complaint data processing", titleHi: "शिकायत डेटा प्रसंस्करण", content: "Complaint text you submit may be processed to register, classify, route, and track your complaint. Before final submission, you can review what information will be shared and with which department.", contentHi: "आपके द्वारा सबमिट किया गया शिकायत टेक्स्ट आपकी शिकायत को पंजीकृत, वर्गीकृत, रूट और ट्रैक करने के लिए संसाधित किया जा सकता है। अंतिम सबमिट से पहले, आप देख सकते हैं कि कौन सी जानकारी किस विभाग के साथ साझा की जाएगी।" },
  { id: "ai", title: "AI processing", titleHi: "AI प्रसंस्करण", content: "AI assistance is used to classify and route your complaint to the correct ministry or department. Only the complaint text is sent for AI classification. Your name, mobile, email, or other personal identifiers are NOT sent to AI classification services.", contentHi: "आपकी शिकायत को सही मंत्रालय या विभाग में वर्गीकृत और रूट करने के लिए AI सहायता का उपयोग किया जाता है। केवल शिकायत टेक्स्ट AI वर्गीकरण के लिए भेजा जाता है। आपका नाम, मोबाइल, ईमेल, या अन्य व्यक्तिगत पहचानकर्ता AI वर्गीकरण सेवाओं को नहीं भेजे जाते।" },
  { id: "share", title: "Who may receive complaint information", titleHi: "कौन शिकायत जानकारी प्राप्त कर सकता है", content: "Your complaint, once submitted, is forwarded to the relevant government ministry or department for resolution. DARPG oversees the grievance coordination process.", contentHi: "आपकी शिकायत, सबमिट होने के बाद, समाधान के लिए संबंधित सरकारी मंत्रालय या विभाग को अग्रेषित की जाती है। DARPG शिकायत समन्वय प्रक्रिया की निगरानी करता है।" },
  { id: "retention", title: "Data retention", titleHi: "डेटा प्रतिधारण", content: "Account data is retained as long as you maintain an active account. Upon account deletion, your data will be removed or anonymised where applicable, subject to legal obligations.", contentHi: "खाता डेटा तब तक रखा जाता है जब तक आप एक सक्रिय खाता बनाए रखते हैं। खाता हटाने पर, आपका डेटा लागू कानूनी दायित्वों के अधीन हटाया या अनाम किया जाएगा।" },
  { id: "rights", title: "Your rights", titleHi: "आपके अधिकार", content: "You have the right to access your data, correct inaccurate information, request deletion of your data, withdraw consent for optional processing, and raise a privacy grievance. Use the Privacy & Data Centre to exercise these rights.", contentHi: "आपको अपना डेटा एक्सेस करने, गलत जानकारी सुधारने, अपना डेटा हटाने का अनुरोध करने, वैकल्पिक प्रसंस्करण के लिए सहमति वापस लेने, और गोपनीयता शिकायत उठाने का अधिकार है।" },
  { id: "children", title: "Children's data", titleHi: "बच्चों का डेटा", content: "This platform is intended for adults aged 18 and above. If you are under 18, please have a parent or guardian contact us before using this service.", contentHi: "यह प्लेटफॉर्म 18 वर्ष और उससे अधिक आयु के वयस्कों के लिए है। यदि आप 18 से कम हैं, तो कृपया इस सेवा का उपयोग करने से पहले किसी माता-पिता या अभिभावक से हमसे संपर्क करवाएं।" },
  { id: "contact", title: "Privacy contact", titleHi: "गोपनीयता संपर्क", content: "For privacy-related questions or concerns, contact us at privacy@cpgrams.gov.in or write to: Data Protection Officer, DARPG, 5th Floor, Sardar Patel Bhawan, Sansad Marg, New Delhi — 110001.", contentHi: "गोपनीयता से संबंधित प्रश्नों या चिंताओं के लिए, privacy@cpgrams.gov.in पर संपर्क करें या लिखें: डेटा संरक्षण अधिकारी, DARPG, 5वीं मंजिल, सरदार पटेल भवन, संसद मार्ग, नई दिल्ली — 110001।" },
];

export default function PrivacyNotice() {
  const { t } = useApp();
  const [expanded, setExpanded] = useState<string | null>("collect");

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">← {t("वापस", "Back")}</Link>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("गोपनीयता सूचना", "Privacy Notice")}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">v1.2</span>
          <span className="text-xs text-gray-400">{t("अंतिम अपडेट: 27 अगस्त 2026", "Last updated: 27 August 2026")}</span>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
        ⚠️ {t("यह एक प्रोटोटाइप है। यह अकेले कानूनी अनुपालन का दावा नहीं करता।", "This is a prototype. It does not alone constitute legal compliance.")}
      </div>

      <div className="space-y-2">
        {sections.map((s) => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === s.id ? null : s.id)}
            >
              <span className="font-semibold text-gray-900 text-sm">{t(s.titleHi, s.title)}</span>
              <span className="text-gray-400 text-lg">{expanded === s.id ? "−" : "+"}</span>
            </button>
            {expanded === s.id && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                {t(s.contentHi, s.content)}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-5">
        <h3 className="font-semibold text-indigo-900 mb-3">{t("अपने अधिकारों का प्रयोग करें", "Exercise Your Rights")}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link to="/privacy/access" className="flex items-center gap-2 px-3 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-50">📂 {t("डेटा देखें", "View My Data")}</Link>
          <Link to="/privacy/correction" className="flex items-center gap-2 px-3 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-50">✏️ {t("सुधार करें", "Correct Data")}</Link>
          <Link to="/privacy/consent" className="flex items-center gap-2 px-3 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-50">🔔 {t("सहमति", "Consent")}</Link>
          <Link to="/privacy/grievance" className="flex items-center gap-2 px-3 py-2 bg-white border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-50">📢 {t("शिकायत", "Grievance")}</Link>
        </div>
      </div>
    </div>
  );
}
