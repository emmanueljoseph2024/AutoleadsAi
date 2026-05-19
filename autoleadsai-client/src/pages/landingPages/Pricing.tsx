import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiCheck,
  FiZap,
  FiTarget,
  FiBarChart2,
  FiShield,
  FiUsers,
  FiMail,
  FiSearch,
  FiGlobe,
} from 'react-icons/fi'

import {
  FaRobot,
  FaLinkedinIn,
  FaRedditAlien,
  FaXTwitter,
} from 'react-icons/fa6'

export default function PricingPage() {
  const pricingPlans = [
    {
      title: 'Starter',
      price: '$10',
      description:
        'Perfect for freelancers, solo founders and small businesses starting with lead generation.',
      features: [
        '500 lead scans monthly',
        'AI lead discovery',
        'Email extraction',
        'Basic analytics',
        'LinkedIn monitoring',
        'Email support',
      ],
      button: 'Start Starter Plan',
      popular: false,
    },

    {
      title: 'Growth',
      price: '$29',
      description:
        'Built for growing businesses and agencies that need advanced automation and outreach.',
      features: [
        '5,000 lead scans monthly',
        'AI opportunity detection',
        'Reddit, X & LinkedIn monitoring',
        'Smart outreach generation',
        'Advanced analytics dashboard',
        'Priority support',
      ],
      button: 'Start Growth Plan',
      popular: true,
    },

    {
      title: 'Scale',
      price: '$79',
      description:
        'Advanced infrastructure for teams, agencies and businesses scaling aggressively.',
      features: [
        'Unlimited lead scans',
        'Full automation workflows',
        'Advanced AI monitoring',
        'Team collaboration',
        'API access',
        'Dedicated support',
      ],
      button: 'Start Scale Plan',
      popular: false,
    },
  ]

  const faqs = [
    {
      question: 'Can I cancel anytime?',
      answer:
        'Yes. You can cancel your subscription anytime directly from your dashboard.',
    },

    {
      question: 'Do you provide a free trial?',
      answer:
        'Yes. Every plan comes with a free trial so users can test the platform before upgrading.',
    },

    {
      question: 'Which platforms can AutoLeads AI monitor?',
      answer:
        'AutoLeads AI can monitor Reddit, LinkedIn, X, websites and online business discussions.',
    },

    {
      question: 'Do you provide API access?',
      answer:
        'Yes. API access is available on the Scale plan for advanced integrations.',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <header className="w-full border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200">
              A
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Auto<span className="text-blue-600">Leads AI</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-8 sm:gap-10 text-sm font-semibold text-gray-600">
            <Link to="/" className="hover:text-black transition-all">
              Home
            </Link>

            <Link
              to="/features"
              className="hover:text-black transition-all"
            >
              Features
            </Link>

            <Link
              to="/pricing"
              className="text-blue-600 transition-all"
            >
              Pricing
            </Link>

            <Link
              to="/faq"
              className="hover:text-black transition-all"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden sm:flex px-5 py-2.5 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50 transition-all"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
        >
          <div className="text-center max-w-full sm:max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6 sm:mb-8">
              <FiZap className="text-lg" />
              Flexible Pricing
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 sm:mb-8">
              Simple Pricing
              <br />
              For Modern
              <br />
              <span className="text-blue-600">Lead Generation</span>
            </h1>

            <p className="text-base sm:text-xl text-gray-600 leading-relaxed">
              Choose a plan that fits your business and start discovering
              high-intent leads faster with AI-powered automation.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24 lg:pb-28"
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-[36px] border p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xl shadow-blue-200'
                    : 'bg-white border-gray-100 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white text-blue-600 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-black">
                    Most Popular
                  </div>
                )}

                <h2 className="text-2xl sm:text-3xl font-black mb-4">
                  {plan.title}
                </h2>

                <div className="flex items-end gap-2 mb-6">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-black">
                    {plan.price}
                  </span>

                  <span
                    className={`text-base sm:text-lg mb-2 ${
                      plan.popular
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    /month
                  </span>
                </div>

                <p
                  className={`text-base sm:text-lg leading-relaxed mb-8 ${
                    plan.popular
                      ? 'text-blue-100'
                      : 'text-gray-600'
                  }`}
                >
                  {plan.description}
                </p>

                <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                  {plan.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          plan.popular
                            ? 'bg-white text-blue-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        <FiCheck />
                      </div>

                      <p className="font-medium text-base sm:text-lg">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 sm:py-4 rounded-2xl font-black text-base sm:text-lg transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:scale-105'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                What You Get
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                Powerful AI Features Included
              </h2>

              <p className="text-base sm:text-xl text-gray-600 max-w-full sm:max-w-3xl mx-auto leading-relaxed">
                Every plan includes powerful tools built to help businesses
                discover leads and automate outreach.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'AI Lead Discovery',
                  icon: <FiSearch />,
                },

                {
                  title: 'Social Monitoring',
                  icon: <FaRobot />,
                },

                {
                  title: 'Outreach Automation',
                  icon: <FiMail />,
                },

                {
                  title: 'Analytics Dashboard',
                  icon: <FiBarChart2 />,
                },

                {
                  title: 'Website Scanning',
                  icon: <FiGlobe />,
                },

                {
                  title: 'Intent Detection',
                  icon: <FiTarget />,
                },

                {
                  title: 'Team Collaboration',
                  icon: <FiUsers />,
                },

                {
                  title: 'Secure Infrastructure',
                  icon: <FiShield />,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[28px] border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black leading-tight">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-28"
        >
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
              Integrations
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
              Monitor Platforms Across The Internet
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: 'LinkedIn',
                icon: <FaLinkedinIn />,
              },

              {
                name: 'Reddit',
                icon: <FaRedditAlien />,
              },

              {
                name: 'X / Twitter',
                icon: <FaXTwitter />,
              },

              {
                name: 'Websites',
                icon: <FiGlobe />,
              },
            ].map((platform, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] border border-gray-100 p-8 sm:p-10 flex flex-col items-center justify-center shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl sm:text-4xl mb-6">
                  {platform.icon}
                </div>

                <h3 className="text-xl sm:text-2xl font-black">
                  {platform.name}
                </h3>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                FAQ
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-[28px] p-6 sm:p-8 shadow-sm"
                >
                  <h3 className="text-xl sm:text-2xl font-black mb-4">
                    {faq.question}
                  </h3>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-28"
        >
          <div className="rounded-[40px] bg-linear-to-r from-blue-600 to-indigo-600 p-8 sm:p-10 lg:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 shadow-2xl shadow-blue-200">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-5 sm:mb-6 text-2xl sm:text-3xl">
                <FiZap />
                <FiTarget />
                <FaRobot />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-5">
                Start Growing With AI Today
              </h2>

              <p className="text-base sm:text-xl text-blue-100 max-w-full sm:max-w-2xl leading-relaxed">
                Join businesses using AutoLeads AI to discover opportunities,
                automate outreach and scale faster.
              </p>
            </div>

            <Link
              to="/signup"
              className="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-white text-blue-600 text-base sm:text-lg font-black hover:scale-105 transition-all"
            >
              Start Free Trial
            </Link>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>

                <h2 className="text-2xl font-black">
                  Auto<span className="text-blue-600">Leads AI</span>
                </h2>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed max-w-md mb-8">
                AI-powered lead intelligence platform helping businesses
                discover opportunities and automate outreach.
              </p>

              <div className="flex gap-4">
                {[
                  <FaXTwitter />,
                  <FaLinkedinIn />,
                  <FaRedditAlien />,
                  <FiGlobe />,
                ].map((icon, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black text-lg mb-6">
                Product
              </h3>

              <div className="space-y-4 text-gray-600">
                <Link to="/" className="block hover:text-black">
                  Home
                </Link>

                <Link
                  to="/features"
                  className="block hover:text-black"
                >
                  Features
                </Link>

                <Link
                  to="/pricing"
                  className="block hover:text-black"
                >
                  Pricing
                </Link>

                <Link to="/faq" className="block hover:text-black">
                  FAQ
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-lg mb-6">
                Resources
              </h3>

              <div className="space-y-4 text-gray-600">
                <Link to="/blog" className="block hover:text-black">
                  Blog
                </Link>

                <Link to="/guides" className="block hover:text-black">
                  Guides
                </Link>

                <Link to="/docs" className="block hover:text-black">
                  API Docs
                </Link>

                <Link
                  to="/help-center"
                  className="block hover:text-black"
                >
                  Help Center
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-lg mb-6">
                Company
              </h3>

              <div className="space-y-4 text-gray-600">
                <Link to="/about" className="block hover:text-black">
                  About
                </Link>

                <Link to="/contact" className="block hover:text-black">
                  Contact
                </Link>

                <Link to="/privacy" className="block hover:text-black">
                  Privacy Policy
                </Link>

                <Link to="/terms" className="block hover:text-black">
                  Terms
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500">
            <p>© 2026 AutoLeads AI. All rights reserved.</p>

            <div className="flex items-center gap-8">
              <Link to="/terms" className="hover:text-black">
                Terms
              </Link>

              <Link to="/privacy" className="hover:text-black">
                Privacy
              </Link>

              <Link to="/cookies" className="hover:text-black">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}