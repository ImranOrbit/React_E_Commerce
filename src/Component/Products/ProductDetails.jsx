



// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaEye, FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";
// import axios from "axios";
// import Swal from 'sweetalert2';

// const ProductDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeImage, setActiveImage] = useState(0);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [imageErrors, setImageErrors] = useState({});

//   useEffect(() => {
//     fetchProductDetails();
//   }, [id]);

//   const fetchProductDetails = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const apiUrl = window.location.hostname === 'localhost' 
//         ? `/api/products/${id}`
//         : `https://e-commerce-next.orbitmediasolutions.com/api/products/${id}`;
      
//       console.log('Fetching product from:', apiUrl);
      
//       const response = await axios.get(apiUrl, {
//         timeout: 15000,
//         headers: {
//           'Accept': 'application/json',
//         }
//       });
      
//       console.log('Product loaded:', response.data);
//       setProduct(response.data);
//       setActiveImage(0); // Reset active image when product changes
      
//       // Fetch related products (same category)
//       if (response.data.category) {
//         fetchRelatedProducts(response.data.category);
//       }
      
//     } catch (err) {
//       console.error("Error details:", err);
//       setError("Failed to load product details. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRelatedProducts = async (category) => {
//     try {
//       const apiUrl = window.location.hostname === 'localhost' 
//         ? '/api/products'
//         : 'https://e-commerce-next.orbitmediasolutions.com/api/products';
      
//       const response = await axios.get(apiUrl);
      
//       // Filter products with same category, excluding current product
//       const cleanCategory = cleanText(category);
//       const related = response.data
//         .filter(p => cleanText(p.category) === cleanCategory && p.id !== parseInt(id))
//         .slice(0, 4);
      
//       setRelatedProducts(related);
//     } catch (err) {
//       console.error("Error fetching related products:", err);
//     }
//   };

//   const cleanText = (text) => {
//     if (!text) return '';
//     if (typeof text === 'string') {
//       return text.replace(/^"|"$/g, '');
//     }
//     return text;
//   };

//   // ইমেজ URL ফাংশন - এখন activeImage ব্যবহার করবে
//   const getCurrentImageUrl = () => {
//     if (!product) return "";
    
//     if (imageErrors[product.id]) {
//       return getPlaceholderImage(product.category);
//     }
    
//     // Get images array
//     const images = product.images || (product.image ? [product.image] : []);
    
//     if (images.length > 0 && activeImage < images.length) {
//       let imageUrl = images[activeImage];
      
//       // If URL doesn't start with http, add base URL
//       if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
//         const baseUrl = window.location.hostname === 'localhost' 
//           ? 'http://localhost:8000' 
//           : 'https://e-commerce-next.orbitmediasolutions.com';
        
//         if (imageUrl.startsWith('/')) {
//           imageUrl = `${baseUrl}${imageUrl}`;
//         } else {
//           imageUrl = `${baseUrl}/storage/${imageUrl}`;
//         }
//       }
      
//       return imageUrl;
//     }
    
//     return getPlaceholderImage(product.category);
//   };

//   // For related products - always show first image
//   const getImageUrl = (productData) => {
//     if (!productData) return "";
    
//     if (imageErrors[productData.id]) {
//       return getPlaceholderImage(productData.category);
//     }
    
//     if (productData.images && productData.images.length > 0) {
//       let imageUrl = productData.images[0];
      
//       // If URL doesn't start with http, add base URL
//       if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
//         const baseUrl = window.location.hostname === 'localhost' 
//           ? 'http://localhost:8000' 
//           : 'https://e-commerce-next.orbitmediasolutions.com';
        
//         if (imageUrl.startsWith('/')) {
//           imageUrl = `${baseUrl}${imageUrl}`;
//         } else {
//           imageUrl = `${baseUrl}/storage/${imageUrl}`;
//         }
//       }
      
//       return imageUrl;
//     }
    
//     if (productData.image) {
//       let imageUrl = productData.image;
//       if (!imageUrl.startsWith('http') && !imageUrl.startsWith('//')) {
//         const baseUrl = window.location.hostname === 'localhost' 
//           ? 'http://localhost:8000' 
//           : 'https://e-commerce-next.orbitmediasolutions.com';
        
