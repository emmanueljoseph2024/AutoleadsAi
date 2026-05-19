import { motion } from 'framer-motion'

import {
  FiCpu,
  FiZap,
  FiLayers,
  FiTarget,
  FiDatabase,
  FiTrendingUp,
  FiActivity,
  FiSend,
  FiBarChart2,
} from 'react-icons/fi'

export default function AutomationWorkflowsAPIPage() {
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
                <FiCpu className="text-base sm:text-lg" />
                API Documentation
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                Automation Workflows
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Build advanced lead generation and outreach automations that
                streamline prospect discovery, qualification and engagement at
                scale using AI-powered workflow systems.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5">

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiZap className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Workflow Automation
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiTarget className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Lead Targeting
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiLayers className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Scalable Systems
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

              {/* MAIN CONTENT */}
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
                      <FiCpu />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      What Are Automation Workflows?
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    Automation workflows are structured systems that execute lead
                    generation, outreach and engagement processes without manual
                    intervention.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    They help businesses streamline operations and improve
                    consistency across marketing and sales pipelines.
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
                      How AI Powers Workflows
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed mb-6">
                    AI enables workflows to automatically detect intent,
                    segment leads, personalize outreach and optimize campaign
                    performance in real time.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed">
                    This eliminates manual tasks while increasing speed and
                    precision in lead generation processes.
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
                      icon: <FiSend />,
                      title: 'Automated Outreach',
                      text: 'Send personalized messages at scale without manual effort.',
                    },
                    {
                      icon: <FiDatabase />,
                      title: 'Data Processing',
                      text: 'Organize and structure lead data automatically.',
                    },
                    {
                      icon: <FiBarChart2 />,
                      title: 'Performance Analytics',
                      text: 'Track workflow efficiency and optimize results.',
                    },
                    {
                      icon: <FiTrendingUp />,
                      title: 'Scalable Growth',
                      text: 'Expand lead generation without increasing workload.',
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

                {/* FINAL SECTION */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-gray-50 border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                      <FiActivity />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Scalable API Automation Systems
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    Automation workflows allow businesses to build scalable API
                    systems that manage leads, outreach and engagement seamlessly.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    This creates a foundation for high-performance, AI-driven
                    marketing and sales infrastructure.
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
                      'Automation improves workflow efficiency',
                      'AI enhances lead targeting accuracy',
                      'APIs enable scalable systems',
                      'Data-driven workflows increase conversions',
                      'Real-time optimization boosts performance',
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3"
                      >

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