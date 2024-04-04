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
        src={imageSrc || defaultImage}
        alt={imageAlt}
      />{" "}
      {/* utiliser l'image par défaut si imageSrc est manquante */}
      <div className="EventCard__label">{label}</div>
    </div>
    <div className="EventCard__descriptionContainer">
      <div className="EventCard__title">{title}</div>
      <div className="EventCard__month">{getMonth(date)}</div>
    </div>
  </div>
);

EventCard.propTypes = {
  imageSrc: PropTypes.string, // imageSrc n'est plus obligatoire
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
  imageSrc: null, // définir imageSrc sur null par défaut
};

export default EventCard;
