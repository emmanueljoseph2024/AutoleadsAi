import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { navFunction } from '../../utils/NavFunction.tsx'
import { useRef } from 'react'

import {
  FiArrowRight,
  FiClock,
  FiTrendingUp,
  FiSearch,
  FiZap,
  FiTarget,
  FiBookOpen,
  FiMail,
} from 'react-icons/fi'

import {
  FaRobot,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaRedditAlien,
} from 'react-icons/fa6'

export default function BlogPage() {
  // Initialize navigation function
const handleNavigate = navFunction()
// State for search input and error handling
    const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [visibility, setVisibility] = useState(false)
  const [errorMessageVisibility, setErrorMessageVisibility] = useState<boolean>(true)

  const blogs = [
  {
    title: 'How AI is Changing Modern Lead Generation',
    path: '/blog/ai-automation',
  },
  {
    title: 'How to Find High-Intent Leads on Reddit',
    path: '/blog/reddit-lead-gen',
  },
  {
    title: 'Scaling Outreach With Automation',
    path: '/blog/automation-outreach',
  },
  {
    title: 'Best Strategies for LinkedIn Prospecting',
    path: '/blog/linkedin-prospecting',
  },
  {
    title: 'How Businesses Use AI to Monitor Buying Intent',
    path: '/blog/ai-monitoring-buying-intent',
  },
  {
    title: 'Email Outreach Tips That Increase Replies',
    path: '/blog/email-outreach-tips',
  },
  {
    title: 'Building Smarter Lead Pipelines',
    path: '/blog/building-smarter-lead-pipelines',
  },
]



//Function to search for articles based on input value and navigate to the article page if found
const inputRef = useRef<HTMLInputElement | null>(null)

const handleClick = (): void => {

  if (!inputRef.current) return

  const inputValue: string = inputRef.current.value

  // Remove potentially dangerous characters
  const sanitizedValue: string = inputValue.replace(
    /[<>$`{}[\];]/g,
    ''
  )

  // Prevent empty values
  if (sanitizedValue.trim() === '') {

    setError('Input cannot be empty')
    setErrorMessageVisibility(true)
    setTimeout(() => {
      setError('')
    }, 2000)

    return
  }

  // Prevent excessively long input
  if (sanitizedValue.length > 100) {

    setError('Input is too long')
      setErrorMessageVisibility(true)

    setTimeout(() => {
      setError('')
    }, 3000)

    return
  }

  // Find matching blog
  const matchedBlog = blogs.find((blog) =>
    blog.title.toLowerCase() === sanitizedValue.toLowerCase().trim()
  )

  // Navigate if found
  if (matchedBlog) {

    handleNavigate(matchedBlog.path)

  } else {

    setError('No matching blog found')
      setErrorMessageVisibility(true)

    setTimeout(() => {
      setError('')
    }, 3000)

  }

}

//Function to handle input changes, validate and filter blog list based on input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {

    const value: string = e.target.value

    // Remove potentially dangerous characters
    const sanitizedValue: string = value.replace(
      /[<>$`{}[\];]/g,
      ''
    )

    // Validate maximum length
if (sanitizedValue.length > 100) {

  setError('Input is too long')
  setErrorMessageVisibility(true)

  setTimeout(() => {
    setErrorMessageVisibility(false)
  }, 1200)

  return
}

// Prevent only empty spaces
if (sanitizedValue.trim() === '') {

  setError('Input cannot be empty')

  setErrorMessageVisibility(true)
  setVisibility(false)
  setInputValue(sanitizedValue)

  setTimeout(() => {
    setErrorMessageVisibility(false)
  }, 1200)

  return

} else {

  setError('')
  setErrorMessageVisibility(false)

}
    // BLOG MATCH LOGIC (ADDED HERE)
    const match = blogs.some((blog) =>
      blog.title.toLowerCase().includes(sanitizedValue.toLowerCase())
    )

    setVisibility(match)
    setInputValue(sanitizedValue)
  }


  const featuredPosts = [
    {
      title: 'How AI is Changing Modern Lead Generation',
      desc: 'Discover how AI-powered systems are helping businesses identify buying intent faster than traditional prospecting.',
      icon: <FaRobot />,
      category: 'AI & Automation',
      time: '5 min read',
      url:'/blog/ai-automation'
    },
    {
      title: 'How to Find High-Intent Leads on Reddit',
      desc: 'Learn how businesses are using Reddit conversations to discover potential customers and opportunities.',
      icon: <FaRedditAlien />,
      category: 'Lead Generation',
      time: '7 min read',
      url:'/blog/reddit-lead-gen'
    },
    {
      title: 'Scaling Outreach With Automation',
      desc: 'Build outreach workflows that automatically engage prospects while maintaining personalization.',
      icon: <FiZap />,
      category: 'Automation',
      time: '6 min read',
      url:'/blog/automation-outreach'
    },
  ]

  const latestPosts = [
    {
      title: 'Best Strategies for LinkedIn Prospecting',
      icon: <FaLinkedinIn />,
      time: '4 min read',
      path: '/blog/linkedin-prospecting'
    },
    {
      title: 'How Businesses Use AI to Monitor Buying Intent',
      icon: <FiTrendingUp />,
      time: '8 min read',
      path: '/blog/ai-monitoring-buying-intent'
    },
    {
      title: 'Email Outreach Tips That Increase Replies',
      icon: <FiMail />,
      time: '5 min read',
      path: '/blog/email-outreach-tips'
    },
    {
      title: 'Building Smarter Lead Pipelines',
      icon: <FiTarget />,
      time: '6 min read',
      path: '/blog/building-smarter-lead-pipelines'
    },
  ]

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

            <Link to="/blog" className="text-blue-600">
              Blog
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
          className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 sm:px-5 py-2 rounded-full text-sm font-bold mb-6 sm:mb-8">
              <FiBookOpen />
              AutoLeads AI Blog
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6 sm:mb-8">
              Insights on AI,
              <br />
              Lead Generation
              <br />
              and Automation
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
              Learn how businesses are using AI-powered lead intelligence,
              automation and outreach systems to grow faster and discover more
              opportunities online.
            </p>

            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 flex-1">
                <FiSearch className="text-xl text-gray-400" />

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search articles..."
                  className="w-full outline-none bg-transparent text-sm sm:text-base"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>

              <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 text-sm sm:text-base cursor-pointer" onClick={handleClick}>
                Search
              </button>
            </div>
          </div>
        
      {/* FILTERED RESULTS */}
      {visibility && (
        <div className="mt-6 space-y-3">
          {blogs
            .filter((blog) =>
              blog.title.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((blog, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer"
                onClick={() => handleNavigate(blog.path)}
              >
                {blog.title}
              </div>
            ))}
        </div>
      )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24 lg:pb-28"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-10 sm:mb-12">
            <div>
              <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-3 sm:mb-4">
                Featured Articles
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Popular Insights
              </h2>
            </div>

            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-2 text-blue-600 font-bold text-sm"
            >
              View All
              <FiArrowRight />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-100 rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="h-56 bg-linear-to-br from-blue-600 to-indigo-600 p-6 sm:p-8 flex flex-col justify-between text-white">
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl sm:text-3xl backdrop-blur-md">
                    {post.icon}
                  </div>

                  <div>
                    <span className="inline-flex px-3 sm:px-4 py-2 rounded-full bg-white/20 text-xs sm:text-sm font-bold backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-gray-500 text-xs sm:text-sm font-medium mb-4">
                    <div className="flex items-center gap-2">
                      <FiClock />
                      {post.time}
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-4 sm:mb-5">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                    {post.desc}
                  </p>

                  <button className="flex items-center gap-2 text-blue-600 font-bold text-sm sm:text-base hover:gap-3 transition-all cursor-pointer" onClick={() => handleNavigate(post.url)}>
                    Read Article
                    <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gray-50 py-20 sm:py-24 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-5">
                  Latest Articles
                </p>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-10 sm:mb-12">
                  Learn Modern Growth Strategies
                </h2>

                <div className="space-y-4 sm:space-y-5">
                  {latestPosts.map((post, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 8 }}
                      className="bg-white rounded-4xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-5">
                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                          {post.icon}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm font-semibold mb-3">
                            <FiClock />
                            {post.time}
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-black mb-4">
                            {post.title}
                          </h3>

                          <button className="flex items-center gap-2 text-blue-600 font-bold text-sm sm:text-base hover:gap-3 transition-all cursor-pointer" onClick={() => handleNavigate(post.path)}>
                            Read More
                            <FiArrowRight />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 shadow-sm">
                  <h3 className="text-2xl sm:text-3xl font-black mb-6">
                    Categories
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    {[
                      'AI & Automation',
                      'Lead Generation',
                      'Outreach',
                      'Sales',
                      'Business Growth',
                      'Marketing',
                    ].map((item, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-gray-50 hover:bg-blue-600 hover:text-white transition-all font-semibold text-sm sm:text-base"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-linear-to-br from-blue-600 to-indigo-600 rounded-4xl p-6 sm:p-8 text-white shadow-2xl shadow-blue-200">
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl mb-5 sm:mb-6">
                    <FiZap />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-4 sm:mb-5">
                    Want More Growth Insights?
                  </h3>

                  <p className="text-blue-100 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                    Subscribe to receive the latest AI lead generation and
                    automation strategies directly in your inbox.
                  </p>

                  <button className="w-full py-3 sm:py-4 rounded-2xl bg-white text-blue-600 font-black hover:scale-105 transition-all text-sm sm:text-base">
                    Subscribe
                  </button>
                </div>
              </div>
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
          <div className="rounded-4xl bg-linear-to-r from-blue-600 to-indigo-600 p-8 sm:p-10 lg:p-14 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 shadow-2xl shadow-blue-200">
            <div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-2xl sm:text-3xl mb-5 sm:mb-6">
                <FiTrendingUp />
                <FiTarget />
                <FiZap />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 sm:mb-5">
                Start Growing With AI Today
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-full sm:max-w-2xl leading-relaxed">
                Discover smarter lead generation strategies and automate your
                outreach with AutoLeads AI.
              </p>
            </div>

            <Link
              to="/signup"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-blue-600 text-base sm:text-lg font-black hover:scale-105 transition-all text-center"
            >
              Start Free Trial
            </Link>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
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
              <h3 className="font-black text-lg mb-6">Product</h3>

              <div className="space-y-4 text-gray-600">
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
              <h3 className="font-black text-lg mb-6">Resources</h3>

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

                <Link to="/contact" className="block hover:text-black">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-black text-lg mb-6">Company</h3>

              <div className="space-y-4 text-gray-600">
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

          <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500">
            <p>© 2026 AutoLeads AI. All rights reserved.</p>

            <div className="flex items-center gap-8">
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

{errorMessageVisibility && error && (
  <p className="text-red-500 text-sm font-medium fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 px-4 py-2 rounded-lg shadow-lg">
    {error}
  </p>
)}
    </div>
  )
}