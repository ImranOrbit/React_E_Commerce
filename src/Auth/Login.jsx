


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.email || !formData.password) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Validation Error',
//         text: 'Please fill in all fields',
//         confirmButtonColor: '#d33',
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const apiUrl = window.location.hostname === 'localhost'
//         ? '/api/login'
//         : 'https://e-commerce-next.orbitmediasolutions.com/api/login';

//       const response = await axios.post(apiUrl, {
//         email: formData.email,
//         password: formData.password
//       }, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (response.data.status === true) {
//         // Store user data and token
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("currentUser", JSON.stringify(response.data.user));
//         localStorage.setItem("auth_token", response.data.token);
        
//         Swal.fire({
//           icon: 'success',
//           title: 'Login Successful!',
//           text: `Welcome back, ${response.data.user.name}!`,
//           timer: 1500,
//           showConfirmButton: false
//         });
        
//         setTimeout(() => {
//           navigate("/");
//         }, 1500);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
      
//       let errorMessage = "Invalid email or password";
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Login Failed',
//         text: errorMessage,
//         confirmButtonColor: '#d33',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="bg-black min-h-screen flex items-center justify-center px-4">
//       <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-amber-400/20">
//         <h2 className="text-3xl font-bold text-amber-400 text-center mb-6">Login</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email Address"
//             className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition"
//           />
          
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition"
//             >
//               {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//             </button>
//           </div>

//           <button 
//             type="submit"
//             disabled={loading}
//             className="w-full mt-6 bg-amber-400 py-3 rounded-full text-black font-semibold hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div className="mt-4 text-center text-gray-400 text-sm">
//           <p>
//             Don't have an account?{" "}
//             <Link to="/register" className="text-amber-400 hover:text-amber-500">
//               Register
//             </Link>
//           </p>
//           <p className="mt-2">
//             <Link to="/forgot-password" className="text-amber-400 hover:text-amber-500">
//               Forgot Password?
//             </Link>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
import BASE_URL from '../BASE_URL/BASE_URL';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields',
        confirmButtonColor: '#d33',
      });
      return;
    }

    setLoading(true);

    try {
      // BASE_URL use kore API call
      const apiUrl = `${BASE_URL}/login`;
      
      const response = await axios.post(apiUrl, {
        email: formData.email,
        password: formData.password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.status === true) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem("auth_token", response.data.token);
        
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: `Welcome back, ${response.data.user.name}!`,
          timer: 1500,
          showConfirmButton: false
        });
        
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      
      let errorMessage = "Invalid email or password";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-amber-400/20">
        <h2 className="text-3xl font-bold text-amber-400 text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition"
          />
          
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

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-amber-400 py-3 rounded-full text-black font-semibold hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-400 text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-amber-400 hover:text-amber-500">
              Register
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/forgot-password" className="text-amber-400 hover:text-amber-500">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;



