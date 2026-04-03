import React, { useState } from "react";
import { FaShoppingCart, FaEye, FaStar, FaStarHalfAlt, FaRegStar, FaTimes, FaUser, FaUserFriends } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  // Sample products data (15 products)
  const [products] = useState([
    {
      id: 1,
      name: "Red Sneakers",
      price: 50.0,
      originalPrice: 79.99,
      category: "Footwear",
      image: "https://picsum.photos/300?1",
      rating: 4.5,
      reviews: 128,
      inStock: true,
      description: "Comfortable red sneakers perfect for daily wear."
    },
    {
      id: 2,
      name: "Blue T-Shirt",
      price: 25.0,
      originalPrice: 39.99,
      category: "Clothing",
      image: "https://picsum.photos/300?2",
      rating: 4.2,
      reviews: 95,
      inStock: true,
      description: "Premium cotton blue t-shirt, soft and breathable."
    },
    {
      id: 3,
      name: "Black Jeans",
      price: 60.0,
      originalPrice: 89.99,
      category: "Clothing",
      image: "https://picsum.photos/300?3",
      rating: 4.7,
      reviews: 203,
      inStock: true,
      description: "Slim fit black jeans with stretch comfort."
    },
    {
      id: 4,
      name: "White Running Shoes",
      price: 75.0,
      originalPrice: 99.99,
      category: "Footwear",
      image: "https://picsum.photos/300?4",
      rating: 4.8,
      reviews: 312,
      inStock: true,
      description: "Lightweight running shoes with superior grip."
    },
    {
      id: 5,
      name: "Brown Leather Jacket",
      price: 120.0,
      originalPrice: 199.99,
      category: "Outerwear",
      image: "https://picsum.photos/300?5",
      rating: 4.9,
      reviews: 67,
      inStock: false,
      description: "Genuine leather jacket, timeless style."
    },
    {
      id: 6,
      name: "Gray Hoodie",
      price: 45.0,
      originalPrice: 69.99,
      category: "Clothing",
      image: "https://picsum.photos/300?6",
      rating: 4.3,
      reviews: 156,
      inStock: true,
      description: "Warm and cozy hoodie for cold weather."
    },
    {
      id: 7,
      name: "Sports Cap",
      price: 15.0,
      originalPrice: 24.99,
      category: "Accessories",
      image: "https://picsum.photos/300?7",
      rating: 4.0,
      reviews: 89,
      inStock: true,
      description: "Adjustable sports cap, UV protection."
    },
    {
      id: 8,
      name: "Leather Wallet",
      price: 30.0,
      originalPrice: 49.99,
      category: "Accessories",
      image: "https://picsum.photos/300?8",
      rating: 4.4,
      reviews: 178,
      inStock: true,
      description: "Genuine leather wallet with multiple card slots."
    },
    {
      id: 9,
      name: "Running Shorts",
      price: 35.0,
      originalPrice: 49.99,
      category: "Clothing",
      image: "https://picsum.photos/300?9",
      rating: 4.1,
      reviews: 67,
      inStock: true,
      description: "Breathable running shorts for men."
    },
    {
      id: 10,
      name: "Winter Gloves",
      price: 20.0,
      originalPrice: 34.99,
      category: "Accessories",
      image: "https://picsum.photos/300?10",
      rating: 4.3,
      reviews: 112,
      inStock: true,
      description: "Warm winter gloves with touchscreen compatibility."
    },
    {
      id: 11,
      name: "Sunglasses",
      price: 45.0,
      originalPrice: 79.99,
      category: "Accessories",
      image: "https://picsum.photos/300?11",
      rating: 4.6,
      reviews: 234,
      inStock: true,
      description: "Polarized sunglasses with UV protection."
    },
    {
      id: 12,
      name: "Backpack",
      price: 65.0,
      originalPrice: 99.99,
      category: "Accessories",
      image: "https://picsum.photos/300?12",
      rating: 4.7,
      reviews: 189,
      inStock: true,
      description: "Water-resistant backpack with laptop compartment."
    },
    {
      id: 13,
      name: "Watch",
      price: 150.0,
      originalPrice: 249.99,
      category: "Accessories",
      image: "https://picsum.photos/300?13",
      rating: 4.8,
      reviews: 456,
      inStock: true,
      description: "Elegant stainless steel watch."
    },
    {
      id: 14,
      name: "Sweatpants",
      price: 40.0,
      originalPrice: 59.99,
      category: "Clothing",
      image: "https://picsum.photos/300?14",
      rating: 4.2,
      reviews: 98,
      inStock: true,
      description: "Comfortable cotton sweatpants."
    },
    {
      id: 15,
      name: "Flip Flops",
      price: 12.0,
      originalPrice: 19.99,
      category: "Footwear",
      image: "https://picsum.photos/300?15",
      rating: 4.0,
      reviews: 267,
      inStock: true,
      description: "Comfortable beach flip flops."
    }
  ]);

  // State for filters and sorting
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [addedToCart, setAddedToCart] = useState({});
  const [visibleCount, setVisibleCount] = useState(12);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Get unique categories
  const categories = ["All", ...new Set(products.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  // Get visible products
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  // Load cart from localStorage
  const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

  // Save cart to localStorage
  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    // Dispatch custom event to update navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Add to cart function (without login check - just adds)
  const addToCartDirect = (product) => {
    const existingCart = getCart();
    const existingProductIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += 1;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      });
    }
    
    saveCart(existingCart);
    
    setAddedToCart({ [product.id]: true });
    setTimeout(() => {
      setAddedToCart({});
    }, 2000);
  };

  // Handle add to cart click - show modal
  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setShowAuthModal(true);
  };

  // Handle guest checkout
  const handleGuestCheckout = () => {
    if (selectedProduct) {
      addToCartDirect(selectedProduct);
      setShowAuthModal(false);
      setSelectedProduct(null);
    }
  };

  // Handle login
  const handleLogin = () => {
    setShowAuthModal(false);
    navigate("/login", { state: { returnTo: "/products", productToAdd: selectedProduct } });
  };

  // Render star ratings
  const renderRating = (rating) => {
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

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">Our Products</h1>
            <p className="text-gray-600 mt-1">Shop the latest collection</p>
          </div>
          
          <Link 
            to="/cart" 
            className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition flex items-center gap-2"
          >
            <FaShoppingCart /> View Cart
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-96 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950 text-black"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === category
                      ? "bg-blue-950 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950 text-black"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {visibleProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg">No products found</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 text-blue-950 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                        Out of Stock
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500">{product.category}</span>
                      <h3 className="font-bold text-lg text-black mt-1">{product.name}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {renderRating(product.rating)}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-blue-950">£{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
                      >
                        <FaEye /> View
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-2 ${
                          product.inStock
                            ? addedToCart[product.id]
                              ? "bg-green-500 text-white"
                              : "bg-blue-950 text-white hover:bg-blue-800"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <FaShoppingCart />
                        {addedToCart[product.id] ? "Added!" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setVisibleCount(visibleCount + 12)}
                  className="bg-blue-950 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition duration-300 font-semibold"
                >
                  See More Products
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Cart Indicator */}
        <div className="fixed bottom-4 right-4">
          <Link
            to="/cart"
            className="bg-blue-950 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition flex items-center gap-2 group"
          >
            <FaShoppingCart size={24} />
            <span className="hidden group-hover:inline text-sm">View Cart</span>
          </Link>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-black">Choose Option</h2>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                Please choose how you want to proceed with adding items to cart
              </p>
              
              <div className="space-y-4">
                {/* Guest Button */}
                <button
                  onClick={handleGuestCheckout}
                  className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-800 p-4 rounded-xl hover:bg-gray-200 transition duration-300 border-2 border-transparent hover:border-gray-300"
                >
                  <FaUserFriends size={24} />
                  <div className="text-left">
                    <div className="font-semibold text-lg">Continue as Guest</div>
                    <div className="text-sm text-gray-500">Shop without creating an account</div>
                  </div>
                </button>
                
                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-blue-950 text-white p-4 rounded-xl hover:bg-blue-800 transition duration-300"
                >
                  <FaUser size={24} />
                  <div className="text-left">
                    <div className="font-semibold text-lg">Login / Sign Up</div>
                    <div className="text-sm text-blue-200">Get personalized experience</div>
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