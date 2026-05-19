import { motion } from 'framer-motion'

import {
  FiCpu,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiMail,
  FiDatabase,
  FiBarChart2,
  FiZap,
  FiActivity,
} from 'react-icons/fi'

export default function AIautomation(){
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <main>

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
                AI & Lead Generation
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                How AI is Changing Modern Lead Generation
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Discover how AI-powered systems are helping businesses identify
                buying intent faster than traditional prospecting.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5">

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiTrendingUp className="text-blue-600 text-lg" />
                  <span className="text-sm sm:text-base font-semibold">
                    Faster Prospecting
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiTarget className="text-blue-600 text-lg" />
                  <span className="text-sm sm:text-base font-semibold">
                    Intent Detection
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <FiZap className="text-blue-600 text-lg" />
                  <span className="text-sm sm:text-base font-semibold">
                    AI Automation
                  </span>
                </div>

              </div>

            </motion.div>

          </div>
        </section>

        <section className="py-14 sm:py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">

              <div className="lg:col-span-2 space-y-10 sm:space-y-14">

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-sm"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                      <FiSearch />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      Traditional Prospecting is Slow
                    </h2>

                  </div>

                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    Traditional lead generation often depends on manually
                    searching directories, cold outreach lists and random
                    databases that may already be outdated before businesses
                    even contact prospects.
                  </p>

                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    Sales teams spend hours searching for contact information,
                    qualifying prospects and trying to understand whether a
                    person is actually interested in their product or service.
                  </p>

                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-blue-600 rounded-4xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl shadow-blue-200"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-white/20 flex items-center justify-center text-2xl">
                      <FiCpu />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      AI Understands Buying Intent
                    </h2>

                  </div>

                  <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed mb-6">
                    AI-powered systems can now monitor online conversations
                    across platforms such as Reddit, LinkedIn, X and business
                    communities to identify people actively discussing problems.
                  </p>

                  <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed">
                    Instead of targeting random users, businesses can focus on
                    people already showing intent to purchase, search for
                    solutions or compare alternatives.
                  </p>

                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 gap-6"
                >

                  {[
                    {
                      icon: <FiTarget />,
                      title: 'Intent Analysis',
                      text: 'AI systems analyze keywords, conversations and engagement patterns to understand user intent.',
                    },
                    {
                      icon: <FiMail />,
                      title: 'Smart Outreach',
                      text: 'Businesses can personalize outreach using conversation context and prospect interests.',
                    },
                    {
                      icon: <FiDatabase />,
                      title: 'Automated Data Collection',
                      text: 'AI tools can organize lead data automatically and reduce manual prospecting work.',
                    },
                    {
                      icon: <FiBarChart2 />,
                      title: 'Performance Tracking',
                      text: 'Campaigns become easier to optimize using real-time analytics and conversion insights.',
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

                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                        {item.text}
                      </p>

                    </div>
                  ))}

                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10"
                >

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                      <FiActivity />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                      The Future of Lead Generation
                    </h2>

                  </div>

                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                    AI is transforming lead generation from a manual guessing
                    process into a real-time intelligence system capable of
                    identifying opportunities before competitors even notice
                    them.
                  </p>

                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    Businesses that adopt AI-powered prospecting systems early
                    will gain faster access to customer intent, better
                    conversion rates and more scalable outreach workflows.
                  </p>

                </motion.div>

              </div>

              <div className="space-y-6 sm:space-y-8">

                <div className="bg-gray-50 border border-gray-100 rounded-4xl p-6 sm:p-8">

                  <h3 className="text-2xl font-black mb-6">
                    Key Highlights
                  </h3>

                  <div className="space-y-5">

                    {[
                      'AI identifies buying intent faster',
                      'Automation reduces manual prospecting',
                      'Real-time monitoring improves targeting',
                      'Lead qualification becomes smarter',
                      'Businesses scale outreach efficiently',
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3"
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

                <div className="bg-blue-50 border border-blue-100 rounded-4xl p-6 sm:p-8">

                  <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-3xl mb-6">
                    <FiZap />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black mb-5">
                    AI-Powered Automation
                  </h3>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                    Modern AI systems can monitor conversations, analyze
                    engagement signals, organize prospect data and assist with
                    intelligent outreach workflows automatically.
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