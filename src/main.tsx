import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Mount strategy: use Shadow DOM on WordPress, regular mount in standalone/dev
const rootHost = document.getElementById('root');

if (rootHost) {
  const isWordPress = typeof window !== 'undefined' && !!(window as any).pomponnettesData;

  if (isWordPress) {
    // Create shadow root and inject fonts + app CSS inside the shadow
    const shadow = (rootHost as HTMLElement).attachShadow({ mode: 'open' });

    // Fonts
    const fontsLink = document.createElement('link');
    fontsLink.rel = 'stylesheet';
    fontsLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Jost:wght@300..700&display=swap';
    shadow.appendChild(fontsLink);

    // App CSS (served by the plugin)
    const pluginUrl = (window as any).pomponnettesData?.pluginUrl || '';
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = pluginUrl + 'assets/style.css';
    shadow.appendChild(cssLink);

    // Create a mount point inside the shadow
    const appContainer = document.createElement('div');
    appContainer.id = 'app-root';
    appContainer.className = 'pomponnettes-app-container';
    shadow.appendChild(appContainer);

    ReactDOM.createRoot(appContainer).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } else {
    // Standalone/dev: load CSS into document and render into light DOM
    import('./index.css');

    ReactDOM.createRoot(rootHost).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
}
