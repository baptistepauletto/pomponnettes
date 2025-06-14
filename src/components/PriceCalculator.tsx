import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { getPriceBreakdown, formatPrice, CHARM_PRICE } from '../utils/pricing';
import '../styles/PriceCalculator.scss';

const PriceCalculator: React.FC = () => {
  const { selectedNecklace, placedCharms } = useCustomizer();
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  const pricing = getPriceBreakdown(selectedNecklace, placedCharms);

  if (!selectedNecklace) {
    return (
      <div className="price-calculator">
        <div className="price-display">
          <span className="price-label">Select a necklace to see pricing</span>
        </div>
      </div>
    );
  }

  return (
    <div className="price-calculator">
      {/* Main price display */}
      <div className="price-display" onClick={() => setShowBreakdown(!showBreakdown)}>
        <div className="total-price">
          <span className="price-amount">{formatPrice(pricing.total)}</span>
          {pricing.savings > 0 && (
            <span className="savings">Save {formatPrice(pricing.savings)}</span>
          )}
        </div>
        <div className="price-details">
          <span className="tap-hint">
            {showBreakdown ? '👆 Tap to hide details' : '👆 Tap for price breakdown'}
          </span>
        </div>
      </div>

      {/* Expanded breakdown */}
      {showBreakdown && (
        <div className="price-breakdown">
          {/* Necklace price */}
          <div className="breakdown-item">
            <span className="item-label">{selectedNecklace.name}</span>
            <span className="item-price">{formatPrice(pricing.necklacePrice)}</span>
          </div>

          {/* Charms section */}
          {pricing.hasCharms && (
            <>
              <div className="breakdown-item">
                <span className="item-label">
                  {placedCharms.length} charm{placedCharms.length !== 1 ? 's' : ''} 
                  {pricing.hasDiscount && (
                    <span className="original-price">
                      ({formatPrice(pricing.charmsOriginalPrice)})
                    </span>
                  )}
                </span>
                <span className="item-price">{formatPrice(pricing.charmsPrice)}</span>
              </div>

              {/* Discount display */}
              {pricing.hasDiscount && (
                <div className="breakdown-item discount">
                  <span className="item-label">
                    💰 {pricing.discountName} discount
                  </span>
                  <span className="item-price discount-amount">
                    -{formatPrice(pricing.discount)}
                  </span>
                </div>
              )}
            </>
          )}

          {/* Subtotal */}
          <div className="breakdown-item subtotal">
            <span className="item-label">Subtotal</span>
            <span className="item-price">{formatPrice(pricing.subtotal)}</span>
          </div>

          {/* Shipping */}
          <div className="breakdown-item">
            <span className="item-label">
              Shipping 
              {pricing.freeShipping && <span className="free-badge">FREE</span>}
            </span>
            <span className="item-price">
              {pricing.freeShipping ? formatPrice(0) : formatPrice(pricing.shipping)}
            </span>
          </div>

          {/* Total */}
          <div className="breakdown-item total">
            <span className="item-label">Total</span>
            <span className="item-price">{formatPrice(pricing.total)}</span>
          </div>

          {/* Free shipping progress */}
          {!pricing.freeShipping && (
            <div className="shipping-progress">
              <div className="progress-text">
                Add {formatPrice(90 - pricing.subtotal)} more for free shipping! 🚚
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min((pricing.subtotal / 90) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Next discount hint */}
          {pricing.nextDiscount && (
            <div className="next-discount">
              <div className="discount-hint">
                💡 Add {pricing.nextDiscount.charmsNeeded} more charm{pricing.nextDiscount.charmsNeeded !== 1 ? 's' : ''} to get {pricing.nextDiscount.nextDiscountName}!
              </div>
              <div className="potential-savings">
                Potential savings: {formatPrice(pricing.nextDiscount.potentialSavings)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick charm price reference */}
      {!pricing.hasCharms && (
        <div className="charm-info">
          <span className="info-text">Each charm: {formatPrice(CHARM_PRICE)}</span>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;