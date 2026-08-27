export const routingMatrix: Record<string, { ministry: string; department: string; contact: string; icon: string; nameHi: string }> = {
  pension: {
    ministry: "EPFO (Employees' Provident Fund Organisation)",
    department: "Claims Processing Division",
    contact: "1800-180-1111",
    icon: "🏦",
    nameHi: "कर्मचारी भविष्य निधि संगठन",
  },
  tax: {
    ministry: "Central Board of Direct Taxes (CBDT)",
    department: "CPC Bangalore / Centralised Processing Centre",
    contact: "1800-425-8850",
    icon: "📊",
    nameHi: "केंद्रीय प्रत्यक्ष कर बोर्ड",
  },
  license: {
    ministry: "Ministry of Road Transport & Highways",
    department: "Regional Transport Office (RTO)",
    contact: "State-specific RTO",
    icon: "🚗",
    nameHi: "सड़क परिवहन और राजमार्ग मंत्रालय",
  },
  aadhaar: {
    ministry: "UIDAI",
    department: "Unique Identification Authority of India",
    contact: "1800-300-1947",
    icon: "🆔",
    nameHi: "भारतीय विशिष्ट पहचान प्राधिकरण",
  },
  road: {
    ministry: "Ministry of Road Transport & Highways",
    department: "State Public Works Department",
    contact: "State helpline",
    icon: "🛣️",
    nameHi: "लोक निर्माण विभाग",
  },
  railway: {
    ministry: "Ministry of Railways",
    department: "IRCTC Customer Care",
    contact: "139",
    icon: "🚂",
    nameHi: "रेल मंत्रालय",
  },
  gst: {
    ministry: "GST Network (GSTN)",
    department: "GST Compliance",
    contact: "1800-200-7777",
    icon: "🧾",
    nameHi: "वस्तु एवं सेवा कर नेटवर्क",
  },
  grievance_bounce: {
    ministry: "DARPG",
    department: "Directorate of Public Grievances",
    contact: "23401455",
    icon: "📢",
    nameHi: "प्रशासनिक सुधार और लोक शिकायत विभाग",
  },
  other: {
    ministry: "DARPG — General Grievances",
    department: "Public Grievances Division",
    contact: "23401455",
    icon: "📋",
    nameHi: "सामान्य शिकायत प्रकोष्ठ",
  },
};

export const dashboardCases = [
  {
    id: "CPG_20260825_001",
    title: "Pension Payment Delayed 3 Months",
    titleHi: "पेंशन 3 महीने से नहीं आई",
    filed_date: "2026-05-15",
    status: "In Progress",
    routed_to: "EPFO",
    current_stage: "Verification by CPC",
    expected_resolution: "2026-09-15",
    days_pending: 102,
    priority: "high",
    complaint_type: "pension",
    phone: "1800-180-1111",
  },
  {
    id: "CPG_20260820_002",
    title: "Income Tax Refund Stuck 2 Years",
    titleHi: "आयकर रिफंड 2 साल से लंबित",
    filed_date: "2024-08-20",
    status: "Escalated",
    routed_to: "CBDT",
    current_stage: "Appeal Review",
    expected_resolution: "2026-10-01",
    days_pending: 737,
    priority: "critical",
    complaint_type: "tax",
    phone: "1800-425-8850",
  },
  {
    id: "CPG_20260810_003",
    title: "Driving License Approval Pending",
    titleHi: "ड्राइविंग लाइसेंस अनुमोदन लंबित",
    filed_date: "2026-02-10",
    status: "In Progress",
    routed_to: "RTO",
    current_stage: "Document Verification",
    expected_resolution: "2026-09-10",
    days_pending: 197,
    priority: "medium",
    complaint_type: "license",
    phone: "State RTO",
  },
  {
    id: "CPG_20260801_004",
    title: "Aadhaar Enrollment Rejected",
    titleHi: "आधार नामांकन अस्वीकृत",
    filed_date: "2026-08-01",
    status: "Awaiting Action",
    routed_to: "UIDAI",
    current_stage: "Biometric Re-verification",
    expected_resolution: "2026-08-30",
    days_pending: 26,
    priority: "high",
    complaint_type: "aadhaar",
    phone: "1800-300-1947",
  },
  {
    id: "CPG_20260725_005",
    title: "Road Repair Not Started Despite Sanction",
    titleHi: "मंजूरी के बाद भी सड़क मरम्मत शुरू नहीं",
    filed_date: "2026-07-25",
    status: "In Progress",
    routed_to: "PWD",
    current_stage: "Tender Process",
    expected_resolution: "2027-01-25",
    days_pending: 33,
    priority: "medium",
    complaint_type: "road",
    phone: "State helpline",
  },
];

