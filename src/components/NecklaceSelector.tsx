import React, { useRef, useState, useEffect } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { isBandanaProduct, HoleCount, getProductTypeLabel } from '../types';
import '../styles/NecklaceSelector.scss';
import { toThumbWebpUrl } from '../utils/images';

const NecklaceSelector: React.FC = () => {
  const { products, selectedProduct, selectProduct, selectedHoleCount, setSelectedHoleCount } = useCustomizer();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const isDraggingRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const [dragging, setDragging] = useState(false);
  const inStockVariationIds = (window.pomponnettesData?.stock?.inStockVariationIds || []) as number[];

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
  }, [products]); // Re-run when products change

  const scrollByAmount = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const amount = Math.max(200, Math.floor(container.clientWidth * 0.8));
    container.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  // Desktop drag-to-scroll using pointer events (mouse only)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return; // Keep native touch scroll on mobile/tablet
    if (e.button !== 0) return; // only left click
    const container = scrollContainerRef.current;
    if (!container) return;
    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    scrollStartLeftRef.current = container.scrollLeft;
    // Do NOT set pointer capture yet; wait until threshold is exceeded
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!isPointerDownRef.current || !container) return;
    const dx = e.clientX - startXRef.current;
    const threshold = 10;

    // Only start dragging after exceeding threshold
    if (!isDraggingRef.current) {
      if (Math.abs(dx) >= threshold) {
        isDraggingRef.current = true;
        hasDraggedRef.current = true;
        setDragging(true);
        try { container.setPointerCapture(e.pointerId); } catch {}
      } else {
        return; // ignore tiny movements; keep clickability
      }
    }
    container.scrollLeft = scrollStartLeftRef.current - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current && !isDraggingRef.current) return;
    isPointerDownRef.current = false;
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setDragging(false);
    }
    const container = scrollContainerRef.current;
    try { container?.releasePointerCapture(e.pointerId); } catch {}
  };

  // Get step 1 label based on product type
  const getStep1Label = () => {
    const productType = getProductTypeLabel(selectedProduct);
    return `ÉTAPE 1: CHOISIS TON ${productType.toUpperCase()}`;
  };

  return (
    <div className="necklace-selector">
      <h3>{getStep1Label()}</h3>
      <div className="carousel-container">
        {/* Left arrow - only visible on mobile when can scroll left */}
        <div className={`scroll-arrow left-arrow ${showLeftArrow ? 'visible' : ''}`} onClick={() => scrollByAmount('left')}>
          ←
        </div>
        
        <div
          className={`necklace-options ${dragging ? 'dragging' : ''}`}
          ref={scrollContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
        >
          {products.map((product) => {
            const isBandana = isBandanaProduct(product);
            const candidateVariationIds: number[] = isBandana
              ? Object.values(product.variationIdsByHoleCount).filter((v): v is number => typeof v === 'number')
              : [product.variationId];
            const wideAvailable = !isBandana || candidateVariationIds.some(id => inStockVariationIds.includes(id));
            return (
              <div
                key={product.id}
                className={`necklace-option ${selectedProduct?.id === product.id ? 'selected' : ''} ${!wideAvailable ? 'oos' : ''}`}
                onClick={(e) => {
                  if (hasDraggedRef.current) { e.preventDefault(); return; }
                  selectProduct(product.id);
                }}
              >
                <div className="image-wrap">
                  <img 
                    src={toThumbWebpUrl(product.imagePath)} 
                    alt={product.name} 
                    loading="lazy" 
                    decoding="async"
                    onError={(e) => { e.currentTarget.src = product.imagePath; }}
                  />
                  {!wideAvailable && (
                    <div className="oos-badge">Rupture de stock</div>
                  )}
                </div>
                <div className="necklace-info">
                  <p className="necklace-name">{product.name}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Right arrow - only visible on mobile when can scroll right */}
        <div className={`scroll-arrow right-arrow ${showRightArrow ? 'visible' : ''}`} onClick={() => scrollByAmount('right')}>
          →
        </div>
      </div>

      {/* Step 2 - hole count selection (bandanas only) */}
      {isBandanaProduct(selectedProduct) && (
        <div className="hole-count-selector">
          <h3>ÉTAPE 2: CHOISIS TON NOMBRE DE CHARMS</h3>
          <div className="hole-count-buttons">
            {([1, 3, 5, 7] as HoleCount[]).map((count) => (
              <button
                key={count}
                type="button"
                className={`hole-count-button ${selectedHoleCount === count ? 'selected' : ''}`}
                onClick={() => setSelectedHoleCount(count)}
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
