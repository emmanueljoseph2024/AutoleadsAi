import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiClock,
  FiMessageSquare,
  FiHelpCircle,
  FiGlobe,
} from 'react-icons/fi'

import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
} from 'react-icons/fa6'

export default function ContactPage() {
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

            <Link to="/contact" className="text-blue-600">
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
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main>
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 sm:px-5 py-2 rounded-full text-sm font-bold mb-6 sm:mb-8">
              <FiMessageSquare />
              Contact AutoLeads AI
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
              Let’s Build Smarter
              <br />
              Lead Generation Together
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Questions about the platform, pricing, integrations or support?
              Reach out to the AutoLeads AI team and we’ll get back to you
              quickly.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-24"
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 md:p-10 shadow-sm">
              <div className="mb-10">
                <h2 className="text-3xl sm:text-4xl font-black mb-4">
                  Send Us a Message
                </h2>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Fill out the form below and our team will respond as soon as
                  possible.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-3">
                      First Name
                    </label>

                    <input
                      type="text"
                      placeholder="John"
                      className="w-full h-14 px-5 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-3">
                      Last Name
                    </label>

                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full h-14 px-5 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full h-14 px-5 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full h-14 px-5 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-3">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Tell us about your project or question..."
                    className="w-full p-5 rounded-2xl border border-gray-200 outline-none focus:border-blue-500 transition-all resize-none"
                  ></textarea>
                </div>

                <button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3">
                  <FiSend />
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-4xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-blue-200">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-3xl bg-white/20 flex items-center justify-center text-3xl sm:text-4xl mb-8">
                  <FiMail />
                </div>

                <h2 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6">
                  Contact Information
                </h2>

                <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
                  Reach out anytime. We’re here to help businesses discover
                  smarter opportunities with AI.
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                      <FiMail />
                    </div>

                    <div>
                      <p className="text-blue-100 mb-1">Email</p>

                      <p className="text-lg font-bold break-all">
                        emmanuelay897@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                      <FiPhone />
                    </div>

                    <div>
                      <p className="text-blue-100 mb-1">Phone</p>

                      <p className="text-lg font-bold">
                        Available on request
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                      <FiClock />
                    </div>

                    <div>
                      <p className="text-blue-100 mb-1">Support Hours</p>

                      <p className="text-lg font-bold">
                        Monday - Friday
                      </p>

                      <p className="text-blue-100">
                        9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white border border-gray-100 rounded-[28px] p-8 shadow-sm hover:shadow-xl transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                    <FiHelpCircle />
                  </div>

                  <h3 className="text-2xl font-black mb-4">
                    Help Center
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    Browse guides, FAQs and onboarding resources to get started
                    quickly.
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg sm:hover:shadow-xl transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-6">
                    <FiGlobe />
                  </div>

                  <h3 className="text-2xl font-black mb-4">
                    Global Access
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    AutoLeads AI works globally for agencies, founders and
                    growing businesses.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-4xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl">
                    <FiMapPin />
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black">
                      Follow Us
                    </h3>

                    <p className="text-gray-600">
                      Stay connected with AutoLeads AI
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {[
                    <FaXTwitter />,
                    <FaLinkedinIn />,
                    <FaInstagram />,
                    <FaFacebookF />,
                  ].map((icon, index) => (
                    <div
                      key={index}
                      className="w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-xl text-gray-700 hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-sm"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-lg sm:rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base sm:text-lg">
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