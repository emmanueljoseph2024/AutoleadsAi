import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import {
  FiDatabase,
  FiMail,
  FiSlack,
  FiGlobe,
  FiZap,
  FiLayers,
  FiServer,
  FiArrowRight,
  FiShield,
  FiCloud,
  FiBarChart2,
} from 'react-icons/fi'

import {
  FaDiscord,
  FaLinkedinIn,
  FaRedditAlien,
  FaXTwitter,
  FaGoogle,
  FaStripe,
} from 'react-icons/fa6'

export default function IntegrationsPage() {
    const navigate = useNavigate()

  const handleNavigate = (link: string) => {
    navigate(link)
  }

  const integrations = [
  {
    icon: <FaGoogle />,
    title: 'Google Workspace',
    description:
      'Connect Gmail, Google Sheets and Google Drive to automate outreach, reporting and lead storage.',
    link: '/integrations/google-workspace',
  },
  {
    icon: <FiMail />,
    title: 'Email Providers',
    description:
      'Integrate with SMTP providers and email tools for smart AI outreach and automated follow-ups.',
    link: '/integrations/email-providers',
  },
  {
    icon: <FaLinkedinIn />,
    title: 'LinkedIn',
    description:
      'Monitor public business conversations, track engagement signals and discover opportunities.',
    link: '/integrations/linkedin',
  },
  {
    icon: <FaXTwitter />,
    title: 'X / Twitter',
    description:
      'Track trending conversations, customer pain points and buying intent in real time.',
    link: '/integrations/x-twitter',
  },
  {
    icon: <FaRedditAlien />,
    title: 'Reddit',
    description:
      'Discover niche communities and identify people actively searching for solutions.',
    link: '/integrations/reddit',
  },
  {
    icon: <FiSlack />,
    title: 'Slack',
    description:
      'Send lead alerts, AI summaries and automation updates directly into Slack channels.',
    link: '/integrations/slack',
  },
  {
    icon: <FaDiscord />,
    title: 'Discord',
    description:
      'Monitor communities, track discussions and push lead notifications to Discord servers.',
    link: '/integrations/discord',
  },
  {
    icon: <FiDatabase />,
    title: 'PostgreSQL',
    description:
      'Store leads, campaigns, AI insights and workflow data securely at scale.',
    link: '/integrations/postgresql',
  },
  {
    icon: <FiServer />,
    title: 'n8n Workflows',
    description:
      'Create advanced automation workflows connecting your entire lead generation pipeline.',
    link: '/integrations/n8n-workflows',
  },
  {
    icon: <FiCloud />,
    title: 'Cloud Services',
    description:
      'Connect cloud-based services and automation tools for scalable workflows.',
    link: '/integrations/cloud-services',
  },
  {
    icon: <FiBarChart2 />,
    title: 'Analytics Platforms',
    description:
      'Track campaign performance, replies, conversions and engagement metrics in one dashboard.',
    link: '/integrations/analytics-platforms',
  },
  {
    icon: <FaStripe />,
    title: 'Stripe',
    description:
      'Manage billing, subscriptions and payments for AI lead generation services.',
    link: '/integrations/stripe',
  },
]
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-200">
              A
            </div>

            <h1 className="text-2xl font-black tracking-tight">
              Auto<span className="text-blue-600">Leads AI</span>
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-gray-600">
            <Link to="/" className="hover:text-black transition-all">
              Home
            </Link>

            <Link to="/features" className="hover:text-black transition-all">
              Features
            </Link>

            <Link to="/pricing" className="hover:text-black transition-all">
              Pricing
            </Link>

            <Link to="/contact" className="hover:text-black transition-all">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden sm:flex px-5 py-2.5 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50 transition-all"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6 sm:mb-8">
              <FiLayers className="text-lg" />
              Powerful Integrations
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight mb-6 sm:mb-8">
              Connect Your
              <span className="text-blue-600"> Entire Workflow</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              AutoLeads AI integrates with modern platforms, APIs and automation
              systems to help businesses discover leads, automate outreach and
              scale faster.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24 lg:pb-28"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {integrations.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-6 sm:mb-8">
                  {item.icon}
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight mb-4 sm:mb-5">
                  {item.title}
                </h2>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                  {item.description}
                </p>

                <button className="flex items-center gap-3 text-blue-600 font-bold text-base sm:text-lg hover:gap-5 transition-all" onClick={()=> handleNavigate(item.link)}>
                  Learn More
                  <FiArrowRight />
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                Why Integrate
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                One Platform for Lead Intelligence
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-full sm:max-w-3xl mx-auto leading-relaxed">
                Connect your tools together and automate repetitive tasks with
                AI-powered workflows.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <FiZap />,
                  title: 'Automation',
                  description:
                    'Automate repetitive prospecting and outreach tasks.',
                },
                {
                  icon: <FiShield />,
                  title: 'Security',
                  description:
                    'Secure integrations and encrypted workflow processing.',
                },
                {
                  icon: <FiGlobe />,
                  title: 'Multi-Platform',
                  description:
                    'Connect websites, APIs and social platforms together.',
                },
                {
                  icon: <FiServer />,
                  title: 'Scalable',
                  description:
                    'Handle thousands of leads and automation workflows.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-4xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-28"
        >
          <div className="rounded-4xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 lg:p-12 xl:p-16 text-white shadow-2xl shadow-blue-200">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 sm:gap-4 text-2xl sm:text-3xl mb-6 sm:mb-8">
                <FiZap />
                <FiLayers />
                <FiServer />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-6">
                Build Your AI Automation Stack
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10">
                Connect platforms, automate lead discovery and scale your
                outreach workflows using powerful integrations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <Link
                  to="/signup"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-blue-600 text-base sm:text-lg font-black hover:scale-105 transition-all text-center"
                >
                  Start Free Trial
                </Link>

                <Link
                  to="/features"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-white/30 text-white text-base sm:text-lg font-bold hover:bg-white/10 transition-all text-center"
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                  A
                </div>

                <h2 className="text-xl sm:text-2xl font-black">
                  Auto<span className="text-blue-600">Leads AI</span>
                </h2>
              </div>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-full sm:max-w-md">
                AI-powered lead intelligence platform helping businesses
                discover opportunities and automate outreach workflows.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black mb-4 sm:mb-6">
                Product
              </h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <Link to="/features" className="block hover:text-black">
                  Features
                </Link>

                <Link to="/pricing" className="block hover:text-black">
                  Pricing
                </Link>

                <Link to="/integrations" className="block hover:text-black">
                  Integrations
                </Link>

                <Link to="/faq" className="block hover:text-black">
                  FAQ
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black mb-4 sm:mb-6">
                Company
              </h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <Link to="/about" className="block hover:text-black">
                  About
                </Link>

                <Link to="/contact" className="block hover:text-black">
                  Contact
                </Link>

                <Link to="/blog" className="block hover:text-black">
                  Blog
                </Link>

                <Link to="/privacy" className="block hover:text-black">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5">
            <p className="text-gray-500 text-sm sm:text-base text-center md:text-left">
              © 2026 AutoLeads AI. All rights reserved.
            </p>

            <div className="flex items-center gap-6 sm:gap-8 text-gray-500">
              <Link to="/terms" className="hover:text-black text-sm sm:text-base">
                Terms
              </Link>

              <Link to="/privacy" className="hover:text-black text-sm sm:text-base">
                Privacy
              </Link>

              <Link to="/cookies" className="hover:text-black text-sm sm:text-base">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}