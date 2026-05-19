import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiActivity,
  FiZap,
  FiShield,
  FiDatabase,
  FiSearch,
  FiMail,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiCpu,
} from 'react-icons/fi'

export default function ChangelogPage() {
  const updates = [
    {
      version: 'v2.4.0',
      date: 'May 2026',
      title: 'AI Intent Detection Upgrade',
      icon: <FiCpu />,
      changes: [
        'Improved buying-intent detection engine',
        'Added Reddit conversation monitoring',
        'Faster AI lead qualification system',
        'Enhanced outreach personalization',
      ],
    },
    {
      version: 'v2.3.0',
      date: 'April 2026',
      title: 'Workflow Automation Expansion',
      icon: <FiLayers />,
      changes: [
        'New n8n automation templates',
        'Added campaign scheduling system',
        'Improved workflow builder UI',
        'Advanced lead filtering options',
      ],
    },
    {
      version: 'v2.2.0',
      date: 'March 2026',
      title: 'Performance & Analytics Update',
      icon: <FiTrendingUp />,
      changes: [
        'New analytics dashboard',
        'Improved lead tracking metrics',
        'Faster campaign performance insights',
        'Added export and reporting tools',
      ],
    },
    {
      version: 'v2.1.0',
      date: 'February 2026',
      title: 'Email Automation Improvements',
      icon: <FiMail />,
      changes: [
        'Smart AI email generation',
        'Automated follow-up sequences',
        'Better email deliverability tools',
        'Reply tracking enhancements',
      ],
    },
    {
      version: 'v2.0.0',
      date: 'January 2026',
      title: 'Major Platform Launch',
      icon: <FiZap />,
      changes: [
        'Complete UI redesign',
        'AI lead discovery engine',
        'Multi-platform monitoring',
        'Cloud workflow infrastructure',
      ],
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

          <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-gray-600">
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
          className="max-w-7xl mx-auto px-6 py-16 sm:py-24"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-5 py-2.5 rounded-full text-sm font-bold mb-8">
              <FiActivity className="text-lg" />
              Product Updates & Releases
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-8">
              AutoLeads AI
              <span className="text-blue-600"> Changelog</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Track the latest improvements, AI upgrades, workflow updates and
              platform enhancements released for AutoLeads AI.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-6 pb-16 sm:pb-28"
        >
          <div className="space-y-10">
            {updates.map((update, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-100 rounded-4xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-8 right-8 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold">
                  {update.version}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-4xl shrink-0">
                    {update.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-gray-500 font-semibold mb-4">
                      <FiClock />
                      {update.date}
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
                      {update.title}
                    </h2>

                    <div className="space-y-4">
                      {update.changes.map((change, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4"
                        >
                          <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">
                            <FiCheckCircle />
                          </div>

                          <p className="text-gray-600 text-lg leading-relaxed">
                            {change}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 py-16 sm:py-28"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-sm mb-5">
                Platform Improvements
              </p>

              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                Constantly Improving the Platform
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We continuously ship updates to improve AI lead discovery,
                automation workflows and outreach performance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <FiSearch />,
                  title: 'AI Lead Discovery',
                  description:
                    'Smarter lead detection and buying intent analysis.',
                },
                {
                  icon: <FiDatabase />,
                  title: 'Infrastructure',
                  description:
                    'Improved scalability and faster workflow processing.',
                },
                {
                  icon: <FiShield />,
                  title: 'Security',
                  description:
                    'Advanced protection and secure integrations.',
                },
                {
                  icon: <FiZap />,
                  title: 'Automation',
                  description:
                    'Faster workflows and better AI-powered automations.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-4xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-black mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
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
          className="max-w-7xl mx-auto px-6 py-16 sm:py-28"
        >
          <div className="rounded-4xl bg-linear-to-r from-blue-600 to-indigo-600 p-8 sm:p-12 lg:p-16 text-white shadow-2xl shadow-blue-200">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 text-3xl mb-8">
                <FiZap />
                <FiTrendingUp />
                <FiActivity />
              </div>

              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                Stay Updated With Every Release
              </h2>

              <p className="text-xl text-blue-100 leading-relaxed mb-10">
                Follow our latest product improvements, AI upgrades and workflow
                enhancements as AutoLeads AI continues to evolve.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to="/signup"
                  className="px-8 py-4 rounded-2xl bg-white text-blue-600 text-lg font-black hover:scale-105 transition-all text-center"
                >
                  Start Free Trial
                </Link>

                <Link
                  to="/features"
                  className="px-8 py-4 rounded-2xl border border-white/30 text-white text-lg font-bold hover:bg-white/10 transition-all text-center"
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                  A
                </div>

                <h2 className="text-2xl font-black">
                  Auto<span className="text-blue-600">Leads AI</span>
                </h2>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                AI-powered lead intelligence platform helping businesses
                discover opportunities and automate outreach workflows.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-black mb-6">
                Product
              </h3>

              <div className="space-y-4 text-gray-600">
                <Link to="/features" className="block hover:text-black">
                  Features
                </Link>

                <Link to="/pricing" className="block hover:text-black">
                  Pricing
                </Link>

                <Link to="/changelog" className="block hover:text-black">
                  Changelog
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

          <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-gray-500 text-center md:text-left">
              © 2026 AutoLeads AI. All rights reserved.
            </p>

            <div className="flex items-center gap-8 text-gray-500">
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