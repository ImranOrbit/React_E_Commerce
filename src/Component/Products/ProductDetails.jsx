import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaEye, FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";
import Swal from 'sweetalert2';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Product data with multiple images
  const product = {
    id: 1,
    name: "Stylish Hoodie",
    category: "Apparel",
    original_price: 60,
    final_price: 45,
    hasOffer: true,
    description: "A comfortable and stylish hoodie for everyday use. Perfect for casual wear or outdoor activities. Made with premium cotton blend for maximum comfort and durability.",
    images: [
      "https://picsum.photos/id/1/600/600",
      "https://picsum.photos/id/2/600/600",
      "https://picsum.photos/id/3/600/600",
      "https://picsum.photos/id/4/600/600",
    ],
    colors: ["Black", "Gray", "Navy Blue", "Red"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.5,
    reviews: [
      { id: 1, name: "Alice Johnson", comment: "Great quality, fits perfectly! The material is very soft.", rating: 5, date: "2024-01-15" },
      { id: 2, name: "Bob Williams", comment: "Good product but color slightly different than shown.", rating: 4, date: "2024-01-10" },
      { id: 3, name: "Charlie Brown", comment: "Very comfortable hoodie. Will buy again!", rating: 4, date: "2024-01-05" },
      { id: 4, name: "Diana Smith", comment: "Excellent quality and fast shipping.", rating: 5, date: "2024-01-02" },
    ],
  };

  // Related products
  const relatedProducts = [
    {
      id: 2,
      name: "Classic Denim Jacket",
      price: 89.99,
      originalPrice: 129.99,
      image: "https://picsum.photos/id/20/300/300",
      rating: 4.7,
      category: "Outerwear"
    },
    {
      id: 3,
      name: "Cotton T-Shirt",
      price: 25.99,
      originalPrice: 39.99,
      image: "https://picsum.photos/id/21/300/300",
      rating: 4.3,
      category: "Clothing"
    },
    {
      id: 4,
      name: "Winter Puffer Jacket",
      price: 120.00,
      originalPrice: 199.99,
      image: "https://picsum.photos/id/22/300/300",
      rating: 4.8,
      category: "Outerwear"
    },
    {
      id: 5,
      name: "Sports Cap",
      price: 15.99,
      originalPrice: 24.99,
      image: "https://picsum.photos/id/23/300/300",
      rating: 4.2,
      category: "Accessories"
    }
  ];

  // Next/Previous image
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const increaseQuantity = () => setQuantity(quantity + 1);

  // Render stars
  const renderStars = (rating) => {
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
    if (!selectedSize) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Size',
        text: 'Please select a size before adding to cart',
        confirmButtonColor: '#1e3a8a',
      });
      return;
    }

    if (!selectedColor) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Color',
        text: 'Please select a color before adding to cart',
        confirmButtonColor: '#1e3a8a',
      });
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.final_price,
      quantity: quantity,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex(item => item.id === product.id && item.size === selectedSize && item.color === selectedColor);
    
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
      text: `${product.name} (${selectedSize}, ${selectedColor}) has been added to your cart.`,
      confirmButtonColor: '#1e3a8a',
      showConfirmButton: true
    });
    
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
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
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Image Navigation Arrows */}
                {product.images.length > 1 && (
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
              
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        activeImage === idx ? 'border-blue-900' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col">
              <span className="text-sm text-blue-600 font-medium mb-1">{product.category}</span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="text-yellow-400 text-lg">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600 text-sm">({product.reviews.length} reviews)</span>
              </div>

              {/* Price */}
              {product.hasOffer ? (
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl line-through text-gray-400">
                    £{product.original_price.toFixed(2)}
                  </span>
                  <span className="text-3xl font-bold text-red-600">
                    £{product.final_price.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                    SAVE {((1 - product.final_price / product.original_price) * 100).toFixed(0)}%
                  </span>
                </div>
              ) : (
                <p className="text-3xl font-bold text-gray-900 mb-4">£{product.original_price.toFixed(2)}</p>
              )}

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Color: <span className="text-blue-600">{selectedColor || "Not selected"}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
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
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Size: <span className="text-blue-600">{selectedSize || "Not selected"}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
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

              {/* Additional Info */}
              <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                <p>✓ Free shipping on orders over £100</p>
                <p>✓ 30-day easy returns</p>
                <p>✓ 2-year warranty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="font-semibold text-gray-900">{rev.name}</span>
                  <span className="text-yellow-400">{renderStars(rev.rating)}</span>
                  <span className="text-xs text-gray-500">{new Date(rev.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {relatedProduct.originalPrice && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                      SAVE {Math.round(((relatedProduct.originalPrice - relatedProduct.price) / relatedProduct.originalPrice) * 100)}%
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{relatedProduct.category}</p>
                  <h3 className="font-bold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-yellow-400 text-sm">
                      {renderStars(relatedProduct.rating)}
                    </div>
                    <span className="text-xs text-gray-500">{relatedProduct.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-900">£{relatedProduct.price.toFixed(2)}</span>
                    {relatedProduct.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">£{relatedProduct.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    className="w-full mt-3 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-blue-900 hover:text-white transition flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic for related product
                    }}
                  >
                    <FaShoppingCart size={14} /> Quick View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;