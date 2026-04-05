



// import React, { useState, useEffect } from "react";
// import { FaShoppingCart, FaEye, FaStar, FaStarHalfAlt, FaRegStar, FaTimes, FaUser, FaUserFriends, FaChevronDown, FaSearch } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Products = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortBy, setSortBy] = useState("default");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [addedToCart, setAddedToCart] = useState({});
//   const [visibleCount, setVisibleCount] = useState(12);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [categories, setCategories] = useState(["All"]);
//   const [imageErrors, setImageErrors] = useState({});

//   // Base URL for images - adjust this based on your domain
//   const getBaseUrl = () => {
//     // For production
//     if (window.location.hostname !== 'localhost') {
//       return 'https://e-commerce-next.orbitmediasolutions.com';
//     }
//     // For local development - adjust port if needed
//     return 'http://localhost:8000';
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const apiUrl = window.location.hostname === 'localhost' 
//         ? '/api/products'
//         : 'https://e-commerce-next.orbitmediasolutions.com/api/products';
      
//       console.log('Fetching from:', apiUrl);
      
//       const response = await axios.get(apiUrl, {
//         timeout: 15000,
//         headers: {
//           'Accept': 'application/json',
//         }
//       });
      
//       console.log('Products loaded:', response.data.length);
//       setProducts(response.data);
      
//       // Extract unique categories with proper formatting
//       const uniqueCategories = ["All", ...new Set(response.data.map(p => {
//         let category = p.category;
//         if (category && typeof category === 'string') {
//           category = category.replace(/^"|"$/g, '');
//         }
//         return category;
//       }))];
//       setCategories(uniqueCategories);
      
//     } catch (err) {
//       console.error("Error details:", err);
      
//       let errorMessage = "Failed to load products. ";
      
