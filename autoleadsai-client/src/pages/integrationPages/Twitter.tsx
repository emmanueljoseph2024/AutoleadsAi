import { motion } from 'framer-motion'

import {
  FiTwitter,
  FiTrendingUp,
  FiSearch,
  FiCpu,
  FiActivity,
  FiZap,
  FiMessageCircle,
  FiLayers,
} from 'react-icons/fi'

export default function XTwitterIntegrationPage() {
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
                <FiTwitter className="text-base sm:text-lg" />
                Integration
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                X / Twitter
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Track trending conversations, customer pain points and buying
                intent in real time using AI-powered social intelligence across
                X (Twitter) discussions.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5">

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiTrendingUp className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Trend Tracking
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiSearch className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Conversation Scan
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiZap className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Real-time Signals
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
                      <FiTwitter />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      X (Twitter) Intelligence Engine
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    X is a real-time source of conversations where users express
                    problems, opinions and buying intent openly.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    AI scans these conversations to extract valuable business
                    opportunities instantly.
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
                      AI Trend Detection System
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed mb-6">
                    The AI system continuously monitors trending topics and
                    keywords to detect emerging customer pain points.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed">
                    This helps businesses act early on market opportunities.
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
                      title: 'Trend Monitoring',
                      text: 'Detect emerging topics and viral discussions in real time.',
                    },
                    {
                      icon: <FiMessageCircle />,
                      title: 'Pain Point Detection',
                      text: 'Identify user frustrations and unmet needs from posts.',
                    },
                    {
                      icon: <FiSearch />,
                      title: 'Conversation Analysis',
                      text: 'Analyze tweets and replies for intent signals.',
                    },
                    {
                      icon: <FiActivity />,
                      title: 'Live Signal Tracking',
                      text: 'Monitor engagement changes and trending spikes instantly.',
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
                      <FiLayers />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Scalable Social Intelligence
                    </h2>

                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    X monitoring allows businesses to scale social listening
                    across millions of conversations automatically.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    This improves decision-making and unlocks faster lead
                    generation opportunities.
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
                      'X reveals real-time customer intent signals',
                      'Trending topics expose market demand',
                      'Replies show direct pain points',
                      'Engagement patterns indicate interest',
                      'AI converts tweets into lead opportunities',
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