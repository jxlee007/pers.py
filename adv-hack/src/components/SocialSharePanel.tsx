import { useState } from "react";

interface ShareUrls {
  twitter: string;
  whatsapp: string;
  linkedin: string;
  facebook: string;
}

interface ShareTemplates {
  twitter: string;
  whatsapp: string;
  linkedin: string;
  facebook: string;
}

interface SocialSharePanelProps {
  t: (hi: string, en: string) => string;
  isEscalation: boolean;
  shareUrls: ShareUrls;
  shareTemplates: ShareTemplates;
  caseId: string;
  rating: number;
  department: string;
}

type Platform = "twitter" | "whatsapp" | "linkedin" | "facebook";

const PLATFORMS: { key: Platform; label: string; icon: string; color: string; bg: string; border: string }[] = [
  {
    key: "twitter",
    label: "X (Twitter)",
    icon: "𝕏",
    color: "text-white",
    bg: "bg-black hover:bg-gray-900",
    border: "border-black",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: "💬",
    color: "text-white",
    bg: "bg-[#25D366] hover:bg-[#1ebe5a]",
    border: "border-[#25D366]",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: "f",
    color: "text-white",
    bg: "bg-[#1877F2] hover:bg-[#0f60cc]",
    border: "border-[#1877F2]",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: "in",
    color: "text-white",
    bg: "bg-[#0A66C2] hover:bg-[#0852a3]",
    border: "border-[#0A66C2]",
  },
];

