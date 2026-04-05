// import React from "react";

// const Contact = () => {
//   return (
//     <section className="bg-black py-16 px-4">
//       <div className="max-w-5xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-amber-400">Contact Us</h1>
//           <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 mb-4"></div>
//           <p className="mt-3 text-gray-300">
//             We're here to help you with orders, support & inquiries
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-10">

//           {/* Info Section */}
//           <div className="bg-gray-900 rounded-xl p-6 border border-amber-400/20">
//             <h3 className="text-xl font-semibold mb-4 text-amber-400">Customer Support</h3>

//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <span className="text-amber-400 text-xl">📧</span>
//                 <p className="text-gray-300">support@orbitmediasolution.com</p>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <span className="text-amber-400 text-xl">📞</span>
//                 <p className="text-gray-300">+880 1234-567890</p>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <span className="text-amber-400 text-xl">🕒</span>
//                 <p className="text-gray-300">24/7 Support Available</p>
//               </div>
//             </div>

//             {/* Address */}
//             <div className="mt-6 pt-6 border-t border-amber-400/20">
//               <h4 className="text-amber-400 font-semibold mb-2">Visit Us</h4>
//               <p className="text-gray-400 text-sm">
//                 123 Fashion Street, Dhaka<br />
//                 Bangladesh
//               </p>
//             </div>
//           </div>

//           {/* Contact Form (Design Only) */}
//           <div className="bg-gray-900 rounded-xl p-6 shadow space-y-4 border border-amber-400/20">
//             <div>
//               <label className="block text-amber-400 text-sm font-medium mb-2">Your Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 className="w-full rounded-lg border border-gray-700 bg-black px-4 py-2 text-gray-300 focus:outline-none focus:border-amber-400 transition"
//               />
//             </div>

//             <div>
//               <label className="block text-amber-400 text-sm font-medium mb-2">Email Address</label>
//               <input
//                 type="email"
//                 placeholder="your@email.com"
//                 className="w-full rounded-lg border border-gray-700 bg-black px-4 py-2 text-gray-300 focus:outline-none focus:border-amber-400 transition"
//               />
//             </div>

//             <div>
//               <label className="block text-amber-400 text-sm font-medium mb-2">Your Message</label>
//               <textarea
//                 rows="4"
//                 placeholder="How can we help you?"
//                 className="w-full rounded-lg border border-gray-700 bg-black px-4 py-2 text-gray-300 focus:outline-none focus:border-amber-400 transition"
//               ></textarea>
//             </div>

//             <button className="w-full rounded-full bg-amber-400 py-3 text-black font-semibold hover:bg-amber-500 transition duration-300">
//               Send Message →
//             </button>
//           </div>

//         </div>

//         {/* Footer Note */}
//         <div className="mt-12 text-center">
//           <p className="text-gray-500 text-sm">
//             ✨ We respond to all messages within 24 hours ✨
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;



import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaClock, FaMapMarkerAlt, FaCheckCircle, FaSpinner } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Get API base URL
  const getApiUrl = (endpoint) => {
    const baseUrl = window.location.hostname === 'localhost'
      ? '/api'
      : 'https://e-commerce-next.orbitmediasolutions.com/api';
    return `${baseUrl}${endpoint}`;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please check all fields and try again.',
        confirmButtonColor: '#d33',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(getApiUrl('/contact'), formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data.status === true) {
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you for contacting us. We will get back to you soon.',
          confirmButtonColor: '#f59e0b',
          background: '#1a1a1a',
          color: '#fff'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        errorMessage = Object.values(errors).flat().join('\n');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black py-16 px-4 min-h-screen">
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
              <div className="flex items-center gap-3 group hover:bg-gray-800 p-2 rounded-lg transition">
                <FaEnvelope className="text-amber-400 text-xl" />
                <div>
                  <p className="text-gray-400 text-xs">Email Us</p>
                  <p className="text-gray-300">support@orbitmediasolution.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group hover:bg-gray-800 p-2 rounded-lg transition">
                <FaPhone className="text-amber-400 text-xl" />
                <div>
                  <p className="text-gray-400 text-xs">Call Us</p>
                  <p className="text-gray-300">+880 1234-567890</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group hover:bg-gray-800 p-2 rounded-lg transition">
                <FaClock className="text-amber-400 text-xl" />
                <div>
                  <p className="text-gray-400 text-xs">Support Hours</p>
                  <p className="text-gray-300">24/7 Support Available</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mt-6 pt-6 border-t border-amber-400/20">
              <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
                <FaMapMarkerAlt /> Visit Us
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                123 Fashion Street, Dhaka<br />
                Bangladesh
              </p>
            </div>

            {/* Quick Response Note */}
            <div className="mt-6 bg-amber-400/10 rounded-lg p-4 border border-amber-400/20">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <FaCheckCircle />
                <span className="font-semibold text-sm">Quick Response</span>
              </div>
              <p className="text-gray-400 text-xs">
                We typically respond within 24 hours during business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 shadow space-y-4 border border-amber-400/20">
            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-700'} bg-black px-4 py-2 text-gray-300 focus:outline-none focus:border-amber-400 transition`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-700'} bg-black px-4 py-2 text-gray-300 focus:outline-none focus:border-amber-400 transition`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-amber-400 text-sm font-medium mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className={`w-full rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-700'} bg-black px-4 py-2 text-gray-300 focus:outline-none focus:border-amber-400 transition resize-none`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
              <p className="text-gray-500 text-xs mt-1 text-right">
                {formData.message.length}/1000 characters
              </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-amber-400 py-3 text-black font-semibold hover:bg-amber-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message →
                </>
              )}
            </button>
          </form>

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