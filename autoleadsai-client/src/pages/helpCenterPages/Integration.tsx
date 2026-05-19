import { motion } from 'framer-motion'

import {
  FiLink,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiDatabase,
  FiZap,
  FiLayers,
  FiCheckCircle,
} from 'react-icons/fi'

export default function IntegrationsHelpCenterPage() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <main>

        {/* HERO */}
        <section className="border-b border-gray-100 bg-linear-to-b from-blue-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl"
            >

              <div className="inline-flex items-center gap-2 sm:gap-3 bg-blue-100 text-blue-700 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8">
                <FiLink className="text-base sm:text-lg" />
                Help Center
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                Integrations
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Connect LinkedIn, Reddit, X, Gmail and other external platforms
                to power your AI lead generation workflows.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5">

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiLinkedin className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    LinkedIn
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiTwitter className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    X / Twitter
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiMail className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Gmail
                  </span>
                </div>

              </div>

            </motion.div>

          </div>
        </section>

        {/* CONTENT */}
        <section className="py-14 sm:py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">

              {/* MAIN */}
              <div className="lg:col-span-2 space-y-10 sm:space-y-14">

                {/* SECTION 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-sm"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                      <FiLink />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Connect External Platforms
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    Integrations allow the platform to monitor conversations,
                    track signals and automate lead workflows across multiple
                    services.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    Users can securely connect social media accounts, email
                    providers and workflow systems.
                  </p>

                </motion.div>

                {/* SECTION 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-blue-600 rounded-4xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl shadow-blue-200"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
                      <FiZap />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      AI-Powered Automation
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed mb-6">
                    Once connected, the platform can automatically scan social
                    conversations, identify buying intent and trigger workflows.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed">
                    This creates a seamless lead generation system powered by AI.
                  </p>

                </motion.div>

                {/* GRID */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid md:grid-cols-2 gap-6"
                >

                  {[
                    {
                      icon: <FiLinkedin />,
                      title: 'LinkedIn Monitoring',
                      text: 'Track professional conversations and business engagement.',
                    },
                    {
                      icon: <FiTwitter />,
                      title: 'X / Twitter Signals',
                      text: 'Monitor trends, pain points and customer intent.',
                    },
                    {
                      icon: <FiMail />,
                      title: 'Email Outreach',
                      text: 'Connect Gmail and email systems for outreach automation.',
                    },
                    {
                      icon: <FiDatabase />,
                      title: 'Data Synchronization',
                      text: 'Keep lead data organized and updated automatically.',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all"
                    >

                      <div className="w-14 h-14 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6 shrink-0">
                        {item.icon}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black mb-4">
                        {item.title}
                      </h3>

                      <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                        {item.text}
                      </p>

                    </div>
                  ))}

                </motion.div>

                {/* FINAL */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-gray-50 border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-green-100 text-green-600 flex items-center justify-center text-2xl shrink-0">
                      <FiCheckCircle />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Unified Integration System
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    All integrations work together to help automate lead discovery,
                    engagement tracking and outreach workflows efficiently.
                  </p>

                </motion.div>

              </div>

              {/* SIDEBAR */}
              <div className="space-y-6 sm:space-y-8">

                <div className="bg-gray-50 border border-gray-100 rounded-4xl p-6 sm:p-8">

                  <h3 className="text-xl sm:text-2xl font-black mb-6">
                    Integration Features
                  </h3>

                  <div className="space-y-5">

                    {[
                      'Connect multiple platforms',
                      'Monitor conversations automatically',
                      'Track buying intent signals',
                      'Automate outreach workflows',
                      'Centralize lead activity',
                    ].map((item, index) => (
                      <div key={index} className="flex gap-3">

                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
                          {index + 1}
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {item}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-4xl p-6 sm:p-8">

                  <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-3xl mb-6">
                    <FiLayers />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black mb-5">
                    Connected Workflow Ecosystem
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    Integrations create a unified automation environment for
                    monitoring, qualifying and managing leads efficiently.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>

      </main>
    </div>
  )
}