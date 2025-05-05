# Charm Importer for WooCommerce

This script will create draft products in WooCommerce for all the charms shown in the image.

## Setup

1. Make sure you have Node.js installed (version 14 or higher)

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file with your WooCommerce API credentials:
   ```
   # WordPress WooCommerce API Credentials
   # You can generate these keys in your WordPress admin:
   # WooCommerce → Settings → Advanced → REST API → Add Key
   
   # Consumer Key from WooCommerce
   VITE_WC_CONSUMER_KEY=your_consumer_key_here
   
   # Consumer Secret from WooCommerce
   VITE_WC_CONSUMER_SECRET=your_consumer_secret_here
   ```

## Running the Script

```
npm start
```

or 

```
node create-charm-drafts.js
```

## What it Does

This script will:

1. Connect to your WooCommerce API
2. Create draft products for all charms in the list
3. Set appropriate tags and meta data for each charm
4. Provide a summary of the import process

After running the script, you'll need to:
1. Go to your WordPress admin panel
2. Navigate to Products → All Products
3. Filter by Draft status
4. Edit each product to add images and any other details
5. Publish the products when ready 