import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';
import * as UtilityConstant from '../constants/utility';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
const RouteNotFoundRedirect = React.lazy(() => import('../pages/auth/RouteNotFoundRedirect'));
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const UserLoan = React.lazy(() => import('../pages/dashboard/UserLoan'));
const AgentList = React.lazy(() => import('../pages/dashboard/AgentList'));
const UserConsent = React.lazy(() => import('../pages/dashboard/UserConsent'));
const UserKyc = React.lazy(() => import('../pages/dashboard/UserKyc'));
const AgentDashboard = React.lazy(() => import('../pages/dashboard/AgentDashboard'));
const AgentLoan = React.lazy(() => import('../pages/dashboard/AgentLoan'));
const UserLoanView = React.lazy(() => import('../pages/dashboard/UserLoanView'));
const AdminLoanView = React.lazy(() => import('../pages/dashboard/AdminLoanView'));
const AgentLoanView = React.lazy(() => import('../pages/dashboard/AgentLoanView'));
const LoanOffers = React.lazy(() => import('../pages/dashboard/LoanOffers'));
const UserList = React.lazy(() => import('../pages/dashboard/UserList'));
const AdminDashboard = React.lazy(() => import('../pages/dashboard/AdminDashboard'));
const AdminLoans = React.lazy(() => import('../pages/dashboard/AdminLoans'));
const LoanRequests = React.lazy(() => import('../pages/dashboard/LoanRequests'));
const AgentLoanRequests = React.lazy(() => import('../pages/dashboard/AgentLoanRequests'));
// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const EmailInbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
const EmailCompose = React.lazy(() => import('../pages/apps/Email/Compose'));
const ProjectList = React.lazy(() => import('../pages/apps/Project/List'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Project/Detail/'));
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List'));
const TaskBoard = React.lazy(() => import('../pages/apps/Tasks/Board'));

// pages
const Starter = React.lazy(() => import('../pages/other/Starter'));
const Profile = React.lazy(() => import('../pages/other/Profile/'));
const Activity = React.lazy(() => import('../pages/other/Activity'));
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Error404 = React.lazy(() => import('../pages/other/Error404'));
const Error500 = React.lazy(() => import('../pages/other/Error500'));
//KYC Details From
const KYCDetailsForm = React.lazy(() => import('../pages/userDetails/KycDetailForm'));

// ui
const BSComponents = React.lazy(() => import('../pages/uikit/BSComponents/'));
const FeatherIcons = React.lazy(() => import('../pages/uikit/Icons/Feather'));
const UniconsIcons = React.lazy(() => import('../pages/uikit/Icons/Unicons'));
const Widgets = React.lazy(() => import('../pages/uikit/Widgets/'));

// charts
const Charts = React.lazy(() => import('../pages/charts/'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editor = React.lazy(() => import('../pages/forms/Editor'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

const FormApplication = React.lazy(() => import('../pages/dashboard/ApplicationForm'));



const Home = React.lazy(() => import('../pages/dashboard/Home'));

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();

            console.log(props.location.pathname);

            // if (
            //     loggedInUser.kycStatus === UtilityConstant.KYC_STATUS_PENDING &&
            //     props.location.pathname !== UtilityConstant.KYC_PAGE_URL
            // ) {
                
            //     return <Redirect to={{ pathname: '/kyc-details', state: { from: props.location } }} />;
            // }
            // First check if loggedInUser.role contains more then 1 role
            // check if route is restricted by role
            
            if (roles && roles.indexOf(loggedInUser.role[0]) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />;
            } else if (props.location.pathname == '/') {
                return <Redirect to={{ pathname: `/${loggedInUser.role[0]}/dashboard` }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
    path: '/user/dashboard',
    name: 'Home',
    icon: FeatherIcon.Home,
    component: Home,
    roles: ['user'],
    route: PrivateRoute,
};

const fundingRoutes = {
    path: '/funding',
    name: 'Funding',
    icon: FeatherIcon.Star,
    component: FormApplication,
    roles: ['user'],
    route: PrivateRoute,
};

const dashboardAdminRoutes = {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: FeatherIcon.Home,
    component: Dashboard,
    roles: ['admin'],
    route: PrivateRoute,
};

// const dashboardLoanRoutes = {
//     path: '/user/loan',
//     name: 'Loan',
//     icon: FeatherIcon.DollarSign,
//     component: UserLoan,
//     route: PrivateRoute,
//     roles: ['Admin'],
// };

const dashboardConsentRoutes = {
    path: '/user/consent',
    // name: 'Consent',
    // icon: FeatherIcon.Check,
    component: UserConsent,
    route: PrivateRoute,
    roles: ['user'],
};

const dashboardKycRoutes = {
    path: '/user/kyc',
    // name: 'KYC',
    // icon: FeatherIcon.Eye,
    component: UserKyc,
    route: PrivateRoute,
    roles: ['user'],
};

const dashboardUserLoanRequest = {
    path: '/user/company',
    name: 'Company',
    icon: FeatherIcon.Briefcase,
    children: [
        {
            path: '/user/company/company-setting',
            name: 'Company Settings',
            component: FormApplication,
            route: PrivateRoute,
            roles: ['user'],
        },
        {
            path: '/user/company/digital-contracts',
            name: 'Digital Contracts',
            component: FormApplication,
            route: PrivateRoute,
            roles: ['user'],
        },
        {
            path: '/user/company/client-auto-signup',
            name: 'Client Auto Signup',
            component: FormApplication,
            route: PrivateRoute,
            roles: ['user'],
        },
        {
            path: '/user/company/quick-import-credit-analysis',
            name: 'Quick Import/credit Analysis',
            component: FormApplication,
            route: PrivateRoute,
            roles: ['user'],
        },
        {
            path: '/user/company/manage-emails',
            name: 'Manage Emails',
            component: FormApplication,
            route: PrivateRoute,
            roles: ['user'],
        },
        {
            path: '/user/company/notification-automation',
            name: 'Notification Automation',
            component: FormApplication,
            route: PrivateRoute,
            roles: ['user'],
        },
        {
            path: '/user/company/employee-outsourcers',
            name: 'Employee Outsourcers',
            component: FormApplication,
            route: PrivateRoute,
            roles: ['user'],
        },
    ],
};


const applicationFormRequest = {

};

const clientInformationSheet = {

};

const enhancedDueDiligence = {

};

const connectQuickbook = {
    path: '/user/loan/quickbook',
    name: 'Connect Quickbooks',
    icon: FeatherIcon.Share,
    component: FormApplication,
    route: PrivateRoute,
    roles: ['user'],
};


const dashboardAgentRoutes = {
    path: '/agent/dashboard',
    name: 'Dashboard',
    icon: FeatherIcon.Home,
    component: AgentDashboard,
    route: PrivateRoute,
    roles: ['agent'],
};

const dashboardSubAgentRoutes = {
    path: '/sub-agent/dashboard',
    name: 'Dashboard',
    icon: FeatherIcon.Home,
    component: AgentDashboard,
    route: PrivateRoute,
    roles: ['sub-agent'],
};

const dashboardAgentsRoutes = {
    path: '/agent/agents',
    name: 'Agents',
    icon: FeatherIcon.Users,
    component: AgentList,
    route: PrivateRoute,
    roles: ['agent'],
};

const dashboardAgentsUserListRoutes = {
    path: '/agent/users',
    name: 'Users',
    icon: FeatherIcon.Users,
    component: UserList,
    route: PrivateRoute,
    roles: ['agent', 'sub-agent'],
};

const dashboardAgentsLoanRoutes = {
    path: '/agent/loans',
    name: 'Loan',
    icon: FeatherIcon.DollarSign,
    component: AgentLoan,
    route: PrivateRoute,
    roles: ['Admin'],
};

const dashboardAdminLoanOffers = {
    path: '/loan/offers',
    name: 'Loan Offers',
    icon: FeatherIcon.Briefcase,
    component: LoanOffers,
    route: PrivateRoute,
    roles: ['admin'],
};

const dashboardAdminLoansRoutes = {
    path: '/admin/loans',
    name: 'Loan',
    icon: FeatherIcon.DollarSign,
    component: AdminLoans,
    route: PrivateRoute,
    roles: ['admin'],
};

// apps

const calendarAppRoutes = {
    path: '/apps/calendar',
    name: 'Calendar',
    header: 'Apps',
    icon: FeatherIcon.Calendar,
    component: CalendarApp,
    route: PrivateRoute,
    roles: ['Admin'],
};

const emailAppRoutes = {
    path: '/apps/email',
    name: 'Email',
    icon: FeatherIcon.Inbox,
    children: [
        {
            path: '/apps/email/inbox',
            name: 'Inbox',
            component: EmailInbox,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/email/details',
            name: 'Details',
            component: EmailDetail,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/email/compose',
            name: 'Compose',
            component: EmailCompose,
            route: PrivateRoute,
            roles: ['Admin'],
        },
    ],
};

const projectAppRoutes = {
    path: '/apps/projects',
    name: 'Projects',
    icon: FeatherIcon.Briefcase,
    children: [
        {
            path: '/apps/projects/list',
            name: 'List',
            component: ProjectList,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/projects/detail',
            name: 'Detail',
            component: ProjectDetail,
            route: PrivateRoute,
            roles: ['Admin'],
        },
    ],
};

const taskAppRoutes = {
    path: '/apps/tasks',
    name: 'Tasks',
    icon: FeatherIcon.Bookmark,
    children: [
        {
            path: '/apps/tasks/list',
            name: 'List',
            component: TaskList,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/tasks/board',
            name: 'Board',
            component: TaskBoard,
            route: PrivateRoute,
            roles: ['Admin'],
        },
    ],
};

const appRoutes = [ emailAppRoutes];

const profile = {
    path: '/setting',
    name: 'Setting',
    component: Profile,
    route: PrivateRoute,
    icon : FeatherIcon.Settings,
    roles: ['user', 'admin', 'agent', 'sub-agent'],
};

// pages
const pagesRoutes = {
    path: '/pages',
    name: 'Pages',
    header: 'Custom',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/pages/starter',
            name: 'Starter',
            component: Starter,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/profile',
            name: 'Profile',
            component: Profile,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/activity',
            name: 'Activity',
            component: Activity,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/invoice',
            name: 'Invoice',
            component: Invoice,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/pricing',
            name: 'Pricing',
            component: Pricing,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/error-404',
            name: 'Error 404',
            component: Error404,
            route: Route,
        },
        {
            path: '/pages/error-500',
            name: 'Error 500',
            component: Error500,
            route: Route,
        },
    ],
};

const userDetailsRoutes = {
    path: '/kyc-details',
    name: 'KYC-Details',
    component: KYCDetailsForm,
    route: PrivateRoute,
    roles: ['admin', 'user', 'agent', 'sub-agent'],
};

const dashboardUserLoanViewRoutes = {
    path: '/user/loan/view',
    // name: 'Loan View',
    // icon: FeatherIcon.DollarSign,
    component: UserLoanView,
    route: PrivateRoute,
    roles: ['admin', 'user'],
};

const dashboardAdminLoanViewRoutes = {
    path: '/admin/loan/view',
    // name: 'Loan View',
    // icon: FeatherIcon.DollarSign,
    component: AdminLoanView,
    route: PrivateRoute,
    roles: ['admin'],
};

const dashboardAgentsLoanViewRoutes = {
    path: '/agent/loan/view',
    // name: 'Loan View',
    // icon: FeatherIcon.DollarSign,
    component: AgentLoanView,
    route: PrivateRoute,
    roles: ['agent', 'sub-agent'],
};

const dashboardAgentLoanRequests = {
    path: '/agent/loan/request',
    // name: 'Loan Request',
    // icon: FeatherIcon.DollarSign,
    component: AgentLoanRequests,
    route: PrivateRoute,
    roles: ['agent', 'sub-agent'],
};

// components
const componentsRoutes = {
    path: '/ui',
    name: 'UI Elements',
    header: 'Components',
    icon: FeatherIcon.Package,
    children: [
        {
            path: '/ui/bscomponents',
            name: 'Bootstrap UI',
            component: BSComponents,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/ui/icons',
            name: 'Icons',
            children: [
                {
                    path: '/ui/icons/feather',
                    name: 'Feather Icons',
                    component: FeatherIcons,
                    route: PrivateRoute,
                    roles: ['Admin'],
                },
                {
                    path: '/ui/icons/unicons',
                    name: 'Unicons Icons',
                    component: UniconsIcons,
                    route: PrivateRoute,
                    roles: ['Admin'],
                },
            ],
        },
        {
            path: '/ui/widgets',
            name: 'Widgets',
            component: Widgets,
            route: PrivateRoute,
            roles: ['Admin'],
        },
    ],
};

// charts
const chartRoutes = {
    path: '/charts',
    name: 'Charts',
    component: Charts,
    icon: FeatherIcon.PieChart,
    roles: ['Admin'],
    route: PrivateRoute,
};

// forms
const formsRoutes = {
    path: '/forms',
    name: 'Forms',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/forms/basic',
            name: 'Basic Elements',
            component: BasicForms,
            route: PrivateRoute,
        },
        {
            path: '/forms/advanced',
            name: 'Advanced',
            component: FormAdvanced,
            route: PrivateRoute,
        },
        {
            path: '/forms/validation',
            name: 'Validation',
            component: FormValidation,
            route: PrivateRoute,
        },
        {
            path: '/forms/wizard',
            name: 'Wizard',
            component: FormWizard,
            route: PrivateRoute,
        },
        {
            path: '/forms/editor',
            name: 'Editor',
            component: Editor,
            route: PrivateRoute,
        },
        {
            path: '/forms/upload',
            name: 'File Upload',
            component: FileUpload,
            route: PrivateRoute,
        },
    ],
};

const tableRoutes = {
    path: '/tables',
    name: 'Tables',
    icon: FeatherIcon.Grid,
    children: [
        {
            path: '/tables/basic',
            name: 'Basic',
            component: BasicTables,
            route: PrivateRoute,
        },
        {
            path: '/tables/advanced',
            name: 'Advanced',
            component: AdvancedTables,
            route: PrivateRoute,
        },
    ],
};

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
    ],
};

const noPageFound = {
    path: '/*',
    name: '404',
    component: RouteNotFoundRedirect,
    route: Route,
};

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    dashboardRoutes,
    dashboardUserLoanRequest,
    fundingRoutes,
    // connectQuickbook,
    // dashboardLoanRoutes,
    dashboardAgentRoutes,
    dashboardSubAgentRoutes,
    dashboardAgentsRoutes,
    dashboardAgentsUserListRoutes,
    dashboardAgentsLoanRoutes,
    dashboardAgentsLoanViewRoutes,
    dashboardAdminRoutes,
    dashboardAdminLoanOffers,
    dashboardAdminLoansRoutes,
    ...appRoutes,
    // profile,
    // pagesRoutes,
    componentsRoutes,
    chartRoutes,
    formsRoutes,
    tableRoutes,
    authRoutes,
    userDetailsRoutes,
    dashboardUserLoanViewRoutes,
    dashboardAdminLoanViewRoutes,
    dashboardAgentLoanRequests,
    noPageFound
    
];

