import React from "react";
import "../resources/css/Login.css";
import SignInPageComponent from "../components/SignInPageComponent";
import { useState } from "react";
import NotificationBar from "../components/NotificationBar";

const message = '"The cultivation of human values alone is true education."';

const Login = () => {
  const [serverError, setServerError] = useState(false);

  return (
    <div className="SignInBox">
      {serverError && <NotificationBar/>}
      <div className="background"></div>
      <div className="login_wrapper">
        <div className="BrandingSignInPageWrapper">
          <SignInPageComponent serverError = {serverError} setServerError={setServerError}/>
        </div>
        <div className="Messages">
          <div className="message-holder">
            <p style={{ fontSize: "clamp(1.6rem, 3.2vw, 3.8rem)" }}>
              {message}
            </p>
            <br />
            <p
              style={{
                fontSize: "clamp(0.8rem,1.2rem,2.9rem)",
                fontWeight: "bolder",
              }}
            >
              Sri Sathya Sai Baba
            </p>
            <br />
            <p style={{ fontSize: "clamp(0.7rem,1.1rem,2.4rem)" }}>
              Revered Founder Chancellor, SSSIHL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
