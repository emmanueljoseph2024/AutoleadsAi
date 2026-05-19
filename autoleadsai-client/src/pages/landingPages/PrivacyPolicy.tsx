import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiShield,
  FiLock,
  FiDatabase,
  FiEye,
  FiUserCheck,
  FiGlobe,
  FiMail,
  FiCheckCircle,
  FiAlertCircle,
  FiServer,
  FiSettings,
} from 'react-icons/fi'

export default function PrivacyPolicyPage() {
  const privacySections = [
    {
      icon: <FiDatabase />,
      title: 'Information We Collect',
      description:
        'We collect account details, workflow data, integrations and platform usage information to improve our services.',
    },
    {
      icon: <FiLock />,
      title: 'How We Protect Data',
      description:
        'Your information is protected using encrypted infrastructure, secure authentication and modern security systems.',
    },
    {
      icon: <FiEye />,
      title: 'How Data Is Used',
      description:
        'We use collected information to improve automation workflows, personalize experiences and maintain platform performance.',
    },
    {
      icon: <FiGlobe />,
      title: 'Third-Party Integrations',
      description:
        'Connected services such as Gmail, LinkedIn and automation tools may process information through secure APIs.',
    },
    {
      icon: <FiUserCheck />,
      title: 'User Rights',
      description:
        'Users can manage account data, export information and request deletion of stored personal information.',
    },
    {
      icon: <FiServer />,
      title: 'Infrastructure Security',
      description:
        'We maintain monitored cloud infrastructure and secure systems designed to protect platform availability.',
    },
  ]

  const privacyPoints = [
    'Your data is encrypted and securely stored.',
    'We never sell personal information to third parties.',
    'You control your integrations and connected accounts.',
    'Users can request account deletion anytime.',
    'Secure authentication systems protect your account.',
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-200">
              A
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
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
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6 sm:mb-8">
                <FiShield className="text-lg" />
                Privacy & Security
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight mb-6 sm:mb-8">
                Your Data
                <span className="text-blue-600"> Matters</span>
              </h1>

              <p className="text-base sm:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                AutoLeads AI is committed to protecting your information,
                maintaining transparency and ensuring secure AI-powered
                automation systems.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-2xl bg-blue-600 text-white text-lg font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 text-center"
                >
                  Contact Support
                </Link>

                <Link
                  to="/help-center"
                  className="px-8 py-4 rounded-2xl border border-gray-300 text-lg font-bold hover:bg-gray-50 transition-all text-center"
                >
                  Visit Help Center
                </Link>
              </div>
            </div>

            <motion.div
              whileInView={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              viewport={{ once: false, amount: 0.6 }}
              className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black">
                    Security Status
                  </h2>

                  <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    Infrastructure protected
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                  <FiLock />
                </div>
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: <FiCheckCircle />,
                    title: 'Encrypted Storage',
                    value: 'Active',
                  },
                  {
                    icon: <FiShield />,
                    title: 'Security Monitoring',
                    value: '24/7',
                  },
                  {
                    icon: <FiSettings />,
                    title: 'Secure Authentication',
                    value: 'Enabled',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-5 rounded-3xl bg-gray-50 border border-gray-100"
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
                          {item.value}
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
          className="bg-gray-50 py-16 sm:py-20 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                Privacy Policy
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                How We Handle Information
              </h2>

              <p className="text-base sm:text-xl text-gray-600 max-w-full sm:max-w-3xl mx-auto leading-relaxed">
                Learn how AutoLeads AI collects, protects and manages user data
                across our automation platform.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {privacySections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-4xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all"
                >
                  <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                    {section.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-4">
                    {section.title}
                  </h3>

                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {section.description}
                  </p>
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-3xl sm:text-4xl text-blue-600 mb-6 sm:mb-8">
                  <FiShield />
                  <FiLock />
                  <FiDatabase />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 sm:mb-8">
                  Your Privacy Rights
                </h2>

                <p className="text-base sm:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                  We believe users should have full transparency and control
                  over how their information is managed and protected.
                </p>

                <div className="space-y-4 sm:space-y-5">
                  {privacyPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <FiCheckCircle />
                      </div>

                      <p className="text-lg text-gray-700 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-950 rounded-4xl p-6 sm:p-8 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                </div>

                <div className="space-y-6">
                  <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4 mb-3">
                      <FiLock className="text-blue-400 text-2xl" />

                      <h3 className="text-white font-black text-lg">
                        Encryption Enabled
                      </h3>
                    </div>

                    <p className="text-gray-400 leading-relaxed">
                      All sensitive information is encrypted and securely stored.
                    </p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4 mb-3">
                      <FiAlertCircle className="text-yellow-400 text-2xl" />

                      <h3 className="text-white font-black text-lg">
                        Security Monitoring
                      </h3>
                    </div>

                    <p className="text-gray-400 leading-relaxed">
                      Continuous monitoring helps protect workflows and systems.
                    </p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4 mb-3">
                      <FiUserCheck className="text-green-400 text-2xl" />

                      <h3 className="text-white font-black text-lg">
                        User Control
                      </h3>
                    </div>

                    <p className="text-gray-400 leading-relaxed">
                      Users can manage integrations and request data deletion.
                    </p>
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
              <div className="max-w-full sm:max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-3xl sm:text-4xl mb-6 sm:mb-8">
                  <FiShield />
                  <FiLock />
                  <FiMail />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-5 sm:mb-6">
                  Questions About Privacy?
                </h2>

                <p className="text-base sm:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10">
                  Contact our team if you have questions regarding data
                  protection, integrations or account privacy.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <Link
                    to="/contact"
                    className="px-8 py-4 rounded-2xl bg-white text-blue-600 text-lg font-black hover:scale-105 transition-all text-center"
                  >
                    Contact Support
                  </Link>

                  <Link
                    to="/help-center"
                    className="px-8 py-4 rounded-2xl border border-white/30 text-white text-lg font-bold hover:bg-white/10 transition-all text-center"
                  >
                    Visit Help Center
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
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
                Resources
              </h3>

              <div className="space-y-4 text-gray-600">
                <Link to="/docs" className="block hover:text-black">
                  Docs
                </Link>

                <Link to="/help-center" className="block hover:text-black">
                  Help Center
                </Link>

                <Link to="/faq" className="block hover:text-black">
                  FAQ
                </Link>

                <Link to="/blog" className="block hover:text-black">
                  Blog
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

                <Link to="/pricing" className="block hover:text-black">
                  Pricing
                </Link>

                <Link to="/contact" className="block hover:text-black">
                  Contact
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