export const caseTimelines: Record<string, Array<{ stage: string; stageHi: string; date: string; details: string; detailsHi: string; status: "completed" | "in_progress" | "pending"; emoji: string }>> = {
  "CPG_20260825_001": [
    { stage: "Complaint Filed", stageHi: "शिकायत दर्ज", date: "2026-05-15", details: "Your complaint was received and assigned case number.", detailsHi: "आपकी शिकायत प्राप्त हुई और केस नंबर दिया गया।", status: "completed", emoji: "📝" },
    { stage: "AI Routing Complete", stageHi: "AI रूटिंग पूर्ण", date: "2026-05-15", details: "AI correctly identified this as an EPFO pension matter.", detailsHi: "AI ने इसे EPFO पेंशन मामले के रूप में पहचाना।", status: "completed", emoji: "🤖" },
    { stage: "Routed to EPFO", stageHi: "EPFO को भेजा गया", date: "2026-05-16", details: "Complaint forwarded to EPFO Claims Processing Division.", detailsHi: "शिकायत EPFO दावा प्रसंस्करण विभाग को भेजी गई।", status: "completed", emoji: "📤" },
    { stage: "Initial Review", stageHi: "प्रारंभिक समीक्षा", date: "2026-06-01", details: "EPFO acknowledged receipt and began initial review.", detailsHi: "EPFO ने प्राप्ति की पुष्टि की और समीक्षा शुरू की।", status: "completed", emoji: "👁️" },
    { stage: "Verification in Progress", stageHi: "सत्यापन जारी है", date: "NOW", details: "CPC is verifying your claim documents and employer records.", detailsHi: "CPC आपके दस्तावेज़ और नियोक्ता रिकॉर्ड सत्यापित कर रहा है।", status: "in_progress", emoji: "🔍" },
    { stage: "Expected Resolution", stageHi: "अपेक्षित समाधान", date: "2026-09-15", details: "Target date for full resolution of your pension claim.", detailsHi: "आपके पेंशन दावे के पूर्ण समाधान की लक्ष्य तिथि।", status: "pending", emoji: "✅" },
  ],
  "CPG_20260820_002": [
    { stage: "Complaint Filed", stageHi: "शिकायत दर्ज", date: "2024-08-20", details: "ITR refund complaint received.", detailsHi: "ITR रिफंड शिकायत प्राप्त हुई।", status: "completed", emoji: "📝" },
    { stage: "Routed to CBDT", stageHi: "CBDT को भेजा", date: "2024-08-20", details: "Forwarded to CPC Bangalore for review.", detailsHi: "CPC बेंगलुरु को समीक्षा के लिए भेजा गया।", status: "completed", emoji: "📤" },
    { stage: "Department Response", stageHi: "विभाग की प्रतिक्रिया", date: "2024-10-15", details: "CBDT requested additional documentation.", detailsHi: "CBDT ने अतिरिक्त दस्तावेज़ मांगे।", status: "completed", emoji: "📋" },
    { stage: "Escalated", stageHi: "एस्केलेट किया गया", date: "2025-06-01", details: "Case escalated due to prolonged non-resolution.", detailsHi: "लंबे समय से समाधान न होने के कारण मामला एस्केलेट किया गया।", status: "completed", emoji: "⚠️" },
    { stage: "Appeal Review", stageHi: "अपील समीक्षा", date: "NOW", details: "Nodal Appellate Authority — CBDT reviewing your appeal.", detailsHi: "नोडल अपीलीय प्राधिकरण — CBDT आपकी अपील की समीक्षा कर रहा है।", status: "in_progress", emoji: "⚖️" },
    { stage: "Hearing Scheduled", stageHi: "सुनवाई निर्धारित", date: "2026-09-15", details: "Next hearing date with appellate authority.", detailsHi: "अपीलीय प्राधिकरण के साथ अगली सुनवाई तिथि।", status: "pending", emoji: "📅" },
  ],
  "CPG_20260810_003": [
    { stage: "Complaint Filed", stageHi: "शिकायत दर्ज", date: "2026-02-10", details: "DL pending complaint received.", detailsHi: "DL लंबित शिकायत प्राप्त हुई।", status: "completed", emoji: "📝" },
    { stage: "Routed to RTO", stageHi: "RTO को भेजा", date: "2026-02-11", details: "Forwarded to Regional Transport Office.", detailsHi: "क्षेत्रीय परिवहन कार्यालय को भेजा गया।", status: "completed", emoji: "📤" },
    { stage: "Document Verification", stageHi: "दस्तावेज़ सत्यापन", date: "NOW", details: "RTO verifying test results and application documents.", detailsHi: "RTO परीक्षण परिणाम और आवेदन दस्तावेज़ सत्यापित कर रहा है।", status: "in_progress", emoji: "🔍" },
    { stage: "License Issuance", stageHi: "लाइसेंस जारी", date: "2026-09-10", details: "Expected date for license dispatch.", detailsHi: "लाइसेंस प्रेषण की अपेक्षित तिथि।", status: "pending", emoji: "🚗" },
  ],
  "CPG_20260801_004": [
    { stage: "Complaint Filed", stageHi: "शिकायत दर्ज", date: "2026-08-01", details: "Aadhaar rejection complaint received.", detailsHi: "आधार अस्वीकृति शिकायत प्राप्त हुई।", status: "completed", emoji: "📝" },
    { stage: "Routed to UIDAI", stageHi: "UIDAI को भेजा", date: "2026-08-01", details: "Forwarded to UIDAI Biometric Support.", detailsHi: "UIDAI बायोमेट्रिक सहायता को भेजा गया।", status: "completed", emoji: "📤" },
    { stage: "Biometric Re-verification", stageHi: "बायोमेट्रिक पुनः सत्यापन", date: "NOW", details: "UIDAI scheduling biometric re-capture appointment.", detailsHi: "UIDAI बायोमेट्रिक पुनः कैप्चर अपॉइंटमेंट निर्धारित कर रहा है।", status: "in_progress", emoji: "🔍" },
    { stage: "Resolution", stageHi: "समाधान", date: "2026-08-30", details: "Expected Aadhaar card delivery.", detailsHi: "आधार कार्ड डिलीवरी की अपेक्षित तिथि।", status: "pending", emoji: "🆔" },
  ],
  "CPG_20260725_005": [
    { stage: "Complaint Filed", stageHi: "शिकायत दर्ज", date: "2026-07-25", details: "Road repair grievance received.", detailsHi: "सड़क मरम्मत शिकायत प्राप्त हुई।", status: "completed", emoji: "📝" },
    { stage: "Routed to PWD", stageHi: "PWD को भेजा", date: "2026-07-26", details: "Forwarded to State Public Works Department.", detailsHi: "राज्य लोक निर्माण विभाग को भेजा गया।", status: "completed", emoji: "📤" },
    { stage: "Tender Process", stageHi: "निविदा प्रक्रिया", date: "NOW", details: "PWD initiating tender for road repair contract.", detailsHi: "PWD सड़क मरम्मत अनुबंध के लिए निविदा शुरू कर रहा है।", status: "in_progress", emoji: "📋" },
    { stage: "Work Commencement", stageHi: "कार्य प्रारंभ", date: "2027-01-25", details: "Expected date for road repair work to begin.", detailsHi: "सड़क मरम्मत कार्य शुरू होने की अपेक्षित तिथि।", status: "pending", emoji: "🛣️" },
  ],
};

