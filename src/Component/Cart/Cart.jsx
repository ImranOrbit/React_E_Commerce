// import React, { useState, useEffect } from "react";
// import { FaArrowLeft, FaMapMarkerAlt, FaCreditCard, FaPaypal, FaCheckCircle, FaTrash, FaTimes } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// const Cart = () => {
//   const navigate = useNavigate();
  
//   // Load cart from localStorage
//   const [cartItems, setCartItems] = useState(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });
  
//   const [deliveryInfo, setDeliveryInfo] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [errors, setErrors] = useState({});
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [orderDetails, setOrderDetails] = useState(null);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//     // Dispatch event to update navbar cart count
//     window.dispatchEvent(new Event("cartUpdated"));
//   }, [cartItems]);

//   // Calculations
//   const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const shipping = subtotal > 100 ? 0 : 5.99; // Free shipping over £100
//   const tax = subtotal * 0.05;
//   const total = subtotal + shipping + tax;

//   // Update quantity with SweetAlert notification
//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) return;
//     const updated = cartItems.map(item =>
//       item.id === id ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updated);
    
//     // Show success toast for quantity update
//     Swal.fire({
//       icon: 'success',
//       title: 'Quantity Updated',
//       text: `Quantity changed to ${newQuantity}`,
//       toast: true,
//       position: 'top-end',
//       showConfirmButton: false,
//       timer: 1500,
//       background: '#f0fdf4',
//       iconColor: '#22c55e'
//     });
//   };

//   // Remove item with SweetAlert confirmation
//   const removeItem = async (id, itemName) => {
//     const result = await Swal.fire({
//       title: 'Remove Item?',
//       text: `Are you sure you want to remove "${itemName}" from your cart?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, remove it!',
//       cancelButtonText: 'Cancel'
//     });
    
//     if (result.isConfirmed) {
//       setCartItems(cartItems.filter(item => item.id !== id));
//       Swal.fire({
//         icon: 'success',
//         title: 'Removed!',
//         text: `${itemName} has been removed from your cart.`,
//         toast: true,
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 1500,
//         background: '#f0fdf4',
//         iconColor: '#22c55e'
//       });
//     }
//   };

//   // Handle delivery info change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDeliveryInfo(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
//     if (!deliveryInfo.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!deliveryInfo.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(deliveryInfo.email)) newErrors.email = "Email is invalid";
//     if (!deliveryInfo.phone.trim()) newErrors.phone = "Phone number is required";
//     else if (!/^[\d\s+()-]{10,}$/.test(deliveryInfo.phone)) newErrors.phone = "Phone number is invalid";
//     if (!deliveryInfo.address.trim()) newErrors.address = "Delivery address is required";
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Generate order number
//   const generateOrderNumber = () => {
//     return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
//   };

//   // Place order with SweetAlert
//   const handlePlaceOrder = async () => {
//     if (!validateForm()) {
//       const firstErrorField = document.querySelector(".border-red-500");
//       if (firstErrorField) {
//         firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
      
//       // Show error alert
//       Swal.fire({
//         icon: 'error',
//         title: 'Validation Error',
//         text: 'Please fill in all required fields correctly.',
//         confirmButtonColor: '#1e3a8a',
//       });
//       return;
//     }

//     if (cartItems.length === 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Empty Cart',
//         text: 'Your cart is empty! Please add some items before placing order.',
//         confirmButtonColor: '#1e3a8a',
//       });
//       return;
//     }

//     // Confirm order
//     const result = await Swal.fire({
//       title: 'Confirm Order',
//       text: `Total Amount: £${total.toFixed(2)}`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#1e3a8a',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, Place Order!',
//       cancelButtonText: 'Cancel'
//     });

