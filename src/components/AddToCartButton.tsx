import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { addToCart } from '../utils/woocommerce';
import '../styles/AddToCartButton.scss';

const AddToCartButton: React.FC = () => {
  const { selectedNecklace, placedCharms } = useCustomizer();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{text: string, isError: boolean} | null>(null);

  const handleAddToCart = async () => {
    if (!selectedNecklace) {
      setMessage({
        text: "Please select a necklace first",
        isError: true
      });
      return;
    }

    if (placedCharms.length === 0) {
      setMessage({
        text: "Please add at least one charm to your necklace",
        isError: true
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await addToCart(
        selectedNecklace,
        placedCharms
      );

      setMessage({
        text: result.message,
        isError: !result.success
      });
      
      // If successful, could redirect to cart or show additional options
      if (result.success) {
        // Optional: redirect to cart after a delay
        // setTimeout(() => {
        //   window.location.href = '/cart/';
        // }, 2000);
      }
    } catch (error) {
      setMessage({
        text: "An unexpected error occurred. Please try again.",
        isError: true
      });
      console.error("Add to cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-to-cart-container">
      <button 
        className="add-to-cart-button"
        onClick={handleAddToCart}
        disabled={loading || !selectedNecklace || placedCharms.length === 0}
      >
        {loading ? (
          <span className="loading-spinner"></span>
        ) : (
          <>
            <span className="cart-icon">🛒</span>
            <span>Add to Cart</span>
          </>
        )}
      </button>
      
      {message && (
        <div className={`cart-message ${message.isError ? 'error' : 'success'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AddToCartButton; 