



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//     password_confirmation: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.password || !formData.password_confirmation) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Validation Error',
//         text: 'Please fill in all fields',
//         confirmButtonColor: '#d33',
//       });
//       return;
//     }

//     if (formData.password !== formData.password_confirmation) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Password Mismatch',
//         text: 'Passwords do not match',
//         confirmButtonColor: '#d33',
//       });
//       return;
//     }

//     if (formData.password.length < 8) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Weak Password',
//         text: 'Password must be at least 8 characters',
//         confirmButtonColor: '#d33',
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const apiUrl = window.location.hostname === 'localhost'
//         ? '/api/register'
//         : 'https://e-commerce-next.orbitmediasolutions.com/api/register';

//       const response = await axios.post(apiUrl, {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.address,
//         password: formData.password
//       }, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (response.data.status === true) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Registration Successful!',
//           html: `Welcome, <strong>${response.data.user.name}</strong>!<br>Please login to continue.`,
//           confirmButtonColor: '#f59e0b'
//         });
        
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
      
//       let errorMessage = "Registration failed. Please try again.";
      
//       if (error.response?.data?.errors) {
//         const errors = error.response.data.errors;
//         errorMessage = Object.values(errors).flat().join('\n');
//       } else if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Registration Failed',
//         text: errorMessage,
//         confirmButtonColor: '#d33',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="bg-black min-h-screen flex items-center justify-center px-4 py-8">
//       <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-amber-400/20">
//         <h2 className="text-3xl font-bold text-amber-400 text-center mb-6">Register</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition"
//           />
          
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email Address"
//             className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition"
//           />
          
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition"
//           />
          
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Your Address"
//             rows="2"
//             className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition"
//           />
          
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password (min. 8 characters)"
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
          
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               name="password_confirmation"
//               value={formData.password_confirmation}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//               className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition"
//             >
//               {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//             </button>
//           </div>

//           <button 
//             type="submit"
//             disabled={loading}
//             className="w-full mt-6 bg-amber-400 py-3 rounded-full text-black font-semibold hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <div className="mt-4 text-center text-gray-400 text-sm">
//           <p>
//             Already have an account?{" "}
//             <Link to="/login" className="text-amber-400 hover:text-amber-500">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Register;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
import BASE_URL from '../BASE_URL/BASE_URL';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    password_confirmation: ""
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
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.password || !formData.password_confirmation) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields',
        confirmButtonColor: '#d33',
      });
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match',
        confirmButtonColor: '#d33',
      });
      return;
    }

    if (formData.password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 8 characters',
        confirmButtonColor: '#d33',
      });
      return;
    }

    setLoading(true);

    try {
      const apiUrl = `${BASE_URL}/register`;

      const response = await axios.post(apiUrl, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          html: `Welcome, <strong>${response.data.user.name}</strong>!<br>Please login to continue.`,
          confirmButtonColor: '#f59e0b'
        });
        
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        errorMessage = Object.values(errors).flat().join('\n');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-amber-400/20">
        <h2 className="text-3xl font-bold text-amber-400 text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
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
          
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition"
          />
          
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your Address"
            rows="2"
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-gray-300 focus:outline-none focus:border-amber-400 transition"
          />
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password (min. 8 characters)"
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
          
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirmation"
              value={formData.password_confirmation}
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