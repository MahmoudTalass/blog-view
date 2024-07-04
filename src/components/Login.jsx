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
import { jwtDecode } from "jwt-decode";

function Login() {
   const { token, setToken, setUserId } = useAuth();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);

   async function handleSubmitLogin(e) {
      e.preventDefault();
      setPassword("");

      try {
         const response = await fetch("https://blog-api-service.fly.dev/api/auth/login", {
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

         const userId = jwtDecode(json.token).id;
         setToken(json.token);
         setUserId(userId);
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
            <h1 className="text-3xl font-bold">Login Form</h1>
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
