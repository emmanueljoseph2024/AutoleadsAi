import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiShield,
  FiZap,
  FiSearch,
  FiMail,
  FiUsers,
  FiGlobe,
  FiBarChart2,
} from 'react-icons/fi'

const faqs = [
  {
    question: 'What is AutoLeads AI?',
    answer:
      'AutoLeads AI is an AI-powered lead generation and outreach platform that helps businesses discover high-intent prospects across platforms like LinkedIn, Reddit, X, websites, forums and business directories.',
  },

  {
    question: 'How does AutoLeads AI find leads?',
    answer:
      'Our system scans online conversations, websites, social platforms and public business sources to identify people or companies actively discussing problems related to your niche.',
  },

  {
    question: 'Can I automate outreach emails?',
    answer:
      'Yes. You can automate personalized outreach campaigns using AI-generated email sequences and workflows.',
  },

  {
    question: 'Does AutoLeads AI verify emails?',
    answer:
      'Yes. The platform verifies emails and filters invalid or risky addresses before outreach begins.',
  },

  {
    question: 'Which platforms can AutoLeads AI monitor?',
    answer:
      'AutoLeads AI can monitor platforms like LinkedIn, Reddit, X, websites, blogs, forums and online business communities.',
  },

  {
    question: 'Is there a free trial?',
    answer:
      'Yes. Every user gets access to a free trial to test the platform before upgrading to a paid subscription.',
  },

  {
    question: 'Can teams use AutoLeads AI?',
    answer:
      'Yes. Teams and agencies can collaborate using shared dashboards, workflows and campaign analytics.',
  },

  {
    question: 'Does AutoLeads AI support integrations?',
    answer:
      'Yes. You can integrate with CRMs, email providers, automation tools and workflow systems.',
  },

  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use encrypted infrastructure and secure cloud systems to protect user data and business information.',
  },

  {
    question: 'Who is AutoLeads AI for?',
    answer:
      'AutoLeads AI is designed for startups, agencies, freelancers, marketers, sales teams and businesses looking to scale lead generation.',
  },
]

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <header className="w-full border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200">
              A
            </div>

            <h1 className="text-2xl font-black tracking-tight">
              Auto<span className="text-blue-600">Leads AI</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-semibold text-gray-600">
            <Link to="/features" className="hover:text-black transition-all">
              Features
            </Link>

            <Link to="/pricing" className="hover:text-black transition-all">
              Pricing
            </Link>

            <Link to="/faq" className="text-blue-600">
              FAQ
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
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 sm:px-5 py-2 rounded-full text-sm font-bold mb-6 sm:mb-8">
              <FiHelpCircle className="text-lg" />
              Frequently Asked Questions
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 sm:mb-8">
              Everything You Need
              <br />
              To Know About
              <span className="text-blue-600"> AutoLeads AI</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Find answers to common questions about lead generation,
              automation, outreach, integrations, pricing and platform usage.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-24"
        >
          <div className="space-y-4 sm:space-y-5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                layout
                className="border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-lg sm:hover:shadow-xl transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 lg:p-7 text-left hover:bg-gray-50 transition-colors gap-4"
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl sm:text-2xl">
                      <FiHelpCircle />
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="text-2xl text-blue-600">
                    {activeIndex === index ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </div>
                </button>

                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-6 lg:px-7 pb-4 sm:pb-6 lg:pb-7"
                  >
                    <div className="pl-14 sm:pl-20">
                      <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-24"
        >
          <div className="rounded-3xl sm:rounded-[40px] bg-linear-to-r from-blue-600 to-indigo-600 p-6 sm:p-10 lg:p-14 text-white shadow-2xl shadow-blue-200">
            <div className="grid gap-8 lg:grid-cols-2 sm:gap-10 lg:gap-14 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xl sm:text-2xl lg:text-3xl mb-5 sm:mb-6">
                  <FiSearch />
                  <FiZap />
                  <FiMail />
                  <FiUsers />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-6">
                  Still Have Questions?
                </h2>

                <p className="text-blue-100 text-base sm:text-lg md:text-xl leading-relaxed max-w-full sm:max-w-xl">
                  Our support and onboarding team is ready to help you launch
                  smarter lead generation campaigns and automate your outreach.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="bg-white/10 border border-white/20 rounded-3xl p-5 sm:p-6 backdrop-blur-md">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5">
                    <FiShield />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-3">
                    Secure Platform
                  </h3>

                  <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
                    Enterprise-grade security and protected cloud
                    infrastructure.
                  </p>
                </div>

                <div className="bg-white/10 border border-white/20 rounded-3xl p-5 sm:p-6 backdrop-blur-md">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5">
                    <FiBarChart2 />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-3">
                    Real Analytics
                  </h3>

                  <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
                    Track conversions, replies and campaign performance.
                  </p>
                </div>

                <div className="bg-white/10 border border-white/20 rounded-3xl p-5 sm:p-6 backdrop-blur-md">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5">
                    <FiGlobe />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-3">
                    Global Monitoring
                  </h3>

                  <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
                    Discover opportunities from websites and social platforms.
                  </p>
                </div>

                <div className="bg-white/10 border border-white/20 rounded-3xl p-5 sm:p-6 backdrop-blur-md">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5">
                    <FiUsers />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-3">
                    Team Collaboration
                  </h3>

                  <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
                    Manage outreach campaigns together with your team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-lg sm:rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base sm:text-lg">
                  A
                </div>

                <h2 className="text-xl sm:text-2xl font-black">
                  Auto<span className="text-blue-600">Leads AI</span>
                </h2>
              </div>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-full sm:max-w-md mb-6 sm:mb-8">
                AI-powered lead intelligence platform helping businesses
                discover opportunities, monitor buying intent and automate
                outreach workflows.
              </p>
            </div>

            <div>
              <h3 className="font-black text-base sm:text-lg mb-6">Product</h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">
                <Link
                  to="/features"
                  className="block hover:text-black transition-colors hover:translate-x-1"
                >
                  Features
                </Link>

                <Link
                  to="/pricing"
                  className="block hover:text-black transition-all"
                >
                  Pricing
                </Link>

                <Link
                  to="/faq"
                  className="block hover:text-black transition-all"
                >
                  FAQ
                </Link>

                <Link
                  to="/integrations"
                  className="block hover:text-black transition-all"
                >
                  Integrations
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-base sm:text-lg mb-6">Resources</h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">
                <Link
                  to="/blog"
                  className="block hover:text-black transition-all"
                >
                  Blog
                </Link>

                <Link
                  to="/guides"
                  className="block hover:text-black transition-all"
                >
                  Guides
                </Link>

                <Link
                  to="/documentation"
                  className="block hover:text-black transition-all"
                >
                  Documentation
                </Link>

                <Link
                  to="/support"
                  className="block hover:text-black transition-all"
                >
                  Support
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-base sm:text-lg mb-6">Company</h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">
                <Link
                  to="/about"
                  className="block hover:text-black transition-all"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className="block hover:text-black transition-all"
                >
                  Contact
                </Link>

                <Link
                  to="/privacy"
                  className="block hover:text-black transition-all"
                >
                  Privacy Policy
                </Link>

                <Link
                  to="/terms"
                  className="block hover:text-black transition-all"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm sm:text-base">
            <p className="text-center sm:text-left">© 2026 AutoLeads AI. All rights reserved.</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-sm sm:text-base">
              <Link to="/terms" className="hover:text-black transition-colors">
                Terms
              </Link>

              <Link to="/privacy" className="hover:text-black transition-colors">
                Privacy
              </Link>

              <Link to="/cookies" className="hover:text-black transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}