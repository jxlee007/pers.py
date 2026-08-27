import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { faqs } from "../data/mockData";

export default function Help() {
  const { t } = useApp();
  const [openId, setOpenId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((f) => {
    const q = search.toLowerCase();
    return !q || f.question.toLowerCase().includes(q) || f.questionHi.includes(q) || f.answer.toLowerCase().includes(q);
  });

  function toggle(id: number) {
    setOpenId(openId === id ? null : id);
  }

  const quickLinks = [
    { icon: "✍️", label: t("शिकायत दर्ज करें", "File Complaint"), to: "/file-complaint" },
    { icon: "📋", label: t("मेरे केस", "My Cases"), to: "/dashboard" },
    { icon: "⚖️", label: t("अपील करें", "File Appeal"), to: "/appeals" },
    { icon: "👤", label: t("अधिकारी खोजें", "Find Officer"), to: "/directory" },
    { icon: "🎯", label: t("कैसे काम करता है", "How It Works"), to: "/how-it-works" },
  ];

  const helplines = [
    { name: "EPFO Helpline", number: "1800-180-1111", icon: "🏦" },
    { name: "CBDT Helpline", number: "1800-425-8850", icon: "📊" },
    { name: "UIDAI Helpline", number: "1800-300-1947", icon: "🆔" },
    { name: "Railway Helpline", number: "139", icon: "🚂" },
    { name: "DARPG Helpline", number: "01123401455", icon: "📢" },
    { name: "GST Helpline", number: "1800-200-7777", icon: "🧾" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">❓</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("सहायता केंद्र", "Help Center")}</h1>
          <p className="text-gray-500 mt-2">{t("अक्सर पूछे जाने वाले सवाल और उनके जवाब", "Frequently asked questions and answers")}</p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("सवाल खोजें...", "Search FAQs...")}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-indigo-500 transition-colors shadow-sm bg-white"
            style={{ fontSize: "16px" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ Accordion */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-gray-900 text-lg mb-4">
              {t("सामान्य प्रश्न", "Frequently Asked Questions")}
              {search && <span className="text-sm font-normal text-gray-400 ml-2">({filtered.length} {t("परिणाम", "results")})</span>}
            </h2>

            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <div className="text-4xl mb-2">🤷</div>
                  <div>{t("कोई प्रश्न नहीं मिला", "No FAQs found")}</div>
                </div>
              ) : (
                filtered.map((faq) => (
                  <div key={faq.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-200 transition-colors">
                    <button
                      onClick={() => toggle(faq.id)}
                      className="w-full flex items-start justify-between gap-4 p-5 text-left"
                      aria-expanded={openId === faq.id}
                    >
                      <span className="font-semibold text-gray-900 text-sm leading-snug">
                        {t(faq.questionHi, faq.question)}
                      </span>
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
                          openId === faq.id ? "bg-indigo-600 text-white rotate-180" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        ▾
                      </span>
                    </button>

                    <div className={`accordion-answer ${openId === faq.id ? "open" : ""}`}>
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                        {t(faq.answerHi, faq.answer)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick links */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">{t("त्वरित लिंक", "Quick Links")}</h3>
              <div className="space-y-2">
                {quickLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-sm font-medium text-gray-700"
                  >
                    <span>{l.icon}</span>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Helplines */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
              <h3 className="font-bold text-indigo-800 mb-3 text-sm">{t("हेल्पलाइन नंबर", "Department Helplines")}</h3>
              <div className="space-y-3">
                {helplines.map((h) => (
                  <a
                    key={h.name}
                    href={`tel:${h.number}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-indigo-100 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{h.icon}</span>
                      <span className="text-xs text-gray-600">{h.name}</span>
                    </div>
                    <span className="font-mono font-bold text-indigo-700 text-xs group-hover:text-indigo-900">{h.number}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">{t("और मदद चाहिए?", "Need More Help?")}</h3>
              <p className="text-xs text-gray-500 mb-3">{t("हमारे सहायता दल से संपर्क करें", "Contact our support team")}</p>
              <Link
                to="/file-complaint"
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-colors"
                style={{ background: "var(--primary)" }}
              >
                ✍️ {t("शिकायत दर्ज करें", "File Complaint")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
