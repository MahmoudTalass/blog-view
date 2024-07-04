import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function SubmitButton({ children, disabled }) {
   return (
      <button
         type="submit"
         className="border px-6 py-2 rounded hover:scale-105"
         disabled={disabled}
      >
         {disabled ? <FontAwesomeIcon icon={faEllipsis} fade size="2x" /> : children}
      </button>
   );
}

SubmitButton.propTypes = {
   children: PropTypes.any,
   disabled: PropTypes.bool,
};

export default SubmitButton;
