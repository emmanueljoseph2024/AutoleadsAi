import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiShield,
  FiLock,
  FiEye,
  FiDatabase,
  FiMail,
  FiServer,
  FiGlobe,
  FiCheckCircle,
  FiArrowRight,
} from 'react-icons/fi'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <main>
        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-linear-to-b from-blue-50 to-white py-16 sm:py-20 lg:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-full sm:max-w-4xl">
              <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6 sm:mb-8">
                <FiShield />
                Privacy & Data Protection
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-7xl font-black leading-tight mb-6 sm:mb-8">
                Your Privacy
                <br />
                <span className="text-blue-600">Matters to Us</span>
              </h1>

              <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-full sm:max-w-3xl">
                AutoLeads AI is committed to protecting your privacy,
                securing your information, and ensuring transparency in how
                data is collected and used across our platform.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  icon: <FiLock />,
                  title: 'Secure Infrastructure',
                  desc: 'We use encrypted systems and secure cloud infrastructure to protect user information.',
                },
                {
                  icon: <FiDatabase />,
                  title: 'Protected Data Storage',
                  desc: 'All sensitive user information is stored securely with strict access controls.',
                },
                {
                  icon: <FiEye />,
                  title: 'Transparent Usage',
                  desc: 'We clearly explain how your information is collected, processed and used.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all"
                >
                  <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                    {item.icon}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black mb-4">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-full sm:max-w-5xl">
              <h2 className="text-3xl sm:text-4xl font-black mb-10 sm:mb-12">
                Information We Collect
              </h2>

              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    title: 'Account Information',
                    desc: 'When you create an account, we may collect your name, email address, company details and login credentials.',
                    icon: <FiMail />,
                  },
                  {
                    title: 'Usage & Analytics',
                    desc: 'We collect usage information to improve platform performance, user experience and automation accuracy.',
                    icon: <FiGlobe />,
                  },
                  {
                    title: 'Lead Generation Data',
                    desc: 'Our system processes publicly available business information and lead data for prospecting purposes.',
                    icon: <FiDatabase />,
                  },
                  {
                    title: 'Technical Information',
                    desc: 'We may collect browser type, device information, IP address and system logs for security purposes.',
                    icon: <FiServer />,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-4xl p-6 sm:p-8 border border-gray-100 shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl shrink-0">
                        {item.icon}
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-black mb-4">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-full sm:max-w-5xl">
              <h2 className="text-3xl sm:text-4xl font-black mb-10 sm:mb-12">
                How We Use Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  'Provide and improve AutoLeads AI services',
                  'Generate and manage business leads',
                  'Monitor platform security and performance',
                  'Improve AI recommendations and automation',
                  'Send updates, alerts and support messages',
                  'Prevent abuse, spam and unauthorized access',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-4xl border border-gray-100 p-5 sm:p-6 shadow-sm flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                      <FiCheckCircle />
                    </div>

                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-medium">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <h2 className="text-3xl sm:text-4xl font-black mb-6 sm:mb-8">
                Data Security & Protection
              </h2>

              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                    We implement industry-standard security practices to
                    protect user data and platform infrastructure from
                    unauthorized access, loss or misuse.
                  </p>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    Access to sensitive information is limited only to
                    authorized systems and personnel where necessary.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {[
                    'Encrypted communication',
                    'Secure authentication systems',
                    'Cloud infrastructure monitoring',
                    'Restricted internal access',
                    'Continuous security improvements',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-blue-50 rounded-3xl p-4 sm:p-5"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl">
                        <FiShield />
                      </div>

                      <p className="font-semibold text-base sm:text-lg">{item}</p>
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
          className="py-16 sm:py-20 lg:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-4xl bg-linear-to-r from-blue-600 to-indigo-600 p-8 sm:p-10 lg:p-14 text-white shadow-2xl shadow-blue-200">
              <div className="max-w-full sm:max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-3xl sm:text-4xl mb-5 sm:mb-6">
                  <FiShield />
                  <FiLock />
                  <FiCheckCircle />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-5 sm:mb-6">
                  Questions About Privacy?
                </h2>

                <p className="text-base sm:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10">
                  Contact our support team if you have questions regarding
                  your data, account privacy or platform security.
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-white text-blue-600 font-black text-base sm:text-lg hover:scale-105 transition-all"
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