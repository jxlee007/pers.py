import { routingMatrix } from "../data/mockData";

export interface RoutingResult {
  complaint_type: string;
  root_issue: string;
  correct_ministry: string;
  correct_department: string;
  confidence: number;
  why_routed_here: string;
  why_routed_here_hi: string;
  wrong_routes_old_system: string[];
  contact: string;
  icon: string;
  ministry_name_hi: string;
}

const SYSTEM_PROMPT = `You are a government complaint classifier for India's CPGRAMS system. Read the citizen's complaint and identify the correct ministry/department.

Respond ONLY in valid JSON with no markdown, no explanation outside the JSON.

Complaint types: pension, tax, license, aadhaar, road, railway, gst, grievance_bounce, other

JSON format:
{
  "complaint_type": "pension|tax|license|aadhaar|road|railway|gst|grievance_bounce|other",
  "root_issue": "brief description of actual problem",
  "correct_ministry": "Ministry name",
  "correct_department": "Department/Office",
  "confidence": 0.85,
  "why_routed_here": "short explanation in English",
  "why_routed_here_hi": "short explanation in Hindi",
  "wrong_routes_old_system": ["would incorrectly go to X", "would incorrectly go to Y"]
}`;

function detectComplaintType(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("pension") || lower.includes("epf") || lower.includes("provident fund") || lower.includes("पेंशन")) return "pension";
  if (lower.includes("tax") || lower.includes("itr") || lower.includes("refund") || lower.includes("income tax") || lower.includes("cbdt") || lower.includes("आयकर")) return "tax";
  if (lower.includes("driving license") || lower.includes("dl ") || lower.includes("rto") || lower.includes("licence") || lower.includes("ड्राइविंग")) return "license";
  if (lower.includes("aadhaar") || lower.includes("aadhar") || lower.includes("uidai") || lower.includes("आधार") || lower.includes("biometric")) return "aadhaar";
  if (lower.includes("road") || lower.includes("pothole") || lower.includes("highway") || lower.includes("सड़क") || lower.includes("pwd")) return "road";
  if (lower.includes("railway") || lower.includes("irctc") || lower.includes("train") || lower.includes("tatkal") || lower.includes("रेल")) return "railway";
  if (lower.includes("gst") || lower.includes("gstn") || lower.includes("tax return") || lower.includes("goods and services")) return "gst";
  if (lower.includes("bouncing") || lower.includes("bounce") || lower.includes("no one") || lower.includes("third time") || lower.includes("departments")) return "grievance_bounce";
  return "other";
}

