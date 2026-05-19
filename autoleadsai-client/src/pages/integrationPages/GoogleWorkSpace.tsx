import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiMail,
  FiDatabase,
  FiFolder,
  FiCheckCircle,
  FiClock,
  FiArrowRight,
  FiLayers,
  FiZap,
  FiShield,
  FiTrendingUp,
} from 'react-icons/fi'

export default function GoogleWorkspaceIntegrationPage() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <main>
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-linear-to-b from-blue-50 to-white py-16 sm:py-20 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8">
                  <FiLayers />
                  Integration Coming Soon
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                  Google
                  <span className="text-blue-600">
                    {' '}Workspace
                  </span>
                  <br />
                  Integration
                </h1>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                  Connect Gmail, Google Sheets and Google Drive to
                  automate outreach, reporting and lead storage.
                  This integration is currently in development and
                  will be available soon inside AutoLeads AI.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-blue-600 text-white text-sm sm:text-base font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                    Notify Me
                  </button>

                  <Link
                    to="/integrations"
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-gray-300 text-sm sm:text-base font-bold hover:bg-gray-50 transition-all text-center"
                  >
                    Back to Integrations
                  </Link>
                </div>
              </div>

              <motion.div
                whileInView={{ y: [0, -10, 0] }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="bg-white rounded-4xl border border-gray-100 p-6 sm:p-8 shadow-2xl"
              >
                <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-6">
                  {[
                    {
                      title: 'Gmail',
                      icon: <FiMail />,
                    },
                    {
                      title: 'Google Sheets',
                      icon: <FiDatabase />,
                    },
                    {
                      title: 'Google Drive',
                      icon: <FiFolder />,
                    },
                    {
                      title: 'Automation',
                      icon: <FiZap />,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-100 rounded-3xl p-5 hover:shadow-lg transition-all"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-4">
                        {item.icon}
                      </div>

                      <h3 className="text-sm sm:text-base lg:text-lg font-black">
                        {item.title}
                      </h3>
                    </div>
                  ))}
                </div>

                <div className="rounded-4xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 text-white">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-3xl bg-white/20 flex items-center justify-center text-2xl">
                      <FiClock />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black">
                        Coming Soon
                      </h3>

                      <p className="text-blue-100 text-sm sm:text-base">
                        Currently under active development
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base lg:text-lg text-blue-100 leading-relaxed">
                    We are building seamless Google Workspace
                    integrations to help businesses automate
                    outreach workflows, manage leads and scale
                    customer acquisition faster.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <section className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14 sm:mb-16">
              <p className="text-blue-600 font-bold uppercase tracking-[0.25em] text-xs sm:text-sm mb-4">
                Planned Features
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
                What This Integration Will Include
              </h2>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                AutoLeads AI will connect directly with your Google
                tools to automate repetitive workflows and improve
                lead management efficiency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <FiMail />,
                  title: 'Gmail Outreach',
                  desc: 'Send and manage personalized AI-powered outreach emails directly from Gmail.',
                },
                {
                  icon: <FiDatabase />,
                  title: 'Google Sheets Sync',
                  desc: 'Automatically store leads, analytics and campaign reports inside Google Sheets.',
                },
                {
                  icon: <FiFolder />,
                  title: 'Drive Storage',
                  desc: 'Save exports, reports and generated documents directly to Google Drive.',
                },
                {
                  icon: <FiZap />,
                  title: 'Workflow Automation',
                  desc: 'Trigger automated workflows whenever new opportunities are discovered.',
                },
                {
                  icon: <FiTrendingUp />,
                  title: 'Performance Tracking',
                  desc: 'Monitor campaign growth and outreach performance using connected analytics.',
                },
                {
                  icon: <FiShield />,
                  title: 'Secure Connections',
                  desc: 'Enterprise-grade authentication and encrypted data handling for integrations.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-4">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white rounded-4xl border border-gray-100 p-6 sm:p-8 lg:p-10 shadow-sm"
              >
                <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                  <FiCheckCircle />
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6">
                  Benefits for Teams
                </h2>

                <div className="space-y-5">
                  {[
                    'Centralized lead management',
                    'Faster AI-powered outreach',
                    'Automated reporting systems',
                    'Better collaboration workflows',
                    'Real-time data synchronization',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <FiCheckCircle />
                      </div>

                      <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-4xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl shadow-blue-200"
              >
                <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center text-3xl mb-6">
                  <FiClock />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
                  Integration
                  <br />
                  Launching Soon
                </h2>

                <p className="text-sm sm:text-base lg:text-xl text-blue-100 leading-relaxed mb-8">
                  Google Workspace integration is not currently
                  available yet, but it is part of our upcoming
                  roadmap and will be released in a future update.
                </p>

                <button className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-blue-600 text-sm sm:text-base lg:text-lg font-black hover:scale-105 transition-all">
                  Join Waitlist
                  <FiArrowRight />
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}