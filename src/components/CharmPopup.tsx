import React, { useState, useRef, useEffect } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { useTapToPlace } from '../hooks/useTapToPlace';
import '../styles/CharmPopup.scss';

// Type for charm categories
type CharmCategory = {
  id: string;
  name: string;
  icon: string;
};

const CharmPopup: React.FC<{
  position: { x: number; y: number } | null;
  onClose: () => void;
}> = ({ position, onClose }) => {
  const { charms } = useCustomizer();
  const { selectedAttachmentPointId, clearAllSelections } = useTapToPlace();
  const { addCharm } = useCustomizer();
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Define charm categories
  const categories: CharmCategory[] = [
    { id: 'all', name: 'All', icon: '🔍' },
    { id: 'popular', name: 'Popular', icon: '⭐' },
    { id: 'animals', name: 'Animals', icon: '🐾' },
    { id: 'symbols', name: 'Symbols', icon: '❤️' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
  ];

  // Set default active category
  useEffect(() => {
    if (!activeCategory) {
      setActiveCategory('all');
    }
  }, [activeCategory]);

  // Handle click outside to close the popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle charm selection
  const handleCharmClick = (charmId: string) => {
    if (selectedAttachmentPointId) {
      addCharm(charmId, selectedAttachmentPointId);
      clearAllSelections();
      onClose();
    }
  };

  if (!position) return null;

  // Filter charms by category (placeholder - would need real categories in charm data)
  const filteredCharms = activeCategory === 'all' 
    ? charms 
    : charms.filter(charm => {
        // This is a placeholder. In a real app, charms would have a category property
        const randomBool = (charmId: string): boolean => {
          const hash = charmId.split('').reduce((a: number, b: string) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
          }, 0);
          return Math.abs(hash) % categories.length === categories.findIndex(c => c.id === activeCategory);
        };
        return randomBool(charm.id);
      });

  // Calculate position to ensure popup stays within viewport
  const isMobile = window.innerWidth <= 480;
  const popupWidth = isMobile ? 170 : 280; // Updated smaller width for mobile
  const popupHeight = isMobile ? 260 : 400; // Updated smaller height for mobile
  
  // Calculate initial position based on the attachment point
  let leftPos = `${position.x}%`;
  let topPos = `${position.y}%`;
  
  // Check if we're on the right side of the necklace to adjust horizontal position
  if (position.x > 50) {
    // If on right side, shift popup to the left of the attachment point
    leftPos = `calc(${position.x}% - ${popupWidth + 20}px)`;
  } else {
    // If on left side, shift popup to the right of the attachment point
    leftPos = `calc(${position.x}% + 20px)`;
  }
  
  // Center the popup vertically relative to the attachment point
  topPos = `calc(${position.y}% - ${popupHeight / 2}px)`;
  
  // For mobile devices, use a more centered approach
  if (isMobile) {

    
    // Horizontal position - centered with a slight offset based on which side the point is on
    const centerOffset = position.x > 50 ? -20 : 20;
    leftPos = `calc(50% - ${popupWidth/2}px + ${centerOffset}px)`;
    
    // Vertical position - centered in the viewport
    topPos = `calc(50% - ${popupHeight/2}px)`;
  }

  return (
    <div 
      className={`charm-popup ${isMobile ? 'mobile' : ''}`} 
      ref={popupRef}
      style={{
        left: leftPos,
        top: topPos,
      }}
    >
      <div className="charm-popup-header">
        <h3>Select a Charm</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="charm-grid">
        {filteredCharms.map(charm => (
          <button 
            key={charm.id} 
            className="charm-item"
            onClick={() => handleCharmClick(charm.id)}
          >
            <img src={charm.imagePath} alt={charm.name} />
          </button>
        ))}
      </div>
      
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
            title={category.name}
          >
            <span className="category-icon">{category.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharmPopup; 