//         if (imageUrl.startsWith('/')) {
//           imageUrl = `${baseUrl}${imageUrl}`;
//         } else {
//           imageUrl = `${baseUrl}/storage/${imageUrl}`;
//         }
//       }
//       return imageUrl;
//     }
    
//     return getPlaceholderImage(productData.category);
//   };

//   // Thumbnail ইমেজ URL পাওয়ার জন্য
//   const getThumbnailUrl = (imageUrl, index) => {
//     if (imageErrors[`thumb-${product?.id}-${index}`]) {
//       return getPlaceholderImage(product?.category);
//     }
    
//     let url = imageUrl;
    
//     // If URL doesn't start with http, add base URL
//     if (url && !url.startsWith('http') && !url.startsWith('//')) {
//       const baseUrl = window.location.hostname === 'localhost' 
//         ? 'http://localhost:8000' 
//         : 'https://e-commerce-next.orbitmediasolutions.com';
      
//       if (url.startsWith('/')) {
//         url = `${baseUrl}${url}`;
//       } else {
//         url = `${baseUrl}/storage/${url}`;
//       }
//     }
    
//     return url;
//   };

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

//   const handleImageError = (key) => {
//     if (!imageErrors[key]) {
//       setImageErrors(prev => ({ ...prev, [key]: true }));
//     }
//   };

//   // Next/Previous image
//   const nextImage = () => {
//     if (product && product.images && product.images.length > 0) {
//       setActiveImage((prev) => (prev + 1) % product.images.length);
//     }
//   };

//   const prevImage = () => {
//     if (product && product.images && product.images.length > 0) {
//       setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
//     }
//   };

//   const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
//   const increaseQuantity = () => setQuantity(quantity + 1);

//   // Render stars
//   const renderStars = (rating = 4.5) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
    
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
//     }
//     if (hasHalfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 inline" />);
//     }
//     const emptyStars = 5 - stars.length;
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400 inline" />);
//     }
//     return stars;
//   };

//   // Add to cart function
//   const addToCart = () => {
//     if (!product) return;

//     const cartItem = {
//       id: product.id,
//       name: cleanText(product.name),
//       price: product.hasOffer ? product.final_price : product.original_price,
//       quantity: quantity,
//       image: getCurrentImageUrl(),
//       size: selectedSize || "Default",
//       color: selectedColor || "Default"
//     };

//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existingIndex = existingCart.findIndex(item => item.id === product.id);
    
//     if (existingIndex !== -1) {
//       existingCart[existingIndex].quantity += quantity;
//     } else {
//       existingCart.push(cartItem);
//     }
    
//     localStorage.setItem("cart", JSON.stringify(existingCart));
//     window.dispatchEvent(new Event("cartUpdated"));
    
//     setAddedToCart(true);
//     Swal.fire({
//       icon: 'success',
//       title: 'Added to Cart!',
//       text: `${cleanText(product.name)} has been added to your cart.`,
//       confirmButtonColor: '#1e3a8a',
//       showConfirmButton: true,
//       timer: 2000
//     });
    
//     setTimeout(() => setAddedToCart(false), 3000);
//   };

//   if (loading) {
//     return (
//       <div className="bg-gray-50 min-h-screen py-8 px-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950 mx-auto"></div>
//           <p className="text-gray-600 mt-4">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="bg-gray-50 min-h-screen py-8 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
//             <p className="font-semibold">Error loading product</p>
//             <p className="text-sm mt-1">{error || "Product not found"}</p>
//             <button 
//               onClick={() => navigate('/products')}
//               className="mt-3 bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
//             >
//               Back to Products
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const displayPrice = product.hasOffer ? product.final_price : product.original_price;
//   const productName = cleanText(product.name);
//   const productCategory = cleanText(product.category);
//   const productDescription = cleanText(product.description);
//   const images = product.images || (product.image ? [product.image] : []);

//   const colors = product.colors || ["Black", "White", "Gray", "Navy Blue"];
//   const sizes = product.sizes || ["XS", "S", "M", "L", "XL", "XXL"];

