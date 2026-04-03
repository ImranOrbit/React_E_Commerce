import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields',
        confirmButtonColor: '#d33',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match',
        confirmButtonColor: '#d33',
      });
      return;
    }

    if (formData.password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 6 characters',
        confirmButtonColor: '#d33',
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Get existing users
      const users = JSON.parse(localStorage.getItem("users")) || [];
      
      // Check if email already exists
      if (users.find(u => u.email === formData.email)) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Email already exists. Please use a different email.',
          confirmButtonColor: '#d33',
        });
        setLoading(false);
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
        orders: []
      };
      
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        html: `Welcome, <strong>${formData.fullName}</strong>!<br>Please login to continue.`,
        confirmButtonColor: '#f59e0b',
        background: '#1a1a1a',
        color: '#fff'
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-amber-400/20">
        <h2 className="text-3xl font-bold text-amber-400 text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition"
          />
          
          {/* Password Field with Eye Icon */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          
          {/* Confirm Password Field with Eye Icon */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition"
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-amber-400 py-3 rounded-full text-black font-semibold hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-400 text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-amber-400 hover:text-amber-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;