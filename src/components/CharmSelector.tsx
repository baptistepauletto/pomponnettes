import React, { useRef, useState, useEffect } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { useDraggableCharm } from '../hooks/useDragAndDrop';
import { useTapToPlace, isTouchDevice } from '../hooks/useTapToPlace';
import '../styles/CharmSelector.scss';
import { toThumbWebpUrl } from '../utils/images';
import { includesNormalized, startsWithNormalized } from '../utils/text';

const CharmOption: React.FC<{ id: string; name: string; imagePath: string; sizeMark: string }> = ({
  id,
  name,
  imagePath,
  sizeMark,
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
      <img 
        src={toThumbWebpUrl(imagePath)} 
        alt={name} 
        loading="lazy" 
        decoding="async"
        onError={(e) => { e.currentTarget.src = imagePath; }}
      />
      <div className="size-indicator">
        {sizeMark}
      </div>
      <p>{name}</p>
    </div>
  );
};

const CharmSelector: React.FC = () => {
  const { charms, placedCharms } = useCustomizer();
  const isMobile = isTouchDevice();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
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

  // Debounce query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Track recently used charms based on placed charms
  useEffect(() => {
    const currentCharmIds = placedCharms.map(placedCharm => placedCharm.charmId);
    const newRecentIds = [...new Set([...currentCharmIds, ...recentlyUsedCharmIds])].slice(0, 10);
    
    if (JSON.stringify(newRecentIds) !== JSON.stringify(recentlyUsedCharmIds)) {
      setRecentlyUsedCharmIds(newRecentIds);
    }
  }, [placedCharms, recentlyUsedCharmIds]);

  // Global search when query present, otherwise filter by category
  const getFilteredCharms = () => {
    const base = debouncedQuery ? charms : (
      selectedCategory === 'All Charms' ? charms :
      selectedCategory === 'Recently Used' ? charms.filter(c => recentlyUsedCharmIds.includes(c.id)) :
      charms.filter(c => (c.category || 'Other') === selectedCategory)
    );
    if (!debouncedQuery) return base;
    const q = debouncedQuery;
    // score: name includes +2, startsWith +1, keyword +1, current category +1, recently used +1.5
    const score = (c: typeof charms[number]): number => {
      let s = 0;
      if (includesNormalized(c.name, q)) s += 2;
      if (startsWithNormalized(c.name, q)) s += 1;
      if ((c.keywords || []).some(k => includesNormalized(k, q))) s += 1;
      if (selectedCategory && selectedCategory !== 'All Charms' && selectedCategory !== 'Recently Used' && (c.category || 'Other') === selectedCategory) s += 1;
      if (recentlyUsedCharmIds.includes(c.id)) s += 1.5;
      return s;
    };
    return base
      .filter(c => score(c) > 0)
      .sort((a, b) => {
        const sa = score(a);
        const sb = score(b);
        if (sb !== sa) return sb - sa;
        return a.name.localeCompare(b.name);
      });
  };

  const filteredCharms = getFilteredCharms();
  const showEmptyRecentlyUsed = selectedCategory === 'Recently Used' && recentlyUsedCharmIds.length === 0;

  return (
    <div className="charm-selector">
      <h3>ÉTAPE 3: PLACE TES CHARMS</h3>
      
      {/* Search + Category tabs for desktop only */}
      {!isMobile && (
        <>
          <div className="charm-search">
            <span className="icon">🔎</span>
            <input
              type="text"
              placeholder="Rechercher un charm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>
          <div className="category-tabs">
            {categories.map(category => (
              <div 
                key={category}
                className={`category-tab ${category === selectedCategory ? 'active' : ''} ${category === 'Recently Used' ? 'recent-tab' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'All Charms' 
                  ? '✨ Tous' 
                  : category === 'Recently Used' 
                    ? '🕒 Vus récents' 
                    : category}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty state for Recently Used */}
      {!isMobile && showEmptyRecentlyUsed && (
        <div className="empty-recently-used">
          Vous n'avez pas encore placé aucun charm.
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
              sizeMark={charm.sizeMark || 'M'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CharmSelector; 