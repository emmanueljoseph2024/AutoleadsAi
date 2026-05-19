import { motion } from 'framer-motion'

import {
  FiActivity,
  FiBarChart2,
  FiCheckCircle,
  FiCpu,
  FiMail,
  FiSearch,
  FiTarget,
  FiZap,
} from 'react-icons/fi'

export default function HowItWorksPage() {

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">

      <main>

        <section className="border-b border-gray-100 bg-linear-to-b from-blue-50 to-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              className="max-w-4xl"
            >

              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold mb-6">
                <FiCpu />
                AI Lead Automation
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                How AutoLeads AI Works
              </h1>

              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Discover how AutoLeads AI monitors conversations, detects
                buying intent and helps businesses automate lead generation
                workflows at scale.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5">

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-4xl px-4 py-3 shadow-sm">
                  <FiSearch className="text-blue-600 text-lg" />

                  <span className="text-sm sm:text-base font-semibold">
                    Smart Monitoring
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-4xl px-4 py-3 shadow-sm">
                  <FiTarget className="text-blue-600 text-lg" />

                  <span className="text-sm sm:text-base font-semibold">
                    Intent Detection
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-4xl px-4 py-3 shadow-sm">
                  <FiZap className="text-blue-600 text-lg" />

                  <span className="text-sm sm:text-base font-semibold">
                    Automated Outreach
                  </span>
                </div>

              </div>

            </motion.div>

          </div>

        </section>

        <section className="py-14 sm:py-20 lg:py-28">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">

              {[
                {
                  icon: <FiSearch />,
                  title: 'Connect Platforms',
                  text: 'Connect platforms like LinkedIn, X, Reddit and email providers to start monitoring business conversations and engagement signals automatically.',
                },
                {
                  icon: <FiActivity />,
                  title: 'Monitor Conversations',
                  text: 'AI systems continuously scan posts, comments and discussions across platforms to identify opportunities and customer intent.',
                },
                {
                  icon: <FiTarget />,
                  title: 'Detect Buying Intent',
                  text: 'AutoLeads AI analyzes keywords, engagement patterns and conversations to identify people actively searching for solutions.',
                },
                {
                  icon: <FiCheckCircle />,
                  title: 'Qualify Leads',
                  text: 'Potential leads are automatically filtered and organized into smart pipelines based on relevance and intent signals.',
                },
                {
                  icon: <FiMail />,
                  title: 'Automate Outreach',
                  text: 'Generate personalized outreach workflows and engage prospects automatically using AI-powered messaging systems.',
                },
                {
                  icon: <FiBarChart2 />,
                  title: 'Track Performance',
                  text: 'Monitor analytics, conversions, replies and campaign performance in real time using intelligent reporting dashboards.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all"
                >

                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-4xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6">
                    {item.icon}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-5">
                    {item.title}
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    {item.text}
                  </p>

                </motion.div>
              ))}

            </div>

          </div>

        </section>

        <section className="pb-14 sm:pb-20 lg:pb-28">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-blue-600 rounded-4xl p-6 sm:p-8 lg:p-12 text-white shadow-2xl shadow-blue-200"
            >

              <div className="max-w-4xl">

                <div className="w-16 h-16 rounded-4xl bg-white/20 flex items-center justify-center text-3xl mb-6">
                  <FiCpu />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
                  Smarter Lead Generation With AI
                </h2>

                <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-blue-100 leading-relaxed mb-6">
                  AutoLeads AI transforms online conversations into actionable
                  business opportunities using intelligent monitoring,
                  automation and AI-powered lead qualification systems.
                </p>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 leading-relaxed">
                  Discover opportunities faster, scale outreach workflows and
                  stay ahead with real-time customer intent detection.
                </p>

              </div>

            </motion.div>

          </div>

        </section>

      </main>

    </div>
  )
}