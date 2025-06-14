import React, { useRef, useState, useEffect } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { useDraggableCharm } from '../hooks/useDragAndDrop';
import { useTapToPlace, isTouchDevice } from '../hooks/useTapToPlace';
import '../styles/CharmSelector.scss';

const CharmOption: React.FC<{ id: string; name: string; imagePath: string; sizeScale: number }> = ({
  id,
  name,
  imagePath,
  sizeScale,
}) => {
  const { isDragging, drag } = useDraggableCharm(id);
  const { selectCharm, isCharmSelected, clearSelectedAttachmentPoint } = useTapToPlace();
  const isSelected = isCharmSelected(id);
  const isMobile = isTouchDevice();
  const ref = useRef<HTMLDivElement>(null);

  // Apply the drag ref to the element
  drag(ref);

  // Handle tap on mobile
  const handleTap = () => {
    // Clear any selected attachment point when choosing a charm
    clearSelectedAttachmentPoint();
    
    if (isMobile) {
      selectCharm(id);
    }
  };

  return (
    <div
      ref={ref}
      className={`charm-option ${isDragging ? 'dragging' : ''} ${isSelected ? 'selected' : ''}`}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      onClick={handleTap}
    >
      <img src={imagePath} alt={name} />
      <div className="size-indicator">
        {sizeScale <= 1 ? 'S' : 
         sizeScale <= 1.4 ? 'M' : 
         sizeScale <= 1.85 ? 'L' : 'XL'}
      </div>
      <p>{name}</p>
    </div>
  );
};

const CharmSelector: React.FC = () => {
  const { charms, placedCharms } = useCustomizer();
  const { selectedCharmId } = useTapToPlace();
  const isMobile = isTouchDevice();
  
  // Category management state (desktop only)
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [recentlyUsedCharmIds, setRecentlyUsedCharmIds] = useState<string[]>([]);

  // Extract unique categories on component mount
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(charms.map(charm => charm.category || 'Other')));
    const allCategories = ['All Charms', 'Recently Used', ...uniqueCategories];
    setCategories(allCategories);
    setSelectedCategory('All Charms');
  }, [charms]);

  // Track recently used charms based on placed charms
  useEffect(() => {
    const currentCharmIds = placedCharms.map(placedCharm => placedCharm.charmId);
    const newRecentIds = [...new Set([...currentCharmIds, ...recentlyUsedCharmIds])].slice(0, 10);
    
    if (JSON.stringify(newRecentIds) !== JSON.stringify(recentlyUsedCharmIds)) {
      setRecentlyUsedCharmIds(newRecentIds);
    }
  }, [placedCharms, recentlyUsedCharmIds]);

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

  const filteredCharms = getFilteredCharms();
  const showEmptyRecentlyUsed = selectedCategory === 'Recently Used' && recentlyUsedCharmIds.length === 0;

  return (
    <div className="charm-selector">
      <h3>Select a Charm</h3>
      
      {/* Category tabs for desktop only */}
      {!isMobile && (
        <div className="category-tabs">
          {categories.map(category => (
            <div 
              key={category}
              className={`category-tab ${category === selectedCategory ? 'active' : ''} ${category === 'Recently Used' ? 'recent-tab' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'All Charms' 
                ? '✨ All' 
                : category === 'Recently Used' 
                  ? '🕒 Recent' 
                  : category}
            </div>
          ))}
        </div>
      )}

      {/* Empty state for Recently Used */}
      {!isMobile && showEmptyRecentlyUsed && (
        <div className="empty-recently-used">
          No charms have been used yet
        </div>
      )}

      {/* Charms grid */}
      {!showEmptyRecentlyUsed && (
        <div className="charm-options">
          {filteredCharms.map((charm) => (
            <CharmOption
              key={charm.id}
              id={charm.id}
              name={charm.name}
              imagePath={charm.imagePath}
              sizeScale={charm.sizeScale}
            />
          ))}
        </div>
      )}

      <p className="instructions">
        {isMobile ? 
          (selectedCharmId ? 
            "Now tap an attachment point on the necklace" : 
            "Tap a charm to select it"
          ) : 
          "Drag and drop charms onto the necklace"
        }
      </p>
    </div>
  );
};

export default CharmSelector; 