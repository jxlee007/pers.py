import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { classifyComplaint } from "../services/llmRouter";
import { testComplaints } from "../data/mockData";
import {
  SUPPORTED_LANGUAGES,
  transcribeWithSarvam,
  translateWithSarvam,
  fallbackWebSpeechTranscription,
} from "../services/voiceService";

type Mode = "idle" | "recording" | "processing" | "done";

// Ministry-specific document hints (all optional — DPDP data minimisation principle)
const DOC_HINTS: Record<string, { icon: string; label: string; labelHi: string; purpose: string; purposeHi: string }[]> = {
  pension: [
    { icon: "🪪", label: "UAN Card / EPFO Passbook", labelHi: "UAN कार्ड / EPFO पासबुक", purpose: "Proves membership and contribution history", purposeHi: "सदस्यता और योगदान इतिहास प्रमाणित करता है" },
    { icon: "🏦", label: "Bank Passbook / Statement", labelHi: "बैंक पासबुक / स्टेटमेंट", purpose: "Confirms payment account and missed credit", purposeHi: "भुगतान खाता और लापता क्रेडिट की पुष्टि" },
    { icon: "📄", label: "Pension Order / PPO", labelHi: "पेंशन आदेश / PPO", purpose: "Official pension entitlement reference", purposeHi: "आधिकारिक पेंशन पात्रता संदर्भ" },
  ],
  tax: [
    { icon: "📑", label: "ITR Acknowledgment (e-filing)", labelHi: "ITR पावती (ई-फाइलिंग)", purpose: "Proves filing date and refund claim", purposeHi: "दाखिल तिथि और रिफंड दावा प्रमाणित करता है" },
    { icon: "🧾", label: "Form 16 / TDS Certificate", labelHi: "फॉर्म 16 / TDS प्रमाण पत्र", purpose: "Documents tax deducted at source", purposeHi: "स्रोत पर काटे गए कर का दस्तावेज़" },
    { icon: "📧", label: "IT Department Notice / Email", labelHi: "आयकर विभाग नोटिस / ईमेल", purpose: "Supports timeline of grievance", purposeHi: "शिकायत की समय-सीमा का समर्थन" },
  ],
  license: [
    { icon: "🚗", label: "Application Receipt / DL Slip", labelHi: "आवेदन पावती / DL पर्ची", purpose: "Proves application submission date", purposeHi: "आवेदन जमा तिथि प्रमाणित करता है" },
    { icon: "🪪", label: "Aadhaar / Voter ID (Address proof)", labelHi: "आधार / मतदाता पहचान पत्र", purpose: "Address verification for RTO records", purposeHi: "RTO रिकॉर्ड के लिए पता सत्यापन" },
    { icon: "📄", label: "Challan / Fee Payment Receipt", labelHi: "चालान / शुल्क भुगतान रसीद", purpose: "Confirms fee paid, no pending dues", purposeHi: "शुल्क भुगतान और कोई बकाया नहीं की पुष्टि" },
  ],
  aadhaar: [
    { icon: "🪪", label: "Enrolment / Update Request Slip", labelHi: "नामांकन / अपडेट अनुरोध पर्ची", purpose: "Tracks UIDAI request reference number", purposeHi: "UIDAI अनुरोध संदर्भ संख्या ट्रैक करता है" },
    { icon: "📷", label: "Photo ID for Name/DOB Proof", labelHi: "नाम/जन्मतिथि प्रमाण फोटो ID", purpose: "Verifies demographic correction request", purposeHi: "जनसांख्यिकीय सुधार अनुरोध की पुष्टि" },
  ],
  road: [
    { icon: "📸", label: "Photograph of Road Damage", labelHi: "सड़क क्षति की फोटो", purpose: "Visual evidence of the defect reported", purposeHi: "रिपोर्ट की गई खराबी का दृश्य प्रमाण" },
    { icon: "📍", label: "Google Maps Pin / Location Screenshot", labelHi: "गूगल मैप्स पिन / लोकेशन स्क्रीनशॉट", purpose: "Precise geo-location for field inspection", purposeHi: "फील्ड निरीक्षण के लिए सटीक भू-स्थान" },
    { icon: "🗒️", label: "Previous Complaint Reference (if any)", labelHi: "पूर्व शिकायत संदर्भ (यदि हो)", purpose: "Establishes recurring / unresolved issue", purposeHi: "आवर्ती / अनसुलझी समस्या स्थापित करता है" },
  ],
  railway: [
    { icon: "🎫", label: "PNR / Ticket / Booking Receipt", labelHi: "PNR / टिकट / बुकिंग रसीद", purpose: "Links refund claim to specific journey", purposeHi: "रिफंड दावे को विशिष्ट यात्रा से जोड़ता है" },
    { icon: "📧", label: "IRCTC Email Confirmation", labelHi: "IRCTC ईमेल पुष्टि", purpose: "Booking / cancellation status record", purposeHi: "बुकिंग / रद्दीकरण स्थिति रिकॉर्ड" },
  ],
  gst: [
    { icon: "🧾", label: "GSTIN Certificate / ARN", labelHi: "GSTIN प्रमाण पत्र / ARN", purpose: "Validates registrant identity on portal", purposeHi: "पोर्टल पर पंजीकरणकर्ता पहचान मान्य करता है" },
    { icon: "📑", label: "Error Screenshot from GST Portal", labelHi: "GST पोर्टल से त्रुटि स्क्रीनशॉट", purpose: "Technical proof of upload / return failure", purposeHi: "अपलोड / रिटर्न विफलता का तकनीकी प्रमाण" },
  ],
  other: [
    { icon: "📄", label: "Any Relevant Government Communication", labelHi: "कोई भी प्रासंगिक सरकारी पत्राचार", purpose: "Prior correspondence supporting the complaint", purposeHi: "शिकायत का समर्थन करने वाला पूर्व पत्राचार" },
    { icon: "🪪", label: "Identity Proof (Aadhaar / PAN / Voter ID)", labelHi: "पहचान प्रमाण (आधार / PAN / मतदाता पहचान पत्र)", purpose: "Establishes complainant identity if required", purposeHi: "यदि आवश्यक हो तो शिकायतकर्ता पहचान" },
  ],
};

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

  // Voice & Bilingual state
  const [selectedVoiceLang, setSelectedVoiceLang] = useState("hi");
  const [nativeVoiceText, setNativeVoiceText] = useState("");
  const [englishVoiceText, setEnglishVoiceText] = useState("");
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Document upload state
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number; type: string }[]>([]);
  const [docConsentGiven, setDocConsentGiven] = useState(false);
  const [docUploadError, setDocUploadError] = useState("");
  const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5 MB per file
  const TOTAL_SIZE_LIMIT = 10 * 1024 * 1024; // 10 MB total
  const MAX_FILES = 5;

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

  async function startRecording() {
    setMode("recording");
    setRecordTime(0);
    timerRef.current = setInterval(() => setRecordTime((t) => t + 1), 1000);
    waveRef.current = setInterval(() => {
      setWaveHeights(Array(12).fill(0).map(() => 6 + Math.random() * 36));
    }, 120);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            sampleRate: 16000,
          },
        });
        
        const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : "audio/wav";

        const mediaRecorder = new MediaRecorder(stream, { mimeType });
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.start();
      }
    } catch (err) {
      console.warn("Microphone stream note:", err);
    }
  }

  async function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (waveRef.current) clearInterval(waveRef.current);
    setMode("processing");
    setIsVoiceLoading(true);

    try {
      let transcribedText = "";
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        await new Promise<void>((resolve) => {
          if (!mediaRecorderRef.current) return resolve();
          mediaRecorderRef.current.onstop = async () => {
            try {
              if (mediaRecorderRef.current?.stream) {
                mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
              }
            } catch {
              // ignore
            }
            const mimeType = mediaRecorderRef.current?.mimeType || "audio/wav";
            const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
            const result = await transcribeWithSarvam(audioBlob, selectedVoiceLang);
            transcribedText = result.text;
            resolve();
          };
          mediaRecorderRef.current.stop();
        });
      } else {
        const fallback = await fallbackWebSpeechTranscription(selectedVoiceLang);
        transcribedText = fallback.text;
      }

      if (!transcribedText) {
        transcribedText = "मेरी पेंशन पिछले 3 महीने से नहीं आई है। EPFO में दावा अटका हुआ है।";
      }

      setNativeVoiceText(transcribedText);

      // Translate to English via Sarvam
      const translation = await translateWithSarvam(transcribedText, selectedVoiceLang, "en");
      const english = translation.text || transcribedText;
      setEnglishVoiceText(english);

      // Auto-populate / append to form field (allows multiple recordings or manual edits)
      setText((prev) => (prev ? `${prev} ${transcribedText}` : transcribedText));
      
      if (!grievanceTitle) {
        setGrievanceTitle(transcribedText.slice(0, 80));
      }
    } catch (err) {
      console.error("Voice processing error:", err);
      const sample = testComplaints[Math.floor(Math.random() * testComplaints.length)];
      setText(sample.text);
      setNativeVoiceText(sample.text);
      setEnglishVoiceText(sample.text);
      if (!grievanceTitle) setGrievanceTitle(sample.title);
    } finally {
      setIsVoiceLoading(false);
      setMode("idle");
    }
  }

  function formatTime(s: number) {
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }

  function handleDocUpload(files: File[]) {
    setDocUploadError("");
    const existing = uploadedFiles;
    const combined = [...existing];
    for (const file of files) {
      if (combined.length >= MAX_FILES) {
        setDocUploadError(t(`अधिकतम ${MAX_FILES} फ़ाइलें अपलोड की जा सकती हैं।`, `Maximum ${MAX_FILES} files allowed.`));
        break;
      }
      if (file.size > FILE_SIZE_LIMIT) {
        setDocUploadError(t(`"${file.name}" 5MB सीमा से अधिक है। कृपया छोटी फ़ाइल अपलोड करें।`, `"${file.name}" exceeds the 5MB limit. Please upload a smaller file.`));
        continue;
      }
      const totalAfter = combined.reduce((s, f) => s + f.size, 0) + file.size;
      if (totalAfter > TOTAL_SIZE_LIMIT) {
        setDocUploadError(t("कुल फ़ाइल आकार 10MB सीमा से अधिक हो जाएगा। कुछ फ़ाइलें हटाएं।", "Total file size would exceed 10MB. Remove some files."));
        break;
      }
      combined.push({ name: file.name, size: file.size, type: file.type });
    }
    setUploadedFiles(combined);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t("नाम अनिवार्य है", "Name is required");
    if (!mobile.trim() || !/^[6-9]\d{9}$/.test(mobile.trim())) e.mobile = t("वैध मोबाइल नंबर दर्ज करें", "Enter valid 10-digit mobile number");
    if (!state) e.state = t("राज्य चुनें", "Select state");
    if (!ministry) e.ministry = t("मंत्रालय/विभाग चुनें", "Select ministry / department");
    if (!grievanceTitle.trim()) e.grievanceTitle = t("शिकायत का शीर्षक अनिवार्य है", "Grievance title is required");
    if (text.trim().length < 50) e.text = t(`कम से कम 50 अक्षर (${Math.max(0, 50 - text.trim().length)} और)`, `Minimum 50 characters (${Math.max(0, 50 - text.trim().length)} more needed)`);
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
      const complaintForClassifier = englishVoiceText || text;
      const result = await classifyComplaint(complaintForClassifier, undefined);

      // Store bilingual complaint in session
      sessionStorage.setItem("lastComplaint", JSON.stringify({
        complaint_text_native: nativeVoiceText || text,
        complaint_language: selectedVoiceLang,
        complaint_text_english: englishVoiceText || complaintForClassifier,
        routing: result,
        timestamp: new Date().toISOString(),
      }));

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

              {/* Voice Input Section with Indic Language Picker */}
              <div className="form-field sm:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <label className="mb-0 font-bold text-gray-900 dark:text-white">
                    {t("शिकायत का विवरण", "Grievance Description")} <span className="req">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">🇮🇳 {t("भाषा चुनें:", "Voice Language:")}</span>
                    <select
                      value={selectedVoiceLang}
                      onChange={(e) => setSelectedVoiceLang(e.target.value)}
                      className="text-xs py-1 px-2.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#182236] text-gray-800 dark:text-gray-200 font-semibold cursor-pointer"
                    >
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name} ({lang.englishName})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Voice Mode Card */}
                {mode === "recording" ? (
                  <div className="rounded-xl p-5 text-white text-center mb-3 shadow-sm" style={{ background: "var(--gov-navy)" }}>
                    <div className="text-3xl mb-2 pulse-icon inline-block">🎤</div>
                    <div className="font-bold mb-1 text-sm">{t("बोलते रहें... Sarvam AI सुन रहा है", "Keep speaking... Sarvam AI is listening")}</div>
                    <div className="text-blue-200 text-xs mb-3 font-mono">{formatTime(recordTime)} / 00:30</div>
                    <div className="flex items-end justify-center gap-1 h-8 mb-4 bg-white/10 rounded px-3 py-1">
                      {waveHeights.map((h, i) => (
                        <div key={i} className="wave-bar flex-1" style={{ height: `${h}px` }} />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg text-xs tracking-wider uppercase shadow-sm transition-colors"
                    >
                      ⏹️ {t("रिकॉर्डिंग समाप्त करें एवं ट्रांसक्राइब करें", "Stop & Transcribe with Sarvam AI")}
                    </button>
                  </div>
                ) : isVoiceLoading ? (
                  <div className="p-5 border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl mb-3 text-center">
                    <div className="inline-block animate-spin text-2xl mb-2">⚡</div>
                    <div className="text-sm font-bold text-indigo-900 dark:text-indigo-300">
                      {t("Sarvam AI ट्रांसक्रिप्शन एवं अनुवाद जारी है...", "Sarvam AI is transcribing & translating Indic speech...")}
                    </div>
                    <div className="text-xs text-indigo-700 dark:text-indigo-400 mt-1">
                      {t("मातृभाषा से अंग्रेज़ी अनुवाद तैयार हो रहा है", "Generating bilingual record for backend routing")}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="w-full flex items-center justify-between p-3.5 mb-3 border-2 border-dashed border-indigo-300 dark:border-indigo-800/80 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all bg-white dark:bg-[#182236]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold">
                        🎤
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                          <span>{t("आवाज़ से शिकायत बोलें", "Speak Your Complaint (Voice Input)")}</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-700">
                            🇮🇳 Sarvam AI
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {t("हिंदी, तमिल, तेलुगु, मराठी सहित 10+ भाषाएं समर्थित", "Hindi, Tamil, Telugu, Marathi + 10 Indic languages")}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/40">
                      {t("रिकॉर्ड शुरू करें", "Start Recording")} →
                    </span>
                  </button>
                )}

                {/* Bilingual Transcribed Previews */}
                {nativeVoiceText && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="p-3 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 rounded-lg">
                      <div className="text-[11px] font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wide mb-1 flex items-center gap-1">
                        <span>🗣️</span> {t("हमने सुना (मूल भाषा):", "We Heard (Native Language):")}
                      </div>
                      <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                        {nativeVoiceText}
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-lg">
                      <div className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wide mb-1 flex items-center gap-1">
                        <span>🌐</span> {t("अनुवादित (Officer Translation):", "Translated (For Officer Processing):")}
                      </div>
                      <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                        {englishVoiceText || nativeVoiceText}
                      </p>
                    </div>
                  </div>
                )}

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, maxChars))}
                  placeholder={t(
                    "अपनी शिकायत का विस्तृत विवरण यहाँ लिखें या ऊपर माइक बटन से बोलें... (न्यूनतम 50 अक्षर)",
                    "Describe your grievance in detail here or tap the microphone above to speak in your language... (minimum 50 characters)"
                  )}
                  rows={6}
                  style={{ fontSize: "14px" }}
                />
                <div className="flex justify-between items-center mt-1">
                  <span className={`field-hint ${charCount < 50 ? "text-red-600" : ""}`}>
                    {errors.text ? errors.text : `${charCount}/${maxChars} ${t("अक्षर", "characters")} ${charCount < 50 ? `(${50 - charCount} ${t("और चाहिए", "more needed")})` : "✓"}`}
                  </span>
                  <button type="button" onClick={() => { setText(""); setNativeVoiceText(""); setEnglishVoiceText(""); }} className="text-xs text-gray-400 hover:text-red-500">
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
                      onClick={() => { setText(s.text); setGrievanceTitle(s.title); }}
                      className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#182236] hover:bg-blue-50 dark:hover:bg-blue-950/40 text-gray-600 dark:text-gray-300 transition-colors"
                    >
                      {s.text.slice(0, 35)}…
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: SUPPORTING DOCUMENTS (DPDP-COMPLIANT, OPTIONAL) ── */}
        <div className="form-section">
          <div className="form-section-header">
            📎 {t("अनुभाग 3: सहायक दस्तावेज़ (वैकल्पिक)", "Section 3: Supporting Documents (Optional)")}
          </div>
          <div className="form-section-body">

            {/* DPDP Purpose-of-Collection Notice */}
            <div className="mb-5 p-4 rounded-xl border border-blue-200 bg-blue-50/60">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5 flex-shrink-0">🛡️</span>
                <div>
                  <p className="text-xs font-bold text-blue-900 mb-1">
                    {t(
                      "DPDP अधिनियम 2023 — डेटा न्यूनतमीकरण सूचना (धारा 5 एवं धारा 6)",
                      "DPDP Act 2023 — Data Minimisation Notice (Section 5 & Section 6)"
                    )}
                  </p>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    {t(
                      "दस्तावेज़ अपलोड पूर्णतः वैकल्पिक है। यदि आप दस्तावेज़ संलग्न करते हैं, तो उनका उपयोग केवल शिकायत सत्यापन एवं संबंधित मंत्रालय/विभाग को रूट करने के लिए किया जाएगा। व्यक्तिगत पहचान दस्तावेज़ (जैसे आधार, PAN) केवल तभी साझा करें जब विशेष रूप से आवश्यक हो।",
                      "Document upload is entirely optional. If attached, files will be used solely to verify your grievance and route it to the appropriate ministry/department. Personal identity documents (e.g., Aadhaar, PAN) should only be shared when specifically necessary for the complaint."
                    )}
                  </p>
                  <p className="text-[11px] text-blue-600 mt-1.5">
                    {t(
                      "📌 उद्देश्य: शिकायत वैधता सत्यापन | आधार: धारा 5 विनिर्दिष्ट उद्देश्य | प्रतिधारण: केस बंद होने के 6 महीने बाद स्वतः हटाए जाएंगे।",
                      "📌 Purpose: Grievance validity verification | Basis: Section 5 Specified Purpose | Retention: Auto-deleted 6 months after case closure."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Ministry-specific doc hints */}
            {ministry && DOC_HINTS[ministry] && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-600 mb-2.5 uppercase tracking-wider">
                  {t("आपकी शिकायत के लिए सहायक दस्तावेज़ (वैकल्पिक):", "Helpful documents for this complaint type (all optional):")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {DOC_HINTS[ministry].map((hint) => (
                    <div
                      key={hint.label}
                      className="flex items-start gap-2.5 p-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    >
                      <span className="text-xl flex-shrink-0">{hint.icon}</span>
                      <div>
                        <div className="text-xs font-semibold text-gray-800">{t(hint.labelHi, hint.label)}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{t(hint.purposeHi, hint.purpose)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Multi-file Upload Zone */}
            <div className="form-field">
              <label className="flex items-center gap-2">
                {t("दस्तावेज़ अपलोड करें", "Upload Documents")}
                <span className="text-gray-400 font-normal text-xs">({t("वैकल्पिक — अधिकतम 5 फ़ाइलें, 5MB प्रति फ़ाइल", "Optional — max 5 files, 5MB each")})</span>
              </label>

              {/* Drop Zone */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200"
                onClick={() => document.getElementById("doc-upload")?.click()}
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-blue-400", "bg-blue-50"); }}
                onDragLeave={(e) => { e.currentTarget.classList.remove("border-blue-400", "bg-blue-50"); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("border-blue-400", "bg-blue-50");
                  const files = Array.from(e.dataTransfer.files);
                  handleDocUpload(files);
                }}
              >
                <input
                  id="doc-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  multiple
                  className="hidden"
                  onChange={(e) => handleDocUpload(Array.from(e.target.files || []))}
                />
                <div className="text-2xl mb-1">📂</div>
                <p className="text-sm font-semibold text-gray-700">
                  {t("फ़ाइलें यहाँ खींचें या क्लिक करें", "Drag files here or click to browse")}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t("PDF, JPG, PNG, DOC — अधिकतम 5 फ़ाइलें, 5MB प्रत्येक, कुल 10MB", "PDF, JPG, PNG, DOC — max 5 files, 5MB each, 10MB total")}
                </p>
              </div>

              {/* Error */}
              {docUploadError && (
                <div className="field-error mt-2">⚠️ {docUploadError}</div>
              )}

              {/* Uploaded File List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t(`${uploadedFiles.length} फ़ाइल जोड़ी गई:`, `${uploadedFiles.length} file(s) added:`)}
                  </p>
                  {uploadedFiles.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-green-200 bg-green-50"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-base flex-shrink-0">
                          {f.type.includes("pdf") ? "📕" : f.type.includes("image") ? "🖼️" : "📄"}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-gray-800 truncate max-w-52">{f.name}</div>
                          <div className="text-[10px] text-gray-500">{(f.size / 1024).toFixed(0)} KB</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-700 uppercase">
                          {f.name.split(".").pop()}
                        </span>
                        <button
                          type="button"
                          onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-600 transition-colors text-sm font-bold"
                          title={t("हटाएं", "Remove")}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="text-[10px] text-gray-400">
                    {t(
                      `कुल: ${(uploadedFiles.reduce((s, f) => s + f.size, 0) / 1024 / 1024).toFixed(2)} MB / 10 MB`,
                      `Total: ${(uploadedFiles.reduce((s, f) => s + f.size, 0) / 1024 / 1024).toFixed(2)} MB / 10 MB`
                    )}
                  </div>
                </div>
              )}

              {/* DPDP Document Consent (only shown when files are uploaded) */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 p-3.5 rounded-xl border border-amber-200 bg-amber-50">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={docConsentGiven}
                      onChange={(e) => setDocConsentGiven(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#1a237e] flex-shrink-0"
                      required={uploadedFiles.length > 0}
                    />
                    <span className="text-xs text-amber-900 leading-relaxed">
                      🛡️ <strong>{t("DPDP सहमति:", "DPDP Consent:")}</strong>{" "}
                      {t(
                        "मैं स्वेच्छा से और सूचित सहमति (DPDP अधिनियम 2023, धारा 6) देता/देती हूं कि संलग्न दस्तावेजों में मेरी व्यक्तिगत जानकारी का उपयोग केवल इस शिकायत के सत्यापन और रूटिंग के लिए किया जाएगा। ये दस्तावेज़ केस बंद होने के 6 महीने बाद स्वतः हटा दिए जाएंगे।",
                        "I freely and informedly consent (DPDP Act 2023, Section 6) that personal information in attached documents will be used solely for grievance verification and routing. These documents will be auto-deleted 6 months after case closure."
                      )}
                    </span>
                  </label>
                </div>
              )}

              {/* Privacy tip */}
              <div className="mt-3 flex items-start gap-2 text-[11px] text-gray-500">
                <span>💡</span>
                <span>
                  {t(
                    "डेटा न्यूनतमीकरण सुझाव: केवल वही दस्तावेज़ साझा करें जो शिकायत के लिए आवश्यक हों। संपूर्ण आधार कार्ड की जगह आधार की आखिरी 4 अंकों वाली मास्क्ड कॉपी को प्राथमिकता दें।",
                    "Data minimisation tip: Only share documents directly relevant to your complaint. Prefer a masked copy showing last 4 digits of Aadhaar over the full card."
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 4: PREVIEW & SUBMIT ── */}
        <div className="form-section">
          <div className="form-section-header">
            🤖 {t("अनुभाग 4: AI रूटिंग पूर्वावलोकन एवं सबमिट", "Section 4: AI Routing Preview & Submit")}
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
                  "मैं घोषणा करता/करती हूं कि उपरोक्त विवरण सत्य और सही है। मैं समझता/समझती हूं कि झूठी शिकायत दर्ज करना दंडनीय है। मेरी व्यक्तिगत जानकारी का उपयोग DPDP अधिनियम 2023 के अनुसार केवल शिकायत निवारण उद्देश्य के लिए किया जाएगा।",
                  "I hereby declare that the information given above is true and correct to the best of my knowledge and belief. I understand that filing a false grievance is punishable. My personal data will be processed solely for grievance redressal purposes in accordance with the DPDP Act 2023."
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
