import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaCalendar, FaShoppingBag, FaSignOutAlt, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!isLoggedIn || !currentUser) {
      navigate("/login");
      return;
    }
    
    setUser(currentUser);
    
    // Load user orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userSpecificOrders = allOrders.filter(order => order.userEmail === currentUser.email);
    setUserOrders(userSpecificOrders);
  }, [navigate]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel'
    });
    
    if (result.isConfirmed) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        timer: 1500,
        showConfirmButton: false
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: 'Delete Account?',
      text: 'This action cannot be undone. All your data will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete Account',
      cancelButtonText: 'Cancel'
    });
    
    if (result.isConfirmed) {
      // Remove user from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.filter(u => u.email !== user.email);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // Remove current session
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      
      Swal.fire({
        icon: 'success',
        title: 'Account Deleted',
        text: 'Your account has been permanently deleted.',
        timer: 2000,
        showConfirmButton: false
      });
      
      setTimeout(() => {
        navigate("/register");
      }, 2000);
    }
  };

  if (!user) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-400">My Profile</h1>
          <p className="text-gray-400 mt-1">Manage your account and orders</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <div className="md:col-span-1">
            <div className="bg-gray-900 rounded-xl shadow-lg border border-amber-400/20 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-4xl text-black" />
                </div>
                <h2 className="text-xl font-bold text-white">{user.fullName}</h2>
                <p className="text-gray-400 text-sm">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="space-y-3 border-t border-gray-700 pt-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <FaEnvelope className="text-amber-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaCalendar className="text-amber-400" />
                  <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaShoppingBag className="text-amber-400" />
                  <span>Orders: {userOrders.length}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <FaSignOutAlt /> Logout
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center justify-center gap-2 bg-gray-800 text-red-400 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  <FaTrash /> Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="md:col-span-2">
            <div className="bg-gray-900 rounded-xl shadow-lg border border-amber-400/20 p-6">
              <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                <FaShoppingBag /> My Orders
              </h3>
              
              {userOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No orders yet</p>
                  <Link 
                    to="/products" 
                    className="inline-block mt-4 bg-amber-400 text-black px-6 py-2 rounded-lg hover:bg-amber-500 transition"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((order, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-amber-400 font-mono text-sm">{order.orderNumber}</p>
                          <p className="text-gray-400 text-xs">{new Date(order.date).toLocaleString()}</p>
                        </div>
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                          Delivered
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-300">{item.name} x{item.quantity}</span>
                            <span className="text-white">£{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-gray-500 text-xs">+ {order.items.length - 2} more items</p>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                        <span className="text-gray-400">Total</span>
                        <span className="text-amber-400 font-bold">£{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;