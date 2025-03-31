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
  const popupWidth = isMobile ? 220 : 280; // Smaller width on mobile
  const popupHeight = isMobile ? 320 : 400; // Smaller height on mobile
  
  // Start with the position near the attachment point
  let leftPos = `${position.x}%`;
  let topPos = `${position.y}%`;

  // Convert percentage to pixels (approximate)
  const containerElement = document.querySelector('.necklace-container');
  if (containerElement) {
    const containerRect = containerElement.getBoundingClientRect();
    const pointX = containerRect.left + (containerRect.width * position.x / 100);
    const pointY = containerRect.top + (containerRect.height * position.y / 100);
    
    // Check if popup would go off-screen and adjust accordingly
    const bodyRect = document.body.getBoundingClientRect();
    
    // Handle horizontal positioning
    if (pointX + popupWidth > bodyRect.right) {
      leftPos = `calc(${position.x}% - ${popupWidth}px)`;
    } else if (pointX - 20 < bodyRect.left) {
      // Ensure the popup isn't too far left
      leftPos = `calc(${position.x}% + 10px)`;
    }
    
    // Handle vertical positioning
    if (pointY + popupHeight > bodyRect.bottom) {
      topPos = `calc(${position.y}% - ${popupHeight/2}px)`;
    } else if (pointY - popupHeight/2 < bodyRect.top) {
      // Ensure the popup isn't too far up
      topPos = `calc(${position.y}% + ${popupHeight/4}px)`;
    }
    
    // Additional mobile-specific adjustments
    if (isMobile) {
      // Center more horizontally on mobile if possible
      const centerX = containerRect.width / 2;
      const pointXRelative = containerRect.width * position.x / 100;
      
      // If attachment point is near center, center the popup
      if (Math.abs(pointXRelative - centerX) < centerX * 0.3) {
        leftPos = `calc(50% - ${popupWidth/2}px)`;
      }
    }
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