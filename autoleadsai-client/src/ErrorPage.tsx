import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiAlertTriangle,
  FiHome,
  FiRefreshCw,
  FiArrowLeft,
  FiSearch,
  FiShield,
} from 'react-icons/fi'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-red-100 text-red-600 px-5 py-2.5 rounded-full text-sm font-bold mb-8">
                <FiAlertTriangle />
                Page Not Found
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none tracking-tight mb-8">
                404
              </h1>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
                Something went
                <br />
                <span className="text-blue-600">wrong.</span>
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mb-10">
                The page you are trying to access may have been removed,
                renamed, or is temporarily unavailable. You can return
                to the homepage or continue exploring the platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-2xl shadow-blue-200"
                >
                  <FiHome />
                  Back to Home
                </Link>

                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-gray-300 font-bold text-lg hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <FiRefreshCw />
                  Refresh Page
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-4xl sm:text-6xl mx-auto mb-8 shadow-lg">
                    <FiAlertTriangle />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-center mb-4">
                    Page Unavailable
                  </h3>

                  <p className="text-gray-600 text-center text-base sm:text-lg leading-relaxed mb-10">
                    AutoLeads AI could not find the page you requested.
                  </p>

                  <div className="space-y-5">
                    {[
                      {
                        icon: <FiSearch />,
                        title: 'Check the URL',
                        desc: 'The page address may contain a typo or invalid route.',
                      },
                      {
                        icon: <FiArrowLeft />,
                        title: 'Return to Previous Page',
                        desc: 'Go back and continue browsing the platform safely.',
                      },
                      {
                        icon: <FiShield />,
                        title: 'Secure Navigation',
                        desc: 'All AutoLeads AI pages are protected and monitored.',
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-5 p-5 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                          {item.icon}
                        </div>

                        <div>
                          <h4 className="text-xl font-black mb-2">
                            {item.title}
                          </h4>

                          <p className="text-gray-600 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 p-6 rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                        <FiHome />
                      </div>

                      <div>
                        <p className="text-lg font-black">
                          Continue Exploring
                        </p>

                        <p className="text-blue-100">
                          Discover leads, automation and AI workflows.
                        </p>
                      </div>
                    </div>

                    <Link
                      to="/"
                      className="inline-flex items-center gap-3 mt-4 px-6 py-3 rounded-2xl bg-white text-blue-600 font-bold hover:scale-105 transition-all"
                    >
                      Go to Dashboard
                      <FiArrowLeft />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}