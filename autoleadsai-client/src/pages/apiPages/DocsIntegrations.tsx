import {
  FiGlobe,
  FiDatabase,
  FiServer,
  FiCloud,
  FiShield,
  FiLayers,
  FiActivity,
  FiLink,
} from 'react-icons/fi'

import {
  FaLinkedinIn,
  FaRedditAlien,
  FaDiscord,
  FaGoogle,
  FaXTwitter,
} from 'react-icons/fa6'

export default function DocsIntegrationsPage() {
  const integrations = [
    {
      icon: <FaGoogle />,
      title: 'Google Workspace',
      description:
        'Connect Gmail, Google Sheets and Google Drive to automate outreach, reporting and lead storage.',
    },
    {
      icon: <FaLinkedinIn />,
      title: 'LinkedIn',
      description:
        'Monitor public business conversations, track engagement signals and discover opportunities.',
    },
    {
      icon: <FaXTwitter />,
      title: 'X / Twitter',
      description:
        'Track trending conversations, customer pain points and buying intent in real time.',
    },
    {
      icon: <FaRedditAlien />,
      title: 'Reddit',
      description:
        'Discover niche communities and identify people actively searching for solutions.',
    },
    {
      icon: <FaDiscord />,
      title: 'Discord',
      description:
        'Monitor communities, discussions and engagement signals from niche servers.',
    },
    {
      icon: <FiDatabase />,
      title: 'Database Systems',
      description:
        'Store leads, AI insights, campaign activity and workflow data securely.',
    },
    {
      icon: <FiServer />,
      title: 'Automation Workflows',
      description:
        'Connect AI automations and trigger workflows across your lead generation pipeline.',
    },
    {
      icon: <FiCloud />,
      title: 'Cloud Services',
      description:
        'Sync external tools and cloud systems into a centralized automation environment.',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* HERO SECTION */}
      <section className="border-b border-gray-100 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-blue-100 text-blue-700 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8">
              <FiLink className="text-base sm:text-lg" />
              API Documentation
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
              Integrations
            </h1>

            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl">
              Connect social platforms, CRMs, automation tools and external
              services to power your AI-driven lead generation workflows and
              automation systems.
            </p>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-6">
                <FiLayers />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-5">
                Unified Automation
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                AutoLeads AI connects multiple platforms into one centralized
                workflow environment, helping businesses monitor conversations,
                automate outreach and manage lead intelligence efficiently.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl sm:text-3xl mb-6">
                <FiShield />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-5">
                Secure Connections
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Integrations are designed with secure authentication systems,
                protected API communication and scalable cloud architecture to
                ensure safe data processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATION GRID */}
      <section className="bg-gray-50 py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-5">
              <FiGlobe />
              Connected Platforms
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Supported Integrations
            </h2>

            <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect your business workflows with social platforms, databases,
              cloud systems and automation services.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
            {integrations.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-6">
                  {item.icon}
                </div>

                <h3 className="text-xl sm:text-2xl font-black mb-4">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm">
              <div className="w-14 h-14 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6">
                <FiActivity />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black mb-5">
                Real-Time Monitoring
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Track social conversations, engagement signals and lead activity
                across multiple online platforms in real time.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm">
              <div className="w-14 h-14 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-6">
                <FiServer />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black mb-5">
                Workflow Automation
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Trigger automation pipelines automatically whenever new lead
                opportunities or engagement signals are detected.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm">
              <div className="w-14 h-14 rounded-3xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-2xl mb-6">
                <FiCloud />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black mb-5">
                Cloud Synchronization
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Sync AI insights, customer data and lead intelligence securely
                across cloud-connected systems and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER INFO */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                AutoLeads AI Integrations
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
                Build scalable AI automation systems with flexible integrations,
                cloud connectivity and centralized lead intelligence workflows.
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-2xl sm:text-3xl text-blue-600">
              <FaGoogle />
              <FaLinkedinIn />
              <FaXTwitter />
              <FaRedditAlien />
              <FaDiscord />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}