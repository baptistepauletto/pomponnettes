import React, { useRef, useState, useEffect } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import '../styles/NecklaceSelector.scss';
import { toThumbWebpUrl } from '../utils/images';

const NecklaceSelector: React.FC = () => {
  const { necklaces, selectedNecklace, selectNecklace, selectedHoleCount, setSelectedHoleCount } = useCustomizer();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Check scroll position and update arrow visibility
  const updateArrowVisibility = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    
    // Show left arrow if we can scroll left
    setShowLeftArrow(scrollLeft > 0);
    
    // Show right arrow if we can scroll right (with small tolerance for rounding)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Set up scroll listener and initial check
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initial check
    updateArrowVisibility();

    // Add scroll listener
    container.addEventListener('scroll', updateArrowVisibility);
    
    // Also check on resize in case container size changes
    window.addEventListener('resize', updateArrowVisibility);

    return () => {
      container.removeEventListener('scroll', updateArrowVisibility);
      window.removeEventListener('resize', updateArrowVisibility);
    };
  }, [necklaces]); // Re-run when necklaces change

  return (
    <div className="necklace-selector">
      <h3>ÉTAPE 1: CHOISIS TON BANDANA</h3>
      <div className="carousel-container">
        {/* Left arrow - only visible on mobile when can scroll left */}
        <div className={`scroll-arrow left-arrow ${showLeftArrow ? 'visible' : ''}`}>
          ←
        </div>
        
        <div className="necklace-options" ref={scrollContainerRef}>
          {necklaces.map((necklace) => (
            <div
              key={necklace.id}
              className={`necklace-option ${selectedNecklace?.id === necklace.id ? 'selected' : ''}`}
              onClick={() => selectNecklace(necklace.id)}
            >
              <img 
                src={toThumbWebpUrl(necklace.imagePath)} 
                alt={necklace.name} 
                loading="lazy" 
                decoding="async"
                onError={(e) => { e.currentTarget.src = necklace.imagePath; }}
              />
              <div className="necklace-info">
                <p className="necklace-name">{necklace.name}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Right arrow - only visible on mobile when can scroll right */}
        <div className={`scroll-arrow right-arrow ${showRightArrow ? 'visible' : ''}`}>
          →
        </div>
      </div>

      {/* Step 2 - hole count selection (bandanas only) */}
      {selectedNecklace && selectedNecklace.name.toLowerCase().includes('bandana') && (
        <div className="hole-count-selector">
          <h3>ÉTAPE 2: SÉLECTIONNE TON NOMBRE DE CHARMS</h3>
          <div className="hole-count-buttons">
            {[1, 3, 5, 7].map((count) => (
              <button
                key={count}
                type="button"
                className={`hole-count-button ${selectedHoleCount === count ? 'selected' : ''}`}
                onClick={() => setSelectedHoleCount(count as 1 | 3 | 5 | 7)}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NecklaceSelector;