//   return (
//     <div className="bg-gray-50 min-h-screen py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate('/products')}
//           className="mb-6 flex items-center gap-2 text-blue-900 font-semibold hover:text-blue-700 transition"
//         >
//           ← Back to Products
//         </button>

//         {/* Main Product Section */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
//           <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
//             {/* Image Gallery Section */}
//             <div>
//               {/* Main Image */}
//               <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4 group">
//                 <img 
//                   src={getCurrentImageUrl()}
//                   alt={productName}
//                   className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
//                   onError={() => handleImageError(product.id)}
//                 />
                
//                 {/* Image Navigation Arrows */}
//                 {images.length > 1 && (
//                   <>
//                     <button
//                       onClick={prevImage}
//                       className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
//                     >
//                       <FaChevronLeft />
//                     </button>
//                     <button
//                       onClick={nextImage}
//                       className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
//                     >
//                       <FaChevronRight />
//                     </button>
//                   </>
//                 )}
//               </div>
              
//               {/* Thumbnail Images */}
//               {images.length > 1 && (
//                 <div className="flex gap-3 overflow-x-auto pb-2">
//                   {images.map((img, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setActiveImage(idx)}
//                       className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
//                         activeImage === idx ? 'border-blue-900 ring-2 ring-blue-300' : 'border-gray-200 hover:border-gray-400'
//                       }`}
//                     >
//                       <img 
//                         src={getThumbnailUrl(img, idx)} 
//                         alt={`Thumbnail ${idx + 1}`} 
//                         className="w-full h-full object-cover"
//                         onError={() => handleImageError(`thumb-${product.id}-${idx}`)}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Product Info Section - remains same */}
//             <div className="flex flex-col">
//               <span className="text-sm text-blue-600 font-medium mb-1">{productCategory}</span>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{productName}</h1>

//               <div className="flex items-center gap-2 mb-4">
//                 <div className="text-yellow-400 text-lg">
//                   {renderStars()}
//                 </div>
//                 <span className="text-gray-600 text-sm">(0 reviews)</span>
//               </div>

//               {product.hasOffer ? (
//                 <div className="flex items-center gap-3 mb-4">
//                   <span className="text-2xl line-through text-gray-400">
//                     £{product.original_price.toFixed(2)}
//                   </span>
//                   <span className="text-3xl font-bold text-red-600">
//                     £{product.final_price.toFixed(2)}
//                   </span>
//                   <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
//                     SAVE {Math.round(((product.original_price - product.final_price) / product.original_price) * 100)}%
//                   </span>
//                 </div>
//               ) : (
//                 <p className="text-3xl font-bold text-gray-900 mb-4">£{displayPrice.toFixed(2)}</p>
//               )}

//               <p className="text-gray-600 mb-6 leading-relaxed">{productDescription}</p>

//               {/* Color Selection */}
//               <div className="mb-6">
//                 <h3 className="font-semibold text-gray-900 mb-3">Color: <span className="text-blue-600">{selectedColor || "Not selected"}</span></h3>
//                 <div className="flex flex-wrap gap-3">
//                   {colors.map((color) => (
//                     <button
//                       key={color}
//                       onClick={() => setSelectedColor(color)}
//                       className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
//                         selectedColor === color
//                           ? "border-blue-900 bg-blue-50 text-blue-900"
//                           : "border-gray-200 text-gray-700 hover:border-gray-400"
//                       }`}
//                     >
//                       {color}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Size Selection */}
//               <div className="mb-6">
//                 <h3 className="font-semibold text-gray-900 mb-3">Size: <span className="text-blue-600">{selectedSize || "Not selected"}</span></h3>
//                 <div className="flex flex-wrap gap-3">
//                   {sizes.map((size) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`w-12 h-12 rounded-lg border-2 font-medium transition ${
//                         selectedSize === size
//                           ? "border-blue-900 bg-blue-50 text-blue-900"
//                           : "border-gray-200 text-gray-700 hover:border-gray-400"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Quantity */}
//               <div className="mb-6">
//                 <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={decreaseQuantity}
//                     className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
//                   >
//                     -
//                   </button>
//                   <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
//                   <button
//                     onClick={increaseQuantity}
//                     className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Add to Cart Button */}
//               <button
//                 onClick={addToCart}
//                 disabled={addedToCart}
//                 className={`w-full py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 duration-300 shadow-lg mb-6 flex items-center justify-center gap-2 ${
//                   addedToCart
//                     ? "bg-green-500 text-white"
//                     : "bg-blue-900 text-white hover:bg-blue-800"
//                 }`}
//               >
//                 {addedToCart ? <FaCheckCircle /> : <FaShoppingCart />}
//                 {addedToCart ? "Added to Cart!" : "ADD TO CART"}
//               </button>

