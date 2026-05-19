import {
  FiShield,
  FiLock,
  FiKey,
  FiUserCheck,
  FiDatabase,
  FiEye,
  FiServer,
  FiCheckCircle,
} from 'react-icons/fi'

export default function DocsAuthenticationPage() {
  const authFeatures = [
    {
      icon: <FiKey />,
      title: 'API Tokens',
      description:
        'Generate and manage secure API access tokens for authenticated requests and automation workflows.',
    },
    {
      icon: <FiLock />,
      title: 'Protected Access',
      description:
        'Secure endpoints with authentication layers to prevent unauthorized access to workflows and lead data.',
    },
    {
      icon: <FiUserCheck />,
      title: 'User Verification',
      description:
        'Authenticate accounts securely with protected login systems and identity verification processes.',
    },
    {
      icon: <FiDatabase />,
      title: 'Encrypted Storage',
      description:
        'Sensitive credentials, user data and automation configurations are securely stored and protected.',
    },
    {
      icon: <FiEye />,
      title: 'Access Monitoring',
      description:
        'Monitor authentication activity, account access and token usage across connected services.',
    },
    {
      icon: <FiServer />,
      title: 'Workflow Security',
      description:
        'Protect AI workflows, automation systems and integrations with advanced security controls.',
    },
  ]

  const securityLayers = [
    {
      icon: <FiShield />,
      title: 'Authentication Layer',
      text:
        'Every API request and workflow connection is protected using secure authentication systems and access validation.',
    },
    {
      icon: <FiLock />,
      title: 'Token Protection',
      text:
        'Access tokens are securely managed to ensure safe communication between integrations and automation services.',
    },
    {
      icon: <FiCheckCircle />,
      title: 'Secure Automation',
      text:
        'AI workflows and connected services are protected with monitoring, encryption and secure permissions.',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* HERO SECTION */}
      <section className="border-b border-gray-100 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-blue-100 text-blue-700 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8">
              <FiShield className="text-base sm:text-lg" />
              API Documentation
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
              Authentication
            </h1>

            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl">
              Secure account management, API tokens and protected workflows for
              safe AI automation and scalable lead generation systems.
            </p>
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-6">
                <FiKey />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-5">
                Secure API Access
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                AutoLeads AI uses protected authentication systems to secure API
                access, workflow communication and platform integrations across
                connected services.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl sm:text-3xl mb-6">
                <FiShield />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-5">
                Protected Workflows
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Authentication systems help secure AI-powered automations,
                integrations and sensitive business operations from unauthorized
                access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="bg-gray-50 py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-5">
              <FiLock />
              Authentication Features
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Security & Access Control
            </h2>

            <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Protect accounts, workflows and connected integrations with secure
              authentication systems and encrypted access management.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {authFeatures.map((item, index) => (
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

      {/* SECURITY LAYERS */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Authentication Layers
            </h2>

            <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Multiple security layers work together to keep user accounts,
              workflows and automation systems protected.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {securityLayers.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm"
              >
                <div className="w-14 h-14 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-6">
                  {item.icon}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black mb-5">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                AutoLeads AI Authentication
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
                Secure authentication systems designed to protect AI-powered
                automation workflows, integrations and business operations at
                scale.
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-2xl sm:text-3xl text-blue-600">
              <FiShield />
              <FiLock />
              <FiKey />
              <FiUserCheck />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}