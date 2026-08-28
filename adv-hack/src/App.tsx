import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import FileComplaint from "./pages/FileComplaint";
import RoutingResult from "./pages/RoutingResult";
import Dashboard from "./pages/Dashboard";
import CaseDetail from "./pages/CaseDetail";
import Directory from "./pages/Directory";
import Appeals from "./pages/Appeals";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivacyNotice from "./pages/PrivacyNotice";
import PrivacyCentre from "./pages/PrivacyCentre";
import ConsentHistory from "./pages/ConsentHistory";
import DataAccess from "./pages/DataAccess";
import CorrectionRequest from "./pages/CorrectionRequest";
import DeletionRequest from "./pages/DeletionRequest";
import WithdrawConsent from "./pages/WithdrawConsent";
import PrivacyGrievance from "./pages/PrivacyGrievance";
import Accountability from "./pages/Accountability";
import StateDetail from "./pages/StateDetail";
import OfficerProfile from "./pages/OfficerProfile";
import Disclaimer from "./pages/Disclaimer";
import WebsitePolicies from "./pages/WebsitePolicies";
import WebInformationManager from "./pages/WebInformationManager";
import DpdpCompliance from "./pages/DpdpCompliance";
import PowDemo from "./pages/PowDemo";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200" style={{ background: "var(--background)", color: "var(--text)" }}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/file-complaint" element={<FileComplaint />} />
            <Route path="/routing-result" element={<RoutingResult />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/case/:id" element={<CaseDetail />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/appeals" element={<Appeals />} />
            <Route path="/help" element={<Help />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/approach" element={<HowItWorks />} />
            <Route path="/accountability" element={<Accountability />} />
            <Route path="/accountability/state/:stateName" element={<StateDetail />} />
            <Route path="/officer/:officerId" element={<OfficerProfile />} />
            <Route path="/privacy" element={<PrivacyNotice />} />
            <Route path="/privacy/data" element={<PrivacyCentre />} />
            <Route path="/privacy/consent" element={<ConsentHistory />} />
            <Route path="/privacy/access" element={<DataAccess />} />
            <Route path="/privacy/correction" element={<CorrectionRequest />} />
            <Route path="/privacy/delete" element={<DeletionRequest />} />
            <Route path="/privacy/withdraw" element={<WithdrawConsent />} />
            <Route path="/privacy/grievance" element={<PrivacyGrievance />} />
            <Route path="/dpdp" element={<DpdpCompliance />} />
            <Route path="/privacy/dpdp" element={<DpdpCompliance />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/website-policies" element={<WebsitePolicies />} />
            <Route path="/web-information-manager" element={<WebInformationManager />} />
            <Route path="/pow-demo" element={<PowDemo />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
