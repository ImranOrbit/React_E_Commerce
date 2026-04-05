// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingBag, FaArrowLeft, FaCalendar, FaCreditCard, FaMapMarkerAlt, FaPhone, FaSync, FaUser, FaEnvelope } from "react-icons/fa";
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const OrdersPage = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null);
//   const [imageErrors, setImageErrors] = useState({});
//   const [syncing, setSyncing] = useState(false);
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 5;

//   const getApiUrl = (endpoint) => {
//     const baseUrl = window.location.hostname === 'localhost'
//       ? '/api'
//       : 'https://e-commerce-next.orbitmediasolutions.com/api';
//     return `${baseUrl}${endpoint}`;
//   };

//   const getAuthToken = () => {
//     return localStorage.getItem('token') || localStorage.getItem('auth_token');
//   };

//   const getImageUrl = (image, itemId) => {
//     if (imageErrors[itemId]) {
//       return "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop";
//     }
    
//     if (!image) return "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop";
    
//     let imageUrl = image;
//     if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
//       const baseUrl = window.location.hostname === 'localhost' 
//         ? 'http://localhost:8000' 
//         : 'https://e-commerce-next.orbitmediasolutions.com';
      
//       if (imageUrl.startsWith('/')) {
//         imageUrl = `${baseUrl}${imageUrl}`;
//       } else if (imageUrl.includes('storage')) {
//         imageUrl = `${baseUrl}/${imageUrl}`;
//       } else {
//         imageUrl = `${baseUrl}/storage/${imageUrl}`;
//       }
//     }
//     return imageUrl;
//   };

