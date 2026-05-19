import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiFileText,
  FiShield,
  FiLock,
  FiAlertCircle,
  FiCheckCircle,
  FiUsers,
  FiGlobe,
  FiArrowRight,
  FiServer,
  FiMail,
} from 'react-icons/fi'

export default function TermsPage() {
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
                <FiFileText />
                Terms & Conditions
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-7xl font-black leading-tight mb-6 sm:mb-8">
                Terms of
                <br />
                <span className="text-blue-600">Service</span>
              </h1>

              <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-full sm:max-w-3xl">
                These Terms of Service govern your use of AutoLeads AI.
                By accessing or using our platform, you agree to comply
                with the terms outlined below.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  icon: <FiShield />,
                  title: 'Secure Platform Usage',
                  desc: 'Users must use the platform responsibly and comply with all applicable laws and regulations.',
                },
                {
                  icon: <FiLock />,
                  title: 'Account Protection',
                  desc: 'You are responsible for maintaining the confidentiality of your account credentials.',
                },
                {
                  icon: <FiGlobe />,
                  title: 'Global Accessibility',
                  desc: 'Our services are available internationally but may be subject to local legal restrictions.',
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
                Acceptance of Terms
              </h2>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white rounded-4xl border border-gray-100 p-6 sm:p-8 lg:p-10 shadow-sm"
              >
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  By using AutoLeads AI, you agree to these Terms of
                  Service and our policies. If you do not agree with any
                  part of these terms, you should discontinue using the
                  platform immediately.
                </p>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  We reserve the right to update or modify these terms at
                  any time. Continued use of the platform after changes
                  are made constitutes acceptance of the updated terms.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-full sm:max-w-5xl">
              <h2 className="text-3xl sm:text-4xl font-black mb-10 sm:mb-12">
                User Responsibilities
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  'Provide accurate account information',
                  'Maintain the security of your account',
                  'Use the platform ethically and legally',
                  'Avoid unauthorized scraping or abuse',
                  'Respect privacy and data protection laws',
                  'Avoid sending spam or harmful content',
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
            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white rounded-4xl border border-gray-100 p-6 sm:p-8 lg:p-10 shadow-sm"
              >
                <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center text-3xl mb-6">
                  <FiAlertCircle />
                </div>

                <h2 className="text-2xl sm:text-3xl font-black mb-5 sm:mb-6">
                  Prohibited Activities
                </h2>

                <div className="space-y-5">
                  {[
                    'Using the platform for illegal activities',
                    'Attempting to bypass platform security',
                    'Sending spam or fraudulent messages',
                    'Misusing lead generation systems',
                    'Uploading malicious software or harmful content',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <FiAlertCircle />
                      </div>

                      <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white rounded-4xl border border-gray-100 p-6 sm:p-8 lg:p-10 shadow-sm"
              >
                <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                  <FiServer />
                </div>

                <h2 className="text-2xl sm:text-3xl font-black mb-5 sm:mb-6">
                  Service Availability
                </h2>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  We strive to provide reliable and uninterrupted access
                  to AutoLeads AI. However, we cannot guarantee continuous
                  availability due to maintenance, upgrades or unforeseen
                  technical issues.
                </p>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Features and services may evolve over time as the
                  platform improves and expands.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black mb-5 sm:mb-6">
                    Intellectual Property
                  </h2>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                    All platform content, branding, software systems,
                    workflows and designs associated with AutoLeads AI are
                    protected by intellectual property laws.
                  </p>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    Users may not reproduce, distribute or exploit any
                    part of the platform without prior written permission.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {[
                    'Protected platform branding',
                    'Secure software infrastructure',
                    'Licensed technologies',
                    'AI automation systems',
                    'Proprietary workflows',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-blue-50 rounded-3xl p-5"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl">
                        <FiCheckCircle />
                      </div>

                      <p className="font-semibold text-lg">{item}</p>
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
              <div className="max-w-full sm:max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-3xl sm:text-4xl mb-5 sm:mb-6">
                  <FiUsers />
                  <FiShield />
                  <FiMail />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-5 sm:mb-6">
                  Need More Information?
                </h2>

                <p className="text-base sm:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10">
                  If you have questions regarding these Terms of Service,
                  our team is available to provide clarification and
                  support.
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-white text-blue-600 font-black text-base sm:text-lg hover:scale-105 transition-all"
                >
                  Contact Us
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