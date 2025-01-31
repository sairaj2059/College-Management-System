import React from "react";
import "../resources/css/Login.css";
import BrandingSignInPage from "../components/BrandingSignInPage";

const message = ['"The cultivation of human values alone is true education."'];

const Login = () => {
  return (
    <div className="SignInBox">
      <div className="background"></div>
      <div className="login_wrapper">
        <div className="BrandingSignInPageWrapper">
          <BrandingSignInPage />
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
