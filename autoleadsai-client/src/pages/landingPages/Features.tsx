import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiSearch,
  FiMail,
  FiGlobe,
  FiZap,
  FiBarChart2,
  FiLayers,
  FiTarget,
  FiShield,
  FiClock,
  FiUsers,
  FiDatabase,
  FiActivity,
  FiCheckCircle,
} from 'react-icons/fi'

import {
  FaRobot,
  FaLinkedinIn,
  FaRedditAlien,
  FaXTwitter,
  FaChartLine,
  FaHandshake,
} from 'react-icons/fa6'

export default function FeaturesPage() {
  const features = [
    {
      title: 'AI Lead Discovery',
      icon: <FiSearch />,
      desc: 'Automatically scan the web, social media platforms and business websites to discover high-quality leads in your niche.',
    },
    {
      title: 'Intent Detection',
      icon: <FiTarget />,
      desc: 'Detect buying signals and identify people actively searching for solutions related to your business.',
    },
    {
      title: 'Verified Contact Extraction',
      icon: <FiMail />,
      desc: 'Extract verified emails, company information and social media accounts automatically.',
    },
    {
      title: 'Smart Outreach',
      icon: <FiZap />,
      desc: 'Generate personalized AI outreach messages that increase reply and conversion rates.',
    },
    {
      title: 'Social Monitoring',
      icon: <FaRobot />,
      desc: 'Monitor Reddit, LinkedIn, X and other platforms for conversations related to your niche.',
    },
    {
      title: 'Automation Workflows',
      icon: <FiLayers />,
      desc: 'Automate repetitive lead generation and outreach tasks without manual effort.',
    },
    {
      title: 'Analytics Dashboard',
      icon: <FiBarChart2 />,
      desc: 'Track replies, conversions, lead quality and campaign performance in real time.',
    },
    {
      title: 'Secure Data Storage',
      icon: <FiDatabase />,
      desc: 'Store and organize lead information securely with scalable infrastructure.',
    },
    {
      title: 'Team Collaboration',
      icon: <FiUsers />,
      desc: 'Collaborate with team members, assign leads and manage workflows efficiently.',
    },
  ]

  const integrations = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn />,
    },
    {
      name: 'Reddit',
      icon: <FaRedditAlien />,
    },
    {
      name: 'X / Twitter',
      icon: <FaXTwitter />,
    },
    {
      name: 'Websites',
      icon: <FiGlobe />,
    },
  ]

  const benefits = [
    {
      title: 'Faster Lead Discovery',
      icon: <FiClock />,
    },
    {
      title: 'Higher Conversion Rates',
      icon: <FaChartLine />,
    },
    {
      title: 'Better Customer Targeting',
      icon: <FiTarget />,
    },
    {
      title: 'AI-Powered Automation',
      icon: <FaRobot />,
    },
    {
      title: 'Secure Infrastructure',
      icon: <FiShield />,
    },
    {
      title: 'Scalable Workflows',
      icon: <FiActivity />,
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <header className="w-full border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200">
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

            <Link
              to="/features"
              className="text-blue-600 transition-all"
            >
              Features
            </Link>

            <Link
              to="/pricing"
              className="hover:text-black transition-all"
            >
              Pricing
            </Link>

            <Link
              to="/faq"
              className="hover:text-black transition-all"
            >
              FAQ
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
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
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
              <FiZap className="text-lg" />
              Powerful AI Features
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 sm:mb-8">
              Everything You Need
              <br />
              To Find and Convert
              <br />
              <span className="text-blue-600">High-Intent Leads</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              AutoLeads AI combines automation, AI intelligence and lead
              discovery tools into one powerful platform built for growth.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24 lg:pb-28"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-5 sm:mb-6">
                  {feature.icon}
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-4 sm:mb-5">
                  {feature.title}
                </h2>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                Platform Integrations
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                Monitor Conversations Across The Internet
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-full sm:max-w-3xl mx-auto leading-relaxed">
                Discover real opportunities from multiple platforms and websites
                automatically.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {integrations.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-4xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl sm:text-4xl mb-5 sm:mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-28"
        >
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                Why Businesses Choose AutoLeads AI
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 sm:mb-8">
                Built To Scale Your Lead Generation Faster
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                From startups to agencies and sales teams, AutoLeads AI helps
                businesses automate prospecting, identify opportunities and
                close more deals with less effort.
              </p>

              <div className="space-y-4 sm:space-y-5">
                {[
                  'AI-powered opportunity intelligence',
                  'Automated workflows and lead tracking',
                  'Verified contact extraction',
                  'Real-time monitoring and analytics',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 sm:gap-4"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg sm:text-xl">
                      <FiCheckCircle />
                    </div>

                    <p className="text-base sm:text-lg font-semibold leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-[28px] p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-5 sm:mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black leading-tight">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24 lg:pb-28"
        >
          <div className="rounded-[40px] bg-linear-to-r from-blue-600 to-indigo-600 p-8 sm:p-10 lg:p-14 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-10 shadow-2xl shadow-blue-200">
            <div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 sm:mb-6 text-2xl sm:text-3xl">
                <FiZap />
                <FiTarget />
                <FaHandshake />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-5">
                Start Finding Better Leads Today
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-full sm:max-w-2xl leading-relaxed">
                Join businesses using AI-powered opportunity intelligence to
                discover customers faster and grow revenue.
              </p>
            </div>

            <Link
              to="/signup"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-blue-600 text-base sm:text-lg font-black hover:scale-105 transition-all text-center"
            >
              Start Free Trial
            </Link>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>

                <h2 className="text-xl sm:text-2xl font-black">
                  Auto<span className="text-blue-600">Leads AI</span>
                </h2>
              </div>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-full sm:max-w-md mb-6 sm:mb-8">
                AI-powered lead intelligence platform helping businesses
                discover opportunities, monitor intent and automate outreach.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                  <FaXTwitter />,
                  <FaLinkedinIn />,
                  <FaRedditAlien />,
                  <FiGlobe />,
                ].map((icon, index) => (
                  <div
                    key={index}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black text-lg mb-6">
                Product
              </h3>

              <div className="space-y-4 text-gray-600">
                <Link to="/" className="block hover:text-black">
                  Home
                </Link>

                <Link
                  to="/features"
                  className="block hover:text-black"
                >
                  Features
                </Link>

                <Link
                  to="/pricing"
                  className="block hover:text-black"
                >
                  Pricing
                </Link>

                <Link to="/faq" className="block hover:text-black">
                  FAQ
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-lg mb-6">
                Resources
              </h3>

              <div className="space-y-4 text-gray-600">
                <Link to="/blog" className="block hover:text-black">
                  Blog
                </Link>

                <Link to="/guides" className="block hover:text-black">
                  Guides
                </Link>

                <Link to="/docs" className="block hover:text-black">
                  API Docs
                </Link>

                <Link
                  to="/help-center"
                  className="block hover:text-black"
                >
                  Help Center
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-lg mb-6">
                Company
              </h3>

              <div className="space-y-4 text-gray-600">
                <Link to="/about" className="block hover:text-black">
                  About
                </Link>

                <Link to="/contact" className="block hover:text-black">
                  Contact
                </Link>

                <Link to="/privacy" className="block hover:text-black">
                  Privacy Policy
                </Link>

                <Link to="/terms" className="block hover:text-black">
                  Terms
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500">
            <p>© 2026 AutoLeads AI. All rights reserved.</p>

            <div className="flex items-center gap-8">
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