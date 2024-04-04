import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import defaultImage from "../../logo.svg"; // importer l'image par défaut

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    <div className="EventCard__imageContainer">
      <img
        data-testid="card-image-testid"
        src={imageSrc || defaultImage} // utiliser l'image par défaut si imageSrc est manquante
        alt={imageAlt}
      />{" "}
      <div className="EventCard__label">{label}</div>
    </div>
    <div className="EventCard__descriptionContainer">
      <div className="EventCard__title">{title || "Article à venir"}</div>{" "}
      {/* utiliser le titre par défaut si title est manquant */}
      <div className="EventCard__month">{getMonth(date)}</div>
    </div>
  </div>
);

EventCard.propTypes = {
  imageSrc: PropTypes.string, // imageSrc n'est plus obligatoire
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string, // title n'est plus obligatoire
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
  imageSrc: null, // définir imageSrc sur null par défaut
  title: null, // définir title sur null par défaut
};

export default EventCard;
