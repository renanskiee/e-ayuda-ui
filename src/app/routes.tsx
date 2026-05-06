import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import MswdoHeadLayout from "./components/MswdoHeadLayout";
import SectorLayout from "./components/SectorLayout";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import NewApplication from "./pages/NewApplication";
import ValidationQueue from "./pages/ValidationQueue";
import ForwardedApplications from "./pages/ForwardedApplications";
import ResidentsDatabase from "./pages/ResidentsDatabase";
import Reports from "./pages/Reports";
import WalkInRegistration from "./pages/WalkInRegistration";

// MSWDO Head Pages
import MswdoHeadDashboard from "./pages/mswdo-head/MswdoHeadDashboard";
import SectorMonitoring from "./pages/mswdo-head/SectorMonitoring";
import AwaitingApproval from "./pages/mswdo-head/AwaitingApproval";
import Disbursement from "./pages/mswdo-head/Disbursement";
import BeneficiaryDatabase from "./pages/mswdo-head/BeneficiaryDatabase";
import DuplicateDetection from "./pages/mswdo-head/DuplicateDetection";
import ProgramCreation from "./pages/mswdo-head/ProgramCreation";
import ProgramManagement from "./pages/mswdo-head/ProgramManagement";
import BudgetAllocation from "./pages/mswdo-head/BudgetAllocation";
import GADReports from "./pages/mswdo-head/GADReports";
import SystemReports from "./pages/mswdo-head/SystemReports";
import Settings from "./pages/mswdo-head/Settings";

// Senior Citizen Sector Pages
import SeniorCitizenDashboard from "./pages/sector/senior-citizen/SeniorCitizenDashboard";
import ReceivedApplications from "./pages/sector/senior-citizen/ReceivedApplications";
import EvaluationQueue from "./pages/sector/senior-citizen/EvaluationQueue";
import ApprovedBeneficiaries from "./pages/sector/senior-citizen/ApprovedBeneficiaries";
import BeneficiaryRecords from "./pages/sector/senior-citizen/BeneficiaryRecords";
import FundMonitoring from "./pages/sector/senior-citizen/FundMonitoring";
import TransactionHistory from "./pages/sector/senior-citizen/TransactionHistory";
import SectorReports from "./pages/sector/senior-citizen/SectorReports";

// PWD Sector Pages
import PwdDashboard from "./pages/sector/pwd/PwdDashboard";
import PwdReceivedApplications from "./pages/sector/pwd/ReceivedApplications";
import PwdEvaluationQueue from "./pages/sector/pwd/EvaluationQueue";
import PwdApprovedBeneficiaries from "./pages/sector/pwd/ApprovedBeneficiaries";
import PwdBeneficiaryRecords from "./pages/sector/pwd/BeneficiaryRecords";
import PwdFundMonitoring from "./pages/sector/pwd/FundMonitoring";
import PwdTransactionHistory from "./pages/sector/pwd/TransactionHistory";
import PwdSectorReports from "./pages/sector/pwd/SectorReports";

// Solo Parent Sector Pages
import SoloParentDashboard from "./pages/sector/solo-parent/SoloParentDashboard";
import SoloParentReceivedApplications from "./pages/sector/solo-parent/ReceivedApplications";
import SoloParentEvaluationQueue from "./pages/sector/solo-parent/EvaluationQueue";
import SoloParentApprovedBeneficiaries from "./pages/sector/solo-parent/ApprovedBeneficiaries";
import SoloParentBeneficiaryRecords from "./pages/sector/solo-parent/BeneficiaryRecords";
import SoloParentFundMonitoring from "./pages/sector/solo-parent/FundMonitoring";
import SoloParentTransactionHistory from "./pages/sector/solo-parent/TransactionHistory";
import SoloParentSectorReports from "./pages/sector/solo-parent/SectorReports";

// Women Sector Pages
import WomenDashboard from "./pages/sector/women/WomenDashboard";
import WomenReceivedApplications from "./pages/sector/women/ReceivedApplications";
import WomenEvaluationQueue from "./pages/sector/women/EvaluationQueue";
import WomenApprovedBeneficiaries from "./pages/sector/women/ApprovedBeneficiaries";
import WomenBeneficiaryRecords from "./pages/sector/women/BeneficiaryRecords";
import WomenFundMonitoring from "./pages/sector/women/FundMonitoring";
import WomenTransactionHistory from "./pages/sector/women/TransactionHistory";
import WomenSectorReports from "./pages/sector/women/SectorReports";

// Youth/Children Sector Pages
import YouthDashboard from "./pages/sector/youth/YouthDashboard";
import YouthReceivedApplications from "./pages/sector/youth/ReceivedApplications";
import YouthEvaluationQueue from "./pages/sector/youth/EvaluationQueue";
import YouthApprovedBeneficiaries from "./pages/sector/youth/ApprovedBeneficiaries";
import YouthBeneficiaryRecords from "./pages/sector/youth/BeneficiaryRecords";
import YouthFundMonitoring from "./pages/sector/youth/FundMonitoring";
import YouthTransactionHistory from "./pages/sector/youth/TransactionHistory";
import YouthSectorReports from "./pages/sector/youth/SectorReports";

