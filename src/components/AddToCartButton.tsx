import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { addToCart } from '../utils/woocommerce';
import '../styles/AddToCartButton.scss';

const AddToCartButton: React.FC = () => {
  const { selectedNecklace, placedCharms, giftWrap, charmOrderTrust } = useCustomizer();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, isError: boolean} | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!selectedNecklace) {
      setMessage({
        text: "Please select a necklace first",
        isError: true
      });
      return;
    }


    setLoading(true);
    setMessage(null);

    try {
      const result = await addToCart(
        selectedNecklace,
        placedCharms,
        giftWrap,
        charmOrderTrust
      );

      setMessage({
        text: result.message,
        isError: !result.success
      });
    } catch (error) {
      setMessage({
        text: "An unexpected error occurred. Please try again.",
        isError: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="add-to-cart-container">
      <div className="cart-controls">
        {/* Quantity selector */}
        <div className="quantity-selector">
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="quantity-display">{quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>

        {/* Add to cart button */}
        <button 
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={loading || !selectedNecklace}
        >
          {loading ? (
            <span className="loading-spinner"></span>
          ) : (
            "AJOUTER AU PANIER"
          )}
        </button>
      </div>
      
      {message && (
        <div className={`cart-message ${message.isError ? 'error' : 'success'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AddToCartButton; 