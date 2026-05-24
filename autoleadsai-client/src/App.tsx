import './App.css'

import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import ErrorPage from './ErrorPage.tsx'
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx'   // <-- new import

// ------------------------------------------------------------
// Lazy load the Dashboard (placeholder – replace with real path)
// ------------------------------------------------------------
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage.tsx'))

// ------------------------------------------------------------
// Loading spinner (same as before)
// ------------------------------------------------------------
const Loading = () => (
  <div className="loading-overlay" role="status" aria-live="polite">
    <div className="loading-card">
      <h1 className="loading-title text-xl sm:text-2xl font-black tracking-tight">
        Auto<span className="loading-accent">Leads AI</span>
      </h1>
    </div>
  </div>
)

// ------------------------------------------------------------
// Helper to wrap a lazy component with Suspense
// ------------------------------------------------------------
const renderPage = (Component: LazyExoticComponent<ComponentType>) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)

// ------------------------------------------------------------
// Protected route – redirects to /login if not authenticated
// ------------------------------------------------------------
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth()
  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace />
  return children
}

// ------------------------------------------------------------
// Public-only route – redirects to /dashboard if already logged in
// ------------------------------------------------------------
const PublicOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth()
  if (loading) return <Loading />
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

// ------------------------------------------------------------
// Lazy imports for all landing / content pages (unchanged)
// ------------------------------------------------------------
const LandingPage = lazy(() => import('./pages/landingPages/LandingPage.tsx'))
const FeaturesPage = lazy(() => import('./pages/landingPages/Features.tsx'))
const LoginPage = lazy(() => import('./pages/landingPages/LoginPage.tsx'))
const SignupPage = lazy(() => import('./pages/landingPages/SignupPage.tsx'))
const HowItWorksPage = lazy(() => import('./pages/landingPages/HowItWorks.tsx'))
const PricingPage = lazy(() => import('./pages/landingPages/Pricing.tsx'))
const FAQPage = lazy(() => import('./pages/landingPages/FAQ.tsx'))
const AboutPage = lazy(() => import('./pages/landingPages/About.tsx'))
const ContactPage = lazy(() => import('./pages/landingPages/Contact.tsx'))
const BlogPage = lazy(() => import('./pages/landingPages/Blog.tsx'))
const GuidesPage = lazy(() => import('./pages/landingPages/Guides.tsx'))
const IntegrationsPage = lazy(() => import('./pages/landingPages/Integration.tsx'))
const ChangelogPage = lazy(() => import('./pages/landingPages/Changelog.tsx'))
const DocsPage = lazy(() => import('./pages/landingPages/Docs.tsx'))
const HelpCenterPage = lazy(() => import('./pages/landingPages/HelpCenter.tsx'))
const PrivacyPolicyPage = lazy(() => import('./pages/landingPages/PrivacyPolicy.tsx'))
const Privacy = lazy(() => import('./pages/landingPages/Privacy.tsx'))
const TermsPage = lazy(() => import('./pages/landingPages/Terms.tsx'))
const CookiesPage = lazy(() => import('./pages/landingPages/Cookies.tsx'))
const AnalyticsIntegrationPage = lazy(() => import('./pages/integrationPages/Analytics.tsx'))
const CloudServiceIntegrationPage = lazy(() => import('./pages/integrationPages/CloudService.tsx'))
const DiscordIntegrationPage = lazy(() => import('./pages/integrationPages/Discord.tsx'))
const EmailProviderIntegrationPage = lazy(() => import('./pages/integrationPages/EmailProvider.tsx'))
const GoogleWorkspaceIntegrationPage = lazy(() => import('./pages/integrationPages/GoogleWorkSpace.tsx'))
const LinkedinIntegrationPage = lazy(() => import('./pages/integrationPages/LinkedinIntegration.tsx'))
const N8NIntegrationPage = lazy(() => import('./pages/integrationPages/N8N.tsx'))
const PaymentIntegrationPage = lazy(() => import('./pages/integrationPages/Payment.tsx'))
const PostgresIntegrationPage = lazy(() => import('./pages/integrationPages/Postgres.tsx'))
const RedditIntegrationPage = lazy(() => import('./pages/integrationPages/Reddit.tsx'))
const SlackIntegrationPage = lazy(() => import('./pages/integrationPages/Slack.tsx'))
const TwitterIntegrationPage = lazy(() => import('./pages/integrationPages/Twitter.tsx'))
const AIautomation = lazy(() => import('./pages/blogPages/AIautomation.tsx'))
const RedditLeadBlog = lazy(() => import('./pages/blogPages/Reddit.tsx'))
const AutomationOutreachBlog = lazy(() => import('./pages/blogPages/Automation.tsx'))
const LinkedInProspectingBlog = lazy(() => import('./pages/blogPages/LinkedInPropecting.tsx'))
const AIBuyingIntentBlog = lazy(() => import('./pages/blogPages/BuyingIntent.tsx'))
const EmailOutreachTipsBlog = lazy(() => import('./pages/blogPages/EmailOutreach.tsx'))
const LeadPipelineBlog = lazy(() => import('./pages/blogPages/LeadPipeline.tsx'))
const FindingHighIntentLeadsGuide = lazy(() => import('./pages/guidesPages/IntentLead.tsx'))
const LeadQualificationGuide = lazy(() => import('./pages/guidesPages/LeadScoring.tsx'))
const ColdOutreachAutomationGuide = lazy(() => import('./pages/guidesPages/ColdOutreach.tsx'))
const ScalingLeadPipelineGuide = lazy(() => import('./pages/guidesPages/LeadPipeline.tsx'))
const MonitoringSocialPlatformsGuide = lazy(() => import('./pages/guidesPages/MonitoringSocial.tsx'))
const BuildingAILeadSystemsGuide = lazy(() => import('./pages/guidesPages/AiLeadSystems.tsx'))
const GettingStartedDocs = lazy(() => import('./pages/apiPages/GettingStarted.tsx'))
const ApiReferenceDocs = lazy(() => import('./pages/apiPages/ApiReference.tsx'))
const IntegrationsDocs = lazy(() => import('./pages/apiPages/DocsIntegrations.tsx'))
const AuthenticationDocs = lazy(() => import('./pages/apiPages/Authentication.tsx'))
const AutomationWorkflowDocs = lazy(() => import('./pages/apiPages/AutomationWorkflow.tsx'))
const AIsystemsDocs = lazy(() => import('./pages/apiPages/AIsystems.tsx'))
const GettingStartedHelpCenterPage = lazy(() => import('./pages/helpCenterPages/GettingStarted.tsx'))
const AutomationWorkflowHelpCenterPage = lazy(() => import('./pages/helpCenterPages/AutomationWorkflow.tsx'))
const LeadManagementHelpCenterPage = lazy(() => import('./pages/helpCenterPages/LeadManagement.tsx'))
const SecurityPrivacyHelpCenterPage = lazy(() => import('./pages/helpCenterPages/SecurityPrivacy.tsx'))
const IntegrationsHelpCenterPage = lazy(() => import('./pages/helpCenterPages/Integration.tsx'))
const AccountSettingsHelpCenterPage = lazy(() => import('./pages/helpCenterPages/AccountSetting.tsx'))

