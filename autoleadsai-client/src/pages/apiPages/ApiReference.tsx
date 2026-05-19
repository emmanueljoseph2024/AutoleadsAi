import { motion } from 'framer-motion'

import {
  FiServer,
  FiLock,
  FiCode,
  FiDatabase,
  FiShield,
  FiActivity,
  FiCheckCircle,
  FiCpu,
  FiLayers,
  FiTerminal,
} from 'react-icons/fi'

export default function APIReference() {

  const endpoints = [
    {
      icon: <FiDatabase />,
      title: 'Lead Endpoints',
      description:
        'Manage lead discovery, prospect storage and AI-powered opportunity tracking.',
    },
    {
      icon: <FiActivity />,
      title: 'Workflow Endpoints',
      description:
        'Control automation workflows, triggers and intelligent monitoring systems.',
    },
    {
      icon: <FiCpu />,
      title: 'AI Intelligence',
      description:
        'Access AI analysis systems for intent detection and smart lead qualification.',
    },
    {
      icon: <FiLayers />,
      title: 'Integration Services',
      description:
        'Connect workflows, external services and automation infrastructure.',
    },
  ]

  const features = [
    {
      icon: <FiLock />,
      title: 'Authentication',
      description:
        'Secure API authentication with protected access control and token management.',
    },
    {
      icon: <FiShield />,
      title: 'Security',
      description:
        'Enterprise-grade infrastructure designed for protected automation workflows.',
    },
    {
      icon: <FiCode />,
      title: 'Structured Responses',
      description:
        'Consistent API responses optimized for scalable workflow integration.',
    },
    {
      icon: <FiTerminal />,
      title: 'Developer Ready',
      description:
        'Built for modern automation systems and AI-powered application workflows.',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">

      <main>

        <section className="bg-linear-to-b from-blue-50 to-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-5xl"
            >

              <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8">
                <FiServer className="text-base sm:text-lg" />
                API Documentation
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                API Reference
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8 sm:mb-10 max-w-4xl">
                Explore endpoints, requests, responses and authentication
                methods powering AutoLeads AI automation workflows and
                intelligent lead discovery systems.
              </p>

              <div className="flex flex-wrap gap-4">

                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-3xl px-5 py-4 shadow-sm">
                  <FiCode className="text-blue-600 text-xl" />
                  <span className="text-sm sm:text-base font-semibold">
                    Structured APIs
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-3xl px-5 py-4 shadow-sm">
                  <FiLock className="text-blue-600 text-xl" />
                  <span className="text-sm sm:text-base font-semibold">
                    Secure Authentication
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-3xl px-5 py-4 shadow-sm">
                  <FiActivity className="text-blue-600 text-xl" />
                  <span className="text-sm sm:text-base font-semibold">
                    AI Automation
                  </span>
                </div>

              </div>

            </motion.div>

          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-14 sm:mb-20">

              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-5">
                Core Endpoints
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
                API Infrastructure Overview
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                AutoLeads AI APIs are designed to support scalable workflow
                automation, lead intelligence systems and AI-powered prospect
                monitoring.
              </p>

            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">

              {endpoints.map((endpoint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >

                  <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                    {endpoint.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-4">
                    {endpoint.title}
                  </h3>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {endpoint.description}
                  </p>

                </motion.div>
              ))}

            </div>

          </div>
        </section>

        <section className="bg-gray-50 border-y border-gray-100 py-16 sm:py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >

                <div className="w-20 h-20 rounded-4xl bg-blue-600 text-white flex items-center justify-center text-4xl mb-8 shadow-xl shadow-blue-200">
                  <FiServer />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
                  Modern API Architecture
                </h2>

                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                  AutoLeads AI APIs are designed with scalable automation
                  infrastructure that supports intelligent workflows, AI-driven
                  prospect discovery and real-time monitoring systems.
                </p>

                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  The architecture focuses on automation efficiency, workflow
                  scalability and intelligent data processing for modern lead
                  generation systems.
                </p>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-6"
              >

                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all"
                  >

                    <div className="w-14 h-14 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6">
                      {feature.icon}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black mb-4">
                      {feature.title}
                    </h3>

                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>

                  </div>
                ))}

              </motion.div>

            </div>

          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-blue-600 rounded-4xl p-8 sm:p-10 lg:p-14 text-white shadow-2xl shadow-blue-200"
            >

              <div className="flex items-center gap-4 mb-8">

                <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center text-3xl">
                  <FiCheckCircle />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black">
                  Automation Ready APIs
                </h2>

              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed mb-6">
                The AutoLeads AI API ecosystem is structured to support
                automation workflows, AI processing systems and scalable lead
                intelligence operations.
              </p>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Designed for modern AI-driven infrastructure, the APIs help
                simplify workflow orchestration and intelligent prospect
                automation.
              </p>

            </motion.div>

          </div>
        </section>

      </main>

    </div>
  )
}