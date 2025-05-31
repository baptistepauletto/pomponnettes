import React, { useRef, useState, useEffect } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { triggerHapticFeedback } from '../hooks/useTapToPlace';
import '../styles/NecklaceSelector.scss';

const NecklaceSelector: React.FC = () => {
  const { necklaces, selectedNecklace, selectNecklace } = useCustomizer();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Touch/swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // Minimum swipe distance to trigger navigation (in pixels)
  const minSwipeDistance = 50;

  // Handle scroll buttons
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust as needed
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Navigate to next/previous necklace
  const navigateNecklace = (direction: 'next' | 'prev') => {
    if (!selectedNecklace) return;
    
    const currentIndex = necklaces.findIndex(n => n.id === selectedNecklace.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex + 1 >= necklaces.length ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex - 1 < 0 ? necklaces.length - 1 : currentIndex - 1;
    }
    
    selectNecklace(necklaces[newIndex].id);
    
    // Provide haptic feedback for successful navigation
    triggerHapticFeedback('light');
    
    // Scroll the new necklace into view
    setTimeout(() => {
      const container = scrollContainerRef.current;
      if (container) {
        const necklaceElements = container.children;
        const targetElement = necklaceElements[newIndex] as HTMLElement;
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }
      }
    }, 50);
  };

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !isSwiping) {
      setIsSwiping(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      navigateNecklace('next');
    } else if (isRightSwipe) {
      navigateNecklace('prev');
    }
    
    setIsSwiping(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Prevent default touch behavior on the container to avoid conflicts
  const onTouchStartContainer = (e: React.TouchEvent) => {
    // Only prevent default if we're starting a potential swipe
    if (e.touches.length === 1) {
      onTouchStart(e);
    }
  };

  return (
    <div className="necklace-selector">
      <h3>Choose Your Necklace</h3>
      <div className="carousel-container">
        <button 
          className="carousel-button left" 
          onClick={() => scrollCarousel('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>
        
        <div 
          className="necklace-options" 
          ref={scrollContainerRef}
          onTouchStart={onTouchStartContainer}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {necklaces.map((necklace) => (
            <div
              key={necklace.id}
              className={`necklace-option ${selectedNecklace?.id === necklace.id ? 'selected' : ''} ${isSwiping ? 'swiping' : ''}`}
              onClick={() => !isSwiping && selectNecklace(necklace.id)}
            >
              <img src={necklace.imagePath} alt={necklace.name} />
              <p>{necklace.name}</p>
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-button right" 
          onClick={() => scrollCarousel('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default NecklaceSelector; 