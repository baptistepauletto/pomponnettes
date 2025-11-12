import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { addToCart } from '../utils/woocommerce';
import '../styles/AddToCartButton.scss';

const AddToCartButton: React.FC = () => {
  const { selectedNecklace, placedCharms, giftWrap, charmOrderTrust, selectedHoleCount } = useCustomizer();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!selectedNecklace) return;


    setLoading(true);
    

    try {
      await addToCart(
        selectedNecklace,
        placedCharms,
        giftWrap,
        charmOrderTrust,
        selectedHoleCount
      );
    } catch (error) {
      // swallow errors (no UI message requested)
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
      
      
    </div>
  );
};

export default AddToCartButton; 