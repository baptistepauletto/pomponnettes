import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { getPriceBreakdown, formatPrice, CHARM_PRICE } from '../utils/pricing';
import '../styles/PriceCalculator.scss';

const PriceCalculator: React.FC = () => {
  const { selectedNecklace, placedCharms, giftWrap, selectedHoleCount } = useCustomizer();
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  const pricing = getPriceBreakdown(selectedNecklace, placedCharms, giftWrap, selectedHoleCount);

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
      <div className="price-header" onClick={() => setShowBreakdown(!showBreakdown)}>
        <div className="price-label-section">
          <h3>TOTAL</h3>
          {pricing.savings > 0 && (
            <span className="savings">Économisez {formatPrice(pricing.savings)}</span>
          )}
        </div>
        <div className="price-value-section">
          <span className="price-amount">{formatPrice(pricing.total)}</span>
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
                  {pricing.hasFreeCharms && (
                    <span className="original-price">
                      ({formatPrice(pricing.charmsOriginalPrice)})
                    </span>
                  )}
                </span>
                <span className="item-price">{formatPrice(pricing.charmsPrice)}</span>
              </div>

              {/* Free charms display */}
              {pricing.hasFreeCharms && (
                <div className="breakdown-item discount">
                  <span className="item-label">
                    🎁 {pricing.freeCharmsCount} Charm{pricing.freeCharmsCount !== 1 ? 's' : ''} gratuit{pricing.freeCharmsCount !== 1 ? 's' : ''}
                  </span>
                  <span className="item-price discount-amount">
                    -{formatPrice(pricing.freeCharmsValue)}
                  </span>
                </div>
              )}
            </>
          )}

          {/* Gift wrap */}
          {giftWrap && (
            <div className="breakdown-item">
              <span className="item-label">Emballage cadeau</span>
              <span className="item-price">{formatPrice(pricing.giftWrapPrice)}</span>
            </div>
          )}

          {/* Subtotal */}
          <div className="breakdown-item subtotal">
            <span className="item-label">Sous-total</span>
            <span className="item-price">{formatPrice(pricing.subtotal)}</span>
          </div>

          {/* Total */}
          <div className="breakdown-item total">
            <span className="item-label">Total</span>
            <span className="item-price">{formatPrice(pricing.total)}</span>
          </div>

          {/* Next free charm hint - purple when close, yellow when not */}
          {pricing.nextFreeCharm && (
            pricing.closeToFreeCharm ? (
              <div className="approaching-free-charm">
                <div className="approaching-hint">
                  ✨ Vous êtes proches! Plus que {pricing.nextFreeCharm.charmsNeeded} charm{pricing.nextFreeCharm.charmsNeeded !== 1 ? 's' : ''} pour en obtenir un gratuit!
                </div>
              </div>
            ) : (
              <div className="next-discount">
                <div className="discount-hint">
                  🎁 Ajoutez {pricing.nextFreeCharm.charmsNeeded} charm{pricing.nextFreeCharm.charmsNeeded !== 1 ? 's' : ''} et le prochain sera gratuit!
                </div>
              </div>
            )
          )}

          {/* Quick charm price reference */}
          {!pricing.hasCharms && (
            <div className="charm-info">
              <span className="info-text">Chaque charm: {formatPrice(CHARM_PRICE)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;