const authProtectedRoutes = [
    dashboardRoutes,
    dashboardUserLoanRequest,
    fundingRoutes,
    // connectQuickbook,
    // profile,
    // dashboardLoanRoutes,
   
    dashboardAgentRoutes,
    dashboardSubAgentRoutes,
    dashboardAgentsRoutes,
    dashboardAgentsUserListRoutes,
    dashboardAgentsLoanRoutes,
    dashboardAgentsLoanViewRoutes,
    dashboardAdminRoutes,
    dashboardAdminLoanOffers,
    dashboardAdminLoansRoutes
  
    //  ...appRoutes,
    //  pagesRoutes,
    // componentsRoutes,
    // chartRoutes, formsRoutes, tableRoutes
];

// // All routes
// const allRoutes = [
//     ...roleSpecificRoutes,
//     rootRoute,
//     // dashboardLoanRoutes,
//     dashboardUserLoanRequest,
//     dashboardAgentsUserListRoutes,
//     dashboardAgentsLoanViewRoutes,
//     ...appRoutes,
//     profile,
//     // pagesRoutes,
//     componentsRoutes,
//     chartRoutes,
//     formsRoutes,
//     tableRoutes,
//     authRoutes,
//     userDetailsRoutes,
//     dashboardUserLoanViewRoutes,
//     dashboardAdminLoanViewRoutes,
//     noPageFound,
// ];

// const authProtectedRoutes = [
//     // dashboardLoanRoutes,
//     ...roleSpecificRoutes,
//     dashboardUserLoanRequest,
//     //  ...appRoutes,
//     //  pagesRoutes,
//     // componentsRoutes,
//     // chartRoutes, formsRoutes, tableRoutes
// ];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