export const officers = [
  {
    id: 1,
    name: "Dpi Agarwal",
    designation: "Commissioner of Income Tax",
    ministry: "CBDT",
    department: "Central Board of Direct Taxes",
    address: "Room No. 428, 4th Floor, Mayur Bhawan, Connaught Circus, New Delhi",
    phone: "01123416148",
    email: "delhi-itps@incometax.gov.in",
    initials: "DA",
  },
  {
    id: 2,
    name: "Dr. Shailendra Kumar Sinha",
    designation: "Director General",
    ministry: "CBIT",
    department: "Central Board of Indirect Taxes & Customs",
    address: "1st Floor, Central Revenue Building, IP Estate, New Delhi",
    phone: "01123705809",
    email: "shailendra.sinha@cbic-gov.in",
    initials: "SS",
  },
  {
    id: 3,
    name: "Sardendu Kumar Pandey",
    designation: "Director",
    ministry: "DARPG",
    department: "Dept. of Administrative Reforms & Public Grievances",
    address: "5th Floor, Sardar Patel Bhawan, Sansad Marg, New Delhi",
    phone: "01123401455",
    email: "director-pg@darpg.gov.in",
    initials: "SP",
  },
  {
    id: 4,
    name: "Raj Kumar Singh",
    designation: "Regional Transport Officer",
    ministry: "MoRTH",
    department: "Delhi RTO — Sarai Kale Khan",
    address: "Regional Transport Office, Sarai Kale Khan, New Delhi",
    phone: "011-23899800",
    email: "delhi.rto@transport.gov.in",
    initials: "RS",
  },
  {
    id: 5,
    name: "Ajay Bhatnagar",
    designation: "Chief of Pension Division",
    ministry: "EPFO",
    department: "Employees' Provident Fund Organisation",
    address: "EPFO Bhawan, CGO Complex, Lodhi Road, New Delhi",
    phone: "1800-180-1111",
    email: "epfo.support@epfindia.gov.in",
    initials: "AB",
  },
];

export const appeals = [
  {
    id: "APPEAL_001",
    grievance_id: "CPG_20260820_002",
    grievance_title: "Income Tax Refund Stuck 2 Years",
    filed_date: "2026-07-15",
    appeal_type: "First Appeal",
    status: "Under Review",
    appellate_authority: "Nodal Appellate Authority — CBDT",
    days_since_filed: 41,
    next_hearing: "2026-09-15",
  },
  {
    id: "APPEAL_002",
    grievance_id: "CPG_20260725_005",
    grievance_title: "Road Repair Not Started",
    filed_date: "2026-08-20",
    appeal_type: "First Appeal",
    status: "Approved",
    appellate_authority: "Nodal Authority — PWD",
    days_since_filed: 5,
    next_hearing: null,
  },
];

export const faqs = [
  {
    id: 1,
    questionHi: "CPGRAMS क्या है?",
    question: "What is CPGRAMS?",
    answerHi: "CPGRAMS (केंद्रीय लोक शिकायत निवारण और निगरानी प्रणाली) भारत सरकार की केंद्रीकृत शिकायत निवारण प्रणाली है। यह नागरिकों को किसी भी केंद्र सरकार के मंत्रालय या विभाग के खिलाफ शिकायत दर्ज करने की सुविधा देती है।",
    answer: "CPGRAMS (Centralised Public Grievance Redress and Monitoring System) is the Government of India's unified grievance platform. It allows citizens to file complaints against any central government ministry or department.",
  },
  {
    id: 2,
    questionHi: "AI रूटिंग कैसे काम करती है?",
    question: "How does AI routing work?",
    answerHi: "हमारा AI आपकी शिकायत का पाठ पढ़ता है और असली समस्या को समझता है — सिर्फ कीवर्ड नहीं। फिर यह सही मंत्रालय/विभाग की पहचान करता है और आत्मविश्वास स्कोर के साथ सिफारिश करता है।",
    answer: "Our AI reads your complaint text and understands the actual problem — not just keywords. It then identifies the correct ministry/department and provides a recommendation with a confidence score.",
  },
  {
    id: 3,
    questionHi: "कौन सी शिकायतें कवर नहीं होती?",
    question: "What complaints are NOT covered?",
    answerHi: "RTI मामले, न्यायालय के मामले, धार्मिक मामले, सेवा मामले जो CAT में लंबित हैं, राज्य सरकार के विभागों के खिलाफ शिकायतें, और विदेश नीति से संबंधित मामले इसमें शामिल नहीं हैं।",
    answer: "RTI matters, court cases, religious matters, service matters pending in CAT, complaints against state government departments, and foreign policy matters are NOT covered by CPGRAMS.",
  },
  {
    id: 4,
    questionHi: "समाधान में कितना समय लगता है?",
    question: "How long does resolution take?",
    answerHi: "मानक शिकायतें: 21 दिन। जटिल मामले: 60 दिन तक। अपील: अतिरिक्त 30 दिन। यदि समय सीमा से अधिक समय लगे तो आप अपील दर्ज कर सकते हैं।",
    answer: "Standard complaints: 21 days. Complex cases: up to 60 days. Appeals: additional 30 days. If the deadline passes without resolution, you can file an appeal.",
  },
  {
    id: 5,
    questionHi: "क्या मैं अपील दर्ज कर सकता/सकती हूं?",
    question: "Can I file an appeal?",
    answerHi: "हाँ। यदि आप समाधान से असंतुष्ट हैं, तो बंद होने के 30 दिनों के अंदर पहली अपील दर्ज करें। यदि पहली अपील से भी संतुष्ट नहीं हैं, तो द्वितीय अपील का विकल्प भी उपलब्ध है।",
    answer: "Yes, if unsatisfied with the resolution. File a First Appeal within 30 days of closure. A Second Appeal is also available if you remain unsatisfied after the First Appeal.",
  },
  {
    id: 6,
    questionHi: "अगर शिकायत बाउंस होती रहे तो क्या करें?",
    question: "What if my complaint keeps bouncing between departments?",
    answerHi: "यदि आपकी शिकायत विभागों के बीच बाउंस हो रही है, तो DARPG (प्रशासनिक सुधार विभाग) से संपर्क करें जो शिकायत समन्वय की निगरानी करता है। नंबर: 01123401455।",
    answer: "If your complaint keeps bouncing, contact DARPG (Dept. of Administrative Reforms) which oversees grievance coordination. Phone: 01123401455.",
  },
];