// ECCD Sector Pages
import EccdDashboard from "./pages/sector/eccd/EccdDashboard";
import EccdReceivedApplications from "./pages/sector/eccd/ReceivedApplications";
import EccdEvaluationQueue from "./pages/sector/eccd/EvaluationQueue";
import EccdApprovedBeneficiaries from "./pages/sector/eccd/ApprovedBeneficiaries";
import EccdBeneficiaryRecords from "./pages/sector/eccd/BeneficiaryRecords";
import EccdFundMonitoring from "./pages/sector/eccd/FundMonitoring";
import EccdTransactionHistory from "./pages/sector/eccd/TransactionHistory";
import EccdSectorReports from "./pages/sector/eccd/SectorReports";

// Sectorial Module Pages
import SectorialLayout from "./components/SectorialLayout";
import SectorialDashboard from "./pages/sectorial/SectorialDashboard";
import CentralBeneficiaryDatabase from "./pages/sectorial/CentralBeneficiaryDatabase";
import AssistanceHistory from "./pages/sectorial/AssistanceHistory";
import SectorialReports from "./pages/sectorial/SectorialReports";
import SectorialSettings from "./pages/sectorial/SectorialSettings";

// Disbursement Module Pages
import DisbursementLayout from "./components/DisbursementLayout";
import DisbursementAuthorizationDashboard from "./pages/disbursement/DisbursementAuthorizationDashboard";
import PayoutOfficerDashboard from "./pages/disbursement/PayoutOfficerDashboard";
import PayoutMonitoringDashboard from "./pages/disbursement/PayoutMonitoringDashboard";
import TransactionLog from "./pages/disbursement/TransactionLog";
import TreasurerDashboard from "./pages/disbursement/TreasurerDashboard";
import LiquidationReportGenerator from "./pages/disbursement/LiquidationReportGenerator";
import FinalAuditReport from "./pages/disbursement/FinalAuditReport";

// Disbursement Officer Pages
import DisbursementOfficerLayout from "./components/DisbursementOfficerLayout";
import DisbursementDashboard from "./pages/disbursement-officer/DisbursementDashboard";
import AuthorizedBeneficiaries from "./pages/disbursement-officer/AuthorizedBeneficiaries";
import QRVerification from "./pages/disbursement-officer/QRVerification";
import PayoutProcessing from "./pages/disbursement-officer/PayoutProcessing";
import DisbursementOfficerTransactionLog from "./pages/disbursement-officer/TransactionLog";
import DisbursementReports from "./pages/disbursement-officer/DisbursementReports";

