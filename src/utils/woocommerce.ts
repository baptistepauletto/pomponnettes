/**
 * WooCommerce API integration utilities
 * This module handles the integration with WooCommerce for adding products to cart
 */

import { Necklace, PlacedCharm, Charm } from '../types';

/**
 * Formats customizer data into a format that can be sent to WooCommerce
 */
const formatCustomizerData = (necklace: Necklace, placedCharms: PlacedCharm[], charms: Charm[]) => {
  // Create a string representation of the customization
  const necklaceInfo = {
    id: necklace.id,
    name: necklace.name
  };
  
  const charmsInfo = placedCharms.map(placedCharm => {
    const charm = charms.find(c => c.id === placedCharm.charmId);
    return {
      id: charm?.id,
      name: charm?.name,
      attachmentPoint: placedCharm.attachmentPointId
    };
  });
  
  return {
    necklace: necklaceInfo,
    charms: charmsInfo
  };
};

/**
 * Adds the customized necklace to the WooCommerce cart
 * 
 * @param necklace The selected necklace
 * @param placedCharms Array of placed charms
 * @param charms All available charms (for reference)
 * @param productId The WooCommerce product ID for the necklace
 * @returns Promise with the result of the add to cart operation
 */
export const addToCart = async (
  necklace: Necklace,
  placedCharms: PlacedCharm[],
  charms: Charm[],
  productId: number
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
    const customData = formatCustomizerData(necklace, placedCharms, charms);
    
    // Create the form data to be submitted
    const formData = new FormData();
    formData.append('add-to-cart', productId.toString());
    formData.append('quantity', '1');
    formData.append('customizer_data', JSON.stringify(customData));
    
    // Send the request to the WooCommerce site
    // Here we're assuming the form is posted to the current site
    // You may need to adjust this URL based on your WooCommerce setup
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