export const testComplaints = [
  { id: 1, text: "My pension hasn't arrived for 3 months. I have the payment slip from my employer dated May 2026.", expected: "pension" },
  { id: 2, text: "Filed my income tax return 2 years ago but refund is still pending. The portal shows 'processed' but no money.", expected: "tax" },
  { id: 3, text: "Applied for driving license 6 months ago, passed all tests, but license approval is stuck on 'pending' status.", expected: "license" },
  { id: 4, text: "Aadhaar enrollment was rejected saying my fingerprints didn't match.", expected: "aadhaar" },
  { id: 5, text: "Municipal promised to fix our sector roads with 50 lakhs sanctioned last year but no work happened.", expected: "road" },
  { id: 6, text: "IRCTC Tatkal ticket refund was debited from my account but I never got the ticket or refund.", expected: "railway" },
  { id: 7, text: "GST return upload failed at last minute on filing deadline. Now showing payment error but money was deducted.", expected: "gst" },
  { id: 8, text: "Filed complaint 3 times. It keeps bouncing between departments. No one takes ownership.", expected: "grievance_bounce" },
];

// ═══════════════════════════════════════════════════
// ACCOUNTABILITY ENGINE DATA
// ═══════════════════════════════════════════════════

export interface OfficerProfile {
  id: string;
  name: string;
  nameHi: string;
  designation: string;
  ministry: string;
  ministryHi: string;
  department: string;
  state: string;
  initials: string;
  avatarColor: string;
  metrics: {
    totalCases: number;
    casesResolved: number;
    casesPending: number;
    resolutionRate: number;
    realSolutionRate: number;
    paperComplianceRate: number;
    appealRate: number;
    avgResolutionDays: number;
    mandatedDays: number;
    avgRating: number;
    feedbackCount: number;
    performanceTrend: "improving" | "stable" | "declining";
  };
  feedback: {
    caseId: string;
    rating: number;
    text: string;
    textHi: string;
    citizen: string;
    city: string;
    verified: boolean;
  }[];
  contact: string;
  email: string;
}