//     if (result.isConfirmed) {
//       // Create order details
//       const order = {
//         orderNumber: generateOrderNumber(),
//         date: new Date().toLocaleString(),
//         items: [...cartItems],
//         deliveryInfo: { ...deliveryInfo },
//         paymentMethod: paymentMethod,
//         subtotal: subtotal,
//         shipping: shipping,
//         tax: tax,
//         total: total,
//       };

//       setOrderDetails(order);
//       setShowSuccessModal(true);
      
//       // Show loading alert
//       Swal.fire({
//         title: 'Processing Order...',
//         text: 'Please wait while we confirm your order.',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         }
//       });
      
//       // Clear cart after 3 seconds
//       setTimeout(() => {
//         Swal.close();
//         setCartItems([]);
//         setDeliveryInfo({
//           fullName: "",
//           email: "",
//           phone: "",
//           address: "",
//         });
//         setOrderPlaced(true);
        
//         // Show success alert
//         Swal.fire({
//           icon: 'success',
//           title: 'Order Placed Successfully!',
//           html: `Your order number: <strong>${order.orderNumber}</strong><br>Total: £${total.toFixed(2)}`,
//           confirmButtonColor: '#1e3a8a',
//           timer: 3000,
//           timerProgressBar: true
//         });
//       }, 3000);
//     }
//   };

//   // Close success modal
//   const closeSuccessModal = () => {
//     setShowSuccessModal(false);
//     setOrderPlaced(true);
//     Swal.fire({
//       icon: 'success',
//       title: 'Thank You!',
//       text: 'Your order has been confirmed. You will receive an email shortly.',
//       confirmButtonColor: '#1e3a8a',
//     });
//   };

//   // Empty cart state
//   if (cartItems.length === 0 && !orderPlaced) {
//     return (
//       <div className="bg-gray-50 min-h-screen py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-between mb-8">
//             <Link to="/products" className="flex items-center gap-2 text-black hover:text-gray-700 transition">
//               <FaArrowLeft /> <span className="text-black font-medium">Back to Products</span>
//             </Link>
//             <h1 className="text-3xl font-bold text-black">Your Cart</h1>
//             <div></div>
//           </div>
//           <div className="bg-white rounded-xl shadow p-12 text-center">
//             <div className="text-6xl mb-4">🛒</div>
//             <h2 className="text-2xl font-bold text-black mb-4">Your cart is empty</h2>
//             <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
//             <Link 
//               to="/products" 
//               className="inline-block bg-blue-950 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <Link to="/products" className="flex items-center gap-2 text-black hover:text-gray-700 transition">
//             <FaArrowLeft /> <span className="text-black font-medium">Back to Products</span>
//           </Link>
//           <h1 className="text-3xl font-bold text-black">Checkout</h1>
//           <div className="text-sm text-gray-600">{cartItems.length} {cartItems.length === 1 ? "item" : "items"}</div>
//         </div>

//         {/* Order Success Message */}
//         {orderPlaced && (
//           <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
//             <FaCheckCircle className="text-green-600" />
//             <span>Thank you for your order! Your items will be delivered soon.</span>
//             <button
//               onClick={() => navigate("/products")}
//               className="ml-auto bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         )}

//         {!orderPlaced && (
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* LEFT - Delivery & Payment */}
//             <div className="lg:w-2/3 space-y-6">
//               {/* Delivery Information */}
//               <div className="bg-white p-6 rounded-xl shadow">
//                 <h2 className="font-bold text-xl mb-4 flex gap-2 text-black">
//                   <FaMapMarkerAlt className="mt-1" /> Delivery Information
//                 </h2>
//                 <div className="space-y-3">
//                   <div>
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={deliveryInfo.fullName}
//                       onChange={handleInputChange}
//                       placeholder="Full Name"
//                       className={`w-full border p-3 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-950 ${
//                         errors.fullName ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//                   </div>
                  
//                   <div>
//                     <input
//                       type="email"
//                       name="email"
//                       value={deliveryInfo.email}
//                       onChange={handleInputChange}
//                       placeholder="Email Address"
//                       className={`w-full border p-3 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-950 ${
//                         errors.email ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                   </div>
                  
