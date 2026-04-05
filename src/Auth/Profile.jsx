




// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShoppingBag, FaSignOutAlt, FaTrash, FaCamera, FaEdit, FaSave, FaTimes } from "react-icons/fa";
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const Profile = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [userOrders, setUserOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: ''
//   });
//   const [profileImage, setProfileImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [imageLoadFailed, setImageLoadFailed] = useState(false);

//   const getApiUrl = (endpoint) => {
//     const baseUrl = window.location.hostname === 'localhost'
//       ? '/api'
//       : 'https://e-commerce-next.orbitmediasolutions.com/api';
//     return `${baseUrl}${endpoint}`;
//   };

//   const getAuthToken = () => {
//     return localStorage.getItem('auth_token');
//   };

//   // UI Avatar URL (ইমেজ না থাকলে বা লোড না হলে দেখাবে)
//   const getUIAvatarUrl = () => {
//     const name = user?.name || 'User';
//     return `https://ui-avatars.com/api/?background=f59e0b&color=fff&name=${encodeURIComponent(name)}&size=96&rounded=true&bold=true`;
//   };

//   // Display image URL - always returns a valid URL (either image or avatar)
//   const getDisplayImageUrl = () => {
//     if (imageLoadFailed) {
//       return getUIAvatarUrl();
//     }
    
//     if (imagePreview) {
//       return imagePreview;
//     }
    
//     if (user?.profile_image) {
//       return user.profile_image;
//     }
    
//     return getUIAvatarUrl();
//   };

//   const fetchUserProfile = async () => {
//     try {
//       const token = getAuthToken();
      
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       const response = await axios.get(getApiUrl('/profile'), {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json'
//         }
//       });

//       console.log("Profile Response:", response.data);

//       if (response.data.success) {
//         const userData = response.data.data;
//         setUser(userData);
//         setEditForm({
//           name: userData.name || '',
//           email: userData.email || '',
//           phone: userData.phone || '',
//           address: userData.address || ''
//         });
        
//         // Check if profile image exists and is accessible
//         if (userData.profile_image) {
//           // Test if image loads
//           const img = new Image();
//           img.onload = () => {
//             setImagePreview(userData.profile_image);
//             setImageLoadFailed(false);
//           };
//           img.onerror = () => {
//             console.log("Profile image not found, using avatar");
//             setImageLoadFailed(true);
//             setImagePreview(null);
//           };
//           img.src = userData.profile_image;
//         } else {
//           setImageLoadFailed(true);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem('auth_token');
//         localStorage.removeItem('isLoggedIn');
//         localStorage.removeItem('currentUser');
//         navigate('/login');
//       }
//     }
//   };

//   const fetchUserOrders = async () => {
//     try {
//       const token = getAuthToken();
      
//       if (!token) return;

//       const response = await axios.get(getApiUrl('/orders'), {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json'
//         }
//       });

//       let ordersData = [];
//       if (response.data.success && Array.isArray(response.data.data)) {
//         ordersData = response.data.data;
//       } else if (Array.isArray(response.data)) {
//         ordersData = response.data;
//       } else if (response.data.orders && Array.isArray(response.data.orders)) {
//         ordersData = response.data.orders;
//       }
      
//       setUserOrders(ordersData);
      
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
//       const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      
//       if (currentUser && currentUser.email) {
//         const userSpecificOrders = allOrders.filter(order => order.userEmail === currentUser.email);
//         setUserOrders(userSpecificOrders);
//       }
//     }
//   };

//   useEffect(() => {
//     const loadAllData = async () => {
//       setLoading(true);
//       const token = getAuthToken();
//       const isLoggedIn = localStorage.getItem("isLoggedIn");
      
//       if (!token || !isLoggedIn) {
//         navigate("/login");
//         return;
//       }
      
//       await fetchUserProfile();
//       await fetchUserOrders();
//       setLoading(false);
//     };
    
//     loadAllData();
//   }, [navigate]);

//   const handleEditChange = (e) => {
//     setEditForm({
//       ...editForm,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         Swal.fire({
//           icon: 'error',
//           title: 'File Too Large',
//           text: 'Image size should be less than 2MB',
//           confirmButtonColor: '#d33',
//         });
//         return;
//       }

//       const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!allowedTypes.includes(file.type)) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Invalid File Type',
//           text: 'Please select a valid image (JPEG, PNG, GIF, WEBP)',
//           confirmButtonColor: '#d33',
//         });
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         setProfileImage(base64String);
//         setImagePreview(base64String);
//         setImageLoadFailed(false);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpdateProfile = async () => {
//     try {
//       setUploading(true);
//       const token = getAuthToken();
      
//       const updateData = {
//         name: editForm.name,
//         email: editForm.email,
//         phone: editForm.phone,
//         address: editForm.address
//       };

//       if (profileImage && profileImage !== user?.profile_image) {
//         updateData.image = profileImage;
//       }

//       const response = await axios.put(getApiUrl('/profile'), updateData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.data.success) {
//         const updatedUser = response.data.data;
//         setUser(updatedUser);
        
//         if (updatedUser.profile_image) {
//           // Test if image loads
//           const img = new Image();
//           img.onload = () => {
//             setImagePreview(updatedUser.profile_image);
//             setImageLoadFailed(false);
//           };
//           img.onerror = () => {
//             setImageLoadFailed(true);
//             setImagePreview(null);
//           };
//           img.src = updatedUser.profile_image;
//         } else {
//           setImageLoadFailed(true);
//         }
        
//         const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//         if (currentUser) {
//           const updatedLocalUser = {
//             ...currentUser,
//             name: updatedUser.name,
//             email: updatedUser.email,
//             phone: updatedUser.phone,
//             address: updatedUser.address,
//             profile_image: updatedUser.profile_image
//           };
//           localStorage.setItem("currentUser", JSON.stringify(updatedLocalUser));
//         }
        
//         setIsEditing(false);
//         setProfileImage(null);
        
//         Swal.fire({
//           icon: 'success',
//           title: 'Profile Updated!',
//           text: 'Your profile has been successfully updated.',
//           timer: 1500,
//           showConfirmButton: false
//         });
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: 'Failed to update profile. Please try again.',
//         confirmButtonColor: '#d33',
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDeleteImage = async () => {
//     const result = await Swal.fire({
//       title: 'Delete Profile Image?',
//       text: 'Are you sure you want to delete your profile image?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, Delete',
//       cancelButtonText: 'Cancel'
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = getAuthToken();
        
//         const response = await axios.delete(getApiUrl('/profile/image'), {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Accept': 'application/json'
//           }
//         });

//         if (response.data.success) {
//           setImagePreview(null);
//           setImageLoadFailed(true);
//           setUser(prev => ({ ...prev, profile_image: null }));
          
//           Swal.fire({
//             icon: 'success',
//             title: 'Image Deleted',
//             text: 'Profile image has been removed.',
//             timer: 1500,
//             showConfirmButton: false
//           });
//         }
//       } catch (error) {
//         console.error('Error deleting image:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to delete profile image.',
//           confirmButtonColor: '#d33',
//         });
//       }
//     }
//   };

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
//       try {
//         const token = getAuthToken();
//         if (token) {
//           await axios.post(getApiUrl('/logout'), {}, {
//             headers: { 'Authorization': `Bearer ${token}` }
//           });
//         }
//       } catch (error) {
//         console.error('Logout error:', error);
//       }
      
//       localStorage.removeItem("auth_token");
//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("currentUser");
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Logged Out',
//         text: 'You have been successfully logged out.',
//         timer: 1500,
//         showConfirmButton: false
//       });
      
//       setTimeout(() => navigate("/login"), 1500);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     Swal.fire({
//       icon: 'info',
//       title: 'Coming Soon',
//       text: 'Account deletion feature will be available soon.',
//       confirmButtonColor: '#f59e0b',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="bg-black min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <div className="bg-black min-h-screen py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-amber-400">My Profile</h1>
//           <p className="text-gray-400 mt-1">Manage your account and orders</p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Profile Info Card */}
//           <div className="md:col-span-1">
//             <div className="bg-gray-900 rounded-xl shadow-lg border border-amber-400/20 p-6">
//               {/* Profile Image - Always shows either image or avatar */}
//               <div className="text-center mb-6">
//                 <div className="relative w-24 h-24 mx-auto mb-4">
//                   <img
//                     src={getDisplayImageUrl()}
//                     alt={user.name}
//                     className="w-full h-full rounded-full object-cover border-2 border-amber-400"
//                   />
                  
//                   {isEditing && (
//                     <label className="absolute bottom-0 right-0 bg-amber-400 rounded-full p-2 cursor-pointer hover:bg-amber-500 transition">
//                       <FaCamera className="text-black text-sm" />
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageSelect}
//                         className="hidden"
//                       />
//                     </label>
//                   )}
//                 </div>
                
//                 {!isEditing ? (
//                   <>
//                     <h2 className="text-xl font-bold text-white">{user.name}</h2>
//                     <p className="text-gray-400 text-sm">Member since {new Date().getFullYear()}</p>
//                     {imageLoadFailed && user?.profile_image && (
//                       <p className="text-xs text-amber-400 mt-1">Using avatar (image not found)</p>
//                     )}
//                   </>
//                 ) : (
//                   <input
//                     type="text"
//                     name="name"
//                     value={editForm.name}
//                     onChange={handleEditChange}
//                     className="text-center w-full px-3 py-1 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:outline-none"
//                     placeholder="Your Name"
//                   />
//                 )}
//               </div>

//               {!isEditing && (
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="w-full mb-4 flex items-center justify-center gap-2 bg-amber-400 text-black py-2 rounded-lg hover:bg-amber-500 transition"
//                 >
//                   <FaEdit /> Edit Profile
//                 </button>
//               )}

//               <div className="space-y-3 border-t border-gray-700 pt-4">
//                 <div className="flex items-center gap-3 text-gray-300">
//                   <FaEnvelope className="text-amber-400" />
//                   {!isEditing ? (
//                     <span>{user.email}</span>
//                   ) : (
//                     <input
//                       type="email"
//                       name="email"
//                       value={editForm.email}
//                       onChange={handleEditChange}
//                       className="flex-1 px-3 py-1 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:outline-none"
//                     />
//                   )}
//                 </div>
                
//                 <div className="flex items-center gap-3 text-gray-300">
//                   <FaPhone className="text-amber-400" />
//                   {!isEditing ? (
//                     <span>{user.phone || 'Not provided'}</span>
//                   ) : (
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={editForm.phone}
//                       onChange={handleEditChange}
//                       className="flex-1 px-3 py-1 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:outline-none"
//                       placeholder="Phone Number"
//                     />
//                   )}
//                 </div>
                
//                 <div className="flex items-start gap-3 text-gray-300">
//                   <FaMapMarkerAlt className="text-amber-400 mt-1" />
//                   {!isEditing ? (
//                     <span className="flex-1">{user.address || 'Not provided'}</span>
//                   ) : (
//                     <textarea
//                       name="address"
//                       value={editForm.address}
//                       onChange={handleEditChange}
//                       className="flex-1 px-3 py-1 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:outline-none"
//                       rows="2"
//                       placeholder="Your Address"
//                     />
//                   )}
//                 </div>
//               </div>

//               {isEditing && (
//                 <div className="mt-4 space-y-2">
//                   <button
//                     onClick={handleUpdateProfile}
//                     disabled={uploading}
//                     className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
//                   >
//                     <FaSave /> {uploading ? 'Saving...' : 'Save Changes'}
//                   </button>
//                   <button
//                     onClick={() => {
//                       setIsEditing(false);
//                       setProfileImage(null);
//                       setImageLoadFailed(true);
//                       setEditForm({
//                         name: user.name,
//                         email: user.email,
//                         phone: user.phone || '',
//                         address: user.address || ''
//                       });
//                     }}
//                     className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition"
//                   >
//                     <FaTimes /> Cancel
//                   </button>
//                   {(imagePreview || user?.profile_image) && (
//                     <button
//                       onClick={handleDeleteImage}
//                       className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
//                     >
//                       <FaTrash /> Remove Image
//                     </button>
//                   )}
//                 </div>
//               )}

//               {!isEditing && (
//                 <div className="mt-6 space-y-3">
//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
//                   >
//                     <FaSignOutAlt /> Logout
//                   </button>
//                   <button
//                     onClick={handleDeleteAccount}
//                     className="w-full flex items-center justify-center gap-2 bg-gray-800 text-red-400 py-2 rounded-lg hover:bg-gray-700 transition"
//                   >
//                     <FaTrash /> Delete Account
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Orders Section */}
//           <div className="md:col-span-2">
//             <div className="bg-gray-900 rounded-xl shadow-lg border border-amber-400/20 p-6">
//               <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
//                 <FaShoppingBag /> My Orders
//               </h3>
              
//               {userOrders.length === 0 ? (
//                 <div className="text-center py-8">
//                   <p className="text-gray-400">No orders yet</p>
//                   <Link 
//                     to="/products" 
//                     className="inline-block mt-4 bg-amber-400 text-black px-6 py-2 rounded-lg hover:bg-amber-500 transition"
//                   >
//                     Start Shopping
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {userOrders.slice(0, 5).map((order, index) => (
//                     <div key={order.id || index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
//                       <div className="flex justify-between items-start mb-3">
//                         <div>
//                           <p className="text-amber-400 font-mono text-sm">
//                             Order #{order.id || order.orderNumber || index + 1}
//                           </p>
//                           <p className="text-gray-400 text-xs">
//                             {new Date(order.created_at || order.order_date || order.date).toLocaleString()}
//                           </p>
//                         </div>
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           (order.order_status === 'pending' || order.status === 'pending') ? 'bg-yellow-100 text-yellow-800' :
//                           (order.order_status === 'completed' || order.status === 'completed') ? 'bg-green-100 text-green-800' :
//                           'bg-green-100 text-green-800'
//                         }`}>
//                           {order.order_status || order.status || 'Delivered'}
//                         </span>
//                       </div>
                      
//                       <div className="space-y-2 mb-3">
//                         {order.items && order.items.slice(0, 2).map((item, idx) => (
//                           <div key={idx} className="flex justify-between text-sm">
//                             <span className="text-gray-300">
//                               {item.product?.name || item.name} x{item.quantity}
//                             </span>
//                             <span className="text-white">
//                               £{(item.quantity * (item.price || 0)).toFixed(2)}
//                             </span>
//                           </div>
//                         ))}
//                         {order.items && order.items.length > 2 && (
//                           <p className="text-gray-500 text-xs">+ {order.items.length - 2} more items</p>
//                         )}
//                       </div>
                      
//                       <div className="flex justify-between items-center pt-2 border-t border-gray-700">
//                         <span className="text-gray-400">Total</span>
//                         <span className="text-amber-400 font-bold">
//                           £{parseFloat(order.total || order.total_amount || 0).toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShoppingBag, FaSignOutAlt, FaTrash, FaCamera, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';
import BASE_URL from '../BASE_URL/BASE_URL';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  // BASE_URL ব্যবহার করে API URL তৈরি করা
  const getApiUrl = (endpoint) => {
    return `${BASE_URL}${endpoint}`;
  };

  const getAuthToken = () => {
    return localStorage.getItem('auth_token');
  };

  // UI Avatar URL (ইমেজ না থাকলে বা লোড না হলে দেখাবে)
  const getUIAvatarUrl = () => {
    const name = user?.name || 'User';
    return `https://ui-avatars.com/api/?background=f59e0b&color=fff&name=${encodeURIComponent(name)}&size=96&rounded=true&bold=true`;
  };

  // Display image URL - always returns a valid URL (either image or avatar)
  const getDisplayImageUrl = () => {
    if (imageLoadFailed) {
      return getUIAvatarUrl();
    }
    
    if (imagePreview) {
      return imagePreview;
    }
    
    if (user?.profile_image) {
      return user.profile_image;
    }
    
    return getUIAvatarUrl();
  };

  const fetchUserProfile = async () => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(getApiUrl('/profile'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      console.log("Profile Response:", response.data);

      if (response.data.success) {
        const userData = response.data.data;
        setUser(userData);
        setEditForm({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || ''
        });
        
        // Check if profile image exists and is accessible
        if (userData.profile_image) {
          // Test if image loads
          const img = new Image();
          img.onload = () => {
            setImagePreview(userData.profile_image);
            setImageLoadFailed(false);
          };
          img.onerror = () => {
            console.log("Profile image not found, using avatar");
            setImageLoadFailed(true);
            setImagePreview(null);
          };
          img.src = userData.profile_image;
        } else {
          setImageLoadFailed(true);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        navigate('/login');
      }
    }
  };

  const fetchUserOrders = async () => {
    try {
      const token = getAuthToken();
      
      if (!token) return;

      const response = await axios.get(getApiUrl('/orders'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      let ordersData = [];
      if (response.data.success && Array.isArray(response.data.data)) {
        ordersData = response.data.data;
      } else if (Array.isArray(response.data)) {
        ordersData = response.data;
      } else if (response.data.orders && Array.isArray(response.data.orders)) {
        ordersData = response.data.orders;
      }
      
      setUserOrders(ordersData);
      
    } catch (error) {
      console.error("Error fetching orders:", error);
      const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      
      if (currentUser && currentUser.email) {
        const userSpecificOrders = allOrders.filter(order => order.userEmail === currentUser.email);
        setUserOrders(userSpecificOrders);
      }
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      const token = getAuthToken();
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      
      if (!token || !isLoggedIn) {
        navigate("/login");
        return;
      }
      
      await fetchUserProfile();
      await fetchUserOrders();
      setLoading(false);
    };
    
    loadAllData();
  }, [navigate]);

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'Image size should be less than 2MB',
          confirmButtonColor: '#d33',
        });
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please select a valid image (JPEG, PNG, GIF, WEBP)',
          confirmButtonColor: '#d33',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(base64String);
        setImagePreview(base64String);
        setImageLoadFailed(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUploading(true);
      const token = getAuthToken();
      
      const updateData = {
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        address: editForm.address
      };

      if (profileImage && profileImage !== user?.profile_image) {
        updateData.image = profileImage;
      }

      const response = await axios.put(getApiUrl('/profile'), updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        const updatedUser = response.data.data;
        setUser(updatedUser);
        
        if (updatedUser.profile_image) {
          // Test if image loads
          const img = new Image();
          img.onload = () => {
            setImagePreview(updatedUser.profile_image);
            setImageLoadFailed(false);
          };
          img.onerror = () => {
            setImageLoadFailed(true);
            setImagePreview(null);
          };
          img.src = updatedUser.profile_image;
        } else {
          setImageLoadFailed(true);
        }
        
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
          const updatedLocalUser = {
            ...currentUser,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            profile_image: updatedUser.profile_image
          };
          localStorage.setItem("currentUser", JSON.stringify(updatedLocalUser));
        }
        
        setIsEditing(false);
        setProfileImage(null);
        
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been successfully updated.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update profile. Please try again.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    const result = await Swal.fire({
      title: 'Delete Profile Image?',
      text: 'Are you sure you want to delete your profile image?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const token = getAuthToken();
        
        const response = await axios.delete(getApiUrl('/profile/image'), {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (response.data.success) {
          setImagePreview(null);
          setImageLoadFailed(true);
          setUser(prev => ({ ...prev, profile_image: null }));
          
          Swal.fire({
            icon: 'success',
            title: 'Image Deleted',
            text: 'Profile image has been removed.',
            timer: 1500,
            showConfirmButton: false
          });
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete profile image.',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

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
      try {
        const token = getAuthToken();
        if (token) {
          await axios.post(getApiUrl('/logout'), {}, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
      
      localStorage.removeItem("auth_token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        timer: 1500,
        showConfirmButton: false
      });
      
      setTimeout(() => navigate("/login"), 1500);
    }
  };

  const handleDeleteAccount = async () => {
    Swal.fire({
      icon: 'info',
      title: 'Coming Soon',
      text: 'Account deletion feature will be available soon.',
      confirmButtonColor: '#f59e0b',
    });
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-400">My Profile</h1>
          <p className="text-gray-400 mt-1">Manage your account and orders</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <div className="md:col-span-1">
            <div className="bg-gray-900 rounded-xl shadow-lg border border-amber-400/20 p-6">
              {/* Profile Image - Always shows either image or avatar */}
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={getDisplayImageUrl()}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover border-2 border-amber-400"
                  />
                  
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-amber-400 rounded-full p-2 cursor-pointer hover:bg-amber-500 transition">
                      <FaCamera className="text-black text-sm" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                {!isEditing ? (
                  <>
                    <h2 className="text-xl font-bold text-white">{user.name}</h2>
                    <p className="text-gray-400 text-sm">Member since {new Date().getFullYear()}</p>
                    {imageLoadFailed && user?.profile_image && (
                      <p className="text-xs text-amber-400 mt-1">Using avatar (image not found)</p>
                    )}
                  </>
                ) : (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="text-center w-full px-3 py-1 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:outline-none"
                    placeholder="Your Name"
                  />
                )}
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mb-4 flex items-center justify-center gap-2 bg-amber-400 text-black py-2 rounded-lg hover:bg-amber-500 transition"
                >
                  <FaEdit /> Edit Profile
                </button>
              )}

              <div className="space-y-3 border-t border-gray-700 pt-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <FaEnvelope className="text-amber-400" />
                  {!isEditing ? (
                    <span>{user.email}</span>
                  ) : (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="flex-1 px-3 py-1 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:outline-none"
                    />
                  )}
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                  <FaPhone className="text-amber-400" />
                  {!isEditing ? (
                    <span>{user.phone || 'Not provided'}</span>
                  ) : (
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleEditChange}
                      className="flex-1 px-3 py-1 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:outline-none"
                      placeholder="Phone Number"
                    />
                  )}
                </div>
                
                <div className="flex items-start gap-3 text-gray-300">
                  <FaMapMarkerAlt className="text-amber-400 mt-1" />
                  {!isEditing ? (
                    <span className="flex-1">{user.address || 'Not provided'}</span>
                  ) : (
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleEditChange}
                      className="flex-1 px-3 py-1 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-amber-400 focus:outline-none"
                      rows="2"
                      placeholder="Your Address"
                    />
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-4 space-y-2">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={uploading}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    <FaSave /> {uploading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setProfileImage(null);
                      setImageLoadFailed(true);
                      setEditForm({
                        name: user.name,
                        email: user.email,
                        phone: user.phone || '',
                        address: user.address || ''
                      });
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    <FaTimes /> Cancel
                  </button>
                  {(imagePreview || user?.profile_image) && (
                    <button
                      onClick={handleDeleteImage}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      <FaTrash /> Remove Image
                    </button>
                  )}
                </div>
              )}

              {!isEditing && (
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
              )}
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
                  {userOrders.slice(0, 5).map((order, index) => (
                    <div key={order.id || index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-amber-400 font-mono text-sm">
                            Order #{order.id || order.orderNumber || index + 1}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {new Date(order.created_at || order.order_date || order.date).toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          (order.order_status === 'pending' || order.status === 'pending') ? 'bg-yellow-100 text-yellow-800' :
                          (order.order_status === 'completed' || order.status === 'completed') ? 'bg-green-100 text-green-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.order_status || order.status || 'Delivered'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        {order.items && order.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-300">
                              {item.product?.name || item.name} x{item.quantity}
                            </span>
                            <span className="text-white">
                              £{(item.quantity * (item.price || 0)).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        {order.items && order.items.length > 2 && (
                          <p className="text-gray-500 text-xs">+ {order.items.length - 2} more items</p>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                        <span className="text-gray-400">Total</span>
                        <span className="text-amber-400 font-bold">
                          £{parseFloat(order.total || order.total_amount || 0).toFixed(2)}
                        </span>
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