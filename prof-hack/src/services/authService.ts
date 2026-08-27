export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  preferredLanguage: string;
  createdAt: string;
}

export interface ConsentRecord {
  id: string;
  userId: string;
  purpose: string;
  noticeVersion: string;
  language: string;
  status: "active" | "withdrawn";
  consentedAt: string;
  withdrawnAt?: string;
  method: string;
}

export interface PrivacyRequest {
  id: string;
  userId: string;
  type: "access" | "correction" | "deletion" | "grievance";
  description: string;
  status: "submitted" | "in_review" | "resolved";
  createdAt: string;
}

const MOCK_USERS: User[] = [
  {
    id: "user_001",
    name: "Rahul Sharma",
    mobile: "+91 98765 43210",
    email: "rahul@example.com",
    preferredLanguage: "hi",
    createdAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "user_002",
    name: "Priya Patel",
    mobile: "+91 87654 32109",
    email: "priya@example.com",
    preferredLanguage: "en",
    createdAt: "2026-07-15T14:30:00Z",
  },
];

let sessionUser: User | null = null;

export function getSessionUser(): User | null {
  return sessionUser;
}

export function setSessionUser(user: User | null) {
  sessionUser = user;
}

export function getUserById(id: string): User | undefined {
  return MOCK_USERS.find((u) => u.id === id);
}

export function findUserByContact(contact: string): User | undefined {
  return MOCK_USERS.find(
    (u) => u.mobile.replace(/\s/g, "").includes(contact.replace(/\s/g, "")) || u.email === contact
  );
}

export function createUser(data: { name: string; mobile: string; email: string; preferredLanguage: string }): User {
  const newUser: User = {
    id: `user_${Date.now()}`,
    name: data.name,
    mobile: data.mobile,
    email: data.email,
    preferredLanguage: data.preferredLanguage,
    createdAt: new Date().toISOString(),
  };
  MOCK_USERS.push(newUser);
  return newUser;
}

export function updateUser(id: string, updates: Partial<Pick<User, "name" | "email" | "preferredLanguage">>): User | null {
  const user = MOCK_USERS.find((u) => u.id === id);
  if (!user) return null;
  Object.assign(user, updates);
  return user;
}

const MOCK_OTP = "123456";

export async function sendOtp(contact: string): Promise<{ success: boolean; masked: string }> {
  await new Promise((r) => setTimeout(r, 800));
  const isEmail = contact.includes("@");
  const masked = isEmail
    ? contact.replace(/(.{2})(.*)(@.*)/, "$1***$3")
    : contact.replace(/(\+?\d{2,3})\s?\d{5}(\d{5})/, "$1 XXXXX $2");
  return { success: true, masked };
}

export async function verifyOtp(otp: string): Promise<{ success: boolean; error?: string }> {
  await new Promise((r) => setTimeout(r, 600));
  if (otp === MOCK_OTP) return { success: true };
  if (otp === "999999") return { success: false, error: "expired" };
  return { success: false, error: "invalid" };
}

const CONSENT_STORE: ConsentRecord[] = [
  {
    id: "consent_001",
    userId: "user_001",
    purpose: "Account authentication",
    noticeVersion: "v1.2",
    language: "Hindi",
    status: "active",
    consentedAt: "2026-06-01T10:05:00Z",
    method: "OTP + affirmative consent",
  },
  {
    id: "consent_002",
    userId: "user_001",
    purpose: "Optional notifications",
    noticeVersion: "v1.2",
    language: "Hindi",
    status: "active",
    consentedAt: "2026-06-01T10:05:30Z",
    method: "Affirmative checkbox",
  },
  {
    id: "consent_003",
    userId: "user_002",
    purpose: "Account authentication",
    noticeVersion: "v1.2",
    language: "English",
    status: "active",
    consentedAt: "2026-07-15T14:35:00Z",
    method: "OTP + affirmative consent",
  },
];

export function getConsentRecords(userId: string): ConsentRecord[] {
  return CONSENT_STORE.filter((c) => c.userId === userId);
}

export function addConsentRecord(record: Omit<ConsentRecord, "id">): ConsentRecord {
  const newRecord: ConsentRecord = { id: `consent_${Date.now()}`, ...record };
  CONSENT_STORE.push(newRecord);
  return newRecord;
}

export function withdrawConsent(consentId: string, userId: string): boolean {
  const record = CONSENT_STORE.find((c) => c.id === consentId && c.userId === userId);
  if (!record || record.purpose === "Account authentication") return false;
  record.status = "withdrawn";
  record.withdrawnAt = new Date().toISOString();
  return true;
}

const PRIVACY_REQUESTS: PrivacyRequest[] = [];

export function submitPrivacyRequest(req: Omit<PrivacyRequest, "id" | "createdAt" | "status">): PrivacyRequest {
  const newReq: PrivacyRequest = {
    id: `req_${Date.now()}`,
    status: "submitted",
    createdAt: new Date().toISOString(),
    ...req,
  };
  PRIVACY_REQUESTS.push(newReq);
  return newReq;
}

export function getPrivacyRequests(userId: string): PrivacyRequest[] {
  return PRIVACY_REQUESTS.filter((r) => r.userId === userId);
}
