import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import '../styles/PriceDisplay.scss';

const PriceDisplay: React.FC = () => {
  const { selectedNecklace, placedCharms, formattedTotalPrice, charms } = useCustomizer();

  if (!selectedNecklace) return null;

  // Get the breakdown of charms and their prices
  const charmBreakdown = placedCharms.map(placedCharm => {
    const charm = charms.find(c => c.id === placedCharm.charmId);
    return {
      id: placedCharm.id,
      name: charm?.name || 'Unknown charm',
      price: charm?.price || 0
    };
  });

  return (
    <div className="price-display">
      <h3>Your Customization</h3>
      
      <div className="price-breakdown">
        <div className="price-item necklace-price">
          <span className="item-name">{selectedNecklace.name}</span>
          <span className="item-price">€{selectedNecklace.basePrice.toFixed(2)}</span>
        </div>
        
        {charmBreakdown.length > 0 && (
          <>
            <div className="charms-header">Charms:</div>
            {charmBreakdown.map(item => (
              <div className="price-item charm-price" key={item.id}>
                <span className="item-name">{item.name}</span>
                <span className="item-price">€{item.price.toFixed(2)}</span>
              </div>
            ))}
          </>
        )}
        
        <div className="price-total">
          <span className="total-label">Total:</span>
          <span className="total-price">{formattedTotalPrice}</span>
        </div>
      </div>
      
      {placedCharms.length > 0 && (
        <button className="add-to-cart-button">
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default PriceDisplay; 