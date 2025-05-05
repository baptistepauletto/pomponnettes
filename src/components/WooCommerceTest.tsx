import React, { useState, useEffect } from 'react';
import { getProducts, getProduct, addToCart, createDraftProduct, getProductCategories } from '../utils/woocommerce';
import '../styles/WooCommerceTest.scss';

// Check if we have the required credentials
const hasCredentials = () => {
  return !!(import.meta.env.VITE_WC_CONSUMER_KEY && import.meta.env.VITE_WC_CONSUMER_SECRET);
};

interface Product {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
  description: string;
  permalink: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

const WooCommerceTest: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'success' | 'error'>('connecting');
  
  // Product creation form state
  const [categories, setCategories] = useState<Category[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    regular_price: '',
    selectedCategoryId: 0
  });
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [createdProduct, setCreatedProduct] = useState<any>(null);

  useEffect(() => {
    const initializeComponent = async () => {
      setLoading(true);
      setError(null);

      // Check for credentials
      if (!hasCredentials()) {
        setError('WooCommerce API credentials not configured. Please set up the credentials in your .env.local file.');
        setConnectionStatus('error');
        setLoading(false);
        return;
      }

      try {
        // Fetch products - without category filter to get all products
        const productsData = await getProducts({ 
          per_page: 20,
          status: 'publish'
        });
        setProducts(productsData);
        
        // Fetch categories
        const categoriesData = await getProductCategories();
        setCategories(categoriesData);
        
        setConnectionStatus('success');
      } catch (err: any) {
        console.error('Failed to load data:', err);
        
        // Handle specific error messages
        const errorMessage = err.message || 'Unknown error occurred';
        if (errorMessage.includes('credentials')) {
          setError('WooCommerce API credentials not configured. Please set up the credentials in your .env.local file.');
        } else if (errorMessage.includes('WooCommerce API error')) {
          setError(`${errorMessage}. Check your credentials and API access.`);
        } else {
          setError(`Failed to connect to WooCommerce API: ${errorMessage}`);
        }
        
        setConnectionStatus('error');
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, []);

  const handleProductSelect = async (productId: number) => {
    try {
      setLoading(true);
      setError(null);
      const product = await getProduct(productId);
      setSelectedProduct(product);
    } catch (err: any) {
      console.error('Failed to fetch product details:', err);
      setError(err.message || 'Failed to load product details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      setError(null);
      await addToCart(productId, 1);
      alert('Product added to cart successfully!');
    } catch (err: any) {
      console.error('Failed to add product to cart:', err);
      setError(err.message || 'Failed to add product to cart.');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };
  
  const handleCreateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingProduct(true);
    setError(null);
    
    try {
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        regular_price: newProduct.regular_price,
        type: 'simple',
        categories: newProduct.selectedCategoryId ? [{ id: parseInt(newProduct.selectedCategoryId.toString()) }] : undefined
      };
      
      const createdProductData = await createDraftProduct(productData);
      setCreatedProduct(createdProductData);
      
      // Reset form
      setNewProduct({
        name: '',
        description: '',
        regular_price: '',
        selectedCategoryId: 0
      });
    } catch (err: any) {
      console.error('Failed to create draft product:', err);
      setError(err.message || 'Failed to create draft product. Please check your credentials.');
    } finally {
      setCreatingProduct(false);
    }
  };

  if (loading && connectionStatus === 'connecting') {
    return (
      <div className="woocommerce-test">
        <h2>Connecting to Les Pomponnettes WooCommerce...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (connectionStatus === 'error') {
    return (
      <div className="woocommerce-test">
        <h2>WooCommerce Connection Test</h2>
        <div className="error-message">
          <p>{error}</p>
          <p>Please make sure you have set the following environment variables in your .env.local file:</p>
          <pre>
            VITE_WC_CONSUMER_KEY=your_key_here<br/>
            VITE_WC_CONSUMER_SECRET=your_secret_here
          </pre>
          <p>You can generate these keys in your WordPress admin at: WooCommerce → Settings → Advanced → REST API</p>
          <p>After creating the .env.local file in the root of your project, restart the development server.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="woocommerce-test">
      <h2>WooCommerce Connection Test</h2>
      
      {connectionStatus === 'success' && (
        <div className="success-message">
          <p>✅ Successfully connected to Les Pomponnettes WooCommerce API!</p>
        </div>
      )}
      
      {/* Product Creation Button and Form */}
      <div className="product-creation">
        <button 
          className="toggle-form-button"
          onClick={() => setShowProductForm(!showProductForm)}
        >
          {showProductForm ? 'Hide Product Form' : 'Create Draft Product'}
        </button>
        
        {showProductForm && (
          <div className="product-form-container">
            <h3>Create a Draft Product</h3>
            
            {error && <div className="form-error">{error}</div>}
            
            {createdProduct ? (
              <div className="success-message">
                <p>✅ Draft product created successfully!</p>
                <p>
                  <strong>ID:</strong> {createdProduct.id}<br />
                  <strong>Name:</strong> {createdProduct.name}<br />
                  <strong>Status:</strong> {createdProduct.status}
                </p>
                {createdProduct.permalink && (
                  <a 
                    href={createdProduct.permalink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="admin-link"
                  >
                    View in WordPress Admin
                  </a>
                )}
                <button 
                  className="reset-button"
                  onClick={() => setCreatedProduct(null)}
                >
                  Create Another Product
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateDraft} className="product-form">
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter product name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Enter product description"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="regular_price">Price (€)</label>
                  <input
                    type="text"
                    id="regular_price"
                    name="regular_price"
                    value={newProduct.regular_price}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 99.00"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="selectedCategoryId">Category</label>
                  <select
                    id="selectedCategoryId"
                    name="selectedCategoryId"
                    value={newProduct.selectedCategoryId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={creatingProduct}
                >
                  {creatingProduct ? 'Creating...' : 'Create Draft Product'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      <div className="product-list">
        <h3>Products from Les Pomponnettes</h3>
        {products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductSelect(product.id)}
              >
                {product.images && product.images[0] && (
                  <img src={product.images[0].src} alt={product.name} />
                )}
                <h4>{product.name}</h4>
                <p className="price">{product.price}€</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found. Check the console for detailed error messages.</p>
        )}
      </div>

      {selectedProduct && (
        <div className="product-details">
          <h3>{selectedProduct.name}</h3>
          <div className="product-info">
            {selectedProduct.images && selectedProduct.images[0] && (
              <img src={selectedProduct.images[0].src} alt={selectedProduct.name} />
            )}
            <div className="product-data">
              <p className="price">{selectedProduct.price}€</p>
              <div 
                className="description" 
                dangerouslySetInnerHTML={{ __html: selectedProduct.description }} 
              />
              <button 
                className="add-to-cart-button"
                onClick={() => handleAddToCart(selectedProduct.id)}
              >
                Add to Cart
              </button>
              <a 
                href={selectedProduct.permalink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-on-site"
              >
                View on Les Pomponnettes
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WooCommerceTest; 