//                   <div>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={deliveryInfo.phone}
//                       onChange={handleInputChange}
//                       placeholder="Phone Number"
//                       className={`w-full border p-3 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-950 ${
//                         errors.phone ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//                   </div>
                  
//                   <div>
//                     <textarea
//                       name="address"
//                       value={deliveryInfo.address}
//                       onChange={handleInputChange}
//                       placeholder="Delivery Address"
//                       rows="3"
//                       className={`w-full border p-3 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-950 ${
//                         errors.address ? "border-red-500" : "border-gray-300"
//                       }`}
//                     ></textarea>
//                     {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//                   </div>
//                 </div>
//               </div>

//               {/* Payment Method */}
//               <div className="bg-white p-6 rounded-xl shadow">
//                 <h2 className="font-bold text-xl mb-4 flex gap-2 text-black">
//                   <FaCreditCard className="mt-1" /> Payment Method
//                 </h2>
//                 <label className={`flex gap-3 items-center text-black cursor-pointer p-3 border rounded-lg transition ${
//                   paymentMethod === "card" ? "border-blue-950 bg-blue-50" : "border-gray-300 hover:bg-gray-50"
//                 }`}>
//                   <input 
//                     type="radio" 
//                     name="payment"
//                     value="card"
//                     checked={paymentMethod === "card"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="w-4 h-4" 
//                   /> 
//                   <FaCreditCard className="text-blue-600" /> Credit/Debit Card
//                 </label>
                
//                 <label className={`flex gap-3 items-center text-black cursor-pointer p-3 border rounded-lg transition mt-2 ${
//                   paymentMethod === "paypal" ? "border-blue-950 bg-blue-50" : "border-gray-300 hover:bg-gray-50"
//                 }`}>
//                   <input 
//                     type="radio" 
//                     name="payment"
//                     value="paypal"
//                     checked={paymentMethod === "paypal"}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="w-4 h-4" 
//                   /> 
//                   <FaPaypal className="text-blue-500" /> PayPal
//                 </label>
//               </div>
//             </div>

//             {/* RIGHT - Order Summary */}
//             <div className="lg:w-1/3">
//               <div className="bg-white rounded-xl shadow p-6 sticky top-8">
//                 <h2 className="font-bold text-xl mb-4 text-black">Order Summary</h2>

//                 <div className="bg-gray-50 rounded-xl overflow-hidden mb-4 max-h-96 overflow-y-auto">
//                   {cartItems.map((item) => (
//                     <div key={item.id} className="grid grid-cols-4 items-center px-4 py-4 border-b border-gray-200 bg-white">
//                       <div className="flex gap-2 items-center">
//                         <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
//                         <p className="text-sm text-black font-medium line-clamp-2">{item.name}</p>
//                       </div>
//                       <p className="text-center text-black font-medium">£{item.price.toFixed(2)}</p>
//                       <div className="flex justify-center gap-2 items-center">
//                         <button 
//                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                           className="w-7 h-7 rounded bg-gray-100 text-black hover:bg-gray-200 font-bold transition"
//                         >
//                           -
//                         </button>
//                         <span className="text-black font-semibold min-w-[30px] text-center">{item.quantity}</span>
//                         <button 
//                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           className="w-7 h-7 rounded bg-gray-100 text-black hover:bg-gray-200 font-bold transition"
//                         >
//                           +
//                         </button>
//                       </div>
//                       <div className="flex justify-end gap-2 items-center">
//                         <span className="text-black font-semibold">£{(item.price * item.quantity).toFixed(2)}</span>
//                         <button 
//                           onClick={() => removeItem(item.id, item.name)}
//                           className="text-red-500 hover:text-red-700 transition ml-2"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Totals */}
//                 <div className="space-y-2 mb-4">
//                   <div className="flex justify-between text-black">
//                     <span>Subtotal</span>
//                     <span>£{subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-black">
//                     <span>Shipping</span>
//                     <span>{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</span>
//                   </div>
//                   {subtotal > 0 && subtotal < 100 && (
//                     <div className="text-xs text-green-600">
//                       ✨ Add £{(100 - subtotal).toFixed(2)} more for free shipping!
//                     </div>
//                   )}
//                   <div className="flex justify-between text-black">
//                     <span>Tax (5%)</span>
//                     <span>£{tax.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
//                     <span>Total</span>
//                     <span className="text-blue-950">£{total.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <button 
//                   onClick={handlePlaceOrder}
//                   disabled={cartItems.length === 0}
//                   className={`w-full py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2 ${
//                     cartItems.length === 0
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-blue-950 text-white hover:bg-blue-800"
//                   }`}
//                 >
//                   <FaCheckCircle /> Place Order
//                 </button>