export const officerProfiles: OfficerProfile[] = [
  {
    id: "rajesh_kumar_epfo",
    name: "Rajesh Kumar",
    nameHi: "राजेश कुमार",
    designation: "Assistant Commissioner",
    ministry: "EPFO",
    ministryHi: "कर्मचारी भविष्य निधि संगठन",
    department: "Claims Processing Division",
    state: "Maharashtra",
    initials: "RK",
    avatarColor: "#1a237e",
    metrics: {
      totalCases: 240, casesResolved: 235, casesPending: 5,
      resolutionRate: 0.98, realSolutionRate: 0.98, paperComplianceRate: 0.02,
      appealRate: 0.012, avgResolutionDays: 6, mandatedDays: 21,
      avgRating: 4.9, feedbackCount: 87, performanceTrend: "improving",
    },
    feedback: [
      { caseId: "CPG_20260615_087", rating: 5, text: "Very quick work, problem solved in 5 days!", textHi: "बहुत तेजी से काम किया, 5 दिन में समस्या हल!", citizen: "Ramesh K.", city: "Indore", verified: true },
      { caseId: "CPG_20260620_091", rating: 5, text: "Problem was properly solved. Pension credited.", textHi: "समस्या सही तरीके से हल हुई। पेंशन जमा हो गई।", citizen: "Priya S.", city: "Mumbai", verified: true },
      { caseId: "CPG_20260701_045", rating: 5, text: "Everything clear and transparent throughout.", textHi: "सब कुछ साफ और स्पष्ट था।", citizen: "Amit D.", city: "Pune", verified: true },
    ],
    contact: "1800-180-1111",
    email: "rajesh.kumar@epfindia.gov.in",
  },
  {
    id: "priya_sharma_rto",
    name: "Priya Sharma",
    nameHi: "प्रिया शर्मा",
    designation: "Regional Transport Officer",
    ministry: "MoRTH",
    ministryHi: "सड़क परिवहन और राजमार्ग मंत्रालय",
    department: "RTO — Pune",
    state: "Maharashtra",
    initials: "PS",
    avatarColor: "#006064",
    metrics: {
      totalCases: 189, casesResolved: 181, casesPending: 8,
      resolutionRate: 0.96, realSolutionRate: 0.94, paperComplianceRate: 0.06,
      appealRate: 0.02, avgResolutionDays: 8, mandatedDays: 21,
      avgRating: 4.7, feedbackCount: 63, performanceTrend: "stable",
    },
    feedback: [
      { caseId: "CPG_20260510_033", rating: 5, text: "DL issued faster than expected. Great officer!", textHi: "DL उम्मीद से जल्दी जारी हुई। बेहतरीन अधिकारी!", citizen: "Suresh M.", city: "Pune", verified: true },
      { caseId: "CPG_20260520_041", rating: 4, text: "Took a bit longer but resolved correctly.", textHi: "थोड़ा समय लगा लेकिन सही तरीके से हल हुआ।", citizen: "Kavita R.", city: "Nashik", verified: true },
    ],
    contact: "State RTO Helpline",
    email: "priya.sharma@rto.mh.gov.in",
  },
  {
    id: "anand_mishra_cbdt",
    name: "Anand Mishra",
    nameHi: "आनंद मिश्रा",
    designation: "Income Tax Officer",
    ministry: "CBDT",
    ministryHi: "केंद्रीय प्रत्यक्ष कर बोर्ड",
    department: "CPC Bangalore",
    state: "Telangana",
    initials: "AM",
    avatarColor: "#880e4f",
    metrics: {
      totalCases: 312, casesResolved: 287, casesPending: 25,
      resolutionRate: 0.92, realSolutionRate: 0.89, paperComplianceRate: 0.11,
      appealRate: 0.038, avgResolutionDays: 11, mandatedDays: 30,
      avgRating: 4.4, feedbackCount: 104, performanceTrend: "improving",
    },
    feedback: [
      { caseId: "CPG_20260412_019", rating: 5, text: "Refund processed after 2 years — finally resolved!", textHi: "2 साल बाद रिफंड मिला — आखिरकार हल हुआ!", citizen: "Venkat R.", city: "Hyderabad", verified: true },
      { caseId: "CPG_20260505_027", rating: 4, text: "Good resolution but could have been faster.", textHi: "अच्छा समाधान लेकिन और तेज हो सकता था।", citizen: "Lakshmi P.", city: "Warangal", verified: true },
    ],
    contact: "1800-425-8850",
    email: "anand.mishra@incometax.gov.in",
  },
  {
    id: "sunita_verma_uidai",
    name: "Sunita Verma",
    nameHi: "सुनीता वर्मा",
    designation: "Deputy Director",
    ministry: "UIDAI",
    ministryHi: "भारतीय विशिष्ट पहचान प्राधिकरण",
    department: "Biometric Support Division",
    state: "Delhi",
    initials: "SV",
    avatarColor: "#e65100",
    metrics: {
      totalCases: 156, casesResolved: 143, casesPending: 13,
      resolutionRate: 0.92, realSolutionRate: 0.91, paperComplianceRate: 0.09,
      appealRate: 0.025, avgResolutionDays: 14, mandatedDays: 21,
      avgRating: 4.5, feedbackCount: 71, performanceTrend: "stable",
    },
    feedback: [
      { caseId: "CPG_20260601_055", rating: 5, text: "Aadhaar issue fixed quickly, very helpful!", textHi: "आधार समस्या जल्दी ठीक हुई, बहुत मददगार!", citizen: "Rakesh T.", city: "Delhi", verified: true },
      { caseId: "CPG_20260614_068", rating: 4, text: "Good follow-up, resolved within 2 weeks.", textHi: "अच्छा फॉलो-अप, 2 हफ्तों में समाधान।", citizen: "Meena G.", city: "Noida", verified: true },
    ],
    contact: "1800-300-1947",
    email: "sunita.verma@uidai.gov.in",
  },
  {
    id: "vikas_nair_railway",
    name: "Vikas Nair",
    nameHi: "विकास नायर",
    designation: "Customer Relations Manager",
    ministry: "Railways",
    ministryHi: "रेल मंत्रालय",
    department: "IRCTC Customer Care — Southern Zone",
    state: "Telangana",
    initials: "VN",
    avatarColor: "#2e7d32",
    metrics: {
      totalCases: 428, casesResolved: 401, casesPending: 27,
      resolutionRate: 0.94, realSolutionRate: 0.92, paperComplianceRate: 0.08,
      appealRate: 0.018, avgResolutionDays: 9, mandatedDays: 21,
      avgRating: 4.6, feedbackCount: 189, performanceTrend: "improving",
    },
    feedback: [
      { caseId: "CPG_20260301_012", rating: 5, text: "Train refund got credited within a week!", textHi: "ट्रेन रिफंड एक हफ्ते में आया!", citizen: "Arun K.", city: "Hyderabad", verified: true },
      { caseId: "CPG_20260315_023", rating: 5, text: "Excellent handling of complex refund case.", textHi: "जटिल रिफंड केस का उत्कृष्ट प्रबंधन।", citizen: "Shalini B.", city: "Secunderabad", verified: true },
    ],
    contact: "139",
    email: "vikas.nair@irctc.gov.in",
  },
  {
    id: "deepa_pillai_pwd",
    name: "Deepa Pillai",
    nameHi: "दीपा पिल्लई",
    designation: "Executive Engineer",
    ministry: "PWD",
    ministryHi: "लोक निर्माण विभाग",
    department: "Roads & Bridges Division",
    state: "Delhi",
    initials: "DP",
    avatarColor: "#1565c0",
    metrics: {
      totalCases: 94, casesResolved: 78, casesPending: 16,
      resolutionRate: 0.83, realSolutionRate: 0.79, paperComplianceRate: 0.21,
      appealRate: 0.065, avgResolutionDays: 38, mandatedDays: 60,
      avgRating: 3.9, feedbackCount: 42, performanceTrend: "declining",
    },
    feedback: [
      { caseId: "CPG_20260201_008", rating: 4, text: "Road got fixed eventually, took longer than expected.", textHi: "सड़क ठीक हुई आखिरकार, उम्मीद से ज्यादा समय लगा।", citizen: "Kuldeep S.", city: "Delhi", verified: true },
      { caseId: "CPG_20260220_014", rating: 3, text: "Resolution was only partial — pothole still remains.", textHi: "समाधान आंशिक ही रहा — गड्ढा अभी भी है।", citizen: "Neha T.", city: "Gurugram", verified: true },
    ],
    contact: "011-23411911",
    email: "deepa.pillai@pwd.delhi.gov.in",
  },
  {
    id: "mohan_gupta_epfo_up",
    name: "Mohan Gupta",
    nameHi: "मोहन गुप्ता",
    designation: "Enforcement Officer",
    ministry: "EPFO",
    ministryHi: "कर्मचारी भविष्य निधि संगठन",
    department: "Regional Office — Lucknow",
    state: "Uttar Pradesh",
    initials: "MG",
    avatarColor: "#4a148c",
    metrics: {
      totalCases: 178, casesResolved: 148, casesPending: 30,
      resolutionRate: 0.83, realSolutionRate: 0.78, paperComplianceRate: 0.22,
      appealRate: 0.07, avgResolutionDays: 24, mandatedDays: 21,
      avgRating: 3.7, feedbackCount: 59, performanceTrend: "stable",
    },
    feedback: [
      { caseId: "CPG_20260410_021", rating: 3, text: "Resolved but had to follow up multiple times.", textHi: "हल हुआ लेकिन कई बार फॉलो-अप करना पड़ा।", citizen: "Shyam L.", city: "Lucknow", verified: true },
      { caseId: "CPG_20260422_029", rating: 4, text: "Eventually got proper resolution after escalation.", textHi: "एस्केलेशन के बाद आखिरकार सही समाधान मिला।", citizen: "Renu M.", city: "Kanpur", verified: true },
    ],
    contact: "1800-180-1111",
    email: "mohan.gupta@epfindia.gov.in",
  },
  {
    id: "ashok_reddy_cbdt_hyd",
    name: "Ashok Reddy",
    nameHi: "अशोक रेड्डी",
    designation: "Senior Tax Assistant",
    ministry: "CBDT",
    ministryHi: "केंद्रीय प्रत्यक्ष कर बोर्ड",
    department: "Hyderabad Tax Office",
    state: "Telangana",
    initials: "AR",
    avatarColor: "#b71c1c",
    metrics: {
      totalCases: 201, casesResolved: 188, casesPending: 13,
      resolutionRate: 0.94, realSolutionRate: 0.93, paperComplianceRate: 0.07,
      appealRate: 0.02, avgResolutionDays: 12, mandatedDays: 30,
      avgRating: 4.6, feedbackCount: 93, performanceTrend: "improving",
    },
    feedback: [
      { caseId: "CPG_20260520_044", rating: 5, text: "TDS mismatch resolved in record time!", textHi: "TDS मेल नहीं खाने की समस्या रिकॉर्ड समय में हल!", citizen: "Prasad V.", city: "Hyderabad", verified: true },
    ],
    contact: "1800-425-8850",
    email: "ashok.reddy@incometax.gov.in",
  },
  {
    id: "fatima_sheikh_uidai_mh",
    name: "Fatima Sheikh",
    nameHi: "फातिमा शेख",
    designation: "Technical Officer",
    ministry: "UIDAI",
    ministryHi: "भारतीय विशिष्ट पहचान प्राधिकरण",
    department: "Enrollment & Update Division — Mumbai",
    state: "Maharashtra",
    initials: "FS",
    avatarColor: "#00695c",
    metrics: {
      totalCases: 132, casesResolved: 127, casesPending: 5,
      resolutionRate: 0.96, realSolutionRate: 0.96, paperComplianceRate: 0.04,
      appealRate: 0.008, avgResolutionDays: 7, mandatedDays: 21,
      avgRating: 4.8, feedbackCount: 58, performanceTrend: "improving",
    },
    feedback: [
      { caseId: "CPG_20260615_060", rating: 5, text: "Aadhaar corrected in one week, fantastic!", textHi: "आधार एक हफ्ते में सही हुआ, शानदार!", citizen: "Mohammed I.", city: "Mumbai", verified: true },
    ],
    contact: "1800-300-1947",
    email: "fatima.sheikh@uidai.gov.in",
  },
  {
    id: "suresh_babu_railway_ap",
    name: "Suresh Babu",
    nameHi: "सुरेश बाबू",
    designation: "Station Master — Grade A",
    ministry: "Railways",
    ministryHi: "रेल मंत्रालय",
    department: "South Central Railway — Vijayawada Division",
    state: "Andhra Pradesh",
    initials: "SB",
    avatarColor: "#37474f",
    metrics: {
      totalCases: 87, casesResolved: 76, casesPending: 11,
      resolutionRate: 0.87, realSolutionRate: 0.84, paperComplianceRate: 0.16,
      appealRate: 0.045, avgResolutionDays: 15, mandatedDays: 21,
      avgRating: 4.1, feedbackCount: 34, performanceTrend: "stable",
    },
    feedback: [
      { caseId: "CPG_20260401_017", rating: 4, text: "Refund received, took slightly longer than expected.", textHi: "रिफंड मिला, उम्मीद से थोड़ा ज्यादा समय लगा।", citizen: "Krishna R.", city: "Vijayawada", verified: true },
    ],
    contact: "139",
    email: "suresh.babu@scr.railnet.gov.in",
  },
];

