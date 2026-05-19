import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiShield,
  FiLock,
  FiSettings,
  FiGlobe,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiDatabase,
  FiClock,
} from 'react-icons/fi'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <main>
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-linear-to-b from-blue-50 to-white py-16 sm:py-20 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8">
                <FiSettings />
                Cookies Policy
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                Cookies &
                <br />
                <span className="text-blue-600">
                  Tracking Policy
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                AutoLeads AI uses cookies and related technologies to
                improve platform functionality, personalize experiences,
                analyze performance and enhance security across all
                systems.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: <FiShield />,
                  title: 'Secure Sessions',
                  desc: 'Cookies help maintain secure authenticated sessions across devices.',
                },
                {
                  icon: <FiGlobe />,
                  title: 'Better Experience',
                  desc: 'We personalize your browsing and dashboard experience.',
                },
                {
                  icon: <FiDatabase />,
                  title: 'Performance Analytics',
                  desc: 'Cookies allow us to analyze usage and improve features.',
                },
                {
                  icon: <FiSettings />,
                  title: 'Platform Settings',
                  desc: 'Your preferences and settings are stored for convenience.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-5 sm:mb-6">
                    {item.icon}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4">
                    {item.title}
                  </h2>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white rounded-4xl border border-gray-100 p-6 sm:p-8 lg:p-10 shadow-sm"
              >
                <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                  <FiCheckCircle />
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6">
                  Types of Cookies We Use
                </h2>

                <div className="space-y-5">
                  {[
                    'Essential authentication cookies',
                    'Analytics and performance cookies',
                    'Security and fraud prevention cookies',
                    'Preference and customization cookies',
                    'Session management cookies',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <FiCheckCircle />
                      </div>

                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white rounded-4xl border border-gray-100 p-6 sm:p-8 lg:p-10 shadow-sm"
              >
                <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center text-3xl mb-6">
                  <FiAlertCircle />
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6">
                  Managing Cookies
                </h2>

                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-6">
                  You can manage or disable cookies through your browser
                  settings. Some features of AutoLeads AI may not work
                  correctly if essential cookies are disabled.
                </p>

                <div className="space-y-5">
                  {[
                    'Browser cookie controls',
                    'Session expiration management',
                    'Preference storage settings',
                    'Analytics consent management',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-3xl bg-gray-50 border border-gray-100"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <FiLock />
                      </div>

                      <p className="text-sm sm:text-base text-gray-700 font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-12 shadow-sm">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="w-16 h-16 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl mb-6">
                    <FiClock />
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
                    Cookie Retention &
                    <span className="text-blue-600">
                      Data Storage
                    </span>
                  </h2>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed mb-6">
                    Cookies may remain active for varying periods
                    depending on their purpose. Session cookies expire
                    automatically when you close your browser, while
                    persistent cookies remain for future visits.
                  </p>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    We continuously review and optimize our data handling
                    practices to maintain platform security and
                    performance.
                  </p>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      title: 'Session Cookies',
                      desc: 'Temporary cookies that expire when browsing ends.',
                    },
                    {
                      title: 'Persistent Cookies',
                      desc: 'Stored cookies that improve future experiences.',
                    },
                    {
                      title: 'Security Cookies',
                      desc: 'Used to detect suspicious activity and secure accounts.',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-5 sm:p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <h3 className="text-lg sm:text-xl font-black mb-3">
                        {item.title}
                      </h3>

                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="pb-16 sm:pb-20 lg:pb-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-4xl bg-linear-to-r from-blue-600 to-indigo-600 p-8 sm:p-10 lg:p-14 text-white shadow-2xl shadow-blue-200">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 text-3xl sm:text-4xl mb-6">
                  <FiShield />
                  <FiLock />
                  <FiSettings />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
                  Questions About Cookies?
                </h2>

                <p className="text-sm sm:text-base lg:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10">
                  Our team is available to answer questions regarding
                  cookies, tracking technologies and privacy practices
                  used within AutoLeads AI.
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-blue-600 text-sm sm:text-base lg:text-lg font-black hover:scale-105 transition-all"
                >
                  Contact Support
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}