//                 <p className="text-xs text-gray-500 text-center mt-4">
//                   🔒 Secure checkout. Your information is protected.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Success Modal */}
//       {showSuccessModal && orderDetails && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                   <FaCheckCircle className="text-green-500 text-2xl" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-black">Order Confirmed!</h2>
//                   <p className="text-gray-600 text-sm">Thank you for your purchase</p>
//                 </div>
//               </div>
//               <button
//                 onClick={closeSuccessModal}
//                 className="text-gray-400 hover:text-gray-600 transition"
//               >
//                 <FaTimes size={24} />
//               </button>
//             </div>

//             <div className="p-6">
//               {/* Order Info */}
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-600">Order Number:</span>
//                   <span className="font-mono font-bold text-black">{orderDetails.orderNumber}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Date:</span>
//                   <span className="text-black">{orderDetails.date}</span>
//                 </div>
//               </div>

//               {/* Order Items */}
//               <h3 className="font-bold text-lg mb-3 text-black">Order Items</h3>
//               <div className="space-y-3 mb-6">
//                 {orderDetails.items.map((item, idx) => (
//                   <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
//                     <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
//                     <div className="flex-1">
//                       <p className="font-semibold text-black">{item.name}</p>
//                       <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
//                     </div>
//                     <p className="font-bold text-black">£{(item.price * item.quantity).toFixed(2)}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Delivery Info */}
//               <h3 className="font-bold text-lg mb-3 text-black">Delivery Information</h3>
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <p className="text-black"><span className="font-semibold">Name:</span> {orderDetails.deliveryInfo.fullName}</p>
//                 <p className="text-black"><span className="font-semibold">Email:</span> {orderDetails.deliveryInfo.email}</p>
//                 <p className="text-black"><span className="font-semibold">Phone:</span> {orderDetails.deliveryInfo.phone}</p>
//                 <p className="text-black"><span className="font-semibold">Address:</span> {orderDetails.deliveryInfo.address}</p>
//               </div>

