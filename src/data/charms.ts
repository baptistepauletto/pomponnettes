import { Charm } from '../types';
import { getImagePath } from '../utils/imagePaths';

export const charms: Charm[] = [
  {
    id: 'petite-medaille',
    name: 'Petite Médaille',
    imagePath: getImagePath('images/charms/petite-medaille-0.7cm.png'),
    sizeScale: 0.7,
    sizeMark: 'XS',
    category: '🌞 Médailles',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'sirene',
    name: 'Sirene',
    imagePath: getImagePath('images/charms/sirene-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '🦞 Océan'
  },
  {
    id: 'coeur-moyen',
    name: 'Coeur Moyen',
    imagePath: getImagePath('images/charms/coeur-moyen-1.2cm.png'),
    sizeScale: 1.2,
    sizeMark: 'S',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -10 }
  },
  {
    id: 'croix-couleur',
    name: 'Croix Couleur',
    imagePath: getImagePath('images/charms/croix-couleur-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'croix-diamant',
    name: 'Croix Diamant',
    imagePath: getImagePath('images/charms/croix-diamant-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'arbre-de-vie',
    name: 'Arbre De Vie',
    imagePath: getImagePath('images/charms/arbre-de-vie-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'petit-smiley',
    name: 'Petit Smiley',
    imagePath: getImagePath('images/charms/petit-smiley-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'petit-coeur',
    name: 'Petit Coeur',
    imagePath: getImagePath('images/charms/petit-coeur-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '❤️ Cœurs'
  },
  {
    id: 'petit-trefle',
    name: 'Petit Trefle',
    imagePath: getImagePath('images/charms/petit-trefle-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'glace',
    name: 'Glace',
    imagePath: getImagePath('images/charms/glace-1.6cm.png'),
    sizeScale: 1.5,
    sizeMark: 'L',
    category: '🍒 Nourriture'
  },
  {
    id: 'petite-fraise',
    name: 'Petite Fraise',
    imagePath: getImagePath('images/charms/petite-fraise-1.2cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '🍒 Nourriture'
  },
  {
    id: 'petite-fleur',
    name: 'Petite Fleur',
    imagePath: getImagePath('images/charms/petite-fleur-1.2cm.png'),
    sizeScale: 1.0,
    sizeMark: 'XS',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -10 }
  },
  {
    id: 'etoile',
    name: 'Étoile',
    imagePath: getImagePath('images/charms/etoile-1.2cm.png'),
    sizeScale: 1.1,
    sizeMark: 'S',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -15 }
  },
  {
    id: 'soleil',
    name: 'Soleil',
    imagePath: getImagePath('images/charms/soleil-1.2cm.png'),
    sizeScale: 1.4,
    sizeMark: 'S',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -10 }
  },
  {
    id: 'smiley-moyen',
    name: 'Smiley Moyen',
    imagePath: getImagePath('images/charms/smiley-moyen-1.2cm.png'),
    sizeScale: 1.2,
    sizeMark: 'S',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -10 }
  },
  {
    id: 'medaille-chien',
    name: 'Médaille Chien',
    imagePath: getImagePath('images/charms/medaille-chien-1.2cm.png'),
    sizeScale: 1.2,
    sizeMark: 'S',
    category: '🌞 Médailles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'aigle',
    name: 'Aigle',
    imagePath: getImagePath('images/charms/aigle-1.6cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -25 }
  },
  {
    id: 'oeil-coeur',
    name: 'Oeil Coeur',
    imagePath: getImagePath('images/charms/oeil-coeur-1.5cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -10 }
  },
  {
    id: 'papillon',
    name: 'Papillon',
    imagePath: getImagePath('images/charms/papillon-1.5cm.png'),
    sizeScale: 1.2,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -15 }
  },
  {
    id: 'perroquet',
    name: 'Perroquet',
    imagePath: getImagePath('images/charms/perroquet-1.7cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🐻 Animaux'
  },
  {
    id: 'coquillage',
    name: 'Coquillage',
    imagePath: getImagePath('images/charms/coquillage-1.5cm.png'),
    sizeScale: 1.2,
    sizeMark: 'M',
    category: '🦞 Océan'
  },
  {
    id: 'petite-cerise',
    name: 'Petite Cerise',
    imagePath: getImagePath('images/charms/petite-cerise-1.5cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'petit-nounours',
    name: 'Petit Nounours',
    imagePath: getImagePath('images/charms/petit-nounours-1.5cm.png'),
    sizeScale: 1.2,
    sizeMark: 'S',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'cheval',
    name: 'Cheval',
    imagePath: getImagePath('images/charms/cheval-1.5cm.png'),
    sizeScale: 1.2,
    sizeMark: 'S',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'croissant',
    name: 'Croissant',
    imagePath: getImagePath('images/charms/croissant-1.5cm.png'),
    sizeScale: 1.2,
    sizeMark: 'S',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'ange',
    name: 'Ange',
    imagePath: getImagePath('images/charms/ange-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -15 }
  },
  {
    id: 'chien',
    name: 'Chien',
    imagePath: getImagePath('images/charms/chien-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🐻 Animaux'
  },
  {
    id: 'fer-a-cheval',
    name: 'Fer A Cheval',
    imagePath: getImagePath('images/charms/fer-a-cheval-1.4cm.png'),
    sizeScale: 1.4,
    sizeMark: 'M',
    category: '⭐ Symboles'
  },
  {
    id: 'petit-cadenas',
    name: 'Petit Cadenas',
    imagePath: getImagePath('images/charms/petit-cadenas-1.5cm.png'),
    sizeScale: 1.2,
    sizeMark: 'S',
    category: '⭐ Symboles'
  },
  {
    id: 'medaille-scarabee',
    name: 'Médaille Scarabée',
    imagePath: getImagePath('images/charms/medaille-scarabee-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🌞 Médailles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'lune',
    name: 'Lune',
    imagePath: getImagePath('images/charms/lune-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🌸 Nature'
  },
  {
    id: 'botte-cow-boy',
    name: 'Botte Cow Boy',
    imagePath: getImagePath('images/charms/botte-cow-boy-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '✈️ Voyage',
    attachmentOffset: { x: -10, y: -7 }
  },
  {
    id: 'etoile-de-mer',
    name: 'Étoile De Mer',
    imagePath: getImagePath('images/charms/etoile-de-mer-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 5, y: -7 }
  },
  {
    id: 'fleur',
    name: 'Fleur',
    imagePath: getImagePath('images/charms/fleur-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'main-de-fatma',
    name: 'Main De Fatma',
    imagePath: getImagePath('images/charms/main-de-fatma-1.8cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'medaille-coquillage',
    name: 'Médaille Coquillage',
    imagePath: getImagePath('images/charms/medaille-coquillage-1.7cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🌞 Médailles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'petit-coeur-sacre',
    name: 'Petit Coeur Sacre',
    imagePath: getImagePath('images/charms/petit-coeur-sacre-1.7cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'eclair',
    name: 'Éclair',
    imagePath: getImagePath('images/charms/eclair-1.8cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'serpent',
    name: 'Serpent',
    imagePath: getImagePath('images/charms/serpent-1.8cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'cocktail',
    name: 'Cocktail',
    imagePath: getImagePath('images/charms/cocktail-1.8cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'escargot',
    name: 'Escargot',
    imagePath: getImagePath('images/charms/escargot-1.8cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -10 }
  },
  {
    id: 'medaille-abeille',
    name: 'Médaille Abeille',
    imagePath: getImagePath('images/charms/medaille-abeille-1.8cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🌞 Médailles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'poisson-ange',
    name: 'Poisson Ange',
    imagePath: getImagePath('images/charms/poisson-ange-1.8cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: -5, y: -5 }
  },
  {
    id: 'coeur-diable',
    name: 'Coeur Diable',
    imagePath: getImagePath('images/charms/coeur-diable-1.8cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 15, y: -10 }
  },
  {
    id: 'coeur',
    name: 'Coeur',
    imagePath: getImagePath('images/charms/coeur-1.8cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'cadenas',
    name: 'Cadenas',
    imagePath: getImagePath('images/charms/cadenas-1.8cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'coquille',
    name: 'Coquille',
    imagePath: getImagePath('images/charms/coquille-1.7cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'medaille-coeur',
    name: 'Médaille Coeur',
    imagePath: getImagePath('images/charms/medaille-coeur-1.7cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🌞 Médailles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'abeille',
    name: 'Abeille',
    imagePath: getImagePath('images/charms/abeille-1.6cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -15 }
  },
  {
    id: 'palmier',
    name: 'Palmier',
    imagePath: getImagePath('images/charms/palmier-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'cactus',
    name: 'Cactus',
    imagePath: getImagePath('images/charms/cactus-1.8cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'croix',
    name: 'Croix',
    imagePath: getImagePath('images/charms/croix-1.9cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -8 }
  },
  {
    id: 'planche-de-surf',
    name: 'Planche De Surf',
    imagePath: getImagePath('images/charms/planche-de-surf-1.8cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'avion',
    name: 'Avion',
    imagePath: getImagePath('images/charms/avion-2cm.png'),
    sizeScale: 1.9,
    sizeMark: 'M',
    category: '✈️ Voyage',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'hippocampe',
    name: 'Hippocampe',
    imagePath: getImagePath('images/charms/hippocampe-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: -5, y: -7 }
  },
  {
    id: 'main-signe-des-cornes',
    name: 'Main Signe Des Cornes',
    imagePath: getImagePath('images/charms/main-signe-des-cornes-1.9cm.png'),
    sizeScale: 1.9,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'tour-eiffel',
    name: 'Tour Eiffel',
    imagePath: getImagePath('images/charms/tour-eiffel-2cm.png'),
    sizeScale: 1.9,
    sizeMark: 'M',
    category: '✈️ Voyage',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'scarabee',
    name: 'Scarabee',
    imagePath: getImagePath('images/charms/scarabee-2cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'sardine',
    name: 'Sardine',
    imagePath: getImagePath('images/charms/sardine-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'corse',
    name: 'Corse',
    imagePath: getImagePath('images/charms/corse-2cm.png'),
    sizeScale: 1.9,
    sizeMark: 'M',
    category: '✈️ Voyage',
    attachmentOffset: { x: -10, y: -5 }
  },
  {
    id: 'coeur-sacre',
    name: 'Coeur Sacre',
    imagePath: getImagePath('images/charms/coeur-sacre-2.1cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'dauphin',
    name: 'Dauphin',
    imagePath: getImagePath('images/charms/dauphin-2.1cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'grande-botte-cow-boy',
    name: 'Grande Botte Cow Boy',
    imagePath: getImagePath('images/charms/grande-botte-cow-boy-2.1cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '✈️ Voyage',
    attachmentOffset: { x: -10, y: -5 }
  },
  {
    id: 'etoile-spirale',
    name: 'Étoile Spirale',
    imagePath: getImagePath('images/charms/etoile-spirale-2.4cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -7 }
  },
  {
    id: 'rose',
    name: 'Rose',
    imagePath: getImagePath('images/charms/rose-2.5cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'tortue',
    name: 'Tortue',
    imagePath: getImagePath('images/charms/tortue-2.3cm.png'),
    sizeScale: 1.9,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'pate',
    name: 'Pate',
    imagePath: getImagePath('images/charms/pate-2.5cm.png'),
    sizeScale: 1.9,
    sizeMark: 'M',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'crabe',
    name: 'Crabe',
    imagePath: getImagePath('images/charms/crabe-2.3cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'betail',
    name: 'Betail',
    imagePath: getImagePath('images/charms/betail-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -20 }
  },
  {
    id: 'elephant',
    name: 'Éléphant',
    imagePath: getImagePath('images/charms/elephant-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '🐻 Animaux',
    attachmentOffset: { x: -10, y: -15 }
  },
  {
    id: 'spirale',
    name: 'Spirale',
    imagePath: getImagePath('images/charms/spirale-2.3cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'meduse',
    name: 'Meduse',
    imagePath: getImagePath('images/charms/meduse-2.8cm.png'),
    sizeScale: 2.1,
    sizeMark: 'L',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'medaille-vague',
    name: 'Médaille Vague',
    imagePath: getImagePath('images/charms/medaille-vague-2.3cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '🌞 Médailles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'medaille-soleil',
    name: 'Médaille Soleil',
    imagePath: getImagePath('images/charms/medaille-soleil-2.3cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '🌞 Médailles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'nounours',
    name: 'Nounours',
    imagePath: getImagePath('images/charms/nounours-2.2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'noeud',
    name: 'Noeud',
    imagePath: getImagePath('images/charms/noeud-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -25 }
  },
  {
    id: 'medaille-serpent',
    name: 'Médaille Serpent',
    imagePath: getImagePath('images/charms/medaille-serpent-2.5cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '🌞 Médailles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'medaille-soleil-lune',
    name: 'Médaille Soleil Lune',
    imagePath: getImagePath('images/charms/medaille-soleil-lune-3cm.png'),
    sizeScale: 2.3,
    sizeMark: 'L',
    category: '🌞 Médailles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'coquillage-spirale',
    name: 'Coquillage Spirale',
    imagePath: getImagePath('images/charms/coquillage-spirale-3cm.png'),
    sizeScale: 2.1,
    sizeMark: 'L',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'grand-soleil',
    name: 'Grand Soleil',
    imagePath: getImagePath('images/charms/grand-soleil-3.4cm.png'),
    sizeScale: 2.4,
    sizeMark: 'XL',
    category: '🌸 Nature'
  },
  {
    id: 'grand-coeur',
    name: 'Grand Coeur',
    imagePath: getImagePath('images/charms/grand-coeur-3.4cm.png'),
    sizeScale: 2.0,
    sizeMark: 'XL',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'grande-etoile-de-mer',
    name: 'Grande Étoile De Mer',
    imagePath: getImagePath('images/charms/grande-etoile-de-mer-3.5cm.png'),
    sizeScale: 2.4,
    sizeMark: 'XL',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'grand-coeur-sacre',
    name: 'Grand Coeur Sacre',
    imagePath: getImagePath('images/charms/grand-coeur-sacre-4cm.png'),
    sizeScale: 2.4,
    sizeMark: 'XL',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'noeud-fin',
    name: 'Noeud Fin',
    imagePath: getImagePath('images/charms/noeud-fin-4.2cm.png'),
    sizeScale: 2.4,
    sizeMark: 'XL',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'bouddha-bleu',
    name: 'Bouddha Bleu',
    imagePath: getImagePath('images/charms/bouddha-bleu-1.5cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: -5, y: -5 }
  },
  {
    id: 'bouddha-rose',
    name: 'Bouddha Rose',
    imagePath: getImagePath('images/charms/bouddha-rose-1.5cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'bouddha-turquoise',
    name: 'Bouddha Turquoise',
    imagePath: getImagePath('images/charms/bouddha-turquoise-1.5cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'bouddha-vert',
    name: 'Bouddha Vert',
    imagePath: getImagePath('images/charms/bouddha-vert-1.5cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'bouddha-violet',
    name: 'Bouddha Violet',
    imagePath: getImagePath('images/charms/bouddha-violet-1.5cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'bouddha-violet-clair',
    name: 'Bouddha Violet Clair',
    imagePath: getImagePath('images/charms/bouddha-violet-clair-1.5cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'cerise',
    name: 'Cerise',
    imagePath: getImagePath('images/charms/cerise-1.8cm.png'),
    sizeScale: 1.8,
    sizeMark: 'L',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -10 }
  },
  {
    id: 'tortue-bleue-ciel',
    name: 'Tortue Bleue Ciel',
    imagePath: getImagePath('images/charms/tortue-bleue-ciel-2cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'tortue-rose',
    name: 'Tortue Rose',
    imagePath: getImagePath('images/charms/tortue-rose-2cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'tortue-rouge',
    name: 'Tortue Rouge',
    imagePath: getImagePath('images/charms/tortue-rouge-2cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'tortue-turquoise',
    name: 'Tortue Turquoise',
    imagePath: getImagePath('images/charms/tortue-turquoise-2cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'vrai-coquillage',
    name: 'Vrai Coquillage',
    imagePath: getImagePath('images/charms/vrai-coquillage-2cm.png'),
    sizeScale: 1.4,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'chien-bleu',
    name: 'Chien Bleu',
    imagePath: getImagePath('images/charms/chien-bleu-2cm.png'),
    sizeScale: 1.5,
    sizeMark: 'L',
    category: '🐻 Animaux',
    attachmentOffset: { x: -10, y: -10 }
  },
  {
    id: 'chien-rose',
    name: 'Chien Rose',
    imagePath: getImagePath('images/charms/chien-rose-2cm.png'),
    sizeScale: 1.5,
    sizeMark: 'L',
    category: '🐻 Animaux',
    attachmentOffset: { x: -10, y: -10 }
  },
  {
    id: 'chien-rose-pale',
    name: 'Chien Rose Pale',
    imagePath: getImagePath('images/charms/chien-rose-pale-2cm.png'),
    sizeScale: 1.5,
    sizeMark: 'L',
    category: '🐻 Animaux',
    attachmentOffset: { x: -10, y: -10 }
  },
  {
    id: 'chien-rouge',
    name: 'Chien Rouge',
    imagePath: getImagePath('images/charms/chien-rouge-2cm.png'),
    sizeScale: 1.5,
    sizeMark: 'L',
    category: '🐻 Animaux',
    attachmentOffset: { x: -10, y: -10 }
  },
  {
    id: 'chien-vert',
    name: 'Chien Vert',
    imagePath: getImagePath('images/charms/chien-vert-2cm.png'),
    sizeScale: 1.5,
    sizeMark: 'L',
    category: '🐻 Animaux',
    attachmentOffset: { x: -10, y: -10 }
  },
  {
    id: 'citron',
    name: 'Citron',
    imagePath: getImagePath('images/charms/citron-1.2cm.png'),
    sizeScale: 1.1,
    sizeMark: 'S',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'coccinelle-rouge',
    name: 'Coccinelle Rouge',
    imagePath: getImagePath('images/charms/coccinelle-rouge-2cm.png'),
    sizeScale: 1.4,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'coeur-sacre-blanc',
    name: 'Coeur Sacre Blanc',
    imagePath: getImagePath('images/charms/coeur-sacre-blanc-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'coeur-sacre-bleu',
    name: 'Coeur Sacre Bleu',
    imagePath: getImagePath('images/charms/coeur-sacre-bleu-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'coeur-sacre-bleu-ciel',
    name: 'Coeur Sacre Bleu Ciel',
    imagePath: getImagePath('images/charms/coeur-sacre-bleu-ciel-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'coeur-sacre-rose',
    name: 'Coeur Sacre Rose',
    imagePath: getImagePath('images/charms/coeur-sacre-rose-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 5, y: -5 }
  },
  {
    id: 'coeur-sacre-rouge',
    name: 'Coeur Sacre Rouge',
    imagePath: getImagePath('images/charms/coeur-sacre-rouge-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: -5, y: -5 }
  },
  {
    id: 'double-perle',
    name: 'Double Perle',
    imagePath: getImagePath('images/charms/double-perle-2cm.png'),
    sizeScale: 1.9,
    sizeMark: 'M',
    category: '🐚 Perles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'etoile-de-mer-bleue',
    name: 'Étoile De Mer Bleue',
    imagePath: getImagePath('images/charms/etoile-de-mer-bleue-2cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: -5, y: -5 }
  },
  {
    id: 'etoile-de-mer-rose',
    name: 'Étoile De Mer Rose',
    imagePath: getImagePath('images/charms/etoile-de-mer-rose-2cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 15, y: -5 }
  },
  {
    id: 'etoile-de-mer-rouge',
    name: 'Étoile De Mer Rouge',
    imagePath: getImagePath('images/charms/etoile-de-mer-rouge-2cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: -10, y: -5 }
  },
  {
    id: 'etoile-de-mer-turquoise',
    name: 'Étoile De Mer Turquoise',
    imagePath: getImagePath('images/charms/etoile-de-mer-turquoise-2cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: -10, y: -5 }
  },
  {
    id: 'fleur-rose',
    name: 'Fleur Rose',
    imagePath: getImagePath('images/charms/fleur-rose-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'fraise',
    name: 'Fraise',
    imagePath: getImagePath('images/charms/fraise-1.8cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'framboise',
    name: 'Framboise',
    imagePath: getImagePath('images/charms/framboise-1.7cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'homard',
    name: 'Homard',
    imagePath: getImagePath('images/charms/homard-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 10, y: 0 }
  },
  {
    id: 'main-de-fatma-bleue',
    name: 'Main De Fatma Bleue',
    imagePath: getImagePath('images/charms/main-de-fatma-bleue-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'main-de-fatma-bleue-ciel',
    name: 'Main De Fatma Bleue Ciel',
    imagePath: getImagePath('images/charms/main-de-fatma-bleue-ciel-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'main-de-fatma-jaune',
    name: 'Main De Fatma Jaune',
    imagePath: getImagePath('images/charms/main-de-fatma-jaune-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'main-de-fatma-rose',
    name: 'Main De Fatma Rose',
    imagePath: getImagePath('images/charms/main-de-fatma-rose-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'main-de-fatma-turquoise',
    name: 'Main De Fatma Turquoise',
    imagePath: getImagePath('images/charms/main-de-fatma-turquoise-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'main-de-fatma-violette',
    name: 'Main De Fatma Violette',
    imagePath: getImagePath('images/charms/main-de-fatma-violette-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'mure',
    name: 'Mure',
    imagePath: getImagePath('images/charms/mure-1.7cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'nounours-blanc',
    name: 'Nounours Blanc',
    imagePath: getImagePath('images/charms/nounours-blanc-2cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'nounours-rose-pale',
    name: 'Nounours Rose Pale',
    imagePath: getImagePath('images/charms/nounours-rose-pale-2cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'nounours-violet',
    name: 'Nounours Violet',
    imagePath: getImagePath('images/charms/nounours-violet-2cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'oeil-turk-bleu',
    name: 'Oeil Turk Bleu',
    imagePath: getImagePath('images/charms/oeil-turk-bleu-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -7 }
  },
  {
    id: 'oeil-turk-jaune',
    name: 'Oeil Turk Jaune',
    imagePath: getImagePath('images/charms/oeil-turk-jaune-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -7 }
  },
  {
    id: 'oeil-turk-noir',
    name: 'Oeil Turk Noir',
    imagePath: getImagePath('images/charms/oeil-turk-noir-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -7 }
  },
  {
    id: 'oeil-turk-rose',
    name: 'Oeil Turk Rose',
    imagePath: getImagePath('images/charms/oeil-turk-rose-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -7 }
  },
  {
    id: 'oeil-turk-rouge',
    name: 'Oeil Turk Rouge',
    imagePath: getImagePath('images/charms/oeil-turk-rouge-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -7 } 
  },
  {
    id: 'oeil-turk-turquoise',
    name: 'Oeil Turk Turquoise',
    imagePath: getImagePath('images/charms/oeil-turk-turquoise-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -7 }
  },
  {
    id: 'oeil-turk-vert',
    name: 'Oeil Turk Vert',
    imagePath: getImagePath('images/charms/oeil-turk-vert-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -7 }
  },
  {
    id: 'patte-de-chien-rose',
    name: 'Patte De Chien Rose',
    imagePath: getImagePath('images/charms/patte-de-chien-rose-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'perle',
    name: 'Perle',
    imagePath: getImagePath('images/charms/perle-1.2cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🐚 Perles',
    attachmentOffset: { x: 0, y: -10 }
  },
  {
    id: 'perle-chat-bleu',
    name: 'Perle Chat Bleu',
    imagePath: getImagePath('images/charms/perle-chat-bleu-2cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -8 }
  },
  {
    id: 'perle-chat-rouge',
    name: 'Perle Chat Rouge',
    imagePath: getImagePath('images/charms/perle-chat-rouge-2cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -8 }
  },
  {
    id: 'perle-oeil-coeur',
    name: 'Perle Oeil Coeur',
    imagePath: getImagePath('images/charms/perle-oeil-coeur-2cm.png'),
    sizeScale: 1.4,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'perle-oeil-fleur',
    name: 'Perle Oeil Fleur',
    imagePath: getImagePath('images/charms/perle-oeil-fleur-2cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'perle-poisson-blanc',
    name: 'Perle Poisson Blanc',
    imagePath: getImagePath('images/charms/perle-poisson-blanc-3cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'perle-poisson-bleu',
    name: 'Perle Poisson Bleu',
    imagePath: getImagePath('images/charms/perle-poisson-bleu-3cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'perle-poisson-jaune',
    name: 'Perle Poisson Jaune',
    imagePath: getImagePath('images/charms/perle-poisson-jaune-3cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'perle-poisson-rose',
    name: 'Perle Poisson Rose',
    imagePath: getImagePath('images/charms/perle-poisson-rose-3cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'perle-poisson-rouge',
    name: 'Perle Poisson Rouge',
    imagePath: getImagePath('images/charms/perle-poisson-rouge-3cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'perle-poisson-turquoise',
    name: 'Perle Poisson Turquoise',
    imagePath: getImagePath('images/charms/perle-poisson-turquoise-3cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'petite-perle',
    name: 'Petite Perle',
    imagePath: getImagePath('images/charms/petite-perle-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🐚 Perles',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'piment',
    name: 'Piment',
    imagePath: getImagePath('images/charms/piment-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -8}
  },
  {
    id: 'poisson-multicolore',
    name: 'Poisson Multicolore',
    imagePath: getImagePath('images/charms/poisson-multicolore-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -10 }
  },
  {
    id: 'poisson-raye',
    name: 'Poisson Raye',
    imagePath: getImagePath('images/charms/poisson-raye-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'pomme',
    name: 'Pomme',
    imagePath: getImagePath('images/charms/pomme-1.8cm.png'),
    sizeScale: 1.6,
    sizeMark: 'M',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'tortue-bleue',
    name: 'Tortue Bleue',
    imagePath: getImagePath('images/charms/tortue-bleue-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'XL',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'double-oeil-blanc',
    name: 'Double Oeil Blanc',
    imagePath: getImagePath('images/charms/double-oeil-blanc-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'double-oeil-bleu',
    name: 'Double Oeil Bleu',
    imagePath: getImagePath('images/charms/double-oeil-bleu-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'double-oeil-rose',
    name: 'Double Oeil Rose',
    imagePath: getImagePath('images/charms/double-oeil-rose-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 5, y: 0 }
  },
  {
    id: 'double-oeil-rouge',
    name: 'Double Oeil Rouge',
    imagePath: getImagePath('images/charms/double-oeil-rouge-1.5cm.png'),
    sizeScale: 1.5,
    sizeMark: 'M',
    category: '⭐ Symboles',
    attachmentOffset: { x: 5, y: -5 }
  },
  {
    id: 'perle-bleu-ciel',
    name: 'Perle Bleu Ciel',
    imagePath: getImagePath('images/charms/perle-bleu-ciel-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '🐚 Perles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'perle-breloque',
    name: 'Perle Breloque',
    imagePath: getImagePath('images/charms/perle-breloque-1.5cm.png'),
    sizeScale: 1.4,
    sizeMark: 'M',
    category: '🐚 Perles',
    attachmentOffset: { x: 0, y: 5 }
  },
  {
    id: 'perle-cylindre-bleue',
    name: 'Perle Cylindre Bleue',
    imagePath: getImagePath('images/charms/perle-cylindre-bleue-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🐚 Perles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'perle-cylindre-rose',
    name: 'Perle Cylindre Rose',
    imagePath: getImagePath('images/charms/perle-cylindre-rose-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🐚 Perles',
    attachmentOffset: { x: 5, y: -5 }
  },
  {
    id: 'perle-cylindre-rouge',
    name: 'Perle Cylindre Rouge',
    imagePath: getImagePath('images/charms/perle-cylindre-rouge-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🐚 Perles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'perle-cylindre-verte',
    name: 'Perle Cylindre Verte',
    imagePath: getImagePath('images/charms/perle-cylindre-verte-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🐚 Perles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'perle-nature',
    name: 'Perle Nature',
    imagePath: getImagePath('images/charms/perle-nature-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '🐚 Perles',
    attachmentOffset: { x: 5, y: -5 }
  },
  {
    id: 'perle-rose',
    name: 'Perle Rose',
    imagePath: getImagePath('images/charms/perle-rose-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '🐚 Perles',
    attachmentOffset: { x: -10, y: -2 }
  },
  {
    id: 'perle-rouge',
    name: 'Perle Rouge',
    imagePath: getImagePath('images/charms/perle-rouge-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '🐚 Perles',
    attachmentOffset: { x: 3, y: -10 }
  },
  {
    id: 'perle-turquoise',
    name: 'Perle Turquoise',
    imagePath: getImagePath('images/charms/perle-turquoise-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '🐚 Perles',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'perle-verte',
    name: 'Perle Verte',
    imagePath: getImagePath('images/charms/perle-verte-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '🐚 Perles',
    attachmentOffset: { x: 10, y: -2 }
  },
  {
    id: 'perle-violette',
    name: 'Perle Violette',
    imagePath: getImagePath('images/charms/perle-violette-0.8cm.png'),
    sizeScale: 0.8,
    sizeMark: 'XS',
    category: '🐚 Perles',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'aubergine',
    name: 'Aubergine',
    imagePath: getImagePath('images/charms/aubergine-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'perle-coquillage-beige',
    name: 'Perle Coquillage Beige',
    imagePath: getImagePath('images/charms/perle-coquillage-beige-2.8cm.png'),
    sizeScale: 2.4,
    sizeMark: 'L',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'perle-coquillage-rose',
    name: 'Perle Coquillage Rose',
    imagePath: getImagePath('images/charms/perle-coquillage-rose-2.8cm.png'),
    sizeScale: 2.4,
    sizeMark: 'L',
    category: '🦞 Océan',
    attachmentOffset: { x: 5, y: -2}
  },
  {
    id: 'perle-coquillage-rouge',
    name: 'Perle Coquillage Rouge',
    imagePath: getImagePath('images/charms/perle-coquillage-rouge-2.8cm.png'),
    sizeScale: 2.4,
    sizeMark: 'L',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'poupee-bleue',
    name: 'Poupée Bleue',
    imagePath: getImagePath('images/charms/poupée-bleue-2.8cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'poupee-rose',
    name: 'Poupée Rose',
    imagePath: getImagePath('images/charms/poupée-rose-2.8cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'poupee-rouge',
    name: 'Poupée Rouge',
    imagePath: getImagePath('images/charms/poupée-rouge-2.8cm.png'),
    sizeScale: 2.0,
    sizeMark: 'L',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'bretzel',
    name: 'Bretzel',
    imagePath: getImagePath('images/charms/bretzel-1.2cm.png'),
    sizeScale: 1.2,
    sizeMark: 'S',
    category: '🍒 Nourriture',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'carpe',
    name: 'Carpe',
    imagePath: getImagePath('images/charms/carpe-3.7cm.png'),
    sizeScale: 2.5,
    sizeMark: 'XL',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'coccinelle',
    name: 'Coccinelle',
    imagePath: getImagePath('images/charms/coccinelle-1.4cm.png'),
    sizeScale: 1.4,
    sizeMark: 'S',
    category: '🐻 Animaux',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'coeur-sacre-jaune',
    name: 'Coeur Sacré Jaune',
    imagePath: getImagePath('images/charms/coeur-sacre-jaune-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'coeur-sacre-orange',
    name: 'Coeur Sacré Orange',
    imagePath: getImagePath('images/charms/coeur-sacre-orange-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'coeur-sacre-vert',
    name: 'Coeur Sacré Vert',
    imagePath: getImagePath('images/charms/coeur-sacre-vert-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'coeur-sacre-violet',
    name: 'Coeur Sacré Violet',
    imagePath: getImagePath('images/charms/coeur-sacre-violet-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '❤️ Cœurs',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'etoile-de-mer-jaune',
    name: 'Étoile De Mer Jaune',
    imagePath: getImagePath('images/charms/etoile-de-mer-jaune-2cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'etoile-de-mer-verte',
    name: 'Étoile De Mer Verte',
    imagePath: getImagePath('images/charms/etoile-de-mer-verte-2cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'etoile-de-mer-violette',
    name: 'Étoile De Mer Violette',
    imagePath: getImagePath('images/charms/etoile-de-mer-violette-2cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'fleur-orange',
    name: 'Fleur Orange',
    imagePath: getImagePath('images/charms/felur-orange-2cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'fleur-bleue-ciel',
    name: 'Fleur Bleue Ciel',
    imagePath: getImagePath('images/charms/fleur-bleue-ciel-2cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'fleur-bleue-fonce',
    name: 'Fleur Bleue Foncé',
    imagePath: getImagePath('images/charms/fleur-bleue-fonce-2cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'fleur-jaune',
    name: 'Fleur Jaune',
    imagePath: getImagePath('images/charms/fleur-jaune-2cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'fleur-rouge',
    name: 'Fleur Rouge',
    imagePath: getImagePath('images/charms/fleur-rouge-2cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'fleur-verte',
    name: 'Fleur Verte',
    imagePath: getImagePath('images/charms/fleur-verte-2cm.png'),
    sizeScale: 1.8,
    sizeMark: 'M',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'grand-crabe',
    name: 'Grand Crabe',
    imagePath: getImagePath('images/charms/grand-crabe-4cm.png'),
    sizeScale: 2.5,
    sizeMark: 'XL',
    category: '🦞 Océan',
    attachmentOffset: { x: -17, y: -4 }
  },
  {
    id: 'grande-etoile',
    name: 'Grande Étoile',
    imagePath: getImagePath('images/charms/grande-etoile-3.7cm.png'),
    sizeScale: 2.5,
    sizeMark: 'XL',
    category: '🌸 Nature',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'grande-sardine',
    name: 'Grande Sardine',
    imagePath: getImagePath('images/charms/grande-sardine-4cm.png'),
    sizeScale: 2.5,
    sizeMark: 'XL',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'homard-grand',
    name: 'Homard Grand',
    imagePath: getImagePath('images/charms/homard-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 10, y: 0 }
  },
  {
    id: 'medaille-amour',
    name: 'Médaille Amour',
    imagePath: getImagePath('images/charms/medaille-amour-1.7cm.png'),
    sizeScale: 1.7,
    sizeMark: 'M',
    category: '🌞 Médailles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'petit-coquillage-spirale',
    name: 'Petit Coquillage Spirale',
    imagePath: getImagePath('images/charms/petit-coquillage-spirale-1.3cm.png'),
    sizeScale: 1.3,
    sizeMark: 'S',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'petit-fer-a-cheval',
    name: 'Petit Fer À Cheval',
    imagePath: getImagePath('images/charms/petit-fer-a-cheval-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'XS',
    category: '⭐ Symboles',
    attachmentOffset: { x: 0, y: -5 }
  },
  {
    id: 'poisson-multicolore-bleu',
    name: 'Poisson Multicolore Bleu',
    imagePath: getImagePath('images/charms/poisson-multicolore-bleu-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -4 }
  },
  {
    id: 'tortue-verte',
    name: 'Tortue Verte',
    imagePath: getImagePath('images/charms/tortue-verte-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'tortue-violette',
    name: 'Tortue Violette',
    imagePath: getImagePath('images/charms/tortue-violette-2cm.png'),
    sizeScale: 2.0,
    sizeMark: 'M',
    category: '🦞 Océan',
    attachmentOffset: { x: 0, y: -2 }
  },
  {
    id: 'lettre-a',
    name: 'Lettre A',
    imagePath: getImagePath('images/charms/lettre-A-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-b',
    name: 'Lettre B',
    imagePath: getImagePath('images/charms/lettre-B-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-c',
    name: 'Lettre C',
    imagePath: getImagePath('images/charms/lettre-C-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-d',
    name: 'Lettre D',
    imagePath: getImagePath('images/charms/lettre-D-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-e',
    name: 'Lettre E',
    imagePath: getImagePath('images/charms/lettre-E-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-f',
    name: 'Lettre F',
    imagePath: getImagePath('images/charms/lettre-F-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-g',
    name: 'Lettre G',
    imagePath: getImagePath('images/charms/lettre-G-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-h',
    name: 'Lettre H',
    imagePath: getImagePath('images/charms/lettre-H-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 30, y: 0 }
  },
  {
    id: 'lettre-i',
    name: 'Lettre I',
    imagePath: getImagePath('images/charms/lettre-I-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-j',
    name: 'Lettre J',
    imagePath: getImagePath('images/charms/lettre-J-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-k',
    name: 'Lettre K',
    imagePath: getImagePath('images/charms/lettre-K-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 30, y: 0 }
  },
  {
    id: 'lettre-l',
    name: 'Lettre L',
    imagePath: getImagePath('images/charms/lettre-L-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 20, y: 0 }
  },
  {
    id: 'lettre-m',
    name: 'Lettre M',
    imagePath: getImagePath('images/charms/lettre-M-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 35, y: 0 }
  },
  {
    id: 'lettre-n',
    name: 'Lettre N',
    imagePath: getImagePath('images/charms/lettre-N-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 30, y: 0 }
  },
  {
    id: 'lettre-o',
    name: 'Lettre O',
    imagePath: getImagePath('images/charms/lettre-O-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-p',
    name: 'Lettre P',
    imagePath: getImagePath('images/charms/lettre-P-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-q',
    name: 'Lettre Q',
    imagePath: getImagePath('images/charms/lettre-Q-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-r',
    name: 'Lettre R',
    imagePath: getImagePath('images/charms/lettre-R-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 10, y: 0 }
  },
  {
    id: 'lettre-s',
    name: 'Lettre S',
    imagePath: getImagePath('images/charms/lettre-S-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-t',
    name: 'Lettre T',
    imagePath: getImagePath('images/charms/lettre-T-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'lettre-u',
    name: 'Lettre U',
    imagePath: getImagePath('images/charms/lettre-U-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 30, y: 0 }
  },
  {
    id: 'lettre-v',
    name: 'Lettre V',
    imagePath: getImagePath('images/charms/lettre-V-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 25, y: 0 }
  },
  {
    id: 'lettre-w',
    name: 'Lettre W',
    imagePath: getImagePath('images/charms/lettre-W-1.1cm.png'),
    sizeScale: 1.2,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: -10 }
  },
  {
    id: 'lettre-x',
    name: 'Lettre X',
    imagePath: getImagePath('images/charms/lettre-X-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 20, y: 0 }
  },
  {
    id: 'lettre-y',
    name: 'Lettre Y',
    imagePath: getImagePath('images/charms/lettre-Y-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 25, y: 0 }
  },
  {
    id: 'lettre-z',
    name: 'Lettre Z',
    imagePath: getImagePath('images/charms/lettre-Z-1.1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🔠 Lettres',
    attachmentOffset: { x: 0, y: 0 }
  },
  {
    id: 'signe-belier',
    name: 'Signe Bélier',
    imagePath: getImagePath('images/charms/signe-belier-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 25, y: 0 }
  },
  {
    id: 'signe-taureau',
    name: 'Signe Taureau',
    imagePath: getImagePath('images/charms/signe-taureau-0.8cm.png'),
    sizeScale: 1,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 30, y: 5 }
  },
  {
    id: 'signe-cancer',
    name: 'Signe Cancer',
    imagePath: getImagePath('images/charms/signe-cancer-0.7cm.png'),
    sizeScale: 1,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 5, y: 0 }
  },
  {
    id: 'signe-lion',
    name: 'Signe Lion',
    imagePath: getImagePath('images/charms/signe-lion-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 10, y: 5 }
  },
  {
    id: 'signe-vierge',
    name: 'Signe Vierge',
    imagePath: getImagePath('images/charms/signe-vierge-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 0, y: 5 }
  },
  {
    id: 'signe-balance',
    name: 'Signe Balance',
    imagePath: getImagePath('images/charms/signe-balance-0.9cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 2, y: 0 }
  },
  {
    id: 'signe-scorpion',
    name: 'Signe Scorpion',
    imagePath: getImagePath('images/charms/signe-scorpion-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 15, y: 5 }
  },
  {
    id: 'signe-sagittaire',
    name: 'Signe Sagittaire',
    imagePath: getImagePath('images/charms/signe-sagittaire-1-cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 5, y: 5 }
  },
  {
    id: 'signe-capricorne',
    name: 'Signe Capricorne',
    imagePath: getImagePath('images/charms/signe-capricorne-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 5, y: 5 }
  },
  {
    id: 'signe-verseau',
    name: 'Signe Verseau',
    imagePath: getImagePath('images/charms/signe-verseau-0.7cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 5, y: -5 }
  },
  {
    id: 'signe-poisson',
    name: 'Signe Poisson',
    imagePath: getImagePath('images/charms/signe-poisson-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 25, y: 5 }
  },
  {
    id: 'signe-gemeaux',
    name: 'Signe Gémeaux',
    imagePath: getImagePath('images/charms/signe-gemeau-1cm.png'),
    sizeScale: 1.0,
    sizeMark: 'S',
    category: '🦀 Signes Astrologiques',
    attachmentOffset: { x: 0, y: 5 }
  }
];