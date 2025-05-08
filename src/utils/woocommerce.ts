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
  
  // For now, we'll just return the internal ID as the WooCommerce ID
  // This can be customized with a proper mapping if needed
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

  // Create the data array for WooCommerce attributes
  const charmData = [];
  
  // For each possible position, add an attribute
  for (let i = 1; i <= maxPosition; i++) {
    const charmId = getWooCommerceCharmId(charmsByPosition.get(i.toString()) || '');
    
    charmData.push({
      name: `attribute_pa_charm-${i}`,
      value: charmId
    });
  }
  
  
  return charmData;
};

/**
 * Adds the customized necklace to the WooCommerce cart
 * 
 * @param necklace The selected necklace
 * @param placedCharms Array of placed charms
 * @returns Promise with the result of the add to cart operation
 */
export const addToCart = async (
  necklace: Necklace,
  placedCharms: PlacedCharm[],
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!necklace) {
      return { success: false, message: "No necklace selected" };
    }
    
    // No charms added
    if (placedCharms.length === 0) {
      return { success: false, message: "Please add at least one charm to your necklace" };
    }
    
    // Format data for sending to WooCommerce
    const attributeData = formatCustomizerData(necklace, placedCharms);
    
    // Create the form data to be submitted
    const formData = new FormData();
    
    // Add the product ID and variation ID
    formData.append('product_id', necklace.id.toString());
    formData.append('variation_id', (necklace.variationId).toString());
    
    // Add quantity
    formData.append('quantity', '1');
    
    // Add each charm attribute to the form data
    attributeData.forEach(attr => {
      formData.append(attr.name, attr.value);
    });
    
    // Send the request to the WooCommerce site
    const response = await fetch('/cart/', {
      method: 'POST',
      body: formData,
      credentials: 'include' // Include cookies for session management
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    
    return { 
      success: true, 
      message: "Your customized necklace has been added to your cart!" 
    };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { 
      success: false, 
      message: "There was an error adding your necklace to the cart. Please try again." 
    };
  }
}; 