function buildMockResult(complaintText: string): RoutingResult {
  const type = detectComplaintType(complaintText);
  const matrix = routingMatrix[type] || routingMatrix["other"];

  const whyMap: Record<string, { en: string; hi: string; wrong: string[] }> = {
    pension: {
      en: "EPF pension claims are solely handled by EPFO. The issue is payment processing failure within the EPF system — not a bank or Finance Ministry matter.",
      hi: "EPF पेंशन दावे केवल EPFO द्वारा संभाले जाते हैं। यह बैंक या वित्त मंत्रालय का मामला नहीं है।",
      wrong: ["Finance Ministry (wrong — not their jurisdiction)", "RBI (wrong — not payment processing)", "State government (wrong — EPF is central)"],
    },
    tax: {
      en: "All ITR refunds are processed by CBDT's CPC Bangalore. This is not a bank issue or state government matter.",
      hi: "सभी ITR रिफंड CBDT के CPC बेंगलुरु द्वारा संसाधित किए जाते हैं। यह बैंक या राज्य सरकार का मामला नहीं है।",
      wrong: ["State government (wrong)", "Ministry of Finance general grievances (wrong)", "Reserve Bank of India (wrong)"],
    },
    license: {
      en: "All DL approvals are handled by RTO licensing authorities via the Sarathi system — not the police or general state transport.",
      hi: "सभी DL अनुमोदन Sarathi प्रणाली के माध्यम से RTO लाइसेंसिंग प्राधिकरणों द्वारा संभाले जाते हैं।",
      wrong: ["Police department (wrong)", "State transport department (wrong — RTO is specific)", "Home Ministry (wrong)"],
    },
    aadhaar: {
      en: "All Aadhaar enrollment and biometric issues are handled exclusively by UIDAI — not any other ministry.",
      hi: "सभी आधार नामांकन और बायोमेट्रिक मुद्दे विशेष रूप से UIDAI द्वारा संभाले जाते हैं।",
      wrong: ["Home Ministry (wrong)", "IT Ministry (wrong)", "State government (wrong)"],
    },
    road: {
      en: "Road repair and infrastructure maintenance for state roads falls under the State Public Works Department. National highways go to NHAI.",
      hi: "राज्य सड़कों की मरम्मत राज्य लोक निर्माण विभाग के अंतर्गत आती है।",
      wrong: ["Local municipality (wrong for state roads)", "Home Ministry (wrong)", "Finance Ministry (wrong)"],
    },
    railway: {
      en: "IRCTC ticket refunds and railway service grievances are handled by Ministry of Railways through IRCTC Customer Care.",
      hi: "IRCTC टिकट रिफंड और रेलवे सेवा शिकायतें रेल मंत्रालय द्वारा IRCTC के माध्यम से संभाली जाती हैं।",
      wrong: ["Finance Ministry (wrong)", "Bank dispute (wrong — IRCTC is responsible)", "Consumer court (premature)"],
    },
    gst: {
      en: "GST filing issues, portal errors, and payment processing failures are handled by GSTN and CBIC — not Income Tax.",
      hi: "GST फाइलिंग समस्याएं GSTN और CBIC द्वारा संभाली जाती हैं — आयकर विभाग द्वारा नहीं।",
      wrong: ["Income Tax Department (wrong — different tax system)", "RBI (wrong)", "State tax authority (wrong)"],
    },
    grievance_bounce: {
      en: "When complaints bounce repeatedly between departments without resolution, DARPG coordinates and owns the escalation process.",
      hi: "जब शिकायतें बिना समाधान के विभागों के बीच उछलती रहती हैं, DARPG समन्वय और एस्केलेशन प्रक्रिया संभालता है।",
      wrong: ["Any individual ministry (wrong — no single owner)", "Prime Minister's Office (escalation too high)", "State government (wrong — central issue)"],
    },
    other: {
      en: "Your complaint has been routed to DARPG's general grievances division which can coordinate with the appropriate ministry.",
      hi: "आपकी शिकायत DARPG के सामान्य शिकायत विभाग को भेजी गई है जो उचित मंत्रालय के साथ समन्वय कर सकता है।",
      wrong: ["Random department (wrong)", "State government (may not apply)"],
    },
  };

  const why = whyMap[type] || whyMap["other"];

  return {
    complaint_type: type,
    root_issue: `Issue requiring ${matrix.ministry} intervention`,
    correct_ministry: matrix.ministry,
    correct_department: matrix.department,
    confidence: 0.88 + Math.random() * 0.1,
    why_routed_here: why.en,
    why_routed_here_hi: why.hi,
    wrong_routes_old_system: why.wrong,
    contact: matrix.contact,
    icon: matrix.icon,
    ministry_name_hi: matrix.nameHi,
  };
}

export async function classifyComplaint(complaintText: string, apiKey?: string): Promise<RoutingResult> {
  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 1800));
    return buildMockResult(complaintText);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Complaint: "${complaintText}"` },
        ],
        temperature: 0.1,
        max_tokens: 500,
      }),
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    const type = parsed.complaint_type || "other";
    const matrix = routingMatrix[type] || routingMatrix["other"];

    return {
      ...parsed,
      contact: matrix.contact,
      icon: matrix.icon,
      ministry_name_hi: matrix.nameHi,
      why_routed_here_hi: parsed.why_routed_here_hi || buildMockResult(complaintText).why_routed_here_hi,
    };
  } catch {
    return buildMockResult(complaintText);
  }
}
