import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { navFunction } from '../../utils/NavFunction.tsx'

import {
  FiSearch,
  FiMail,
  FiTrendingUp,
  FiZap,
  FiBarChart2,
  FiLayers,
  FiTarget,
} from 'react-icons/fi'

import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaRedditAlien,
  FaUsers,
  FaRobot,
  FaHandshake,
} from 'react-icons/fa6'

export default function LandingPage() {
  const handleNavigate = navFunction()
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      
      <header className="w-full border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200">
              A
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              Auto<span className="text-blue-600">Leads AI</span>
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-10 text-sm font-semibold text-gray-600">
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
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:flex px-5 py-2.5 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50 transition-all"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>

        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 grid gap-12 lg:grid-cols-2 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6 sm:mb-8">
              <FiZap className="text-lg" />
              AI-Powered Lead Intelligence
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 sm:mb-8">
              Find High-Intent Leads.
              <br />
              Automate Outreach.
              <br />
              <span className="text-blue-600">Grow Faster.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-full sm:max-w-2xl mb-8 sm:mb-10">
              AutoLeads AI scans the internet, detects buying intent, finds
              verified leads, and helps businesses discover real opportunities
              before competitors do.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-12">
              <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-blue-600 text-white font-bold text-base sm:text-lg hover:scale-105 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 cursor-pointer" onClick={()=> handleNavigate('/signup')}>
                Start Free Trial
              </button>

              <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-gray-300 font-bold text-base sm:text-lg hover:bg-gray-50 transition-all cursor-pointer">
                Book Demo
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="flex -space-x-4">
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center text-blue-600 text-lg sm:text-xl shadow-md">
                  <FaUsers />
                </div>

                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-indigo-600 text-lg sm:text-xl shadow-md">
                  <FiTrendingUp />
                </div>

                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-cyan-100 border-4 border-white flex items-center justify-center text-cyan-600 text-lg sm:text-xl shadow-md">
                  <FiTarget />
                </div>

                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-purple-100 border-4 border-white flex items-center justify-center text-purple-600 text-lg sm:text-xl shadow-md">
                  <FaRobot />
                </div>
              </div>

              <div>
                <p className="font-bold text-base sm:text-lg">2,000+ users</p>

                <p className="text-gray-500 text-sm sm:text-base">
                  Growing with AutoLeads AI
                </p>
              </div>
            </div>
          </div>

          <motion.div
            whileInView={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            viewport={{ once: false, amount: 0.6 }}
          >
            <div className="bg-white rounded-[36px] border border-gray-200 shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-6 sm:p-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black">
                    Welcome back
                  </h2>

                  <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    Your lead engine is running.
                  </p>
                </div>

                <div className="px-3 sm:px-4 py-2 rounded-xl bg-gray-100 text-xs sm:text-sm font-semibold">
                  This Week
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {
                    title: 'New Leads',
                    value: '1,235',
                    icon: <FiSearch />,
                  },
                  {
                    title: 'Opportunities',
                    value: '342',
                    icon: <FiTarget />,
                  },
                  {
                    title: 'Replies',
                    value: '98',
                    icon: <FiMail />,
                  },
                  {
                    title: 'Conversion',
                    value: '24.6%',
                    icon: <FiTrendingUp />,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-lg transition-all"
                  >
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg sm:text-xl mb-4">
                      {item.icon}
                    </div>

                    <p className="text-gray-500 text-xs sm:text-sm">
                      {item.title}
                    </p>

                    <h3 className="text-2xl sm:text-3xl font-black mt-2">
                      {item.value}
                    </h3>

                    <span className="text-green-600 text-xs sm:text-sm font-bold">
                      +12.4%
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-48 sm:h-64 rounded-3xl bg-linear-to-br from-blue-50 to-white border border-gray-100 p-6 sm:p-8 relative overflow-hidden">

                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex gap-3">
                  <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-xl bg-black text-white flex items-center justify-center">
                    <FaXTwitter />
                  </div>

                  <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <FaLinkedinIn />
                  </div>

                  <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                    <FaRedditAlien />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-8 sm:border-10 border-blue-600 border-t-blue-200 mb-4 sm:mb-5 animate-spin"></div>

                  <p className="text-xl sm:text-2xl font-black text-center">
                    AI Opportunity Scanner
                  </p>

                  <p className="text-gray-500 mt-2 text-center text-sm sm:text-base">
                    Monitoring Reddit, X and LinkedIn
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-24"
        >
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-gray-500 font-semibold uppercase tracking-[0.25em] text-xs sm:text-sm">
              Trusted by fast growing companies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              'Nova AI',
              'Flow Labs',
              'LeadStack',
              'VisionIQ',
              'Growthify',
              'CloudPeak',
            ].map((company, index) => (
              <div
                key={index}
                className="h-16 sm:h-20 rounded-2xl border border-gray-100 bg-white flex items-center justify-center text-base sm:text-lg font-bold text-gray-400 shadow-sm hover:shadow-lg transition-all"
              >
                {company}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                Powerful Features
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                Everything You Need to Discover and Convert Leads
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-full sm:max-w-3xl mx-auto leading-relaxed">
                Built for founders, agencies, marketers and businesses that want smarter lead generation powered by AI.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'AI Lead Discovery',
                  icon: <FiSearch className="text-3xl" />,
                  desc: 'Scan Reddit, X, LinkedIn and websites to find people actively discussing problems your product solves.',
                },
                {
                  title: 'Intent Detection',
                  icon: <FiTarget className="text-3xl" />,
                  desc: 'Our AI understands buying signals and filters out irrelevant discussions.',
                },
                {
                  title: 'Verified Leads',
                  icon: <FiMail className="text-3xl" />,
                  desc: 'Extract websites, emails, social profiles and business information automatically.',
                },
                {
                  title: 'Smart Outreach',
                  icon: <FiZap className="text-3xl" />,
                  desc: 'Generate personalized outreach messages based on context and intent.',
                },
                {
                  title: 'Automation Workflows',
                  icon: <FiLayers className="text-3xl" />,
                  desc: 'Automate repetitive prospecting tasks and scale your outreach process.',
                },
                {
                  title: 'Analytics Dashboard',
                  icon: <FiBarChart2 className="text-3xl" />,
                  desc: 'Track opportunities, replies and conversions in one place.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    {item.desc}
                  </p>
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
          className="py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                How It Works
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                Three Steps to More Customers
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Tell Us Your Niche',
                  icon: <FiTarget />,
                  desc: 'Enter your niche, target audience or business problem you solve.',
                },
                {
                  title: 'AI Finds Opportunities',
                  icon: <FaRobot />,
                  desc: 'AutoLeads AI monitors the internet and discovers high-intent conversations.',
                },
                {
                  title: 'Reach Out and Close',
                  icon: <FaHandshake />,
                  desc: 'Use AI-generated outreach and automation to convert leads into customers.',
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all"
                >
                  <div className="absolute -top-5 left-10 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>

                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8">
                    {step.icon}
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-4 sm:mb-5">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {step.desc}
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
          <div className="rounded-[40px] bg-linear-to-r from-blue-600 to-indigo-600 p-6 sm:p-8 lg:p-14 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-10 shadow-2xl shadow-blue-200">
            
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-2xl sm:text-3xl">
                <FiZap />
                <FiTarget />
                <FiTrendingUp />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-5">
                Start Finding Better Leads Today
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-full sm:max-w-2xl leading-relaxed">
                Join businesses using AI-powered opportunity intelligence to discover customers faster.
              </p>
            </div>

            <button className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl bg-white text-blue-600 text-base sm:text-lg font-black hover:scale-105 transition-all cursor-pointer" onClick={()=> handleNavigate('/signup')}>
              Start Free Trial
            </button>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">

          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-5">

            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>

                <h2 className="text-xl sm:text-2xl font-black">
                  Auto<span className="text-blue-600">Leads AI</span>
                </h2>
              </div>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-full sm:max-w-md mb-6 sm:mb-8">
                AI-powered lead intelligence platform helping businesses discover opportunities and automate outreach.
              </p>

              <div className="flex gap-3 sm:gap-4">
                {[
                  <FaXTwitter />,
                  <FaLinkedinIn />,
                  <FaInstagram />,
                  <FaFacebookF />,
                ].map((icon, index) => (
                  <div
                    key={index}
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black text-base sm:text-lg mb-4 sm:mb-6">
                Product
              </h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <Link to="/features" className="block hover:text-black">
                  Features
                </Link>

                <Link to="/pricing" className="block hover:text-black">
                  Pricing
                </Link>

                <Link to="/integrations" className="block hover:text-black">
                  Integrations
                </Link>

                <Link to="/changelog" className="block hover:text-black">
                  Changelog
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-base sm:text-lg mb-4 sm:mb-6">
                Resources
              </h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <Link to="/blog" className="block hover:text-black">
                  Blog
                </Link>

                <Link to="/guides" className="block hover:text-black">
                  Guides
                </Link>

                <Link to="/docs" className="block hover:text-black">
                  API Docs
                </Link>

                <Link to="/help-center" className="block hover:text-black">
                  Help Center
                </Link>
                   <Link to="/how-it-works" className="block hover:text-black">
                                  How It Works
                                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-base sm:text-lg mb-4 sm:mb-6">
                Company
              </h3>

              <div className="space-y-3 sm:space-y-4 text-gray-600">
                <Link to="/about" className="block hover:text-black">
                  About
                </Link>

                <Link to="/contact" className="block hover:text-black">
                  Contact
                </Link>

                <Link to="/faq" className="block hover:text-black">
                  FAQ
                </Link>

                <Link to="/privacy-policy" className="block hover:text-black">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500">
            
            <p className="text-sm sm:text-base">
              © 2026 AutoLeads AI. All rights reserved.
            </p>

            <div className="flex items-center gap-6 sm:gap-8">
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