import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { addToCart } from '../utils/woocommerce';
import '../styles/AddToCartButton.scss';

const AddToCartButton: React.FC = () => {
  const { selectedNecklace, placedCharms, giftWrap, charmOrderTrust, selectedHoleCount } = useCustomizer();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string>('');

  const handleAddToCart = async () => {
    if (!selectedNecklace) return;


    setLoading(true);
    setError('');

    try {
      const result = await addToCart(
        selectedNecklace,
        placedCharms,
        giftWrap,
        charmOrderTrust,
        selectedHoleCount,
        quantity
      );
      if (!result.success) {
        setError(result.message || 'Une erreur est survenue lors de l’ajout au panier.');
      }
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

  // Compute wide availability for bandanas (ignore eyelet count; any variant for this bandana color is fine)
  const inStockVariationIds = (window.pomponnettesData?.stock?.inStockVariationIds || []) as number[];
  const isBandana = !!selectedNecklace && selectedNecklace.name.toLowerCase().includes('bandana');
  const candidateVariationIds: number[] =
    selectedNecklace
      ? (
          selectedNecklace.variationIdsByHoleCount
            ? Object.values(selectedNecklace.variationIdsByHoleCount).filter((v): v is number => typeof v === 'number')
            : (typeof selectedNecklace.variationId === 'number' ? [selectedNecklace.variationId] : [])
        )
      : [];
  const isWideAvailable = !isBandana || candidateVariationIds.some(id => inStockVariationIds.includes(id));

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
          disabled={loading || !selectedNecklace || !isWideAvailable}
        >
          {loading ? (
            <span className="loading-spinner"></span>
          ) : (
            "AJOUTER AU PANIER"
          )}
        </button>
      </div>
      {!!error && (
        <div className="add-to-cart-error" role="alert" aria-live="polite">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddToCartButton; 