export interface StateRanking {
  rank: number;
  state: string;
  stateHi: string;
  abbreviation: string;
  totalCases: number;
  casesResolved: number;
  resolutionRate: number;
  avgResolutionDays: number;
  satisfaction: number;
  realSolutionRate: number;
  appealRate: number;
  trend: "up" | "down" | "stable";
  topOfficerId: string;
}

export const stateRankings: StateRanking[] = [
  { rank: 1, state: "Maharashtra", stateHi: "महाराष्ट्र", abbreviation: "MH", totalCases: 18420, casesResolved: 17315, resolutionRate: 0.94, avgResolutionDays: 9, satisfaction: 4.8, realSolutionRate: 0.94, appealRate: 0.02, trend: "up", topOfficerId: "rajesh_kumar_epfo" },
  { rank: 2, state: "Telangana", stateHi: "तेलंगाना", abbreviation: "TS", totalCases: 12890, casesResolved: 11730, resolutionRate: 0.91, avgResolutionDays: 11, satisfaction: 4.7, realSolutionRate: 0.91, appealRate: 0.025, trend: "up", topOfficerId: "vikas_nair_railway" },
  { rank: 3, state: "Delhi", stateHi: "दिल्ली", abbreviation: "DL", totalCases: 24100, casesResolved: 20965, resolutionRate: 0.87, avgResolutionDays: 15, satisfaction: 4.5, realSolutionRate: 0.85, appealRate: 0.04, trend: "stable", topOfficerId: "sunita_verma_uidai" },
  { rank: 4, state: "Gujarat", stateHi: "गुजरात", abbreviation: "GJ", totalCases: 14200, casesResolved: 12070, resolutionRate: 0.85, avgResolutionDays: 17, satisfaction: 4.4, realSolutionRate: 0.83, appealRate: 0.045, trend: "up", topOfficerId: "rajesh_kumar_epfo" },
  { rank: 5, state: "Karnataka", stateHi: "कर्नाटक", abbreviation: "KA", totalCases: 15800, casesResolved: 13295, resolutionRate: 0.84, avgResolutionDays: 18, satisfaction: 4.3, realSolutionRate: 0.82, appealRate: 0.048, trend: "stable", topOfficerId: "anand_mishra_cbdt" },
  { rank: 6, state: "Tamil Nadu", stateHi: "तमिलनाडु", abbreviation: "TN", totalCases: 17300, casesResolved: 14442, resolutionRate: 0.83, avgResolutionDays: 19, satisfaction: 4.3, realSolutionRate: 0.81, appealRate: 0.05, trend: "stable", topOfficerId: "vikas_nair_railway" },
  { rank: 7, state: "Kerala", stateHi: "केरल", abbreviation: "KL", totalCases: 9400, casesResolved: 7800, resolutionRate: 0.83, avgResolutionDays: 20, satisfaction: 4.2, realSolutionRate: 0.80, appealRate: 0.052, trend: "up", topOfficerId: "fatima_sheikh_uidai_mh" },
  { rank: 8, state: "Andhra Pradesh", stateHi: "आंध्र प्रदेश", abbreviation: "AP", totalCases: 13600, casesResolved: 11152, resolutionRate: 0.82, avgResolutionDays: 21, satisfaction: 4.1, realSolutionRate: 0.79, appealRate: 0.055, trend: "stable", topOfficerId: "suresh_babu_railway_ap" },
  { rank: 9, state: "Haryana", stateHi: "हरियाणा", abbreviation: "HR", totalCases: 11200, casesResolved: 9072, resolutionRate: 0.81, avgResolutionDays: 22, satisfaction: 4.1, realSolutionRate: 0.78, appealRate: 0.058, trend: "stable", topOfficerId: "priya_sharma_rto" },
  { rank: 10, state: "Punjab", stateHi: "पंजाब", abbreviation: "PB", totalCases: 9800, casesResolved: 7840, resolutionRate: 0.80, avgResolutionDays: 23, satisfaction: 4.0, realSolutionRate: 0.77, appealRate: 0.06, trend: "down", topOfficerId: "rajesh_kumar_epfo" },
  { rank: 11, state: "Rajasthan", stateHi: "राजस्थान", abbreviation: "RJ", totalCases: 16400, casesResolved: 12792, resolutionRate: 0.78, avgResolutionDays: 26, satisfaction: 3.9, realSolutionRate: 0.75, appealRate: 0.065, trend: "up", topOfficerId: "mohan_gupta_epfo_up" },
  { rank: 12, state: "West Bengal", stateHi: "पश्चिम बंगाल", abbreviation: "WB", totalCases: 18900, casesResolved: 14553, resolutionRate: 0.77, avgResolutionDays: 28, satisfaction: 3.8, realSolutionRate: 0.73, appealRate: 0.07, trend: "stable", topOfficerId: "anand_mishra_cbdt" },
  { rank: 13, state: "Madhya Pradesh", stateHi: "मध्य प्रदेश", abbreviation: "MP", totalCases: 15200, casesResolved: 11552, resolutionRate: 0.76, avgResolutionDays: 30, satisfaction: 3.8, realSolutionRate: 0.72, appealRate: 0.072, trend: "stable", topOfficerId: "mohan_gupta_epfo_up" },
  { rank: 14, state: "Odisha", stateHi: "ओडिशा", abbreviation: "OR", totalCases: 9200, casesResolved: 6900, resolutionRate: 0.75, avgResolutionDays: 32, satisfaction: 3.7, realSolutionRate: 0.71, appealRate: 0.075, trend: "up", topOfficerId: "ashok_reddy_cbdt_hyd" },
  { rank: 15, state: "Chhattisgarh", stateHi: "छत्तीसगढ़", abbreviation: "CG", totalCases: 7400, casesResolved: 5476, resolutionRate: 0.74, avgResolutionDays: 34, satisfaction: 3.7, realSolutionRate: 0.70, appealRate: 0.078, trend: "stable", topOfficerId: "mohan_gupta_epfo_up" },
  { rank: 16, state: "Assam", stateHi: "असम", abbreviation: "AS", totalCases: 8600, casesResolved: 6278, resolutionRate: 0.73, avgResolutionDays: 35, satisfaction: 3.6, realSolutionRate: 0.69, appealRate: 0.08, trend: "stable", topOfficerId: "suresh_babu_railway_ap" },
  { rank: 17, state: "Jharkhand", stateHi: "झारखंड", abbreviation: "JH", totalCases: 7800, casesResolved: 5616, resolutionRate: 0.72, avgResolutionDays: 37, satisfaction: 3.6, realSolutionRate: 0.68, appealRate: 0.082, trend: "up", topOfficerId: "mohan_gupta_epfo_up" },
  { rank: 18, state: "Uttarakhand", stateHi: "उत्तराखंड", abbreviation: "UK", totalCases: 5600, casesResolved: 3920, resolutionRate: 0.70, avgResolutionDays: 40, satisfaction: 3.5, realSolutionRate: 0.66, appealRate: 0.085, trend: "stable", topOfficerId: "deepa_pillai_pwd" },
  { rank: 19, state: "Himachal Pradesh", stateHi: "हिमाचल प्रदेश", abbreviation: "HP", totalCases: 4800, casesResolved: 3312, resolutionRate: 0.69, avgResolutionDays: 42, satisfaction: 3.5, realSolutionRate: 0.65, appealRate: 0.088, trend: "stable", topOfficerId: "priya_sharma_rto" },
  { rank: 20, state: "Uttar Pradesh", stateHi: "उत्तर प्रदेश", abbreviation: "UP", totalCases: 32400, casesResolved: 21384, resolutionRate: 0.66, avgResolutionDays: 45, satisfaction: 3.3, realSolutionRate: 0.61, appealRate: 0.095, trend: "up", topOfficerId: "mohan_gupta_epfo_up" },
  { rank: 21, state: "Bihar", stateHi: "बिहार", abbreviation: "BR", totalCases: 21600, casesResolved: 13824, resolutionRate: 0.64, avgResolutionDays: 50, satisfaction: 3.2, realSolutionRate: 0.59, appealRate: 0.10, trend: "stable", topOfficerId: "mohan_gupta_epfo_up" },
  { rank: 22, state: "Manipur", stateHi: "मणिपुर", abbreviation: "MN", totalCases: 2100, casesResolved: 1323, resolutionRate: 0.63, avgResolutionDays: 52, satisfaction: 3.2, realSolutionRate: 0.58, appealRate: 0.105, trend: "stable", topOfficerId: "suresh_babu_railway_ap" },
  { rank: 23, state: "Tripura", stateHi: "त्रिपुरा", abbreviation: "TR", totalCases: 2400, casesResolved: 1488, resolutionRate: 0.62, avgResolutionDays: 54, satisfaction: 3.1, realSolutionRate: 0.57, appealRate: 0.108, trend: "down", topOfficerId: "suresh_babu_railway_ap" },
  { rank: 24, state: "Goa", stateHi: "गोवा", abbreviation: "GA", totalCases: 1800, casesResolved: 1098, resolutionRate: 0.61, avgResolutionDays: 55, satisfaction: 3.1, realSolutionRate: 0.56, appealRate: 0.11, trend: "stable", topOfficerId: "priya_sharma_rto" },
  { rank: 25, state: "Meghalaya", stateHi: "मेघालय", abbreviation: "ML", totalCases: 1600, casesResolved: 944, resolutionRate: 0.59, avgResolutionDays: 58, satisfaction: 3.0, realSolutionRate: 0.54, appealRate: 0.115, trend: "stable", topOfficerId: "suresh_babu_railway_ap" },
  { rank: 26, state: "Nagaland", stateHi: "नागालैंड", abbreviation: "NL", totalCases: 1200, casesResolved: 696, resolutionRate: 0.58, avgResolutionDays: 60, satisfaction: 2.9, realSolutionRate: 0.53, appealRate: 0.12, trend: "stable", topOfficerId: "suresh_babu_railway_ap" },
  { rank: 27, state: "Arunachal Pradesh", stateHi: "अरुणाचल प्रदेश", abbreviation: "AR", totalCases: 1100, casesResolved: 616, resolutionRate: 0.56, avgResolutionDays: 63, satisfaction: 2.9, realSolutionRate: 0.51, appealRate: 0.125, trend: "down", topOfficerId: "suresh_babu_railway_ap" },
  { rank: 28, state: "Mizoram", stateHi: "मिजोरम", abbreviation: "MZ", totalCases: 900, casesResolved: 486, resolutionRate: 0.54, avgResolutionDays: 66, satisfaction: 2.8, realSolutionRate: 0.49, appealRate: 0.13, trend: "stable", topOfficerId: "suresh_babu_railway_ap" },
  // UTs
  { rank: 29, state: "Chandigarh", stateHi: "चंडीगढ़", abbreviation: "CH", totalCases: 2200, casesResolved: 1980, resolutionRate: 0.90, avgResolutionDays: 12, satisfaction: 4.6, realSolutionRate: 0.89, appealRate: 0.022, trend: "stable", topOfficerId: "priya_sharma_rto" },
  { rank: 30, state: "Puducherry", stateHi: "पुडुचेरी", abbreviation: "PY", totalCases: 1400, casesResolved: 1176, resolutionRate: 0.84, avgResolutionDays: 18, satisfaction: 4.2, realSolutionRate: 0.82, appealRate: 0.048, trend: "stable", topOfficerId: "suresh_babu_railway_ap" },
  { rank: 31, state: "Ladakh", stateHi: "लद्दाख", abbreviation: "LA", totalCases: 800, casesResolved: 624, resolutionRate: 0.78, avgResolutionDays: 28, satisfaction: 3.9, realSolutionRate: 0.74, appealRate: 0.068, trend: "up", topOfficerId: "sunita_verma_uidai" },
  { rank: 32, state: "Jammu & Kashmir", stateHi: "जम्मू और कश्मीर", abbreviation: "JK", totalCases: 4400, casesResolved: 3124, resolutionRate: 0.71, avgResolutionDays: 38, satisfaction: 3.5, realSolutionRate: 0.67, appealRate: 0.083, trend: "up", topOfficerId: "sunita_verma_uidai" },
  { rank: 33, state: "Andaman & Nicobar Islands", stateHi: "अंडमान और निकोबार द्वीप समूह", abbreviation: "AN", totalCases: 600, casesResolved: 384, resolutionRate: 0.64, avgResolutionDays: 50, satisfaction: 3.2, realSolutionRate: 0.60, appealRate: 0.10, trend: "stable", topOfficerId: "suresh_babu_railway_ap" },
  { rank: 34, state: "Dadra & Nagar Haveli", stateHi: "दादरा और नगर हवेली", abbreviation: "DN", totalCases: 420, casesResolved: 252, resolutionRate: 0.60, avgResolutionDays: 56, satisfaction: 3.0, realSolutionRate: 0.55, appealRate: 0.112, trend: "stable", topOfficerId: "priya_sharma_rto" },
  { rank: 35, state: "Lakshadweep", stateHi: "लक्षद्वीप", abbreviation: "LD", totalCases: 180, casesResolved: 99, resolutionRate: 0.55, avgResolutionDays: 65, satisfaction: 2.8, realSolutionRate: 0.50, appealRate: 0.128, trend: "stable", topOfficerId: "suresh_babu_railway_ap" },
  { rank: 36, state: "Sikkim", stateHi: "सिक्किम", abbreviation: "SK", totalCases: 760, casesResolved: 395, resolutionRate: 0.52, avgResolutionDays: 70, satisfaction: 2.7, realSolutionRate: 0.47, appealRate: 0.135, trend: "down", topOfficerId: "suresh_babu_railway_ap" },
];

export const systemHealth = {
  totalCasesFiled: 24783104,
  totalResolved: 19346221,
  overallResolutionRate: 0.78,
  realSolutionRate: 0.78,
  paperComplianceRate: 0.22,
  avgDaysCentral: 13,
  avgDaysStates: 64,
  citizenSatisfaction: 4.2,
  aiRoutingAccuracy: 0.94,
  firstTimeCorrect: 0.89,
  totalOfficers: 91420,
  grievancesThisMonth: 142830,
  resolvedThisMonth: 118190,
  lastUpdated: "2026-08-27",
};

// Map case IDs to officer IDs for "My Cases" dashboard
export const caseOfficerMap: Record<string, string> = {
  "CPG_20260825_001": "rajesh_kumar_epfo",
  "CPG_20260820_002": "anand_mishra_cbdt",
  "CPG_20260810_003": "priya_sharma_rto",
  "CPG_20260801_004": "sunita_verma_uidai",
  "CPG_20260725_005": "deepa_pillai_pwd",
};

