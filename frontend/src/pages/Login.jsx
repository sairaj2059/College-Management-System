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
            <p>
              {message}
            </p><br/>
            <p id="author">Sri Sathya Sai Baba</p><br/>
            <p id="place">Revered Founder Chancellor, SSSIHL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
