import { motion } from 'framer-motion'

import {
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiMessageCircle,
  FiDatabase,
  FiBarChart2,
  FiZap,
  FiActivity,
} from 'react-icons/fi'

export default function RedditLeadBlog() {
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
                <FiMessageCircle className="text-base sm:text-lg" />
                Reddit Lead Intelligence
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                How to Find High-Intent Leads on Reddit
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Learn how businesses are using Reddit conversations to discover
                real customer intent, hidden opportunities, and high-conversion leads
                before competitors notice them.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5">

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiSearch className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Conversation Mining
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiTarget className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    Intent Detection
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiZap className="text-blue-600 text-lg" />
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    AI Opportunity Mapping
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

              {/* LEFT */}
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
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                      <FiTrendingUp />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Why Reddit Is a Goldmine for Leads
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    Reddit is one of the few platforms where users openly discuss
                    their problems, frustrations, and buying decisions without
                    filters or marketing influence.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    Unlike traditional ads or cold outreach, Reddit gives you raw
                    intent signals — people asking for solutions, comparing tools,
                    and sharing real-world pain points.
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
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-white/20 flex items-center justify-center text-2xl">
                      <FiSearch />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      How Intent Appears on Reddit
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed mb-6">
                    High-intent users often express their needs directly through
                    questions like “what’s the best tool for…”, “how do I solve…”,
                    or “alternative to…”.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed">
                    These conversations reveal buying signals long before users
                    ever reach a checkout page or search engine.
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
                      icon: <FiMessageCircle />,
                      title: 'Conversation Tracking',
                      text: 'Monitor subreddit discussions to detect recurring problems and needs.',
                    },
                    {
                      icon: <FiTarget />,
                      title: 'Intent Scoring',
                      text: 'Identify users showing strong buying signals based on language patterns.',
                    },
                    {
                      icon: <FiDatabase />,
                      title: 'Data Structuring',
                      text: 'Organize Reddit insights into usable lead databases for outreach.',
                    },
                    {
                      icon: <FiBarChart2 />,
                      title: 'Trend Analysis',
                      text: 'Track rising topics to predict demand before competitors react.',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="w-14 h-14 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6">
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
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                      <FiActivity />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Turning Reddit Signals into Leads
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    Once intent signals are detected, they can be structured into
                    actionable leads with context such as problem type, urgency,
                    and possible solutions.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    This allows businesses to move from random outreach to
                    precise, context-aware engagement that feels natural instead
                    of intrusive.
                  </p>

                </motion.div>

              </div>

              {/* RIGHT SIDEBAR */}
              <div className="space-y-6 sm:space-y-8">

                <div className="bg-gray-50 border border-gray-100 rounded-4xl p-6 sm:p-8">

                  <h3 className="text-xl sm:text-2xl font-black mb-6">
                    Key Insights
                  </h3>

                  <div className="space-y-5">

                    {[
                      'Reddit reveals raw customer intent',
                      'Users openly describe real problems',
                      'Subreddits act like demand clusters',
                      'Intent is visible before search engines',
                      'AI can structure conversations into leads',
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
                    <FiZap />
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-5">
                    AI + Reddit Intelligence
                  </h3>

                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    Modern systems can scan Reddit discussions, extract intent,
                    and turn conversations into structured lead opportunities
                    automatically.
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