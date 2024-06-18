import PropTypes from "prop-types";

function SubmitButton({ children }) {
   return (
      <button type="submit" className="border px-6 py-2 rounded hover:scale-105">
         {children}
      </button>
   );
}

SubmitButton.propTypes = {
   children: PropTypes.any,
};

export default SubmitButton;
