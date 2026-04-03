import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-3 text-amber-400">Orbit Media Solution</h3>
            <p className="text-sm text-gray-300">
              Premium fashion & lifestyle destination since 2024. Quality products, exceptional service.
            </p>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-amber-400">About</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-amber-400 cursor-pointer">Our Story</li>
              <li className="hover:text-amber-400 cursor-pointer">Contact Us</li>
              <li className="hover:text-amber-400 cursor-pointer">Blog</li>
              <li className="hover:text-amber-400 cursor-pointer">Careers</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-amber-400">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-amber-400 cursor-pointer">👕 Shirt</li>
              <li className="hover:text-amber-400 cursor-pointer">🧥 Panjabi</li>
              <li className="hover:text-amber-400 cursor-pointer">👕 T-Shirt</li>
              <li className="hover:text-amber-400 cursor-pointer">👖 Pant</li>
              <li className="hover:text-amber-400 cursor-pointer">🌸 Perfume</li>
              <li className="hover:text-amber-400 cursor-pointer">💎 Accessories</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-amber-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-amber-400 cursor-pointer">All Products</li>
              <li className="hover:text-amber-400 cursor-pointer">Special Offers</li>
              <li className="hover:text-amber-400 cursor-pointer">New Arrivals</li>
              <li className="hover:text-amber-400 cursor-pointer">Best Sellers</li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-700 mt-6 pt-6 flex justify-center space-x-6">
          <FaFacebook className="text-gray-400 hover:text-amber-400 text-xl cursor-pointer" />
          <FaInstagram className="text-gray-400 hover:text-amber-400 text-xl cursor-pointer" />
          <FaTwitter className="text-gray-400 hover:text-amber-400 text-xl cursor-pointer" />
          <FaYoutube className="text-gray-400 hover:text-amber-400 text-xl cursor-pointer" />
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Orbit Media Solution. All rights reserved. | Designed with ❤️ for fashion lovers
          </p>
          <p className="text-xs text-gray-500 mt-2">
            <span className="hover:text-amber-400 cursor-pointer">Privacy Policy</span> | 
            <span className="hover:text-amber-400 cursor-pointer ml-2">Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;