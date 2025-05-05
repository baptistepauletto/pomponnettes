/**
 * Script to create draft charm products in WooCommerce
 * 
 * Run with: node src/scripts/create-charm-drafts.js
 * 
 * Requires environment variables:
 * VITE_WC_CONSUMER_KEY
 * VITE_WC_CONSUMER_SECRET
 */

// Import required modules
const dotenv = require('dotenv');
const path = require('path');
const fetch = require('node-fetch');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Check for required credentials
const consumerKey = process.env.VITE_WC_CONSUMER_KEY;
const consumerSecret = process.env.VITE_WC_CONSUMER_SECRET;

if (!consumerKey || !consumerSecret) {
  console.error('Error: WooCommerce API credentials not found in environment variables.');
  console.log('Please create a .env.local file with:');
  console.log('VITE_WC_CONSUMER_KEY=your_key_here');
  console.log('VITE_WC_CONSUMER_SECRET=your_secret_here');
  process.exit(1);
}

// Base API URL
const API_URL = 'https://lespomponnettes.com/wp-json/wc/v3';

// Helper to make WooCommerce API requests
const makeWooCommerceRequest = async (endpoint, method = 'GET', data) => {
  // Add credentials as query parameters for authentication
  const credentials = new URLSearchParams({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
  });

  // Prepare URL with endpoint and credentials
  const url = `${API_URL}/${endpoint}${endpoint.includes('?') ? '&' : '?'}${credentials.toString()}`;
  
  console.log(`Making request to: ${endpoint}`);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error Response: ${errorText}`);
      throw new Error(`WooCommerce API error: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error making WooCommerce API request to ${endpoint}:`, error);
    throw error;
  }
};

// Create a draft product in WooCommerce
const createDraftProduct = async (productData) => {
  try {
    console.log('Creating draft product:', productData.name);
    // Set status to draft
    const data = {
      ...productData,
      status: 'draft'
    };
    
    return await makeWooCommerceRequest('products', 'POST', data);
  } catch (error) {
    console.error(`Error creating draft product ${productData.name}:`, error);
    throw error;
  }
};

// List of charms from the image to create
const charmsToCreate = [
  { id: '0', name: '0' },
  { id: 'aigle', name: 'Aigle' },
  { id: 'ange', name: 'Ange' },
  { id: 'aubergine', name: 'Aubergine' },
  { id: 'avion', name: 'Avion' },
  { id: 'b', name: 'B' },
  { id: 'betail', name: 'Bétail' },
  { id: 'bouddha-vert', name: 'Bouddha Vert' },
  { id: 'bouddha-violet', name: 'Bouddha Violet' },
  { id: 'bouddha-violet-clair', name: 'Bouddha Violet Clair' },
  { id: 'cheval', name: 'Cheval' },
  { id: 'chien', name: 'Chien' },
  { id: 'chien-bleu', name: 'Chien Bleu' },
  { id: 'chien-rose', name: 'Chien Rose' },
  { id: 'chien-rose-pale', name: 'Chien Rose Pale' },
  { id: 'cocktail', name: 'Cocktail' },
  { id: 'coeur', name: 'Coeur' },
  { id: 'coeur-diable', name: 'Coeur Diable' },
  { id: 'coeur-moyen', name: 'Coeur Moyen' },
  { id: 'coeur-sacré-rose', name: 'Coeur Sacré Rose' },
  { id: 'coeur-sacré-rouge', name: 'Coeur Sacré Rouge' },
  { id: 'coquillage', name: 'Coquillage' },
  { id: 'd', name: 'D' },
  { id: 'dauphin', name: 'Dauphin' },
  { id: 'double-eyes-blanc', name: 'Double Eyes Blanc' },
  { id: 'double-eyes-bleu', name: 'Double Eyes Bleu' },
  { id: 'elephant', name: 'Elephant' },
  { id: 'escargot', name: 'Escargot' },
  { id: 'etoile', name: 'Etoile' },
  { id: 'etoile-de-mer', name: 'Etoile de Mer' },
  { id: 'etoile-de-mer-turquoise', name: 'Etoile de Mer Turquoise' },
  { id: 'etoile-spirale', name: 'Etoile Spirale' },
  { id: 'f', name: 'F' },
  { id: 'fer-a-cheval', name: 'Fer à Cheval' },
  { id: 'grand-coeur-sacre', name: 'Grand Coeur Sacré' },
  { id: 'grand-soleil', name: 'Grand Soleil' },
  { id: 'homard', name: 'Homard' },
  { id: 'i', name: 'I' },
  { id: 'j', name: 'J' },
  { id: 'k', name: 'K' },
  { id: 'l', name: 'L' },
  { id: 'lune', name: 'Lune' },
  { id: 'm', name: 'M' },
  { id: 'main-de-fatma-jaune', name: 'Main de Fatma Jaune' },
  { id: 'main-de-fatma-rose', name: 'Main de Fatma Rose' },
  { id: 'medaille', name: 'Médaille' },
  { id: 'medaille-abeille', name: 'Médaille Abeille' },
  { id: 'medaille-coeur', name: 'Médaille Coeur' },
  { id: 'medaille-serpent', name: 'Médaille Serpent' },
  { id: 'medaille-soleil', name: 'Médaille Soleil' },
  { id: 'medaille-soleil-lune', name: 'Médaille Soleil Lune' },
  { id: 'nounours', name: 'Nounours' },
  { id: 'nounours-blanc', name: 'Nounours Blanc' },
  { id: 'nounours-rose-pale', name: 'Nounours Rose Pale' },
  { id: 'oeil-turk-noir', name: 'Oeil Turk Noir' },
  { id: 'oeil-turk-rose', name: 'Oeil Turk Rose' },
  { id: 'oeil-turk-rouge', name: 'Oeil Turk Rouge' },
  { id: 'patte-de-chien-rose', name: 'Patte de Chien Rose' },
  { id: 'perle', name: 'Perle' },
  { id: 'perle-breloque', name: 'Perle Breloque' },
  { id: 'perle-coquillage-rose', name: 'Perle Coquillage Rose' },
  { id: 'perle-coquillage-rouge', name: 'Perle Coquillage Rouge' },
  { id: 'perle-cylindre-bleu', name: 'Perle Cylindre Bleu' },
  { id: 'perle-fleur', name: 'Perle Fleur' },
  { id: 'perle-oeil-coeur', name: 'Perle Oeil Coeur' },
  { id: 'perle-poisson-blanc', name: 'Perle Poisson Blanc' },
  { id: 'perle-poisson-raye', name: 'Perle Poisson Rayé' },
  { id: 'perle-poisson-rose', name: 'Perle Poisson Rose' },
  { id: 'perle-poisson-rouge', name: 'Perle Poisson Rouge' },
  { id: 'petit-nounours', name: 'Petit Nounours' },
  { id: 'petit-trefle', name: 'Petit Trèfle' },
  { id: 'petite-cerise', name: 'Petite Cerise' },
  { id: 'poisson-ange', name: 'Poisson Ange' },
  { id: 'pomme', name: 'Pomme' },
  { id: 'poupee-bleue', name: 'Poupée Bleue' },
  { id: 'poupee-rose', name: 'Poupée Rose' },
  { id: 'poupee-rouge', name: 'Poupée Rouge' },
  { id: 'q', name: 'Q' },
  { id: 'r', name: 'R' },
  { id: 'requin', name: 'Requin' },
  { id: 'rose', name: 'Rose' },
  { id: 's', name: 'S' },
  { id: 'sardine', name: 'Sardine' },
  { id: 'scarabée', name: 'Scarabée' },
  { id: 'serpent', name: 'Serpent' },
  { id: 'smiley-moyen', name: 'Smiley Moyen' },
  { id: 'soleil', name: 'Soleil' },
  { id: 'spirale', name: 'Spirale' },
  { id: 't', name: 'T' },
  { id: 'tortue', name: 'Tortue' },
  { id: 'tortue-bleue', name: 'Tortue Bleue' },
  { id: 'tortue-bleue-ciel', name: 'Tortue Bleue Ciel' },
  { id: 'tortue-rose', name: 'Tortue Rose' },
  { id: 'tortue-rouge', name: 'Tortue Rouge' },
  { id: 'tortue-turquoise', name: 'Tortue Turquoise' },
  { id: 'tour-eiffel', name: 'Tour Eiffel'},
  { id: 'trefle', name: 'Trèfle' },
  { id: 'u', name: 'U' },
  { id: 'v', name: 'V' },
  { id: 'vrai-coquillage', name: 'Vrai Coquillage' },
  { id: 'w', name: 'W' },
  { id: 'x', name: 'X' },
  { id: 'y', name: 'Y' },
  { id: 'z', name: 'Z' },
  { id: 'aucun-charm', name: 'Aucun Charm' }
];



// Main function to create all charm drafts
const createCharmDrafts = async () => {
  try {
    console.log('Starting charm draft creation process');
    
    // Create each charm as a draft product
    let successCount = 0;
    let failCount = 0;
    
    for (const charm of charmsToCreate) {
      try {
        const productData = {
          name: charm.name,
          type: 'simple',
          regular_price: '6.99',
          description: `Charm: ${charm.name}`,
          tags: [
            { name: 'charm' },
            { name: charm.id }
          ],
          meta_data: [
            {
              key: 'charm_id',
              value: charm.id
            }
          ]
        };
        
        const result = await createDraftProduct(productData);
        console.log(`✅ Created draft for: ${charm.name} (ID: ${result.id})`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to create draft for: ${charm.name}`);
        failCount++;
      }
      
      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n=== Summary ===');
    console.log(`Total charms processed: ${charmsToCreate.length}`);
    console.log(`Successful drafts: ${successCount}`);
    console.log(`Failed drafts: ${failCount}`);
    console.log('\nAll charm drafts have been created in your WordPress admin.');
    console.log('You can now edit them at: https://lespomponnettes.com/wp-admin/edit.php?post_status=draft&post_type=product');
    
  } catch (error) {
    console.error('Error in main process:', error);
  }
};

// Run the main function
createCharmDrafts().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
}); 