import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navFunction } from '../../utils/NavFunction.tsx'

import {
  FiBook,
  FiCode,
  FiDatabase,
  FiZap,
  FiShield,
  FiCloud,
  FiArrowRight,
  FiTerminal,
  FiLayers,
  FiCpu,
  FiActivity,
  FiGlobe,
  FiMail,
} from 'react-icons/fi'

export default function DocsPage() {

    // Initialize navigation function
const handleNavigate = navFunction()

  const docSections = [
    {
      icon: <FiZap />,
      title: 'Getting Started',
      description:
        'Learn how to set up AutoLeads AI and launch your first AI automation workflow.',
      path: '/docs/getting-started',
    },
    {
      icon: <FiDatabase />,
      title: 'API Reference',
      description:
        'Explore endpoints, requests, responses and authentication methods.',
      path: '/docs/api-reference',
    },
    {
      icon: <FiCloud />,
      title: 'Integrations',
      description:
        'Connect social platforms, CRMs, automation tools and external services.',
      path: '/docs/integrations',
    },
    {
      icon: <FiShield />,
      title: 'Authentication',
      description:
        'Secure account management, API tokens and protected workflows.',
      path: '/docs/authentication',
    },
    {
      icon: <FiLayers />,
      title: 'Automation Workflows',
      description:
        'Build advanced lead generation and outreach automations.',
      path: '/docs/automation-workflows',
    },
    {
      icon: <FiCpu />,
      title: 'AI Systems',
      description:
        'Understand how AI lead detection and opportunity analysis works.',
      path: '/docs/ai-systems',
    },
  ]

  const quickStart = [
    {
      title: 'Create Your Account',
      description:
        'Sign up and configure your AutoLeads AI workspace.',
    },
    {
      title: 'Connect Platforms',
      description:
        'Integrate LinkedIn, Reddit, X, Gmail and other platforms.',
    },
    {
      title: 'Create Workflow',
      description:
        'Build AI-powered lead generation and outreach automations.',
    },
    {
      title: 'Launch Campaign',
      description:
        'Start discovering opportunities and converting leads automatically.',
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
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 sm:px-5 py-2 rounded-full text-sm font-bold mb-6 sm:mb-8">
                <FiBook className="text-lg" />
                Developer Documentation
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 sm:mb-8">
                Build Faster With
                <span className="text-blue-600"> AutoLeads AI Docs</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Learn how to integrate APIs, automate workflows, manage lead
                intelligence systems and build scalable AI-powered automations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <Link
                  to="/signup"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-blue-600 text-white text-base sm:text-lg font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 text-center"
                >
                  Get Started
                </Link>

                <Link
                  to="/guides"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-gray-300 text-base sm:text-lg font-bold hover:bg-gray-50 transition-all text-center"
                >
                  View Guides
                </Link>
              </div>
            </div>

            <motion.div
              whileInView={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              viewport={{ once: false, amount: 0.6 }}
              className="bg-white border border-gray-100 rounded-4xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black">
                    API Documentation
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Developer workspace
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                  <FiCode />
                </div>
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: <FiGlobe />,
                    title: 'Lead Discovery API',
                  },
                  {
                    icon: <FiMail />,
                    title: 'Outreach Automation API',
                  },
                  {
                    icon: <FiDatabase />,
                    title: 'Lead Database API',
                  },
                  {
                    icon: <FiZap />,
                    title: 'Workflow Trigger API',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-5 rounded-3xl border border-gray-100 bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>

                      <div>
                        <h3 className="font-black text-lg">
                          {item.title}
                        </h3>

                        <p className="text-gray-500">
                          Active Endpoint
                        </p>
                      </div>
                    </div>

                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  </div>
                ))}
              </div>
            </motion.div>
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
                Documentation Sections
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                Everything You Need To Build
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-full sm:max-w-3xl mx-auto leading-relaxed">
                Explore guides, API references, workflow documentation and AI
                automation systems.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {docSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-4xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all"
                >
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-5 sm:mb-6">
                    {section.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-4">
                    {section.title}
                  </h3>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                    {section.description}
                  </p>

                  <button className="flex items-center gap-3 text-blue-600 font-bold text-base sm:text-lg hover:gap-4 transition-all cursor-pointer" onClick={() => handleNavigate(section.path)}>
                    Learn More
                    <FiArrowRight />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-3xl sm:text-4xl text-blue-600 mb-6 sm:mb-8">
                  <FiTerminal />
                  <FiCode />
                  <FiCpu />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 sm:mb-8">
                  Quick Start Guide
                </h2>

                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                  Launch your first AI-powered lead generation workflow in just
                  a few simple steps.
                </p>

                <div className="space-y-4 sm:space-y-5">
                  {quickStart.map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-base sm:text-lg shrink-0">
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-xl font-black mb-2">
                          {step.title}
                        </h3>

                        <p className="text-gray-600 text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-950 rounded-4xl p-6 sm:p-8 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                <div className="space-y-4 sm:space-y-5 font-mono text-xs sm:text-sm md:text-base overflow-x-auto">
                  <div className="text-green-400">
                    npm install autoleads-ai
                  </div>

                  <div className="text-blue-400">
                    connectPlatform('linkedin')
                  </div>

                  <div className="text-purple-400">
                    createWorkflow('lead-generation')
                  </div>

                  <div className="text-yellow-400">
                    startAutomation()
                  </div>

                  <div className="text-white">
                    AI workflow successfully launched...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-4xl bg-linear-to-r from-blue-600 to-indigo-600 p-8 sm:p-10 lg:p-14 text-white shadow-2xl shadow-blue-200">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-3xl sm:text-4xl mb-6 sm:mb-8">
                  <FiBook />
                  <FiActivity />
                  <FiZap />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-6">
                  Ready To Build With AutoLeads AI?
                </h2>

                <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10">
                  Start integrating APIs, automating workflows and building
                  powerful AI lead systems today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <Link
                    to="/signup"
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-blue-600 text-base sm:text-lg font-black hover:scale-105 transition-all text-center"
                  >
                    Start Free Trial
                  </Link>

                  <Link
                    to="/integrations"
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-white/30 text-white text-base sm:text-lg font-bold hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2 sm:gap-3"
                  >
                    View Integrations
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-white">
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
              <h3 className="text-lg font-black mb-6">
                Documentation
              </h3>

              <div className="space-y-4 text-gray-600">
                <Link to="/docs" className="block hover:text-black">
                  Docs
                </Link>

                <Link to="/guides" className="block hover:text-black">
                  Guides
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
              <h3 className="text-lg font-black mb-6">
                Company
              </h3>

              <div className="space-y-4 text-gray-600">
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

          <div className="border-t border-gray-200 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm sm:text-base">
            <p className="text-center sm:text-left">© 2026 AutoLeads AI. All rights reserved.</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm sm:text-base">
              <Link to="/terms" className="hover:text-black">
                Terms
              </Link>

              <Link to="/privacy" className="hover:text-black">
                Privacy
              </Link>

              <Link to="/cookies" className="hover:text-black">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}