export default function SocialSharePanel({
  t,
  isEscalation,
  shareUrls,
  shareTemplates,
  caseId,
  rating,
  department,
}: SocialSharePanelProps) {
  const [previewPlatform, setPreviewPlatform] = useState<Platform>("twitter");
  const [copied, setCopied] = useState(false);
  const [justShared, setJustShared] = useState<Platform | null>(null);

  const accentColor = isEscalation ? "#c62828" : "#2e7d32";
  const accentBg = isEscalation ? "bg-red-50" : "bg-green-50";
  const accentBorder = isEscalation ? "border-red-200" : "border-green-200";
  const accentText = isEscalation ? "text-red-800" : "text-green-800";
  const accentBadgeBg = isEscalation ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700";

  const headlineEn = isEscalation
    ? "⚡ Hold Officials Accountable — Share on Social Media"
    : "🌟 Give Public Credit — Share on Social Media";
  const headlineHi = isEscalation
    ? "⚡ अधिकारियों को जवाबदेह बनाएं — सोशल मीडिया पर शेयर करें"
    : "🌟 सार्वजनिक सम्मान दें — सोशल मीडिया पर शेयर करें";

  const subtitleEn = isEscalation
    ? `Your ${rating}/5 rating is already logged in CPGRAMS. Now take it public — create real pressure for resolution.`
    : `Your ${rating}/5 rating boosts this officer publicly. Share it — good governance deserves public credit.`;
  const subtitleHi = isEscalation
    ? `आपकी ${rating}/5 रेटिंग CPGRAMS में दर्ज है। इसे सार्वजनिक करें — वास्तविक दबाव बनाएं।`
    : `आपकी ${rating}/5 रेटिंग अधिकारी को सार्वजनिक रूप से आगे बढ़ाती है। शेयर करें — अच्छे काम को सम्मान दें।`;

  const badgeText = isEscalation
    ? t("जवाबदेही दबाव", "Accountability Pressure")
    : t("सार्वजनिक सम्मान", "Public Credit");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareTemplates[previewPlatform]);
    } catch {
      // fallback — still show copied
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handleShare(platform: Platform) {
    setPreviewPlatform(platform);
    setJustShared(platform);
    setTimeout(() => setJustShared(null), 2000);
    window.open(shareUrls[platform], "_blank", "noopener,noreferrer,width=620,height=620");
  }

  return (
    <div
      className={`bg-white rounded-2xl border-2 ${accentBorder} shadow-md overflow-hidden`}
      style={{ borderTopColor: accentColor, borderTopWidth: "4px" }}
    >
      {/* Header */}
      <div className={`${accentBg} px-5 py-4 border-b ${accentBorder}`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className={`text-sm font-black ${accentText}`}>{t(headlineHi, headlineEn)}</h3>
            <p className="text-xs text-gray-600 mt-0.5 max-w-md leading-relaxed">{t(subtitleHi, subtitleEn)}</p>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${accentBadgeBg} whitespace-nowrap`}>
            {badgeText}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Platform Share Buttons */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {t("प्लेटफ़ॉर्म चुनें और शेयर करें:", "Choose Platform & Share:")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PLATFORMS.map((platform) => (
              <button
                key={platform.key}
                onClick={() => handleShare(platform.key)}
                className={`
                  flex flex-col items-center justify-center gap-1.5 rounded-xl py-3.5 px-2
                  ${platform.bg} ${platform.color} transition-all duration-200
                  active:scale-95 shadow-sm hover:shadow-md font-medium text-xs
                  border ${platform.border}
                  ${justShared === platform.key ? "ring-2 ring-offset-2 ring-gray-400 scale-95" : ""}
                `}
                title={`Share on ${platform.label}`}
              >
                <span className="text-lg leading-none font-black">{platform.icon}</span>
                <span className="text-[11px] font-semibold opacity-90">{platform.label}</span>
                {justShared === platform.key && (
                  <span className="text-[9px] opacity-80 animate-pulse">Opening...</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Post Preview / Copy Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {t("पोस्ट प्रीव्यू:", "Post Preview:")}
              <span className="ml-1.5 font-normal normal-case text-gray-400">
                {PLATFORMS.find((p) => p.key === previewPlatform)?.label}
              </span>
            </p>
            {/* Preview tab switcher */}
            <div className="flex gap-1">
              {PLATFORMS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPreviewPlatform(p.key)}
                  className={`
                    text-[10px] font-bold px-2 py-0.5 rounded transition-all duration-150
                    ${previewPlatform === p.key
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"}
                  `}
                  title={p.label}
                >
                  {p.key === "twitter" ? "𝕏" : p.key === "whatsapp" ? "WA" : p.key === "linkedin" ? "IN" : "FB"}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <pre
              className="text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-4 pr-16 whitespace-pre-wrap leading-relaxed max-h-44 overflow-y-auto font-sans"
            >
              {shareTemplates[previewPlatform]}
            </pre>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className={`
                absolute top-2.5 right-2.5 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all duration-200 whitespace-nowrap
                ${copied
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:text-gray-900 shadow-sm"}
              `}
            >
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
          </div>

          {/* Helper text */}
          <p className="text-[10px] text-gray-400">
            {t(
              "ऊपर दिए बटनों पर क्लिक करने से पोस्ट अपने आप खुलेगी। आप इसे कस्टमाइज़ कर सकते हैं।",
              "Clicking a platform button opens a pre-filled post window. You can customize the text before posting."
            )}
          </p>
        </div>

        {/* Impact Statement */}
        <div className={`rounded-xl p-3.5 ${accentBg} border ${accentBorder}`}>
          <p className={`text-xs font-medium ${accentText} flex items-start gap-2`}>
            <span className="text-base leading-none flex-shrink-0">{isEscalation ? "📢" : "🏅"}</span>
            <span>
              {isEscalation
                ? t(
                    "सोशल मीडिया पर शेयर करने से CPGRAMS वैधानिक प्रक्रिया के साथ-साथ सार्वजनिक दबाव भी बनता है। हर शेयर से नागरिक जवाबदेही मजबूत होती है।",
                    "Sharing publicly creates real pressure alongside the CPGRAMS statutory process. Every share amplifies citizen accountability — accountability data shouldn't stay siloed."
                  )
                : t(
                    "सार्वजनिक प्रशंसा अधिकारियों को प्रेरित करती है। आपका एक शेयर इस अधिकारी के करियर में वास्तविक सकारात्मक प्रभाव डाल सकता है।",
                    "Public praise motivates officers and sets a benchmark. Your share creates a lasting, positive mark in this officer's public service record."
                  )}
            </span>
          </p>
        </div>

        {/* Metadata row */}
        <div className="flex items-center gap-3 pt-1 border-t border-gray-100 text-[10px] text-gray-400 font-mono flex-wrap">
          <span>📌 {caseId}</span>
          <span>⭐ {rating}/5</span>
          <span>🏛️ {department}</span>
          <span className="ml-auto font-semibold">
            {isEscalation
              ? t("🔴 एस्केलेशन दर्ज", "🔴 Escalation Logged")
              : t("🟢 सकारात्मक रेटिंग", "🟢 Positive Rating")}
          </span>
        </div>
      </div>
    </div>
  );
}
