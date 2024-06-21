import PropTypes from "prop-types";

function InputField({ label, type, id, name, isRequired, value, setValue }) {
   return (
      <div className="flex flex-col w-full max-w-[400px] gap-3 ">
         <label htmlFor={id} className="text-xl text-center">
            {label}
         </label>
         <input
            type={type}
            name={name}
            id={id}
            required={isRequired}
            className="h-8 px-2 text-fontcolor rounded bg-color2 border-1 border-color3 p-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="on"
         />
      </div>
   );
}

InputField.propTypes = {
   label: PropTypes.string,
   type: PropTypes.string,
   id: PropTypes.string,
   name: PropTypes.string,
   isRequired: PropTypes.bool,
   value: PropTypes.string,
   setValue: PropTypes.func,
};

export default InputField;
