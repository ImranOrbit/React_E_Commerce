import React from "react";

const Contact = () => {
  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-400">Contact Us</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 mb-4"></div>
          <p className="mt-3 text-gray-300">
            We're here to help you with orders, support & inquiries
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Info Section */}
          <div className="bg-gray-900 rounded-xl p-6 border border-amber-400/20">
            <h3 className="text-xl font-semibold mb-4 text-amber-400">Customer Support</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-xl">📧</span>
                <p className="text-gray-300">support@orbitmediasolution.com</p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-xl">📞</span>
                <p className="text-gray-300">+880 1234-567890</p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-xl">🕒</span>
                <p className="text-gray-300">24/7 Support Available</p>
              </div>
            </div>

            {/* Address */}
            <div className="mt-6 pt-6 border-t border-amber-400/20">
              <h4 className="text-amber-400 font-semibold mb-2">Visit Us</h4>
              <p className="text-gray-400 text-sm">
                123 Fashion Street, Dhaka<br />
                Bangladesh
              </p>
            </div>
          </div>

          {/* Contact Form (Design Only) */}
          <div className="bg-gray-900 rounded-xl p-6 shadow space-y-4 border border-amber-400/20">
            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-2 text-gray-300 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-2 text-gray-300 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">Your Message</label>
              <textarea
                rows="4"
                placeholder="How can we help you?"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-2 text-gray-300 focus:outline-none focus:border-amber-400 transition"
              ></textarea>
            </div>

            <button className="w-full rounded-full bg-amber-400 py-3 text-black font-semibold hover:bg-amber-500 transition duration-300">
              Send Message →
            </button>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            ✨ We respond to all messages within 24 hours ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;