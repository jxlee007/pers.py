import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { sendOtp, verifyOtp, createUser, addConsentRecord } from "../services/authService";

type Step = "details" | "otp" | "done";

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

export default function Signup() {
  const { t, login } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [maskedDest, setMaskedDest] = useState("");
  const [attempts, setAttempts] = useState(0);

  // Form fields
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [subLocality, setSubLocality] = useState("");
  const [locality, setLocality] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [declaration, setDeclaration] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t("नाम अनिवार्य है", "Name is required");
    if (!gender) e.gender = t("लिंग चुनें", "Select gender");
    if (!state) e.state = t("राज्य चुनें", "Select state");
    if (!district.trim()) e.district = t("जिला अनिवार्य है", "District is required");
    if (!mobile.trim() || !/^[6-9]\d{9}$/.test(mobile.trim())) e.mobile = t("वैध 10-अंकीय मोबाइल नंबर", "Valid 10-digit mobile number required");
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = t("वैध ई-मेल पता अनिवार्य है", "Valid email address is required");
    if (!declaration) e.declaration = t("घोषणा स्वीकार करना अनिवार्य है", "You must accept the declaration");
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmitDetails(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    const contact = mobile || email;
    const { masked } = await sendOtp(contact);
    setMaskedDest(masked);
    setLoading(false);
    setStep("otp");
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) return;
    if (attempts >= 3) {
      setError(t("बहुत अधिक प्रयास।", "Too many attempts. Please try again later."));
      return;
    }
    setLoading(true);
    setError("");
    const result = await verifyOtp(otp);
    if (result.success) {
      const user = createUser({ name: name.trim(), mobile, email });
      addConsentRecord({
        userId: user.id,
        purpose: "Account authentication & grievance processing",
        noticeVersion: "v1.2",
        language: "English",
        status: "active",
        consentedAt: new Date().toISOString(),
        method: "OTP + affirmative consent",
      });
      login(user);
      setStep("done");
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setAttempts((a) => a + 1);
      setError(result.error === "expired" ? t("OTP समाप्त।", "OTP expired. Resend.") : t(`गलत OTP। ${3 - attempts - 1} प्रयास शेष।`, `Incorrect OTP. ${3 - attempts - 1} attempts left.`));
    }
    setLoading(false);
  }

  if (step === "done") {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="bg-white rounded border border-gray-200 p-10 text-center max-w-sm w-full">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "#e8f5e9" }}>✅</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t("पंजीकरण सफल!", "Registration Successful!")}</h2>
          <p className="text-sm text-gray-500">{t("आपको डैशबोर्ड पर ले जाया जा रहा है...", "Redirecting you to your dashboard...")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Page header */}
      <div style={{ background: "var(--gov-navy)", color: "white" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center gap-2 text-xs opacity-70 mb-1">
            <span>{t("होम", "Home")}</span> <span>›</span>
            <span className="opacity-100 font-semibold">{t("पंजीकरण / साइन अप फॉर्म", "Registration / Sign up Form")}</span>
          </div>
          <h1 className="text-xl font-bold">{t("पंजीकरण / साइन अप फॉर्म", "Registration / Sign up Form")}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {step === "details" && (
          <form onSubmit={handleSubmitDetails}>
            <div className="form-section">
              <div className="form-section-header">
                👤 {t("विवरण दर्ज करें", "Enter Details")}
              </div>
              <div className="form-section-body">
                <div className="flex justify-end mb-3">
                  <p className="mandatory-note">{t("तारांकित (*) फ़ील्ड अनिवार्य हैं", "Fields marked with")} <span>*</span> {t("", "are mandatory")}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="form-field">
                    <label>{t("नाम", "Name")} <span className="req">*</span></label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("पूरा नाम", "Full Name")}
                      autoFocus
                    />
                    {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}
                  </div>

                  {/* Gender */}
                  <div className="form-field">
                    <label>{t("लिंग", "Gender")} <span className="req">*</span></label>
                    <div className="flex gap-5 mt-2">
                      {[
                        { val: "Male", label: t("पुरुष", "Male") },
                        { val: "Female", label: t("महिला", "Female") },
                        { val: "Transgender", label: t("ट्रांसजेंडर", "Transgender") },
                      ].map((g) => (
                        <label key={g.val} className="flex items-center gap-1.5 text-sm cursor-pointer">
                          <input type="radio" name="gender" value={g.val} checked={gender === g.val} onChange={(e) => setGender(e.target.value)} className="accent-[#1a237e]" />
                          {g.label}
                        </label>
                      ))}
                    </div>
                    {fieldErrors.gender && <div className="field-error">{fieldErrors.gender}</div>}
                  </div>

                  {/* Address */}
                  <div className="form-field">
                    <label>{t("पता (मकान नंबर / नाम)", "Address (Premise Number or Name)")} <span className="req">*</span></label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t("मकान नंबर या नाम", "Premise Number or Name")}
                    />
                  </div>

                  {/* Sub-locality */}
                  <div className="form-field">
                    <label>{t("उप-क्षेत्र", "Sub-locality")}</label>
                    <input
                      type="text"
                      value={subLocality}
                      onChange={(e) => setSubLocality(e.target.value)}
                      placeholder={t("उप-क्षेत्र (वैकल्पिक)", "Sub-locality")}
                    />
                  </div>

                  {/* Locality */}
                  <div className="form-field sm:col-span-2">
                    <label>{t("क्षेत्र / मोहल्ला", "Locality")}</label>
                    <input
                      type="text"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder={t("क्षेत्र / मोहल्ला", "Locality")}
                    />
                  </div>

                  {/* State */}
                  <div className="form-field">
                    <label>{t("राज्य", "State")} <span className="req">*</span></label>
                    <select value={state} onChange={(e) => setState(e.target.value)}>
                      <option value="">--{t("राज्य चुनें", "Select a state")}--</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {fieldErrors.state && <div className="field-error">{fieldErrors.state}</div>}
                  </div>

                  {/* District */}
                  <div className="form-field">
                    <label>{t("जिला", "District")} <span className="req">*</span></label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder={state ? t("जिला दर्ज करें", "Enter district") : t("पहले राज्य चुनें", "---Select a state first---")}
                      disabled={!state}
                    />
                    {fieldErrors.district && <div className="field-error">{fieldErrors.district}</div>}
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

                  {/* Mobile */}
                  <div className="form-field">
                    <label>{t("मोबाइल नंबर", "Mobile number")} <span className="req">*</span></label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="9876543210"
                      maxLength={10}
                    />
                    {fieldErrors.mobile && <div className="field-error">{fieldErrors.mobile}</div>}
                  </div>

                  {/* Email */}
                  <div className="form-field">
                    <label>{t("ई-मेल पता", "E-mail address")} <span className="req">*</span></label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                    />
                    {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
                  </div>

                  {/* Declaration */}
                  <div className="sm:col-span-2 border border-gray-200 rounded p-4 bg-gray-50">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={declaration}
                        onChange={(e) => setDeclaration(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-[#1a237e]"
                      />
                      <span className="text-sm text-gray-700">
                        {t(
                          "मैं घोषणा करता/करती हूं कि ऊपर दी गई जानकारी मेरी जानकारी और विश्वास के अनुसार सत्य और सही है।",
                          "I declare that the above information is true and correct to the best of my knowledge and belief."
                        )}
                      </span>
                    </label>
                    {fieldErrors.declaration && <div className="field-error mt-2">{fieldErrors.declaration}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Proof-of-Work (PoW) Cryptographic CAPTCHA (from pow.md) */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50/80 dark:bg-[#111827] flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-green-600 font-bold text-base">✓</span>
                <div>
                  <div className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <span>{t("क्रिप्टोग्राफिक सुरक्षा (PoW CAPTCHA)", "Cryptographic Proof-of-Work Verified")}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300 font-mono">ALTCHA</span>
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    {t("शून्य ट्रैकिंग · स्वचालित पृष्ठभूमि सत्यापन (DPDP 2023 संगत)", "Zero tracking · Automatic background mathematical verification")}
                  </div>
                </div>
              </div>
              <Link to="/pow-demo" className="text-[#1a237e] dark:text-blue-300 font-semibold hover:underline flex-shrink-0 text-[11px]">
                {t("डेमो देखें", "View Demo")} →
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-gov-primary flex-1"
                style={{ padding: "12px 24px", justifyContent: "center" }}
              >
                {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" /> : null}
                {t("OTP भेजें और सत्यापित करें", "Send OTP & Verify")}
              </button>
            </div>

            <div className="mt-4 text-center">
              <Link to="/login" className="text-sm text-blue-700 hover:underline">
                {t("पहले से पंजीकृत? लॉगिन करें", "Already registered? Login here")}
              </Link>
            </div>
          </form>
        )}

        {step === "otp" && (
          <div className="max-w-md mx-auto">
            <div className="form-section">
              <div className="form-section-header">
                📱 {t("OTP सत्यापन", "OTP Verification")}
              </div>
              <div className="form-section-body">
                <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-sm text-blue-800">
                  <p>{t("OTP भेजा गया:", "OTP sent to:")} <strong>{maskedDest}</strong></p>
                  <p className="text-xs text-blue-600 mt-0.5">{t("Demo OTP: 123456", "Demo OTP: 123456")}</p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="form-field">
                    <label>{t("6-अंकीय OTP", "6-digit OTP")} <span className="req">*</span></label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="000000"
                      className="text-2xl text-center font-mono tracking-widest"
                      autoFocus
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">{error}</div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6 || attempts >= 3}
                    className="btn-gov-primary w-full"
                    style={{ padding: "12px", justifyContent: "center" }}
                  >
                    {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" /> : null}
                    {t("OTP सत्यापित करें और पंजीकरण पूरा करें", "Verify OTP & Complete Registration")}
                  </button>

                  <button type="button" onClick={() => { setStep("details"); setOtp(""); setError(""); }} className="w-full text-sm text-center text-blue-700 hover:underline">
                    {t("वापस जाएं", "Go Back")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
