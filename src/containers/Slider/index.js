import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // Trier les événements par date décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Fonction pour passer à la carte suivante toutes les 5 secondes
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < (byDateDesc?.length || 0) - 1 ? index + 1 : 0),
      5000
    );
  };

  // Appeler la fonction nextCard à chaque rendu du composant
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {/* Vérifier que byDateDesc existe avant de le parcourir */}
      {byDateDesc?.map((event, idx) => (
        // Utiliser React.Fragment pour envelopper les éléments
        <React.Fragment key={`${event.title}-Fragment`}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Vérifier que byDateDesc existe avant de le parcourir */}
              {byDateDesc.map((e, radioIdx) => (
                // Ajouter l'attribut readOnly aux boutons radio pour les rendre non modifiables par l'utilisateur
                <input
                  key={`${e.title}-Radio`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
