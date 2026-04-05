// import React, { useState, useEffect } from "react";
// import { FaShoppingCart, FaUser, FaUserCircle } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// function Navbar() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   // Function to update cart count
//   const updateCartCount = () => {
//     const cart = localStorage.getItem("cart");
//     const cartItems = cart ? JSON.parse(cart) : [];
//     const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//     setCartCount(totalCount);
//   };

//   // Check login status
//   const checkLoginStatus = () => {
//     const loggedIn = localStorage.getItem("isLoggedIn") === "true";
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     setIsLoggedIn(loggedIn);
//     setUser(currentUser);
//   };

//   // Load cart count and login status on mount
//   useEffect(() => {
//     updateCartCount();
//     checkLoginStatus();

//     // Listen for cart updates
//     window.addEventListener("cartUpdated", updateCartCount);
//     window.addEventListener("storage", checkLoginStatus);

//     return () => {
//       window.removeEventListener("cartUpdated", updateCartCount);
//       window.removeEventListener("storage", checkLoginStatus);
//     };
//   }, []);

//   const handleLogout = async () => {
//     const result = await Swal.fire({
//       title: 'Logout?',
//       text: 'Are you sure you want to logout?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, Logout',
//       cancelButtonText: 'Cancel'
//     });

//     if (result.isConfirmed) {
//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("currentUser");
//       setIsLoggedIn(false);
//       setUser(null);

//       Swal.fire({
//         icon: 'success',
//         title: 'Logged Out',
//         text: 'You have been successfully logged out.',
//         timer: 1500,
//         showConfirmButton: false
//       });

//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     }
//   };

//   return (
//     <nav className="w-full bg-black shadow-md border-b border-amber-400/20">
//       <div className="mx-auto max-w-7xl px-5">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <span className="text-amber-400 font-bold text-lg">Logo</span>
//           </Link>

//           {/* Desktop Menu */}
//           <ul className="hidden md:flex flex-1 justify-center items-center gap-8 text-md font-medium">
//             <li>
//               <Link to="/" className="text-gray-300 hover:text-amber-400 px-3 py-1 rounded transition duration-300">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/products" className="text-gray-300 hover:text-amber-400 px-3 py-1 rounded transition duration-300">
//                 Products
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className="text-gray-300 hover:text-amber-400 px-3 py-1 rounded transition duration-300">
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link to="/contact" className="text-gray-300 hover:text-amber-400 px-3 py-1 rounded transition duration-300">
//                 Contact
//               </Link>
//             </li>
//           </ul>

//           {/* Desktop Right */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link to="/cart" className="relative">
//               <FaShoppingCart className="text-amber-400 text-xl hover:text-amber-500 transition cursor-pointer" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {isLoggedIn ? (
//               <div className="relative group">
//                 <Link to="/profile" className="flex items-center gap-2">
//                   <FaUserCircle className="text-amber-400 text-2xl hover:text-amber-500 transition cursor-pointer" />
//                   <span className="text-gray-300 text-sm hidden lg:inline">
//                     {user?.fullName?.split(' ')[0]}
//                   </span>
//                 </Link>

//                 {/* Dropdown Menu */}
//                 <div className="absolute right-0 mt-6 w-48 bg-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-amber-400/20">
//                   <Link to="/profile" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-amber-400 rounded-t-lg">
//                     My Profile
//                   </Link>

