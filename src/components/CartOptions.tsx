import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import '../styles/CartOptions.scss';

const CartOptions: React.FC = () => {
  const { giftWrap, charmOrderTrust, setGiftWrap, setCharmOrderTrust } = useCustomizer();

  return (
    <div className="cart-options">
      <div className="cart-option">
        <label className="cart-option-label">
          <input
            type="checkbox"
            checked={giftWrap}
            onChange={(e) => setGiftWrap(e.target.checked)}
            className="cart-option-checkbox"
          />
          <span className="cart-option-text">
            Emballage cadeau (+1,5€)
          </span>
        </label>
      </div>
      
      <div className="cart-option">
        <label className="cart-option-label">
          <input
            type="checkbox"
            checked={charmOrderTrust}
            onChange={(e) => setCharmOrderTrust(e.target.checked)}
            className="cart-option-checkbox"
          />
          <span className="cart-option-text">
            Je fais confiance aux pomponnettes pour l'ordre des charms sur mon bijou.
          </span>
        </label>
      </div>
    </div>
  );
};

export default CartOptions;
