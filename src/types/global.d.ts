interface PomponnettesData {
  pluginUrl: string;
  imagesPath: string;
}

interface Window {
  pomponnettesData?: PomponnettesData;
}

// Add jQuery as a global
declare const jQuery: any; 