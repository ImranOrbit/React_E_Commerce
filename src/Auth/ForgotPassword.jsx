import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-amber-400/20">
        <h2 className="text-3xl font-bold text-amber-400 text-center mb-6">Forgot Password</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        <button className="w-full mt-6 bg-amber-400 py-3 rounded-full text-black font-semibold hover:bg-amber-500 transition">
          Send Reset Link
        </button>

        <div className="mt-4 text-center text-gray-400 text-sm">
          <p>
            Remembered your password?{" "}
            <Link to="/login" className="text-amber-400 hover:text-amber-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;