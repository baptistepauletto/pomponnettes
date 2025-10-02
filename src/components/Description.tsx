import React, { useState } from 'react';
import '../styles/Description.scss';
import { useCustomizer } from '../context/CustomizerContext';

const Description: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectedNecklace } = useCustomizer();

  return (
    <div className="description">
      {/* Collapsible header */}
      <div className="description-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>DESCRIPTION</h3>
        <div className="toggle-icon">
          {isExpanded ? '−' : '+'}
        </div>
      </div>

      {/* Expandable content */}
      {isExpanded && (
        <div className="description-content">
          <div className="description-text">
            <p>
              <strong>TAILLE</strong>
               <br />{selectedNecklace?.sizeDescription || 'Longueur du collier : 42 cm + 5 cm réglable.'}
            </p>
            <p>
              <strong>COMPOSITION </strong>
               <br />Chaîne : Acier inoxydable.
               <br />Charms : Tous nos charms dorés sont en acier inoxydable. Les charms colorés sont en porcelaine, en résine ou en perle naturelle d’eau douce.
            </p>
            <p>
              <strong>FABRICATION ET DÉLAIS</strong>
               <br />Tous nos bijoux sont assemblés à la main dans notre atelier en Provence par deux copines passionnées qui réalisent chaque commandes une à une avec amour. Nos délais de fabrication peuvent aller jusqu’à 7 jours ouvrés.
            </p>
            <p>
             <strong>ENTRETIEN</strong>
              <br />Vos créations sont précieuses protégez-les, certains charms sont plus fragiles que d’autres (les charms colorés en porcelaine par exemple) ils peuvent s’accrocher à vos vêtements. Éviter l’eau et le parfum pour garder votre bijou dans le temps.
            </p>
            <p className="note">
              <em>Tu as une question avant de passer ta commande ? N’hésite pas à nous contacter sur notre <a href="https://www.instagram.com/lespomponnettes/" target="_blank" rel="noopener noreferrer">instagram</a> ! Se référer au <a href="https://lespomponnettes.com/wp-content/uploads/2020/12/guidedestailles.pdf" target="_blank" rel="noopener noreferrer">guide des tailles</a> en cas de doute.</em>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
