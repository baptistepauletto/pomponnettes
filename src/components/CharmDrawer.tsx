import React, { useState, useRef, useEffect } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import '../styles/CharmDrawer.scss';
import { useTapToPlace } from '../hooks/useTapToPlace';

interface CharmDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const CharmDrawer: React.FC<CharmDrawerProps> = ({ isOpen, onOpenChange }) => {
  const { charms, placedCharms } = useCustomizer();
  const { selectCharm, selectedCharmId, setKeepSelectedCharm, forceCleanupSelections } = useTapToPlace();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasSelectedCharm, setHasSelectedCharm] = useState(false);
  
  // Extract unique categories on component mount
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(charms.map(charm => charm.category || 'Other')));
    // Add "All Charms" as the first category
    const allCategories = ['All Charms', ...uniqueCategories];
    setCategories(allCategories);
    // Select "All Charms" by default
    setSelectedCategory('All Charms');
  }, [charms]);
  
  // Prevent actions during animation
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Exactly match the CSS animation duration
      
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);
  
  // Set keepSelectedCharm to true when drawer opens
  useEffect(() => {
    if (isOpen) {
      setKeepSelectedCharm(true);
      
      // Mark that the user has interacted with the drawer
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    }
  }, [isOpen, setKeepSelectedCharm, hasInteracted]);

  // Handle drawer state changes with animation lock
  const handleDrawerStateChange = (newIsOpen: boolean) => {
    if (isAnimating) return; // Prevent action during animation
    
    setIsAnimating(true);
    
    // Mark that the user has interacted with the drawer
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    if (!newIsOpen && isOpen) {
      // When closing the drawer, force clear all selections unconditionally 
      forceCleanupSelections();
      setKeepSelectedCharm(false);
    } else if (newIsOpen && !isOpen) {
      // When opening the drawer, set keepSelectedCharm to true
      setKeepSelectedCharm(true);
    }
    
    // Update drawer open state
    onOpenChange(newIsOpen);
  };
  
  // Handle swipe down on the drawer when it's open - simplified to avoid glitches
  const handleSwipeDown = (e: React.TouchEvent) => {
    if (!isOpen || isAnimating) return;
    
    const touch = e.touches[0];
    const startY = touch.clientY;
    let moved = false;
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const currentY = moveEvent.touches[0].clientY;
      const deltaY = currentY - startY;
      
      if (deltaY > 30) {
        moved = true;
      }
    };
    
    const handleTouchEnd = () => {
      if (moved) {
        handleDrawerStateChange(false);
      }
      cleanup();
    };
    
    const cleanup = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  };
  
  // Handle swipe up on the handle when drawer is closed - simplified
  const handleSwipeUp = (e: React.TouchEvent) => {
    if (isOpen || isAnimating) return;
    
    const touch = e.touches[0];
    const startY = touch.clientY;
    let moved = false;
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const currentY = moveEvent.touches[0].clientY;
      const deltaY = currentY - startY;
      
      if (deltaY < -30) {
        moved = true;
      }
    };
    
    const handleTouchEnd = () => {
      if (moved) {
        handleDrawerStateChange(true);
      }
      cleanup();
    };
    
    const cleanup = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  };

  // Handle charm selection
  const handleCharmSelect = (charmId: string) => {
    if (isAnimating) return;
    selectCharm(charmId);
    
    // Remember that the user has selected a charm at least once
    if (!hasSelectedCharm) {
      setHasSelectedCharm(true);
    }
  };

  // Get filtered charms based on selected category
  const filteredCharms = selectedCategory === 'All Charms'
    ? charms
    : charms.filter(charm => (charm.category || 'Other') === selectedCategory);
    
  // Check if a charm is already placed on the necklace
  const isCharmPlaced = (charmId: string) => {
    return placedCharms.some(placedCharm => placedCharm.charmId === charmId);
  };

  return (
    <div 
      className={`charm-drawer-container ${isOpen ? 'open' : 'closed'} ${!hasInteracted ? 'first-time' : ''}`}
      ref={drawerRef}
    >
      {isOpen && !selectedCharmId && !hasSelectedCharm && (
        <div className="charm-selection-instructions">
          <div className="instruction-text">
            👇 Select a charm from the drawer below
          </div>
        </div>
      )}
      
      <div 
        className="charm-drawer-handle"
        onClick={() => handleDrawerStateChange(!isOpen)}
        onTouchStart={isOpen ? handleSwipeDown : handleSwipeUp}
      >
        <div className="handle-bar"></div>
        <div className="handle-text">
          {isOpen ? 'Tap to stop editing' : 'Tap to open charms drawer'}
        </div>
      </div>
      
      <div className="charm-drawer-content">
        {/* Category tabs */}
        <div className="category-tabs">
          {categories.map(category => (
            <div 
              key={category}
              className={`category-tab ${category === selectedCategory ? 'active' : ''}`}
              onClick={() => !isAnimating && setSelectedCategory(category)}
            >
              {category === 'All Charms' ? '✨ All' : category}
            </div>
          ))}
        </div>
        
        {/* Charms grid */}
        <div className="charm-grid">
          {filteredCharms.map(charm => {
            const isPlaced = isCharmPlaced(charm.id);
            return (
              <div 
                key={charm.id}
                className={`charm-item ${charm.id === selectedCharmId ? 'selected' : ''} ${isPlaced ? 'placed' : ''}`}
                onClick={() => handleCharmSelect(charm.id)}
              >
                <img src={charm.imagePath} alt={charm.name} />
                {isPlaced && <div className="placed-badge"></div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharmDrawer;