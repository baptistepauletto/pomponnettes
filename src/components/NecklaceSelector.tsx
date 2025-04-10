import React, { useRef } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import '../styles/NecklaceSelector.scss';

const NecklaceSelector: React.FC = () => {
  const { necklaces, selectedNecklace, selectNecklace } = useCustomizer();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        
        <div className="necklace-options" ref={scrollContainerRef}>
          {necklaces.map((necklace) => (
            <div
              key={necklace.id}
              className={`necklace-option ${selectedNecklace?.id === necklace.id ? 'selected' : ''}`}
              onClick={() => selectNecklace(necklace.id)}
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