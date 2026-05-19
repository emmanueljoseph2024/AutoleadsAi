import { motion } from 'framer-motion'

import {
  FiCpu,
  FiZap,
  FiDatabase,
  FiSettings,
  FiLayers,
  FiActivity,
  FiCheckCircle,
  FiServer,
  FiGlobe,
} from 'react-icons/fi'

export default function GettingStarted() {

  const setupSteps = [
    {
      icon: <FiSettings />,
      title: 'Configure Your Workspace',
      description:
        'Set up your AutoLeads AI workspace, define your niche and prepare your AI automation environment.',
    },
    {
      icon: <FiDatabase />,
      title: 'Connect Data Sources',
      description:
        'Organize your lead sources, workflows and automation pipelines for intelligent prospect discovery.',
    },
    {
      icon: <FiCpu />,
      title: 'Enable AI Monitoring',
      description:
        'Allow the AI engine to monitor conversations, buying signals and prospect activities across platforms.',
    },
    {
      icon: <FiZap />,
      title: 'Launch Your Workflow',
      description:
        'Start automated lead discovery, outreach tracking and AI-powered workflow execution.',
    },
  ]

  const features = [
    {
      icon: <FiActivity />,
      title: 'Real-Time Monitoring',
      description:
        'Track discussions, opportunities and engagement signals across multiple online platforms.',
    },
    {
      icon: <FiLayers />,
      title: 'Workflow Automation',
      description:
        'Build scalable automation pipelines powered by AI-driven lead intelligence.',
    },
    {
      icon: <FiServer />,
      title: 'Cloud Infrastructure',
      description:
        'Run intelligent automation systems with scalable cloud-ready architecture.',
    },
    {
      icon: <FiGlobe />,
      title: 'Cross-Platform Intelligence',
      description:
        'Monitor multiple online communities and business platforms from one dashboard.',
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
                <FiCpu className="text-base sm:text-lg" />
                API Documentation
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                Getting Started
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8 sm:mb-10 max-w-4xl">
                Learn how to set up AutoLeads AI and launch your first AI
                automation workflow using intelligent prospect monitoring,
                workflow automation and AI-powered lead discovery systems.
              </p>

              <div className="flex flex-wrap gap-4">

                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-3xl px-5 py-4 shadow-sm">
                  <FiZap className="text-blue-600 text-xl" />
                  <span className="text-sm sm:text-base font-semibold">
                    AI Workflows
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-3xl px-5 py-4 shadow-sm">
                  <FiDatabase className="text-blue-600 text-xl" />
                  <span className="text-sm sm:text-base font-semibold">
                    Smart Automation
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-3xl px-5 py-4 shadow-sm">
                  <FiActivity className="text-blue-600 text-xl" />
                  <span className="text-sm sm:text-base font-semibold">
                    Real-Time Intelligence
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
                Setup Process
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
                Launch Your First AI Workflow
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Follow a structured setup process to configure your AI
                automation environment and start discovering intelligent lead
                opportunities.
              </p>

            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">

              {setupSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >

                  <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6 mt-4">
                    {step.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-4">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                </motion.div>
              ))}

            </div>

          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-20 lg:py-28 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >

                <div className="w-20 h-20 rounded-4xl bg-blue-600 text-white flex items-center justify-center text-4xl mb-8 shadow-xl shadow-blue-200">
                  <FiCpu />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
                  AI Automation Infrastructure
                </h2>

                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6">
                  AutoLeads AI combines automation workflows, AI intelligence
                  and scalable monitoring systems to simplify modern lead
                  generation.
                </p>

                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  The platform is designed to reduce repetitive prospecting
                  tasks while improving targeting accuracy and workflow
                  efficiency.
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
                  Workflow Ready
                </h2>

              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed mb-6">
                Your AI automation environment is designed to support scalable
                lead generation, intelligent monitoring and workflow-driven
                prospect discovery.
              </p>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed">
                AutoLeads AI helps businesses automate repetitive prospecting
                processes while improving lead targeting and operational
                efficiency.
              </p>

            </motion.div>

          </div>
        </section>

      </main>

    </div>
  )
}