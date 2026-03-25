import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import BizDocPortal from "./pages/BizDocPortal";
import Dashboard from "./pages/Dashboard";
import CSODashboard from "./pages/CSODashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import FederalHub from "./pages/FederalHub";
import CEODashboard from "./pages/CEODashboard";
import BizDevDashboard from "./pages/BizDevDashboard";
import HRDashboard from "./pages/HRDashboard";
import SystemisePortal from "./pages/SystemisePortal";
import SkillsPortal from "./pages/SkillsPortal";
import SkillsStudent from "./pages/SkillsStudent";
import SkillsAdmin from "./pages/SkillsAdmin";
import FounderPage from "./pages/FounderPage";
import FounderDashboard from "./pages/FounderDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ConsultantPage from "./pages/ConsultantPage";
import TrackPage from "./pages/TrackPage";
import AskMePage from "./pages/AskMePage";
import AffiliatePage from "./pages/AffiliatePage";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import SkillsCEOPage from "./pages/SkillsCEOPage";
import CTOPage from "./pages/CTOPage";
import ClientDashboard from "./pages/ClientDashboard";
import CookieBanner from "./components/CookieBanner";
import DevLogin from "./pages/DevLogin";

function Router() {
  return (
    <Switch>
      {/* HAMZURY Main Hub */}
      <Route path={"/"} component={Home} />

      {/* BizDoc Department Portal */}
      <Route path={"/bizdoc"} component={BizDocPortal} />
      <Route path={"/bizdoc/dashboard"} component={Dashboard} />

      {/* Systemise Department Portal */}
      <Route path={"/systemise"} component={SystemisePortal} />

      {/* Skills Department Portal */}
      <Route path={"/skills"} component={SkillsPortal} />
      <Route path={"/skills/student"} component={SkillsStudent} />
      <Route path={"/skills/admin"} component={SkillsAdmin} />

      {/* Staff Dashboards */}
      <Route path={"/hub/ceo"} component={CEODashboard} />
      <Route path={"/hub/cso"} component={CSODashboard} />
      <Route path={"/hub/finance"} component={FinanceDashboard} />
      <Route path={"/hub/federal"} component={FederalHub} />
      <Route path={"/hub/bizdev"} component={BizDevDashboard} />
      <Route path={"/hub/hr"} component={HRDashboard} />

      {/* Client Dashboard */}
      <Route path={"/client/dashboard"} component={ClientDashboard} />

      {/* Public Tracking */}
      <Route path={"/track"} component={TrackPage} />

      {/* Affiliate Portal */}
      <Route path={"/affiliate"} component={AffiliatePage} />
      <Route path={"/affiliate/dashboard"} component={AffiliateDashboard} />

      {/* Leadership Pages */}
      <Route path={"/skills/ceo"} component={SkillsCEOPage} />
      <Route path={"/systemise/cto"} component={CTOPage} />

      {/* Info Pages */}
      <Route path={"/founder"} component={FounderPage} />
      <Route path={"/founder/dashboard"} component={FounderDashboard} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/terms"} component={TermsOfService} />
      <Route path={"/consultant"} component={ConsultantPage} />
      <Route path={"/ask"} component={AskMePage} />

      {/* Dev Login (development only) */}
      {import.meta.env.DEV && <Route path={"/dev-login"} component={DevLogin} />}

      {/* Fallback */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
