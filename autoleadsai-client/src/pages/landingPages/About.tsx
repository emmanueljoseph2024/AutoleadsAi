import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiTarget,
  FiZap,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiGlobe,
  FiCheckCircle,
  FiArrowRight,
} from 'react-icons/fi'

import {
  FaRobot,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from 'react-icons/fa6'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <header className="w-full border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200">
              A
            </div>

            <h1 className="text-2xl font-black tracking-tight">
              Auto<span className="text-blue-600">Leads AI</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-semibold text-gray-600">
            <Link to="/features" className="hover:text-black transition-all">
              Features
            </Link>

            <Link
              to="/how-it-works"
              className="hover:text-black transition-all"
            >
              How It Works
            </Link>

            <Link to="/pricing" className="hover:text-black transition-all">
              Pricing
            </Link>

            <Link to="/faq" className="hover:text-black transition-all">
              FAQ
            </Link>

            <Link to="/about" className="text-blue-600">
              About
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
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>
        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24"
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-5 py-2.5 rounded-full text-sm font-bold mb-8">
                <FiZap />
                About AutoLeads AI
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-7xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
                Helping Businesses
                <br />
                Discover Better
                <br />
                Opportunities Faster
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                AutoLeads AI is an AI-powered lead intelligence platform built
                to help businesses discover real buying intent across the
                internet, monitor conversations, and automate outreach at scale.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 text-center"
                >
                  Get Started
                </Link>

                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-2xl border border-gray-300 font-bold text-lg hover:bg-gray-50 transition-all text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <motion.div
              whileInView={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              viewport={{ once: false, amount: 0.6 }}
              className="bg-linear-to-br from-blue-600 to-indigo-600 rounded-4xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl shadow-blue-200"
            >
              <div className="grid grid-cols-2 gap-5">
                {[
                  {
                    icon: <FiUsers />,
                    title: '2,000+',
                    text: 'Growing Users',
                  },
                  {
                    icon: <FiTrendingUp />,
                    title: '1M+',
                    text: 'Leads Analyzed',
                  },
                  {
                    icon: <FaRobot />,
                    title: 'AI Powered',
                    text: 'Automation Engine',
                  },
                  {
                    icon: <FiGlobe />,
                    title: 'Global',
                    text: 'Business Reach',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl mb-5">
                      {item.icon}
                    </div>

                    <h3 className="text-3xl font-black mb-2">
                      {item.title}
                    </h3>

                    <p className="text-blue-100">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gray-50 py-20 sm:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-sm mb-5">
                Our Mission
              </p>

              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 sm:mb-8">
                Making Lead Generation Smarter With AI
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Traditional lead generation is slow, expensive and filled with
                low-quality data. AutoLeads AI was built to help businesses
                discover real conversations, real buying intent and real
                opportunities automatically.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: <FiTarget />,
                  title: 'Intent Detection',
                  desc: 'Identify users actively looking for solutions online.',
                },
                {
                  icon: <FiZap />,
                  title: 'Automation',
                  desc: 'Reduce manual prospecting with AI-powered workflows.',
                },
                {
                  icon: <FiShield />,
                  title: 'Reliable Data',
                  desc: 'Find verified websites, contacts and business details.',
                },
                {
                  icon: <FiGlobe />,
                  title: 'Internet Monitoring',
                  desc: 'Track discussions across multiple online platforms.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-4xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-lg sm:hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-black mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-sm mb-5">
                Why Businesses Choose Us
              </p>

              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 sm:mb-8">
                Built for Agencies,
                <br />
                Startups and Sales Teams
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                AutoLeads AI combines AI monitoring, lead intelligence and
                automation into one powerful platform built for modern business
                growth.
              </p>

              <div className="space-y-6">
                {[
                  'AI-powered lead discovery',
                  'Internet-wide opportunity monitoring',
                  'Smart outreach automation',
                  'High-intent conversation tracking',
                  'Scalable prospecting workflows',
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                      <FiCheckCircle />
                    </div>

                    <p className="text-base sm:text-lg font-semibold">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-sm">
              <div className="space-y-6">
                {[
                  {
                    title: 'AI Opportunity Monitoring',
                    desc: 'Monitor Reddit, LinkedIn, X and websites in real-time.',
                  },
                  {
                    title: 'Lead Intelligence',
                    desc: 'Extract emails, contacts and business information.',
                  },
                  {
                    title: 'Smart Outreach',
                    desc: 'Generate personalized outreach automatically.',
                  },
                  {
                    title: 'Business Growth',
                    desc: 'Convert online conversations into paying customers.',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-100 rounded-3xl p-4 sm:p-6 hover:shadow-md sm:hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                        <FiArrowRight />
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-black mb-2 sm:mb-3">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28"
        >
          <div className="rounded-3xl sm:rounded-4xl bg-linear-to-r from-blue-600 to-indigo-600 p-8 sm:p-10 lg:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 shadow-2xl shadow-blue-200">
            <div>
              <div className="flex items-center gap-4 mb-6 text-3xl">
                <FiZap />
                <FiTrendingUp />
                <FiUsers />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-5">
                Join the Future of AI Lead Generation
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
                Start using AutoLeads AI to discover opportunities, monitor
                buying intent and automate outreach faster than ever before.
              </p>
            </div>

            <Link
              to="/signup"
              className="px-10 py-5 rounded-2xl bg-white text-blue-600 text-lg font-black hover:scale-105 transition-all"
            >
              Start Free Trial
            </Link>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-14">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg sm:rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base sm:text-lg">
                  A
                </div>

                <h2 className="text-xl sm:text-2xl font-black">
                  Auto<span className="text-blue-600">Leads AI</span>
                </h2>
              </div>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md mb-8">
                AI-powered lead intelligence platform helping businesses
                discover opportunities and automate outreach.
              </p>

              <div className="flex gap-4">
                {[
                  <FaXTwitter />,
                  <FaLinkedinIn />,
                  <FaInstagram />,
                  <FaFacebookF />,
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
              <h3 className="font-black text-base sm:text-lg mb-6">Product</h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">
                <Link to="/features" className="block hover:text-black">
                  Features
                </Link>

                <Link to="/pricing" className="block hover:text-black">
                  Pricing
                </Link>

                <Link to="/how-it-works" className="block hover:text-black">
                  How It Works
                </Link>

                <Link to="/faq" className="block hover:text-black">
                  FAQ
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-base sm:text-lg mb-6">Resources</h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">
                <Link to="/contact" className="block hover:text-black">
                  Contact
                </Link>

                <Link to="/blog" className="block hover:text-black">
                  Blog
                </Link>

                <Link to="/guides" className="block hover:text-black">
                  Guides
                </Link>

                <Link to="/docs" className="block hover:text-black">
                  API Docs
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-base sm:text-lg mb-6">Company</h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">
                <Link to="/about" className="block hover:text-black">
                  About
                </Link>

                <Link to="/privacy-policy" className="block hover:text-black">
                  Privacy Policy
                </Link>

                <Link to="/terms" className="block hover:text-black">
                  Terms
                </Link>

                <Link to="/cookies" className="block hover:text-black">
                  Cookies
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm sm:text-base">
            <p>© 2026 AutoLeads AI. All rights reserved.</p>

            <div className="flex items-center gap-6 sm:gap-8">
              <Link to="/terms" className="hover:text-black">
                Terms
              </Link>

              <Link to="/privacy-policy" className="hover:text-black">
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