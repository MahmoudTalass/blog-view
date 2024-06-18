function FormErrors(error) {
   return (
      <div className="text-red-600 flex flex-col items-center text-xl">
         {error.errors.length === 0 ? (
            <p>{error.message}</p>
         ) : (
            error.errors.map((err) => {
               return <p key={err.message}>{err.message}</p>;
            })
         )}
      </div>
   );
}

export default FormErrors;