//   const handleImageError = (itemId) => {
//     if (!imageErrors[itemId]) {
//       setImageErrors(prev => ({ ...prev, [itemId]: true }));
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   const loadOrders = async () => {
//     try {
//       setLoading(true);
      
//       const token = getAuthToken();
//       const savedUser = JSON.parse(localStorage.getItem("currentUser")) || JSON.parse(localStorage.getItem("user"));
      
//       if (savedUser) {
//         setUser(savedUser);
//       }
      
//       let allOrders = [];
      
//       // First, load orders from localStorage (offline backup)
//       const localOrders = JSON.parse(localStorage.getItem("user_orders")) || [];
//       console.log("Local orders found:", localOrders.length);
      
//       if (localOrders.length > 0) {
//         allOrders = [...localOrders];
//       }
      
//       // Try to fetch from API if token exists
//       if (token) {
//         console.log("Fetching orders from API...");
        
//         try {
//           const response = await axios.get(getApiUrl('/orders'), {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Accept': 'application/json'
//             },
//             timeout: 10000
//           });

//           console.log("API Response:", response.data);
          
//           // Handle different response formats
//           let apiOrders = [];
          
//           if (response.data.success && Array.isArray(response.data.data)) {
//             apiOrders = response.data.data;
//           } else if (response.data.data && Array.isArray(response.data.data)) {
//             apiOrders = response.data.data;
//           } else if (Array.isArray(response.data)) {
//             apiOrders = response.data;
//           } else if (response.data.orders && Array.isArray(response.data.orders)) {
//             apiOrders = response.data.orders;
//           }
          
//           console.log("API orders found:", apiOrders.length);
          
//           // Transform API orders to match our frontend format
//           const transformedOrders = apiOrders.map(order => ({
//             id: order.id,
//             order_id: order.id,
//             customer_name: order.customer_name || order.user?.name || savedUser?.name || "Guest",
//             customer_email: order.customer_email || savedUser?.email || "",
//             total_amount: order.total || order.total_amount || 0,
//             total: order.total || order.total_amount || 0,
//             shipping_address: order.shipping_address || "",
//             phone: order.phone || "",
//             payment_method: order.payment_method || "card",
//             order_status: order.order_status || order.status || "pending",
//             status: order.status || order.order_status || "pending",
//             created_at: order.created_at,
//             items: (order.items || []).map(item => ({
//               id: item.id,
//               product_id: item.product_id,
//               product_name: item.product?.name || item.name || "Product",
//               name: item.product?.name || item.name || "Product",
//               quantity: item.quantity,
//               price: item.price,
//               image: item.product?.image || item.image,
//               total_price: item.quantity * item.price
//             }))
//           }));
          
//           // Merge with local orders (avoid duplicates)
//           const existingIds = new Set(allOrders.map(o => o.id));
//           for (const apiOrder of transformedOrders) {
//             if (!existingIds.has(apiOrder.id)) {
//               allOrders.push(apiOrder);
//             }
//           }
//         } catch (apiError) {
//           console.error("API fetch error:", apiError);
//           // Don't set global error, just show toast
//           if (apiError.response?.status === 500) {
//             Swal.fire({
//               icon: 'warning',
//               title: 'Server Error',
//               text: 'Unable to fetch orders from server. Showing local orders only.',
//               toast: true,
//               position: 'top-end',
//               showConfirmButton: false,
//               timer: 3000
//             });
//           }
//         }
//       }
      
//       // Sort orders by date (newest first)
//       allOrders.sort((a, b) => {
//         const dateA = new Date(a.created_at || a.date || a.order_date);
//         const dateB = new Date(b.created_at || b.date || b.order_date);
//         return dateB - dateA;
//       });
      
//       console.log("Total orders to display:", allOrders.length);
//       setOrders(allOrders);
      
//       if (allOrders.length === 0 && !token) {
//         setError("Please login to view your orders");
//       } else if (allOrders.length === 0) {
//         setError("No orders found");
//       } else {
//         setError(null);
//       }
      
//     } catch (err) {
//       console.error("Error loading orders:", err);
//       setError("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save order to localStorage (for offline/backup)
//   const saveOrderToLocal = (orderData) => {
//     const existingOrders = JSON.parse(localStorage.getItem("user_orders")) || [];
//     const newOrder = {
//       id: Date.now(),
//       ...orderData,
//       created_at: new Date().toISOString(),
//       is_local: true
//     };
//     existingOrders.unshift(newOrder);
//     localStorage.setItem("user_orders", JSON.stringify(existingOrders));
//     return newOrder;
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending": return "bg-yellow-100 text-yellow-800";
//       case "processing": return "bg-blue-100 text-blue-800";
//       case "completed": 
//       case "delivered": return "bg-green-100 text-green-800";
//       case "cancelled": return "bg-red-100 text-red-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending": return "⏳";
//       case "processing": return "⚙️";
//       case "completed": 
//       case "delivered": return "✅";
//       case "cancelled": return "❌";
//       default: return "📦";
//     }
//   };

//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const totalPages = Math.ceil(orders.length / ordersPerPage);

//   const goToPage = (pageNumber) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return;
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   if (loading) {
//     return (
//       <div className="bg-gray-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your orders...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8">
//           <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-950 transition mb-4">
//             <FaArrowLeft className="text-sm" />
//             <span>Back to Products</span>
//           </Link>
          
//           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Orders</h1>
//               {user && <p className="text-gray-600 mt-1">Welcome back, {user.name || user.customer_name || "Customer"}!</p>}
//             </div>
//             <div className="text-left md:text-right">
//               <p className="text-sm text-gray-500">Total Orders</p>
//               <p className="text-2xl font-bold text-blue-950">{orders.length}</p>
//             </div>
//           </div>
//         </div>

//         {error && orders.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-md p-12 text-center">
//             <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
//             <p className="text-gray-600 mb-6">{error.includes("login") ? "Please login to view your orders" : "You haven't placed any orders yet. Start shopping now!"}</p>
//             <Link to={error.includes("login") ? "/login" : "/products"}>
//               <button className="bg-blue-950 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition">
//                 {error.includes("login") ? "Login Now" : "Start Shopping"}
//               </button>
//             </Link>
//           </div>
//         ) : orders.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-md p-12 text-center">
//             <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
//             <p className="text-gray-600 mb-6">You haven't placed any orders. Start shopping to see your orders here!</p>
//             <Link to="/products">
//               <button className="bg-blue-950 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition">
//                 Browse Products
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <>
//             <div className="space-y-6">
//               {currentOrders.map((order) => (
//                 <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
//                   <div className="bg-gradient-to-r from-gray-50 to-white p-5 border-b">
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-3 flex-wrap">
//                           <span className="text-sm font-semibold text-gray-500">
//                             Order #{order.id || order.order_id}
//                           </span>
//                           {order.is_local && (
//                             <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
//                               Saved Locally
//                             </span>
//                           )}
//                           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.order_status || order.status)}`}>
//                             {getStatusIcon(order.order_status || order.status)} {order.order_status || order.status || "Pending"}
//                           </span>
//                         </div>
//                         <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-1">
//                             <FaCalendar className="text-xs" />
//                             <span>
//                               {new Date(order.created_at || order.date || order.order_date).toLocaleDateString("en-US", {
//                                 year: "numeric",
//                                 month: "long",
//                                 day: "numeric",
//                               })}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <FaCreditCard className="text-xs" />
//                             <span className="capitalize">
//                               {order.payment_method === 'card' ? 'Credit/Debit Card' : 
//                                order.payment_method === 'paypal' ? 'PayPal' : 
//                                order.payment_method === 'cod' ? 'Cash on Delivery' : 
//                                order.payment_method || "Card"}
//                             </span>
//                           </div>
//                           {order.customer_name && (
//                             <div className="flex items-center gap-1">
//                               <FaUser className="text-xs" />
//                               <span>{order.customer_name}</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-sm text-gray-500">Total Amount</p>
//                         <p className="text-2xl font-bold text-blue-950">
//                           £{parseFloat(order.total_amount || order.total || 0).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-5">
//                     {(order.items || order.order_items) && (order.items || order.order_items).length > 0 ? (
//                       <div className="space-y-3">
//                         <h4 className="font-semibold text-gray-700 mb-3">Items</h4>
//                         {(order.items || order.order_items).slice(0, 3).map((item, idx) => (
//                           <div key={item.id || idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b last:border-0">
//                             <div className="flex items-center gap-3 flex-1">
//                               <img 
//                                 src={getImageUrl(item.product?.image || item.image, item.product?.id || idx)} 
//                                 alt={item.product?.name || item.name || item.product_name}
//                                 className="w-12 h-12 rounded object-cover"
//                                 onError={() => handleImageError(item.product?.id || idx)}
//                               />
//                               <div>
//                                 <p className="font-medium text-gray-800">
//                                   {item.product?.name || item.name || item.product_name || "Product"}
//                                 </p>
//                                 <p className="text-sm text-gray-500">
//                                   Qty: {item.quantity}
//                                 </p>
//                                 <p className="text-xs text-gray-400">
//                                   £{parseFloat(item.price || 0).toFixed(2)} each
//                                 </p>
//                               </div>
//                             </div>
//                             <div className="text-right mt-2 sm:mt-0">
//                               <p className="font-semibold text-gray-800">
//                                 £{(item.quantity * (item.price || 0)).toFixed(2)}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                         {(order.items || order.order_items).length > 3 && (
//                           <p className="text-sm text-blue-950 mt-2">+ {(order.items || order.order_items).length - 3} more item(s)</p>
//                         )}
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 text-center py-4">No items found for this order</p>
//                     )}
                    
//                     {(order.shipping_address || order.address) && (
//                       <div className="mt-4 pt-3 border-t border-gray-100">
//                         <div className="flex items-start gap-2 text-sm">
//                           <FaMapMarkerAlt className="text-gray-400 mt-0.5" />
//                           <div>
//                             <p className="font-medium text-gray-700">Shipping Address</p>
//                             <p className="text-gray-600">{order.shipping_address || order.address}</p>
//                             {order.phone && (
//                               <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
//                                 <FaPhone className="text-xs" /> {order.phone}
//                               </p>
//                             )}
//                             {order.customer_email && (
//                               <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
//                                 <FaEnvelope className="text-xs" /> {order.customer_email}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {totalPages > 1 && (
//               <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
//                 <button 
//                   onClick={() => goToPage(currentPage - 1)} 
//                   disabled={currentPage === 1} 
//                   className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
//                 >
//                   Previous
//                 </button>
//                 <div className="flex gap-2 flex-wrap">
//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) pageNum = i + 1;
//                     else if (currentPage <= 3) pageNum = i + 1;
//                     else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
//                     else pageNum = currentPage - 2 + i;
//                     return (
//                       <button 
//                         key={pageNum} 
//                         onClick={() => goToPage(pageNum)} 
//                         className={`w-10 h-10 rounded-lg transition ${currentPage === pageNum ? "bg-blue-950 text-white" : "border hover:bg-gray-100"}`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                 </div>
//                 <button 
//                   onClick={() => goToPage(currentPage + 1)} 
//                   disabled={currentPage === totalPages} 
//                   className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;




import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaArrowLeft, FaCalendar, FaCreditCard, FaMapMarkerAlt, FaPhone, FaUser, FaEnvelope } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const getApiUrl = (endpoint) => {
    const baseUrl = window.location.hostname === 'localhost'
      ? '/api'
      : 'https://e-commerce-next.orbitmediasolutions.com/api';
    return `${baseUrl}${endpoint}`;
  };

  const getAuthToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('auth_token');
  };

  const getImageUrl = (image, itemId) => {
    if (imageErrors[itemId]) {
      return "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop";
    }
    
    if (!image) return "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop";
    
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

  useEffect(() => {
    loadOrders();
    
    // Listen for login changes
    const handleLoginChange = () => {
      loadOrders();
    };
    
    window.addEventListener("storage", handleLoginChange);
    window.addEventListener("loginSuccess", handleLoginChange);
    
    return () => {
      window.removeEventListener("storage", handleLoginChange);
      window.removeEventListener("loginSuccess", handleLoginChange);
    };
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      
      const token = getAuthToken();
      const loggedIn = !!(token && localStorage.getItem("isLoggedIn") === "true");
      setIsLoggedIn(loggedIn);
      
      const savedUser = JSON.parse(localStorage.getItem("currentUser")) || JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setUser(savedUser);
      }
      
      let allOrders = [];
      
      // 1. Load orders from localStorage - Check BOTH keys
      // Key 1: "orders" (used by Cart.jsx)
      const ordersFromCart = JSON.parse(localStorage.getItem("orders")) || [];
      console.log("Orders from 'orders' key:", ordersFromCart.length);
      
      // Key 2: "user_orders" (backward compatibility)
      const userOrders = JSON.parse(localStorage.getItem("user_orders")) || [];
      console.log("Orders from 'user_orders' key:", userOrders.length);
      
      // Key 3: Guest specific orders
      let guestOrders = [];
      const guestId = localStorage.getItem("guest_id");
      if (guestId) {
        guestOrders = JSON.parse(localStorage.getItem(`guest_orders_${guestId}`)) || [];
        console.log("Guest orders:", guestOrders.length);
      }
      
      // Merge all local orders
      const allLocalOrders = [...ordersFromCart, ...userOrders, ...guestOrders];
      
      // Remove duplicates by id
      const uniqueLocalOrders = [];
      const seenIds = new Set();
      for (const order of allLocalOrders) {
        if (!seenIds.has(order.id) && !seenIds.has(order.orderNumber)) {
          uniqueLocalOrders.push(order);
          seenIds.add(order.id);
          seenIds.add(order.orderNumber);
        }
      }
      
      console.log("Unique local orders:", uniqueLocalOrders.length);
      
      // Format local orders
      const formattedLocalOrders = uniqueLocalOrders.map(order => ({
        ...order,
        id: order.id || order.order_id || Date.now(),
        order_id: order.order_id || order.id,
        orderNumber: order.orderNumber || `ORD-${order.id}`,
        customer_name: order.customer_name || order.name || "Guest User",
        customer_email: order.customer_email || order.email || "",
        total_amount: order.total_amount || order.total || 0,
        total: order.total || order.total_amount || 0,
        shipping_address: order.shipping_address || order.address || "",
        phone: order.phone || "",
        payment_method: order.payment_method || "cod",
        order_status: order.order_status || order.status || "pending",
        created_at: order.created_at || order.date || new Date().toISOString(),
        items: order.items || [],
        is_local_order: true
      }));
      
      allOrders = [...formattedLocalOrders];
      
      // 2. If logged in, fetch orders from API
      if (loggedIn && token) {
        console.log("Fetching orders from API...");
        
        try {
          const response = await axios.get(getApiUrl('/orders'), {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            },
            timeout: 10000
          });

          console.log("API Response:", response.data);
          
          let apiOrders = [];
          
          if (response.data.success && Array.isArray(response.data.data)) {
            apiOrders = response.data.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            apiOrders = response.data.data;
          } else if (Array.isArray(response.data)) {
            apiOrders = response.data;
          } else if (response.data.orders && Array.isArray(response.data.orders)) {
            apiOrders = response.data.orders;
          }
          
          console.log("API orders found:", apiOrders.length);
          
          const transformedOrders = apiOrders.map(order => ({
            id: order.id,
            order_id: order.id,
            orderNumber: `ORD-${order.id}`,
            customer_name: order.customer_name || order.user?.name || savedUser?.name || "User",
            customer_email: order.customer_email || savedUser?.email || "",
            total_amount: parseFloat(order.total || order.total_amount || 0),
            total: parseFloat(order.total || order.total_amount || 0),
            shipping_address: order.shipping_address || "",
            phone: order.phone || "",
            payment_method: order.payment_method || "cod",
            order_status: order.order_status || order.status || "pending",
            created_at: order.created_at,
            is_api_order: true,
            items: (order.items || []).map(item => ({
              id: item.id,
              product_id: item.product_id,
              name: item.product?.name || item.name || "Product",
              quantity: item.quantity,
              price: parseFloat(item.price || 0),
              image: item.product?.image || item.image,
              total_price: item.quantity * parseFloat(item.price || 0)
            }))
          }));
          
          // Merge API orders (avoid duplicates)
          const existingIds = new Set(allOrders.map(o => o.id));
          for (const apiOrder of transformedOrders) {
            if (!existingIds.has(apiOrder.id)) {
              allOrders.push(apiOrder);
            }
          }
          
        } catch (apiError) {
          console.error("API fetch error:", apiError);
          if (apiError.response?.status === 500) {
            Swal.fire({
              icon: 'warning',
              title: 'Server Error',
              text: 'Showing locally saved orders only.',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            });
          }
        }
      }
      
      // Sort orders by date (newest first)
      allOrders.sort((a, b) => {
        const dateA = new Date(a.created_at || a.date);
        const dateB = new Date(b.created_at || b.date);
        return dateB - dateA;
      });
      
      console.log("Total orders to display:", allOrders.length);
      setOrders(allOrders);
      
      if (allOrders.length === 0 && !loggedIn) {
        setError("guest_mode");
      } else if (allOrders.length === 0 && loggedIn) {
        setError("no_orders");
      } else {
        setError(null);
      }
      
    } catch (err) {
      console.error("Error loading orders:", err);
      setError("failed");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "completed": 
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "⏳";
      case "processing": return "⚙️";
      case "completed": 
      case "delivered": return "✅";
      case "cancelled": return "❌";
      default: return "📦";
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Guest mode with no orders
  if (error === "guest_mode" && orders.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-950 transition mb-4">
              <FaArrowLeft className="text-sm" />
              <span>Back to Products</span>
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-6">You are browsing as a guest. Login to save your orders or continue shopping!</p>
            <div className="flex gap-4 justify-center">
              <Link to="/products">
                <button className="bg-blue-950 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition">
                  Continue Shopping
                </button>
              </Link>
              <Link to="/login">
                <button className="border border-blue-950 text-blue-950 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition">
                  Login / Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if ((error === "no_orders" || error === "failed") && orders.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-950 transition mb-4">
              <FaArrowLeft className="text-sm" />
              <span>Back to Products</span>
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders. Start shopping to see your orders here!</p>
            <Link to="/products">
              <button className="bg-blue-950 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-950 transition mb-4">
            <FaArrowLeft className="text-sm" />
            <span>Back to Products</span>
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Orders</h1>
              {user && <p className="text-gray-600 mt-1">Welcome back, {user.name || user.customer_name || "Customer"}!</p>}
              {!isLoggedIn && orders.length > 0 && (
                <p className="text-sm text-orange-600 mt-1">
                  ⚡ You are viewing guest orders. <Link to="/login" className="underline">Login</Link> to save them permanently.
                </p>
              )}
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-blue-950">{orders.length}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {currentOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-gray-50 to-white p-5 border-b">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-semibold text-gray-500">
                        Order #{order.orderNumber || order.id || order.order_id}
                      </span>
                      {order.is_local_order && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                          📱 Guest Order
                        </span>
                      )}
                      {order.is_api_order && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          ☁️ Synced
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.order_status || order.status)}`}>
                        {getStatusIcon(order.order_status || order.status)} {order.order_status || order.status || "Pending"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FaCalendar className="text-xs" />
                        <span>
                          {new Date(order.created_at || order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCreditCard className="text-xs" />
                        <span className="capitalize">
                          {order.payment_method === 'cod' ? '💵 Cash on Delivery' : 
                           order.payment_method === 'card' ? '💳 Credit/Debit Card' : 
                           order.payment_method === 'paypal' ? '💰 PayPal' : 
                           order.payment_method || "COD"}
                        </span>
                      </div>
                      {order.customer_name && (
                        <div className="flex items-center gap-1">
                          <FaUser className="text-xs" />
                          <span>{order.customer_name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold text-blue-950">
                      £{parseFloat(order.total_amount || order.total || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {order.items && order.items.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700 mb-3">Items</h4>
                    {order.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b last:border-0">
                        <div className="flex items-center gap-3 flex-1">
                          <img 
                            src={getImageUrl(item.image, item.id || idx)} 
                            alt={item.name || item.product_name}
                            className="w-12 h-12 rounded object-cover"
                            onError={() => handleImageError(item.id || idx)}
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.name || item.product_name || "Product"}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-xs text-gray-400">
                              £{parseFloat(item.price || 0).toFixed(2)} each
                            </p>
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <p className="font-semibold text-gray-800">
                            £{(item.quantity * (item.price || 0)).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-sm text-blue-950 mt-2">+ {order.items.length - 3} more item(s)</p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No items found for this order</p>
                )}
                
                {order.shipping_address && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-start gap-2 text-sm">
                      <FaMapMarkerAlt className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-700">Shipping Address</p>
                        <p className="text-gray-600">{order.shipping_address}</p>
                        {order.phone && (
                          <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                            <FaPhone className="text-xs" /> {order.phone}
                          </p>
                        )}
                        {order.customer_email && (
                          <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                            <FaEnvelope className="text-xs" /> {order.customer_email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition">Previous</button>
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
                return (
                  <button key={pageNum} onClick={() => goToPage(pageNum)} className={`w-10 h-10 rounded-lg transition ${currentPage === pageNum ? "bg-blue-950 text-white" : "border hover:bg-gray-100"}`}>
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 transition">Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;