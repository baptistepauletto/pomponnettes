/**
 * WooCommerce API integration utilities
 * This module handles the integration with WooCommerce for adding products to cart
 */

import { Product, PlacedCharm, HoleCount, isBandanaProduct } from '../types';

/**
 * Maps internal charm IDs to WooCommerce attribute values
 * This mapping can be extended as needed for your specific WooCommerce setup
 */
const getWooCommerceCharmId = (internalCharmId: string) => {
  // If no charm is selected, return the 'no charm' value
  if (!internalCharmId) {
    return 'aucun-charm';
  }
  
  // Return the charm ID as-is since they're already in the correct WooCommerce format
  return internalCharmId;
};

/**
 * Formats customizer data into a format that can be sent to WooCommerce
 * Uses position-based approach where each attachment point position becomes an attribute
 */
const formatCustomizerData = (product: Product, placedCharms: PlacedCharm[]) => {
  // Use the currently derived attachment points (already filtered and left-to-right)
  const orderedPoints = product.attachmentPoints;
  const maxPosition = orderedPoints.length;

  // Build a lookup from attachmentPointId -> sequential position (1..N)
  const positionByPointId = new Map<string, number>();
  orderedPoints.forEach((point, idx) => {
    positionByPointId.set(point.id, idx + 1);
  });

  // Map of sequential position -> charmId
  const charmsBySequentialPosition = new Map<number, string>();

  placedCharms.forEach((placedCharm) => {
    const pos = positionByPointId.get(placedCharm.attachmentPointId);
    if (pos) {
      charmsBySequentialPosition.set(pos, placedCharm.charmId);
    }
  });

  // Create the data object for WooCommerce attributes using 1..N numbering
  const attributeData: Record<string, string> = {};
  for (let i = 1; i <= maxPosition; i++) {
    const charmId = getWooCommerceCharmId(charmsBySequentialPosition.get(i) || '');
    attributeData[`attribute_pa_charm-${i}`] = charmId;
  }

  return attributeData;
};

/**
 * Adds the customized product to the WooCommerce cart using AJAX
 * This matches how regular product pages add to cart without page navigation
 * 
 * @param product The selected product (necklace or bandana)
 * @param placedCharms Array of placed charms
 * @returns Promise with the result of the add to cart operation
 */
export const addToCart = async (
  product: Product,
  placedCharms: PlacedCharm[],
  giftWrap: boolean = false,
  charmOrderTrust: boolean = false,
  selectedHoleCount?: HoleCount,
  quantity: number = 1
): Promise<{ success: boolean; message: string }> => {
  if (!product) {
    return { success: false, message: "No product selected" };
  }
  

  // Check if jQuery is available (required for WooCommerce AJAX)
  if (typeof jQuery === 'undefined') {
    console.error('jQuery is required for WooCommerce AJAX cart');
    return { success: false, message: "jQuery not available" };
  }

  // Get the formatted attribute data
  const attributeData = formatCustomizerData(product, placedCharms);
  
  // Resolve product and variation IDs using type guards
  const countKey: HoleCount | undefined = selectedHoleCount;

  let resolvedProductId: number;
  let resolvedVariationId: number;

  if (isBandanaProduct(product) && countKey) {
    // Bandana: use hole count specific IDs
    resolvedProductId = product.woocommerceIdsByHoleCount[countKey];
    resolvedVariationId = product.variationIdsByHoleCount[countKey];
  } else {
    // Necklace or default: use standard IDs
    resolvedProductId = product.woocommerceId;
    resolvedVariationId = product.variationId;
  }

  // Create the data object for the request
  const data: Record<string, any> = {
    product_id: resolvedProductId,
    'add-to-cart': resolvedProductId,
    quantity: Math.max(1, quantity || 1),
    // Flag to identify that this request came from the Pomponnettes customizer
    pomponnettes_customizer_used: 'true'
  };
  
  // Add variation ID if applicable
  if (resolvedVariationId) {
    data.variation_id = resolvedVariationId;
  }
  
  // Add all attributes
  Object.entries(attributeData).forEach(([name, value]) => {
    data[name] = value;
  });
  
  // Add cart options
  data['emballage-cadeau'] = giftWrap ? 'oui' : 'non';
  data['confiance-charms'] = charmOrderTrust ? 'oui' : 'non';

  // Send WooCommerce Product Add-Ons field for gift wrap so pricing/rules apply
  if (giftWrap) {
    const addonKey = `addon-${resolvedProductId}-1715207785[]`;
    data[addonKey] = 'emballage-cadeau';
  }

  // Send WooCommerce Product Add-Ons field for charm order trust
  if (charmOrderTrust) {
    const trustAddonKey = `addon-${resolvedProductId}-1738266915[]`;
    data[trustAddonKey] = 'je-fais-confiance-aux-pomponnettes-pour-lordre-de-mes-charms-sur-mon-bijou';
  }
  
  // Use jQuery's AJAX method
  return new Promise((resolve) => {
    jQuery.ajax({
      type: 'POST',
      url: '/?wc-ajax=ip_add_to_cart',
      data: data,
      dataType: 'json',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      xhrFields: {
        withCredentials: true
      },
      success: function(response: any) {
        // Check if response is valid
        if (response && response.fragments) {
          // Update mini cart fragments in DOM
          jQuery.each(response.fragments, function(key: string, value: string) {
            jQuery(key).replaceWith(value);
          });
          
          // Trigger WooCommerce's standard events
          jQuery(document.body).trigger('wc_fragments_loaded');
          jQuery(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, null]);
          
          resolve({ 
            success: true, 
            message: "Product added to cart" 
          });
        } else {
          // Try to surface a message if present
          const msg = (response && (response.error || response.message)) ? (response.error || response.message) : "Failed to add to cart";
          resolve({ 
            success: false, 
            message: msg 
          });
        }
      },
      error: function() {
        resolve({ 
          success: false, 
          message: "Network error occurred" 
        });
      }
    });
  });
};
