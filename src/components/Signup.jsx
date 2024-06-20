import { Link } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import InputField from "./InputField";
import AuthenticationForm from "./AuthenticationForm";
import SubmitButton from "./SubmitButton";
import FormErrors from "./FormErrors";

function Signup() {
   const { token, setToken } = useAuth();
   const [email, setEmail] = useState("");
   const [name, setName] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);

   async function handleSubmitSignup(e) {
      e.preventDefault();
      setPassword("");

      try {
         const response = await fetch("http://localhost:3000/api/auth/signup", {
            mode: "cors",
            method: "post",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name, password, isAuthor: false }),
         });

         const json = await response.json();
         if (!response.ok) {
            setError(json.error);
            return;
         }

         setToken(json.token);
         localStorage.setItem("token", json.token);
         setPassword("");
         setError(null);
      } catch (err) {
         setError({ message: "An error occurred. please try again later" });
      }
   }

   if (token) {
      return <Navigate to="/" />;
   }

   return (
      <AuthenticationForm handleSubmit={handleSubmitSignup}>
         <h1 className="text-3xl">Sign up Form</h1>
         <InputField
            type="text"
            label="Name"
            id="name"
            value={name}
            setValue={setName}
            isRequired={true}
            name="name"
         />
         <InputField
            type="email"
            label="Email"
            id="email"
            value={email}
            setValue={setEmail}
            isRequired={true}
            name="email"
         />
         <InputField
            type="password"
            label="Password"
            id="password"
            value={password}
            setValue={setPassword}
            isRequired={true}
            name="password"
         />
         <p>
            Existing user?{" "}
            <Link to="/login" className="underline">
               Login here
            </Link>
         </p>
         <SubmitButton>Sign up</SubmitButton>
         {error && <FormErrors {...error} />}
      </AuthenticationForm>
   );
}

export default Signup;