// ------------------------------------------------------------
// App component – now wraps everything in AuthProvider
// ------------------------------------------------------------
function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: renderPage(LandingPage),
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: (
        <PublicOnlyRoute>
          {renderPage(LoginPage)}
        </PublicOnlyRoute>
      ),
    },
    {
      path: '/signup',
      element: (
        <PublicOnlyRoute>
          {renderPage(SignupPage)}
        </PublicOnlyRoute>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          {renderPage(DashboardPage)}
        </ProtectedRoute>
      ),
    },
    // All public routes remain unchanged
    {
      path: '/how-it-works',
      element: renderPage(HowItWorksPage),
    },
    {
      path: '/features',
      element: renderPage(FeaturesPage),
    },
    {
      path: '/pricing',
      element: renderPage(PricingPage),
    },
    {
      path: '/faq',
      element: renderPage(FAQPage),
    },
    {
      path: '/about',
      element: renderPage(AboutPage),
    },
    {
      path: '/contact',
      element: renderPage(ContactPage),
    },
    {
      path: '/blog',
      element: renderPage(BlogPage),
    },
    {
      path: '/guides',
      element: renderPage(GuidesPage),
    },
    {
      path: '/integrations',
      element: renderPage(IntegrationsPage),
    },
    {
      path: '/changelog',
      element: renderPage(ChangelogPage),
    },
    {
      path: '/docs',
      element: renderPage(DocsPage),
    },
    {
      path: '/docs/getting-started',
      element: renderPage(GettingStartedDocs),
    },
    {
      path: '/docs/api-reference',
      element: renderPage(ApiReferenceDocs),
    },
    {
      path: '/docs/integrations',
      element: renderPage(IntegrationsDocs),
    },
    {
      path: '/docs/authentication',
      element: renderPage(AuthenticationDocs),
    },
    {
      path: '/docs/automation-workflows',
      element: renderPage(AutomationWorkflowDocs),
    },
    {
      path: '/docs/ai-systems',
      element: renderPage(AIsystemsDocs),
    },
    {
      path: '/help-center',
      element: renderPage(HelpCenterPage),
    },
    {
      path: '/help-center/getting-started',
      element: renderPage(GettingStartedHelpCenterPage),
    },
    {
      path: '/help-center/automation-workflows',
      element: renderPage(AutomationWorkflowHelpCenterPage),
    },
    {
      path: '/help-center/lead-management',
      element: renderPage(LeadManagementHelpCenterPage),
    },
    {
      path: '/help-center/security-privacy',
      element: renderPage(SecurityPrivacyHelpCenterPage),
    },
    {
      path: '/help-center/integrations',
      element: renderPage(IntegrationsHelpCenterPage),
    },
    {
      path: '/help-center/account-settings',
      element: renderPage(AccountSettingsHelpCenterPage),
    },
    {
      path: '/privacy-policy',
      element: renderPage(PrivacyPolicyPage),
    },
    {
      path: '/privacy',
      element: renderPage(Privacy),
    },
    {
      path: '/terms',
      element: renderPage(TermsPage),
    },
    {
      path: '/cookies',
      element: renderPage(CookiesPage),
    },
    {
      path: '/integrations/analytics-platforms',
      element: renderPage(AnalyticsIntegrationPage),
    },
    {
      path: '/integrations/cloud-services',
      element: renderPage(CloudServiceIntegrationPage),
    },
    {
      path: '/integrations/discord',
      element: renderPage(DiscordIntegrationPage),
    },
    {
      path: '/integrations/email-providers',
      element: renderPage(EmailProviderIntegrationPage),
    },
    {
      path: '/integrations/google-workspace',
      element: renderPage(GoogleWorkspaceIntegrationPage),
    },
    {
      path: '/integrations/linkedin',
      element: renderPage(LinkedinIntegrationPage),
    },
    {
      path: '/integrations/x-twitter',
      element: renderPage(TwitterIntegrationPage),
    },
    {
      path: '/integrations/reddit',
      element: renderPage(RedditIntegrationPage),
    },
    {
      path: '/integrations/slack',
      element: renderPage(SlackIntegrationPage),
    },
    {
      path: '/integrations/postgresql',
      element: renderPage(PostgresIntegrationPage),
    },
    {
      path: '/integrations/n8n-workflows',
      element: renderPage(N8NIntegrationPage),
    },
    {
      path: '/integrations/stripe',
      element: renderPage(PaymentIntegrationPage),
    },
    {
      path: '/blog/ai-automation',
      element: renderPage(AIautomation),
    },
    {
      path: '/blog/reddit-lead-gen',
      element: renderPage(RedditLeadBlog),
    },
    {
      path: '/blog/automation-outreach',
      element: renderPage(AutomationOutreachBlog),
    },
    {
      path: '/blog/linkedin-prospecting',
      element: renderPage(LinkedInProspectingBlog),
    },
    {
      path: '/blog/ai-monitoring-buying-intent',
      element: renderPage(AIBuyingIntentBlog),
    },
    {
      path: '/blog/email-outreach-tips',
      element: renderPage(EmailOutreachTipsBlog),
    },
    {
      path: '/blog/building-smarter-lead-pipelines',
      element: renderPage(LeadPipelineBlog),
    },
    {
      path: '/guides/finding-high-intent-leads',
      element: renderPage(FindingHighIntentLeadsGuide),
    },
    {
      path: '/guides/lead-qualification-scoring',
      element: renderPage(LeadQualificationGuide),
    },
    {
      path: '/guides/cold-outreach-automation',
      element: renderPage(ColdOutreachAutomationGuide),
    },
    {
      path: '/guides/scaling-lead-pipeline',
      element: renderPage(ScalingLeadPipelineGuide),
    },
    {
      path: '/guides/monitoring-social-platforms',
      element: renderPage(MonitoringSocialPlatformsGuide),
    },
    {
      path: '/guides/building-ai-lead-systems',
      element: renderPage(BuildingAILeadSystemsGuide),
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ])

  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}

export default App