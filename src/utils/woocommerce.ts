/**
 * WooCommerce API integration utilities
 * This module handles the integration with WooCommerce for adding products to cart
 */

import { Necklace, PlacedCharm } from '../types';

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
const formatCustomizerData = (necklace: Necklace, placedCharms: PlacedCharm[]) => {
  // Get the maximum number of attachment points
  const maxPosition = necklace.attachmentPoints.length;

  // Create a map of charms by their position number
  const charmsByPosition = new Map<string, string>();
  
  // Fill the map with the placed charms
  placedCharms.forEach(placedCharm => {
    const attachmentPoint = necklace.attachmentPoints.find(
      point => point.id === placedCharm.attachmentPointId
    );
    
    if (attachmentPoint) {
      // Extract the position number from the attachment point ID
      // The format is typically "xx-pointN" where N is the position number
      const positionMatch = attachmentPoint.id.match(/point(\d+)$/);
      
      if (positionMatch && positionMatch[1]) {
        // Use the extracted position number
        charmsByPosition.set(positionMatch[1], placedCharm.charmId);
      } else {
        // Fallback: use the index in the attachment points array + 1
        const positionIndex = (necklace.attachmentPoints.indexOf(attachmentPoint) + 1).toString();
        charmsByPosition.set(positionIndex, placedCharm.charmId);
      }
    }
  });

  // Create the data object for WooCommerce attributes
  const attributeData: Record<string, string> = {};
  
  // For each possible position, add an attribute
  for (let i = 1; i <= maxPosition; i++) {
    const charmId = getWooCommerceCharmId(charmsByPosition.get(i.toString()) || '');
    attributeData[`attribute_pa_charm-${i}`] = charmId;
  }
  
  return attributeData;
};

/**
 * Adds the customized necklace to the WooCommerce cart using AJAX
 * This matches how regular product pages add to cart without page navigation
 * 
 * @param necklace The selected necklace
 * @param placedCharms Array of placed charms
 * @returns Promise with the result of the add to cart operation
 */
export const addToCart = async (
  necklace: Necklace,
  placedCharms: PlacedCharm[],
): Promise<{ success: boolean; message: string }> => {
  if (!necklace) {
    return { success: false, message: "No necklace selected" };
  }
  
  if (placedCharms.length === 0) {
    return { success: false, message: "Please add at least one charm to your necklace" };
  }

  // Check if jQuery is available (required for WooCommerce AJAX)
  if (typeof jQuery === 'undefined') {
    console.error('jQuery is required for WooCommerce AJAX cart');
    return { success: false, message: "jQuery not available" };
  }

  // Get the formatted attribute data
  const attributeData = formatCustomizerData(necklace, placedCharms);
  
  // Create the data object for the request
  const data: Record<string, any> = {
    product_id: necklace.id,
    'add-to-cart': necklace.id,
    quantity: 1
  };
  
  // Add variation ID if applicable
  if (necklace.variationId) {
    data.variation_id = necklace.variationId;
  }
  
  // Add all attributes
  Object.entries(attributeData).forEach(([name, value]) => {
    data[name] = value;
  });
  
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
          resolve({ 
            success: false, 
            message: "Failed to add to cart" 
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