//               <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
//                 <p>✓ Free shipping on orders over £100</p>
//                 <p>✓ 30-day easy returns</p>
//                 <p>✓ 2-year warranty</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Related Products Section */}
//         {relatedProducts.length > 0 && (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {relatedProducts.map((relatedProduct) => {
//                 const relatedName = cleanText(relatedProduct.name);
//                 const relatedPrice = relatedProduct.hasOffer ? relatedProduct.final_price : relatedProduct.original_price;
//                 const relatedOriginalPrice = relatedProduct.hasOffer ? relatedProduct.original_price : null;
                
//                 return (
//                   <div
//                     key={relatedProduct.id}
//                     className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
//                     onClick={() => navigate(`/product/${relatedProduct.id}`)}
//                   >
//                     <div className="relative overflow-hidden bg-gray-100 h-48">
//                       <img
//                         src={getImageUrl(relatedProduct)}
//                         alt={relatedName}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                         onError={() => handleImageError(relatedProduct.id)}
//                       />
//                       {relatedProduct.hasOffer && (
//                         <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
//                           SAVE {Math.round(((relatedProduct.original_price - relatedProduct.final_price) / relatedProduct.original_price) * 100)}%
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-4">
//                       <p className="text-xs text-gray-500 mb-1">{cleanText(relatedProduct.category)}</p>
//                       <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{relatedName}</h3>
//                       <div className="flex items-center gap-2 mb-2">
//                         <div className="text-yellow-400 text-sm">
//                           {renderStars()}
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg font-bold text-blue-900">£{relatedPrice.toFixed(2)}</span>
//                         {relatedOriginalPrice && (
//                           <span className="text-sm text-gray-400 line-through">£{relatedOriginalPrice.toFixed(2)}</span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;



