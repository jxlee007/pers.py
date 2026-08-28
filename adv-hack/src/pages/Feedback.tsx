import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { dashboardCases } from "../data/mockData";
import Button from "../components/Button";
import SocialSharePanel from "../components/SocialSharePanel";

export default function Feedback() {
  const { t } = useApp();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [routingCorrect, setRoutingCorrect] = useState<boolean | null>(null);
  const [genuineRemedy, setGenuineRemedy] = useState<"real" | "paper" | null>(null);
  const [speedRating, setSpeedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [caseId, setCaseId] = useState(dashboardCases[0]?.id || "");
  const [submitted, setSubmitted] = useState(false);
  const [escalationId] = useState(() => `ESC_AUTO_${Math.floor(1000 + Math.random() * 9000)}`);

  function handleSubmit() {
    if (rating === 0) return;
    setSubmitted(true);
  }

  const isEscalationTriggered = (rating > 0 && rating <= 2) || genuineRemedy === "paper";

  const ratingLabels = [
    t("बहुत खराब (असंतोषजनक)", "Very Poor (Unsatisfied)"),
    t("खराब (समस्या हल नहीं हुई)", "Poor (Problem Not Fixed)"),
    t("ठीक है (आंशिक समाधान)", "Average (Partial Remedy)"),
    t("अच्छा (संतोषजनक)", "Good (Satisfactory)"),
    t("बहुत अच्छा! (पूर्ण समाधान)", "Excellent! (Fully Resolved)"),
  ];

  if (submitted) {
    const selectedCase = dashboardCases.find((c) => c.id === caseId);
    const department = selectedCase?.routed_to || "Government Department";
    const stars = "⭐".repeat(rating) + "☆".repeat(5 - rating);
    const portalUrl = "https://cpgrams-ai.gov.in";

    // Auto-generated social media post templates
    const escalationPost = {
      twitter: `🚨 CPGRAMS Alert: My ${department} grievance (${caseId}) resolved on PAPER only — problem still exists on ground.\n\nRating given: ${"★".repeat(rating)}/5 ❌\nEscalation ID: ${escalationId}\n\nThis case has been auto-escalated to the Nodal Appellate Authority under CPGRAMS statutory rules.\n\n📊 Accountability Radar: ${portalUrl}/accountability\n#CPGRAMS #GovIndia #JanShikayat #AccountabilityMatters`,

      whatsapp: `🚨 *CPGRAMS शिकायत अलर्ट*\n\nमेरी शिकायत (${caseId}) ${department} में केवल कागजी तौर पर बंद की गई — जमीनी समाधान अभी तक नहीं हुआ।\n\n⭐ रेटिंग: ${"★".repeat(rating)}/5\n🆔 एस्केलेशन ID: *${escalationId}*\n\nयह केस CPGRAMS वैधानिक नियमों के तहत नोडल अपीलीय प्राधिकरण को स्वतः एस्केलेट हुआ है। 30 दिनों में निस्तारण अनिवार्य है।\n\n📊 जवाबदेही डैशबोर्ड: ${portalUrl}/accountability`,

      linkedin: `📢 Public Grievance Accountability Update\n\nI filed a grievance (Case ${caseId}) with ${department} through CPGRAMS, India's centralized grievance portal. Despite receiving a formal closure notice, the issue has NOT been resolved on the ground.\n\nRating logged: ${"★".repeat(rating)}/5 — "Poor"\nEscalation Reference: ${escalationId}\n\nUnder CPGRAMS statutory rules, this case has been auto-escalated to the Nodal Appellate Authority, which is mandated to dispose of the appeal within 30 days.\n\nThis is what transparent government accountability looks like in practice. Every citizen deserves real solutions — not paper compliance.\n\nPublic Accountability Dashboard: ${portalUrl}/accountability\n\n#CPGRAMS #GovernmentAccountability #CitizenRights #India #PublicGrievance #Transparency`,

      facebook: `🚨 Important Public Notice — CPGRAMS Grievance\n\nI submitted a grievance (${caseId}) with ${department}. Though the department closed it on the portal, my actual problem was NOT fixed.\n\nRating: ${"★".repeat(rating)}/5\nEscalation Tracking: ${escalationId}\n\nThe case is now auto-escalated to the Nodal Appellate Authority under CPGRAMS law — they must resolve it within 30 days.\n\nTrack the public accountability radar: ${portalUrl}/accountability\n\nIf this happened to you too, share this. Every rating counts. 🙏\n#CPGRAMS #IndiaGovt #AccountabilityMatters`,
    };

    const praisePost = {
      twitter: `🏆 Kudos to ${department} — my CPGRAMS grievance (${caseId}) was genuinely resolved! Real solution, not just paperwork.\n\nCitizen Rating: ${stars} (${rating}/5)\n\nThis is how government should work. Public officer accountability is real! 🙌\n\n📊 See the transparency leaderboard: ${portalUrl}/accountability\n#CPGRAMS #GoodGovernance #JanShikayat #ProudCitizen`,

      whatsapp: `🏆 *शाबाशी: ${department}*\n\nमेरी CPGRAMS शिकायत (${caseId}) का वास्तविक समाधान हुआ — सिर्फ कागजी नहीं, जमीन पर!\n\n⭐ नागरिक रेटिंग: ${stars} (${rating}/5)\n\nऐसे अधिकारियों को सार्वजनिक सम्मान मिलना चाहिए। CPGRAMS AI की जवाबदेही प्रणाली ने काम किया! 🙌\n\n📊 पारदर्शिता लीडरबोर्ड: ${portalUrl}/accountability`,

      linkedin: `🌟 A Positive Experience with Government Grievance Resolution\n\nI recently filed a grievance (Case ${caseId}) with ${department} through CPGRAMS.\n\nI'm happy to share that the issue was GENUINELY resolved — not just closed on paper.\n\nMy rating: ${stars} (${rating}/5)\n\nIn an era where government accountability is often questioned, this is a refreshing example of how public officers can make a real difference. The CPGRAMS AI system's transparent officer ranking system creates the right incentives for genuine public service.\n\nSee the Public Officer Leaderboard: ${portalUrl}/accountability\n\n#CPGRAMS #GoodGovernance #PublicService #CitizenExperience #India #Accountability`,

      facebook: `🎉 Great news — my government grievance was ACTUALLY fixed!\n\nFiled through CPGRAMS, Case ${caseId} — ${department} resolved my issue genuinely. No circular replies, real action on the ground!\n\nMy Rating: ${stars} (${rating}/5)\n\nThis officer deserves public recognition. The CPGRAMS AI accountability system is working.\n\nCheck the public officer rankings: ${portalUrl}/accountability\n\nShare if your experience was good too! 🙏 #CPGRAMS #GoodGovernance`,
    };

    const shareTemplates = isEscalationTriggered ? escalationPost : praisePost;

    const encodedTwitter = encodeURIComponent(shareTemplates.twitter);
    const encodedWhatsApp = encodeURIComponent(shareTemplates.whatsapp);
    const encodedLinkedIn = encodeURIComponent(shareTemplates.linkedin);
    const encodedFacebook = encodeURIComponent(shareTemplates.facebook);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTwitter}`,
      whatsapp: `https://wa.me/?text=${encodedWhatsApp}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portalUrl)}&summary=${encodedLinkedIn}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(portalUrl)}&quote=${encodedFacebook}`,
    };

    if (isEscalationTriggered) {
      return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4">
            {/* Main Escalation Card */}
            <div className="bg-white rounded-2xl border-2 border-red-200 shadow-lg p-6 text-left border-t-4 border-t-[#c62828]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚨</span>
                  <h2 className="text-lg sm:text-xl font-black text-gray-900">
                    {t("स्वतः एस्केलेशन सक्रिय!", "Auto-Escalation Triggered!")}
                  </h2>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-red-100 text-red-800 border border-red-200">
                  {escalationId}
                </span>
              </div>

              <div className="bg-red-50/70 border border-red-200 rounded-xl p-4 space-y-2 text-xs text-gray-800 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">{t("केस संदर्भ:", "Case Reference:")}</span>
                  <span className="font-bold text-gray-900 font-mono">{caseId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">{t("दर्ज रेटिंग:", "Logged Rating:")}</span>
                  <span className="font-bold text-amber-700">{"★".repeat(rating)} ({rating}/5)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">{t("समाधान स्थिति:", "Remedy Verification:")}</span>
                  <span className="font-bold text-red-700">
                    {genuineRemedy === "paper" ? t("कागजी खानापूर्ति", "Paper Only") : t("असंतोषजनक", "Unsatisfied")}
                  </span>
                </div>
                <div className="pt-2 border-t border-red-200">
                  <div className="font-bold text-[#1a237e]">
                    🏛️ {t("राज्य नोडल PG अधिकारी एवं अपीलीय प्राधिकरण", "State Nodal PG Officer & Appellate Authority")}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 mb-4">
                <p className="font-bold mb-0.5">⏱️ {t("वैधानिक SLA:", "Statutory SLA:")}</p>
                <p>{t("24h: नोडल PG समीक्षा • 30d: अपीलीय प्राधिकरण निस्तारण", "24h: Nodal PG review • 30d: Appellate Authority disposal mandate")}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link to="/appeals" className="flex-1">
                  <Button size="md" fullWidth>⚖️ {t("अपील ट्रैक करें", "Track Appeal")}</Button>
                </Link>
                <Link to="/accountability" className="flex-1">
                  <Button variant="secondary" size="md" fullWidth>📊 {t("जवाबदेही रडार", "Accountability Radar")}</Button>
                </Link>
              </div>
            </div>

            {/* SOCIAL MEDIA SHARE SECTION - Escalation */}
            <SocialSharePanel
              t={t}
              isEscalation={true}
              shareUrls={shareUrls}
              shareTemplates={shareTemplates}
              caseId={caseId}
              rating={rating}
              department={department}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4">
          {/* Main Thank You Card */}
          <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-6 text-center border-t-4 border-t-[#2e7d32]">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("धन्यवाद! शानदार फीडबैक!", "Thank You! Great Feedback!")}</h2>
            <div className="text-3xl my-3">{stars}</div>
            <p className="text-sm text-gray-600 mb-4">
              {t(
                "आपकी सकारात्मक रेटिंग इस अधिकारी को राष्ट्रीय जवाबदेही लीडरबोर्ड पर आगे बढ़ाएगी। यह उनके करियर का सार्वजनिक सम्मान है।",
                "Your positive rating boosts this officer's national leaderboard ranking — public recognition for genuine public service."
              )}
            </p>
            <div className="flex gap-2.5">
              <Link to="/dashboard" className="flex-1">
                <Button variant="secondary" size="md" fullWidth>{t("मेरे केस", "My Cases")}</Button>
              </Link>
              <Link to="/accountability" className="flex-1">
                <Button size="md" fullWidth>{t("लीडरबोर्ड", "Leaderboard")}</Button>
              </Link>
            </div>
          </div>

          {/* SOCIAL MEDIA SHARE SECTION - Praise */}
          <SocialSharePanel
            t={t}
            isEscalation={false}
            shareUrls={shareUrls}
            shareTemplates={shareTemplates}
            caseId={caseId}
            rating={rating}
            department={department}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">⭐</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("फीडबैक एवं समाधान सत्यापन", "Rate & Verify Resolution")}</h1>
          <p className="text-gray-500 mt-2 text-sm">
            {t("कागजी खानापूर्ति नहीं — वास्तविक राहत। आपकी रेटिंग से स्वतः एस्केलेशन निर्धारित होता है।", "Real remedy over paper compliance. Your feedback directly drives supervisory auto-escalation.")}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            {/* Case selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t("किस केस के बारे में फीडबैक?", "Feedback for which case?")}</label>
              <select
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 bg-white"
              >
                {dashboardCases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id} — {c.title} ({c.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Overall rating */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                {t("समाधान से कितने संतुष्ट हैं?", "How satisfied are you with the resolution?")}
                <span className="text-red-500 ml-1">*</span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="text-4xl transition-all duration-100 hover:scale-110"
                    aria-label={`${star} star`}
                  >
                    {star <= (hoveredRating || rating) ? "⭐" : "☆"}
                  </button>
                ))}
              </div>
              {(hoveredRating || rating) > 0 && (
                <div className={`text-sm font-semibold mt-2 ${
                  (hoveredRating || rating) <= 2 ? "text-red-600" : "text-indigo-600"
                }`}>
                  {ratingLabels[(hoveredRating || rating) - 1]}
                </div>
              )}
            </div>

            {/* CRITICAL: GENUINE REMEDY VS PAPER COMPLIANCE QUESTION */}
            <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="text-sm font-semibold text-gray-800 mb-1">
                🎯 {t("समाधान गुणवत्ता सत्यापन (कागजी बनाम वास्तविक):", "Remedy Verification (Paper vs Real):")}
                <span className="text-red-500 ml-1">*</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                {t(
                  "क्या आपकी समस्या का जमीन पर समाधान हुआ, या केवल नियम/परिपत्र का हवाला देकर केस बंद कर दिया गया?",
                  "Did you receive genuine real-world relief, or was the case closed with circulars/paper-only replies?"
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setGenuineRemedy("real")}
                  className={`p-3 rounded-lg text-xs font-bold border-2 text-left transition-all ${
                    genuineRemedy === "real"
                      ? "border-green-600 bg-green-50 text-green-900 shadow-2xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span>✅</span>
                    <span>{t("वास्तविक समाधान प्राप्त हुआ", "Real Remedy Received")}</span>
                  </div>
                  <span className="text-[10px] font-normal text-gray-500 block">
                    {t("पेंशन/रिफंड/कार्ड वास्तव में मिल गया", "Money, document, or physical work confirmed")}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setGenuineRemedy("paper")}
                  className={`p-3 rounded-lg text-xs font-bold border-2 text-left transition-all ${
                    genuineRemedy === "paper"
                      ? "border-red-600 bg-red-50 text-red-900 shadow-2xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-red-300"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span>⚠️</span>
                    <span>{t("केवल कागजी खानापूर्ति (समस्या हल नहीं)", "Paper Only — Problem Unfixed")}</span>
                  </div>
                  <span className="text-[10px] font-normal text-gray-500 block">
                    {t("जवाब मिला लेकिन कार्य नहीं हुआ (स्वतः एस्केलेशन)", "Formal letter given but issue persists")}
                  </span>
                </button>
              </div>
            </div>

            {/* DYNAMIC AUTO-ESCALATION ALERT BANNER */}
            {isEscalationTriggered && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border-2 border-red-300 text-xs text-red-900 animate-in fade-in slide-in-from-top-2">
                <div className="font-extrabold flex items-center gap-1.5 text-sm mb-1 text-red-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
                  <span>🚨 {t("CPGRAMS स्वतः एस्केलेशन ट्रिगर सक्रिय!", "CPGRAMS Auto-Escalation Trigger Activated!")}</span>
                </div>
                <p className="leading-relaxed text-red-950 font-medium">
                  {t(
                    "CPGRAMS वैधानिक दिशानिर्देशों के अनुसार, 'खराब' (≤ 2 स्टार) रेटिंग अथवा कागजी खानापूर्ति रिपोर्ट करने पर यह शिकायत 24 घंटे के भीतर राज्य नोडल पीजी अधिकारी को स्वतः एस्केलेट होगी तथा नोडल अपीलीय प्राधिकरण के समक्ष 30-दिवसीय वैधानिक अपील सक्षम होगी।",
                    "Under CPGRAMS statutory rules, registering a 'Poor' (≤ 2 stars) rating or paper-only compliance automatically escalates this grievance to the State Nodal PG Officer within 24h and unlocks immediate appeal to the Nodal Appellate Authority (30-day disposal mandate)."
                  )}
                </p>
                <div className="mt-2.5 pt-2 border-t border-red-200/80 flex items-center justify-between text-[11px] font-bold text-red-800">
                  <span>🏛️ {t("संबद्ध अपीलीय प्राधिकरण: सक्षम ✅", "Statutory Appellate Authority: Enabled ✅")}</span>
                  <span>⏱️ {t("पर्यवेक्षी समीक्षा: 24 घंटे", "Supervisory Review: 24h")}</span>
                </div>
              </div>
            )}

            {/* Routing correct */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                {t("क्या AI रूटिंग सही थी?", "Was the AI routing correct?")}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRoutingCorrect(true)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                    routingCorrect === true ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600 hover:border-emerald-300"
                  }`}
                >
                  ✅ {t("हाँ, सही थी", "Yes, Correct")}
                </button>
                <button
                  type="button"
                  onClick={() => setRoutingCorrect(false)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                    routingCorrect === false ? "border-red-500 bg-red-50 text-red-700" : "border-gray-200 text-gray-600 hover:border-red-300"
                  }`}
                >
                  ❌ {t("नहीं, गलत थी", "No, Incorrect")}
                </button>
              </div>
            </div>

            {/* Speed rating */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                {t("समाधान की गति कैसी थी?", "How was the resolution speed?")}
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSpeedRating(star)}
                    className="text-3xl transition-all duration-100 hover:scale-110"
                    aria-label={`Speed ${star}`}
                  >
                    {star <= speedRating ? "⚡" : "○"}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{t("बहुत धीमी", "Very Slow")}</span>
                <span>{t("बहुत तेज़", "Very Fast")}</span>
              </div>
            </div>
          </div>

          {/* Comment */}
          <div className="p-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("अतिरिक्त टिप्पणी / समस्या का विवरण (वैकल्पिक)", "Additional Comments / Details (Optional)")}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("यदि समस्या हल नहीं हुई तो कृपया बताएं कि क्या अधूरा रह गया...", "If the problem was not fixed, describe what was left undone...")}
                className="w-full h-28 px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none outline-none focus:border-indigo-400 transition-colors"
                style={{ fontSize: "16px" }}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              size="lg"
              fullWidth
              className={`mt-4 ${isEscalationTriggered ? "!bg-[#c62828] hover:!bg-[#b71c1c]" : ""}`}
            >
              {isEscalationTriggered
                ? `🚨 ${t("फीडबैक सबमिट करें और स्वतः एस्केलेट करें", "Submit Feedback & Auto-Escalate")}`
                : t("फीडबैक सबमिट करें", "Submit Feedback")}
            </Button>
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 {t("आपका फीडबैक पूरी तरह पारदर्शी है और जवाबदेही इंजन द्वारा ऑडिट किया जाता है।", "Your feedback is verified and publicly audited by the CPGRAMS Accountability Engine.")}
        </p>
      </div>
    </div>
  );
}

