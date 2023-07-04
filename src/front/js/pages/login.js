import React, { useContext, useState } from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Context  } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";


export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  // const token = sessionStorage.getItem("token");
  console.log("this is your token", store.token);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (isSignup) {
  //       // Perform signup logic
  //       const response = await fetch(
  //         "https://3001-romeb92-authflaskreacta-hqm9ju7k3ns.ws-us101.gitpod.io/api/token",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             email: email,
  //             password: password,
  //           }),
  //         }
  //       );
  //       if (response.ok) {
  //         // Signup successful
  //         navigate("/login");
  //       } else {
  //         // Signup failed, handle the error scenario
  //         const errorData = await response.json();
  //         console.log("errored: " + errorData);
  //         // Handle the error response
  //       }
  //     } else {
  //       // Perform login logic
  //       fetch(
  //         "https://3001-romeb92-authflaskreacta-hqm9ju7k3ns.ws-us101.gitpod.io/api/token",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ email, password }),
  //         }
  //       );
  //       if (response.ok) {
  //         // Login successful
  //         const data = await response.json();
  //         // Store the token in sessionStorage
  //         sessionStorage.setItem("token", data.token);
  //         // Redirect to private page or desired route
  //         navigate("/private");
  //       } else {
  //         // Login failed, handle the error scenario
  //         const errorData = await response.json();
  //         console.log("signup: " + JSON.stringify(errorData));
  //         // Handle the error response
  //       }
  //     }
  //   } catch (error) {
  //     // Handle error in case of network issues
  //   }
  // };

  const handleClick = () => {
    actions.login(email, password);
  };
   
  if(store.token && store.token != "" && store.token != undefined) navigate("/home");
  return (
    <div className="container">
      <h1>{isSignup ? "Signup" : "Login"}</h1>

      {store.token && store.token != "" && store.token != undefined ? (
        "You are logged in" + store.token
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>{isSignup ? "Signup" : "Login"}</button>

          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => setIsSignup(!isSignup) + handleClick}>
              {isSignup ? "Login" : "Signup"}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
