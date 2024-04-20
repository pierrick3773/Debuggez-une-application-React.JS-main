import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Définir la promesse mockContactApi pour refléter le temps d'attente réel de 950 ms
const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 950);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  // Définir la fonction sendContact pour appeler la fonction onSuccess lorsque la promesse mockContactApi est résolue avec succès
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess(); // Appeler la fonction onSuccess
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError] // Ajouter la fonction onSuccess en tant que dépendance de useCallback
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