//                   <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-red-400 hover:bg-gray-800 rounded-b-lg">
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <Link to="/login" className="rounded-full bg-amber-400 px-5 py-2 text-sm text-black font-semibold hover:bg-amber-500 transition duration-300">
//                 Login
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl text-amber-400 hover:text-amber-500 transition">
//             {menuOpen ? "✕" : "☰"}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <ul className="md:hidden bg-black border-t border-amber-400/20 py-4 rounded-b-lg shadow-lg">
//             <li className="block px-5 py-2">
//               <Link to="/" className="text-gray-300 hover:text-amber-400 rounded transition">Home</Link>
//             </li>
//             <li className="block px-5 py-2">
//               <Link to="/products" className="text-gray-300 hover:text-amber-400 rounded transition">Products</Link>
//             </li>
//             <li className="block px-5 py-2">
//               <Link to="/about" className="text-gray-300 hover:text-amber-400 rounded transition">About</Link>
//             </li>
//             <li className="block px-5 py-2">
//               <Link to="/contact" className="text-gray-300 hover:text-amber-400 rounded transition">Contact</Link>
//             </li>
//             <li className="flex items-center gap-4 px-5 py-2 mt-2">
//               <Link to="/cart" className="relative">
//                 <FaShoppingCart className="text-amber-400 text-xl" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//               {isLoggedIn ? (
//                 <>
//                   <Link to="/profile" className="flex-1 rounded-full bg-amber-400 py-2 text-black font-semibold hover:bg-amber-500 transition text-center">
//                     Profile
//                   </Link>
//                   <button onClick={handleLogout} className="flex-1 rounded-full bg-red-600 py-2 text-white font-semibold hover:bg-red-700 transition text-center">
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <Link to="/login" className="flex-1 rounded-full bg-amber-400 py-2 text-black font-semibold hover:bg-amber-500 transition text-center">
//                   Login
//                 </Link>
//               )}
//             </li>
//           </ul>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImageError, setProfileImageError] = useState(false);

  // প্রোফাইল ইমেজ URL বানানোর ফাংশন
  const getProfileImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith("http") || imagePath.startsWith("//")) {
      return imagePath;
    }

    const baseUrl =
      window.location.hostname === "localhost"
        ? "http://localhost:8000"
        : "https://e-commerce-next.orbitmediasolutions.com";

    if (imagePath.startsWith("/storage/")) {
      return `${baseUrl}${imagePath}`;
    }

    if (imagePath.includes("profile_images")) {
      if (imagePath.startsWith("profile_images/")) {
        return `${baseUrl}/storage/${imagePath}`;
      }
      return `${baseUrl}/storage/${imagePath}`;
    }

    const filename = imagePath.split("/").pop();
    return `${baseUrl}/storage/profile_images/${filename}`;
  };

  // Update cart count
  const updateCartCount = () => {
    const cart = localStorage.getItem("cart");
    const cartItems = cart ? JSON.parse(cart) : [];
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  // Check login status
  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setIsLoggedIn(loggedIn);
    setUser(currentUser);
    setProfileImageError(false);
  };

  useEffect(() => {
    updateCartCount();
    checkLoginStatus();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("auth_token");
      setIsLoggedIn(false);
      setUser(null);

      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been successfully logged out.",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  // Avatar fallback
  const getAvatarFallback = () => {
    const name = user?.fullName || user?.name || "User";
    return `https://ui-avatars.com/api/?background=f59e0b&color=fff&name=${encodeURIComponent(name)}`;
  };

  return (
    <nav className="w-full bg-black shadow-md border-b border-amber-400/20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-amber-400 font-bold text-lg">Logo</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex flex-1 justify-center items-center gap-8 text-md font-medium">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-amber-400 px-3 py-1 rounded transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-300 hover:text-amber-400 px-3 py-1 rounded transition duration-300"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-300 hover:text-amber-400 px-3 py-1 rounded transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-amber-400 px-3 py-1 rounded transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-amber-400 text-xl hover:text-amber-500 transition cursor-pointer" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="relative group">
                <Link to="/profile" className="flex items-center gap-2">
                  {user?.profile_image && !profileImageError ? (
                    <img
                      src={getProfileImageUrl(user.profile_image)}
                      alt={user?.fullName || user?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-amber-400"
                      onError={(e) => {
                        setProfileImageError(true);
                        e.target.onerror = null;
                        e.target.src = getAvatarFallback();
                      }}
                    />
                  ) : (
                    <img
                      src={getAvatarFallback()}
                      alt={user?.fullName || user?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-amber-400"
                    />
                  )}
                  <span className="text-gray-300 text-sm hidden lg:inline">
                    {user?.fullName?.split(" ")[0] || user?.name?.split(" ")[0]}
                  </span>
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-6 w-48 bg-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-amber-400/20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-amber-400 rounded-t-lg"
                  >
                    My Profile
                  </Link>
                  
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-amber-400"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-red-400 hover:bg-gray-800 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-amber-400 px-5 py-2 text-sm text-black font-semibold hover:bg-amber-500 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl text-amber-400 hover:text-amber-500 transition"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden bg-black border-t border-amber-400/20 py-4 rounded-b-lg shadow-lg">
            <li className="block px-5 py-2">
              <Link
                to="/"
                className="text-gray-300 hover:text-amber-400 rounded transition"
              >
                Home
              </Link>
            </li>
            <li className="block px-5 py-2">
              <Link
                to="/products"
                className="text-gray-300 hover:text-amber-400 rounded transition"
              >
                Products
              </Link>
            </li>
            <li className="block px-5 py-2">
              <Link
                to="/about"
                className="text-gray-300 hover:text-amber-400 rounded transition"
              >
                About
              </Link>
            </li>
            <li className="block px-5 py-2">
              <Link
                to="/contact"
                className="text-gray-300 hover:text-amber-400 rounded transition"
              >
                Contact
              </Link>
            </li>
            <li className="flex items-center gap-4 px-5 py-2 mt-2">
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-amber-400 text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="flex-1 rounded-full bg-amber-400 py-2 text-black font-semibold hover:bg-amber-500 transition text-center"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-amber-400"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex-1 rounded-full bg-red-600 py-2 text-white font-semibold hover:bg-red-700 transition text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex-1 rounded-full bg-amber-400 py-2 text-black font-semibold hover:bg-amber-500 transition text-center"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