//               {/* Payment Summary */}
//               <h3 className="font-bold text-lg mb-3 text-black">Payment Summary</h3>
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <div className="flex justify-between mb-2">
//                   <span>Payment Method:</span>
//                   <span className="font-semibold capitalize">{orderDetails.paymentMethod}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Subtotal:</span>
//                   <span>£{orderDetails.subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Shipping:</span>
//                   <span>{orderDetails.shipping === 0 ? "Free" : `£${orderDetails.shipping.toFixed(2)}`}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Tax:</span>
//                   <span>£{orderDetails.tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between pt-2 border-t font-bold text-lg">
//                   <span>Total Paid:</span>
//                   <span className="text-green-600">£{orderDetails.total.toFixed(2)}</span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={closeSuccessModal}
//                   className="flex-1 bg-blue-950 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
//                 >
//                   Continue Shopping
//                 </button>
//                 <button
//                   onClick={() => window.print()}
//                   className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//                 >
//                   Print Receipt
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaMapMarkerAlt, FaCreditCard, FaPaypal, FaCheckCircle, FaTrash, FaTimes, FaPhone, FaEnvelope, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const getApiUrl = (endpoint) => {
    const baseUrl = window.location.hostname === 'localhost'
      ? '/api'
      : 'https://e-commerce-next.orbitmediasolutions.com/api';
    return `${baseUrl}${endpoint}`;
  };

  const getAuthToken = () => {
    return localStorage.getItem('auth_token');
  };

  useEffect(() => {
    const loadUserData = async () => {
      const token = getAuthToken();
      const savedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
      
      if (token && savedUser) {
        // Try to fetch fresh user data from API
        try {
          const response = await axios.get(getApiUrl('/profile'), {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.data.success) {
            setUser({
              name: response.data.data.name || "",
              email: response.data.data.email || "",
              phone: response.data.data.phone || "",
              address: response.data.data.address || "",
            });
            return;
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      
      // Fallback to localStorage
      setUser({
        name: savedUser.name || "",
        email: savedUser.email || "",
        phone: savedUser.phone || "",
        address: savedUser.address || "",
      });
    };
    
    loadUserData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cartItems]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 5.99;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const getImageUrl = (image, itemId) => {
    if (imageErrors[itemId]) {
      return "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop";
    }
    
    let imageUrl = image;
    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
      const baseUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:8000' 
        : 'https://e-commerce-next.orbitmediasolutions.com';
      
      if (imageUrl.startsWith('/')) {
        imageUrl = `${baseUrl}${imageUrl}`;
      } else if (imageUrl.includes('storage')) {
        imageUrl = `${baseUrl}/${imageUrl}`;
      } else {
        imageUrl = `${baseUrl}/storage/${imageUrl}`;
      }
    }
    return imageUrl;
  };

  const handleImageError = (itemId) => {
    if (!imageErrors[itemId]) {
      setImageErrors(prev => ({ ...prev, [itemId]: true }));
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updated);
  };

  const removeItem = async (id, itemName) => {
    const result = await Swal.fire({
      title: 'Remove Item?',
      text: `Are you sure you want to remove "${itemName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    });
    
    if (result.isConfirmed) {
      setCartItems(cartItems.filter(item => item.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Removed!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.name?.trim()) newErrors.name = "Full name is required";
    if (!user.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = "Email is invalid";
    if (!user.phone?.trim()) newErrors.phone = "Phone number is required";
    if (!user.address?.trim()) newErrors.address = "Delivery address is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveOrderToLocalStorage = (order) => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.unshift(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    console.log("Order saved to localStorage:", order);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields correctly.',
      });
      return;
    }

    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Empty Cart',
        text: 'Your cart is empty!',
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Confirm Order',
      html: `Total Amount: <strong>£${total.toFixed(2)}</strong><br/>Payment Method: ${paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal'}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1e3a8a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Place Order!',
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    
    Swal.fire({
      title: 'Processing Order...',
      text: 'Please wait while we confirm your order.',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    // Prepare order data
    const orderData = {
      items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: total,
      shipping_address: user.address,
      phone: user.phone,
      payment_method: paymentMethod,
      customer_name: user.name,
      customer_email: user.email,
    };

    console.log("Sending order data:", orderData);

    const token = getAuthToken();

    try {
      const response = await axios.post(getApiUrl('/orders'), orderData, {
        headers: token ? { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } : { 
          'Content-Type': 'application/json'
        },
        timeout: 30000,
      });

      console.log("Order API Response:", response.data);

      if (response.data.success) {
        // Create order object
        const newOrder = {
          id: response.data.order_id,
          orderNumber: `ORD-${response.data.order_id}`,
          created_at: new Date().toISOString(),
          date: new Date().toLocaleString(),
          items: cartItems.map(item => ({
            ...item,
            product: { name: item.name }
          })),
          total: total,
          total_amount: total,
          shipping_address: user.address,
          phone: user.phone,
          payment_method: paymentMethod,
          order_status: 'pending',
          status: 'pending',
          customer_name: user.name,
          customer_email: user.email,
        };

        // Save to localStorage
        saveOrderToLocalStorage(newOrder);
        setOrderDetails(newOrder);
        
        // Clear cart
        localStorage.removeItem("cart");
        setCartItems([]);
        
        Swal.close();
        setShowSuccessModal(true);
        
        Swal.fire({
          icon: 'success',
          title: 'Order Placed Successfully!',
          html: `Order ID: <strong>${newOrder.orderNumber}</strong><br/>Total: £${total.toFixed(2)}`,
          confirmButtonColor: '#1e3a8a',
          timer: 2000,
        });
      } else {
        throw new Error(response.data.message || "Order failed");
      }
      
    } catch (error) {
      console.error("Order error:", error);
      
      // Even if API fails, save order locally
      const fallbackOrder = {
        id: Date.now(),
        orderNumber: `ORD-${Date.now()}`,
        created_at: new Date().toISOString(),
        date: new Date().toLocaleString(),
        items: cartItems.map(item => ({
          ...item,
          product: { name: item.name }
        })),
        total: total,
        total_amount: total,
        shipping_address: user.address,
        phone: user.phone,
        payment_method: paymentMethod,
        order_status: 'pending',
        status: 'pending',
        customer_name: user.name,
        customer_email: user.email,
      };
      
      saveOrderToLocalStorage(fallbackOrder);
      setOrderDetails(fallbackOrder);
      
      localStorage.removeItem("cart");
      setCartItems([]);
      
      Swal.close();
      setShowSuccessModal(true);
      
      Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        html: `Order ID: <strong>${fallbackOrder.orderNumber}</strong><br/>Total: £${total.toFixed(2)}<br/><span class="text-sm">(Saved locally)</span>`,
        confirmButtonColor: '#1e3a8a',
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setOrderPlaced(true);
    navigate("/orders");
  };

  if (cartItems.length === 0 && !orderPlaced && !showSuccessModal) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to="/products" className="flex items-center gap-2 text-black hover:text-gray-700 transition">
              <FaArrowLeft /> <span className="text-black font-medium">Back to Products</span>
            </Link>
            <h1 className="text-3xl font-bold text-black">Your Cart</h1>
            <div></div>
          </div>
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-black mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="inline-block bg-blue-950 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/products" className="flex items-center gap-2 text-black hover:text-gray-700 transition">
            <FaArrowLeft /> <span className="text-black font-medium">Back to Products</span>
          </Link>
          <h1 className="text-3xl font-bold text-black">Checkout</h1>
          <div className="text-sm text-gray-600">{cartItems.length} {cartItems.length === 1 ? "item" : "items"}</div>
        </div>

        {!orderPlaced && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
              {/* Delivery Information */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-bold text-xl mb-4 flex gap-2 text-black">
                  <FaMapMarkerAlt className="mt-1 text-black" /> 
                  <span className="text-black">Delivery Information</span>
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className={`w-full pl-10 border p-3 rounded text-black ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-950`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className={`w-full pl-10 border p-3 rounded text-black ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-950`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className={`w-full pl-10 border p-3 rounded text-black ${errors.phone ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-950`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <textarea
                      name="address"
                      value={user.address}
                      onChange={handleInputChange}
                      placeholder="Delivery Address"
                      rows="3"
                      className={`w-full border p-3 rounded text-black ${errors.address ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-950`}
                    ></textarea>
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="font-bold text-xl mb-4 flex gap-2 text-black">
                  <FaCreditCard className="mt-1 text-black" /> 
                  <span className="text-black">Payment Method</span>
                </h2>
                
                
                <label className={`flex gap-3 items-center text-black cursor-pointer p-3 border rounded-lg transition mt-2 ${paymentMethod === "card" ? "border-blue-950 bg-blue-50" : "border-gray-300"}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4" /> 
                  <FaCreditCard className="text-blue-600 text-xl" /> 
                  <span className="font-medium">Credit/Debit Card</span>
                </label>
                
                <label className={`flex gap-3 items-center text-black cursor-pointer p-3 border rounded-lg transition mt-2 ${paymentMethod === "paypal" ? "border-blue-950 bg-blue-50" : "border-gray-300"}`}>
                  <input type="radio" name="payment" value="paypal" checked={paymentMethod === "paypal"} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4" /> 
                  <FaPaypal className="text-blue-500 text-xl" /> 
                  <span className="font-medium">PayPal</span>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow p-6 sticky top-8">
                <h2 className="font-bold text-xl mb-4 text-black">Order Summary</h2>

                <div className="bg-gray-50 rounded-xl overflow-hidden mb-4 max-h-96 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-4 items-center px-4 py-4 border-b border-gray-200 bg-white">
                      <div className="flex gap-2 items-center">
                        <img src={getImageUrl(item.image, item.id)} alt={item.name} className="w-12 h-12 rounded object-cover" onError={() => handleImageError(item.id)} />
                        <p className="text-sm text-black font-medium line-clamp-2">{item.name}</p>
                      </div>
                      <p className="text-center text-black font-medium">£{item.price.toFixed(2)}</p>
                      <div className="flex justify-center gap-2 items-center">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded bg-gray-100 text-black hover:bg-gray-200 font-bold">-</button>
                        <span className="text-black font-semibold min-w-[30px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded bg-gray-100 text-black hover:bg-gray-200 font-bold">+</button>
                      </div>
                      <div className="flex justify-end gap-2 items-center">
                        <span className="text-black font-semibold">£{(item.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeItem(item.id, item.name)} className="text-red-500 hover:text-red-700 transition ml-2"><FaTrash /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-black"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-black"><span>Shipping</span><span>{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</span></div>
                  <div className="flex justify-between text-black"><span>Tax (5%)</span><span>£{tax.toFixed(2)}</span></div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-blue-950 font-bold">£{total.toFixed(2)}</span>
                  </div>
                </div>

                <button onClick={handlePlaceOrder} disabled={cartItems.length === 0 || loading} className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${cartItems.length === 0 || loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-950 text-white hover:bg-blue-800"}`}>
                  {loading ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Processing...</> : <><FaCheckCircle /> Place Order</>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSuccessModal && orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-green-500 text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">Order Confirmed!</h2>
                  <p className="text-gray-600 text-sm">Thank you for your purchase</p>
                </div>
              </div>
              <button onClick={closeSuccessModal} className="text-gray-400 hover:text-gray-600 transition"><FaTimes size={24} /></button>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-mono font-bold text-black">{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-black">{orderDetails.date}</span>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-3 text-black">Order Items</h3>
              <div className="space-y-3 mb-6">
                {orderDetails.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                    <img src={getImageUrl(item.image, item.id)} alt={item.name} className="w-16 h-16 rounded object-cover" onError={() => handleImageError(item.id)} />
                    <div className="flex-1">
                      <p className="font-semibold text-black">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-black">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-lg mb-3 text-black">Delivery Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-black"><span className="font-semibold">Name:</span> {orderDetails.customer_name}</p>
                <p className="text-black"><span className="font-semibold">Email:</span> {orderDetails.customer_email}</p>
                <p className="text-black"><span className="font-semibold">Phone:</span> {orderDetails.phone}</p>
                <p className="text-black"><span className="font-semibold">Address:</span> {orderDetails.shipping_address}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={closeSuccessModal} className="flex-1 bg-blue-950 text-white py-3 rounded-lg hover:bg-blue-800 transition font-semibold">View My Orders</button>
                <button onClick={() => window.print()} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Print Receipt</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;