//       if (err.code === "ERR_NETWORK") {
//         errorMessage += "Network error. Please check if the server is running and CORS is configured properly.";
//       } else if (err.response?.status === 403) {
//         errorMessage += "Access denied. Please check CORS settings on the server.";
//       } else if (err.response?.status === 404) {
//         errorMessage += "API endpoint not found.";
//       } else if (err.message) {
//         errorMessage += err.message;
//       }
      
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cleanText = (text) => {
//     if (!text) return '';
//     if (typeof text === 'string') {
//       return text.replace(/^"|"$/g, '');
//     }
//     return text;
//   };

//   const getCart = () => {
//     const cart = localStorage.getItem("cart");
//     return cart ? JSON.parse(cart) : [];
//   };

//   const saveCart = (cart) => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   const addToCartDirect = (product) => {
//     const existingCart = getCart();
//     const existingProductIndex = existingCart.findIndex(item => item.id === product.id);
    
//     const priceToUse = product.hasOffer ? product.final_price : product.original_price;
    
//     if (existingProductIndex !== -1) {
//       existingCart[existingProductIndex].quantity += 1;
//     } else {
//       existingCart.push({
//         id: product.id,
//         name: cleanText(product.name),
//         price: priceToUse,
//         quantity: 1,
//         image: getImageUrl(product) // Store the image URL
//       });
//     }
    
//     saveCart(existingCart);
    
//     setAddedToCart({ [product.id]: true });
//     setTimeout(() => {
//       setAddedToCart({});
//     }, 2000);
//   };

//   const handleAddToCart = (product) => {
//     setSelectedProduct(product);
//     setShowAuthModal(true);
//   };

//   const handleGuestCheckout = () => {
//     if (selectedProduct) {
//       addToCartDirect(selectedProduct);
//       setShowAuthModal(false);
//       setSelectedProduct(null);
//     }
//   };

//   const handleLogin = () => {
//     setShowAuthModal(false);
//     navigate("/login", { state: { returnTo: "/products", productToAdd: selectedProduct } });
//   };

//   // সুন্দর প্লেসহোল্ডার ইমেজ - ক্যাটাগরি ভিত্তিক
//   const getPlaceholderImage = (category) => {
//     const placeholders = {
//       "T-Shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
//       "Suits": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
//       "Casual Shirts": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
//       "Jeans": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
//       "Boots": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
//       "Coats & Jackets": "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=400&fit=crop",
//       "Hoodie": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
//       "Cap": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
//       "Sunglasses": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
//       "Backpack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
//       "Baby Towel": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
//       "Belt": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop",
//       "Hair Care": "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=400&fit=crop",
//       "Loungewear & Sets": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
//     };
    
//     const cleanCat = cleanText(category);
//     return placeholders[cleanCat] || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=400&fit=crop";
//   };
// // Products.jsx এর getImageUrl ফাংশনটি এভাবে পরিবর্তন করুন

// const getImageUrl = (product) => {
//   if (imageErrors[product.id]) {
//     return getPlaceholderImage(product.category);
//   }
  
//   // API থেকে আসা আসল URL ব্যবহার করুন
//   if (product.images && product.images.length > 0) {
//     return product.images[0];
//   }
  
//   if (product.image) {
//     return product.image;
//   }
  
//   return getPlaceholderImage(product.category);
// };

//   // ইমেজ লোড না হলে এই ফাংশন কল হবে
//   const handleImageError = (product) => {
//     if (!imageErrors[product.id]) {
//       console.log(`Image failed for product ${product.id}, using placeholder`);
//       setImageErrors(prev => ({ 
//         ...prev, 
//         [product.id]: true 
//       }));
//     }
//   };

//   // Filter and sort products
//   const filteredProducts = products
//     .filter(product => {
//       const productCategory = cleanText(product.category);
//       if (selectedCategory !== "All" && productCategory !== selectedCategory) {
//         return false;
//       }
//       const productName = cleanText(product.name).toLowerCase();
//       const search = searchTerm.toLowerCase();
//       if (searchTerm && !productName.includes(search)) {
//         return false;
//       }
//       return true;
//     })
//     .sort((a, b) => {
//       const priceA = a.hasOffer ? a.final_price : a.original_price;
//       const priceB = b.hasOffer ? b.final_price : b.original_price;
      
//       if (sortBy === "price-low") return priceA - priceB;
//       if (sortBy === "price-high") return priceB - priceA;
//       if (sortBy === "name") {
//         const nameA = cleanText(a.name).toLowerCase();
//         const nameB = cleanText(b.name).toLowerCase();
//         return nameA.localeCompare(nameB);
//       }
//       return 0;
//     });

//   const visibleProducts = filteredProducts.slice(0, visibleCount);
//   const hasMore = visibleCount < filteredProducts.length;

//   const renderRating = (rating = 4.5) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
    
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-400" />);
//     }
//     if (hasHalfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
//     }
//     const emptyStars = 5 - stars.length;
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
//     }
//     return stars;
//   };

//   // Get category icon and color
//   const getCategoryStyle = (category) => {
//     const styles = {
//       "T-Shirts": { icon: "👕", color: "bg-blue-100 text-blue-800", borderColor: "border-blue-200" },
//       "Suits": { icon: "👔", color: "bg-purple-100 text-purple-800", borderColor: "border-purple-200" },
//       "Casual Shirts": { icon: "👕", color: "bg-green-100 text-green-800", borderColor: "border-green-200" },
//       "Jeans": { icon: "👖", color: "bg-indigo-100 text-indigo-800", borderColor: "border-indigo-200" },
//       "Boots": { icon: "👢", color: "bg-yellow-100 text-yellow-800", borderColor: "border-yellow-200" },
//       "Loungewear & Sets": { icon: "🛋️", color: "bg-pink-100 text-pink-800", borderColor: "border-pink-200" },
//       "Baby Towel": { icon: "👶", color: "bg-cyan-100 text-cyan-800", borderColor: "border-cyan-200" },
//       "Coats & Jackets": { icon: "🧥", color: "bg-orange-100 text-orange-800", borderColor: "border-orange-200" },
//       "Belt": { icon: "⛓️", color: "bg-gray-100 text-gray-800", borderColor: "border-gray-200" },
//       "Cap": { icon: "🧢", color: "bg-red-100 text-red-800", borderColor: "border-red-200" },
//       "Sunglasses": { icon: "🕶️", color: "bg-gray-100 text-gray-800", borderColor: "border-gray-200" },
//       "Backpack": { icon: "🎒", color: "bg-emerald-100 text-emerald-800", borderColor: "border-emerald-200" },
//       "Tie": { icon: "👔", color: "bg-rose-100 text-rose-800", borderColor: "border-rose-200" },
//       "Hair Care": { icon: "💇", color: "bg-violet-100 text-violet-800", borderColor: "border-violet-200" },
//       "Hoodie": { icon: "👕", color: "bg-slate-100 text-slate-800", borderColor: "border-slate-200" },
//     };
    
//     return styles[category] || { icon: "📦", color: "bg-gray-100 text-gray-800", borderColor: "border-gray-200" };
//   };

//   if (loading) {
//     return (
//       <div className="bg-gray-50 min-h-screen py-8 px-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950 mx-auto"></div>
//           <p className="text-gray-600 mt-4">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-gray-50 min-h-screen py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
//             <p className="font-semibold">Error loading products</p>
//             <p className="text-sm mt-1">{error}</p>
//             <button 
//               onClick={fetchProducts}
//               className="mt-3 bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header with gradient */}
//         <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl shadow-xl p-8 mb-8 text-white">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//               <h1 className="text-4xl font-bold mb-2">Our Products</h1>
//               <p className="text-blue-100">Shop the latest collection with exclusive offers</p>
//             </div>
            
//             <Link 
//               to="/cart" 
//               className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition flex items-center gap-2 border border-white/30"
//             >
//               <FaShoppingCart /> View Cart
//             </Link>
//           </div>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
//           <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
//             {/* Search Bar */}
//             <div className="relative flex-1 w-full">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-black"
//               />
//             </div>
            
//             {/* Categories - Horizontal Scrollable */}
//             <div className="flex-2 w-full overflow-x-auto">
//               <div className="flex gap-2 pb-2">
//                 {categories.map(category => {
//                   const style = getCategoryStyle(category);
//                   return (
//                     <button
//                       key={category}
//                       onClick={() => setSelectedCategory(category)}
//                       className={`px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
//                         selectedCategory === category
//                           ? `${style.color} border-2 shadow-md transform scale-105`
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
//                       }`}
//                     >
//                       <span className="text-lg">{style.icon}</span>
//                       <span className="font-medium">{category}</span>
//                       {selectedCategory === category && (
//                         <span className="ml-1 text-xs">✓</span>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
            
//             {/* Sort Dropdown */}
//             <div className="relative w-full lg:w-auto">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="w-full lg:w-48 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-black appearance-none cursor-pointer"
//               >
//                 <option value="default">Sort by: Default</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="name">Name: A to Z</option>
//               </select>
//               <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         {visibleProducts.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
//             <div className="text-6xl mb-4">🔍</div>
//             <p className="text-gray-500 text-lg">No products found</p>
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setSelectedCategory("All");
//               }}
//               className="mt-4 text-blue-950 hover:underline font-medium"
//             >
//               Clear filters
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {visibleProducts.map((product) => {
//                 const displayPrice = product.hasOffer ? product.final_price : product.original_price;
//                 const productName = cleanText(product.name);
//                 const productCategory = cleanText(product.category);
//                 const categoryStyle = getCategoryStyle(productCategory);
//                 const imageUrl = getImageUrl(product);
                
//                 console.log(`Product ${product.id} image URL:`, imageUrl); // Debug log
                
//                 return (
//                   <div
//                     key={product.id}
//                     className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
//                   >
//                     {/* Image Container */}
//                     <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 h-64">
//                       <img
//                         src={imageUrl}
//                         alt={productName}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                         onError={() => handleImageError(product)}
//                       />
//                       {/* Sale Badge */}
//                       {product.hasOffer && (
//                         <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg transform -rotate-6">
//                           🔥 {Math.round(((product.original_price - product.final_price) / product.original_price) * 100)}% OFF
//                         </div>
//                       )}
//                       {/* Category Badge */}
//                       <div className={`absolute bottom-3 left-3 ${categoryStyle.color} px-3 py-1.5 rounded-lg text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1`}>
//                         <span>{categoryStyle.icon}</span>
//                         <span>{productCategory}</span>
//                       </div>
//                     </div>

//                     {/* Product Info */}
//                     <div className="p-5">
//                       <h3 className="font-bold text-lg text-black mb-2 line-clamp-2 group-hover:text-blue-950 transition">
//                         {productName}
//                       </h3>
                      
//                       {/* Rating */}
//                       <div className="flex items-center gap-2 mb-3">
//                         <div className="flex gap-0.5">
//                           {renderRating()}
//                         </div>
//                         <span className="text-sm text-gray-500">(0 reviews)</span>
//                       </div>
                      
//                       {/* Price */}
//                       <div className="flex items-baseline gap-2 mb-4">
//                         <span className="text-2xl font-bold text-blue-950">
//                           £{displayPrice.toFixed(2)}
//                         </span>
//                         {product.hasOffer && (
//                           <span className="text-gray-400 line-through text-sm">£{product.original_price.toFixed(2)}</span>
//                         )}
//                       </div>
                      
//                       {/* Description */}
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                         {product.description ? cleanText(product.description).substring(0, 80) : "No description available"}
//                         {product.description && cleanText(product.description).length > 80 ? "..." : ""}
//                       </p>
                      
//                       {/* Action Buttons */}
//                       <div className="flex gap-2">
//                         <Link
//                           to={`/product/${product.id}`}
//                           className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2 font-medium"
//                         >
//                           <FaEye /> View
//                         </Link>
//                         <button
//                           onClick={() => handleAddToCart(product)}
//                           className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-2 font-medium ${
//                             addedToCart[product.id]
//                               ? "bg-green-500 text-white"
//                               : "bg-gradient-to-r from-blue-950 to-blue-800 text-white hover:shadow-lg"
//                           }`}
//                         >
//                           <FaShoppingCart />
//                           {addedToCart[product.id] ? "Added!" : "Add"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* See More Button */}
//             {hasMore && (
//               <div className="text-center mt-12">
//                 <button
//                   onClick={() => setVisibleCount(visibleCount + 12)}
//                   className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-8 py-3 rounded-xl hover:shadow-xl transition duration-300 font-semibold transform hover:scale-105"
//                 >
//                   See More Products ({visibleProducts.length} of {filteredProducts.length})
//                 </button>
//               </div>
//             )}
//           </>
//         )}
        
//         {/* Floating Cart Button */}
//         <div className="fixed bottom-6 right-6 z-40">
//           <Link
//             to="/cart"
//             className="bg-gradient-to-r from-blue-950 to-blue-800 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 flex items-center gap-2 group transform hover:scale-110"
//           >
//             <FaShoppingCart size={24} />
//             <span className="hidden group-hover:inline text-sm font-medium transition-all duration-300">Cart</span>
//           </Link>
//         </div>
//       </div>

//       {/* Auth Modal */}
//       {showAuthModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-fadeInUp">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold text-black">Welcome!</h2>
//                 <button
//                   onClick={() => setShowAuthModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition"
//                 >
//                   <FaTimes size={24} />
//                 </button>
//               </div>
              
//               <p className="text-gray-600 mb-6">
//                 Choose how you want to continue shopping
//               </p>
              
//               <div className="space-y-3">
//                 <button
//                   onClick={handleGuestCheckout}
//                   className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 p-4 rounded-xl hover:from-gray-200 hover:to-gray-100 transition duration-300 border-2 border-gray-200"
//                 >
//                   <FaUserFriends size={24} />
//                   <div className="text-left">
//                     <div className="font-semibold text-lg">Continue as Guest</div>
//                     <div className="text-sm text-gray-500">Shop without creating an account</div>
//                   </div>
//                 </button>
                
//                 <button
//                   onClick={handleLogin}
//                   className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-950 to-blue-800 text-white p-4 rounded-xl hover:from-blue-800 hover:to-blue-700 transition duration-300 shadow-lg"
//                 >
//                   <FaUser size={24} />
//                   <div className="text-left">
//                     <div className="font-semibold text-lg">Login / Sign Up</div>
//                     <div className="text-sm text-blue-200">Get personalized experience</div>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;


// import React, { useState, useEffect } from "react";
// import { FaShoppingCart, FaEye, FaStar, FaStarHalfAlt, FaRegStar, FaTimes, FaUser, FaUserFriends, FaChevronDown, FaSearch } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from 'sweetalert2';

// const Products = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortBy, setSortBy] = useState("default");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [addedToCart, setAddedToCart] = useState({});
//   const [visibleCount, setVisibleCount] = useState(12);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [categories, setCategories] = useState(["All"]);
//   const [imageErrors, setImageErrors] = useState({});
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
  
//   // Guest cart tracking - stores which products guest has already added
//   const [guestAddedProducts, setGuestAddedProducts] = useState(() => {
//     const saved = localStorage.getItem("guest_added_products");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Check login status
//   const checkLoginStatus = () => {
//     const token = localStorage.getItem('auth_token');
//     const loggedIn = localStorage.getItem("isLoggedIn") === "true";
//     const isLoggedInNow = !!(token && loggedIn);
//     setIsLoggedIn(isLoggedInNow);
    
//     // If user logs in, clear guest tracking
//     if (isLoggedInNow) {
//       localStorage.removeItem("guest_added_products");
//       setGuestAddedProducts([]);
//     }
    
//     return isLoggedInNow;
//   };

//   useEffect(() => {
//     fetchProducts();
//     checkLoginStatus();
    
//     // Listen for login changes
//     const handleStorageChange = () => {
//       checkLoginStatus();
//     };
    
//     window.addEventListener("storage", handleStorageChange);
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const apiUrl = window.location.hostname === 'localhost' 
//         ? '/api/products'
//         : 'https://e-commerce-next.orbitmediasolutions.com/api/products';
      
//       console.log('Fetching from:', apiUrl);
      
//       const response = await axios.get(apiUrl, {
//         timeout: 15000,
//         headers: {
//           'Accept': 'application/json',
//         }
//       });
      
//       console.log('Products loaded:', response.data.length);
//       setProducts(response.data);
      
//       // Extract unique categories with proper formatting
//       const uniqueCategories = ["All", ...new Set(response.data.map(p => {
//         let category = p.category;
//         if (category && typeof category === 'string') {
//           category = category.replace(/^"|"$/g, '');
//         }
//         return category;
//       }))];
//       setCategories(uniqueCategories);
      
//     } catch (err) {
//       console.error("Error details:", err);
      
//       let errorMessage = "Failed to load products. ";
      
//       if (err.code === "ERR_NETWORK") {
//         errorMessage += "Network error. Please check if the server is running and CORS is configured properly.";
//       } else if (err.response?.status === 403) {
//         errorMessage += "Access denied. Please check CORS settings on the server.";
//       } else if (err.response?.status === 404) {
//         errorMessage += "API endpoint not found.";
//       } else if (err.message) {
//         errorMessage += err.message;
//       }
      
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cleanText = (text) => {
//     if (!text) return '';
//     if (typeof text === 'string') {
//       return text.replace(/^"|"$/g, '');
//     }
//     return text;
//   };

//   const getCart = () => {
//     const cart = localStorage.getItem("cart");
//     return cart ? JSON.parse(cart) : [];
//   };

//   const saveCart = (cart) => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   const addToCartDirect = (product) => {
//     const existingCart = getCart();
//     const existingProductIndex = existingCart.findIndex(item => item.id === product.id);
    
//     const priceToUse = product.hasOffer ? product.final_price : product.original_price;
    
//     if (existingProductIndex !== -1) {
//       existingCart[existingProductIndex].quantity += 1;
//     } else {
//       existingCart.push({
//         id: product.id,
//         name: cleanText(product.name),
//         price: priceToUse,
//         quantity: 1,
//         image: getImageUrl(product)
//       });
//     }
    
//     saveCart(existingCart);
    
//     setAddedToCart({ [product.id]: true });
//     setTimeout(() => {
//       setAddedToCart({});
//     }, 2000);
    
//     // Show success toast
//     Swal.fire({
//       icon: 'success',
//       title: 'Added to Cart!',
//       text: `${cleanText(product.name)} has been added to your cart.`,
//       toast: true,
//       position: 'top-end',
//       showConfirmButton: false,
//       timer: 1500,
//       background: '#f0fdf4',
//       iconColor: '#22c55e'
//     });
//   };

//   // Check if guest has already added this product before
//   const hasGuestAddedBefore = (productId) => {
//     return guestAddedProducts.includes(productId);
//   };

//   // Mark product as added by guest
//   const markGuestAdded = (productId) => {
//     const updated = [...guestAddedProducts, productId];
//     setGuestAddedProducts(updated);
//     localStorage.setItem("guest_added_products", JSON.stringify(updated));
//   };

//   const handleAddToCart = (product) => {
//     const loggedIn = checkLoginStatus();
    
//     if (loggedIn) {
//       // User is logged in - add directly to cart
//       addToCartDirect(product);
//     } else {
//       // User is not logged in (guest)
      
//       // Check if this guest has already added ANY product before
//       const hasAddedBefore = guestAddedProducts.length > 0;
      
//       if (hasAddedBefore) {
//         // Guest has already added before - add directly without modal
//         addToCartDirect(product);
//         // Still mark this product as added (though we don't need to show modal again)
//         if (!hasGuestAddedBefore(product.id)) {
//           markGuestAdded(product.id);
//         }
//       } else {
//         // First time guest - show modal
//         setSelectedProduct(product);
//         setShowAuthModal(true);
//       }
//     }
//   };

//   const handleGuestCheckout = () => {
//     if (selectedProduct) {
//       // Add the product to cart
//       addToCartDirect(selectedProduct);
//       // Mark that this guest has added a product (so next time no modal)
//       markGuestAdded(selectedProduct.id);
//       setShowAuthModal(false);
//       setSelectedProduct(null);
      
//       // Show info message
//       Swal.fire({
//         icon: 'info',
//         title: 'Continue as Guest',
//         text: 'You can continue shopping as guest. Next time you add an item, it will be added directly!',
//         toast: true,
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 3000,
//       });
//     }
//   };

//   const handleLogin = () => {
//     setShowAuthModal(false);
//     // Store the product to add after login
//     if (selectedProduct) {
//       localStorage.setItem("pendingProduct", JSON.stringify(selectedProduct));
//     }
//     navigate("/login", { state: { returnTo: "/products", productToAdd: selectedProduct } });
//   };

//   // Check for pending product after login
//   useEffect(() => {
//     const pendingProduct = localStorage.getItem("pendingProduct");
//     if (pendingProduct && isLoggedIn) {
//       const product = JSON.parse(pendingProduct);
//       addToCartDirect(product);
//       localStorage.removeItem("pendingProduct");
      
//       // Clear guest tracking after login
//       localStorage.removeItem("guest_added_products");
//       setGuestAddedProducts([]);
//     }
//   }, [isLoggedIn]);

//   // Get placeholder image
//   const getPlaceholderImage = (category) => {
//     const placeholders = {
//       "T-Shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
//       "Suits": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
//       "Casual Shirts": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
//       "Jeans": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
//       "Boots": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
//       "Coats & Jackets": "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=400&fit=crop",
//       "Hoodie": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
//       "Cap": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
//       "Sunglasses": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
//       "Backpack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
//       "Baby Towel": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
//       "Belt": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop",
//       "Hair Care": "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=400&fit=crop",
//       "Loungewear & Sets": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
//     };
    
//     const cleanCat = cleanText(category);
//     return placeholders[cleanCat] || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=400&fit=crop";
//   };

//   const getImageUrl = (product) => {
//     if (imageErrors[product.id]) {
//       return getPlaceholderImage(product.category);
//     }
    
//     if (product.images && product.images.length > 0) {
//       return product.images[0];
//     }
    
//     if (product.image) {
//       return product.image;
//     }
    
//     return getPlaceholderImage(product.category);
//   };

//   const handleImageError = (product) => {
//     if (!imageErrors[product.id]) {
//       console.log(`Image failed for product ${product.id}, using placeholder`);
//       setImageErrors(prev => ({ 
//         ...prev, 
//         [product.id]: true 
//       }));
//     }
//   };

//   // Filter and sort products
//   const filteredProducts = products
//     .filter(product => {
//       const productCategory = cleanText(product.category);
//       if (selectedCategory !== "All" && productCategory !== selectedCategory) {
//         return false;
//       }
//       const productName = cleanText(product.name).toLowerCase();
//       const search = searchTerm.toLowerCase();
//       if (searchTerm && !productName.includes(search)) {
//         return false;
//       }
//       return true;
//     })
//     .sort((a, b) => {
//       const priceA = a.hasOffer ? a.final_price : a.original_price;
//       const priceB = b.hasOffer ? b.final_price : b.original_price;
      
//       if (sortBy === "price-low") return priceA - priceB;
//       if (sortBy === "price-high") return priceB - priceA;
//       if (sortBy === "name") {
//         const nameA = cleanText(a.name).toLowerCase();
//         const nameB = cleanText(b.name).toLowerCase();
//         return nameA.localeCompare(nameB);
//       }
//       return 0;
//     });

//   const visibleProducts = filteredProducts.slice(0, visibleCount);
//   const hasMore = visibleCount < filteredProducts.length;

//   const renderRating = (rating = 4.5) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
    
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-400" />);
//     }
//     if (hasHalfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
//     }
//     const emptyStars = 5 - stars.length;
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
//     }
//     return stars;
//   };

//   // Get category icon and color
//   const getCategoryStyle = (category) => {
//     const styles = {
//       "T-Shirts": { icon: "👕", color: "bg-blue-100 text-blue-800", borderColor: "border-blue-200" },
//       "Suits": { icon: "👔", color: "bg-purple-100 text-purple-800", borderColor: "border-purple-200" },
//       "Casual Shirts": { icon: "👕", color: "bg-green-100 text-green-800", borderColor: "border-green-200" },
//       "Jeans": { icon: "👖", color: "bg-indigo-100 text-indigo-800", borderColor: "border-indigo-200" },
//       "Boots": { icon: "👢", color: "bg-yellow-100 text-yellow-800", borderColor: "border-yellow-200" },
//       "Loungewear & Sets": { icon: "🛋️", color: "bg-pink-100 text-pink-800", borderColor: "border-pink-200" },
//       "Baby Towel": { icon: "👶", color: "bg-cyan-100 text-cyan-800", borderColor: "border-cyan-200" },
//       "Coats & Jackets": { icon: "🧥", color: "bg-orange-100 text-orange-800", borderColor: "border-orange-200" },
//       "Belt": { icon: "⛓️", color: "bg-gray-100 text-gray-800", borderColor: "border-gray-200" },
//       "Cap": { icon: "🧢", color: "bg-red-100 text-red-800", borderColor: "border-red-200" },
//       "Sunglasses": { icon: "🕶️", color: "bg-gray-100 text-gray-800", borderColor: "border-gray-200" },
//       "Backpack": { icon: "🎒", color: "bg-emerald-100 text-emerald-800", borderColor: "border-emerald-200" },
//       "Tie": { icon: "👔", color: "bg-rose-100 text-rose-800", borderColor: "border-rose-200" },
//       "Hair Care": { icon: "💇", color: "bg-violet-100 text-violet-800", borderColor: "border-violet-200" },
//       "Hoodie": { icon: "👕", color: "bg-slate-100 text-slate-800", borderColor: "border-slate-200" },
//     };
    
//     return styles[category] || { icon: "📦", color: "bg-gray-100 text-gray-800", borderColor: "border-gray-200" };
//   };

//   if (loading) {
//     return (
//       <div className="bg-gray-50 min-h-screen py-8 px-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950 mx-auto"></div>
//           <p className="text-gray-600 mt-4">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-gray-50 min-h-screen py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
//             <p className="font-semibold">Error loading products</p>
//             <p className="text-sm mt-1">{error}</p>
//             <button 
//               onClick={fetchProducts}
//               className="mt-3 bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header with gradient */}
//         <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl shadow-xl p-8 mb-8 text-white">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//               <h1 className="text-4xl font-bold mb-2">Our Products</h1>
//               <p className="text-blue-100">Shop the latest collection with exclusive offers</p>
//             </div>
            
//             <Link 
//               to="/cart" 
//               className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition flex items-center gap-2 border border-white/30"
//             >
//               <FaShoppingCart /> View Cart
//             </Link>
//           </div>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
//           <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
//             {/* Search Bar */}
//             <div className="relative flex-1 w-full">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-black"
//               />
//             </div>
            
//             {/* Categories - Horizontal Scrollable */}
//             <div className="flex-2 w-full overflow-x-auto">
//               <div className="flex gap-2 pb-2">
//                 {categories.map(category => {
//                   const style = getCategoryStyle(category);
//                   return (
//                     <button
//                       key={category}
//                       onClick={() => setSelectedCategory(category)}
//                       className={`px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
//                         selectedCategory === category
//                           ? `${style.color} border-2 shadow-md transform scale-105`
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
//                       }`}
//                     >
//                       <span className="text-lg">{style.icon}</span>
//                       <span className="font-medium">{category}</span>
//                       {selectedCategory === category && (
//                         <span className="ml-1 text-xs">✓</span>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
            
//             {/* Sort Dropdown */}
//             <div className="relative w-full lg:w-auto">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="w-full lg:w-48 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-black appearance-none cursor-pointer"
//               >
//                 <option value="default">Sort by: Default</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="name">Name: A to Z</option>
//               </select>
//               <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         {visibleProducts.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
//             <div className="text-6xl mb-4">🔍</div>
//             <p className="text-gray-500 text-lg">No products found</p>
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setSelectedCategory("All");
//               }}
//               className="mt-4 text-blue-950 hover:underline font-medium"
//             >
//               Clear filters
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {visibleProducts.map((product) => {
//                 const displayPrice = product.hasOffer ? product.final_price : product.original_price;
//                 const productName = cleanText(product.name);
//                 const productCategory = cleanText(product.category);
//                 const categoryStyle = getCategoryStyle(productCategory);
//                 const imageUrl = getImageUrl(product);
                
//                 return (
//                   <div
//                     key={product.id}
//                     className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
//                   >
//                     {/* Image Container */}
//                     <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 h-64">
//                       <img
//                         src={imageUrl}
//                         alt={productName}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                         onError={() => handleImageError(product)}
//                       />
//                       {product.hasOffer && (
//                         <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg transform -rotate-6">
//                           🔥 {Math.round(((product.original_price - product.final_price) / product.original_price) * 100)}% OFF
//                         </div>
//                       )}
//                       <div className={`absolute bottom-3 left-3 ${categoryStyle.color} px-3 py-1.5 rounded-lg text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1`}>
//                         <span>{categoryStyle.icon}</span>
//                         <span>{productCategory}</span>
//                       </div>
//                     </div>

//                     {/* Product Info */}
//                     <div className="p-5">
//                       <h3 className="font-bold text-lg text-black mb-2 line-clamp-2 group-hover:text-blue-950 transition">
//                         {productName}
//                       </h3>
                      
//                       <div className="flex items-center gap-2 mb-3">
//                         <div className="flex gap-0.5">
//                           {renderRating()}
//                         </div>
//                         <span className="text-sm text-gray-500">(0 reviews)</span>
//                       </div>
                      
//                       <div className="flex items-baseline gap-2 mb-4">
//                         <span className="text-2xl font-bold text-blue-950">
//                           £{displayPrice.toFixed(2)}
//                         </span>
//                         {product.hasOffer && (
//                           <span className="text-gray-400 line-through text-sm">£{product.original_price.toFixed(2)}</span>
//                         )}
//                       </div>
                      
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                         {product.description ? cleanText(product.description).substring(0, 80) : "No description available"}
//                         {product.description && cleanText(product.description).length > 80 ? "..." : ""}
//                       </p>
                      
//                       <div className="flex gap-2">
//                         <Link
//                           to={`/product/${product.id}`}
//                           className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2 font-medium"
//                         >
//                           <FaEye /> View
//                         </Link>
//                         <button
//                           onClick={() => handleAddToCart(product)}
//                           className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-2 font-medium ${
//                             addedToCart[product.id]
//                               ? "bg-green-500 text-white"
//                               : "bg-gradient-to-r from-blue-950 to-blue-800 text-white hover:shadow-lg"
//                           }`}
//                         >
//                           <FaShoppingCart />
//                           {addedToCart[product.id] ? "Added!" : "Add"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {hasMore && (
//               <div className="text-center mt-12">
//                 <button
//                   onClick={() => setVisibleCount(visibleCount + 12)}
//                   className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-8 py-3 rounded-xl hover:shadow-xl transition duration-300 font-semibold transform hover:scale-105"
//                 >
//                   See More Products ({visibleProducts.length} of {filteredProducts.length})
//                 </button>
//               </div>
//             )}
//           </>
//         )}
        
//         {/* Floating Cart Button */}
//         <div className="fixed bottom-6 right-6 z-40">
//           <Link
//             to="/cart"
//             className="bg-gradient-to-r from-blue-950 to-blue-800 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 flex items-center gap-2 group transform hover:scale-110"
//           >
//             <FaShoppingCart size={24} />
//             <span className="hidden group-hover:inline text-sm font-medium transition-all duration-300">Cart</span>
//           </Link>
//         </div>
//       </div>

//       {/* Auth Modal - only shows for FIRST TIME guest users */}
//       {showAuthModal && !isLoggedIn && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold text-black">Welcome!</h2>
//                 <button
//                   onClick={() => setShowAuthModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition"
//                 >
//                   <FaTimes size={24} />
//                 </button>
//               </div>
              
//               <p className="text-gray-600 mb-6">
//                 Do you want to continue as guest or login for better experience?
//               </p>
              
//               <div className="space-y-3">
//                 <button
//                   onClick={handleGuestCheckout}
//                   className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 p-4 rounded-xl hover:from-gray-200 hover:to-gray-100 transition duration-300 border-2 border-gray-200"
//                 >
//                   <FaUserFriends size={24} />
//                   <div className="text-left">
//                     <div className="font-semibold text-lg">Continue as Guest</div>
//                     <div className="text-sm text-gray-500">Add item and continue shopping</div>
//                   </div>
//                 </button>
                
//                 <button
//                   onClick={handleLogin}
//                   className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-950 to-blue-800 text-white p-4 rounded-xl hover:from-blue-800 hover:to-blue-700 transition duration-300 shadow-lg"
//                 >
//                   <FaUser size={24} />
//                   <div className="text-left">
//                     <div className="font-semibold text-lg">Login / Sign Up</div>
//                     <div className="text-sm text-blue-200">Save your cart & get offers</div>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;





import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaEye, FaStar, FaStarHalfAlt, FaRegStar, FaTimes, FaUser, FaUserFriends, FaChevronDown, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [addedToCart, setAddedToCart] = useState({});
  const [visibleCount, setVisibleCount] = useState(12);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [imageErrors, setImageErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Guest cart tracking - stores which products guest has already added
  const [guestAddedProducts, setGuestAddedProducts] = useState(() => {
    const saved = localStorage.getItem("guest_added_products");
    return saved ? JSON.parse(saved) : [];
  });

  // Check login status
  const checkLoginStatus = () => {
    const token = localStorage.getItem('auth_token');
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isLoggedInNow = !!(token && loggedIn);
    setIsLoggedIn(isLoggedInNow);
    
    // If user logs in, clear guest tracking
    if (isLoggedInNow) {
      localStorage.removeItem("guest_added_products");
      setGuestAddedProducts([]);
    }
    
    return isLoggedInNow;
  };

  useEffect(() => {
    fetchProducts();
    checkLoginStatus();
    
    // Listen for login changes
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = window.location.hostname === 'localhost' 
        ? '/api/products'
        : 'https://e-commerce-next.orbitmediasolutions.com/api/products';
      
      console.log('Fetching from:', apiUrl);
      
      const response = await axios.get(apiUrl, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      console.log('Products loaded:', response.data.length);
      setProducts(response.data);
      
      // Extract unique categories with proper formatting
      const uniqueCategories = ["All", ...new Set(response.data.map(p => {
        let category = p.category;
        if (category && typeof category === 'string') {
          category = category.replace(/^"|"$/g, '');
        }
        return category;
      }))];
      setCategories(uniqueCategories);
      
    } catch (err) {
      console.error("Error details:", err);
      
      let errorMessage = "Failed to load products. ";
      
      if (err.code === "ERR_NETWORK") {
        errorMessage += "Network error. Please check if the server is running and CORS is configured properly.";
      } else if (err.response?.status === 403) {
        errorMessage += "Access denied. Please check CORS settings on the server.";
      } else if (err.response?.status === 404) {
        errorMessage += "API endpoint not found.";
      } else if (err.message) {
        errorMessage += err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cleanText = (text) => {
    if (!text) return '';
    if (typeof text === 'string') {
      return text.replace(/^"|"$/g, '');
    }
    return text;
  };

  const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const addToCartDirect = (product) => {
    const existingCart = getCart();
    const existingProductIndex = existingCart.findIndex(item => item.id === product.id);
    
    const priceToUse = product.hasOffer ? product.final_price : product.original_price;
    
    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += 1;
    } else {
      existingCart.push({
        id: product.id,
        name: cleanText(product.name),
        price: priceToUse,
        quantity: 1,
        image: getImageUrl(product)
      });
    }
    
    saveCart(existingCart);
    
    setAddedToCart({ [product.id]: true });
    setTimeout(() => {
      setAddedToCart({});
    }, 2000);
    
    // Show success toast
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${cleanText(product.name)} has been added to your cart.`,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      background: '#f0fdf4',
      iconColor: '#22c55e'
    });
  };

  // Check if guest has already added this product before
  const hasGuestAddedBefore = (productId) => {
    return guestAddedProducts.includes(productId);
  };

  // Mark product as added by guest
  const markGuestAdded = (productId) => {
    const updated = [...guestAddedProducts, productId];
    setGuestAddedProducts(updated);
    localStorage.setItem("guest_added_products", JSON.stringify(updated));
  };

  const handleAddToCart = (product, event) => {
    // Stop event propagation so it doesn't trigger the card click
    event.stopPropagation();
    
    const loggedIn = checkLoginStatus();
    
    if (loggedIn) {
      // User is logged in - add directly to cart
      addToCartDirect(product);
    } else {
      // User is not logged in (guest)
      
      // Check if this guest has already added ANY product before
      const hasAddedBefore = guestAddedProducts.length > 0;
      
      if (hasAddedBefore) {
        // Guest has already added before - add directly without modal
        addToCartDirect(product);
        // Still mark this product as added (though we don't need to show modal again)
        if (!hasGuestAddedBefore(product.id)) {
          markGuestAdded(product.id);
        }
      } else {
        // First time guest - show modal
        setSelectedProduct(product);
        setShowAuthModal(true);
      }
    }
  };

  const handleGuestCheckout = () => {
    if (selectedProduct) {
      // Add the product to cart
      addToCartDirect(selectedProduct);
      // Mark that this guest has added a product (so next time no modal)
      markGuestAdded(selectedProduct.id);
      setShowAuthModal(false);
      setSelectedProduct(null);
      
      // Show info message
      Swal.fire({
        icon: 'info',
        title: 'Continue as Guest',
        text: 'You can continue shopping as guest. Next time you add an item, it will be added directly!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleLogin = () => {
    setShowAuthModal(false);
    // Store the product to add after login
    if (selectedProduct) {
      localStorage.setItem("pendingProduct", JSON.stringify(selectedProduct));
    }
    navigate("/login", { state: { returnTo: "/products", productToAdd: selectedProduct } });
  };

  // Handle product card click - navigate to product details
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Check for pending product after login
  useEffect(() => {
    const pendingProduct = localStorage.getItem("pendingProduct");
    if (pendingProduct && isLoggedIn) {
      const product = JSON.parse(pendingProduct);
      addToCartDirect(product);
      localStorage.removeItem("pendingProduct");
      
      // Clear guest tracking after login
      localStorage.removeItem("guest_added_products");
      setGuestAddedProducts([]);
    }
  }, [isLoggedIn]);

  // Get placeholder image
  const getPlaceholderImage = (category) => {
    const placeholders = {
      "T-Shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      "Suits": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
      "Casual Shirts": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
      "Jeans": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
      "Boots": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
      "Coats & Jackets": "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=400&fit=crop",
      "Hoodie": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      "Cap": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
      "Sunglasses": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
      "Backpack": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      "Baby Towel": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
      "Belt": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop",
      "Hair Care": "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=400&fit=crop",
      "Loungewear & Sets": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
    };
    
    const cleanCat = cleanText(category);
    return placeholders[cleanCat] || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=400&fit=crop";
  };

  const getImageUrl = (product) => {
    if (imageErrors[product.id]) {
      return getPlaceholderImage(product.category);
    }
    
    if (product.images && product.images.length > 0) {
      let imageUrl = product.images[0];
      
      if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
        const baseUrl = window.location.hostname === 'localhost' 
          ? 'http://localhost:8000' 
          : 'https://e-commerce-next.orbitmediasolutions.com';
        
        if (imageUrl.startsWith('/')) {
          imageUrl = `${baseUrl}${imageUrl}`;
        } else {
          imageUrl = `${baseUrl}/storage/${imageUrl}`;
        }
      }
      
      return imageUrl;
    }
    
    if (product.image) {
      let imageUrl = product.image;
      if (!imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
        const baseUrl = window.location.hostname === 'localhost' 
          ? 'http://localhost:8000' 
          : 'https://e-commerce-next.orbitmediasolutions.com';
        
        if (imageUrl.startsWith('/')) {
          imageUrl = `${baseUrl}${imageUrl}`;
        } else {
          imageUrl = `${baseUrl}/storage/${imageUrl}`;
        }
      }
      return imageUrl;
    }
    
    return getPlaceholderImage(product.category);
  };

  const handleImageError = (product) => {
    if (!imageErrors[product.id]) {
      console.log(`Image failed for product ${product.id}, using placeholder`);
      setImageErrors(prev => ({ 
        ...prev, 
        [product.id]: true 
      }));
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const productCategory = cleanText(product.category);
      if (selectedCategory !== "All" && productCategory !== selectedCategory) {
        return false;
      }
      const productName = cleanText(product.name).toLowerCase();
      const search = searchTerm.toLowerCase();
      if (searchTerm && !productName.includes(search)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const priceA = a.hasOffer ? a.final_price : a.original_price;
      const priceB = b.hasOffer ? b.final_price : b.original_price;
      
      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "name") {
        const nameA = cleanText(a.name).toLowerCase();
        const nameB = cleanText(b.name).toLowerCase();
        return nameA.localeCompare(nameB);
      }
      return 0;
    });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const renderRating = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    return stars;
  };

  // Get category icon and color
  const getCategoryStyle = (category) => {
    const styles = {
      "T-Shirts": { icon: "👕", color: "bg-blue-100 text-blue-800", borderColor: "border-blue-200" },
      "Suits": { icon: "👔", color: "bg-purple-100 text-purple-800", borderColor: "border-purple-200" },
      "Casual Shirts": { icon: "👕", color: "bg-green-100 text-green-800", borderColor: "border-green-200" },
      "Jeans": { icon: "👖", color: "bg-indigo-100 text-indigo-800", borderColor: "border-indigo-200" },
      "Boots": { icon: "👢", color: "bg-yellow-100 text-yellow-800", borderColor: "border-yellow-200" },
      "Loungewear & Sets": { icon: "🛋️", color: "bg-pink-100 text-pink-800", borderColor: "border-pink-200" },
      "Baby Towel": { icon: "👶", color: "bg-cyan-100 text-cyan-800", borderColor: "border-cyan-200" },
      "Coats & Jackets": { icon: "🧥", color: "bg-orange-100 text-orange-800", borderColor: "border-orange-200" },
      "Belt": { icon: "⛓️", color: "bg-gray-100 text-gray-800", borderColor: "border-gray-200" },
      "Cap": { icon: "🧢", color: "bg-red-100 text-red-800", borderColor: "border-red-200" },
      "Sunglasses": { icon: "🕶️", color: "bg-gray-100 text-gray-800", borderColor: "border-gray-200" },
      "Backpack": { icon: "🎒", color: "bg-emerald-100 text-emerald-800", borderColor: "border-emerald-200" },
      "Tie": { icon: "👔", color: "bg-rose-100 text-rose-800", borderColor: "border-rose-200" },
      "Hair Care": { icon: "💇", color: "bg-violet-100 text-violet-800", borderColor: "border-violet-200" },
      "Hoodie": { icon: "👕", color: "bg-slate-100 text-slate-800", borderColor: "border-slate-200" },
    };
    
    return styles[category] || { icon: "📦", color: "bg-gray-100 text-gray-800", borderColor: "border-gray-200" };
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-semibold">Error loading products</p>
            <p className="text-sm mt-1">{error}</p>
            <button 
              onClick={fetchProducts}
              className="mt-3 bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Our Products</h1>
              <p className="text-blue-100">Shop the latest collection with exclusive offers</p>
            </div>
            
            <Link 
              to="/cart" 
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition flex items-center gap-2 border border-white/30"
            >
              <FaShoppingCart /> View Cart
            </Link>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent text-black"
              />
            </div>
            
            {/* Categories - Horizontal Scrollable */}
            <div className="flex-2 w-full overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {categories.map(category => {
                  const style = getCategoryStyle(category);
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                        selectedCategory === category
                          ? `${style.color} border-2 shadow-md transform scale-105`
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
                      }`}
                    >
                      <span className="text-lg">{style.icon}</span>
                      <span className="font-medium">{category}</span>
                      {selectedCategory === category && (
                        <span className="ml-1 text-xs">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full lg:w-48 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-black appearance-none cursor-pointer"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {visibleProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No products found</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-blue-950 hover:underline font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleProducts.map((product) => {
                const displayPrice = product.hasOffer ? product.final_price : product.original_price;
                const productName = cleanText(product.name);
                const productCategory = cleanText(product.category);
                const categoryStyle = getCategoryStyle(productCategory);
                const imageUrl = getImageUrl(product);
                
                return (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 h-64">
                      <img
                        src={imageUrl}
                        alt={productName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => handleImageError(product)}
                      />
                      {product.hasOffer && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg transform -rotate-6">
                          🔥 {Math.round(((product.original_price - product.final_price) / product.original_price) * 100)}% OFF
                        </div>
                      )}
                      <div className={`absolute bottom-3 left-3 ${categoryStyle.color} px-3 py-1.5 rounded-lg text-sm font-medium shadow-md backdrop-blur-sm flex items-center gap-1`}>
                        <span>{categoryStyle.icon}</span>
                        <span>{productCategory}</span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-black mb-2 line-clamp-2 group-hover:text-blue-950 transition">
                        {productName}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-0.5">
                          {renderRating()}
                        </div>
                        <span className="text-sm text-gray-500">(0 reviews)</span>
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-blue-950">
                          £{displayPrice.toFixed(2)}
                        </span>
                        {product.hasOffer && (
                          <span className="text-gray-400 line-through text-sm">£{product.original_price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description ? cleanText(product.description).substring(0, 80) : "No description available"}
                        {product.description && cleanText(product.description).length > 80 ? "..." : ""}
                      </p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product.id);
                          }}
                          className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2 font-medium"
                        >
                          <FaEye /> View
                        </button>
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-2 font-medium ${
                            addedToCart[product.id]
                              ? "bg-green-500 text-white"
                              : "bg-gradient-to-r from-blue-950 to-blue-800 text-white hover:shadow-lg"
                          }`}
                        >
                          <FaShoppingCart />
                          {addedToCart[product.id] ? "Added!" : "Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount(visibleCount + 12)}
                  className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-8 py-3 rounded-xl hover:shadow-xl transition duration-300 font-semibold transform hover:scale-105"
                >
                  See More Products ({visibleProducts.length} of {filteredProducts.length})
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Floating Cart Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <Link
            to="/cart"
            className="bg-gradient-to-r from-blue-950 to-blue-800 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 flex items-center gap-2 group transform hover:scale-110"
          >
            <FaShoppingCart size={24} />
            <span className="hidden group-hover:inline text-sm font-medium transition-all duration-300">Cart</span>
          </Link>
        </div>
      </div>

      {/* Auth Modal - only shows for FIRST TIME guest users */}
      {showAuthModal && !isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-black">Welcome!</h2>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                Do you want to continue as guest or login for better experience?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleGuestCheckout}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 p-4 rounded-xl hover:from-gray-200 hover:to-gray-100 transition duration-300 border-2 border-gray-200"
                >
                  <FaUserFriends size={24} />
                  <div className="text-left">
                    <div className="font-semibold text-lg">Continue as Guest</div>
                    <div className="text-sm text-gray-500">Add item and continue shopping</div>
                  </div>
                </button>
                
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-950 to-blue-800 text-white p-4 rounded-xl hover:from-blue-800 hover:to-blue-700 transition duration-300 shadow-lg"
                >
                  <FaUser size={24} />
                  <div className="text-left">
                    <div className="font-semibold text-lg">Login / Sign Up</div>
                    <div className="text-sm text-blue-200">Save your cart & get offers</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;