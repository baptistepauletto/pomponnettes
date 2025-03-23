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
  const touchBackendOptions = {
    enableMouseEvents: true, // Allow mouse events for testing on desktop
    delayTouchStart: 50, // Small delay to distinguish between tap and drag
  };

  // Select the appropriate backend
  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;
  const backendOptions = isTouchDevice() ? touchBackendOptions : {};

  return (
    <ReactDndProvider backend={backend} options={backendOptions}>
      {children}
    </ReactDndProvider>
  );
};

export default DndProvider; 