// Treasurer Pages
import TreasurerLayout from "./components/TreasurerLayout";
import TreasurerDashboardPage from "./pages/treasurer/TreasurerDashboard";
import TreasurerFundMonitoring from "./pages/treasurer/FundMonitoring";
import ProgramUtilization from "./pages/treasurer/ProgramUtilization";
import TransactionRecords from "./pages/treasurer/TransactionRecords";
import LiquidationReports from "./pages/treasurer/LiquidationReports";
import AuditReports from "./pages/treasurer/AuditReports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "applications", Component: Applications },
      { path: "new-application", Component: NewApplication },
      { path: "walk-in-registration", Component: WalkInRegistration },
      { path: "validation-queue", Component: ValidationQueue },
      { path: "forwarded-applications", Component: ForwardedApplications },
      { path: "residents-database", Component: ResidentsDatabase },
      { path: "reports", Component: Reports },
    ],
  },
  {
    path: "/mswdo-head",
    Component: MswdoHeadLayout,
    children: [
      { path: "dashboard", Component: MswdoHeadDashboard },
      { path: "sector-monitoring", Component: SectorMonitoring },
      { path: "awaiting-approval", Component: AwaitingApproval },
      { path: "disbursement", Component: Disbursement },
      { path: "beneficiary-database", Component: BeneficiaryDatabase },
      { path: "duplicate-detection", Component: DuplicateDetection },
      { path: "program-creation", Component: ProgramCreation },
      { path: "program-management", Component: ProgramManagement },
      { path: "budget-allocation", Component: BudgetAllocation },
      { path: "gad-reports", Component: GADReports },
      { path: "system-reports", Component: SystemReports },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/sector/senior-citizen",
    element: <SectorLayout sectorName="Senior Citizen" />,
    children: [
      { index: true, Component: SeniorCitizenDashboard },
      { path: "applications", Component: ReceivedApplications },
      { path: "evaluation", Component: EvaluationQueue },
      { path: "approved", Component: ApprovedBeneficiaries },
      { path: "records", Component: BeneficiaryRecords },
      { path: "funds", Component: FundMonitoring },
      { path: "transactions", Component: TransactionHistory },
      { path: "reports", Component: SectorReports },
    ],
  },
  {
    path: "/sector/pwd",
    element: <SectorLayout sectorName="PWD" />,
    children: [
      { index: true, Component: PwdDashboard },
      { path: "applications", Component: PwdReceivedApplications },
      { path: "evaluation", Component: PwdEvaluationQueue },
      { path: "approved", Component: PwdApprovedBeneficiaries },
      { path: "records", Component: PwdBeneficiaryRecords },
      { path: "funds", Component: PwdFundMonitoring },
      { path: "transactions", Component: PwdTransactionHistory },
      { path: "reports", Component: PwdSectorReports },
    ],
  },
  {
    path: "/sector/solo-parent",
    element: <SectorLayout sectorName="Solo Parent" />,
    children: [
      { index: true, Component: SoloParentDashboard },
      { path: "applications", Component: SoloParentReceivedApplications },
      { path: "evaluation", Component: SoloParentEvaluationQueue },
      { path: "approved", Component: SoloParentApprovedBeneficiaries },
      { path: "records", Component: SoloParentBeneficiaryRecords },
      { path: "funds", Component: SoloParentFundMonitoring },
      { path: "transactions", Component: SoloParentTransactionHistory },
      { path: "reports", Component: SoloParentSectorReports },
    ],
  },
  {
    path: "/sector/women",
    element: <SectorLayout sectorName="Women" />,
    children: [
      { index: true, Component: WomenDashboard },
      { path: "applications", Component: WomenReceivedApplications },
      { path: "evaluation", Component: WomenEvaluationQueue },
      { path: "approved", Component: WomenApprovedBeneficiaries },
      { path: "records", Component: WomenBeneficiaryRecords },
      { path: "funds", Component: WomenFundMonitoring },
      { path: "transactions", Component: WomenTransactionHistory },
      { path: "reports", Component: WomenSectorReports },
    ],
  },
  {
    path: "/sector/youth",
    element: <SectorLayout sectorName="Youth/Children" />,
    children: [
      { index: true, Component: YouthDashboard },
      { path: "applications", Component: YouthReceivedApplications },
      { path: "evaluation", Component: YouthEvaluationQueue },
      { path: "approved", Component: YouthApprovedBeneficiaries },
      { path: "records", Component: YouthBeneficiaryRecords },
      { path: "funds", Component: YouthFundMonitoring },
      { path: "transactions", Component: YouthTransactionHistory },
      { path: "reports", Component: YouthSectorReports },
    ],
  },
  {
    path: "/sector/eccd",
    element: <SectorLayout sectorName="ECCD" />,
    children: [
      { index: true, Component: EccdDashboard },
      { path: "applications", Component: EccdReceivedApplications },
      { path: "evaluation", Component: EccdEvaluationQueue },
      { path: "approved", Component: EccdApprovedBeneficiaries },
      { path: "records", Component: EccdBeneficiaryRecords },
      { path: "funds", Component: EccdFundMonitoring },
      { path: "transactions", Component: EccdTransactionHistory },
      { path: "reports", Component: EccdSectorReports },
    ],
  },
  {
    path: "/sectorial",
    element: <SectorialLayout />,
    children: [
      { index: true, Component: SectorialDashboard },
      { path: "beneficiaries", Component: CentralBeneficiaryDatabase },
      { path: "history", Component: AssistanceHistory },
      { path: "reports", Component: SectorialReports },
      { path: "settings", Component: SectorialSettings },
    ],
  },
  {
    path: "/disbursement",
    Component: DisbursementLayout,
    children: [
      { path: "authorization", Component: DisbursementAuthorizationDashboard },
      { path: "payout", Component: PayoutOfficerDashboard },
      { path: "monitoring", Component: PayoutMonitoringDashboard },
      { path: "transactions", Component: TransactionLog },
      { path: "treasurer", Component: TreasurerDashboard },
      { path: "liquidation", Component: LiquidationReportGenerator },
      { path: "audit", Component: FinalAuditReport },
    ],
  },
  {
    path: "/disbursement-officer",
    Component: DisbursementOfficerLayout,
    children: [
      { index: true, Component: DisbursementDashboard },
      { path: "dashboard", Component: DisbursementDashboard },
      { path: "authorized", Component: AuthorizedBeneficiaries },
      { path: "qr-verification", Component: QRVerification },
      { path: "payout", Component: PayoutProcessing },
      { path: "payout-processing", Component: PayoutProcessing },
      { path: "transactions", Component: DisbursementOfficerTransactionLog },
      { path: "reports", Component: DisbursementReports },
    ],
  },
  {
    path: "/treasurer",
    Component: TreasurerLayout,
    children: [
      { index: true, Component: TreasurerDashboardPage },
      { path: "dashboard", Component: TreasurerDashboardPage },
      { path: "funds", Component: TreasurerFundMonitoring },
      { path: "utilization", Component: ProgramUtilization },
      { path: "transactions", Component: TransactionRecords },
      { path: "liquidation", Component: LiquidationReports },
      { path: "audit", Component: AuditReports },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);