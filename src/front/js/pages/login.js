import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/home.css";


export const Login = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const [msg, setMsg] = useState("");

  const [isLoginTabActive, setIsLoginTabActive] = useState(true);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const handleTabClick = (isLoginTab) => {
    setIsLoginTabActive(isLoginTab);
  };

  const handleSubmit = (ev, islogin = true) => {
    ev.preventDefault();
    console.table([{ email: email, pass: pass, name: name }]);
    if (islogin) {
      actions.login(email, pass).then(() => {
        if (store.token) {
          navigate("/home");
        }
      });
    } else {
      actions
        .sign_up(email, pass, name)
        .then(() => {
          setIsLoginTabActive(true);
        })
        .catch((err) => {
          console.error(err);
          if (!store.user) {
            setMsg(store.msg);
          }
        });
    }
  };

  const containerStyle = {
   // backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <div className="login-page">
        <div className="titleLogin">Sign In</div>
        <div className="login-card">
          <div className="card-header">
            <button
              className={`login-tab ${isLoginTabActive ? "active" : ""}`}
              onClick={() => handleTabClick(true)}
            >
              Sign In
            </button>
            <button
              className={`register-tab ${isLoginTabActive ? "" : "active"}`}
              onClick={() => handleTabClick(false)}
            >
              Register
            </button>
          </div>
          <div className="card-body">
            {/* LOGIN FORM */}
            <form
              id={isLoginTabActive ? "login-form" : "sign_up"}
              onSubmit={(ev) => handleSubmit(ev, isLoginTabActive)}
            >
              {isLoginTabActive ? (
                ""
              ) : (
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={pass}
                onChange={(ev) => setPass(ev.target.value)}
              />
              {store.msg}
              <button
                type="submit"
                onClick={(ev) => handleSubmit(ev, isLoginTabActive)}
              >
                {isLoginTabActive ? "Sign In" : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
