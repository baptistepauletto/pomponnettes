interface PomponnettesData {
  pluginUrl: string;
  imagesPath: string;
  stock?: {
    parentProductId: number;
    inStockVariationIds: number[];
  };
}

interface Window {
  pomponnettesData?: PomponnettesData;
}

// Add jQuery as a global
declare const jQuery: any; 