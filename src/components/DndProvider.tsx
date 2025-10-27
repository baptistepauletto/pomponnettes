import React from 'react';
import { DndProvider as ReactDndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

// Custom provider that chooses the appropriate backend based on device
const DndProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if the device supports touch
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  // Touch backend options for better mobile experience
  const getRootElement = (): HTMLElement | undefined => {
    // If we mounted into a shadow root, the host has a shadowRoot with an #app-root inside
    const host = document.getElementById('root') as HTMLElement | null;
    const shadow = host && (host as any).shadowRoot as ShadowRoot | undefined;
    if (shadow) {
      const appRoot = shadow.getElementById('app-root') as HTMLElement | null;
      return appRoot ?? undefined;
    }
    return undefined;
  };

  const touchBackendOptions = {
    enableMouseEvents: true,
    delayTouchStart: 50,
    rootElement: getRootElement(),
  } as any;

  // Select the appropriate backend
  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;
  const backendOptions = isTouchDevice() ? touchBackendOptions : { rootElement: getRootElement() } as any;

  return (
    <ReactDndProvider backend={backend} options={backendOptions}>
      {children}
    </ReactDndProvider>
  );
};

export default DndProvider; 