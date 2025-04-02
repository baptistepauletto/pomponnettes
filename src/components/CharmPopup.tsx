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
  onCharmSelect?: (charmId: string | null) => void;
}> = ({ position, onClose, onCharmSelect }) => {
  const { charms } = useCustomizer();
  const { selectedAttachmentPointId, clearAllSelections } = useTapToPlace();
  const { addCharm } = useCustomizer();
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedCharmId, setSelectedCharmId] = useState<string | null>(null);

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

  // Notify parent when selectedCharmId changes
  useEffect(() => {
    if (onCharmSelect) {
      onCharmSelect(selectedCharmId);
    }
  }, [selectedCharmId, onCharmSelect]);

  // Handle charm selection
  const handleCharmClick = (charmId: string) => {
    const isMobile = window.innerWidth <= 480;
    
    if (isMobile) {
      // On mobile, toggle charm selection
      setSelectedCharmId(prevId => prevId === charmId ? null : charmId);
      return;
    }
    
    // On desktop, place charm immediately if attachment point is selected
    if (selectedAttachmentPointId) {
      addCharm(charmId, selectedAttachmentPointId);
      clearAllSelections();
      onClose();
    }
  };

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

  const isMobile = window.innerWidth <= 480;

  return (
    <div 
      className={`charm-popup ${isMobile ? 'mobile' : ''}`} 
      ref={popupRef}
      style={isMobile ? undefined : {
        left: `${position?.x}%`,
        top: `${position?.y}%`,
      }}
    >
      <div className="charm-popup-header">
        <h3>{isMobile ? 'Pick a Charm' : 'Select a Charm'}</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="charm-grid">
        {filteredCharms.map(charm => (
          <button 
            key={charm.id} 
            className={`charm-item ${selectedCharmId === charm.id ? 'selected' : ''}`}
            onClick={() => handleCharmClick(charm.id)}
            aria-label={charm.name}
          >
            <img src={charm.imagePath} alt={charm.name} />
            {selectedCharmId === charm.id && isMobile && (
              <div className="selected-indicator">✓</div>
            )}
          </button>
        ))}
      </div>
      
      {/* Add an instruction if a charm is selected on mobile */}
      {isMobile && selectedCharmId && (
        <div className="mobile-instruction">
          Tap on the necklace to place this charm
        </div>
      )}
      
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