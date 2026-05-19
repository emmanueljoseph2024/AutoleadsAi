import { motion } from 'framer-motion'

import {
  FiDatabase,
  FiShield,
  FiCpu,
  FiLayers,
  FiTrendingUp,
  FiActivity,
  FiZap,
  FiLock,
  FiServer,
} from 'react-icons/fi'

export default function PostgreSQLIntegrationPage() {
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
                <FiDatabase className="text-base sm:text-lg" />
                Integration
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                PostgreSQL
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Store leads, campaigns, AI insights and workflow data securely
                at scale with a reliable and high-performance database system.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5">

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiShield className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Secure Storage
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiServer className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Scalable System
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiLock className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Data Protection
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
                      <FiDatabase />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Structured Data Storage
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    PostgreSQL provides a structured and reliable system for
                    storing all lead and automation data.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    It ensures consistency and fast retrieval of information
                    across the platform.
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
                      <FiCpu />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      AI Data Processing Layer
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed mb-6">
                    AI-generated insights and lead signals are stored and
                    processed efficiently through structured tables.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed">
                    This allows fast querying and real-time analytics.
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
                      icon: <FiTrendingUp />,
                      title: 'Lead Storage',
                      text: 'Store and organize high-intent lead data efficiently.',
                    },
                    {
                      icon: <FiLayers />,
                      title: 'Campaign Data',
                      text: 'Manage outreach and automation campaign records.',
                    },
                    {
                      icon: <FiActivity />,
                      title: 'AI Insights',
                      text: 'Save analyzed signals and predictions from AI engine.',
                    },
                    {
                      icon: <FiZap />,
                      title: 'Fast Queries',
                      text: 'Retrieve data instantly for real-time workflows.',
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

                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                      <FiShield />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Secure & Scalable Architecture
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    PostgreSQL ensures enterprise-grade security and scalability
                    for all system data.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    It supports growth without compromising performance or
                    reliability.
                  </p>

                </motion.div>

              </div>

              {/* SIDEBAR */}
              <div className="space-y-6 sm:space-y-8">

                <div className="bg-gray-50 border border-gray-100 rounded-4xl p-6 sm:p-8">

                  <h3 className="text-xl sm:text-2xl font-black mb-6">
                    Key Insights
                  </h3>

                  <div className="space-y-5">

                    {[
                      'Stores all leads and campaign data',
                      'Supports AI-driven workflows',
                      'Ensures secure data handling',
                      'Optimized for fast retrieval',
                      'Scales with business growth',
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

              </div>

            </div>

          </div>
        </section>

      </main>
    </div>
  )
}