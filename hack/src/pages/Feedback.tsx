import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { dashboardCases } from "../data/mockData";
import Button from "../components/Button";

export default function Feedback() {
  const { t } = useApp();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [routingCorrect, setRoutingCorrect] = useState<boolean | null>(null);
  const [speedRating, setSpeedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [caseId, setCaseId] = useState(dashboardCases[0]?.id || "");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (rating === 0) return;
    setSubmitted(true);
  }

  const ratingLabels = [
    t("बहुत खराब", "Very Poor"),
    t("खराब", "Poor"),
    t("ठीक है", "Average"),
    t("अच्छा", "Good"),
    t("बहुत अच्छा!", "Excellent!"),
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("धन्यवाद!", "Thank You!")}</h2>
          <p className="text-gray-600 mb-2">
            {t("आपका फीडबैक सफलतापूर्वक दर्ज किया गया।", "Your feedback has been recorded successfully.")}
          </p>
          <div className="text-3xl my-4">{"⭐".repeat(rating)}</div>
          <p className="text-sm text-gray-500 mb-6">
            {t("आपकी प्रतिक्रिया हमें CPGRAMS AI को बेहतर बनाने में मदद करती है।", "Your feedback helps us improve CPGRAMS AI for all citizens.")}
          </p>
          <div className="flex gap-3">
            <Link to="/dashboard" className="flex-1">
              <Button variant="secondary" size="md" fullWidth>{t("मेरे केस", "My Cases")}</Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button size="md" fullWidth>{t("होम", "Home")}</Button>
            </Link>
          </div>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("फीडबैक दें", "Rate & Feedback")}</h1>
          <p className="text-gray-500 mt-2">
            {t("आपकी राय हमारे लिए महत्वपूर्ण है", "Your opinion helps us serve you better")}
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
                    {c.id} — {c.title}
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
                <div className="text-sm text-indigo-600 font-medium mt-2">
                  {ratingLabels[(hoveredRating || rating) - 1]}
                </div>
              )}
            </div>

            {/* Routing correct */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-700 mb-3">
                {t("क्या AI रूटिंग सही थी?", "Was the AI routing correct?")}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setRoutingCorrect(true)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                    routingCorrect === true ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600 hover:border-emerald-300"
                  }`}
                >
                  ✅ {t("हाँ, सही थी", "Yes, Correct")}
                </button>
                <button
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
                {t("अतिरिक्त टिप्पणी (वैकल्पिक)", "Additional Comments (Optional)")}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("हमें बताएं कि हम कैसे सुधार कर सकते हैं...", "Tell us how we can improve...")}
                className="w-full h-28 px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none outline-none focus:border-indigo-400 transition-colors"
                style={{ fontSize: "16px" }}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              size="lg"
              fullWidth
              className="mt-4"
            >
              {t("फीडबैक सबमिट करें", "Submit Feedback")}
            </Button>
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 {t("आपका फीडबैक पूरी तरह गोपनीय है।", "Your feedback is completely anonymous and confidential.")}
        </p>
      </div>
    </div>
  );
}
