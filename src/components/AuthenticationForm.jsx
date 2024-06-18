import PropTypes from "prop-types";

function AuthenticationForm({ handleSubmit, children }) {
   return (
      <main className="w-full flex flex-col items-center mt-40">
         <form
            className="min-w-[300px] w-[500px] flex flex-col items-center gap-5 p-5 bg-color2 rounded"
            onSubmit={handleSubmit}
         >
            {children}
         </form>
      </main>
   );
}

AuthenticationForm.propTypes = {
   handleSubmit: PropTypes.func,
   children: PropTypes.any,
};

export default AuthenticationForm;
