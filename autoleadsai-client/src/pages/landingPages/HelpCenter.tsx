import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navFunction } from '../../utils/NavFunction.tsx'
import { useState } from 'react'

import {
  FiHelpCircle,
  FiMail,
  FiMessageCircle,
  FiBookOpen,
  FiShield,
  FiZap,
  FiArrowRight,
  FiClock,
  FiCheckCircle,
  FiUsers,
  FiSettings,
  FiGlobe,
  FiDatabase,
  FiCpu,
} from 'react-icons/fi'

export default function HelpCenterPage() {
   // Initialize navigation function
  const handleNavigate = navFunction()
  // State for search input and error handling
      const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')
    const [visibility, setVisibility] = useState(false)
    const [errorMessageVisibility, setErrorMessageVisibility] = useState<boolean>(true)

  const helpCards = [
    {
      icon: <FiBookOpen />,
      title: 'Getting Started',
      description:
        'Learn how to create your account, connect platforms and launch your first workflow.',
      path: '/help-center/getting-started',
    },
    {
      icon: <FiZap />,
      title: 'Automation Workflows',
      description:
        'Understand how AI lead generation and automated outreach systems work.',
      path: '/help-center/automation-workflows',
    },
    {
      icon: <FiDatabase />,
      title: 'Lead Management',
      description:
        'Manage leads, organize campaigns and monitor customer opportunities.',
      path: '/help-center/lead-management',
    },
    {
      icon: <FiShield />,
      title: 'Security & Privacy',
      description:
        'Learn how your data, integrations and automation systems stay secure.',
      path: '/help-center/security-privacy',
    },
    {
      icon: <FiGlobe />,
      title: 'Integrations',
      description:
        'Connect LinkedIn, Reddit, X, Gmail and other external platforms.',
      path: '/help-center/integrations',
    },
    {
      icon: <FiSettings />,
      title: 'Account Settings',
      description:
        'Manage billing, subscription plans, workspace settings and preferences.',
      path: '/help-center/account-settings',
    },
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {

    const value: string = e.target.value

    // Remove potentially dangerous characters
    const sanitizedValue: string = value.replace(
      /[<>$`{}[\];]/g,
      ''
    )

    // Validate maximum length
if (sanitizedValue.length > 100) {

  setError('Input is too long')
  setErrorMessageVisibility(true)

  setTimeout(() => {
    setErrorMessageVisibility(false)
  }, 1200)

  return
}

// Prevent only empty spaces
if (sanitizedValue.trim() === '') {

  setError('Input cannot be empty')

  setErrorMessageVisibility(true)
  setVisibility(false)
  setInputValue(sanitizedValue)

  setTimeout(() => {
    setErrorMessageVisibility(false)
  }, 1200)

  return

} else {

  setError('')
  setErrorMessageVisibility(false)

}
    // BLOG MATCH LOGIC (ADDED HERE)
    const match = helpCards.some((card) =>
      card.title.toLowerCase().includes(sanitizedValue.toLowerCase())
    )

    setVisibility(match)
    setInputValue(sanitizedValue)
  }


  const supportOptions = [
    {
      icon: <FiMail />,
      title: 'Email Support',
      description:
        'Reach out to our support team for detailed assistance and troubleshooting.',
      action: 'Send Email',
    },
    {
      icon: <FiMessageCircle />,
      title: 'Live Chat',
      description:
        'Chat with our support agents and get help with workflows and integrations.',
      action: 'Start Chat',
    },
    {
      icon: <FiUsers />,
      title: 'Community Support',
      description:
        'Join discussions, share ideas and learn from other AutoLeads AI users.',
      action: 'Join Community',
    },
  ]

  const faqs = [
    {
      question: 'How does AutoLeads AI find leads?',
      answer:
        'Our AI scans online platforms, websites and discussions to discover businesses and users showing buying intent.',
    },
    {
      question: 'Can I automate outreach emails?',
      answer:
        'Yes. You can create automated workflows for email outreach, follow-ups and lead nurturing.',
    },
    {
      question: 'Which platforms can I connect?',
      answer:
        'You can integrate platforms like LinkedIn, Reddit, X, Gmail and automation tools.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes. We use secure authentication systems and encrypted infrastructure to protect your data.',
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
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6 sm:mb-8">
                <FiHelpCircle className="text-lg" />
                Help Center
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight mb-6 sm:mb-8">
                How Can We
                <span className="text-blue-600"> Help You?</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Find answers, explore documentation, troubleshoot workflows and
                get support for your AutoLeads AI platform.
              </p>

              <div className="relative max-w-2xl">
                <input
                  type="text"
                  placeholder="Search help articles..."
                  className="w-full h-12 sm:h-16 rounded-3xl border border-gray-200 bg-white pl-12 sm:pl-16 pr-6 text-base sm:text-lg outline-none focus:border-blue-500 transition-all shadow-sm"
                  value={inputValue}
                  onChange={handleInputChange}
                />

                   {/* FILTERED RESULTS */}
      {visibility && (
        <div className="mt-6 space-y-3">
          {helpCards
            .filter((card) =>
              card.title.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((card, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer"
                onClick={() => handleNavigate(card.path)}
              >
                {card.title}
              </div>
            ))}
        </div>
      )}

               
              </div>
            </div>

            <motion.div
              whileInView={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              viewport={{ once: false, amount: 0.6 }}
              className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black">
                    Support Dashboard
                  </h2>

                  <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    AI-powered assistance
                  </p>
                </div>

                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl sm:text-2xl">
                  <FiCpu />
                </div>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {[
                  {
                    icon: <FiCheckCircle />,
                    title: 'Platform Status',
                    value: 'Operational',
                  },
                  {
                    icon: <FiClock />,
                    title: 'Average Response',
                    value: '2 mins',
                  },
                  {
                    icon: <FiUsers />,
                    title: 'Active Support',
                    value: '24/7',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-gray-50 border border-gray-100"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl sm:text-2xl">
                        {item.icon}
                      </div>

                      <div>
                        <h3 className="font-black text-base sm:text-lg">
                          {item.title}
                        </h3>

                        <p className="text-gray-500 text-sm sm:text-base">
                          {item.value}
                        </p>
                      </div>
                    </div>

                    <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-green-500"></div>
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
                Help Categories
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                Browse Support Topics
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-full sm:max-w-3xl mx-auto leading-relaxed">
                Explore tutorials, setup guides, workflow documentation and
                troubleshooting resources.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {helpCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-4xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all"
                >
                  <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6">
                    {card.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                    {card.description}
                  </p>

                  <button onClick={() => handleNavigate(card.path)} className="flex items-center gap-3 text-blue-600 font-bold text-base sm:text-lg hover:gap-4 transition-all cursor-pointer">
                    Explore
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
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                Support Options
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                Get Help Fast
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-white rounded-4xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
                >
                  <div className="w-14 sm:w-16 lg:w-18 h-14 sm:h-16 lg:h-18 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl sm:text-4xl mb-6 sm:mb-8">
                    {option.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-4 sm:mb-5">
                    {option.title}
                  </h3>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                    {option.description}
                  </p>

                  <button className="w-full h-12 sm:h-14 rounded-2xl bg-blue-600 text-white font-black text-base sm:text-lg hover:bg-blue-700 transition-all">
                    {option.action}
                  </button>
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
          className="bg-gray-50 py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                FAQ
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-4xl p-6 sm:p-8 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                      <FiHelpCircle />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">
                        {faq.question}
                      </h3>

                      <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
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
          className="py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-4xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 lg:p-12 xl:p-16 text-white shadow-2xl shadow-blue-200">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 sm:gap-4 text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8">
                  <FiHelpCircle />
                  <FiMail />
                  <FiMessageCircle />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-6">
                  Still Need Help?
                </h2>

                <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10">
                  Our support team is available to help you solve issues,
                  optimize workflows and scale your AI automation systems.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <Link
                    to="/contact"
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-blue-600 text-base sm:text-lg font-black hover:scale-105 transition-all text-center"
                  >
                    Contact Support
                  </Link>

                  <Link
                    to="/docs"
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-white/30 text-white text-base sm:text-lg font-bold hover:bg-white/10 transition-all text-center"
                  >
                    View Documentation
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
              <h3 className="text-base sm:text-lg font-black mb-4 sm:mb-6">
                Support
              </h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <Link to="/help-center" className="block hover:text-black">
                  Help Center
                </Link>

                <Link to="/faq" className="block hover:text-black">
                  FAQ
                </Link>

                <Link to="/docs" className="block hover:text-black">
                  Docs
                </Link>

                <Link to="/contact" className="block hover:text-black">
                  Contact
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

                <Link to="/pricing" className="block hover:text-black">
                  Pricing
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
      {errorMessageVisibility && error && (
  <p className="text-red-500 text-sm font-medium fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 px-4 py-2 rounded-lg shadow-lg">
    {error}
  </p>
)}
    </div>
  )
}