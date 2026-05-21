import { useState } from 'react'

import { motion } from 'framer-motion'

import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from 'react-icons/fi'

import { Link } from 'react-router-dom'

export default function SignupPage() {

  const [passwordVisibility, setPasswordVisibility] =
    useState<boolean>(false)

  const togglePasswordVisibility = (): void => {
    setPasswordVisibility((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">

      <main>

        <section className="border-b border-gray-100 bg-linear-to-b from-blue-50 to-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Already signed up?
              </p>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 px-5 sm:px-6 py-3 rounded-4xl shadow-sm hover:shadow-lg transition-all text-sm sm:text-base font-semibold"
              >
                Log In
                <FiArrowRight />
              </Link>

            </div>

          </div>

        </section>

        <section className="py-12 sm:py-16 lg:py-24">

          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              className="bg-white border border-gray-100 rounded-4xl p-6 sm:p-8 lg:p-10 shadow-xl"
            >

              <div className="mb-8">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">
                  Create Account
                </h1>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Start using AI-powered lead generation and automation.
                </p>

              </div>

              <form className="space-y-6">

                <div>

                  <label className="block text-sm sm:text-base font-semibold mb-3">
                    Full Name
                  </label>

                  <div className="flex items-center gap-3 border border-gray-200 rounded-4xl px-4 py-4 bg-gray-50">

                    <FiUser className="text-blue-600 text-lg shrink-0" />

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full bg-transparent outline-none text-sm sm:text-base"
                    />

                  </div>

                </div>

                <div>

                  <label className="block text-sm sm:text-base font-semibold mb-3">
                    Email Address
                  </label>

                  <div className="flex items-center gap-3 border border-gray-200 rounded-4xl px-4 py-4 bg-gray-50">

                    <FiMail className="text-blue-600 text-lg shrink-0" />

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-transparent outline-none text-sm sm:text-base"
                    />

                  </div>

                </div>

                <div>

                  <label className="block text-sm sm:text-base font-semibold mb-3">
                    Password
                  </label>

                  <div className="flex items-center gap-3 border border-gray-200 rounded-4xl px-4 py-4 bg-gray-50">

                    <FiLock className="text-blue-600 text-lg shrink-0" />

                    <input
                      type={
                        passwordVisibility
                          ? 'text'
                          : 'password'
                      }
                      placeholder="Create a password"
                      className="w-full bg-transparent outline-none text-sm sm:text-base"
                    />

                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-500 text-xl"
                    >
                      {passwordVisibility ? (
                        <FiEyeOff />
                      ) : (
                        <FiEye />
                      )}
                    </button>

                  </div>

                </div>

                <div className="flex justify-end mb-2">
                  <Link
                    to="/forgot-password"
                    className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm sm:text-base text-blue-600 font-semibold shadow-sm hover:border-blue-200 hover:bg-blue-100 transition-all"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-4xl py-4 text-sm sm:text-base md:text-lg font-bold shadow-xl shadow-blue-200"
                >
                  Create Account
                </button>

              </form>

            </motion.div>

          </div>

        </section>

      </main>

    </div>
  )
}