import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaEye, FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import Swal from 'sweetalert2';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const [colorImages, setColorImages] = useState({});
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = window.location.hostname === 'localhost' 
        ? `/api/products/${id}`
        : `https://e-commerce-next.orbitmediasolutions.com/api/products/${id}`;
      
      console.log('Fetching product from:', apiUrl);
      
      const response = await axios.get(apiUrl, {
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      console.log('Product loaded:', response.data);
      setProduct(response.data);
      
      // Initialize all images
      const images = response.data.images || (response.data.image ? [response.data.image] : []);
      setAllImages(images);
      setActiveImage(0);
      
      // Initialize color images mapping
      initializeColorImages(response.data, images);
      
      // Fetch related products (same category)
      if (response.data.category) {
        fetchRelatedProducts(response.data.category);
      }
      
    } catch (err) {
      console.error("Error details:", err);
      setError("Failed to load product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const initializeColorImages = (productData, images) => {
    // Create mapping of colors to their respective images
    const colorImageMap = {};
    
    // Get available colors from product
    const colors = productData.colors || ["Black", "White", "Gray", "Navy Blue"];
    
    // If we have multiple images, map them to colors
    if (images.length >= colors.length) {
      colors.forEach((color, index) => {
        colorImageMap[color] = images[index % images.length];
      });
    } else if (images.length > 0) {
      // If not enough images, use the first image for all colors
      const defaultImage = images[0];
      colors.forEach((color) => {
        colorImageMap[color] = defaultImage;
      });
    } else {
      // No images available
      colors.forEach((color) => {
        colorImageMap[color] = null;
      });
    }
    
    setColorImages(colorImageMap);
  };

  const fetchRelatedProducts = async (category) => {
    try {
      const apiUrl = window.location.hostname === 'localhost' 
        ? '/api/products'
        : 'https://e-commerce-next.orbitmediasolutions.com/api/products';
      
      const response = await axios.get(apiUrl);
      
      // Filter products with same category, excluding current product
      const cleanCategory = cleanText(category);
      const related = response.data
        .filter(p => cleanText(p.category) === cleanCategory && p.id !== parseInt(id))
        .slice(0, 4);
      
      setRelatedProducts(related);
    } catch (err) {
      console.error("Error fetching related products:", err);
    }
  };

  const cleanText = (text) => {
    if (!text) return '';
    if (typeof text === 'string') {
      return text.replace(/^"|"$/g, '');
    }
    return text;
  };

  // Get current display images (based on selected color or all images)
  const getCurrentDisplayImages = () => {
    // If a color is selected and has a specific image
    if (selectedColor && colorImages[selectedColor]) {
      // Return array with color image + other images
      const colorImage = colorImages[selectedColor];
      const otherImages = allImages.filter(img => img !== colorImage);
      return [colorImage, ...otherImages];
    }
    // Return all images
    return allImages;
  };

  // Get image URL based on selected color or active index
  const getCurrentImageUrl = () => {
    if (!product) return "";
    
    if (imageErrors[product.id]) {
      return getPlaceholderImage(product.category);
    }
    
    const displayImages = getCurrentDisplayImages();
    
    if (displayImages.length > 0 && activeImage < displayImages.length) {
      let imageUrl = displayImages[activeImage];
      
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
    
    return getPlaceholderImage(product.category);
  };

  // For related products - always show first image
  const getImageUrl = (productData) => {
    if (!productData) return "";
    
    if (imageErrors[productData.id]) {
      return getPlaceholderImage(productData.category);
    }
    
    if (productData.images && productData.images.length > 0) {
      let imageUrl = productData.images[0];
      
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
    
    if (productData.image) {
      let imageUrl = productData.image;
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
    
    return getPlaceholderImage(productData.category);
  };

  const getThumbnailUrl = (imageUrl, index) => {
    if (imageErrors[`thumb-${product?.id}-${index}`]) {
      return getPlaceholderImage(product?.category);
    }
    
    let url = imageUrl;
    
    if (url && !url.startsWith('http') && !url.startsWith('//')) {
      const baseUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:8000' 
        : 'https://e-commerce-next.orbitmediasolutions.com';
      
      if (url.startsWith('/')) {
        url = `${baseUrl}${url}`;
      } else {
        url = `${baseUrl}/storage/${url}`;
      }
    }
    
    return url;
  };

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

  const handleImageError = (key) => {
    if (!imageErrors[key]) {
      setImageErrors(prev => ({ ...prev, [key]: true }));
    }
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setActiveImage(0); // Reset to first image when color changes
    
    // Check if color has image
    if (!colorImages[color]) {
      Swal.fire({
        icon: 'info',
        title: 'No Image Available',
        text: `No image available for ${color} color`,
        confirmButtonColor: '#1e3a8a',
        timer: 2000
      });
    }
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setActiveImage(index);
  };

  // Next/Previous image
  const nextImage = () => {
    const displayImages = getCurrentDisplayImages();
    if (displayImages.length > 0) {
      setActiveImage((prev) => (prev + 1) % displayImages.length);
    }
  };

  const prevImage = () => {
    const displayImages = getCurrentDisplayImages();
    if (displayImages.length > 0) {
      setActiveImage((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    }
  };

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const increaseQuantity = () => setQuantity(quantity + 1);

  // Render stars
  const renderStars = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 inline" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400 inline" />);
    }
    return stars;
  };

  // Add to cart function
  const addToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: cleanText(product.name),
      price: product.hasOffer ? product.final_price : product.original_price,
      quantity: quantity,
      image: getCurrentImageUrl(),
      size: selectedSize || "Default",
      color: selectedColor || "Default"
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex(item => item.id === product.id && item.color === selectedColor);
    
    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    
    setAddedToCart(true);
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${cleanText(product.name)} has been added to your cart.`,
      confirmButtonColor: '#1e3a8a',
      showConfirmButton: true,
      timer: 2000
    });
    
    setTimeout(() => setAddedToCart(false), 3000);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-semibold">Error loading product</p>
            <p className="text-sm mt-1">{error || "Product not found"}</p>
            <button 
              onClick={() => navigate('/products')}
              className="mt-3 bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayPrice = product.hasOffer ? product.final_price : product.original_price;
  const productName = cleanText(product.name);
  const productCategory = cleanText(product.category);
  const productDescription = cleanText(product.description);
  const displayImages = getCurrentDisplayImages();

  const colors = product.colors || ["Black", "White", "Gray", "Navy Blue"];
  const sizes = product.sizes || ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="mb-6 flex items-center gap-2 text-blue-900 font-semibold hover:text-blue-700 transition"
        >
          ← Back to Products
        </button>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Gallery Section */}
            <div>
              {/* Main Image */}
              <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4 group">
                <img 
                  src={getCurrentImageUrl()}
                  alt={productName}
                  className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => handleImageError(product.id)}
                />
                
                {/* Image Navigation Arrows */}
                {displayImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Images - Clickable like before */}
              {displayImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleThumbnailClick(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        activeImage === idx ? 'border-blue-900 ring-2 ring-blue-300' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img 
                        src={getThumbnailUrl(img, idx)} 
                        alt={`Thumbnail ${idx + 1}`} 
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(`thumb-${product.id}-${idx}`)}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col">
              <span className="text-sm text-blue-600 font-medium mb-1">{productCategory}</span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{productName}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="text-yellow-400 text-lg">
                  {renderStars()}
                </div>
                <span className="text-gray-600 text-sm">(0 reviews)</span>
              </div>

              {product.hasOffer ? (
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl line-through text-gray-400">
                    £{product.original_price.toFixed(2)}
                  </span>
                  <span className="text-3xl font-bold text-red-600">
                    £{product.final_price.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                    SAVE {Math.round(((product.original_price - product.final_price) / product.original_price) * 100)}%
                  </span>
                </div>
              ) : (
                <p className="text-3xl font-bold text-gray-900 mb-4">£{displayPrice.toFixed(2)}</p>
              )}

              <p className="text-gray-600 mb-6 leading-relaxed">{productDescription}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Color: <span className="text-blue-600">{selectedColor || "Not selected"}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                        selectedColor === color
                          ? "border-blue-900 bg-blue-50 text-blue-900"
                          : "border-gray-200 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
                {selectedColor && !colorImages[selectedColor] && (
                  <p className="text-amber-600 text-sm mt-2">
                    ⚠️ No image available for {selectedColor} color
                  </p>
                )}
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Size: <span className="text-blue-600">{selectedSize || "Not selected"}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 font-medium transition ${
                        selectedSize === size
                          ? "border-blue-900 bg-blue-50 text-blue-900"
                          : "border-gray-200 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={addToCart}
                disabled={addedToCart}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 duration-300 shadow-lg mb-6 flex items-center justify-center gap-2 ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                {addedToCart ? <FaCheckCircle /> : <FaShoppingCart />}
                {addedToCart ? "Added to Cart!" : "ADD TO CART"}
              </button>

              <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                <p>✓ Free shipping on orders over £100</p>
                <p>✓ 30-day easy returns</p>
                <p>✓ 2-year warranty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedName = cleanText(relatedProduct.name);
                const relatedPrice = relatedProduct.hasOffer ? relatedProduct.final_price : relatedProduct.original_price;
                const relatedOriginalPrice = relatedProduct.hasOffer ? relatedProduct.original_price : null;
                
                return (
                  <div
                    key={relatedProduct.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <div className="relative overflow-hidden bg-gray-100 h-48">
                      <img
                        src={getImageUrl(relatedProduct)}
                        alt={relatedName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError(relatedProduct.id)}
                      />
                      {relatedProduct.hasOffer && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                          SAVE {Math.round(((relatedProduct.original_price - relatedProduct.final_price) / relatedProduct.original_price) * 100)}%
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1">{cleanText(relatedProduct.category)}</p>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{relatedName}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-yellow-400 text-sm">
                          {renderStars()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-blue-900">£{relatedPrice.toFixed(2)}</span>
                        {relatedOriginalPrice && (
                          <span className="text-sm text-gray-400 line-through">£{relatedOriginalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;