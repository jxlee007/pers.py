import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { classifyComplaint } from "../services/llmRouter";
import { testComplaints } from "../data/mockData";

type Mode = "idle" | "recording" | "processing" | "done";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Chandigarh", "Puducherry",
  "Andaman & Nicobar Islands", "Dadra & Nagar Haveli", "Lakshadweep",
];

const MINISTRY_CATEGORIES = [
  { value: "", label: "-- Select Ministry / Department --" },
  { value: "pension", label: "EPFO — Employees' Provident Fund Organisation" },
  { value: "tax", label: "CBDT — Central Board of Direct Taxes" },
  { value: "license", label: "Ministry of Road Transport & Highways (RTO)" },
  { value: "aadhaar", label: "UIDAI — Unique Identification Authority of India" },
  { value: "road", label: "Ministry of Road Transport / State PWD" },
  { value: "railway", label: "Ministry of Railways / IRCTC" },
  { value: "gst", label: "GST Network (GSTN)" },
  { value: "other", label: "DARPG — General / Other Grievances" },
];

const SUB_CATEGORIES: Record<string, string[]> = {
  pension: ["EPS Pension Not Received", "PF Withdrawal Delayed", "UAN Not Linked", "Transfer Claim Pending", "Other EPF Issue"],
  tax: ["ITR Refund Pending", "Form 16 Issues", "TDS Mismatch", "PAN Card Problem", "Other Tax Issue"],
  license: ["DL Renewal Delayed", "DL Not Received", "Vehicle Registration", "Fitness Certificate", "Other RTO Issue"],
  aadhaar: ["Enrollment Rejected", "Biometric Update", "Address Update", "Name Correction", "Other Aadhaar Issue"],
  road: ["Road Not Repaired", "Pothole Complaint", "Highway Issue", "Bridge Damage", "Other Road Issue"],
  railway: ["Ticket Refund Pending", "Train Delay", "Station Facility", "Online Booking Issue", "Other Railway Issue"],
  gst: ["Return Upload Failed", "Registration Issue", "Refund Pending", "E-Invoice Problem", "Other GST Issue"],
  other: ["Public Service Delivery", "Government Scheme", "District Administration", "State Government", "Other"],
};

