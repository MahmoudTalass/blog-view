import { Link } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import InputField from "./InputField";
import AuthenticationForm from "./AuthenticationForm";
import SubmitButton from "./SubmitButton";
import FormErrors from "./FormErrors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";

function Login() {
   const { token, setToken } = useAuth();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);

   console.log("login error", error);

   async function handleSubmitLogin(e) {
      e.preventDefault();
      setPassword("");

      try {
         const response = await fetch("http://localhost:3000/api/auth/login", {
            mode: "cors",
            method: "post",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
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
      <AuthenticationForm handleSubmit={handleSubmitLogin}>
         <div className="flex items-center relative">
            {" "}
            <Link to="/" className="absolute right-[17rem]">
               <FontAwesomeIcon icon={faArrowAltCircleLeft} size="xl" />
            </Link>
            <h1 className="text-3xl">Login Form</h1>
         </div>
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
            New user?{" "}
            <Link to="/signup" className="underline">
               Sign up here
            </Link>
         </p>
         <SubmitButton>Login</SubmitButton>
         {error && <FormErrors {...error} />}
      </AuthenticationForm>
   );
}

export default Login;
