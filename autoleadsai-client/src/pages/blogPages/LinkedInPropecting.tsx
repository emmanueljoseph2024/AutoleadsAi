import { motion } from 'framer-motion'

import {
  FiLinkedin,
  FiTarget,
  FiUsers,
  FiMessageCircle,
  FiTrendingUp,
  FiSearch,
  FiSend,
  FiBarChart2,
  FiZap,
} from 'react-icons/fi'

export default function LinkedInProspectingBlog() {
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
                <FiLinkedin className="text-base sm:text-lg" />
                LinkedIn Prospecting
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                Best Strategies for LinkedIn Prospecting
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Learn how to identify, connect, and convert high-value prospects
                on LinkedIn using modern AI-driven and human-first strategies.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5">

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiUsers className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Audience Targeting
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiMessageCircle className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Personalized Outreach
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiZap className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    AI Optimization
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
                      <FiSearch />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Why LinkedIn Is Powerful for Prospecting
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    LinkedIn provides structured professional data that allows
                    businesses to identify decision-makers with high accuracy.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    Unlike other platforms, users already present their job roles,
                    industries, and business needs clearly.
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
                      <FiTarget />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Targeting the Right Prospects
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed mb-6">
                    Effective prospecting starts with filtering the right audience
                    based on job titles, industries, and engagement signals.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed">
                    This ensures outreach efforts focus only on relevant high-value
                    individuals.
                  </p>

                </motion.div>

                {/* SECTION 3 GRID */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid md:grid-cols-2 gap-6"
                >

                  {[
                    {
                      icon: <FiUsers />,
                      title: 'Audience Segmentation',
                      text: 'Group prospects based on industry, role, and company size.',
                    },
                    {
                      icon: <FiMessageCircle />,
                      title: 'Personal Messaging',
                      text: 'Send tailored messages that match user context and needs.',
                    },
                    {
                      icon: <FiSend />,
                      title: 'Outreach Flow',
                      text: 'Create structured follow-up sequences for better engagement.',
                    },
                    {
                      icon: <FiBarChart2 />,
                      title: 'Conversion Tracking',
                      text: 'Measure response rates and optimize outreach performance.',
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

                {/* SECTION 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-gray-50 border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                      <FiTrendingUp />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Scaling LinkedIn Prospecting
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    Scaling LinkedIn outreach requires balancing automation with
                    personalization to maintain authenticity.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    AI systems help maintain this balance while increasing reach
                    and efficiency.
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
                      'LinkedIn gives structured professional data',
                      'Targeting improves outreach accuracy',
                      'Personalization increases conversions',
                      'Automation scales prospecting',
                      'Consistency drives results',
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