import React, { useState, useRef, useEffect } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import '../styles/CharmDrawer.scss';
import { toThumbWebpUrl } from '../utils/images';
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
  const [recentlyUsedCharmIds, setRecentlyUsedCharmIds] = useState<string[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasSelectedCharm, setHasSelectedCharm] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const hasPlayedScrollHint = useRef(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Extract unique categories on component mount and update with Recently Used
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(charms.map(charm => charm.category || 'Other')));
    // Add "All Charms" and "Recently Used" as categories
    const allCategories = ['All Charms', 'Recently Used', ...uniqueCategories];
    setCategories(allCategories);
    // Select "All Charms" by default
    setSelectedCategory('All Charms');
  }, [charms]);
  
  // Update recently used charms when placedCharms changes
  useEffect(() => {
    if (placedCharms && placedCharms.length > 0) {
      // Create a set of unique charm IDs from current and previous placements
      const uniqueIds = new Set([...recentlyUsedCharmIds]);
      
      // Add all charm IDs from the current placements
      placedCharms.forEach(placedCharm => {
        if (placedCharm.charmId) {
          uniqueIds.add(placedCharm.charmId);
        }
      });
      
      // Convert back to array and update state if changed
      const newRecentlyUsedIds = Array.from(uniqueIds);
      if (newRecentlyUsedIds.length !== recentlyUsedCharmIds.length) {
        setRecentlyUsedCharmIds(newRecentlyUsedIds);
      }
    }
  }, [placedCharms, recentlyUsedCharmIds]);
  
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
      
      // When drawer opens for the first time, mark it
      if (isFirstOpen) {
        setIsFirstOpen(false);
        hasPlayedScrollHint.current = false;
      }
      
      // Mark that the user has interacted with the drawer
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    }
  }, [isOpen, setKeepSelectedCharm, hasInteracted, isFirstOpen]);

  // Track horizontal scrolling in the charm grid
  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return;

    const handleScroll = () => {
      if (!hasScrolled && gridElement.scrollLeft > 0) {
        setHasScrolled(true);
      }
    };

    gridElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      gridElement.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);

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
    
    // Once a charm is selected, stop the scroll hint animation
    if (!hasScrolled) {
      setHasScrolled(true);
    }
  };

  // Get filtered charms based on selected category
  const getFilteredCharms = () => {
    if (selectedCategory === 'All Charms') {
      return charms;
    } else if (selectedCategory === 'Recently Used') {
      return charms.filter(charm => recentlyUsedCharmIds.includes(charm.id));
    } else {
      return charms.filter(charm => (charm.category || 'Other') === selectedCategory);
    }
  };

  // Check if a charm is currently placed on any necklace
  const isCharmPlaced = (charmId: string) => {
    if (!placedCharms || placedCharms.length === 0) return false;
    return placedCharms.some(placedCharm => placedCharm.charmId === charmId);
  };

  const filteredCharms = getFilteredCharms();

  return (
    <div 
      className={`charm-drawer-container ${isOpen ? 'open' : 'closed'} ${(!hasScrolled && !hasSelectedCharm && isOpen) ? 'first-time' : ''}`}
      ref={drawerRef}
    >
      {isOpen && !selectedCharmId && !hasSelectedCharm && (
        <div className="charm-selection-instructions">
          <div className="instruction-text">
            CHOISIS UN CHARM DANS LE TIROIR
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
          {isOpen ? 'TAP POUR ADMIRER TON BANDANA' : 'ÉTAPE 3: TAP POUR CHOISIR TES CHARMS'}
        </div>
      </div>
      
      <div className="charm-drawer-content">
        {/* Category tabs */}
        <div className="category-tabs">
          {categories.map(category => (
            <div 
              key={category}
              className={`category-tab ${category === selectedCategory ? 'active' : ''} ${category === 'Recently Used' ? 'recent-tab' : ''}`}
              onClick={() => !isAnimating && setSelectedCategory(category)}
            >
              {category === 'All Charms' 
                ? '✨ Tous' 
                : category === 'Recently Used' 
                  ? '🕒 Vus récents' 
                  : category}
            </div>
          ))}
        </div>
        
        {/* Display empty state for Recently Used category when empty */}
        {selectedCategory === 'Recently Used' && recentlyUsedCharmIds.length === 0 && (
          <div className="empty-recently-used">
            Vous n'avez pas encore placé aucun charm.
          </div>
        )}
        
        {/* Charms grid */}
        {!(selectedCategory === 'Recently Used' && recentlyUsedCharmIds.length === 0) && (
          <div className="charm-grid" ref={gridRef}>
            {filteredCharms.map(charm => (
              <div 
                key={charm.id}
                className={`charm-item ${charm.id === selectedCharmId ? 'selected' : ''} ${isCharmPlaced(charm.id) ? 'placed' : ''}`}
                onClick={() => handleCharmSelect(charm.id)}
              >
                <img 
                  src={toThumbWebpUrl(charm.imagePath)} 
                  alt={charm.name} 
                  loading="lazy" 
                  decoding="async"
                  onError={(e) => { e.currentTarget.src = charm.imagePath; }}
                />
                {isCharmPlaced(charm.id) && <div className="placed-badge"></div>}
                <div className="size-indicator">
                  {charm.sizeMark}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharmDrawer; 