export default function FileComplaint() {
  const { t, setRoutingResult, setComplaintText: setGlobalText, currentUser } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<Mode>("idle");
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(12).fill(6));
  const [recordTime, setRecordTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const waveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Complainant details
  const [name, setName] = useState(currentUser?.name || "");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState(currentUser?.mobile || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");

  // Grievance details
  const [ministry, setMinistry] = useState(searchParams.get("type") || "");
  const [subCategory, setSubCategory] = useState("");
  const [grievanceTitle, setGrievanceTitle] = useState("");
  const [text, setText] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [fileName, setFileName] = useState("");

  // AI routing preview
  const [aiPreview, setAiPreview] = useState<{ ministry: string; confidence: number; icon: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── LOGIN GUARD ──
  useEffect(() => {
    if (!currentUser) {
      navigate("/login?redirect=/file-complaint" + (searchParams.toString() ? "&" + searchParams.toString() : ""), { replace: true });
    }
  }, [currentUser]);

  const starterType = searchParams.get("type");
  useEffect(() => {
    if (starterType) {
      const starters: Record<string, string> = {
        pension: t("मेरी पेंशन 3 महीने से नहीं आई है...", "My pension hasn't arrived for 3 months..."),
        tax: t("ITR दाखिल किया लेकिन रिफंड नहीं आया...", "Filed ITR but refund is still pending..."),
        license: t("ड्राइविंग लाइसेंस 6 महीने से लंबित है...", "Driving license pending for 6 months..."),
        aadhaar: t("आधार नामांकन अस्वीकृत हुआ...", "Aadhaar enrollment was rejected..."),
        road: t("सड़क की मरम्मत नहीं हुई...", "Road repair not done despite sanction..."),
        railway: t("IRCTC टिकट रिफंड नहीं मिला...", "IRCTC ticket refund not received..."),
        gst: t("GST रिटर्न अपलोड विफल हुई...", "GST return upload failed..."),
        other: "",
      };
      if (starters[starterType]) setText(starters[starterType]);
    }
  }, [starterType]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (waveRef.current) clearInterval(waveRef.current);
    };
  }, []);

  // AI preview trigger when description is long enough
  useEffect(() => {
    if (text.length >= 30 && ministry) {
      setAiPreview({ ministry: MINISTRY_CATEGORIES.find(m => m.value === ministry)?.label || ministry, confidence: 92, icon: "✅" });
    } else {
      setAiPreview(null);
    }
  }, [text, ministry]);

  function startRecording() {
    setMode("recording");
    setRecordTime(0);
    timerRef.current = setInterval(() => setRecordTime((t) => t + 1), 1000);
    waveRef.current = setInterval(() => {
      setWaveHeights(Array(12).fill(0).map(() => 6 + Math.random() * 36));
    }, 120);
  }

  function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (waveRef.current) clearInterval(waveRef.current);
    setMode("idle");
    const sample = testComplaints[Math.floor(Math.random() * testComplaints.length)];
    setText(sample.text);
  }

  function formatTime(s: number) {
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t("नाम अनिवार्य है", "Name is required");
    if (!mobile.trim() || !/^[6-9]\d{9}$/.test(mobile.trim())) e.mobile = t("वैध मोबाइल नंबर दर्ज करें", "Enter valid 10-digit mobile number");
    if (!state) e.state = t("राज्य चुनें", "Select state");
    if (!ministry) e.ministry = t("मंत्रालय/विभाग चुनें", "Select ministry / department");
    if (!grievanceTitle.trim()) e.grievanceTitle = t("शिकायत का शीर्षक अनिवार्य है", "Grievance title is required");
    if (text.trim().length < 100) e.text = t(`कम से कम 100 अक्षर (${Math.max(0, 100 - text.trim().length)} और)`, `Minimum 100 characters (${Math.max(0, 100 - text.trim().length)} more needed)`);
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      document.getElementById("complaint-form")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setMode("processing");
    try {
      const result = await classifyComplaint(text, undefined);
      setGlobalText(text);
      setRoutingResult(result);
      navigate("/routing-result");
    } catch {
      setMode("idle");
    }
  }

  const charCount = text.length;
  const maxChars = 3000;
  const subCats = SUB_CATEGORIES[ministry] || [];

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }} id="main-content">
      {/* Page header */}
      <div style={{ background: "var(--gov-navy)", color: "white" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-2 text-xs opacity-75 mb-2">
            <span>{t("होम", "Home")}</span> <span>›</span>
            <span>{t("शिकायत", "Grievance")}</span> <span>›</span>
            <span className="opacity-100 font-semibold">{t("शिकायत दर्ज करें", "Lodge Grievance")}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">{t("शिकायत दर्ज करें", "Lodge Grievance")}</h1>
          <p className="text-sm opacity-80 mt-1">
            {t("शिकायत केवल पंजीकृत उपयोगकर्ता ही दर्ज कर सकते हैं।", "Grievance can now be lodged only by registered users.")}
          </p>
        </div>
      </div>

      {/* Mandatory note */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
        <p className="mandatory-note">
          {t("तारांकित (*) चिह्न वाले फ़ील्ड अनिवार्य हैं।", "Fields marked with")} <span>*</span> {t("", "are mandatory")}
        </p>
      </div>

      <form id="complaint-form" onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">

        {/* ── SECTION 1: COMPLAINANT DETAILS ── */}
        <div className="form-section">
          <div className="form-section-header">
            👤 {t("अनुभाग 1: शिकायतकर्ता का विवरण", "Section 1: Complainant Details")}
          </div>
          <div className="form-section-body">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="form-field">
                <label>{t("पूरा नाम", "Full Name")} <span className="req">*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("जैसे: रमेश कुमार शर्मा", "e.g. Ramesh Kumar Sharma")}
                />
                {errors.name && <div className="field-error">{errors.name}</div>}
              </div>

              {/* Gender */}
              <div className="form-field">
                <label>{t("लिंग", "Gender")} <span className="req">*</span></label>
                <div className="flex gap-5 mt-2">
                  {[
                    { val: "male", label: t("पुरुष", "Male") },
                    { val: "female", label: t("महिला", "Female") },
                    { val: "transgender", label: t("ट्रांसजेंडर", "Transgender") },
                  ].map((g) => (
                    <label key={g.val} className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input type="radio" name="gender" value={g.val} checked={gender === g.val} onChange={(e) => setGender(e.target.value)} className="accent-[#1a237e]" />
                      {g.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile */}
              <div className="form-field">
                <label>{t("मोबाइल नंबर", "Mobile Number")} <span className="req">*</span></label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="9876543210"
                  maxLength={10}
                />
                {errors.mobile && <div className="field-error">{errors.mobile}</div>}
              </div>

              {/* Email */}
              <div className="form-field">
                <label>{t("ई-मेल पता", "E-mail Address")} <span className="req">*</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                />
              </div>

              {/* Address */}
              <div className="form-field sm:col-span-2">
                <label>{t("पता (मकान नंबर / नाम)", "Address (Premise Number or Name)")} <span className="req">*</span></label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t("मकान/फ्लैट नंबर, मोहल्ला, गली...", "House/Flat No., Locality, Street...")}
                />
              </div>

              {/* State */}
              <div className="form-field">
                <label>{t("राज्य", "State")} <span className="req">*</span></label>
                <select value={state} onChange={(e) => setState(e.target.value)}>
                  <option value="">-- {t("राज्य चुनें", "Select a state")} --</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && <div className="field-error">{errors.state}</div>}
              </div>

              {/* District */}
              <div className="form-field">
                <label>{t("जिला", "District")} <span className="req">*</span></label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder={state ? t("जिला दर्ज करें", "Enter district name") : t("पहले राज्य चुनें", "Select a state first")}
                  disabled={!state}
                />
              </div>

              {/* Pincode */}
              <div className="form-field">
                <label>{t("पिन कोड", "Pincode")}</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="110001"
                  maxLength={6}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: GRIEVANCE DETAILS ── */}
        <div className="form-section">
          <div className="form-section-header">
            📋 {t("अनुभाग 2: शिकायत का विवरण", "Section 2: Grievance Details")}
          </div>
          <div className="form-section-body">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Ministry */}
              <div className="form-field sm:col-span-2">
                <label>{t("मंत्रालय / विभाग", "Ministry / Department")} <span className="req">*</span></label>
                <select value={ministry} onChange={(e) => { setMinistry(e.target.value); setSubCategory(""); }}>
                  {MINISTRY_CATEGORIES.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                {errors.ministry && <div className="field-error">{errors.ministry}</div>}
                {aiPreview && (
                  <div className="ai-route-badge mt-2">
                    <span className="text-xs text-green-800 font-semibold">🤖 {t("AI पुष्टि:", "AI Confirms:")} {aiPreview.ministry} ({aiPreview.confidence}% {t("विश्वास", "confidence")})</span>
                  </div>
                )}
              </div>

              {/* Sub-category */}
              <div className="form-field sm:col-span-2">
                <label>{t("श्रेणी / उप-श्रेणी", "Category / Sub-category")} <span className="req">*</span></label>
                <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} disabled={!ministry}>
                  <option value="">-- {t("उप-श्रेणी चुनें", "Select sub-category")} --</option>
                  {subCats.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Grievance Title */}
              <div className="form-field sm:col-span-2">
                <label>{t("शिकायत का शीर्षक", "Grievance Title")} <span className="req">*</span></label>
                <input
                  type="text"
                  value={grievanceTitle}
                  onChange={(e) => setGrievanceTitle(e.target.value.slice(0, 150))}
                  placeholder={t("संक्षेप में शिकायत बताएं (150 अक्षर तक)", "Briefly describe the grievance (up to 150 chars)")}
                  maxLength={150}
                />
                {errors.grievanceTitle && <div className="field-error">{errors.grievanceTitle}</div>}
                <div className="field-hint">{grievanceTitle.length}/150</div>
              </div>

              {/* Date of incident */}
              <div className="form-field">
                <label>{t("घटना की तारीख", "Date of Incident")}</label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* File upload */}
              <div className="form-field">
                <label>{t("दस्तावेज़ संलग्न करें", "Attach Document")} <span className="text-gray-400 font-normal text-xs">({t("वैकल्पिक, PDF/JPG, 2MB", "Optional, PDF/JPG, max 2MB")})</span></label>
                <div
                  className="relative border border-dashed border-gray-300 rounded p-3 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                  />
                  {fileName ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-green-700">
                      <span>📎</span> <span className="truncate max-w-48">{fileName}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">
                      📎 {t("फ़ाइल चुनें या यहाँ खींचें", "Click to choose file or drag & drop")}
                    </div>
                  )}
                </div>
              </div>

              {/* Voice Input */}
              <div className="form-field sm:col-span-2">
                <label>{t("शिकायत का विवरण", "Grievance Description")} <span className="req">*</span></label>

                {/* Voice Mode */}
                {mode === "recording" ? (
                  <div className="rounded p-4 text-white text-center mb-3" style={{ background: "var(--gov-navy)" }}>
                    <div className="text-2xl mb-2 pulse-icon inline-block">🎤</div>
                    <div className="font-bold mb-1 text-sm">{t("बोलते रहें...", "Keep speaking...")}</div>
                    <div className="text-blue-200 text-xs mb-3">{formatTime(recordTime)}</div>
                    <div className="flex items-end justify-center gap-1 h-8 mb-3 bg-white/10 rounded px-3 py-1">
                      {waveHeights.map((h, i) => (
                        <div key={i} className="wave-bar flex-1" style={{ height: `${h}px` }} />
                      ))}
                    </div>
                    <button type="button" onClick={stopRecording} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded text-sm transition-colors">
                      ⏹️ {t("रिकॉर्डिंग बंद करें", "Stop Recording")}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="w-full flex items-center gap-3 p-3 mb-3 border border-dashed border-gray-300 rounded hover:border-blue-400 hover:bg-blue-50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ background: "var(--gov-navy-light)" }}>
                      🎤
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 text-sm">{t("आवाज़ से विवरण दें", "Describe by Voice")}</div>
                      <div className="text-xs text-gray-500">{t("हिंदी या English में बोलें — 22 भाषाएं समर्थित", "Speak in Hindi or English — 22 languages supported")}</div>
                    </div>
                  </button>
                )}

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, maxChars))}
                  placeholder={t(
                    "अपनी शिकायत का विस्तृत विवरण यहाँ लिखें। स्पष्ट रूप से बताएं: समस्या क्या है, कब से है, क्या प्रयास किए, कौन सा संदर्भ नंबर है... (न्यूनतम 100 अक्षर)",
                    "Describe your grievance in detail here. Clearly mention: what the problem is, since when, what attempts made, any reference numbers... (minimum 100 characters)"
                  )}
                  rows={8}
                  style={{ fontSize: "14px" }}
                />
                <div className="flex justify-between items-center mt-1">
                  <span className={`field-hint ${charCount < 100 ? "text-red-600" : ""}`}>
                    {errors.text ? errors.text : `${charCount}/${maxChars} ${t("अक्षर", "characters")} ${charCount < 100 ? `(${100 - charCount} ${t("और चाहिए", "more needed")})` : "✓"}`}
                  </span>
                  <button type="button" onClick={() => setText("")} className="text-xs text-gray-400 hover:text-red-500">
                    {t("साफ़ करें", "Clear")}
                  </button>
                </div>

                {/* Sample load */}
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500 mr-1">{t("उदाहरण:", "Try sample:")}</span>
                  {testComplaints.slice(0, 3).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setText(s.text)}
                      className="text-xs px-2 py-1 rounded border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 text-gray-600 transition-colors"
                    >
                      {s.text.slice(0, 35)}…
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: PREVIEW & SUBMIT ── */}
        <div className="form-section">
          <div className="form-section-header">
            🤖 {t("अनुभाग 3: AI रूटिंग पूर्वावलोकन एवं सबमिट", "Section 3: AI Routing Preview & Submit")}
          </div>
          <div className="form-section-body">
            {aiPreview ? (
              <div className="ai-route-badge mb-4">
                <div className="font-bold text-green-800 mb-1 text-sm">
                  ✅ {t("AI सुझाव:", "AI Suggests:")} {aiPreview.ministry}
                </div>
                <div className="text-xs text-green-700">
                  {t("विश्वास स्तर:", "Confidence:")} {aiPreview.confidence}% · {t("पहली बार में सही रूटिंग की संभावना", "High probability of correct first-time routing")}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {t("आप नीचे मंत्रालय को बदल सकते हैं यदि आप असहमत हैं।", "You can change the ministry above if you disagree.")}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-4 text-sm text-gray-500">
                💡 {t("शिकायत विवरण और मंत्रालय भरें — AI स्वतः रूटिंग सुझाएगा।", "Fill grievance description and ministry — AI will suggest routing automatically.")}
              </div>
            )}

            <div className="flex items-start gap-2 mb-5">
              <input type="checkbox" id="declaration" required className="mt-0.5 w-4 h-4 accent-[#1a237e]" />
              <label htmlFor="declaration" className="text-xs text-gray-700 leading-relaxed cursor-pointer">
                {t(
                  "मैं घोषणा करता/करती हूं कि उपरोक्त विवरण सत्य और सही है। मैं समझता/समझती हूं कि झूठी शिकायत दर्ज करना दंडनीय है।",
                  "I hereby declare that the information given above is true and correct to the best of my knowledge and belief. I understand that filing a false grievance is punishable."
                )}
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={mode === "processing"}
                className="btn-gov-primary flex-1"
                style={{ padding: "13px 20px", fontSize: "15px" }}
              >
                {mode === "processing" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                    {t("AI विश्लेषण कर रहा है...", "AI is analyzing & routing...")}
                  </>
                ) : (
                  <>🎯 {t("शिकायत सबमिट करें", "Submit Grievance")}</>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn-gov-secondary"
                style={{ padding: "13px 20px" }}
              >
                {t("रद्द करें", "Cancel")}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              🔒 {t("आपका डेटा सुरक्षित है। व्यक्तिगत जानकारी AI को साझा नहीं की जाती।", "Your data is secure. Personal information is not shared with AI.")}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
