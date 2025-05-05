// WooCommerce REST API integration utilities using fetch API directly

// Check if we have the required credentials
const hasCredentials = () => {
  return !!(import.meta.env.VITE_WC_CONSUMER_KEY && import.meta.env.VITE_WC_CONSUMER_SECRET);
};

// Base API URL
const API_URL = 'https://lespomponnettes.com/wp-json/wc/v3';

// Helper to make WooCommerce API requests
const makeWooCommerceRequest = async (endpoint: string, method: string = 'GET', data?: any) => {
  if (!hasCredentials()) {
    throw new Error('WooCommerce API credentials not configured in .env.local file');
  }

  // Add credentials as query parameters for authentication
  const credentials = new URLSearchParams({
    consumer_key: import.meta.env.VITE_WC_CONSUMER_KEY as string,
    consumer_secret: import.meta.env.VITE_WC_CONSUMER_SECRET as string,
  });

  // Prepare URL with endpoint and credentials
  const url = `${API_URL}/${endpoint}${endpoint.includes('?') ? '&' : '?'}${credentials.toString()}`;
  
  console.log(`Making request to: ${url}`);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    console.log(`Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Response: ${errorText}`);
      throw new Error(`WooCommerce API error: ${response.status} ${errorText}`);
    }

    const responseData = await response.json();
    console.log(`Response data received. Count:`, Array.isArray(responseData) ? responseData.length : 'Not an array');
    return responseData;
  } catch (error) {
    console.error(`Error making WooCommerce API request to ${endpoint}:`, error);
    throw error;
  }
};

// Get all products with optional parameters
export const getProducts = async (params: Record<string, any> = {}) => {
  try {
    console.log('Getting products with params:', params);
    
    // Convert params object to URL search params
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });

    // Always ensure we get a good number of products
    if (!params.per_page) {
      queryParams.append('per_page', '20');
    }
    
    // If no specific category is requested, don't filter by it
    if (params.category === 'colliers' && !params.category_id) {
      // Try without the category filter first
      console.log('Removing category filter to get all products');
      queryParams.delete('category');
    }

    const queryString = queryParams.toString();
    const endpoint = `products${queryString ? `?${queryString}` : ''}`;
    
    const products = await makeWooCommerceRequest(endpoint);
    console.log(`Retrieved ${products.length} products`);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get a product by ID
export const getProduct = async (id: number) => {
  try {
    console.log(`Getting product with ID: ${id}`);
    return await makeWooCommerceRequest(`products/${id}`);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Get all charm inventory data
export const getCharmInventory = async () => {
  try {
    console.log('Loading charm inventory data');
    // Get all charm products with stock information
    const charms = await getProducts({
      category: 'charms',
      per_page: 300,
      status: 'publish'
    });
    
    // Create a map of charm ID to availability info
    const charmInventory = charms.reduce((acc: Record<string, any>, charm: any) => {
      acc[charm.name] = {
        id: charm.id,
        inStock: charm.stock_status === 'instock',
        stockQuantity: charm.stock_quantity
      };
      return acc;
    }, {});
    
    console.log(`Loaded inventory for ${Object.keys(charmInventory).length} charms`);
    return charmInventory;
  } catch (error) {
    console.error('Error loading charm inventory:', error);
    throw error;
  }
};

// Add a customized necklace to cart
export const addToCart = async (
  necklaceId: number, 
  charmData: Array<{name: string, value: string}>
) => {
  try {
    console.log(`Adding customized necklace (ID: ${necklaceId}) to cart with ${charmData.length} attributes`);
    
    // In development mode, prioritize the direct link approach which is most reliable
    const cartUrl = createAddToCartUrl(necklaceId, charmData);
    
    // For development purposes, we'll provide a direct link that will definitely work
    return {
      success: true,
      message: 'Click the button below to add your customized necklace to cart',
      data: {
        manualUrl: cartUrl,
        formData: {
          product_id: necklaceId,
          variation_id: 12764, // Using the variation ID from your example
          attributes: charmData.reduce((acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
          }, {} as Record<string, string>)
        }
      }
    };
  } catch (error) {
    console.error('Error preparing cart URL:', error);
    return {
      success: false,
      message: 'Failed to prepare cart URL. Please try again.',
      data: null
    };
  }
};

// Create a URL that will add the product to cart when visited
function createAddToCartUrl(
  productId: number, 
  attributes: Array<{name: string, value: string}>
): string {
  // The most reliable approach is to use WooCommerce's add-to-cart parameter
  const params = new URLSearchParams({
    'add-to-cart': productId.toString(),
    'quantity': '1',
    'variation_id': '12764' // Using the variation ID from your example
  });
  
  // Add all attributes as query parameters
  attributes.forEach(attr => {
    params.append(attr.name, attr.value);
  });
  
  // Return the complete URL that will add the product to cart when opened
  return `https://lespomponnettes.com/?${params.toString()}`;
}

// Create a draft product in WooCommerce
export const createDraftProduct = async (productData: {
  name: string;
  description: string;
  regular_price: string;
  categories?: Array<{ id: number }>;
  type?: string;
}) => {
  try {
    console.log('Creating draft product:', productData);
    // Set status to draft
    const data = {
      ...productData,
      status: 'draft'
    };
    
    return await makeWooCommerceRequest('products', 'POST', data);
  } catch (error) {
    console.error('Error creating draft product:', error);
    throw error;
  }
};

// Get available product categories
export const getProductCategories = async () => {
  try {
    console.log('Getting product categories');
    const categories = await makeWooCommerceRequest('products/categories?per_page=100');
    console.log(`Retrieved ${categories.length} categories`);
    return categories;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
}; 