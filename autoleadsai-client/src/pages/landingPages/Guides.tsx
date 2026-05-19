import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navFunction } from '../../utils/NavFunction'

import {
  FiBookOpen,
  FiSearch,
  FiTarget,
  FiMail,
  FiTrendingUp,
  FiZap,
  FiLayers,
  FiArrowRight,
  FiGlobe,
  FiDatabase,
  FiMonitor,
} from 'react-icons/fi'

export default function GuidesPage() {

  const handleNavigate = navFunction() 
  const guides = [
    {
      icon: <FiSearch />,
      title: 'Finding High-Intent Leads',
      description:
        'Learn how to discover people actively searching for products and services in your niche using AI-powered monitoring.',
      level: 'Beginner',
      path: '/guides/finding-high-intent-leads',
    },
    {
      icon: <FiTarget />,
      title: 'Lead Qualification & Scoring',
      description:
        'Understand how AutoLeads AI identifies buying signals and filters low-quality prospects automatically.',
      level: 'Intermediate',
      path: '/guides/lead-qualification-scoring',
    },
    {
      icon: <FiMail />,
      title: 'Cold Outreach Automation',
      description:
        'Set up personalized email outreach campaigns that convert more leads into customers.',
      level: 'Intermediate',
      path: '/guides/cold-outreach-automation',
    },
    {
      icon: <FiTrendingUp />,
      title: 'Scaling Your Lead Pipeline',
      description:
        'Build scalable workflows for finding, tracking and converting leads continuously.',
      level: 'Advanced',
      path: '/guides/scaling-lead-pipeline',
    },
    {
      icon: <FiGlobe />,
      title: 'Monitoring Social Platforms',
      description:
        'Learn how to track conversations on Reddit, X, LinkedIn and forums for business opportunities.',
      level: 'Advanced',
      path: '/guides/monitoring-social-platforms',
    },
    {
      icon: <FiDatabase />,
      title: 'Building AI Lead Systems',
      description:
        'Create advanced lead generation systems using AI workflows, automation and intent detection.',
      level: 'Advanced',
      path:'/guides/building-ai-lead-systems',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-200">
              A
            </div>

            <h1 className="text-2xl font-black tracking-tight">
              Auto<span className="text-blue-600">Leads AI</span>
            </h1>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-gray-600">
            <Link to="/" className="hover:text-black transition-all">
              Home
            </Link>

            <Link to="/features" className="hover:text-black transition-all">
              Features
            </Link>

            <Link to="/pricing" className="hover:text-black transition-all">
              Pricing
            </Link>

            <Link to="/faq" className="hover:text-black transition-all">
              FAQ
            </Link>

            <Link to="/contact" className="hover:text-black transition-all">
              Contact
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
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
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
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6 sm:mb-8">
              <FiBookOpen className="text-lg" />
              AutoLeads AI Learning Center
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight mb-6 sm:mb-8">
              Guides to Help You
              <br />
              Generate Better
              <span className="text-blue-600"> Leads Faster</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Learn how to use AI, automation and smart outreach strategies to
              discover high-intent prospects and grow your business faster.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24 lg:pb-28"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl mb-6 sm:mb-8">
                  {guide.icon}
                </div>

                <div className="inline-flex px-3 sm:px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                  {guide.level}
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight mb-4 sm:mb-5">
                  {guide.title}
                </h2>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                  {guide.description}
                </p>

                <button className="flex items-center gap-3 text-blue-600 font-bold text-base sm:text-lg hover:gap-5 transition-all cursor-pointer" onClick={() => handleNavigate(guide.path)}>
                  Read Guide
                  <FiArrowRight />
                </button>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                What You Will Learn
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                Practical Knowledge for Modern Lead Generation
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-full sm:max-w-3xl mx-auto leading-relaxed">
                Our guides help founders, marketers and agencies understand how
                AI-powered prospecting systems work in the real world.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <FiSearch />,
                  title: 'Lead Discovery',
                },
                {
                  icon: <FiMonitor />,
                  title: 'Platform Monitoring',
                },
                {
                  icon: <FiZap />,
                  title: 'Workflow Automation',
                },
                {
                  icon: <FiLayers />,
                  title: 'AI Systems',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-4xl p-6 sm:p-8 border border-gray-100 shadow-sm text-center hover:shadow-xl transition-all"
                >
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4 sm:mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-28"
        >
          <div className="rounded-4xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 lg:p-12 xl:p-16 text-white shadow-2xl shadow-blue-200">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 sm:gap-4 text-2xl sm:text-3xl mb-6 sm:mb-8">
                <FiBookOpen />
                <FiTrendingUp />
                <FiZap />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-6">
                Start Learning AI Lead Generation Today
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10">
                Explore advanced strategies, workflows and automation systems
                used by modern businesses to generate more customers faster.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <Link
                  to="/signup"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-blue-600 text-base sm:text-lg font-black hover:scale-105 transition-all text-center"
                >
                  Start Free Trial
                </Link>

                <Link
                  to="/features"
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-white/30 text-white text-base sm:text-lg font-bold hover:bg-white/10 transition-all text-center"
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                  A
                </div>

                <h2 className="text-xl sm:text-2xl font-black">
                  Auto<span className="text-blue-600">Leads AI</span>
                </h2>
              </div>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-full sm:max-w-md">
                AI-powered lead intelligence platform helping businesses
                discover opportunities and automate outreach workflows.
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black mb-4 sm:mb-6">
                Product
              </h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <Link to="/features" className="block hover:text-black">
                  Features
                </Link>

                <Link to="/pricing" className="block hover:text-black">
                  Pricing
                </Link>

                <Link to="/guides" className="block hover:text-black">
                  Guides
                </Link>

                <Link to="/faq" className="block hover:text-black">
                  FAQ
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black mb-4 sm:mb-6">
                Company
              </h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <Link to="/about" className="block hover:text-black">
                  About
                </Link>

                <Link to="/contact" className="block hover:text-black">
                  Contact
                </Link>

                <Link to="/blog" className="block hover:text-black">
                  Blog
                </Link>

                <Link to="/privacy" className="block hover:text-black">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5">
            <p className="text-gray-500 text-sm sm:text-base text-center md:text-left">
              © 2026 AutoLeads AI. All rights reserved.
            </p>

            <div className="flex items-center gap-6 sm:gap-8 text-gray-500">
              <Link to="/terms" className="hover:text-black text-sm sm:text-base">
                Terms
              </Link>

              <Link to="/privacy" className="hover:text-black text-sm sm:text-base">
                Privacy
              </Link>

              <Link to="/cookies" className="hover:text-black text-sm sm:text-base">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}