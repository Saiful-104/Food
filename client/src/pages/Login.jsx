import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await login(data.email, data.password);
    setLoading(false);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    const result = await demoLogin(role);
    setLoading(false);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} login coming soon! Use demo login for now.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold">Welcome Back</h2>
          <p className="text-center text-neutral-600 dark:text-neutral-400 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <div className="card p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className="input-field pl-10"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-neutral-300 rounded"
                />
                <label className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-500 hover:text-primary-600"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-neutral-800 text-neutral-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDemoLogin("user")}
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-sm bg-white dark:bg-neutral-800 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                Demo User
              </button>
              <button
                onClick={() => handleDemoLogin("admin")}
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-sm bg-white dark:bg-neutral-800 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                Demo Admin
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-sm bg-white dark:bg-neutral-800 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                <FaGoogle className="text-red-500 mr-2" />
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-sm bg-white dark:bg-neutral-800 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                <FaFacebook className="text-blue-600 mr-2" />
                Facebook
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary-500 hover:text-primary-600"
          >
            Sign up now
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
